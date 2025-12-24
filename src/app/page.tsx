"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import authorLinks from "@/data/authors.json";

// Obfuscated email component - renders only on client to prevent bot scraping
function ObfuscatedEmail({ user, domain, className }: { user: string; domain: string; className?: string }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Construct email only on client side
    setEmail(`${user}@${domain}`);
  }, [user, domain]);

  if (!email) return <span className={className}>loading...</span>;

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const selectedContributions = [
  {
    title: "Starfish: A Full-DAG BFT Protocol with Optimal Communication Complexity",
    description: <>Designed and implemented a high-performance DAG-based <a href="https://en.wikipedia.org/wiki/Consensus_(computer_science)" target="_blank" rel="noopener noreferrer" className="link-accent">consensus</a> protocol that is provably live and safe and achieves optimal communication complexity using error-correcting codes and threshold signatures.</>,
    authors: ["Nikita Polyanskii", "Sebastian Müller", "Ilya Vorobyev"],
    venue: "Preprint",
    venueShort: "Preprint",
    year: 2025,
    pdf: "/writings/2025-44-starfish/preprint.pdf",
    slides: "/writings/2025-44-starfish/slides.pdf",
    adopted: { label: "Adopted by", name: "IOTA", url: "https://github.com/iotaledger/iota" },
  },
  {
    title: "Codes for the Z-Channel",
    description: <>Provided a tight characterization of binary codes above the <a href="https://en.wikipedia.org/wiki/Plotkin_bound" target="_blank" rel="noopener noreferrer" className="link-accent">Plotkin point</a> for the channel where only errors of type 1→0 occur.</>,
    authors: ["Nikita Polyanskii", "Yihan Zhang"],
    venue: "IEEE Transactions on Information Theory",
    venueShort: "IEEE TIT",
    year: 2023,
    doi: "10.1109/TIT.2023.3292219",
    isit: "/writings/2023-4-z-channel/isit-slides.pdf",
  },
  {
    title: "Weight Distributions for Successive Cancellation Decoding of Polar Codes",
    description: <>Developed methods to compute weight distributions arising when decoding <a href="https://en.wikipedia.org/wiki/Polar_code_(coding_theory)" target="_blank" rel="noopener noreferrer" className="link-accent">polar codes</a> — this helped to improve the way to encode bits for data transmission in 5G networks.</>,
    authors: ["Rina Polyanskaya", "Mars Davletshin", "Nikita Polyanskii"],
    venue: "IEEE Transactions on Communications",
    venueShort: "IEEE TCOM",
    year: 2020,
    pdf: "/writings/2020-14-polar-codes-weight/paper.pdf",
    doi: "10.1109/TCOMM.2020.3014625",
    adopted: { label: "Contributed to", name: "5G", url: "https://patents.google.com/patent/US11811528B2" },
  },
  {
    title: "On the metric dimension of Cartesian powers of a graph",
    description: <>Solved a 20-year-old conjecture on the <a href="https://en.wikipedia.org/wiki/Mastermind_(board_game)" target="_blank" rel="noopener noreferrer" className="link-accent">Mastermind game</a> — how many questions are sufficient to guess an n-digit number.</>,
    authors: ["Zilin Jiang", "Nikita Polyanskii"],
    venue: "Journal of Combinatorial Theory, Series A",
    venueShort: "JCTA",
    year: 2019,
    pdf: "/writings/2019-17-metric-dimension/paper.pdf",
    doi: "10.1016/j.jcta.2019.01.002",
    slides: "/writings/2019-17-metric-dimension/slides.pdf",
    soda: "/writings/2019-17-metric-dimension/soda-2019.pdf",
  },
];

