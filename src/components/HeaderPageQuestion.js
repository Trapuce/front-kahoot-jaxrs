import React from 'react'
import logo from "./images/logo-kahoot.png";
import { Link } from 'react-router-dom';
export default function HeaderPageQuestion({username}) {
    return (
        <div className="sticky z-20 flex justify-between bg-white shadow-md items-center">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="" className="h-16" />
            <div
              className="flex items-center space-x-6 border p-1 rounded-md cursor-pointer"
            >
              <span>Bienvenue {username} </span>
            </div>
          </div>
    
          <div className="flex items-center space-x-3 mr-3">
            <Link to="/listKahoots">
            <span  className="border p-2 bg-white shadow-md rounded-md hover:bg-slate-200 cursor-pointer">
              Quitter
            </span>
            </Link>
            <span
              className="border p-2 bg-white shadow-md rounded-md hover:bg-slate-200 cursor-pointer"
            >
              Enregistrer
            </span>
          </div>
    
      
        </div>
      );
    }
    
