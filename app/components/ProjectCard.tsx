'use client';

import Image from 'next/image';

import type { Project } from '../types';
import { CLASS_NAMES } from '../constants';

type ProjectCardProps = {
  project: Project;
  onSelect: (projectId: Project['id']) => void;
};

export const ProjectCard = ({ project, onSelect }: ProjectCardProps) => (
  // Interactive card opens the project detail modal.
  <article
    className={CLASS_NAMES.PROJECT_CARD}
    onClick={() => onSelect(project.id)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onSelect(project.id);
      }
    }}
    role="button"
    tabIndex={0}
  >
    <div className="aspect-video bg-gray-200 flex items-center justify-center relative overflow-hidden">
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
      <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full text-xs font-medium">
          {project.category}
        </span>
      </div>
    </div>
    <div className="p-10">
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mb-3">
        <span>{project.role}</span>
        <span aria-hidden="true">•</span>
        <span>{project.scope.join(' / ')}</span>
      </div>
      <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
      <p className="text-gray-500 font-light leading-relaxed">{project.summary}</p>
    </div>
  </article>
);
