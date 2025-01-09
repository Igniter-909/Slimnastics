import React, { useState } from 'react'
import {  BarChart2, Bell, DollarSign, Home, Menu, MessageCircleCode, Settings, ShoppingBag,UserCheck,Users, VideotapeIcon} from "lucide-react"
import {motion,AnimatePresence, color} from "framer-motion";
import {Link} from "react-router-dom"

const SIDEBAR_ITEMS = [
	{name: "Overview",icon: BarChart2,color: "#6366f1",href: "/overview"},
	{ name: "Manage Products", icon: ShoppingBag, color: "#8B5CF6", href: "/adminProducts" },
	{ name: "Manage Users", icon: Users, color: "#EC4899", href: "/adminUsers" },
	{ name: "Manage Plans", icon: DollarSign, color: "#10B981", href: "/adminPlan" },
    { name: "Manage Trainers", icon: UserCheck, color: "#D90A14", href: "/adminTainers" },
    {name: "Blogs",icon: VideotapeIcon, color: "#8B5CF6", href: "/adminBlogs"},
    {name: "Notifications",icon: Bell, color: "#FFEB00", href: "/adminNotifications"},

	{ name: "Home", icon: Home, color: "#6EE7B7", href: "/" },
];

function SideBar() {

    const [isSideBarOpen,setIsSideBarOpen] = useState(true);


  return (
    <motion.div 
     className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 $${isSideBarOpen ? 'w-64' : 'w-20'}`}
     animate = {{width: isSideBarOpen ? 256 : 80}}
    >
        <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-[#83262a]'>
           <motion.button
            whileHover={{scale : 1.1}}
            whileTap={{scale:0.9}}
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
           >
                <Menu size={24} />
            </motion.button> 

            <nav className='mt-8 flex-grow'>
                {SIDEBAR_ITEMS.map((item) => (
                    <Link key={item.href} to={item.href} >
                        <motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#83262a] transition-colors mb-2'>
                            <item.icon size={20} style={{color:item.color, minWidth:"20px"}} />
                            <AnimatePresence>
                                {isSideBarOpen && (
                                    <motion.span 
                                    className='ml-4 whitespace-nowrap'
                                    initial={{opacity:0,width:0}}
                                    animate={{opacity:1, width:"auto"}}
                                    exit={{opacity:0, width:0}}
                                    transition={{duration:0.2, delay:0.3}}
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    </Link>
                ))}
            </nav>

        </div>
    </motion.div>
  )
}

export default SideBar