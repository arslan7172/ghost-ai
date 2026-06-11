"use client";

import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
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

        <TabsContent value="my-projects" className="flex-1 px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">No projects yet.</p>
        </TabsContent>

        <TabsContent value="shared" className="flex-1 px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">Nothing shared with you yet.</p>
        </TabsContent>
      </Tabs>

      <div className="p-4 border-t border-border">
        <Button className="w-full" variant="secondary">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>
    </aside>
  );
}
