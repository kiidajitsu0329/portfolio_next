'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

import type { Project } from '../types';

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const titleId = `project-title-${project.id}`;

  return (
  <div
    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xl"
    onClick={onClose}
    role="presentation"
  >
    <div
      className="relative w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto z-[61]"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
        className="absolute top-6 right-6 z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all group"
        aria-label="Close modal"
        ref={(el) => {
          if (el) {
            setTimeout(() => el.focus(), 0);
          }
        }}
      >
        <X className="w-5 h-5 text-gray-400 group-hover:text-black" />
      </button>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-72 md:h-auto relative bg-gray-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-10 md:p-16">
          <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">
            {project.category}
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mb-4">
            <span>{project.role}</span>
            <span aria-hidden="true">•</span>
            <span>{project.scope.join(' / ')}</span>
          </div>
          <h3 className="text-3xl font-bold mb-8 tracking-tight" id={titleId}>
            {project.title}
          </h3>
          <div className="space-y-8 text-gray-500 font-light leading-relaxed">
            <p className="text-lg text-black font-normal">{project.description}</p>
            <div className="pt-8 border-t border-gray-100">
              <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Project Detail</h4>
              <p>{project.detail}</p>
            </div>
            <div className="pt-8 border-t border-gray-100">
              <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Intent</h4>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-8 border-t border-gray-100">
              <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Tech Stack</h4>
              <ul className="grid grid-cols-2 gap-y-2">
                {project.tech.map((tech, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
