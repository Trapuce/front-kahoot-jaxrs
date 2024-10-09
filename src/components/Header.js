import React from "react";
import logo from "./images/kahoot-removebg-preview.png";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="fixed z-20 top-0 w-full p-5 flex items-center justify-between shadow-md bg-[#A600FF] ">
      <a href="#" className="mr-10">
        <img alt="logo" src={logo} className="w-32 h-24 cursor-pointer " />
      </a>
      <Link to="/signup">
      <div className="flex flex-col space-y-1  justify-center items-center p-2 bg-white rounded-lg cursor-pointer">
        <PlusCircleIcon className="h-10  text-[#A600FF]" />
        <p className="text-sm ">Create a kahoot !</p>
      </div>
      </Link>
    </div>
  );
}
