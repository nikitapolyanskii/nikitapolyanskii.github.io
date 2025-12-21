"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const dagPapers = [
  {
    title: "Tangle 2.0",
    year: "2022",
    status: "published" as const,
    challenge: "In traditional blockchains, one node proposes a block and everyone waits. Can we do better?",
    approach: "We designed a protocol where all nodes can propose blocks simultaneously, building a DAG instead of a chain. This unlocks parallelism while maintaining consensus.",
    venue: "IEEE Access",
    doi: "10.1109/ACCESS.2022.3211422",
  },
  {
    title: "Slipstream",
    year: "2024",
    status: "published" as const,
    challenge: "Users want fast confirmations, but security often requires waiting. Can we have both?",
    approach: "We created an \"ebb-and-flow\" protocol — an optimistic ordering confirms quickly (assuming honest majority), while a finalized ordering follows behind with stronger guarantees.",
    arxiv: "2410.14876",
  },
  {
    title: "Starfish",
    year: "2025",
    status: "published" as const,
    challenge: "Uncertified DAG-based protocols achieve low latency, but their liveness was never proven. Communication costs are also high: O(Mn²) for payload and O(κn⁴) for consensus metadata per round.",
    approach: "We introduce a pacemaker that provably ensures liveness. Using Reed-Solomon coding and threshold signatures, we reduce costs to O(Mn) for payload and O(κn²) for metadata — the first quadratic bound for any full-DAG BFT protocol.",
    eprint: "2025/567",
  },
  {
    title: "SoK: DAG-based Consensus",
    year: "2024",
    status: "published" as const,
    challenge: "There are many DAG consensus protocols now. How do they compare?",
    approach: "We systematically analyzed all DAG protocols through the lens of the CAP theorem — what trade-offs does each one make between consistency, availability, and partition tolerance?",
    arxiv: "2411.10026",
  },
];

