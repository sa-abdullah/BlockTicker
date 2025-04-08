import {useState} from 'react'
import Logo from '../assets/logo2.png'
import { FaCog, FaUserPlus, FaSignInAlt, FaSearch, FaBars, FaBlog, FaFire } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropDown = () => {
    setIsOpen(!isOpen)
  }



    return (
        <>
          <div className="w-full font-red-600 flex justify-between p-5 border-b-2 border-b-gray-300">
            <div className="hidden lg:flex items-center gap-10 font-semibold">
                <Link to="/" className="flex items-center gap-1 text-2xl font-bold"><img src={Logo} alt="" className="w-[35px]" /> BlockTicker</Link>
                <Link to="/trending">Trending</Link>
                <Link to="/news">Blog</Link>
            </div>
            <div className="hidden lg:flex gap-10 items-center">
                <div>
                  <FaSearch />
                  <input type="search" className="hidden" />
                </div>
                <FaUserPlus size={24}/>
                <FaCog size={24}/>
                <FaSignInAlt size={24}/>
            </div>
            <Link to="/" className="flex lg:hidden items-center gap-1 text-2xl font-bold"><img src={Logo} alt="" className="w-[35px]" /> BlockTicker</Link>
            <div className="block lg:hidden relative p-4 bg-gray-800 text-white">
              <button onClick={toggleDropDown} className="focus:outline-none">
                <FaBars size={28} />
              </button>
              {isOpen &&
                (
                  <div className="absolute right-4 mt-2 w-48 bg-white text-black rounded shadow-lg">
                    <ul className="flex flex-col p-2">
                      <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"><FaFire/>Trending</li>
                      <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"><FaBlog/>Blog</li>
                      <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"><FaUserPlus/>Login</li>
                      <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"><FaSignInAlt/>Signup</li>
                      <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"><FaCog/>Settings</li>
                    </ul>
                  </div>
                )
              }
            </div>
          </div>
        </>
    )
}

export default Header