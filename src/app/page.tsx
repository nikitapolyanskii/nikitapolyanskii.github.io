"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import authorLinks from "@/data/authors.json";
import publications from "@/data/publications.json";
import CoAuthorGraph from "@/components/CoAuthorGraph";
// Temporarily disabled - demos need more work
// import { StarfishDAGDemo } from "@/components/StarfishDAG";
// import { MastermindCard } from "@/components/MastermindGame";
// import { PolarCodesCard } from "@/components/PolarCodesSC";

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

// Obfuscated text component - renders only on client to prevent bot scraping
function ObfuscatedText({ text, className }: { text: string; className?: string }) {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    setContent(text);
  }, [text]);

  if (!content) return <span className={className}>&nbsp;</span>;
  return <span className={className}>{content}</span>;
}

// Obfuscated link component - renders only on client to prevent bot scraping
function ObfuscatedLink({ href, text, className }: { href: string; text: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <span className={className}>&nbsp;</span>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {text}
    </a>
  );
}

// Obfuscated image component - renders only on client to prevent bot scraping
function ObfuscatedImage({ src, alt, width, height, className, priority }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div className={className} style={{ width, height }} />;
  }
  return <Image src={src} alt={alt} width={width} height={height} className={className} priority={priority} />;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Publication type for writings section
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
  conferenceVersions?: Array<{
    title: string;
    venue: string;
    year: number;
    doi?: string;
    pdf?: string;
  }>;
  erratum?: {
    venue: string;
    year: number;
    doi: string;
  };
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

// Bio section data
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

type ExperienceItem = {
  organization: string;
  logo: string;
  role: string;
  department: string;
  period: string;
  host?: {
    label: string;
    name: string;
    url: string;
  };
};

