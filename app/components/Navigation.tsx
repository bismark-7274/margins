"use client";

import Link from "next/link";
import React from "react";
import { useFavorites } from "../hooks/useFavorites";
import MarginImage from "./Image";
import { TMDB_CONFIGURATION } from "../constants";
import Search from "./Search";

const { images } = TMDB_CONFIGURATION;

const Navigation = () => {
  const { favorites } = useFavorites();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Margins
        </Link>
      </div>
      <div>
        <Search />
      </div>
      <div className="flex-none hidden md:block">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/movies/popular">Popular</Link>
          </li>
          <li>
            <Link href="/movies">Movies</Link>
          </li>
          <li>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="">
                Favorites
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {favorites.map((f) => (
                  <li className="px-2 py-4 flex" key={f.id}>
                    <MarginImage
                      src={`${images.base_url}original${f.coverUrl}`}
                      alt={f.title}
                    />
                    <span>{f.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="dropdown dropdown-left md:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />{" "}
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <Link className="text-base p-4" href="/movies/popular">
              Popular
            </Link>
          </li>
          <li>
            <Link className="text-base p-4" href="/movies">
              Movies
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
