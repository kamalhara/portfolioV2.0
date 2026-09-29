export type MusicTrack = {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  artwork: string | null;
  appleMusicUrl: string | null;
  spotifyUrl: string;
  previewUrl: string | null;
  lastFmUrl: string | null;
  isNowPlaying: boolean;
};
