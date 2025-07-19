export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-5 px-4 text-center text-sm">
      <div className="max-w-6xl mx-auto space-y-1 sm:space-y-0 sm:flex sm:justify-center sm:gap-2">
        <p>&copy; {new Date().getFullYear()} GoogleOAuth</p>
        <span className="hidden sm:inline">|</span>
        <p>Built with ❤️ by Jatin Goyal</p>
        <span className="hidden sm:inline">|</span>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}
