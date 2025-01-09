import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllContacts } from '../../Redux/Slices/AdminSlice.js';
import {AnimatePresence, motion} from "framer-motion"

function FeedbackItem ({item,isOpen,toggleFeedback}) {
    console.log("hello")
    const formattedDate = new Date(item.createdAt).toISOString().split("T")[0];
    return (
        <motion.div
        className='border border-[#D90A14]/50 rounded-lg overflow-hidden mb-4'
        initial={{opacity:0, y:-5}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.3}}
        >
            
            <div className='flex justify-between items-center p-4 cursor-pointer' onClick={toggleFeedback}>
                <div className='flex gap-4'>
                    <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-100'>{item.email}</div>
                        <div className='text-gray-400'>{item.type}</div>
                    </div>
                    <div className='ml-auto'>
                        <div className='text-sm text-gray-400'>{formattedDate}</div>
                    </div>
                </div>
                <motion.span
                className='text-gray-600'
                animate={{rotate: isOpen? 180:0}}
                transition={{duration:0.3}}
                >
                    ▼
                </motion.span>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className='p-4 text-white/50'
                        initial={{opacity:0, height:0}}
                        animate={{opacity:1, height:"auto"}}
                        exit={{opacity:0, height:0}}
                        transition={{duration:0.6}}
                    >
                        <div className="p-4 flex flex-col ">
                            <p className='font-rubik text-[#D90A14]'>{item.firstName} {item.lastName}</p>
                            <p className='text-white'>{item.message}</p>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </motion.div>
    )
}

function Feedback({allContacts}) {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFeedback = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

  return (
    <div className='space-y-4'>
        {allContacts.map((contact,index) => (
            <FeedbackItem 
            key={index}
            item={contact}
            isOpen={activeIndex === index}
            toggleFeedback={() => toggleFeedback(index)}
            />
        ))}

    </div>
  )
}

export default Feedback