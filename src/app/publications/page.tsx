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
  eprint?: string;
  pdf?: string;
  tags: string[];
  conferenceVersion?: {
    title: string;
    venue: string;
    year: number;
    doi?: string;
    pdf?: string;
  };
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Topic descriptions for friendly intros
const topicDescriptions: { [key: string]: { emoji: string; intro: string } } = {
  "Blockchain & Consensus": {
    emoji: "🔗",
    intro: "How do distributed systems agree on things without a central authority? These papers explore DAG-based protocols and ledger designs.",
  },
  "Coding Theory": {
    emoji: "📡",
    intro: "The mathematics of reliable communication — how to send messages that survive noise and errors.",
  },
  "Group Testing": {
    emoji: "🔍",
    intro: "Finding needles in haystacks efficiently. These papers study how to identify defective items with as few tests as possible.",
  },
  "Combinatorics": {
    emoji: "🧮",
    intro: "Counting, arranging, and understanding discrete structures. Pure math that often finds surprising applications.",
  },
  "Information Theory": {
    emoji: "📊",
    intro: "The science of information — how much can we compress, transmit, and store?",
  },
  "DNA & Molecular": {
    emoji: "🧬",
    intro: "Storing and processing data using molecules. Where biology meets information theory.",
  },
};

export default function PublicationsPage() {
  const [viewMode, setViewMode] = useState<"topic" | "year">("topic");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());

  const toggleTopic = (category: string) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const toggleYear = (year: number) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  };

  const expandAll = () => {
    if (viewMode === "topic") {
      setExpandedTopics(new Set(groupedByTopic.map((g) => g.category)));
    } else {
      setExpandedYears(new Set(groupedByYear.map((g) => g.year)));
    }
  };

  const collapseAll = () => {
    if (viewMode === "topic") {
      setExpandedTopics(new Set());
    } else {
      setExpandedYears(new Set());
    }
  };

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

  // Group by category/topic
  const groupedByTopic = useMemo(() => {
    const groups: { [key: string]: Publication[] } = {};
    filteredPublications.forEach((pub) => {
      if (!groups[pub.category]) {
        groups[pub.category] = [];
      }
      groups[pub.category].push(pub);
    });
    // Sort by number of publications (most first)
    return Object.entries(groups)
      .sort(([, a], [, b]) => b.length - a.length)
      .map(([category, pubs]) => ({
        category,
        publications: pubs.sort((a, b) => b.year - a.year),
      }));
  }, [filteredPublications]);

  // Group by year
  const groupedByYear = useMemo(() => {
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
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold heading-dark mb-4">
          Publications
        </h1>
        <p className="text-dark mb-8 max-w-2xl">
          Here&apos;s what I&apos;ve been working on over the years. Click on any topic to explore, or use the filters to find something specific.
        </p>
      </motion.div>

      {/* View Mode Toggle & Filters */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        <div className="flex flex-wrap items-center gap-4">
          {/* View mode toggle */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <button
              onClick={() => setViewMode("topic")}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                viewMode === "topic"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              By Topic
            </button>
            <button
              onClick={() => setViewMode("year")}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                viewMode === "year"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              By Year
            </button>
          </div>

          <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-700" />

          {/* Year filter */}
          <select
            value={selectedYear ?? ""}
            onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
            className="px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Topics</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {(selectedYear || selectedCategory) && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear filters
            </button>
          )}

          <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-700" />

          <button
            onClick={expandAll}
            className="px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Expand all
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Collapse all
          </button>
        </div>

        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          {filteredPublications.length} publications
        </p>
      </motion.div>

      {/* Publications by Topic */}
      {viewMode === "topic" && (
        <div className="space-y-4">
          {groupedByTopic.map(({ category, publications: pubs }, groupIndex) => {
            const isExpanded = expandedTopics.has(category);
            return (
              <motion.div
                key={category}
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.2 + groupIndex * 0.05 }}
                className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleTopic(category)}
                  className="w-full p-5 flex items-center justify-between card-bg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left"
                >
                  <div>
                    <h2 className="text-lg font-bold card-title flex items-center gap-2">
                      <span>{topicDescriptions[category]?.emoji || "📄"}</span>
                      {category}
                      <span className="text-sm font-normal card-muted">
                        ({pubs.length})
                      </span>
                    </h2>
                    <p className="card-body text-sm mt-1">
                      {topicDescriptions[category]?.intro || "Research papers in this area."}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-neutral-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 pt-0 space-y-4"
                  >
                    <div className="pt-4 space-y-4">
                      {pubs.map((pub) => (
                        <PublicationCard key={pub.id} pub={pub} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Publications by Year */}
      {viewMode === "year" && (
        <div className="space-y-4">
          {groupedByYear.map(({ year, publications: pubs }, groupIndex) => {
            const isExpanded = expandedYears.has(year);
            return (
              <motion.div
                key={year}
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.2 + groupIndex * 0.05 }}
                className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full p-5 flex items-center justify-between card-bg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left"
                >
                  <h2 className="text-lg font-bold card-title flex items-center gap-2">
                    {year}
                    <span className="text-sm font-normal card-muted">
                      ({pubs.length} {pubs.length === 1 ? "paper" : "papers"})
                    </span>
                  </h2>
                  <svg
                    className={`w-5 h-5 text-neutral-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 pt-0 space-y-4"
                  >
                    <div className="pt-4 space-y-4">
                      {pubs.map((pub) => (
                        <PublicationCard key={pub.id} pub={pub} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

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
            className="mt-4 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear filters
          </button>
        </motion.div>
      )}
    </div>
  );
}

function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <article className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 dark:hover:border-blue-500 transition-colors card-bg">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-semibold card-title">
          {pub.title}
        </h3>
        <span className="shrink-0 text-sm card-muted">
          {pub.year}
        </span>
      </div>
      <p className="text-sm card-body mb-2">
        {pub.authors.join(", ")}
      </p>
      <p className="text-sm card-label mb-3">
        {pub.venue}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {pub.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs tag-gray rounded"
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
            className="text-sm card-label hover:underline font-medium"
          >
            PDF
          </a>
        )}
        {pub.doi && (
          <a
            href={`https://doi.org/${pub.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm card-label hover:underline"
          >
            DOI
          </a>
        )}
        {pub.arxiv && (
          <a
            href={`https://arxiv.org/abs/${pub.arxiv}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm card-label hover:underline"
          >
            arXiv
          </a>
        )}
        {pub.eprint && (
          <a
            href={`https://eprint.iacr.org/${pub.eprint}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm card-label hover:underline"
          >
            ePrint
          </a>
        )}
      </div>
      {pub.conferenceVersion && (
        <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-sm card-muted">
          Also presented at:{" "}
          <span className="card-body">
            {pub.conferenceVersion.venue} ({pub.conferenceVersion.year})
          </span>
          {pub.conferenceVersion.doi && (
            <a
              href={`https://doi.org/${pub.conferenceVersion.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 card-label hover:underline"
            >
              DOI
            </a>
          )}
          {pub.conferenceVersion.pdf && (
            <a
              href={pub.conferenceVersion.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 card-label hover:underline"
            >
              PDF
            </a>
          )}
        </div>
      )}
    </article>
  );
}
