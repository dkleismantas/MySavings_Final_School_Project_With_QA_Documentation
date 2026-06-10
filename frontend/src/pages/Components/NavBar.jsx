import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import CreateGoalModal from "./CreateGoalModal";

function NavBar({ onGoalCreated }) {
  const { user, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header className="bg-base-200">
        <nav className="navbar mx-auto w-full max-w-6xl px-4 sm:px-6" aria-label="Main">
          <div>
            <Link to="/" className="text-lg font-bold">
              MySavings
            </Link>
          </div>
          <div className="flex grow justify-end px-2">
            <div className="flex items-center gap-3">
              {user ? (
                <p className="text-lg font-bold" aria-live="polite">
                  Hello, {user.username}!
                </p>
              ) : (
                <Link to="/login" className="btn btn-neutral">
                  Login
                </Link>
              )}
              <div className="dropdown dropdown-bottom dropdown-end">
                <button
                  type="button"
                  className="btn"
                  aria-haspopup="menu"
                  aria-label="Open user menu"
                >
                  Menu
                </button>
                <ul className="dropdown-content menu rounded-box z-1 mt-2 w-52 bg-base-100 p-2 shadow-sm">
                  {user && (
                    <>
                      <li>
                        <button onClick={logout} className="btn btn-neutral mt-2 w-full">
                          Log Out
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setModalOpen(true)}
                          className="btn btn-neutral mt-2 w-full"
                        >
                          Create New Goal
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <CreateGoalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onGoalCreated={onGoalCreated}
      />
    </>
  );
}

export default NavBar;
