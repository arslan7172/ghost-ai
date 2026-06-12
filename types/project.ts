export type ProjectRole = "owner" | "collaborator";

export interface Project {
  id: string;
  name: string;
  slug: string;
  role: ProjectRole;
}

export const MOCK_MY_PROJECTS: Project[] = [
  { id: "1", name: "Ghost API", slug: "ghost-api", role: "owner" },
  { id: "2", name: "Design System", slug: "design-system", role: "owner" },
];

export const MOCK_SHARED_PROJECTS: Project[] = [
  { id: "3", name: "Shared Workspace", slug: "shared-workspace", role: "collaborator" },
];
