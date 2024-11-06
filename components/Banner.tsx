import Link from 'next/link'
import React from 'react'
import { FaHandsHelping } from "react-icons/fa";

const IMAGE_BANNER = 'https://images.unsplash.com/photo-1721390017772-12182f8b685b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
const Banner: React.FC<{ mine?: boolean }> = ({ mine }) => {
  return (
    <div
      style={{ backgroundImage: 'url(' + IMAGE_BANNER + ')' }}
      className="relative w-full h-[44rem] flex items-center justify-center text-white
      bg-no-repeat bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"></div>
      <div className="flex flex-col justify-end text-white p-8 space-y-8 relative z-10 h-80">
        {!mine ? (
          <h1 className="text-7xl text-center font-semibold">
            Compassion Knows  <br /> No Borders.
          </h1>
        ) : (
          <h1 className="text-7xl text-center font-semibold">
            Your Charity <br /> Projects
          </h1>
        )}
        <Link
          href={'/donations/create'}
          className="bg-white text-[#a75891] px-4 space-x-1
        flex justify-center items-center rounded-full text-center py-3
        transition duration-300 ease-in-out hover:bg-[#a75891] hover:text-white"
        >
          <FaHandsHelping size={25} />
          <span>Open Arms for Someone</span>
        </Link>
      </div>
    </div>
  )
}

export default Banner
