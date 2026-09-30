const MODEL = "@cf/baai/bge-base-en-v1.5";
const DIMENSIONS = 768;

function prepare(text: string): string {
  return text.trim().split(/\s+/).slice(0, 280).join(" ");
}

function assertVectors(
  data: number[][] | undefined,
  count: number,
): number[][] {
  if (
    !Array.isArray(data) ||
    data.length !== count ||
    data.some(
      (vector) =>
        !Array.isArray(vector) ||
        vector.length !== DIMENSIONS ||
        vector.some((value) => !Number.isFinite(value)),
    )
  ) {
    throw new Error("Embedding model returned invalid vectors");
  }
  return data;
}

export async function embedText(
  ai: Env["AI"],
  text: string,
): Promise<number[]> {
  const prepared = prepare(text);
  if (!prepared) throw new Error("Cannot embed empty text");
  const result = await ai.run(MODEL, { text: [prepared] });
  const data = "data" in result ? result.data : undefined;
  return assertVectors(data, 1)[0];
}

export async function embedSections(
  ai: Env["AI"],
  texts: string[],
): Promise<number[][]> {
  const batches: string[][] = [];
  for (let start = 0; start < texts.length; start += 8) {
    batches.push(texts.slice(start, start + 8).map(prepare));
  }
  const vectors = await Promise.all(
    batches.map(async (batch) => {
      const result = await ai.run(MODEL, { text: batch });
      const data = "data" in result ? result.data : undefined;
      return assertVectors(data, batch.length);
    }),
  );
  return vectors.flat();
}
