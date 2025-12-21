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
                  <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.254 8.37 8.37 0 0 0-.078.258.21.21 0 0 0-.021.088c0 .029.01.052.031.068a.077.077 0 0 0 .055.023c.049 0 .108-.034.177-.103l.035-.035c.252-.263.564-.395.937-.395.28 0 .5.078.66.234.16.155.24.375.24.66 0 .242-.052.493-.155.752a5.347 5.347 0 0 1-.395.856c-.14.24-.293.49-.46.752a7.98 7.98 0 0 0-.453.856 3.96 3.96 0 0 0-.293.856c-.068.283-.103.566-.103.849 0 .39.098.688.293.892.195.203.474.305.836.305.194 0 .394-.036.6-.108a3.1 3.1 0 0 0 .58-.279 4.16 4.16 0 0 0 .546-.385c.173-.149.336-.304.488-.464l.012-.012a.158.158 0 0 1 .049-.037.098.098 0 0 1 .049-.013c.039 0 .058.026.058.078 0 .04-.012.088-.037.146-.227.458-.57.841-1.028 1.148a2.927 2.927 0 0 1-1.641.459c-.535 0-.968-.145-1.298-.436-.33-.29-.495-.69-.495-1.2 0-.38.072-.757.216-1.132.144-.375.31-.742.496-1.1.187-.36.371-.71.55-1.05.18-.34.327-.658.44-.952a2.4 2.4 0 0 0 .168-.73c0-.2-.048-.358-.144-.472-.096-.115-.24-.172-.432-.172-.148 0-.296.032-.444.096a2.16 2.16 0 0 0-.408.245 2.64 2.64 0 0 0-.365.339c-.115.13-.224.262-.328.398-.103.136-.195.264-.275.384a11.26 11.26 0 0 1-.197.287.21.21 0 0 1-.065.057.162.162 0 0 1-.075.019c-.068 0-.103-.033-.103-.098 0-.049.013-.099.04-.152.026-.052.052-.103.08-.152l.02-.039c.254-.52.317-.828.189-.925-.04-.029-.087-.044-.14-.044-.06 0-.129.017-.21.05a3.05 3.05 0 0 0-.277.127 5.02 5.02 0 0 0-.32.184 6.49 6.49 0 0 0-.339.226 4.91 4.91 0 0 0-.328.253c-.105.088-.2.174-.284.257a3.1 3.1 0 0 0-.224.24 1.78 1.78 0 0 0-.154.21 2.37 2.37 0 0 0-.2.387c-.064.16-.096.347-.096.563 0 .35.096.64.288.868.192.229.456.343.792.343.283 0 .557-.066.82-.198a3.1 3.1 0 0 0 .712-.508c.21-.21.396-.448.558-.711.161-.263.284-.522.366-.775.082-.252.123-.482.123-.688 0-.235-.04-.435-.12-.6a1.27 1.27 0 0 0-.31-.415 1.24 1.24 0 0 0-.42-.239 1.365 1.365 0 0 0-.457-.078c-.3 0-.576.07-.83.21a2.78 2.78 0 0 0-.661.505 3.7 3.7 0 0 0-.488.63c-.138.227-.252.437-.34.63a.256.256 0 0 1-.04.06.083.083 0 0 1-.067.026c-.04 0-.06-.031-.06-.093 0-.043.01-.094.03-.154.02-.06.044-.122.074-.186.03-.064.06-.125.089-.182.03-.057.052-.104.069-.14l.001-.003c.024-.051.036-.091.036-.12a.074.074 0 0 0-.017-.052.066.066 0 0 0-.052-.02h-.003c-.026.002-.056.013-.09.034a3.2 3.2 0 0 0-.137.09c-.051.038-.108.081-.17.13a5.1 5.1 0 0 0-.208.173 4.76 4.76 0 0 0-.232.216 3.72 3.72 0 0 0-.24.258c-.252.293-.45.619-.595.977-.145.358-.217.72-.217 1.086 0 .4.1.718.3.953.2.236.486.354.86.354.35 0 .696-.08 1.04-.24.344-.16.658-.366.943-.62.284-.252.524-.535.72-.848a3.66 3.66 0 0 0 .432-.952 3.1 3.1 0 0 0 .144-.898c0-.206-.024-.41-.072-.614a1.767 1.767 0 0 0-.216-.547 1.36 1.36 0 0 0-.384-.4c-.16-.11-.352-.164-.576-.164zM6.4 5.896h2.56c.96 0 1.728.28 2.304.84.576.56.864 1.32.864 2.28s-.288 1.72-.864 2.28c-.576.56-1.344.84-2.304.84H7.68v3.84H6.4V5.896zm1.28 1.2v3.84h1.28c.587 0 1.04-.16 1.36-.48.32-.32.48-.76.48-1.32v-.24c0-.56-.16-1-.48-1.32-.32-.32-.773-.48-1.36-.48H7.68z"/>
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
              A Bit About Me
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
                (some of which made it into the 3GPP standard!). During my postdocs at Technion
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