const researchTopics = [
  {
    id: "blockchain-consensus",
    name: "Blockchain & Consensus",
    description: "How distributed systems agree on things without anyone being in charge.",
    href: "/publications?category=Blockchain%20%26%20Consensus",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    id: "coding-theory",
    name: "Coding Theory",
    description: "The mathematics of reliable communication and error correction.",
    href: "/publications?category=Coding%20Theory",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: "group-testing",
    name: "Group Testing",
    description: "Finding needles in haystacks efficiently by testing groups.",
    href: "/publications?category=Group%20Testing",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: "combinatorics",
    name: "Combinatorics",
    description: "Counting, arranging, and understanding discrete structures.",
    href: "/publications?category=Combinatorics",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id: "information-theory",
    name: "Information Theory",
    description: "The science of quantifying and transmitting information.",
    href: "/publications?category=Information%20Theory",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: "dna-molecular",
    name: "DNA & Molecular",
    description: "Storing and processing data using molecules.",
    href: "/publications?category=DNA%20%26%20Molecular",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mb-12"
      >
        {/* Profile Photo */}
        <div className="mb-6">
          <div className="w-56 h-56 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
            <Image
              src="/photos/NPolianskii_small.jpg"
              alt="Nikita Polyanskii"
              width={224}
              height={224}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

        {/* Name & Role */}
        <h1 className="text-2xl font-bold heading-dark mb-1">Nikita Polyanskii</h1>
        <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">Research Scientist and Engineer</p>

        {/* Info */}
        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>IOTA Foundation</span>
            <span className="text-neutral-400 dark:text-neutral-500">·</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Munich, Germany</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:nikita.polianskii@iota.org" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                nikita.polianskii@iota.org
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:nikitapolyansky@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                nikitapolyansky@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://scholar.google.com/citations?hl=en&user=4Y8b6l8AAAAJ&view_op=list_works&sortby=pubdate"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            aria-label="Google Scholar"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/>
            </svg>
          </a>
          <a
            href="https://github.com/polinikita"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/nikita-polianskii-770b707b"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://www.researchgate.net/profile/Nikita-Polyanskii"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            aria-label="ResearchGate"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.121 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .078.53h-.005a3.334 3.334 0 0 0 .112.438c.243.743.65 1.303 1.213 1.68.565.376 1.256.564 2.073.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.335-.311.622-.603.853-.29.232-.68.347-1.138.347-.422 0-.787-.09-1.09-.272a1.847 1.847 0 0 1-.74-.802c-.165-.345-.253-.764-.253-1.252v-4.082c0-.495.085-.91.256-1.262.17-.345.426-.617.74-.795.303-.18.67-.27 1.09-.27.488 0 .882.126 1.178.39.296.263.492.615.574 1.067.028.13.096.2.196.2h1.37c.11 0 .165-.072.15-.183a3.897 3.897 0 0 0-.318-1.154 3.706 3.706 0 0 0-.75-1.048 3.344 3.344 0 0 0-1.087-.716A3.755 3.755 0 0 0 19.586 0zM4.414 5.945c-.093 0-.14.047-.14.14v11.778c0 .094.047.14.14.14H5.9c.093 0 .14-.046.14-.14v-4.317c0-.095.046-.14.14-.14h1.728c.093 0 .14.045.14.14v4.317c0 .094.047.14.14.14h1.486c.094 0 .14-.046.14-.14V6.086c0-.094-.046-.14-.14-.14H8.188c-.093 0-.14.046-.14.14v4.226c0 .094-.047.14-.14.14H6.18c-.094 0-.14-.046-.14-.14V6.086c0-.094-.047-.14-.14-.14z"/>
            </svg>
          </a>
        </div>
      </motion.section>

      {/* Personal Intro */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-16"
      >
        <div className="max-w-none">
          <p className="text-lg text-dark leading-relaxed">
            I work at the{" "}
            <a href="https://iota.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
              IOTA Foundation
            </a>
            {" "}where I get to think about how distributed systems can agree on things without anyone being in charge.
            Before this, I explored the intersection of combinatorics and coding theory at Technion and TU Munich, and worked on practical optimization of error-correcting codes for 5G at Huawei (some of which made it into the{" "}
            <a href="https://www.3gpp.org/specifications" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
              3GPP standard
            </a>
            ).
          </p>
          <p className="text-lg text-dark leading-relaxed mt-4">
            I&apos;m fascinated by problems at the intersection of theory and practice — taking mathematical ideas and turning them into systems that actually work.
          </p>
        </div>
      </motion.section>

      {/* DAG Consensus Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold heading-dark mb-2">
          What I&apos;m Working On
        </h2>
        <p className="text-dark mb-8">
          My main focus is DAG-based consensus protocols — making distributed systems faster and more reliable.
        </p>

        <div className="grid gap-6">
          {dagPapers.map((paper, index) => (
            <motion.div
              key={paper.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="p-6 rounded-xl card-bg border border-neutral-200 dark:border-neutral-800"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-semibold card-title">
                  {paper.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm card-muted">
                    {paper.year}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    Published
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium card-label mb-1">
                    The challenge
                  </p>
                  <p className="card-body">
                    {paper.challenge}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium card-label mb-1">
                    Our approach
                  </p>
                  <p className="card-body">
                    {paper.approach}
                  </p>
                </div>
              </div>

              {(paper.doi || paper.arxiv || paper.eprint || paper.venue) && (
                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-4 text-sm">
                  {paper.venue && (
                    <span className="card-muted">
                      {paper.venue}
                    </span>
                  )}
                  {paper.doi && (
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-label hover:underline"
                    >
                      DOI
                    </a>
                  )}
                  {paper.arxiv && (
                    <a
                      href={`https://arxiv.org/abs/${paper.arxiv}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-label hover:underline"
                    >
                      arXiv
                    </a>
                  )}
                  {paper.eprint && (
                    <a
                      href={`https://eprint.iacr.org/${paper.eprint}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-label hover:underline"
                    >
                      ePrint
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Research Topics */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-xl font-bold heading-dark mb-2">
          Research Topics
        </h2>
        <p className="text-dark mb-6">
          If you&apos;re here looking for a specific topic, these are my main research areas:
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {researchTopics.map((topic) => (
            <Link
              key={topic.id}
              href={topic.href}
              className="group p-4 rounded-lg card-bg border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold card-title group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {topic.name}
                </h3>
                <span className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  {topic.icon}
                </span>
              </div>
              <p className="text-sm card-body">
                {topic.description}
              </p>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Other Research */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-xl font-bold heading-dark mb-4">
          Other Things I Think About
        </h2>
        <p className="text-dark mb-6">
          Beyond the themes above, I&apos;ve worked on various problems in coding theory, combinatorics, and information theory.
          Check out my publications to see the full picture.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/publications"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm"
          >
            All Publications
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium rounded-lg transition-colors text-sm"
          >
            My Background
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
