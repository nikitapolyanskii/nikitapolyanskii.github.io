"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import publications from "@/data/publications.json";

type Publication = {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  category: string;
  doi?: string;
  arxiv?: string;
  pdf?: string;
  tags: string[];
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function PublicationsPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique years and categories
  const years = useMemo(() => {
    const uniqueYears = [...new Set(publications.map((p) => p.year))];
    return uniqueYears.sort((a, b) => b - a);
  }, []);

  const categories = useMemo(() => {
    const allCategories = publications.map((p) => p.category);
    return [...new Set(allCategories)].sort();
  }, []);

  // Filter publications
  const filteredPublications = useMemo(() => {
    return (publications as Publication[]).filter((pub) => {
      if (selectedYear && pub.year !== selectedYear) return false;
      if (selectedCategory && pub.category !== selectedCategory) return false;
      return true;
    });
  }, [selectedYear, selectedCategory]);

  // Group by year
  const groupedPublications = useMemo(() => {
    const groups: { [key: number]: Publication[] } = {};
    filteredPublications.forEach((pub) => {
      if (!groups[pub.year]) {
        groups[pub.year] = [];
      }
      groups[pub.year].push(pub);
    });
    return Object.entries(groups)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, pubs]) => ({ year: Number(year), publications: pubs }));
  }, [filteredPublications]);

  const clearFilters = () => {
    setSelectedYear(null);
    setSelectedCategory(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Publications
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl">
          A collection of my research papers, conference publications, and other academic work.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Filter by:
          </span>

          {/* Year filter */}
          <select
            value={selectedYear ?? ""}
            onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
            className="px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Category filter */}
          <select
            value={selectedCategory ?? ""}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {(selectedYear || selectedCategory) && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          Showing {filteredPublications.length} of {publications.length} publications
        </p>
      </motion.div>

      {/* Publications List */}
      <div className="space-y-12">
        {groupedPublications.map(({ year, publications: pubs }, groupIndex) => (
          <motion.div
            key={year}
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 + groupIndex * 0.1 }}
          >
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
              {year}
            </h2>
            <div className="space-y-6">
              {pubs.map((pub) => (
                <article
                  key={pub.id}
                  className="p-6 rounded-xl border border-neutral-300 dark:border-neutral-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors bg-neutral-50 dark:bg-transparent"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {pub.title}
                    </h3>
                    <span className="shrink-0 px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded">
                      {pub.category}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                    {pub.authors.join(", ")}
                  </p>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-3">
                    {pub.venue}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    <div className="flex-grow" />
                    {pub.pdf && (
                      <a
                        href={pub.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                      >
                        PDF
                      </a>
                    )}
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        DOI
                      </a>
                    )}
                    {pub.arxiv && (
                      <a
                        href={`https://arxiv.org/abs/${pub.arxiv}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        arXiv
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPublications.length === 0 && (
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-center py-12"
        >
          <p className="text-neutral-600 dark:text-neutral-400">
            No publications match the selected filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Clear filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
