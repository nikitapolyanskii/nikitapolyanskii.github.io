"use client";

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
    degree: "Ph.D. in Mathematics",
    institution: "Moscow State University",
    period: "2013 - 2016",
    thesis: "Cover-Free Codes",
    advisor: "Prof. Arkady Dyachkov",
    note: "Awarded by the Russian Academy of Sciences",
  },
  {
    degree: "Specialist in Mathematics (cum laude)",
    institution: "Moscow State University",
    period: "2008 - 2013",
    thesis: "Coding Theory Problems for Some Models of DNA Codes and Group Testing",
    advisor: "Prof. Arkady Dyachkov",
  },
];

const industryExperience = [
  {
    organization: "IOTA Foundation",
    department: "R&D Department",
    period: "Oct 2021 - Present",
    description: "Leading research on DAG-based consensus protocols and distributed ledger technologies.",
  },
  {
    organization: "Huawei Technologies Co. Ltd.",
    department: "Channel Coding Team",
    period: "Feb 2015 - Oct 2017",
    description: "Developed polar code encoding methods adopted by 3GPP for 5G New Radio interface.",
  },
];

const academiaExperience = [
  {
    organization: "Technical University of Munich",
    department: "Institute for Communications Engineering",
    period: "Nov 2019 - Sept 2021",
    description: "Research on coding theory, batch codes, and error-correcting codes. Co-lectured Channel Coding course.",
  },
  {
    organization: "Skolkovo Institute of Science and Technology",
    department: "Center for Computational and Data-Intensive Science and Engineering",
    period: "Dec 2018 - June 2021",
    description: "Research on coding theory and combinatorics.",
  },
  {
    organization: "Technion - Israel Institute of Technology",
    department: "Faculty of Mathematics",
    period: "Oct 2017 - Dec 2018",
    description: "Research on combinatorics and graph theory.",
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

            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 text-center md:text-left">
              Nikita Polyanskii
            </h1>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4 text-center md:text-left">
              Senior Applied Research Engineer
            </p>

            <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
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
                <a href={`mailto:${obfuscatedEmail}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {obfuscatedEmail}
                </a>
              </div>
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
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
              A Bit About Me
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-neutral-800 dark:text-neutral-400 leading-relaxed">
                I spend most of my time thinking about how distributed systems can reach agreement
                without a central authority. It&apos;s a fascinating puzzle that sits right at the
                intersection of mathematics and real-world systems.
              </p>
              <p className="text-neutral-800 dark:text-neutral-400 leading-relaxed">
                My path here has been a bit winding: I started with pure math at Moscow State,
                then worked at Huawei on practical optimization of error-correcting codes for 5G
                (some of which made it into the 3GPP standard!). During my postdocs at Technion
                and TU Munich, I explored the intersection of combinatorics and coding theory.
                Now I&apos;m at IOTA building consensus protocols.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
              What I&apos;m Curious About
            </h2>
            <div className="flex flex-wrap gap-2">
              {researchInterests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
              Where I Studied
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="p-4 rounded-lg bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-transparent">
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 text-sm">
                    {edu.institution} &bull; {edu.period}
                  </p>
                  {edu.thesis && (
                    <p className="text-neutral-700 dark:text-neutral-400 text-sm mt-1">
                      Thesis: &quot;{edu.thesis}&quot;
                    </p>
                  )}
                  {edu.advisor && (
                    <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                      Advisor: {edu.advisor}
                    </p>
                  )}
                  {edu.note && (
                    <p className="text-neutral-600 dark:text-neutral-500 text-sm italic">
                      {edu.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
              Industry
            </h2>
            <div className="space-y-4">
              {industryExperience.map((exp, index) => (
                <div key={index} className="p-4 rounded-lg bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-transparent">
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {exp.organization}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 text-sm">
                    {exp.period}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-500 text-xs">
                    {exp.department}
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-400 text-sm mt-2">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
              Academia
            </h2>
            <div className="space-y-4">
              {academiaExperience.map((exp, index) => (
                <div key={index} className="p-4 rounded-lg bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-transparent">
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {exp.organization}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 text-sm">
                    {exp.period}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-500 text-xs">
                    {exp.department}
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-400 text-sm mt-2">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      </motion.div>
    </div>
  );
}
