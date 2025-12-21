export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200/30 dark:border-neutral-800/30 bg-[#fafafa] dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
          &copy; {currentYear} Nikita Polyanskii
        </p>
      </div>
    </footer>
  );
}
