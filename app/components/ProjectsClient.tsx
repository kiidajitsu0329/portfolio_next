'use client';

import { useMemo, useState, useCallback } from 'react';

import { projects } from '../data/projects';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { ProjectsSection } from './ProjectsSection';
import { ProjectModal } from './ProjectModal';

export const ProjectsClient = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useBodyScrollLock(selectedProjectId !== null);

  const openProject = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [selectedProjectId]
  );

  return (
    <>
      <ProjectsSection projects={projects} onSelect={openProject} />
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </>
  );
};
