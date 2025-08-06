import React from 'react'

const Navbar = () => {
    return (
        <>
            <nav className="navbar bg-base-300 shadow-md ">
                <div className="flex-1">
                    <span className="btn btn-ghost normal-case text-2xl font-bold">
                        My Todo App
                    </span>
                </div>
                {/* <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><a className="btn btn-ghost" href="/home">Home</a></li>
                    </ul>
                </div> */}
            </nav>
        </>
    )
}

export default Navbar