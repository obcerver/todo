import React, { useState } from 'react'
import { FiAlignLeft } from "react-icons/fi";

function Navbar() {
    const [open, setOpen] = useState(true);

    const Menus = [
        { title: "To-do", src: "Chart_fill" },
        { title: "new", src: "Chat" },
    ];
    return (
        <>
            <div className="flex absolute inset-y-0 left-0 bg-gray-500">
                <div
                    className={` ${open ? "w-72" : "w-20 "
                        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
                >
                    <button onClick={() => setOpen(!open)} className='left-align'>
                        <FiAlignLeft />
                    </button>
                    <ul className="pt-6">
                        {Menus.map((Menu, index) => (
                            <li
                                key={index}
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                                    } `}
                            >
                                <span className={`${!open && "hidden"} origin-left duration-200`}>
                                    {Menu.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar