"use client";

import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProjectDialogsState } from "@/hooks/use-project-dialogs";

type Props = ProjectDialogsState;

export function ProjectDialogs(props: Props) {
  return (
    <>
      <CreateProjectDialog {...props} />
      <RenameProjectDialog {...props} />
      <DeleteProjectDialog {...props} />
    </>
  );
}

function CreateProjectDialog({ dialog, nameInput, slug, loading, setNameInput, close, submit }: Props) {
  const open = dialog === "create";

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>Give your new architecture workspace a name.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="Project name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && nameInput.trim() && submit()}
            autoFocus
          />
          <p className="text-xs text-muted-foreground">
            Slug:{" "}
            <span className="font-mono text-foreground">
              {slug || <span className="text-muted-foreground">—</span>}
            </span>
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={close} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={loading || !nameInput.trim()}>
            {loading ? "Creating…" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RenameProjectDialog({ dialog, activeProject, nameInput, loading, setNameInput, close, submit }: Props) {
  const open = dialog === "rename";
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          {activeProject && (
            <DialogDescription>
              Renaming <span className="text-foreground font-medium">{activeProject.name}</span>
            </DialogDescription>
          )}
        </DialogHeader>

        <Input
          ref={inputRef}
          placeholder="New project name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && nameInput.trim() && submit()}
        />

        <DialogFooter>
          <Button variant="outline" onClick={close} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={loading || !nameInput.trim()}>
            {loading ? "Renaming…" : "Rename"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteProjectDialog({ dialog, activeProject, loading, close, submit }: Props) {
  const open = dialog === "delete";

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            {activeProject ? (
              <>
                Are you sure you want to delete{" "}
                <span className="text-foreground font-medium">{activeProject.name}</span>? This action cannot be undone.
              </>
            ) : (
              "Are you sure? This action cannot be undone."
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={close} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={submit} disabled={loading}>
            {loading ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
