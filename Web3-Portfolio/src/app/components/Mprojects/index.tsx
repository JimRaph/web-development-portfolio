"use client"

import { easeIn, motion } from "framer-motion";

const otherProjects = [
    {
      name: "Polytrade",
      description: "A Real world asset (RWA) marketplace, buy, trade, and leverage 10+ chains.",
      category: "RWA",
    },
    {
      name: "Ruby Protocol",
      description: "Intent-Centric Chain Abstraction Layer for Web3 with Scalability, Interoperability, and Privacy-preserving.",
      category: "Security",
    },
    {
      name: "Covalent",
      description: "Modular Data Infrastructure for AI .",
      category: "AI",
    },
    {
      name: "Nasdex",
      description: "RWA marketplace that makes tokenized real-world assets like private equity, real state and art.",
      category: "RWA",
    },
    {
      name: "API3",
      description: "Api3 provides data feeds and pays dApps for using them.",
      category: "Oracle",
    },
    {
      name: "Feoverse",
      description: "Immersive metaverse for fans of king of fighters video gaming series.",
      category: "NFT",
    },
    // Add more...
  ];
  
  export default function OtherExperiences() {
    return (
      <section className="py-20 px-6 bg-[#F5F5DC] dark:bg-[#2E2E2E]">
        <div className="max-w-6xl mx-auto">

          {/* Header  */}
          <motion.div
          initial={{opacity:0, y:-80}}
          whileInView={{opacity:1, y:0}}
          transition={{duration: 0.7}}
          viewport={{once: false, amount: 0.7}}
          >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#2E2E2E] dark:text-[#FFD700]">
            Other Experiences
          </h2>
          </motion.div>

          {/* Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {otherProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                ease: [0.4, 0, 0.2, 1],
              }}
              viewport={{ once: false, amount: 0.5 }}
              
              className="p-6 rounded-xl border border-[#2E2E2E] hover:border-[#0033A0] 
                        hover:shadow-lg hover:scale-[1.02] transition-transform"
              style={{
                background: "linear-gradient(to bottom right, #F5F5DC, #FFFFFF)",
                transform: "translateY(0px)"
              }}
            >
              <span
                className="px-3 py-1 rounded-full text-xs font-medium text-[#FFA500]"
                style={{ background: "rgba(255, 215, 0, 0.1)" }}
              >
                {project.category}
              </span>
              <h3 className="text-xl font-bold mb-2 text-[#C21807]">{project.name}</h3>
              <p className="text-[#2E2E2E] dark:text-gray-700">{project.description}</p>
            </motion.div>
          ))}

          </div>
        </div>
      </section>
    );
  }