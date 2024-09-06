"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { Draggable } from "gsap/Draggable"

gsap.registerPlugin(Draggable)

export default function Playground() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.to(".box-load", { rotation: 360 })
    gsap.to(".box-stagger", {
      duration: 2,
      rotation: 360,
      opacity: 1,
      stagger: 0.2,
      ease: "sine.out", 
      force3D: true
    })

    Draggable.create('.box-free-drag', {
      bounds: '.container',
      inertia: true,
    })

    Draggable.create('.box-x-drag', {
      type: 'x',
      bounds: '.container'
    })

    Draggable.create('.box-rotation-drag', {
      type: 'rotation',
      bounds: '.container'
    })

    const tl = gsap.timeline({ paused: true })

    tl.to('.box-timeline-0', { x: 400, duration: 1 })
    tl.to('.box-timeline-1', { x: 400, duration: 0.7 })
    tl.to('.box-timeline-2', { x: 400, duration: 1, delay: 0.5 })

    const playTimeline = () => {
      if (tl.progress() < 1) {
        tl.play()
      } else {
        tl.restart()
      }
    }

    const playTimelineButton = document.getElementById('play-timeline-button')

    playTimelineButton?.addEventListener('click', playTimeline)

    return () => {
      playTimelineButton?.removeEventListener('click', playTimeline)
    }
  }, { scope: container })

  const { contextSafe } = useGSAP({ scope: container })

  const onClickRotate = contextSafe(() => {
    gsap.to(".box-click", { rotation: "+=360" })
  })

  const onClickX = contextSafe(() => {
    gsap.to(".box-x", { x: 200, duration: 1 })
  })

  const onClickStagger = contextSafe(() => {
    gsap.to(".box-stagger", {
      duration: 0.5, 
      opacity: 0, 
      y: -100, 
      stagger: 0.1,
      ease: "back.in"
    })
  })

  return (
    <main ref={container} className="flex min-h-screen items-start flex-col p-16 gap-4">
      <div className="flex gap-4">
        <div className="box-load bg-red-400 p-4 rounded text-white">
          rotate on load
        </div>
        <div onClick={onClickRotate} className="box-click bg-blue-400 p-4 rounded text-white cursor-pointer">
          rotate on click
        </div>
        <div onClick={onClickX} className="box-x bg-green-400 p-4 rounded text-white">
          transform x on click
        </div>
      </div>

      <div>
        <h3>Stagger</h3>
        <div className="flex gap-4">
          {new Array(5).fill("").map((_, index) => (
            <div key={index} onClick={onClickStagger} className="box-stagger px-5 py-3 rounded bg-purple-400 text-white opacity-0">
              {index}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col items-start gap-4">
        <h3>Timeline</h3>
        <div className="flex flex-col gap-4">
          {new Array(3).fill("").map((_, index) => (
            <div key={index} className={`box-timeline-${index} px-5 py-3 rounded bg-orange-400 text-white`}>
              {index}
            </div>
          ))}
        </div>
        <button id="play-timeline-button" className="border border-slate-950 py-2 px-4 rounded">
          Play
        </button>
      </div>

      <div className="w-full">
        <h3>Draggable</h3>
        <div className="container w-full flex flex-col items-start gap-4 h-[300px] bg-slate-200">
          <div className="box-free-drag px-5 py-3 rounded bg-lime-400 text-white">
            free drag
          </div>
          <div className="box-x-drag px-5 py-3 rounded bg-green-400 text-white">
            x drag
          </div>
          <div className="box-rotation-drag px-5 py-3 rounded bg-emerald-400 text-white">
            rotation drag
          </div>
        </div>
      </div>
    </main>
  )
}