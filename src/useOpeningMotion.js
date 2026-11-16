import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function useOpeningMotion(root) {
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add({ desktop: '(min-width: 901px)', mobile: '(max-width: 900px)', reduced: '(prefers-reduced-motion: reduce)' }, ({ conditions }) => {
      if (conditions.reduced) return
      const context = gsap.context(() => {
        // SplitText mantém um rótulo único e legível para leitores de tela.
        gsap.utils.toArray('[data-line-reveal]', root.current).forEach(element => {
          SplitText.create(element, {
            type: 'lines', mask: 'lines', linesClass: 'opening-line', autoSplit: true,
            onSplit(split) {
              return gsap.from(split.lines, { yPercent: 105, duration: .85, stagger: .09, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 85%', once: true } })
            },
          })
        })
        SplitText.create('[data-word-reveal]', {
          type: 'words', aria: 'none',
          onSplit(split) {
            return gsap.from(split.words, { opacity: .2, stagger: .1, ease: 'none', scrollTrigger: { trigger: '.about-lead', start: 'top 88%', end: 'bottom 48%', scrub: .3 } })
          },
        })
        gsap.from('.about-divider', { scaleY: 0, transformOrigin: 'top', ease: 'none', scrollTrigger: { trigger: '.about', start: 'top 90%', end: 'top 35%', scrub: .4 } })
        gsap.from('.about-story, .about-bottom', { y: 20, opacity: 0, stagger: .12, duration: .7, scrollTrigger: { trigger: '.about-story', start: 'top 90%', once: true } })
        gsap.utils.toArray('.service-card', root.current).forEach((card, index) => {
          gsap.from(card, { y: conditions.desktop ? 45 : 20, opacity: 0, duration: .7, delay: conditions.desktop ? (index % 2) * .08 : 0, ease: 'power2.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: card, start: 'top 92%', once: true } })
        })

        if (conditions.desktop) {
          gsap.fromTo('.hero-media picture', { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: '.hero-media', start: 'top bottom', end: 'bottom top', scrub: .5 } })
          gsap.fromTo('.hero-emblem', { yPercent: 10, rotation: -5 }, { yPercent: -12, rotation: 5, ease: 'none', scrollTrigger: { trigger: '.hero-media', start: 'top bottom', end: 'bottom top', scrub: .7 } })
          const grid = root.current.querySelector('.service-grid')
          const cards = [...grid.querySelectorAll('.service-card')]
          const step = () => cards[0].offsetWidth + 20
          // O símbolo liga os espaços livres do grid, passando por trás dos serviços.
          gsap.timeline({ scrollTrigger: { trigger: grid, start: 'top 65%', end: 'bottom 65%', scrub: .7, invalidateOnRefresh: true } })
            .fromTo('.services-emblem', { x: 0, y: 0, rotation: -8 }, { x: step, y: () => cards[2].offsetTop, rotation: 8, duration: 1, ease: 'none' })
            .to('.services-emblem', { x: () => -step(), y: () => cards[4].offsetTop, rotation: 0, duration: 1, ease: 'none' })
        }
      }, root)
      return () => context.revert()
    })
    return () => media.revert()
  }, [root])
}
