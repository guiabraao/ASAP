import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

export default function useSmoothScroll() {
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({
        lerp: .09,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -110 },
        prevent: node => Boolean(node.closest('.mobile-nav, textarea')) || document.body.style.overflow === 'hidden',
      })
      const tick = time => lenis.raf(time * 1000)
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(tick)
      return () => {
        gsap.ticker.remove(tick)
        lenis.off('scroll', ScrollTrigger.update)
        lenis.destroy()
      }
    })
    return () => media.revert()
  }, [])
}
