"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

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
      <div className="flex gap-4">
        {new Array(5).fill("").map((_, index) => (
          <div key={index} onClick={onClickStagger} className="box-stagger px-5 py-3 rounded bg-purple-400 text-white opacity-0">
            {index}
          </div>
        ))}
      </div>
    </main>
  )
}