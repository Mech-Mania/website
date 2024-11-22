import { useEffect, useState } from "react"
import "./load.css"

function Load() {
  const [title, setTitle] = useState('0px')
  var bool = true
  useEffect(()=>{
    setTimeout(function(){
      if (window.innerWidth>=768){
        setTitle(((Math.min(document.getElementById('placeholder')?.clientWidth||0, 0.5*window.innerWidth)))+'px')
      } else {
        setTitle(((Math.min(document.getElementById('placeholder')?.clientHeight||0, 0.5*window.innerHeight)))+'px')
      }
      if (bool){
        bool = false
        setTimeout(function(){
          requestAnimationFrame(sloganType)
          requestAnimationFrame(typerBlink)
        }, 500)
      }
    }, 1000)
    window.addEventListener('resize', function(){
      if (window.innerWidth>=768){
        setTitle(((Math.min(document.getElementById('placeholder')?.clientWidth||0, 0.5*window.innerWidth)))+'px')
      } else {
        setTitle(((Math.min(document.getElementById('placeholder')?.clientHeight||0, 0.5*window.innerHeight)))+'px')
      }
    });
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
      <div className="w-screen h-screen p-8 bg-black flex flex-col md:flex-row items-center justify-center">
        <img id="loaderShadow" src="mechmania.svg"></img>
        <img id="loaderImage" className="fixed brightness-0 invert-[20%] origin-right" src="mechmania.svg"></img>
        <div id="placeholder" className="pointer-events-none p-0 opacity-0 box-border overflow-hidden fixed flex flex-col items-start justify-center">
          <div className="pt-8 pl-0 md:pt-0 md:pl-24 flex flex-col items-start justify-center">
            <h1 className="w-full text-center md:text-left">MechMania</h1>
            <h2 className="w-full text-center md:text-left">Where Metal Meets Mind_</h2>
          </div>
        </div>
        <div style={{ width: window.innerWidth>=768 ? title : 'fit-content', height: window.innerWidth<768 ? title : 'fit-content' }} id="title" className="box-border overflow-hidden flex flex-row items-start justify-start">
          <div className="pt-8 pl-0 md:pt-0 md:pl-24 flex flex-col items-start justify-center">
            <h1 className="w-full text-center md:text-left">MechMania</h1>
            <h2 className="w-full text-center md:text-left">{slogan+typer}</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Load