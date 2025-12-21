"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const socialLinks = [
  {
    name: "Email",
    href: "mailto:nikitapolyansky[at]gmail[dot]com".replace("[at]", "@").replace("[dot]", "."),
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Google Scholar",
    href: "https://scholar[dot]google[dot]com/citations?hl=en&user=4Y8b6l8AAAAJ&view_op=list_works&sortby=pubdate".replace(/\[dot\]/g, "."),
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/polinikita",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin[dot]com/in/nikita-polianskii-770b707b".replace(/\[dot\]/g, "."),
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

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

const researchThemes = [
  {
    id: "blockchain-consensus",
    name: "Blockchain & Consensus",
    description: "How distributed systems agree on things without anyone being in charge.",
    paperCount: 3,
    href: "/publications?category=Blockchain%20%26%20Consensus",
  },
  {
    id: "coding-theory",
    name: "Coding Theory",
    description: "The mathematics of reliable communication and error correction.",
    paperCount: 9,
    href: "/publications?category=Coding%20Theory",
  },
  {
    id: "group-testing",
    name: "Group Testing",
    description: "Finding needles in haystacks efficiently by testing groups.",
    paperCount: 11,
    href: "/publications?category=Group%20Testing",
  },
  {
    id: "combinatorics",
    name: "Combinatorics",
    description: "Counting, arranging, and understanding discrete structures.",
    paperCount: 3,
    href: "/publications?category=Combinatorics",
  },
  {
    id: "information-theory",
    name: "Information Theory",
    description: "The science of quantifying and transmitting information.",
    paperCount: 6,
    href: "/publications?category=Information%20Theory",
  },
  {
    id: "dna-molecular",
    name: "DNA & Molecular",
    description: "Storing and processing data using molecules.",
    paperCount: 3,
    href: "/publications?category=DNA%20%26%20Molecular",
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

        {/* Name */}
        <h1 className="text-3xl md:text-4xl font-bold heading-dark">
          Hi, I&apos;m Nikita
        </h1>
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
            Before this, I explored the intersection of combinatorics and coding theory at Technion and TU Munich, and worked on practical optimization of error-correcting codes for 5G at Huawei (some of which made it into the 3GPP standard!).
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
              className="p-6 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow"
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

      {/* Research Themes for Familiar Visitors */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-xl font-bold heading-dark mb-2">
          Research Themes
        </h2>
        <p className="text-dark mb-6">
          If you&apos;re here looking for a specific topic, these are my main research areas:
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {researchThemes.map((theme) => (
            <Link
              key={theme.id}
              href={theme.href}
              className="group p-4 rounded-lg bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold card-title group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {theme.name}
                </h3>
                <span className="text-sm card-muted">
                  {theme.paperCount} {theme.paperCount === 1 ? "paper" : "papers"}
                </span>
              </div>
              <p className="text-sm card-body">
                {theme.description}
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
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm"
          >
            All Publications
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium rounded-lg transition-colors text-sm"
          >
            More About Me
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
