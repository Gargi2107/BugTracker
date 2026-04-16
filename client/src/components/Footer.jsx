export default function Footer() {
  return (
    <div>
  <footer className="bg-gray-900 text-gray-300 py-8 px-6">
    
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
      
      <div>
        <h2 className="text-white font-bold text-lg mb-2">
          BugTracker
        </h2>
        <p className="text-gray-400">
          Manage your projects and track bugs efficiently like a pro.
        </p>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-2">Contact</h3>
        <p className="text-gray-400">gargi.nigam2107@gmail.com</p>
        <p className="text-gray-400">+91-7355679772</p>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-2">Connect</h3>
        <a
          href="https://www.linkedin.com/in/gargi-nigam/"
          target="_blank"
          rel="noreferrer"
          className="block text-gray-400 hover:text-white transition"
        >
          LinkedIn
        </a>
      </div>
    </div>

    <div className="mt-6 text-center text-gray-500 text-xs border-t border-gray-700 pt-4">
      © 2026 BugTracker. All rights reserved.
    </div>

  </footer>
</div>
  );
}