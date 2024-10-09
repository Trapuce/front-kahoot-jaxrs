import { useFormik } from 'formik'
import React , {useState} from 'react'
import { Link } from 'react-router-dom'

export default function () {
  const formik = useFormik({
    initialValues:{
      nickname: '',
    }
  })
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#46178f]">
          <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
            <h1 className="text-4xl font-bold text-center mb-8 text-[#333]">create a user </h1>
            <form  className="space-y-6">
              <div>
                <label className="sr-only">UserName</label>
                <input
                  id="nickname"
                  type="text"
                  placeholder="Nickname"
                  value={formik.values.nickname}
                  onChange={formik.handleChange}
                  className="w-full text-2xl py-3 px-4 rounded-md border-2 border-[#46178f] focus:border-[#46178f] focus:ring focus:ring-[#46178f] focus:ring-opacity-50"
                />
              </div>
              {/* <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  value={formik.values.nickname}
                  onChange={formik.handleChange}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-2xl py-3 px-4 rounded-md border-2 border-[#46178f] focus:border-[#46178f] focus:ring focus:ring-[#46178f] focus:ring-opacity-50"
                  required
                />
              </div> */}
              <button
                type="submit"
                className="w-full py-4 text-2xl font-bold text-white bg-[#e21b3c] hover:bg-[#b2142f] focus:outline-none focus:ring-2 focus:ring-[#e21b3c] focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105"
              >
                Let's go!
              </button>
            </form>
            <p className="mt-6 text-center text-[#333]">
              Don't have an account? <Link to="/signup" className="text-[#46178f] hover:underline">Sign up here</Link>
            </p>
          </div>
        </div>
      )
    }
