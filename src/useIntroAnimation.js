import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(SplitText, ScrollTrigger)
const SESSION_KEY = 'asap-intro-seen-v1'
const HERO_TARGETS = '.hero-wordmark, .hero-intro, .hero-meta, .hero-media picture, .hero-emblem img, .hero-service-spotlight, .hero-scroll, .header-inner'

export default function useIntroAnimation(root) {
  useLayoutEffect(() => {
    const scope = root.current
    const overlay = scope.querySelector('[data-intro]')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const replay = new URLSearchParams(window.location.search).get('intro') === 'replay'
    let seen = false
    try { seen = sessionStorage.getItem(SESSION_KEY) === '1' } catch { /* Storage can be unavailable. */ }
    if (reduced.matches || (!replay && (seen || window.location.hash))) return

    let disposed = false
    let finished = false
    let split
    let timeline
    const previousOverflow = document.body.style.overflow
    const content = [...scope.children].filter(el => el !== overlay)
    const previousInert = content.map(el => el.inert)
    const skip = overlay.querySelector('button')
    const context = gsap.context(() => {}, scope)
    function finish(persist = true) {
      if (finished) return
      finished = true
      clearTimeout(watchdog)
      timeline?.kill()
      split?.revert()
      gsap.set(scope.querySelectorAll(HERO_TARGETS), { clearProps: 'transform,opacity,visibility,clipPath' })
      overlay.style.display = 'none'
      document.body.style.overflow = previousOverflow
      content.forEach((el, i) => { el.inert = previousInert[i] })
      if (persist) { try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* Nonessential persistence. */ } }
      if (document.activeElement === skip) scope.querySelector('.skip-link')?.focus({ preventScroll: true })
      ScrollTrigger.refresh()
    }
    // Safety bound only: never a simulated progress indicator or a loading delay.
    const watchdog = window.setTimeout(finish, 5000)
    overlay.style.display = 'flex'
    document.body.style.overflow = 'hidden'
    content.forEach(el => { el.inert = true })
    skip.addEventListener('click', finish)
    reduced.addEventListener('change', finish)
    context.add(() => {
      gsap.set('.intro-brand', { yPercent: 110, scale: .96 })
      gsap.set('.intro-caption', { opacity: 0, y: 10 })
      gsap.set(HERO_TARGETS, { opacity: 0 })
    })
    const assets = [...scope.querySelectorAll('.hero-media img, .hero-wordmark, .intro-brand')]
    Promise.allSettled([document.fonts.ready, ...assets.map(img => img.decode())]).then(() => {
      if (disposed || finished) return
      try {
        context.add(() => {
          const mobile = window.matchMedia('(max-width: 600px)').matches
          split = SplitText.create('.hero-intro', { type: 'lines', mask: 'lines', linesClass: 'intro-line', aria: 'none' })
          timeline = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: finish })
            .addLabel('brand', 0)
            .addLabel('curtain', 1.15)
            .addLabel('hero', 1.45)
            .to('.intro-brand', { yPercent: 0, scale: 1, duration: .85 }, 'brand')
            .to('.intro-caption', { opacity: 1, y: 0, duration: .5 }, 'brand+=0.3')
            .to('.intro-brand-mask, .intro-caption', { y: mobile ? -24 : -45, opacity: 0, duration: .45, ease: 'power2.in' }, 'curtain')
            .to(overlay, { yPercent: -100, duration: .95, ease: 'power4.inOut' }, 'curtain')
            .fromTo('.hero-media picture', { opacity: 1, clipPath: 'inset(12% 0 0 0)' }, { opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1 }, 'hero')
            .fromTo('.hero-wordmark', { yPercent: 105, opacity: 1 }, { yPercent: 0, opacity: 1, duration: .95 }, 'hero+=0.1')
            .set('.hero-intro', { opacity: 1 }, 'hero+=0.2')
            .from(split.lines, { yPercent: 110, stagger: mobile ? .05 : .08, duration: .8 }, 'hero+=0.2')
            .fromTo('.hero-meta, .hero-service-spotlight, .hero-scroll', { opacity: 0, y: mobile ? 12 : 20 }, { opacity: 1, y: 0, stagger: .07, duration: .6 }, 'hero+=0.5')
            .fromTo('.hero-emblem img', { opacity: 0, scale: .94 }, { opacity: 1, scale: 1, duration: .8 }, 'hero+=0.35')
            .fromTo('.header-inner', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .5 }, 'hero+=0.7')
        })
      } catch { finish() }
    })
    return () => {
      disposed = true
      finish(false)
      skip.removeEventListener('click', finish)
      reduced.removeEventListener('change', finish)
      context.revert()
      overlay.style.display = 'none'
    }
  }, [root])
}