const researchTopics = [
  {
    id: "blockchain-consensus",
    name: "Blockchain",
    description: "How distributed systems agree on things without anyone being in charge.",
    href: "/writings?category=Blockchain",
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
    href: "/writings?category=Coding%20Theory",
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
    href: "/writings?category=Group%20Testing",
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
    href: "/writings?category=Combinatorics",
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
    href: "/writings?category=Information%20Theory",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: "dna-molecular",
    name: "DNA Storage",
    description: "Storing and processing data using molecules.",
    href: "/writings?category=DNA%20Storage",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        {/* Profile Card - full width on mobile, floats left on md+ */}
        <div className="mb-6 md:float-left md:mr-10 md:mb-4 text-center md:text-left">
          {/* Photo */}
          <div className="w-full max-w-[224px] mx-auto md:mx-0 aspect-square rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 mb-4">
            <Image
              src="/photos/NPolianskii_small.jpg"
              alt="Nikita Polyanskii"
              width={224}
              height={224}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          {/* Name & Role */}
          <h1 className="text-2xl font-bold heading-dark mb-1">Nikita Polyanskii</h1>
          {/* Role - visible on desktop only */}
          <p className="hidden md:block link-primary font-medium text-sm mb-4">Research Scientist and Engineer</p>

          {/* Toggle button - mobile only */}
          <div className="md:hidden flex flex-col items-center mb-3">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="btn-fancy"
            >
              {showDetails ? 'Hide contacts' : 'Show contacts'}
              <svg
                className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Role - visible on mobile only when expanded, below button */}
            <p className={`link-primary font-medium text-sm mt-2 ${showDetails ? 'block' : 'hidden'}`}>Research Scientist and Engineer</p>
          </div>

          {/* Info - collapsible on mobile */}
          <div className={`space-y-1 text-sm contact-info mb-3 ${showDetails ? 'block' : 'hidden'} md:block`}>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>IOTA Foundation</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Munich, Germany</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <ObfuscatedEmail
                user="nikita.polyansky"
                domain="gmail.com"
                className="hover:link-primary transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <ObfuscatedEmail
                user="nikita.polianskii"
                domain="iota.org"
                className="hover:link-primary transition-colors"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className={`items-center gap-2 justify-center md:justify-start ${showDetails ? 'flex' : 'hidden'} md:flex`}>
            <a
              href="https://scholar.google.com/citations?hl=en&user=4Y8b6l8AAAAJ&view_op=list_works&sortby=pubdate"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="Google Scholar"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/>
              </svg>
            </a>
            <a
              href="https://github.com/polinikita"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/nikita-polianskii-770b707b"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://www.researchgate.net/profile/Nikita-Polyanskii"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="ResearchGate"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.121 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .078.53h-.005a3.334 3.334 0 0 0 .112.438c.243.743.65 1.303 1.213 1.68.565.376 1.256.564 2.073.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.335-.311.622-.603.853-.29.232-.68.347-1.138.347-.422 0-.787-.09-1.09-.272a1.847 1.847 0 0 1-.74-.802c-.165-.345-.253-.764-.253-1.252v-4.082c0-.495.085-.91.256-1.262.17-.345.426-.617.74-.795.303-.18.67-.27 1.09-.27.488 0 .882.126 1.178.39.296.263.492.615.574 1.067.028.13.096.2.196.2h1.37c.11 0 .165-.072.15-.183a3.897 3.897 0 0 0-.318-1.154 3.706 3.706 0 0 0-.75-1.048 3.344 3.344 0 0 0-1.087-.716A3.755 3.755 0 0 0 19.586 0zM4.414 5.945c-.093 0-.14.047-.14.14v11.778c0 .094.047.14.14.14H5.9c.093 0 .14-.046.14-.14v-4.317c0-.095.046-.14.14-.14h1.728c.093 0 .14.045.14.14v4.317c0 .094.047.14.14.14h1.486c.094 0 .14-.046.14-.14V6.086c0-.094-.046-.14-.14-.14H8.188c-.093 0-.14.046-.14.14v4.226c0 .094-.047.14-.14.14H6.18c-.094 0-.14-.046-.14-.14V6.086c0-.094-.047-.14-.14-.14z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* About text - wraps around profile card */}
        <p className="text-lg text-dark leading-relaxed">
          Hey, I am Nikita! I&apos;m a mathematician by training who has gradually drifted into engineering — though I still think in theorems and proofs when implementing things.
        </p>
        <p className="text-lg text-dark leading-relaxed mt-4">
          Currently, I work at the{" "}
          <a href="https://iota.org" target="_blank" rel="noopener noreferrer" className="link-primary">
            IOTA Foundation
          </a>
          {" "}where I design, analyze, and implement consensus protocols.
          Before this, I explored the intersection of <a href="https://en.wikipedia.org/wiki/Extremal_combinatorics" target="_blank" rel="noopener noreferrer" className="link-primary">extremal combinatorics</a> and <a href="https://en.wikipedia.org/wiki/Error_correction_code" target="_blank" rel="noopener noreferrer" className="link-primary">error-correcting codes</a> at{" "}
          <a href="https://www.technion.ac.il" target="_blank" rel="noopener noreferrer" className="link-primary">Technion</a>,{" "}
          <a href="https://www.skoltech.ru" target="_blank" rel="noopener noreferrer" className="link-primary">Skoltech</a>, and{" "}
          <a href="https://www.tum.de" target="_blank" rel="noopener noreferrer" className="link-primary">TU Munich</a>, and worked on practical optimization of codes for the 5G standard at{" "}
          <a href="https://www.huawei.com" target="_blank" rel="noopener noreferrer" className="link-primary">Huawei</a>.
        </p>
        {/* Interests - inline as text links */}
        <p className="text-lg text-dark leading-relaxed mt-4">
          My research interests include{" "}
          {researchTopics.map((topic, index) => (
            <span key={topic.id}>
              <Link
                href={topic.href}
                className="link-primary"
              >
                {topic.name.toLowerCase()}
              </Link>
              {index < researchTopics.length - 2 && ", "}
              {index === researchTopics.length - 2 && ", and "}
            </span>
          ))}.
        </p>

        <p className="text-lg text-dark leading-relaxed mt-4">
          Now I&apos;m fascinated by problems at the intersection of theory and practice — taking mathematical ideas and turning them into systems that actually work.
        </p>

        {/* Clear float */}
        <div className="clear-both" />
      </motion.section>

      {/* Selected Contributions Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold heading-dark mb-2">Selected Contributions</h2>
        <p className="text-sm card-muted mb-6">Some highlights from my work:</p>
        <div className="space-y-4">
          {selectedContributions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              className="p-4 rounded-lg card-bg border border-neutral-200 dark:border-neutral-800"
            >
              <h3 className="font-semibold card-title mb-1">{item.title}</h3>
              <p className="text-sm text-dark mb-2">{item.description}</p>
              <p className="text-sm card-muted mb-2">
                {item.authors.map((author, i) => (
                  <span key={author}>
                    {i > 0 && ", "}
                    {author === "Nikita Polyanskii" ? (
                      <span className="font-medium">{author}</span>
                    ) : (authorLinks as Record<string, string>)[author] ? (
                      <a
                        href={(authorLinks as Record<string, string>)[author]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                      >
                        {author}
                      </a>
                    ) : (
                      author
                    )}
                  </span>
                ))}
              </p>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-sm">
                {item.doi ? (
                  <a
                    href={`https://doi.org/${item.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-muted link-primary"
                  >
                    {item.venueShort}, {item.year}
                  </a>
                ) : (
                  <span className="card-muted">{item.venueShort}, {item.year}</span>
                )}
                {item.pdf && (
                  <>
                    <span className="card-muted">·</span>
                    <a
                      href={item.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-primary"
                    >
                      PDF
                    </a>
                  </>
                )}
                {item.slides && (
                  <>
                    <span className="card-muted">·</span>
                    <a
                      href={item.slides}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-primary"
                    >
                      Slides
                    </a>
                  </>
                )}
                {item.isit && (
                  <>
                    <span className="card-muted">·</span>
                    <a
                      href={item.isit}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-primary"
                    >
                      ISIT Slides
                    </a>
                  </>
                )}
                {item.adopted && (
                  <>
                    <span className="card-muted">·</span>
                    <a
                      href={item.adopted.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-success"
                    >
                      {item.adopted.label} {item.adopted.name}
                    </a>
                  </>
                )}
                {item.soda && (
                  <>
                    <span className="card-muted">·</span>
                    <a
                      href={item.soda}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-primary"
                    >
                      SODA
                    </a>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
