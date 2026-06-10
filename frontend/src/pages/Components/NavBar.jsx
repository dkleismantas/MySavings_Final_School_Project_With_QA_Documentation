import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FiMenu, FiX, FiLogOut, FiTrendingUp } from "react-icons/fi";
import mainIcon from "../../assets/main-icon.svg";

function NavBar({ onOpenModal }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#101010] border-b border-zinc-900 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <nav className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Group Container */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={mainIcon} alt="MySavings Logo" className="w-8 h-8 2xl:w-10 2xl:h-10 object-contain" />
          <span className="text-lg 2xl:text-xl font-bold tracking-wide text-white hidden sm:block">
            MySavings
          </span>
        </Link>

        {/* Desktop Navigation Blocks */}
        <div className="hidden md:flex items-center gap-6">
          {user && (
            <p className="text-sm font-medium text-gray-300">
              Hello, <span className="text-white font-semibold">{user.username}</span>!
            </p>
          )}

          {user?.role === "admin" && (
            <a
              href="http://localhost:8081/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <FiTrendingUp /> Seq Dashboard
            </a>
          )}

          {user ? (
            <button
              onClick={logout}
              className="p-2 text-zinc-400 hover:text-[#FF5722] transition-colors rounded-lg hover:bg-zinc-900"
              title="Log Out"
            >
              <FiLogOut className="w-5 h-5" />
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle Trigger */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-zinc-900 transition-colors"
            aria-label="Toggle user navigation menu"
          >
            {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Dropdown Drawer Component */}
      {menuOpen && (
        <div className="md:hidden border-b border-zinc-900 bg-[#101010] px-4 pt-2 pb-6 space-y-4 animate-fadeIn">
          {user && (
            <div className="px-2 py-1 text-sm border-b border-zinc-900 pb-3 text-gray-400">
              Signed in as: <span className="text-white font-medium">{user.username}</span>
            </div>
          )}
          
          {user?.role === "admin" && (
            <a
              href="http://localhost:8081/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-base font-medium text-zinc-300 hover:bg-zinc-900 rounded-xl"
            >
              Open Seq Dashboard
            </a>
          )}

          {user && (
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenModal();
              }}
              className="w-full text-left px-3 py-2 text-base font-medium text-zinc-300 hover:bg-zinc-900 rounded-xl"
            >
              Create New Goal
            </button>
          )}

          {user ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                logout();
              }}
              className="w-full text-left px-3 py-2 text-base font-medium text-[#FF5722] hover:bg-zinc-900 rounded-xl flex items-center gap-2"
            >
              <FiLogOut /> Log Out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center py-2.5 text-sm font-medium bg-[#FF5722] text-white rounded-xl"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default NavBar;