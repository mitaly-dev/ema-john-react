import React from 'react';
import logo from '../../images/Logo.svg'

const Header = () => {
    return (
        <nav>
            <div className="navbar bg-[#1C2B35] text-white px-28">
            <div className="flex-1">
            <a href='/' className="btn btn-ghost normal-case text-xl">
            <img src={logo} alt="" />  
            </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0 capitalize">
                <li><a href='/'>order</a></li>
                <li><a href='/'>order review</a></li>
                <li><a href='/'>Manage Inventory</a></li>
                <li><a href='/'>Login</a></li>
                </ul>
            </div>
            </div>
        </nav>
    );
};

export default Header;