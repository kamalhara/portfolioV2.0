import assert from "node:assert/strict";
import test from "node:test";
import {
  combineDownloads,
  downloadPeriods,
  firstPublishedDate,
  loadStateglyphDownloads,
  showDownloadsBadge,
  stateglyphPackages,
} from "../app/lib/stateglyphDownloads.js";

const reportingEnd = "2026-10-08";

function fixtures(counts = [193, 171, 164, 157]) {
  return stateglyphPackages.map((packageName, index) => ({
    package: packageName,
    downloads: counts[index],
    start: firstPublishedDate,
    end: reportingEnd,
  }));
}

function latestDay() {
  return {
    package: stateglyphPackages[0],
    downloads: 20,
    start: reportingEnd,
    end: reportingEnd,
  };
}

test("combines lifetime totals for all four scoped packages", () => {
  assert.deepEqual(combineDownloads(fixtures().reverse(), reportingEnd), {
    downloads: 685,
    start: firstPublishedDate,
    end: reportingEnd,
    packages: 4,
  });
});

test("badge shows valid lifetime totals, including zero", () => {
  for (const value of [-1, null, undefined, NaN, Infinity, "150", 150.5]) {
    assert.equal(showDownloadsBadge(value), false);
  }
  assert.equal(showDownloadsBadge(0), true);
  assert.equal(showDownloadsBadge(685), true);
});

test("splits lifetime totals into non-overlapping npm-supported date ranges", () => {
  const periods = downloadPeriods("2027-10-01");
  assert.deepEqual(periods, [
    { start: "2026-09-24", end: "2027-09-23" },
    { start: "2027-09-24", end: "2027-10-01" },
  ]);
  const results = stateglyphPackages.flatMap((packageName) =>
    periods.map((period) => ({
      package: packageName,
      downloads: 1,
      ...period,
    })),
  );
  assert.equal(combineDownloads(results, "2027-10-01").downloads, 8);
});

test("rejects missing, duplicated, or unexpected packages instead of showing a partial total", () => {
  assert.throws(() => combineDownloads(fixtures().slice(1), reportingEnd));
  const duplicates = fixtures();
  duplicates[3] = duplicates[0];
  assert.throws(() => combineDownloads(duplicates, reportingEnd));
  const unexpected = fixtures();
  unexpected[3].package = "@other/react";
  assert.throws(() => combineDownloads(unexpected, reportingEnd));
});

test("rejects invalid counts and mismatched or invalid reporting dates", () => {
  for (const value of [-1, 1.5, "193", null, NaN, Infinity]) {
    const data = fixtures();
    data[0].downloads = value;
    assert.throws(() => combineDownloads(data, reportingEnd));
  }
  for (const dates of [
    { start: "2026-09-25" },
    { end: "2026-10-07" },
    { start: "invalid" },
    { start: "2026-02-30" },
  ]) {
    const data = fixtures().map((result) => ({ ...result, ...dates }));
    assert.throws(() => combineDownloads(data, reportingEnd));
  }
  const mismatched = fixtures();
  mismatched[1].end = "2026-10-07";
  assert.throws(() => combineDownloads(mismatched, reportingEnd));
  assert.throws(() => downloadPeriods("2026-09-23"));
  assert.throws(() => downloadPeriods("2026-02-30"));
});

test("fetches the latest available day and lifetime totals with a bounded timeout and cache", async () => {
  const requested = [];
  const result = await loadStateglyphDownloads(async (url, options) => {
    requested.push(url);
    assert.equal(options.next.revalidate, 300);
    assert.ok(options.signal instanceof AbortSignal);
    if (url.includes("/last-day/")) return Response.json(latestDay());
    return Response.json(fixtures().find((item) => url.endsWith(item.package)));
  });
  assert.equal(result.downloads, 685);
  assert.deepEqual(requested, [
    `https://api.npmjs.org/downloads/point/last-day/${stateglyphPackages[0]}`,
    ...stateglyphPackages.map(
      (name) =>
        `https://api.npmjs.org/downloads/point/${firstPublishedDate}:${reportingEnd}/${name}`,
    ),
  ]);
});

test("an upstream failure suppresses the combined statistics", async () => {
  await assert.rejects(() =>
    loadStateglyphDownloads(async (url) => {
      if (url.includes("/last-day/")) return Response.json(latestDay());
      if (url.endsWith("/cli")) return new Response(null, { status: 503 });
      return Response.json(
        fixtures().find((item) => url.endsWith(item.package)),
      );
    }),
  );
  await assert.rejects(() =>
    loadStateglyphDownloads(async () =>
      Response.json({ ...latestDay(), end: "bad" }),
    ),
  );
  await assert.rejects(() =>
    loadStateglyphDownloads(async () => {
      throw new Error("Network unavailable");
    }),
  );
});
