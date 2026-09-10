import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { projects } from "../app/data/project.js";

test("project slugs are unique", () => {
  const slugs = projects.map((project) => project.slug);
  assert.equal(new Set(slugs).size, slugs.length);
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
