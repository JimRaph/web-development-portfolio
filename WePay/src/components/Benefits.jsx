import React from "react";
import { ChevronRight, DollarSign, ChartColumnIncreasing, Boxes } from "lucide-react";
import { screenshot5, screenshot3, screenshot4, screenshot6, dotAutomated } from "../exports/images";

const Benefits = () => {

    const features = [
        {
            name: "Effortless payroll processing",
            desc: "Automate salary calculations, tax deductions, and payouts with pinpoint accuracy.",
            icon: <DollarSign className="absolute z-1 top-5 left-5 text-red-500" strokeWidth="4" size="25"/>,
            image: <img src = {screenshot6} alt='' className='object-contain h-[4rem]' />
        },
        {
            name: "Real-time performance insights",
            desc: "Track employee engagement, performance metrics, and trends to make smarter decisions.",
            icon: <ChartColumnIncreasing className="absolute z-1 top-5 left-5 text-red-500" strokeWidth="3" size="25" />,
            image: <img src = {screenshot6} alt='' className='object-contain h-[4rem]' />
        },
        {
            name: "Streamlined compliance tracking",
            desc: "Stay audit-ready with automatic updates on labor laws, contracts, and certifications.",
            icon: <Boxes className="absolute z-1 top-5 left-5 text-red-500" strokeWidth="3" size="25" />,
            image: <img src = {screenshot6} alt='' className='object-contain h-[4rem]' />
        }
    ]
    return (
        <section className="2xl:px-[10rem] lg:px-[4rem] px-[1rem] 2xl:py-[0rem] py-20 text-gray-300">
            
            <div className="relative grid lg:grid-cols-2 items-center px-3 lg:px-0">    
                <div className="z-2 flex flex-col lg:items-start items-center md:gap-2 md:mt-20 lg:mt-0">
                    <h1 className="font-semibold text-4xl md:text-5xl lg:text-4xl xl:text-5xl lg:text-start">Power up your HR team <br  /> with smarter solutions</h1>
                    <p className="lg:text-start lg:text-xl">Streamline workflows, minimize errors, and boost <br />
                        employee satisfaction - all in one platform.
                    </p>
                    <button className="relative overflow-hidden group text-gray-300 text-lg font-medium 
                        bg-gradient-to-r from-[#0BA5EC] via-blue-500 to-pink-500 flex items-center
                        px-6 py-3 mt-8 rounded-full transition duration-300 capitalize cursor-pointer z-[2]">
                            <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition 
                            duration-300 rounded-full"></span>
                            <span className=" z-10 flex items-center">
                            Learn More <ChevronRight />
                            </span>
                        </button>                
                </div>
                <img src={screenshot5} alt="" className="lg:relative absolute z-1 lg:top-0 top-5 "/>
            </div>


            <div className="grid lg:grid-cols-3 2xl:gap-[5rem] lg:gap-[3rem] gap-[2rem] lg:mt-8
            mt-[10rem] md:mt-[25rem] justify-center">
                {
                    features.map((items, idx) => (
                        <div className="flex flex-col items-start" key={idx}>
                    <div className="relative">
                        {items.icon}
                        {items.image}
                    </div>
                    <h4 className="font-semibold text-white 2xl:text-xl lg:text-lg text-[25px]
                    mt-5">{items.name}</h4>
                    <p className="2xl:text-[17px] text-lg text-start py-3">{items.desc}</p>
                </div>


                    ))
                }

            </div>


            <div className="grid lg:grid-cols-2 items-center 2xl:gap-[0rem] lg:gap-[7rem] 
            gap-[2rem] 2xl:mt-[6rem] lg:mt-[6rem] mt-[2rem]">

                <div className="relative lg:order-1 order-2 lg:left-10 md:mx-20 lg:px-0">
                    <div className="absolute top-[4.5rem] left-[0.5rem] 2xl:w-[63%] w-full
                     h-[2.5rem] bg-[#0BA5EC] blur-xl"></div>
                    <img src={dotAutomated} alt="" className="2xl:w-[64%] w-full 2xl:h-[35rem] h-full z-1" />
                    <img src={screenshot3} alt="" className="absolute top-[3rem] border border-[#0BA5EC] object-contain w-[25rem] rounded-2xl z-10" />
                    <img src={screenshot4} alt="" className="absolute top-[9rem] object-contain 2xl:w-[25rem] w-full rounded-2xl mt-5 z-10" />
                </div>

                <div className="lg:order-2 order-1 flex flex-col lg:items-start items-center 
                ">
                    <h1 className="lg:text-start text-center font-semibold 2xl:text-5xl
                    lg:text-4xl md:text-5xl text-4xl 2xl:leading-[3.5rem] capitalize mt-6"> Automate tasks. <br /> Amplify results.</h1>
                    <p className="2xl:text-lg lg:text-sm 2xl:py-5 lg:py-7 py-2 lg:text-start
                    text-center">Free up valuable time by automating administrative work <br /> 
                    and focusing on what matters most — your people.</p>
                    <button className="relative overflow-hidden group text-gray-300 text-lg font-medium 
                        bg-gradient-to-r from-[#0BA5EC] via-blue-500 to-pink-500 flex items-center
                        px-6 py-3 mt-8 rounded-full transition duration-300 capitalize cursor-pointer z-[2]">
                            <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition 
                            duration-300 rounded-full"></span>
                            <span className=" z-10 flex items-center">
                            Learn More <ChevronRight className= "font-bold"/>
                            </span>
                        </button>   
                </div>

            </div>

        </section>
    );
};

export default Benefits;