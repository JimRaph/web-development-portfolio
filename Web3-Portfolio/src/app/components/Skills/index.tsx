"use client"

import React from 'react'
import {motion} from 'framer-motion'


const Skills = () => {

    return (
        <div className="bg-[#2E2E2E] py-20" id='skills'>
        <div className="w-5/6 m-auto py-15">
      
          {/* Section Header */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: -30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100">My Skills</h2>
            <div className="w-20 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
          </motion.div>
      
          {/* Skill Cards */}
          <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="lg:flex items-start justify-between gap-10 space-y-10 lg:space-y-0">
      
            
            <div className="bg-[#1E1E1E]/70 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-[#2D2D2D]">
              <div className="text-amber-400 text-3xl font-semibold mb-2">01</div>
              <h3 className="text-white text-xl font-semibold mb-4">Community Management</h3>
              <p className="text-gray-300 leading-relaxed">
                I build and engage communities aligned with your project's mission, creating strategies that drive growth and retention.
              </p>
            </div>
      
            
            <div className="bg-[#1E1E1E]/70 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-[#2D2D2D]">
              <div className="text-amber-400 text-3xl font-semibold mb-2">02</div>
              <h3 className="text-white text-xl font-semibold mb-4">Content Creation</h3>
              <p className="text-gray-300 leading-relaxed">
                I craft impactful content, from tweets to threads, graphics to articles, all designed to inform, inspire, and convert.
              </p>
            </div>
      
            
            <div className="bg-[#1E1E1E]/70 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-[#2D2D2D]">
              <div className="text-amber-400 text-3xl font-semibold mb-2">03</div>
              <h3 className="text-white text-xl font-semibold mb-4">Community Moderation</h3>
              <p className="text-gray-300 leading-relaxed">
                I maintain healthy, safe, and responsive community environments through moderation, support handling, and user trust-building.
              </p>
            </div>

          </motion.div>

        </div>
      </div>
      

      
  )
}

export default Skills