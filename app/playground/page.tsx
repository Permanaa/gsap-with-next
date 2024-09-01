"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

export default function Playground() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.to(".box-load", {
      rotation: 360
    })
  }, { scope: container })

  const { contextSafe } = useGSAP({ scope: container })

  const onClickRotate = contextSafe(() => {
    gsap.to(".box-click", { rotation: "+=360" })
  })

  return (
    <main ref={container} className="flex min-h-screen items-start p-24 gap-4">
      <div className="box-load bg-red-400 p-4 rounded text-white">
        rotate on load
      </div>
      <div onClick={onClickRotate} className="box-click bg-blue-400 p-4 rounded text-white cursor-pointer">
        rotate on click
      </div>
    </main>
  )
}