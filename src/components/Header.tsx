"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import SearchModal from "./SearchModal";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#bio", label: "Bio" },
  { href: "#people", label: "People" },
  { href: "#writings", label: "Writings" },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100; // Account for header height

      let currentSection = "";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = `#${section.id}`;
        }
      });

      // If we're at the very top, default to first section
      if (window.scrollY < 50) {
        currentSection = "#about";
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // If not on home page, navigate to home with the hash
    if (pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }

    // On home page, smooth scroll to section
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 header-bg backdrop-blur-xl border-b border-neutral-200/30 dark:border-neutral-800/30"
    >
      <nav className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
        <a
          href="#about"
          onClick={(e) => handleNavClick(e, "#about")}
          className="text-base font-semibold tracking-widest header-title uppercase"
        >
          NIKITA POLYANSKII
        </a>

        <div className="flex items-center gap-2">
          <ul className="grid grid-cols-2 md:flex md:items-center p-1 rounded-2xl md:rounded-full nav-pill-bg gap-0.5 md:gap-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-3 py-1.5 md:py-2 text-xs md:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer block text-center"
                >
                  {activeSection === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 nav-pill-active rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${
                    activeSection === link.href ? "nav-link-active" : "nav-link"
                  }`}>
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full icon-btn transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full icon-btn transition-all duration-200"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.header>
  );
}
