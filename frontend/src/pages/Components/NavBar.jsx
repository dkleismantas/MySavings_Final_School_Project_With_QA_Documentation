import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import CreateGoalModal from "./CreateGoalModal";

function NavBar({ onGoalCreated }) {
  const { user, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="navbar bg-base-200">
        <div className="ps-4">
          <Link to="/" className="text-lg font-bold">MySavings</Link>
        </div>
        <div className="flex grow justify-end px-2">
          <div className="flex items-center justify-center">
            {user ? (
              <p className="text-lg font-bold">Hello, {user.username}!</p>
            ) : (
              <Link to="/login" className="btn btn-neutral">Login</Link>
            )}
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="btn">⬇️</div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {user && (
                  <>
                    <li>
                      <button onClick={logout} className="btn btn-neutral mt-4 w-full">
                        Log Out
                      </button>
                    </li>
                    <li>
                      {/* ✅ button instead of Link */}
                      <button
                        onClick={() => setModalOpen(true)}
                        className="btn btn-neutral mt-4 w-full"
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
      </div>

      <CreateGoalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onGoalCreated={onGoalCreated}
      />
    </>
  );
}

export default NavBar;