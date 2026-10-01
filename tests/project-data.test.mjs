import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { projects } from "../app/data/project.js";
import { experiences } from "../app/data/experience.js";
import {
  getProjectImages,
  getProjectCategory,
} from "../app/components/projects/projectMedia.js";

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

test("project descriptions match the linked repositories' core facts", () => {
  const bySlug = Object.fromEntries(
    projects.map((project) => [project.slug, project]),
  );
  assert.match(bySlug["dine-time-app"].description, /restaurant/i);
  assert.doesNotMatch(bySlug["dine-time-app"].description, /expense/i);
  assert.match(bySlug["the-wild-oasis-staff"].technologies, /Vite/);
  assert.doesNotMatch(bySlug["the-wild-oasis-staff"].technologies, /Next\.js/);
  assert.doesNotMatch(
    bySlug.productify.keyFeatures.join(" "),
    /ratings|search|filter/i,
  );
  assert.match(bySlug["natours-backend-api"].description, /course/i);
});

test("referenced optimized covers exist", () => {
  for (const project of projects.filter((item) => item.cover)) {
    assert.ok(existsSync(`public${project.cover}`), project.cover);
  }
});

test("company logos used in the experience section exist", () => {
  for (const experience of experiences) {
    assert.match(experience.logo, /^\/[^/]/);
    assert.ok(existsSync(`public${experience.logo}`), experience.company);
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

test("gallery assets are unique, normalized, and real for every project", () => {
  for (const project of projects) {
    const images = getProjectImages(project);
    assert.equal(new Set(images).size, images.length, project.slug);
    for (const src of images) {
      assert.match(src, /^\/[^/]/);
      assert.ok(existsSync(`public${src}`), src);
    }
  }
  assert.deepEqual(
    getProjectImages(
      projects.find((project) => project.slug === "natours-backend-api"),
    ),
    [],
  );
  assert.equal(
    getProjectImages(
      projects.find((project) => project.slug === "dine-time-app"),
    )[0],
    "/dine-time/welcome.webp",
  );
});

test("collection filters account for every project type", () => {
  const counts = {};
  for (const project of projects) {
    const category = getProjectCategory(project);
    counts[category] = (counts[category] ?? 0) + 1;
  }
  assert.deepEqual(counts, { "Open Source": 1, Mobile: 3, Web: 5, APIs: 1 });
});
