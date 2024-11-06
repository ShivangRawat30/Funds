import React from 'react'
import ConnectBtn from './ConnectBtn'
import Link from 'next/link'
import { FaHandsHelping } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className='w-full absolute z-20 pt-5 px-5 sm:px-0'>
      <nav
        className="flex flex-wrap items-center justify-center lg:w-2/3 w-full
        px-2 py-3 shadow-md text-white mb-3 bg-white mx-auto rounded-full"
      >
        <div
          className="container px-4 mx-auto flex flex-wrap items-center
          justify-center"
        >
          <div className="w-full relative flex justify-between px-4 lg:static">
            <Link
              className="text-sm font-semibold leading-relaxed text-[#a75891]
            flex justify-start items-center py-2 whitespace-no-wrap uppercase"
              href="/Home"
            >
              <FaHandsHelping size={25} />
              <span className='hidden sm:flex ml-5'>OpenArms</span>
            </Link>

            <ConnectBtn />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
