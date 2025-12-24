"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import publications from "@/data/publications.json";

type Publication = {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  venueShort: string;
  year: number;
  categories: string[];
  doi?: string;
  arxiv?: string;
  eprint?: string;
  pdf?: string;
  slides?: string;
  patent?: string;
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

const CATEGORIES = [
  { id: "all", label: "All", emoji: "📚" },
  { id: "Blockchain", label: "Blockchain", emoji: "🔗" },
  { id: "Coding Theory", label: "Coding Theory", emoji: "📡" },
  { id: "Information Theory", label: "Info Theory", emoji: "📊" },
  { id: "Group Testing", label: "Group Testing", emoji: "🔍" },
  { id: "Combinatorics", label: "Combinatorics", emoji: "🧮" },
  { id: "DNA Storage", label: "DNA Storage", emoji: "🧬" },
  { id: "Patents", label: "Patents", emoji: "📜" },
];

export default function PublicationsPage() {
  return (
    <Suspense fallback={<PublicationsLoading />}>
      <PublicationsContent />
    </Suspense>
  );
}

function PublicationsLoading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="animate-pulse">
        <div className="h-10 bg-neutral-200 dark:bg-neutral-800 rounded w-48 mb-4" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-96 mb-8" />
      </div>
    </div>
  );
}

function PublicationsContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  // Read category from URL on mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowMobileCategories(false);
  };

  const selectedCategoryData = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  // Filter and sort publications
  const filteredPublications = useMemo(() => {
    const pubs = (publications as Publication[])
      .filter((pub) => {
        if (selectedCategory === "all") return true;
        return pub.categories.includes(selectedCategory);
      })
      .sort((a, b) => b.year - a.year);
    return pubs;
  }, [selectedCategory]);

  
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Page Header */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <p className="text-lg text-dark">
          A collection of my research papers, preprints, and patents.
        </p>
      </motion.div>

      {/* Category Filter Buttons */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        {/* Mobile: Compact category selector */}
        <div className="md:hidden">
          <div className="flex flex-col items-center gap-3">
            {/* Active category button */}
            <button
              onClick={() => setShowMobileCategories(!showMobileCategories)}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-accent text-white dark:text-[#061318]"
            >
              <span>{selectedCategoryData.emoji}</span>
              {selectedCategoryData.label}
              <svg
                className={`w-4 h-4 transition-transform ${showMobileCategories ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Expandable category list */}
            {showMobileCategories && (
              <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIES.filter(cat => cat.id !== selectedCategory).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="px-3 py-2 text-sm font-medium rounded-full card-bg border border-neutral-200 dark:border-neutral-700 card-body hover:border-accent dark:hover:border-accent transition-all duration-200"
                  >
                    <span className="mr-1">{cat.emoji}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop: Full category grid */}
        <div className="hidden md:flex items-center justify-center gap-4">
          {/* All button */}
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              selectedCategory === "all"
                ? "bg-accent text-white dark:bg-accent dark:text-[#061318]"
                : "card-bg border border-neutral-200 dark:border-neutral-700 card-body hover:border-accent dark:hover:border-accent"
            }`}
          >
            <span className="mr-1.5">📚</span>
            All
          </button>

          {/* Separator */}
          <span className="w-px h-12 bg-neutral-300 dark:bg-neutral-700" />

          {/* Category buttons - 2x4 grid */}
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.slice(1).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-accent text-white dark:bg-accent dark:text-[#061318]"
                    : "card-bg border border-neutral-200 dark:border-neutral-700 card-body hover:border-accent dark:hover:border-accent"
                }`}
              >
                <span className="mr-1">{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Publications List */}
      <div className="space-y-4">
        {filteredPublications.map((pub, index) => (
          <motion.div
            key={pub.id}
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.02 }}
          >
            <PublicationCard pub={pub} onCategoryClick={(cat) => {
              setSelectedCategory(cat);
              // Scroll to the card after state update
              setTimeout(() => {
                document.getElementById(`pub-${pub.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }, 100);
            }} />
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
            No publications found in this category.
          </p>
          <button
            onClick={() => setSelectedCategory("all")}
            className="mt-4 px-4 py-2 text-sm link-primary"
          >
            Show all publications
          </button>
        </motion.div>
      )}
    </div>
  );
}

