import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import Testimonials from '../../Components/Motion'
import ContactForm from '../../Components/ContactForm'
import Arrow from '../../Components/Arrow'
import { contact, principles } from '../../content'
import { Hero, About, Services } from '../../Components/Opening'
import useOpeningMotion from '../../useOpeningMotion'
import useSmoothScroll from '../../useSmoothScroll'
import IntroOverlay from '../../Components/IntroOverlay'
import useIntroAnimation from '../../useIntroAnimation'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

function Principles() {
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const content = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 700px)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.principle-panel.is-active > *', { opacity: 0, y: 12, stagger: .06, duration: .4, ease: 'power2.out', clearProps: 'all' })
    }, content)
    return () => ctx.revert()
  }, [active])
  function onKey(event, index) {
    let next
    if (event.key === 'ArrowRight') next = (index + 1) % principles.length
    if (event.key === 'ArrowLeft') next = (index + principles.length - 1) % principles.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = principles.length - 1
    if (next !== undefined) { event.preventDefault(); setActive(next); tabs.current[next].focus() }
  }
  return <section className="principles section-space" aria-labelledby="principles-title"><div className="wrap">
    <div className="section-heading"><p className="eyebrow">O que move a ASAP</p><h2 id="principles-title">A mesma atenção aos números.{' '}<br />Um olhar próximo para você.</h2></div>
    <div className="principle-layout">
      <div className="principle-nav" role="tablist" aria-label="Princípios da ASAP">{principles.map((item, i) => <button key={item.title} ref={el => { tabs.current[i] = el }} role="tab" id={`principle-tab-${i}`} aria-selected={active === i} aria-controls={`principle-${i}`} tabIndex={active === i ? 0 : -1} className={active === i ? 'is-active' : ''} onClick={() => setActive(i)} onKeyDown={e => onKey(e, i)}><span>0{i + 1}</span>{item.title}<Arrow diagonal /></button>)}</div>
      <div className="principle-content" ref={content}>{principles.map((item, i) => <article key={item.title} role="tabpanel" id={`principle-${i}`} className={`principle-panel ${active === i ? 'is-active' : ''}`} aria-labelledby={`principle-tab-${i}`}><p className="principle-counter">0{i + 1} <span>/ 03</span></p><h3 id={`principle-title-${i}`}><span className="mobile-principle-title">{item.title}. </span>{item.headline}</h3><p>{item.text}</p></article>)}</div>
    </div>
  </div></section>
}

export default function Home() {
  const root = useRef(null)
  useSmoothScroll()
  useIntroAnimation(root)
  useOpeningMotion(root)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('[data-reveal]').forEach(el => {
          gsap.from(el, { opacity: 0, y: 28, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 91%', once: true } })
        })
        gsap.from('.approach-image img', { scale: 1.045, ease: 'none', scrollTrigger: { trigger: '.approach-image', start: 'top bottom', end: 'bottom top', scrub: true } })
      }, root)
      return () => ctx.revert()
    })
    let mounted = true
    document.fonts.ready.then(() => { if (mounted) ScrollTrigger.refresh() })
    return () => { mounted = false; mm.revert() }
  }, [])
  return <div ref={root} id="inicio">
    <IntroOverlay />
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo" tabIndex="-1">
      <Hero />
      <About />
      <Services />
      <Principles />
      <section className="approach" aria-labelledby="approach-title">
        <div className="approach-image"><img src="/images/attention.jpg" alt="Anotações e organização de documentos em uma mesa de trabalho" width="1200" height="800" loading="lazy" /></div>
        <div className="approach-copy" data-reveal><p className="eyebrow">Pessoas por trás dos números</p><h2 id="approach-title">Primeiro, ouvir.<br />Depois, orientar.</h2><p>Entender o seu negócio é o ponto de partida. Acreditamos em uma relação próxima, em que os números se transformam em conversas claras e decisões conscientes.</p><p>Você traz seus planos.<br />Nós ajudamos a organizar os próximos passos.</p><a className="text-link" href={contact.whatsapp} target="_blank" rel="noreferrer">Conheça nossa forma de trabalhar <Arrow diagonal /></a></div>
      </section>
      <Testimonials />
      <section className="contact section-space" id="contato" aria-labelledby="contact-title"><div className="wrap">
        <div className="contact-heading" data-reveal><p className="eyebrow">O próximo passo começa com uma conversa</p><h2 id="contact-title">Vamos olhar para{' '}<br />o futuro do seu negócio?</h2></div>
        <div className="contact-grid"><div className="contact-aside"><p>Conte com a ASAP para encontrar a orientação contábil adequada à sua empresa.</p><a className="contact-whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer"><span>Conversar com a ASAP<span className="contact-channel">Pelo WhatsApp</span></span><span className="circle-arrow"><Arrow diagonal /></span></a><a className="contact-phone" href="tel:+5531994701413">{contact.phone}</a></div><ContactForm /></div>
      </div></section>
    </main>
    <Footer />
  </div>
}