const industryExperience: ExperienceItem[] = [
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

const academiaExperience: ExperienceItem[] = [
  {
    organization: "Technical University of Munich",
    logo: "/logos/tum.png",
    role: "Postdoc",
    department: "Institute for Communications Engineering",
    period: "2019 - 2021",
    host: {
      label: "Host",
      name: "Prof. Antonia Wachter-Zeh",
      url: "https://www.ce.cit.tum.de/en/lnt/people/professors/wachter-zeh/",
    },
  },
  {
    organization: "Skolkovo Institute of Science and Technology",
    logo: "/logos/skoltech.png",
    role: "Postdoc",
    department: "Center for Computational and Data-Intensive Science and Engineering",
    period: "2018 - 2021",
    host: {
      label: "Mentor",
      name: "Prof. Grigory Kabatiansky",
      url: "https://scholar.google.ru/citations?user=FF_BqSIAAAAJ&hl=en&oi=sra",
    },
  },
  {
    organization: "Technion - Israel Institute of Technology",
    logo: "/logos/technion.png",
    role: "Postdoc",
    department: "Faculty of Mathematics",
    period: "2017 - 2018",
    host: {
      label: "Host",
      name: "Prof. Ron Aharoni",
      url: "https://math.technion.ac.il/en/tg_members/ron-aharoni/",
    },
  },
  {
    organization: "Institute for Information Transmission Problems (IITP)",
    logo: "/logos/iitp.png",
    role: "Researcher",
    department: "Dobrushin Mathematics Laboratory",
    period: "2015 - 2018",
    host: {
      label: "Head",
      name: "Prof. Michael Blank",
      url: "https://www.hse.ru/en/org/persons/97608865/",
    },
  },
];

const selectedContributions = [
  {
    title: "Starfish: A Full-DAG BFT Protocol with Optimal Communication Complexity",
    description: <>Designed and implemented a high-performance DAG-based <a href="https://en.wikipedia.org/wiki/Consensus_(computer_science)" target="_blank" rel="noopener noreferrer" className="link-accent">consensus</a> protocol that is provably live and safe and achieves optimal communication complexity using error-correcting codes and threshold signatures.</>,
    authors: ["Nikita Polyanskii", "Sebastian Müller", "Ilya Vorobyev"],
    venue: "Cryptology ePrint Archive",
    venueShort: "ePrint",
    year: 2025,
    pdf: "/writings/2025-44-starfish/preprint.pdf",
    slides: "/writings/2025-44-starfish/slides.pdf",
    adopted: { label: "Adopted by", name: "IOTA", url: "https://github.com/iotaledger/iota" },
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
    href: "#writings",
    category: "Blockchain",
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
    href: "#writings",
    category: "Coding Theory",
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
    href: "#writings",
    category: "Group Testing",
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
    href: "#writings",
    category: "Combinatorics",
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
    href: "#writings",
    category: "Information Theory",
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
    href: "#writings",
    category: "DNA Storage",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
];

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [experienceViewMode, setExperienceViewMode] = useState<"industry" | "academia">("industry");

  // Read author and category from URL params on mount
  useEffect(() => {
    const authorParam = searchParams.get("author");
    const categoryParam = searchParams.get("category");

    if (authorParam) {
      setSelectedAuthor(authorParam);
      setSelectedCategory("all"); // Reset category when filtering by author
      // Scroll to writings section
      setTimeout(() => {
        document.getElementById('writings')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    if (categoryParam && CATEGORIES.some(c => c.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedAuthor(null); // Clear author filter when selecting category
    setShowMobileCategories(false);
    // Clear URL params
    router.replace("/", { scroll: false });
  };

  const clearAuthorFilter = () => {
    setSelectedAuthor(null);
    router.replace("/", { scroll: false });
  };

  const selectedCategoryData = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  const filteredPublications = useMemo(() => {
    let pubs = publications as Publication[];

    // Filter by author if selected
    if (selectedAuthor) {
      pubs = pubs.filter((pub) => pub.authors.includes(selectedAuthor));
    }

    // Filter by category
    if (selectedCategory !== "all") {
      pubs = pubs.filter((pub) => pub.categories.includes(selectedCategory));
    }

    return pubs.sort((a, b) => b.year - a.year);
  }, [selectedCategory, selectedAuthor]);

  const experience = experienceViewMode === "industry" ? industryExperience : academiaExperience;

  const scrollToWritingsWithCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedAuthor(null);
    router.replace("/", { scroll: false });
    setTimeout(() => {
      document.getElementById('writings')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* About Section */}
      <motion.section
        id="about"
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
            <ObfuscatedImage
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
              <ObfuscatedLink href="https://en.wikipedia.org/wiki/Munich" text="Munich, Germany" className="hover:link-primary transition-colors" />
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
          Hey, I am Nikita! I&apos;m a mathematician by training who has gradually drifted into engineering.
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
              <button
                onClick={() => scrollToWritingsWithCategory(topic.category)}
                className="link-primary hover:underline"
              >
                {topic.name.toLowerCase()}
              </button>
              {index < researchTopics.length - 2 && ", "}
              {index === researchTopics.length - 2 && ", and "}
            </span>
          ))}.
        </p>

        <p className="text-lg text-dark leading-relaxed mt-4">
          Now I&apos;m drawn to problems where mathematical rigor meets engineering constraints — I still think in theorems and proofs when writing code, and they negotiate.
        </p>

        {/* Clear float */}
        <div className="clear-both" />

        {/* Selected Contributions */}
        <div className="mt-8">
          <h3 className="text-xl font-bold heading-dark mb-2">Selected Contributions</h3>
          <p className="text-sm card-muted mb-6">Some highlights from my work:</p>
          <div className="space-y-4">
            {selectedContributions.map((item, index) => {
              // Temporarily disabled - demos need more work
              // const isStarfish = item.title.includes("Starfish");
              // const isMastermind = item.title.includes("metric dimension");
              // const isPolarCodes = item.title.includes("Weight Distributions");
              const cardContent = (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  className="p-4 rounded-lg card-bg border border-neutral-200 dark:border-neutral-800"
                >
                  <h4 className="font-semibold card-title mb-1">{item.title}</h4>
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
              );

              // Temporarily disabled - demos need more work
              // return isStarfish ? (
              //   <StarfishDAGDemo key={item.title}>{cardContent}</StarfishDAGDemo>
              // ) : isMastermind ? (
              //   <MastermindCard key={item.title}>{cardContent}</MastermindCard>
              // ) : isPolarCodes ? (
              //   <PolarCodesCard key={item.title}>{cardContent}</PolarCodesCard>
              // ) : (
              //   cardContent
              // );
              return cardContent;
            })}
          </div>
        </div>
      </motion.section>

      {/* Bio Section */}
      <motion.section
        id="bio"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="mb-10 pt-4"
      >
        <h2 className="text-2xl font-bold heading-dark mb-6">Bio</h2>

        {/* Informal Bio */}
        <div className="mb-8">
          <h3 className="text-xl font-bold heading-dark mb-4">A Few Things About Me</h3>
          <ul className="space-y-3 text-dark">
            <li className="flex gap-2">
              <span className="link-primary">→</span>
              <span>
                I was born and raised in{" "}
                <a href="https://en.wikipedia.org/wiki/Kaluga" target="_blank" rel="noopener noreferrer" className="link-primary">Kaluga</a>
                , the city where{" "}
                <a href="https://en.wikipedia.org/wiki/Konstantin_Tsiolkovsky" target="_blank" rel="noopener noreferrer" className="link-primary">Konstantin Tsiolkovsky</a>
                {" "}developed his rocket science theories.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="link-primary">→</span>
              <span>
                My brother{" "}
                <a href="https://polyanskii.com/" target="_blank" rel="noopener noreferrer" className="link-primary">
                  Alexandr (Sasha) Polyanskii
                </a>
                {" "}is an Assistant Professor of Mathematics at Emory University, working on discrete and convex geometry.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="link-primary">→</span>
              <span>
                I am an academic descendant of{" "}
                <a href="https://en.wikipedia.org/wiki/Andrey_Kolmogorov" target="_blank" rel="noopener noreferrer" className="link-primary">Andrey Kolmogorov</a> — traced through PhD advisor paths: Andrey Kolmogorov → Roland Dobrushin → Arkady Dyachkov → me (
                <a href="https://www.mathgenealogy.org/id.php?id=317644" target="_blank" rel="noopener noreferrer" className="link-primary">
                  Math Genealogy
                </a>
                ).
              </span>
            </li>
            <li className="flex gap-2">
              <span className="link-primary">→</span>
              <span>
                I&apos;ve ping-ponged between academia and industry three times now: Academia → Industry → Academia → Industry. These days, the boundary between them is blurring.
              </span>
            </li>
          </ul>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h3 className="text-xl font-bold heading-dark mb-4">Education</h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="p-4 rounded-lg card-bg border border-neutral-200 dark:border-neutral-700 flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold card-title">
                    {edu.institution}, <span className="font-normal">{edu.period}</span>
                  </h4>
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
        </div>

        {/* Experience */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold heading-dark">Experience</h3>
            <div className="flex items-center gap-1 p-1 toggle-container rounded-lg">
              <button
                onClick={() => setExperienceViewMode("industry")}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  experienceViewMode === "industry" ? "toggle-btn-active" : "toggle-btn-inactive"
                }`}
              >
                Industry
              </button>
              <button
                onClick={() => setExperienceViewMode("academia")}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  experienceViewMode === "academia" ? "toggle-btn-active" : "toggle-btn-inactive"
                }`}
              >
                Academia
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <motion.div
                key={`${experienceViewMode}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="p-4 rounded-lg card-bg border border-neutral-200 dark:border-neutral-700 flex justify-between items-start gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold card-title">
                    {exp.organization}, <span className="font-normal">{exp.period}</span>
                  </h4>
                  <p className="card-body text-sm">
                    {exp.role}, {exp.department}
                  </p>
                  {exp.host && (
                    <p className="card-muted text-sm">
                      {exp.host.label}:{" "}
                      <a
                        href={exp.host.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-primary"
                      >
                        {exp.host.name}
                      </a>
                    </p>
                  )}
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
        </div>
      </motion.section>

      {/* People Section */}
      <motion.section
        id="people"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold heading-dark mb-2">People</h2>
        <p className="text-sm card-muted mb-6">
          Collaborators I was fortunate to work with over the years. Click a node to filter publications.
        </p>
        <CoAuthorGraph />
      </motion.section>

      {/* Writings Section */}
      <motion.section
        id="writings"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="mb-10 pt-4"
      >
        <h2 className="text-2xl font-bold heading-dark mb-2">Writings</h2>
        <p className="text-sm card-muted mb-4">
          A collection of my research papers, preprints, and patents.
        </p>

        {/* Author Filter Chip */}
        {selectedAuthor && (
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-teal-900/30 text-blue-800 dark:text-teal-300">
              <span className="text-sm font-medium">
                Showing publications with: <span className="font-bold">{selectedAuthor}</span>
              </span>
              <button
                onClick={clearAuthorFilter}
                className="ml-1 p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-teal-800/50 transition-colors"
                aria-label="Clear author filter"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Category Filter Buttons */}
        <div className="mb-8">
          {/* Mobile: Compact category selector */}
          <div className="md:hidden">
            <div className="flex flex-col items-center gap-3">
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

            <span className="w-px h-12 bg-neutral-300 dark:bg-neutral-700" />

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
        </div>

        {/* Publications List */}
        <div className="space-y-4">
          {filteredPublications.map((pub) => (
            <PublicationCard key={pub.id} pub={pub} onCategoryClick={(cat) => {
              setSelectedCategory(cat);
              setTimeout(() => {
                document.getElementById(`pub-${pub.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }, 100);
            }} />
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400">
              {selectedAuthor
                ? `No publications found with ${selectedAuthor}.`
                : "No publications found in this category."}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedAuthor(null);
                router.replace("/", { scroll: false });
              }}
              className="mt-4 px-4 py-2 text-sm link-primary"
            >
              Show all publications
            </button>
          </div>
        )}
      </motion.section>

    </div>
  );
}

