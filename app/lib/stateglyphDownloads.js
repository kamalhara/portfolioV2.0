export const stateglyphPackages = [
  "@stateglyph/core",
  "@stateglyph/transitions",
  "@stateglyph/cli",
  "@stateglyph/react",
];

// All four packages were first published on this date.
export const firstPublishedDate = "2026-09-24";
export const downloadsRefreshMs = 5 * 60 * 1000;

const dayMs = 24 * 60 * 60 * 1000;
const maxPeriodDays = 365;

function dateTime(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error("Invalid npm reporting date");
  }

  const time = Date.parse(`${value}T00:00:00Z`);
  if (
    !Number.isFinite(time) ||
    new Date(time).toISOString().slice(0, 10) !== value
  ) {
    throw new Error("Invalid npm reporting date");
  }
  return time;
}

function dateString(time) {
  return new Date(time).toISOString().slice(0, 10);
}

export function downloadPeriods(end) {
  const lastDay = dateTime(end);
  const firstDay = dateTime(firstPublishedDate);
  if (lastDay < firstDay)
    throw new Error("npm reporting date precedes publication");

  const periods = [];
  for (let start = firstDay; start <= lastDay; start += maxPeriodDays * dayMs) {
    periods.push({
      start: dateString(start),
      end: dateString(Math.min(start + (maxPeriodDays - 1) * dayMs, lastDay)),
    });
  }
  return periods;
}

export function showDownloadsBadge(downloads) {
  return Number.isSafeInteger(downloads) && downloads >= 0;
}

export function combineDownloads(results, end) {
  const periods = downloadPeriods(end);
  const expected = new Set(
    stateglyphPackages.flatMap((packageName) =>
      periods.map(({ start, end: periodEnd }) =>
        [packageName, start, periodEnd].join("|"),
      ),
    ),
  );
  if (!Array.isArray(results) || results.length !== expected.size) {
    throw new Error("Incomplete npm download statistics");
  }

  let downloads = 0;
  for (const result of results) {
    const key = [result?.package, result?.start, result?.end].join("|");
    if (
      !expected.delete(key) ||
      !Number.isSafeInteger(result.downloads) ||
      result.downloads < 0
    ) {
      throw new Error("Inconsistent npm download statistics");
    }
    downloads += result.downloads;
  }
  if (expected.size || !Number.isSafeInteger(downloads)) {
    throw new Error("Invalid npm download total");
  }
  return {
    downloads,
    start: firstPublishedDate,
    end,
    packages: stateglyphPackages.length,
  };
}

export async function loadStateglyphDownloads(fetcher = fetch) {
  const latestResponse = await fetcher(
    `https://api.npmjs.org/downloads/point/last-day/${stateglyphPackages[0]}`,
    {
      next: { revalidate: downloadsRefreshMs / 1000 },
      signal: AbortSignal.timeout(8000),
    },
  );
  if (!latestResponse.ok) throw new Error("npm download request failed");

  const latest = await latestResponse.json();
  if (
    latest?.package !== stateglyphPackages[0] ||
    latest.start !== latest.end ||
    !Number.isSafeInteger(latest.downloads) ||
    latest.downloads < 0
  ) {
    throw new Error("Invalid latest npm download statistics");
  }

  const periods = downloadPeriods(latest.end);
  const results = await Promise.all(
    stateglyphPackages.flatMap((packageName) =>
      periods.map(async ({ start, end }) => {
        const response = await fetcher(
          `https://api.npmjs.org/downloads/point/${start}:${end}/${packageName}`,
          {
            next: { revalidate: downloadsRefreshMs / 1000 },
            signal: AbortSignal.timeout(8000),
          },
        );
        if (!response.ok) throw new Error("npm download request failed");
        return response.json();
      }),
    ),
  );
  return combineDownloads(results, latest.end);
}
