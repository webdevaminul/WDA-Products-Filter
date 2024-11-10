import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-slate-800 text-white h-16">
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <Link to="/" className="text-xl">
            WDA Product Filter
          </Link>
        </div>
      </div>
    </div>
  );
}