function PublicationCard({ pub, onCategoryClick }: { pub: Publication; onCategoryClick: (cat: string) => void }) {
  const isNew = pub.year === 2025;

  const venueLink = pub.doi
    ? `https://doi.org/${pub.doi}`
    : pub.arxiv
    ? `https://arxiv.org/abs/${pub.arxiv}`
    : pub.eprint
    ? `https://eprint.iacr.org/${pub.eprint}.pdf`
    : pub.patent
    ? `https://patents.google.com/patent/${pub.patent}`
    : null;

  const venueLinkType = pub.doi ? 'doi' : pub.arxiv ? 'arxiv' : pub.eprint ? 'eprint' : pub.patent ? 'patent' : null;

  // Display just "US Patent" instead of "US Patent 10,931,310"
  const displayVenue = pub.venue.startsWith('US Patent') ? 'US Patent' : pub.venue;

  const links: { label: string; href: string }[] = [];
  if (pub.pdf) links.push({ label: 'PDF', href: pub.pdf });
  if (pub.slides) links.push({ label: 'Slides', href: pub.slides });
  if (pub.doi && venueLinkType !== 'doi') links.push({ label: 'DOI', href: `https://doi.org/${pub.doi}` });
  if (pub.arxiv && venueLinkType !== 'arxiv' && !pub.doi) links.push({ label: 'arXiv', href: `https://arxiv.org/abs/${pub.arxiv}` });
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
        {pub.authors.map((author, i) => (
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

      <div className="flex flex-wrap items-center gap-2">
        {venueLink ? (
          <a
            href={venueLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm card-label link-primary"
          >
            {displayVenue}
          </a>
        ) : (
          <span className="text-sm card-label">{displayVenue}</span>
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
      {((pub.conferenceVersions && pub.conferenceVersions.length > 0) || pub.erratum) && (
        <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-sm card-muted">
          {pub.conferenceVersions && pub.conferenceVersions.length > 0 && (
            <>
              Also presented at:{" "}
              {pub.conferenceVersions.map((cv, idx) => (
                <span key={idx}>
                  {idx > 0 && " · "}
                  {cv.doi ? (
                    <a
                      href={`https://doi.org/${cv.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-body link-primary"
                    >
                      {cv.venue} ({cv.year})
                    </a>
                  ) : cv.pdf ? (
                    <a
                      href={cv.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-body link-primary"
                    >
                      {cv.venue} ({cv.year})
                    </a>
                  ) : (
                    <span className="card-body">
                      {cv.venue} ({cv.year})
                    </span>
                  )}
                  {cv.pdf && cv.doi && (
                    <>
                      <span className="ml-2">·</span>
                      <a
                        href={cv.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 link-primary"
                      >
                        PDF
                      </a>
                    </>
                  )}
                </span>
              ))}
            </>
          )}
          {pub.erratum && (
            <>
              {pub.conferenceVersions && pub.conferenceVersions.length > 0 && " · "}
              Erratum:{" "}
              <a
                href={`https://doi.org/${pub.erratum.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-body link-primary"
              >
                {pub.erratum.venue} ({pub.erratum.year})
              </a>
            </>
          )}
        </div>
      )}
    </article>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-6 py-12">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
