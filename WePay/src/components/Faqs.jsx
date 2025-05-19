import { ChevronRight } from 'lucide-react'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const Faqs = () => {
  return (
    <section className='text-gray-300 my-[10rem]'>
      <div className='text-center lg:mx-[10rem] mx-[3rem] md:mx-[6rem]'>

        <h1 className='text-4xl font-semibold capitalize'>frequently asked questions</h1>
        <p className='text-lg py-2'>Do you still have more questions? Contact us</p>
        <button className="relative overflow-hidden group text-gray-300 text-lg font-medium 
      bg-gradient-to-r from-[#0BA5EC] via-blue-500 to-pink-500 flex items-center
      px-6 py-2 mt-2 rounded-full transition duration-300 capitalize cursor-pointer z-[2]
      mx-auto">
        <span className="absolute inset-0 bg-black opacity-90 group-hover:opacity-40 transition 
        duration-300 rounded-full"></span>
        <span className=" z-10 flex items-center">
          contact us <ChevronRight />
        </span>
      </button>

      <div className='max-w-4xl mx-auto mt-10 '>
        <Accordion type="single" collapsible className="border border-gray-800 rounded-lg ">

          <AccordionItem value="item-1" >
            <AccordionTrigger className="text-xl">How do I get started with WePay?</AccordionTrigger>
            <AccordionContent >
              Lorem to the rescue, how lovely are you lorem, graceful as always.
            </AccordionContent>

          </AccordionItem>
          <AccordionItem value="item-2" >
            <AccordionTrigger className="text-xl">Can I integrate WePay with other apps I use?</AccordionTrigger>
            <AccordionContent>
              Lorem says you can, again, lorem to the rescure. What would we do without you?
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" >
            <AccordionTrigger className="text-xl">What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              What ever payment method lorem finds suitable. Why don't you consult...hold on...
              we accept all method...my apologizes?
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" >
            <AccordionTrigger className="text-xl">Is there a free trial available?</AccordionTrigger>
            <AccordionContent>
              Lorem is very charitable, as such, there is. Jump in and enjoy your trial. 
              You can cancel at anytime too?
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" >
            <AccordionTrigger className="text-xl">How secure is my data on WePay?</AccordionTrigger>
            <AccordionContent >
              Lorem is the strongest of the avengers? Oh you have not heard of him?
              Well lorem is way too strong and operates alone, against creatures that would tear
              the rest of the avengers apart in seconds.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" >
            <AccordionTrigger className="text-xl">Can I cancel or change my subscription anytime?</AccordionTrigger>
            <AccordionContent >
              Lorem says yes. Cancel and change at your convenience, anywhere, anytime?
            </AccordionContent>
          </AccordionItem>

        </Accordion>

      </div>
      </div>
    </section>
  )
}

export default Faqs
