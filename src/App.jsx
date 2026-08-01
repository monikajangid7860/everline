import React from 'react'
import Portfolio from './Portfolio'
import Hero from './components/Hero'
import HoverServices from './components/HoverServices'
import About from './components/About'
import PastServices from './components/PastServices'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Header from './components/Header'
import CinematicStory from './components/CinematicStory'
import TravelingEditorialSection from './components/TravelingEditorialSection'
import CavityTextSection from './components/CavityTextSection'
import Thesection from './components/Thesection'
import Emergent from './components/Emergent'
function App() {
  return (
    
    <><Header/>
    <Hero/>
    <About/>
    <HoverServices/>
    {/* <CinematicStory/> */}
    {/* <Thesection/> */}
    {/* <Emergent/> */}
    <PastServices/>
    <Testimonials/>
    {/* <TravelingEditorialSection/> */}
    <CavityTextSection/>
    <Footer/>

    </>
      
  
  )
}

export default App