function PublicationCard({ pub, onCategoryClick }: { pub: Publication; onCategoryClick: (cat: string) => void }) {
  const isNew = pub.year === 2025;

  // Determine the primary venue link (priority: DOI > arXiv > ePrint > Patent)
  const venueLink = pub.doi
    ? `https://doi.org/${pub.doi}`
    : pub.arxiv
    ? `https://arxiv.org/abs/${pub.arxiv}`
    : pub.eprint
    ? `https://eprint.iacr.org/${pub.eprint}.pdf`
    : pub.patent
    ? `https://patents.google.com/patent/${pub.patent}`
    : null;

  // Determine which link type is used for venue (to exclude from separate links)
  const venueLinkType = pub.doi ? 'doi' : pub.arxiv ? 'arxiv' : pub.eprint ? 'eprint' : pub.patent ? 'patent' : null;

  // Collect remaining links (excluding the one used for venue)
  const links: { label: string; href: string }[] = [];
  if (pub.pdf) links.push({ label: 'PDF', href: pub.pdf });
  if (pub.slides) links.push({ label: 'Slides', href: pub.slides });
  if (pub.doi && venueLinkType !== 'doi') links.push({ label: 'DOI', href: `https://doi.org/${pub.doi}` });
  if (pub.arxiv && venueLinkType !== 'arxiv') links.push({ label: 'arXiv', href: `https://arxiv.org/abs/${pub.arxiv}` });
  if (pub.eprint && venueLinkType !== 'eprint') links.push({ label: 'ePrint', href: `https://eprint.iacr.org/${pub.eprint}.pdf` });
  if (pub.patent && venueLinkType !== 'patent') links.push({ label: 'Patent', href: `https://patents.google.com/patent/${pub.patent}` });

  return (
    <article id={`pub-${pub.id}`} className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-accent/50 dark:hover:border-accent/50 transition-colors card-bg">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          {isNew && (
            <span className="shrink-0 px-2 py-0.5 text-xs font-semibold bg-accent text-white dark:text-[#061318] rounded">
              NEW
            </span>
          )}
          <h3 className="font-semibold card-title">
            {pub.title}
          </h3>
        </div>
        <span className="shrink-0 text-sm card-muted">
          {pub.year}
        </span>
      </div>
      <p className="text-sm card-body mb-2">
        {pub.authors.join(", ")}
      </p>

      {/* Venue, Links, and Categories Row */}
      <div className="flex flex-wrap items-center gap-2">
        {venueLink ? (
          <a
            href={venueLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm card-label link-primary"
          >
            {pub.venue}
          </a>
        ) : (
          <span className="text-sm card-label">{pub.venue}</span>
        )}
        {links.length > 0 && <span className="card-muted">·</span>}
        <div className="flex items-center gap-x-2">
          {links.map((link, index) => (
            <span key={link.label} className="flex items-center gap-x-2">
              {index > 0 && <span className="card-muted">·</span>}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm link-primary ${link.label === 'PDF' ? 'font-medium' : ''}`}
              >
                {link.label}
              </a>
            </span>
          ))}
        </div>
        <div className="flex-grow" />
        <div className="flex items-center gap-1.5">
          {pub.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryClick(cat)}
              className="px-2 py-0.5 text-xs tag-blue rounded hover:opacity-80 transition-opacity cursor-pointer"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {pub.conferenceVersion && (
        <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-sm card-muted">
          Also presented at:{" "}
          {pub.conferenceVersion.doi ? (
            <a
              href={`https://doi.org/${pub.conferenceVersion.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-body link-primary"
            >
              {pub.conferenceVersion.venue} ({pub.conferenceVersion.year})
            </a>
          ) : (
            <span className="card-body">
              {pub.conferenceVersion.venue} ({pub.conferenceVersion.year})
            </span>
          )}
          {pub.conferenceVersion.pdf && (
            <>
              <span className="ml-2">·</span>
              <a
                href={pub.conferenceVersion.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 link-primary"
              >
                PDF
              </a>
            </>
          )}
        </div>
      )}
    </article>
  );
}
