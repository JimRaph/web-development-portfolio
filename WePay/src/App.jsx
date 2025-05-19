
import './App.css'
import { About, Benefits, CTA, Faqs, Footer, Header, Hero, Integrations, Pricing, Testimonials } from './exports'

function App() {


  return (
   <div className="h-screen font-[inter] overflow-x-hidden bg-[#07090F]">
    <Header />
    <Hero />
    <About />
    <Benefits />
    <Pricing />
    <Integrations />
    <Testimonials />
    <Faqs />
    <CTA />
   <Footer />

   </div>

  )
}

export default App
