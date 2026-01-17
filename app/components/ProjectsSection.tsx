'use client';

import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';

type ProjectsSectionProps = {
  projects: Project[];
  onSelect: (projectId: Project['id']) => void;
};

export const ProjectsSection = ({ projects, onSelect }: ProjectsSectionProps) => (
  <section id="work" className="px-6 py-20 max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight">Featured Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onSelect={onSelect} />
      ))}
    </div>
  </section>
);
