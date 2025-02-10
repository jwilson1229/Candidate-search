import React from "react";
import { Link } from "react-router-dom";


const Nav = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">Candidate Finder</h1>
        <div className="flex gap-4">
          <Link to="/">
            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg shadow-md">
              Search Candidates
            </button>
          </Link>
          <Link to="/saved">
            <button className="px-5 py-2 bg-gray-700 hover:bg-gray-800 transition rounded-lg shadow-md">
              Saved Candidates
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;



