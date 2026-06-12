"use client";

import { X, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectActions } from "@/components/editor/project-actions-context";
import { MOCK_MY_PROJECTS, MOCK_SHARED_PROJECTS } from "@/types/project";
import type { Project } from "@/types/project";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  const { openCreate, openRename, openDelete } = useProjectActions();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 sm:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-12 bottom-0 z-40 flex w-72 flex-col bg-card border-r border-border transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-medium text-foreground">Projects</span>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close sidebar">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="my-projects" className="flex flex-1 flex-col overflow-hidden">
          <TabsList className="mx-4 mt-3">
            <TabsTrigger value="my-projects" className="flex-1">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex-1">
              Shared
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-projects" className="flex-1 overflow-y-auto px-2 py-2">
            {MOCK_MY_PROJECTS.length === 0 ? (
              <p className="px-2 py-4 text-center text-sm text-muted-foreground">No projects yet.</p>
            ) : (
              <ul className="flex flex-col gap-0.5">
                {MOCK_MY_PROJECTS.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    onRename={openRename}
                    onDelete={openDelete}
                  />
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent value="shared" className="flex-1 overflow-y-auto px-2 py-2">
            {MOCK_SHARED_PROJECTS.length === 0 ? (
              <p className="px-2 py-4 text-center text-sm text-muted-foreground">Nothing shared with you yet.</p>
            ) : (
              <ul className="flex flex-col gap-0.5">
                {MOCK_SHARED_PROJECTS.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t border-border">
          <Button className="w-full" variant="secondary" onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}

interface ProjectItemProps {
  project: Project;
  onRename?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

function ProjectItem({ project, onRename, onDelete }: ProjectItemProps) {
  const isOwner = project.role === "owner";

  return (
    <li className="group flex items-center gap-1 rounded-md px-2 py-1.5 hover:bg-muted/50">
      <span className="flex-1 truncate text-sm text-foreground">{project.name}</span>
      {isOwner && onRename && onDelete && (
        <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Rename ${project.name}`}
            onClick={() => onRename(project)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Delete ${project.name}`}
            onClick={() => onDelete(project)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </li>
  );
}
