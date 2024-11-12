import { useState } from 'react';
import { NavLink,Link } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        console.log(menuOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <div className="text-white text-lg font-bold"><Link href='#'>ERP Project</Link></div>
                <button className="text-white sm:hidden" onClick={toggleMenu}>
                    {menuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    )}
                </button>
                <ul className={`w-full sm:w-auto sm:flex space-x-4 ${menuOpen ? 'block' : 'hidden'} ml-4 sm:ml-0`}>
                    <li><NavLink to="" className={({isActive})=>`${isActive?"text-lime-400":"text-gray-200"} ml-4 hover:text-gray-400` }>Sales</NavLink></li>
                    <li><NavLink to="/stocks" className={({isActive})=>`${isActive?"text-lime-400":"text-gray-200"}  hover:text-gray-400` }>Stocks</NavLink></li>
                    <li><NavLink to="/transactions" className={({isActive})=>`${isActive?"text-lime-400":"text-gray-200"}  hover:text-gray-400` }>Transactions</NavLink></li>
                </ul>
            </div>
        </nav>
    );
};

export { Navbar };
