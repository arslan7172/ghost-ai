"use client";

import { useState, useCallback } from "react";
import type { Project } from "@/types/project";

type DialogType = "create" | "rename" | "delete" | null;

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function useProjectDialogs() {
  const [dialog, setDialog] = useState<DialogType>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [loading, setLoading] = useState(false);

  const openCreate = useCallback(() => {
    setNameInput("");
    setActiveProject(null);
    setDialog("create");
  }, []);

  const openRename = useCallback((project: Project) => {
    setActiveProject(project);
    setNameInput(project.name);
    setDialog("rename");
  }, []);

  const openDelete = useCallback((project: Project) => {
    setActiveProject(project);
    setDialog("delete");
  }, []);

  const close = useCallback(() => {
    setDialog(null);
    setActiveProject(null);
    setNameInput("");
  }, []);

  const submit = useCallback(async () => {
    setLoading(true);
    await new Promise<void>((r) => setTimeout(r, 400));
    setLoading(false);
    close();
  }, [close]);

  return {
    dialog,
    activeProject,
    nameInput,
    slug: toSlug(nameInput),
    loading,
    setNameInput,
    openCreate,
    openRename,
    openDelete,
    close,
    submit,
  };
}

export type ProjectDialogsState = ReturnType<typeof useProjectDialogs>;
