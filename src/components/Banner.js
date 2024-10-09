import React from 'react'
import ban from './images/banner.png'
export default function Banner() {
  return (
    <div className="relative  ">
    <img alt="banner" src={ban}  className="w-full h-full object-cover " />


    <div className="absolute top-1/2 w-full text-center">
        <p className=" text-sm sm:text-lg">ARE YOU RAEDY </p>

        <button className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full  font-bold  my-auto hover:shadow-xl active:scale-90 transition duration-150 ">
            Im Ready 
        </button>
    </div>
</div>
  )
}
