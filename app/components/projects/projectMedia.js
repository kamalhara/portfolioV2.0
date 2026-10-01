export function isMobileProject(project) {
  return project.type.startsWith("Mobile");
}

export function getProjectImages(project) {
  const sources = isMobileProject(project)
    ? [...(project.screenshot ?? []), project.cover]
    : [project.cover, ...(project.screenshot ?? [])];
  return [
    ...new Set(
      sources.filter(Boolean).map((src) => `/${src.replace(/^\/+/, "")}`),
    ),
  ];
}

export function getProjectCategory(project) {
  if (isMobileProject(project)) return "Mobile";
  if (project.type === "Open Source") return "Open Source";
  if (project.type === "Backend API") return "APIs";
  return "Web";
}
