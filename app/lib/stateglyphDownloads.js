export const stateglyphPackages = [
  "@stateglyph/core",
  "@stateglyph/transitions",
  "@stateglyph/cli",
  "@stateglyph/react",
];

export const downloadsRefreshMs = 5 * 60 * 1000;

export function showDownloadsBadge(downloads) {
  return Number.isSafeInteger(downloads) && downloads >= 150;
}

export function combineDownloads(results) {
  if (!Array.isArray(results) || results.length !== stateglyphPackages.length) {
    throw new Error("Incomplete npm download statistics");
  }

  const packages = new Set();
  const { start, end } = results[0] ?? {};
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(start) || !datePattern.test(end)) {
    throw new Error("Invalid npm reporting dates");
  }
  const startTime = Date.parse(`${start}T00:00:00Z`);
  const endTime = Date.parse(`${end}T00:00:00Z`);
  if (
    new Date(startTime).toISOString().slice(0, 10) !== start ||
    new Date(endTime).toISOString().slice(0, 10) !== end ||
    endTime - startTime !== 6 * 24 * 60 * 60 * 1000
  ) {
    throw new Error("Invalid npm weekly reporting period");
  }

  let downloads = 0;
  for (const result of results) {
    if (
      !result ||
      !stateglyphPackages.includes(result.package) ||
      packages.has(result.package) ||
      !Number.isSafeInteger(result.downloads) ||
      result.downloads < 0 ||
      result.start !== start ||
      result.end !== end
    ) {
      throw new Error("Inconsistent npm download statistics");
    }
    packages.add(result.package);
    downloads += result.downloads;
  }
  if (!Number.isSafeInteger(downloads)) {
    throw new Error("Invalid npm download total");
  }
  return { downloads, start, end, packages: packages.size };
}

export async function loadStateglyphDownloads(fetcher = fetch) {
  const results = await Promise.all(
    stateglyphPackages.map(async (packageName) => {
      const response = await fetcher(
        `https://api.npmjs.org/downloads/point/last-week/${packageName}`,
        {
          next: { revalidate: downloadsRefreshMs / 1000 },
          signal: AbortSignal.timeout(8000),
        },
      );
      if (!response.ok) throw new Error("npm download request failed");
      return response.json();
    }),
  );
  return combineDownloads(results);
}
