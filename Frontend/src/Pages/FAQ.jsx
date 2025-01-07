import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeLayout from '../layout/HomeLayout';
import {FAQs} from "../constants/Faqs.js"

function FAQItem({ faq, isOpen, toggleFAQ }) {
  return (
    <motion.div 
      className="border border-gray-200 rounded-lg overflow-hidden shadow-custom-shadow shadow-[#D90A14] mb-4"
      initial={false}
      animate={{ backgroundColor: isOpen ? "#f3f4f6" : "#ffffff" }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleFAQ}
      >
        <p className="font-semibold text-gray-800">{faq.question}</p>
        <motion.span
          className="text-gray-600"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 bg-gray-50 text-gray-600">
              <p>{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <HomeLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#D20C13] to-[#CC4E17] bg-clip-text text-transparent font-rubik">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {FAQs.map((faq, index) => (
            <FAQItem 
              key={index} 
              faq={faq} 
              isOpen={activeIndex === index} 
              toggleFAQ={() => toggleFAQ(index)} 
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default FAQ;

