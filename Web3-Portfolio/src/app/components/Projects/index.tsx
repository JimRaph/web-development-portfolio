"use client"

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
// import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { BriefcaseIcon } from '@heroicons/react/24/solid';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { UserGroupIcon } from '@heroicons/react/24/solid';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import { CodeBracketIcon } from '@heroicons/react/24/solid';
import React from 'react'
import {motion} from 'framer-motion'




const projects = [
  {
    company: "DefiEdge",
    role: "Community Manager & Assistant Social Media Manager",
    logo: <UserGroupIcon width={150}/>,
    contributions: [
      "Monitored and moderated discussions to ensure compliance with code of conduct ",
      "Knowledge sharing by communicating updates, and events to the community",
      "Mediated disputes among community members",
      "Event Support in organizing and promoting community events like AMA",
      "Feedback collection on liquidity pools and product testing",
      "Managed the Twitter social media handle"
    ],
    socials: ["Twitter", "Discord"],
  },
  {
    company: "Tanssi Network",
    role: "Content Creator",
    logo: <CodeBracketIcon width={150}/>,
    contributions: [
      "Created Contents on Twitter to promote the protocol",
      "Wrote Articles on the protocol's product",
      "Engaged in the community activities and discussion"
    ],
    socials: ["Twitter", "medium"],
  },
  {
    company: "Desyn Protocol",
    role: "Content Creator",
    logo: <BookOpenIcon width={150}/>,
    contributions: [
      "Created Contents on Twitter to promote the protocol",
      "Wrote Articles on Medium to explain the protocol's product",
      "Engaged in the community activities and discussion"
    ],
    socials: ["Twitter", "Medium"],
  },
  {
    company: "Unbound Protocol",
    role: "Community Manager",
    logo: <BriefcaseIcon fontSize={18} width={150}/>,
    contributions: [
      "Transitioned from community moderator to Assistant Community Manager",
      "Curated article for the protocol's twitter handle",
      "Supervised ambassadors",
      "Moderated the community",
      "Supervised the transition from Telegram to Discord",
      "Handled partnership requests"
    ],
    socials: ["Twitter", "Telegram", "Discord"],
  },
  {
    company: "Oasis Network",
    role: "Content Creator",
    logo: <ShieldCheckIcon width={150}/>,
    contributions: [
      "Curated Twitter threads to promote the project",
      "Participated in community activities like AMAs, room calls",
      "Created contents for promotion"
    ],
    socials: ["Twitter", "Telegram", "Discord"],
  },
];

const Projects = () => {
  return (
    <section className="py-20 bg-[#F5F5DC] " id='projects'>
      <div className="w-5/6 m-auto">

        {/* Header  */}
       <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease:"easeOut" }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-amber-800">Recent Web3 Experience</h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="max-w-5/6 mx-auto space-y-16">
          {projects.map((project, index) => (
            <motion.div key={index} 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: index * 0.2,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="group">
              <div className={`mb-16 md:flex ${index % 2 === 0 ? 'md:flex-row' : 
                'md:flex-row-reverse'} items-center gap-12`}>

                {/* Icon Container */}
                <div className={`md:w-1/4 flex ${index%2===0?"justify-start":"justify-end"} p-6 rounded-2xl bg-gradient-to-br ${index%4===0?"from-[#FFD700]/10 to-[#FFA500]/20" : index%4===1?"from-[#0033A0]/10 to-[#007F5C]/20" : index%4===2?"from-[#C21807]/10 to-[#FF4500]/20" : "from-[#007F5C]/10 to-[#0033A0]/20"} group-hover:shadow-lg transition-all`}>
                  <div className={`p-6 rounded-full ${index%4===0?"bg-[#FFD700]/20 text-[#FFA500]" :
                     index%4===1?"bg-[#0033A0]/20 text-[#0033A0]" : index%4===2?
                     "bg-[#C21807]/20 text-[#C21807]" : "bg-[#007F5C]/20 text-[#007F5C]"}`}>
                    {React.cloneElement(project.logo, { className: "w-20 h-20" })}
                  </div>
                </div>

                {/* Content */}
                <div className={`md:w-3/4 p-8 rounded-xl border border-transparent 
                  group-hover:border-[#0033A0] transition-all ${index%2===0?
                  "bg-white dark:bg-[#1E1E1E]":"bg-[#FFFFFF] dark:bg-[#252525]"}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-2xl font-bold ${index%4===0?"text-[#FFA500]" :
                         index%4===1?"text-[#0033A0]" : index%4===2?"text-[#C21807]" :
                          "text-[#007F5C]"}`}>
                        {project.company}
                      </h3>
                      <p className="text-[#2E2E2E] dark:text-[#F5F5DC]">{project.role}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {project.contributions.map((item, i) => (
                      <li key={i} className="flex">
                        <span className={`mr-2 ${index%4===0?"text-[#FFD700]" : 
                          index%4===1?"text-[#0033A0]" : index%4===2?"text-[#C21807]" : 
                          "text-[#007F5C]"}`}>▹</span>
                        <span className="text-[#2E2E2E] dark:text-[#F5F5DC]">{item}</span>
                      </li>
                    ))}
                  </ul>

                    {/* socials  */}
                  <div className="flex flex-wrap gap-2">
                    {project.socials.map((social) => (
                      <span 
                        key={social} 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${index%4===0?
                          "bg-[#FFD700]/10 text-[#FFA500]" : index%4===1?
                          "bg-[#0033A0]/10 text-[#0033A0]" : index%4===2?
                          "bg-[#C21807]/10 text-[#C21807]" : "bg-[#007F5C]/10 text-[#007F5C]"}`}
                      >
                        {social}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {index < projects.length - 1 && (
                <div className={`w-1/2 mx-auto h-0.5 ${index%4===0?
                  "bg-gradient-to-r from-[#FFD700]/0 via-[#FFA500] to-[#FFD700]/0" : 
                  index%4===1?"bg-gradient-to-r from-[#0033A0]/0 via-[#0033A0] to-[#0033A0]/0" :
                   index%4===2?"bg-gradient-to-r from-[#C21807]/0 via-[#C21807] to-[#C21807]/0" :
                    "bg-gradient-to-r from-[#007F5C]/0 via-[#007F5C] to-[#007F5C]/0"}`}></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;