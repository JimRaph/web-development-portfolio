import { CheckIcon } from 'lucide-react'
import React from 'react'

const Pricing = () => {

  const pricing = [
    {plan:"Starter", price: "$10", span:"per user",action:"get started",
      desc:"Starter plan includes:", features:[
        {icon:<CheckIcon />, text:"Fast, reliable payroll"},
        {icon:<CheckIcon />, text:"Fast, reliable payroll"},
        {icon:<CheckIcon />, text:"Fast, reliable payroll"},
        {icon:<CheckIcon />, text:"Fast, reliable payroll"},
      ], classname:"border-[#1d2c37] bg-[#142531]", button:"border-[#243744]  bg-[#23323c] hover:bg-[#34556b]"
    },
    {plan:"Pro", price: "$20", span:"per user",action:"get plan",
      desc:"Everything in Started, plus:", features:[
        {icon:<CheckIcon className='text-[#0ba5ec]'/>, text:"Advanced HR features"},
        {icon:<CheckIcon className='text-[#0ba5ec]'/>, text:"Automated workflows"},
        {icon:<CheckIcon className='text-[#0ba5ec]'/>, text:"Expanded compliance coverage"},
        {icon:<CheckIcon className='text-[#0ba5ec]'/>, text:"Priority support"},
      ], classname: "border-[#0ba5ec] bg-[#142531]", button:"bg-[#0ba5ec] border-[#243744] hover:bg-[#42abdb]"
    },
    {plan:"Enterprise", price: "Custom", span:"",action:"Contact us",
      desc:"Everything in Pro, plus:", features:[
        {icon:<CheckIcon className='text-green-500'/>, text:"Dedicated account manager"},
        {icon:<CheckIcon className='text-green-500'/>, text:"Custom integrations"},
        {icon:<CheckIcon className='text-green-500'/>, text:"Full compliance services"},
        {icon:<CheckIcon className='text-green-500'/>, text:"Onboarding & implementation"},
      ], classname:"bg-[#0ba5ec]", button:"bg-[#ffff] text-gray-700 hover:bg-[#fffe] border-1 border-white"
    },
  ]
  return (
    <section className='text-gray-300 2xl:px-[4rem] lg:[px-4rem] px-[1rem] lg:mt-[6rem]
     my-4 mb-40 lg:mx-15'>
    
          <div className='flex flex-col py-20 gap-3 items-center bg-[#071925]
          border-2 border-[#1B1C21] rounded-xl relative md:mx-5'>
            <span className='font-semibold tracking-widest bg-[#0b283b] border-[#0ba5ec] border-1 rounded-full 
            text-[#0ba5ec] px-4 py-1 capitalize'>pricing</span>
            <h1 className='text-4xl font-semibold capitalize text-center'>plans that scale with your growth</h1>
            <p className=" text-lg text-center ">Transparent pricing, zero hidden fees. <br /> Everything you need
            to power your HR and payroll.
            </p>
    
           <div className="w-full 2xl:px-25 px-5">
  <div className='grid lg:grid-cols-3 grid-cols-1 gap-6 mt-10'>
    {pricing.map((items, i) => (
      <div key={i} className={` p-5 border ${items.classname} w-full rounded-xl min-h-[300px]
       flex flex-col justify-between`}>
        <div className='text-white'>
          <span>{items.plan}</span>
          <p className={`text-3xl font-bold border-b border-[#243744] pb-3
            ${i===2 ? 'border-[#ffff]' : 'null'}`}>{items.price} <span className='text-sm font-normal'>{items.span}</span></p>
          <button className={`px-2 py-1 rounded-full text-center w-full mt-4 border-2 
            ${items.button} font-semibold capitalize cursor-pointer transition duration-200`}>{items.action}</button>
          <p className='mt-3'>{items.desc}</p>
          {
            items.features.map((items,i) =>(
               <p className='py-2 items-center flex gap-2' key={i}>{items.icon}{items.text}</p>
            ))
          }
          {/* <p className='py-2 items-center flex gap-2'><CheckIcon />Fast, reliable payroll</p>
          <p className='py-2 items-center flex gap-2'><CheckIcon />Fast, reliable payroll</p>
          <p className='py-2 items-center flex gap-2'><CheckIcon />Fast, reliable payroll</p>
          <p className='py-2 items-center flex gap-2'><CheckIcon />Fast, reliable payroll</p> */}
        </div>
        
      </div>
    ))}
  </div>
</div>

    
    
          </div>
    
        </section>
  )
}

export default Pricing
