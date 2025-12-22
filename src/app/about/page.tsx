"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const education = [
  {
    institution: "Moscow State University",
    logo: "/logos/msu.png",
    degree: "Ph.D. in Mathematics",
    period: "2013 - 2016",
    advisor: "Prof. Arkady Dyachkov",
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
  {
    organization: "Institute for Information Transmission Problems (IITP)",
    logo: "/logos/iitp.png",
    role: "Researcher",
    department: "Dobrushin Mathematics Laboratory",
    period: "2015 - 2018",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="space-y-12">
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-dark">
            Born in Kaluga, Russia. Married, one kid.
          </p>
        </motion.section>

        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-xl font-bold heading-dark mb-4">
            Education
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
                </div>
                <div className="flex-shrink-0 w-16 h-16 relative bg-white rounded-lg p-2 shadow-sm">
                  <Image
                    src={edu.logo}
                    alt={edu.institution}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <ExperienceSection />
      </div>
    </div>
  );
}

function ExperienceSection() {
  const [viewMode, setViewMode] = useState<"industry" | "academia">("industry");

  const experience = viewMode === "industry" ? industryExperience : academiaExperience;

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
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
            <div className="flex-shrink-0 w-16 h-16 relative bg-white rounded-lg p-2 shadow-sm">
              <Image
                src={exp.logo}
                alt={exp.organization}
                fill
                className="object-contain p-1"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
