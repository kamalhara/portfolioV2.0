import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { projects } from "../app/data/project.js";

test("project slugs are unique", () => {
  const slugs = projects.map((project) => project.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("StateGlyph is the sole primary project and leads the collection", () => {
  assert.equal(projects[0].slug, "stateglyph");
  assert.equal(projects[0].featured, true);
  assert.deepEqual(
    projects
      .filter((project) => project.featured)
      .map((project) => project.slug),
    ["stateglyph"],
  );
});

test("projects contain the fields used by routes", () => {
  for (const project of projects) {
    assert.ok(project.title);
    assert.ok(project.slug);
    assert.ok(project.description);
    assert.ok(project.technologies);
    assert.ok(project.overview);
    assert.ok(project.keyFeatures.length > 0);
  }
});

test("referenced optimized covers exist", () => {
  for (const project of projects.filter((item) => item.cover)) {
    assert.ok(existsSync(`public${project.cover}`), project.cover);
  }
});

test("screenshot references are valid public asset paths", () => {
  for (const project of projects.filter((item) => item.screenshot)) {
    for (const screenshot of project.screenshot) {
      assert.equal(typeof screenshot, "string", project.slug);
      assert.ok(existsSync(`public/${screenshot}`), screenshot);
    }
  }
});
