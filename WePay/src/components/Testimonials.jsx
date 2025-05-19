import { dotTestimonials, avatar10, avatar02, avatar03 } from "../exports/images";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, 
  CarouselPrevious, } from "../components/ui/carousel";
import React from "react";
import { Circle } from "lucide-react";

    const reviews = [
        {
            id: 1,
            avatar: avatar10,
            fullname: "Alex Joy",
            jobPosition: "Senior Frontend Engineer, Desphixs ♾️",
            bg:"bg-[#0BA5EC]",
            review: "Switching to WePay was a game-changer. The platform is fast, reliable, and thoughtfully built. It fits seamlessly into our workflow and has helped us move faster than ever.",
        },

        {
            id: 2,
            avatar: avatar02,
            fullname: "Destiny Franks",
            jobPosition: "CEO, Desphixs ♾️",
            bg:"bg-red-400",
            review: "WePay has redefined how we operate. From its clean interface to its incredible speed, everything feels effortless. It’s rare to find tools that just work — WePay does.",
        },

        {
            id: 3,
            avatar: avatar03,
            fullname: "Praise Daniel",
            jobPosition: "Product Intern, Desphixs ♾️",
            bg: "bg-gray-500",
            review: "As an intern, getting started with WePay was refreshingly simple. The intuitive design made onboarding fast, and the performance makes it a platform you actually want to use daily.",
        },
    ];

const Testimonials = () => {

  const [api, setApi] = React.useState()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  console.log(api)
  console.log(count)
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
 

  return (
    <section className='text-gray-300 2xl:px-[5rem] lg:px-[4rem] px-[2.5rem] 2xl:mt-[6rem]
    lg:mt-[6rem] mt-[10rem]'>
      
      <div className="flex flex-col items-center gap-10 bg-[#14161B] py-[3rem] rounded-3xl
      lg:px-5 xl:px-30 2xl:px-50 2xl:mx-20 lg:py-[6rem] relative">
        <span className="bg-[#25262B] tracking-widest capitalize font-semibold border
         border-red-400 px-5 py-1 rounded-full text-red-400">what people say?</span>
        <h1 className="lg:text-5xl font-semibold capitalize text-center
        text-4xl px-10">wonder how we empower companies & individuals?</h1>

        <Carousel setApi={setApi} className="w-full relative xl:mx-auto">
        <CarouselContent>
          {reviews.map((review, index) => (
            <CarouselItem key={index}>
              <div className="flex lg:flex-row flex-col items-center w-full rounded-xl
              gap-y-10 justify-between lg:bg-[#111317] lg:border-3 lg:gap-x-4
               md:px-[3rem] py-[4rem] border-[#1B1D21]">
                <div className="relative group z-3">
                  <div className={`absolute blur-[0.6rem] ${review.bg} w-full h-full z-1`}></div>
                  <div className="z-3">
                    <img src={review.avatar} alt="" className="relative w-60 h-60 z-2 
                    border-5 border-[#1F2127] rounded-xl object-contain 
                    group-hover:opacity-75 transition-all duration-300 ease-in-out" />
                  </div>
                </div>

                <div className="px-10 flex-1 xl:mr-10 mt-10 text-center
                lg:mt-0 lg:text-start">
                  <h3 className="font-semibold text-3xl text-white">{review.fullname}</h3>
                  <p >{review.jobPosition}</p>
                  <p className="mt-4 text-white">{review.review}</p>
                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
         <div className="absolute inset-y-0 left-4 flex items-center">
          <CarouselPrevious className="ml-4" />
        </div>
        <div className="absolute inset-y-0 right-4 flex items-center">
          <CarouselNext className="mr-4" />
        </div>
      </Carousel>

      <div className="absolute bottom-15 flex gap-1">
       {Array.from({length:count}).map((_,idx)=>(
        <Circle key={idx} className={` ${current === idx+1? "bg-gray-300 rounded-full":"null"}`}/>
       ))}
      </div>
      </div>

    </section>
  )
}

export default Testimonials
