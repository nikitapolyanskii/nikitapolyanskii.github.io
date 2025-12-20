"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import projects from "@/data/projects.json";

type Project = {
  id: string;
  title: string;
  description: string;
  status: "ongoing" | "completed";
  year: string;
  tags: string[];
  image: string | null;
  links: {
    github: string | null;
    paper: string | null;
    demo: string | null;
  };
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function ResearchPage() {
  const ongoingProjects = (projects as Project[]).filter((p) => p.status === "ongoing");
  const completedProjects = (projects as Project[]).filter((p) => p.status === "completed");

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Research
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl">
          An overview of my current and past research projects, exploring various
          topics and contributing to advancing knowledge in the field.
        </p>
      </motion.div>

      {/* Ongoing Projects */}
      {ongoingProjects.length > 0 && (
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Ongoing Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {ongoingProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Completed Projects */}
      {completedProjects.length > 0 && (
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
            Completed Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {completedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group p-6 rounded-xl border border-neutral-300 dark:border-neutral-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all hover:shadow-lg bg-neutral-50 dark:bg-transparent"
    >
      {/* Project Image Placeholder */}
      {project.image ? (
        <div className="w-full h-40 mb-4 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-800">
          {/* Add Image component when you have images */}
        </div>
      ) : (
        <div className="w-full h-40 mb-4 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-indigo-500/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>
        <span
          className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
            project.status === "ongoing"
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
              : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400"
          }`}
        >
          {project.status === "ongoing" ? "Ongoing" : "Completed"}
        </span>
      </div>

      <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-3">
        {project.year}
      </p>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        )}
        {project.links.paper && (
          <Link
            href={project.links.paper}
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Paper
          </Link>
        )}
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Demo
          </a>
        )}
      </div>
    </motion.article>
  );
}
