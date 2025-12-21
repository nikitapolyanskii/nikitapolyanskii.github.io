"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const researchInterests = [
  "Blockchain",
  "Consensus Protocols",
  "Coding Theory",
  "Combinatorics",
  "Information Theory",
];

const education = [
  {
    institution: "Moscow State University",
    logo: "/logos/msu.png",
    degree: "Ph.D. in Mathematics",
    period: "2013 - 2016",
    advisor: "Prof. Arkady Dyachkov",
    note: "Awarded by the Russian Academy of Sciences",
  },
  {
    institution: "Moscow State University",
    logo: "/logos/msu.png",
    degree: "Specialist in Mathematics (cum laude)",
    period: "2008 - 2013",
    advisor: "Prof. Arkady Dyachkov",
  },
];

const industryExperience = [
  {
    organization: "IOTA Foundation",
    logo: "/logos/iota.png",
    role: "Research Scientist and Engineer",
    department: "R&D Department",
    period: "2021 - Present",
  },
  {
    organization: "Huawei Technologies Co. Ltd.",
    logo: "/logos/huawei.png",
    role: "Research Engineer",
    department: "Channel Coding Team",
    period: "2015 - 2017",
  },
];

const academiaExperience = [
  {
    organization: "Technical University of Munich",
    logo: "/logos/tum.png",
    role: "Postdoc",
    department: "Institute for Communications Engineering",
    period: "2019 - 2021",
  },
  {
    organization: "Skolkovo Institute of Science and Technology",
    logo: "/logos/skoltech.png",
    role: "Postdoc",
    department: "Center for Computational and Data-Intensive Science and Engineering",
    period: "2018 - 2021",
  },
  {
    organization: "Technion - Israel Institute of Technology",
    logo: "/logos/technion.png",
    role: "Postdoc",
    department: "Faculty of Mathematics",
    period: "2017 - 2018",
  },
];

export default function AboutPage() {
  const obfuscatedEmail = "nikita.polyansky[at]gmail[dot]com"
    .replace("[at]", "@")
    .replace("[dot]", ".");

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        initial="initial"
        animate="animate"
        className="grid md:grid-cols-3 gap-12"
      >
        {/* Profile Section */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="md:col-span-1"
        >
          <div className="sticky top-24">
            <div className="relative w-48 h-48 mx-auto md:mx-0 mb-6 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
              <Image
                src="/photos/NPolianskii_small.jpg"
                alt="Nikita Polyanskii"
                fill
                className="object-cover"
                priority
              />
            </div>

            <h1 className="text-2xl font-bold heading-dark mb-2 text-center md:text-left">
              Nikita Polyanskii
            </h1>
            <p className="text-blue-600 dark:text-blue-400 font-medium mb-4 text-center md:text-left">
              Research Scientist and Engineer
            </p>

            <div className="space-y-3 text-sm card-muted">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>IOTA Foundation</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${obfuscatedEmail}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {obfuscatedEmail}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 justify-center md:justify-start">
              <a
                href="https://scholar.google.com/citations?hl=en&user=4Y8b6l8AAAAJ&view_op=list_works&sortby=pubdate"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-200/50 dark:bg-neutral-700/50 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300/50 dark:hover:bg-neutral-600/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
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
                className="p-2 rounded-full bg-neutral-200/50 dark:bg-neutral-700/50 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300/50 dark:hover:bg-neutral-600/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
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
                className="p-2 rounded-full bg-neutral-200/50 dark:bg-neutral-700/50 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300/50 dark:hover:bg-neutral-600/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
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
                className="p-2 rounded-full bg-neutral-200/50 dark:bg-neutral-700/50 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300/50 dark:hover:bg-neutral-600/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                aria-label="ResearchGate"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm4.5 4.5a3 3 0 00-3 3v.5h1.5v-.5a1.5 1.5 0 011.5-1.5h1a1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-.44 1.06l-2.12 2.12A3 3 0 008 14.5v.5h4v-1.5H9.5v-.38a1.5 1.5 0 01.44-1.06l2.12-2.12A3 3 0 0012.5 7a3 3 0 00-3-3h-1zm7 3a2.5 2.5 0 00-2.5 2.5v1a2.5 2.5 0 002.5 2.5h.5v1.5h-2v1.5h2a2 2 0 002-2v-5a2.5 2.5 0 00-2.5-2.5h-.5zm.5 1.5a1 1 0 011 1v1a1 1 0 01-1 1h-.5v-3h.5z"/>
                </svg>
              </a>
            </div>

          </div>
        </motion.div>

        {/* Bio Content */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2 space-y-8"
        >
          <section>
            <h2 className="text-xl font-bold heading-dark mb-4">
              About Me
            </h2>
            <div className="max-w-none">
              <p className="text-dark leading-relaxed">
                I spend most of my time thinking about how distributed systems can reach agreement
                without a central authority. It&apos;s a fascinating puzzle that sits right at the
                intersection of mathematics and real-world systems.
              </p>
              <p className="text-dark leading-relaxed mt-4">
                My path here has been a bit winding: I started with pure math at Moscow State,
                then worked at Huawei on practical optimization of error-correcting codes for 5G
                (some of which made it into the{" "}
                <a href="https://www.3gpp.org/specifications" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  3GPP standard
                </a>
                ). During my postdocs at Technion
                and TU Munich, I explored the intersection of combinatorics and coding theory.
                Now I&apos;m at IOTA building consensus protocols.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold heading-dark mb-4">
              What I&apos;m Curious About
            </h2>
            <div className="flex flex-wrap gap-2">
              {researchInterests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 tag-blue rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold heading-dark mb-4">
              Where I Studied
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="p-4 rounded-lg card-bg border border-neutral-200 dark:border-neutral-700 flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold card-title">
                      {edu.institution}, <span className="font-normal">{edu.period}</span>
                    </h3>
                    <p className="card-body text-sm">
                      {edu.degree}
                    </p>
                    {edu.advisor && (
                      <p className="card-muted text-sm">
                        Advisor: {edu.advisor}
                      </p>
                    )}
                    {edu.note && (
                      <p className="card-muted text-sm italic">
                        {edu.note}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 w-12 h-12 relative">
                    <Image
                      src={edu.logo}
                      alt={edu.institution}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <ExperienceSection />
        </motion.div>
      </motion.div>
    </div>
  );
}

function ExperienceSection() {
  const [viewMode, setViewMode] = useState<"industry" | "academia">("industry");

  const experience = viewMode === "industry" ? industryExperience : academiaExperience;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold heading-dark">
          Experience
        </h2>
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <button
            onClick={() => setViewMode("industry")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              viewMode === "industry"
                ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            Industry
          </button>
          <button
            onClick={() => setViewMode("academia")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              viewMode === "academia"
                ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            Academia
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {experience.map((exp, index) => (
          <motion.div
            key={`${viewMode}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="p-4 rounded-lg card-bg border border-neutral-200 dark:border-neutral-700 flex justify-between items-start gap-4"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold card-title">
                {exp.organization}, <span className="font-normal">{exp.period}</span>
              </h3>
              <p className="card-body text-sm">
                {exp.role}, {exp.department}
              </p>
            </div>
            <div className="flex-shrink-0 w-12 h-12 relative">
              <Image
                src={exp.logo}
                alt={exp.organization}
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
