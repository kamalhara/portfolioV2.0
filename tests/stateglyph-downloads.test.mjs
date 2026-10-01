import assert from "node:assert/strict";
import test from "node:test";
import {
  combineDownloads,
  loadStateglyphDownloads,
  showDownloadsBadge,
  stateglyphPackages,
} from "../app/lib/stateglyphDownloads.js";

function fixtures(counts = [193, 171, 164, 157]) {
  return stateglyphPackages.map((packageName, index) => ({
    package: packageName,
    downloads: counts[index],
    start: "2026-09-23",
    end: "2026-09-29",
  }));
}

test("combines all four scoped packages for the same seven-day period", () => {
  assert.deepEqual(combineDownloads(fixtures().reverse()), {
    downloads: 685,
    start: "2026-09-23",
    end: "2026-09-29",
    packages: 4,
  });
});

test("badge hides below 150 and displays at exactly 150", () => {
  for (const value of [
    0,
    149,
    -1,
    null,
    undefined,
    NaN,
    Infinity,
    "150",
    150.5,
  ]) {
    assert.equal(showDownloadsBadge(value), false);
  }
  assert.equal(
    showDownloadsBadge(combineDownloads(fixtures([50, 50, 49, 0])).downloads),
    false,
  );
  assert.equal(
    showDownloadsBadge(combineDownloads(fixtures([50, 50, 50, 0])).downloads),
    true,
  );
  assert.equal(showDownloadsBadge(685), true);
});

test("rejects missing, duplicated, or unexpected packages instead of showing a partial total", () => {
  assert.throws(() => combineDownloads(fixtures().slice(1)));
  const duplicates = fixtures();
  duplicates[3] = duplicates[0];
  assert.throws(() => combineDownloads(duplicates));
  const unexpected = fixtures();
  unexpected[3].package = "@other/react";
  assert.throws(() => combineDownloads(unexpected));
});

test("rejects invalid counts and mismatched or invalid reporting dates", () => {
  for (const value of [-1, 1.5, "193", null, NaN, Infinity]) {
    const data = fixtures();
    data[0].downloads = value;
    assert.throws(() => combineDownloads(data));
  }
  for (const dates of [
    { start: "2026-09-24" },
    { end: "2026-09-30" },
    { start: "invalid" },
    { start: "2026-02-30" },
  ]) {
    const data = fixtures().map((result) => ({ ...result, ...dates }));
    assert.throws(() => combineDownloads(data));
  }
  const mismatched = fixtures();
  mismatched[1].end = "2026-09-30";
  assert.throws(() => combineDownloads(mismatched));
});

test("fetches scoped packages separately with a bounded timeout and five-minute cache", async () => {
  const requested = [];
  const result = await loadStateglyphDownloads(async (url, options) => {
    requested.push(url);
    assert.equal(options.next.revalidate, 300);
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json(fixtures().find((item) => url.endsWith(item.package)));
  });
  assert.equal(result.downloads, 685);
  assert.deepEqual(
    requested,
    stateglyphPackages.map(
      (name) => `https://api.npmjs.org/downloads/point/last-week/${name}`,
    ),
  );
});

test("an upstream failure suppresses the combined statistics", async () => {
  await assert.rejects(() =>
    loadStateglyphDownloads(async (url) => {
      if (url.endsWith("/cli")) return new Response(null, { status: 503 });
      return Response.json(
        fixtures().find((item) => url.endsWith(item.package)),
      );
    }),
  );
  await assert.rejects(() =>
    loadStateglyphDownloads(async () => {
      throw new Error("Network unavailable");
    }),
  );
});
