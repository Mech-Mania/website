import { useEffect, useState } from "react"
import "./load.css"
import clsx from "clsx";


function Load() {
  var bool = true
  const [animateClass, setAnimateClass] = useState("");

  useEffect(()=>{
    setTimeout(function(){
      if (bool){
        bool = false
        if (window.innerWidth >= 1024) {
          setAnimateClass("animate-slide-right");
        } else {
          setAnimateClass("animate-slide-down");
        }
        setTimeout(function(){
          requestAnimationFrame(sloganType)
          requestAnimationFrame(typerBlink)
        }, 500)
      }
    }, 1000)
  }, [])

  const [slogan, setSlogan] = useState('')
  const [typer, setTyper] = useState('_')
  const sentence = 'Where Metal Meets Mind'
  var ind = 0
  var typeState = true
  const sloganType = () => {
    if (ind>=sentence.length){
      return
    }
    setSlogan(prev => prev+sentence[ind])
    setTimeout(function(){
      ind+=1
      requestAnimationFrame(sloganType)
    }, 40)
  }
  const typerBlink = () => {
    if (typeState){
      setTyper(' ')
      setTimeout(function(){
        typeState = false
        requestAnimationFrame(typerBlink)
      }, 500)
      return
    } else {
      setTyper('_')
      setTimeout(function(){
        typeState = true
        requestAnimationFrame(typerBlink)
      }, 500)
      return
    }
  }

  return (
    <>
      <div className="w-screen h-screen bg-black top-0 left-0 z-[100] flex flex-col lg:flex-row items-center justify-center">
        <img id="loaderShadow" className="" src="/mechmania.svg"></img>
        <img id="loaderImage" className="absolute brightness-0 invert-[20%] origin-right" src="/mechmania.svg"></img>
        <div className={clsx("max-h-0 max-w-0 box-border w-fit overflow-hidden flex flex-row items-start justify-start", animateClass)}>
          <div className="pt-8 pl-0 lg:pt-0 lg:pl-16 lg:w-auto flex flex-col items-start justify-center">
            <p className="w-full text-center lg:text-left">2026 - May 8th - UW @ Robohub</p>
            <h1 className="w-full text-center lg:text-left">MechMania</h1>
            <h2 className="w-full text-center lg:text-left">{slogan+typer}</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Load
