import type { MusicTrack } from "@/app/types/music";

type LastFmTrack = {
  name?: string;
  artist?: { "#text"?: string };
  album?: { "#text"?: string };
  image?: Array<{ "#text"?: string; size?: string }>;
  url?: string;
  "@attr"?: { nowplaying?: string };
};

type LastFmResponse = {
  error?: number;
  recenttracks?: { track?: LastFmTrack | LastFmTrack[] };
};

type AppleSong = {
  kind?: string;
  trackName?: string;
  artistName?: string;
  collectionName?: string;
  artworkUrl100?: string;
  trackViewUrl?: string;
  previewUrl?: string;
};

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function secureUrl(value?: string) {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol === "http:") url.protocol = "https:";
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function highResolutionArtwork(value?: string) {
  const artwork = secureUrl(value);
  if (!artwork) return null;

  return artwork.replace(/\/\d+x\d+bb(?=\.[a-z]+(?:\?|$))/i, "/1200x1200bb");
}

function findMatchingSong(
  songs: AppleSong[],
  title: string,
  artist: string,
  album: string | null,
) {
  const titleKey = normalize(title);
  const artistKey = normalize(artist);

  const matches = songs.filter((song) => {
    const songArtist = normalize(song.artistName ?? "");
    const songTitle = normalize(song.trackName ?? "");
    return (
      song.kind === "song" &&
      (songTitle === titleKey || songTitle.startsWith(`${titleKey} feat `)) &&
      songArtist.length > 0 &&
      (songArtist.includes(artistKey) || artistKey.includes(songArtist))
    );
  });

  return (
    matches.find(
      (song) =>
        album && normalize(song.collectionName ?? "") === normalize(album),
    ) ?? matches[0]
  );
}

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;

  if (!apiKey || !username) {
    return Response.json(
      { error: "Music widget is not configured" },
      { status: 503 },
    );
  }

  const lastFmUrl = new URL("https://ws.audioscrobbler.com/2.0/");
  lastFmUrl.search = new URLSearchParams({
    method: "user.getrecenttracks",
    user: username,
    api_key: apiKey,
    format: "json",
    limit: "1",
  }).toString();

  let track: LastFmTrack | undefined;

  try {
    const response = await fetch(lastFmUrl, { next: { revalidate: 10 } });
    if (!response.ok) throw new Error("Last.fm request failed");

    const data = (await response.json()) as LastFmResponse;
    if (data.error) throw new Error("Last.fm API returned an error");

    const tracks = data.recenttracks?.track;
    track = Array.isArray(tracks) ? tracks[0] : tracks;
  } catch {
    return Response.json({ error: "Unable to load music" }, { status: 502 });
  }

  if (!track) {
    return Response.json(null, { headers: { "Cache-Control": "no-store" } });
  }

  const title = track.name?.trim();
  const artist = track.artist?.["#text"]?.trim();
  const album = track.album?.["#text"]?.trim() || null;

  if (!title || !artist) {
    return Response.json({ error: "Incomplete track data" }, { status: 502 });
  }

  const appleUrl = new URL("https://itunes.apple.com/search");
  appleUrl.search = new URLSearchParams({
    term: `${artist} ${title}`,
    media: "music",
    entity: "song",
    country: "IN",
    limit: "10",
  }).toString();

  let appleSong: AppleSong | undefined;

  try {
    const response = await fetch(appleUrl, { next: { revalidate: 3600 } });
    if (response.ok) {
      const data = (await response.json()) as { results?: AppleSong[] };
      appleSong = findMatchingSong(data.results ?? [], title, artist, album);
    }
  } catch {
    // Last.fm details remain available when the Apple catalog is unavailable.
  }

  const lastFmArtwork =
    track.image?.find((image) => image.size === "extralarge")?.["#text"] ||
    track.image?.at(-1)?.["#text"];

  const musicTrack: MusicTrack = {
    id: [artist, title, album ?? ""].map(normalize).join("|"),
    title,
    artist,
    album: appleSong?.collectionName || album,
    artwork:
      highResolutionArtwork(appleSong?.artworkUrl100) ??
      secureUrl(lastFmArtwork),
    appleMusicUrl: secureUrl(appleSong?.trackViewUrl),
    spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(`${artist} ${title}`)}`,
    previewUrl: secureUrl(appleSong?.previewUrl),
    lastFmUrl: secureUrl(track.url),
    isNowPlaying: track["@attr"]?.nowplaying === "true",
  };

  return Response.json(musicTrack, {
    headers: { "Cache-Control": "no-store" },
  });
}
