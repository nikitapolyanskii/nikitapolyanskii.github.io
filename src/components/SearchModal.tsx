"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import publications from "@/data/publications.json";

interface SearchResult {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  venueShort: string;
  year: number;
  categories: string[];
  tags: string[];
  pdf?: string;
  arxiv?: string;
  doi?: string;
  eprint?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const search = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const filtered = publications.filter((pub) => {
      const titleMatch = pub.title.toLowerCase().includes(lowerQuery);
      const authorMatch = pub.authors.some((author) =>
        author.toLowerCase().includes(lowerQuery)
      );
      const venueMatch = pub.venue.toLowerCase().includes(lowerQuery);
      const tagMatch = pub.tags?.some((tag) =>
        tag.toLowerCase().includes(lowerQuery)
      );
      const categoryMatch = pub.categories?.some((cat) =>
        cat.toLowerCase().includes(lowerQuery)
      );

      return titleMatch || authorMatch || venueMatch || tagMatch || categoryMatch;
    });

    setResults(filtered.slice(0, 8));
  }, []);

  useEffect(() => {
    search(query);
  }, [query, search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          onClose(); // This will toggle in parent
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          >
            <div
              className="modal-bg rounded-2xl shadow-2xl border overflow-hidden w-full max-w-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b modal-bg">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-neutral-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search publications..."
                    className="flex-1 bg-transparent text-neutral-900 dark:text-white placeholder-neutral-400 outline-none text-lg"
                    autoFocus
                  />
                  <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-neutral-400 kbd-bg rounded">
                    ESC
                  </kbd>
                </div>
              </div>

              {results.length > 0 && (
                <div className="max-h-96 overflow-y-auto">
                  {results.map((result) => {
                    const getPdfUrl = () => {
                      if (result.pdf) return result.pdf;
                      if (result.arxiv) return `https://arxiv.org/pdf/${result.arxiv}.pdf`;
                      if (result.eprint) return `https://eprint.iacr.org/${result.eprint}.pdf`;
                      if (result.doi) return `https://doi.org/${result.doi}`;
                      return null;
                    };
                    const pdfUrl = getPdfUrl();

                    return (
                      <div
                        key={result.id}
                        className="p-4 modal-item border-b border-neutral-100 dark:border-neutral-800 last:border-0 transition-colors"
                      >
                        <a
                          href={`#pub-${result.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onClose();
                            setTimeout(() => {
                              document.getElementById(`pub-${result.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 100);
                          }}
                          className="block cursor-pointer"
                        >
                          <h4 className="font-medium text-neutral-900 dark:text-white text-sm line-clamp-1">
                            {result.title}
                          </h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            {result.authors.slice(0, 3).join(", ")}
                            {result.authors.length > 3 && " et al."}
                          </p>
                        </a>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs link-primary">
                              {result.venueShort}
                            </span>
                            <span className="text-xs text-neutral-400">
                              {result.year}
                            </span>
                          </div>
                          {pdfUrl && (
                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="btn-fancy text-xs"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              PDF
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {query && results.length === 0 && (
                <div className="p-8 text-center text-neutral-500">
                  No publications found for &quot;{query}&quot;
                </div>
              )}

              {!query && (
                <div className="p-6 text-center text-neutral-400 text-sm">
                  <p>Search by title, author, venue, or topic</p>
                  <p className="mt-2 text-xs">
                    Try: &quot;consensus&quot;, &quot;coding theory&quot;, &quot;blockchain&quot;
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
