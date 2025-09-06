import React, { useState } from 'react';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useApp } from '@/contexts/AppContext';
import { Plus, FolderOpen, Users, Calendar, Settings, LogOut, Layers3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const { user, projects, logout, createProject, setCurrentProject } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    createProject(newProject.name, newProject.description);
    setNewProject({ name: '', description: '' });
    setIsCreateModalOpen(false);
  };

  const handleProjectClick = (project: any) => {
    setCurrentProject(project);
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-gradient-primary p-1.5 sm:p-2 rounded-lg">
                <Layers3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-bold text-foreground truncate">SynergySphere</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden xs:block">Welcome back, {user?.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="sm:hidden p-2">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={logout} className="hidden sm:flex">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <Button variant="outline" size="sm" onClick={logout} className="sm:hidden p-2">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Your Projects</h2>
              <p className="text-muted-foreground">
                Manage and track progress across all your projects
              </p>
            </div>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button variant="gradient" size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Add a new project to start organizing your tasks and team collaboration.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateProject} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input
                      id="project-name"
                      placeholder="Enter project name"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea
                      id="project-description"
                      placeholder="Describe your project..."
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" type="button" onClick={() => setIsCreateModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="gradient">
                      Create Project
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full">
              <Card className="border-dashed border-2 border-border bg-card/50">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No projects yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Get started by creating your first project
                  </p>
                  <Button variant="gradient" onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            projects.map((project) => (
              <Card 
                key={project.id} 
                className="hover:shadow-elevated transition-all duration-200 cursor-pointer bg-gradient-card border-0 animate-slide-up"
                onClick={() => handleProjectClick(project)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{project.name}</span>
                    <Badge variant="secondary">Active</Badge>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {project.memberCount} members
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      <FolderOpen className="h-4 w-4 mr-2" />
                      View Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          variant="gradient" 
          size="icon"
          className="h-14 w-14 rounded-full shadow-elevated hover:shadow-glow transition-all duration-300 hover:scale-110"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;