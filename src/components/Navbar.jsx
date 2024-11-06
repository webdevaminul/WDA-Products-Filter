import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../providers/AuthProvider";

export default function Navbar() {
  const { loading, user, logOut } = useContext(authContext);

  const handleLogOut = () => {
    logOut();
  };

  return (
    <div className="bg-slate-800 text-white h-16">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <span className="loading loading-ring loading-md"></span>
        </div>
      ) : (
        <div className="navbar container mx-auto">
          <div className="flex-1">
            <Link to="/" className="text-xl">
              Shop X
            </Link>
          </div>

          <div className="flex-none">
            <ul>
              {/* Profile */}
              {user ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className=" dropdown-content bg-slate-600 rounded-box z-[1] mt-3p-2 shadow"
                  >
                    <li className="p-2">
                      <button onClick={handleLogOut}>Logout</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin" className="border-b-2 border-transparent hover:border-white">
                  Sign In
                </Link>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
