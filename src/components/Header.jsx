import Logo from '../assets/logo2.png'
import { FaCog, FaUserPlus, FaSignInAlt, FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <>
          <div className="w-full font-red-600 flex justify-between p-5 border-b-2 border-b-gray-300">
            <div className="flex items-center gap-10 font-semibold">
                <Link to="/" className="flex items-center gap-1 text-2xl font-bold"><img src={Logo} alt="" className="w-[35px]" /> BlockTicker</Link>
                <Link to="/trending">Trending</Link>
                <Link to="/news">Blog</Link>
            </div>
            <div className="flex gap-10 items-center">
                <div>
                  {/* <FaSearch /> */}
                  <input type="search" className="hidden" />
                </div>
                <FaUserPlus size={24}/>
                <FaCog size={24}/>
                <FaSignInAlt size={24}/>
            </div>
          </div>
        </>
    )
}

export default Header