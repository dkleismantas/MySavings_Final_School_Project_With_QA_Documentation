//import reikalingas gauti vartotojo informacija ir prisijungimo statusa
import { useAuth } from "../../hooks/useAuth";

function NavBar() {
  //autentifikavimo hook, su userio informacijos propsais 
  //(jie aprasyti frontend/src/context/AuthContext.jsx)
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="navbar bg-base-200">
      <div className="ps-4">
        <a className="text-lg font-bold">MySavings</a>
      </div>
      <div className="flex grow justify-end px-2">
        <div className="flex items-center justify-center">
          {user ? (
            <p className="text-lg font-bold ">Sveiki, {user.username}!</p>
          ) : (
            <a href="/login" className="btn btn-neutral">
              Prisijungti
            </a>
          )}
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn">
              ⬇️
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              {isAuthenticated && (
                <li>
                  <button
                    onClick={logout}
                    className="btn btn-neutral mt-4 w-full"
                  >
                    Atsijungti
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
