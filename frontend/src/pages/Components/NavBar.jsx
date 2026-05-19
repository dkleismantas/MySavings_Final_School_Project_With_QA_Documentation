import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-200">
      <div className="ps-4">
        <a className="text-lg font-bold">MySavings</a>
      </div>
      <div className="flex grow justify-end px-2">
        <div className="flex items-stretch">
          {user ? (
            <p className="text-lg font-bold content-center">
              Sveiki, {user.username}!
            </p>
          ) : (
            <p className="text-lg font-bold content-center">
              Neesate prisijungęs
            </p>
          )}
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              ⬇️
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              {isAuthenticated ? (
                <li>
                  {" "}
                  <button
                    onClick={logout}
                    className="btn btn-neutral mt-4 w-full"
                  >
                    Atsijungti
                  </button>
                </li>
              ) : (
                <li>
                  {" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-neutral mt-4 w-full"
                  >
                    Prisijungti
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
