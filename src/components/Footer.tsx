export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200/30 dark:border-neutral-800/30 bg-background">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <p className="text-center text-base font-medium text-neutral-600 dark:text-neutral-300">
          &copy; {currentYear} Nikita Polyanskii
        </p>
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Hosted on GitHub Pages. No cookies, no tracking.
        </p>
      </div>
    </footer>
  );
}
