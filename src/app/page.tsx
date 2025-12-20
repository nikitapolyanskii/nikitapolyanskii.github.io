"use client";

import Link from "next/link";
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

const selectedPublications = [
  {
    title: "Tangle 2.0 Leaderless Nakamoto Consensus on the Heaviest DAG",
    authors: "S. Muller, N. Polyanskii, A. Penzkofer, J. Theis, W. Sanders, H. Moog",
    venue: "IEEE Access",
    year: 2022,
    doi: "10.1109/ACCESS.2022.3211422",
  },
  {
    title: "Reality-based UTXO Ledger",
    authors: "S. Muller, N. Polyanskii, A. Penzkofer, J. Theis, W. Sanders, H. Moog",
    venue: "ACM Distributed Ledger Technologies",
    year: 2023,
    arxiv: "2205.01345",
  },
  {
    title: "On the metric dimension of Cartesian powers of a graph",
    authors: "Z. Jiang, N. Polyanskii",
    venue: "Journal of Combinatorial Theory, Series A",
    year: 2019,
    doi: "10.1016/j.jcta.2019.01.002",
  },
  {
    title: "Binary batch codes with improved redundancy",
    authors: "R. Polyanskaya, N. Polyanskii, I. Vorobyev",
    venue: "IEEE Transactions on Information Theory",
    year: 2020,
    doi: "10.1109/TIT.2020.3013603",
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
        className="flex flex-col md:flex-row gap-8 mb-12"
      >
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          <div className="w-40 h-40 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
            <svg className="w-16 h-16 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        {/* Name and Contact */}
        <div className="flex-grow">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            Nikita Polyanskii
          </h1>
          <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium mb-4">
            Senior Applied Research Engineer
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            IOTA Foundation
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
          About
        </h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            I am a Senior Applied Research Engineer at the{" "}
            <a href="https://iota.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              IOTA Foundation
            </a>
            , where I work on DAG-based consensus protocols and distributed ledger technologies.
            My research interests include <strong>blockchain</strong>, <strong>consensus protocols</strong>,
            <strong> coding theory</strong>, <strong>combinatorics</strong>, and <strong>information theory</strong>.
          </p>
        </div>
      </motion.section>

      {/* Short Bio Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
          Short Bio
        </h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            I received my Ph.D. in Mathematics from Moscow State University in 2016,
            where I worked on cover-free codes under the supervision of Prof. Arkady Dyachkov.
            After my PhD, I held research positions at Technion, Technical University of Munich,
            and Skoltech. Before academia, I worked at Huawei Technologies where I contributed
            to the development of polar codes &mdash; my work on the Polar sequence was adopted
            by 3GPP for 5G New Radio communications.
          </p>
        </div>
      </motion.section>

      {/* Selected Publications Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            Selected Publications
          </h2>
          <Link
            href="/publications"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View all &rarr;
          </Link>
        </div>

        <div className="space-y-4">
          {selectedPublications.map((pub, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors bg-neutral-50 dark:bg-transparent"
            >
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                {pub.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                {pub.authors}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                <span className="text-indigo-600 dark:text-indigo-400">{pub.venue}</span>
                {" "}&bull;{" "}{pub.year}
                {pub.doi && (
                  <>
                    {" "}&bull;{" "}
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      DOI
                    </a>
                  </>
                )}
                {pub.arxiv && (
                  <>
                    {" "}&bull;{" "}
                    <a
                      href={`https://arxiv.org/abs/${pub.arxiv}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      arXiv
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Quick Links */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex flex-wrap gap-4">
          <Link
            href="/publications"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors text-sm"
          >
            All Publications
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium rounded-lg transition-colors text-sm"
          >
            Full CV
          </Link>
          <Link
            href="/research"
            className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium rounded-lg transition-colors text-sm"
          >
            Research Projects
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
