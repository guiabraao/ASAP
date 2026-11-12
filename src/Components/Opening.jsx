import { useState } from 'react'
import Arrow from './Arrow'
import { contact, services } from '../content'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './opening.css'

export function Hero() {
  const [featured, setFeatured] = useState(0)
  const service = services[featured]

  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-masthead">
      <h1 className="hero-brand" id="hero-title"><span className="sr-only">ASAP Contábil. Clareza para seguir em frente.</span><img className="hero-wordmark" src="/images/wordmark-large.png" width="900" height="320" alt="" fetchPriority="high" /></h1>
      <div className="hero-intro-panel"><p className="hero-intro">Contabilidade clara para decisões mais seguras.</p><div className="hero-meta"><span>Assessoria contábil.<br />Parceria de verdade.</span><a href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label="Fale com a ASAP pelo WhatsApp"><Arrow diagonal /></a></div></div>
    </div>
    <div className="hero-media">
      <picture><source media="(max-width: 600px)" srcSet="/images/workspace-mobile.jpg" /><img src="/images/workspace.jpg" alt="Mesa de trabalho com anotações, documentos e computador" width="1600" height="1067" fetchPriority="high" /></picture>
      <div className="hero-emblem" aria-hidden="true"><img src="/images/mark-large.png" width="600" height="600" alt="" /></div>
      <div className="hero-service-spotlight">
        <a href="#servicos" className="spotlight-label">Soluções<Arrow diagonal /></a>
        <div className="spotlight-content" aria-live="polite" aria-atomic="true"><p className="spotlight-category">{service.category}</p><p className="spotlight-title">{service.title}</p><a href={`#service-${featured}`} onClick={() => { document.getElementById(`service-${featured}`).open = true }}>Conheça o serviço <Arrow diagonal /></a><span className="spotlight-counter">0{featured + 1} <span>/ 06</span></span></div>
        <button className="spotlight-next" aria-label="Próximo serviço em destaque" onClick={() => setFeatured((featured + 1) % services.length)}><Arrow /></button>
      </div>
      <a className="hero-scroll" href="#empresa">Continue para conhecer a ASAP <span aria-hidden="true">↓</span></a>
    </div>
  </section>
}

export function About() {
  return <section className="about" id="empresa" aria-labelledby="about-title">
    <div className="about-title-panel"><p className="eyebrow">Uma visão em comum</p><h2 id="about-title" data-line-reveal>Clareza para{' '}<br />seguir em{' '}<br />frente.</h2><p className="about-signature">Conhecimento contábil.<br />Visão de negócio.</p></div>
    <div className="about-copy-panel"><span className="about-divider" aria-hidden="true" /><p className="about-lead" data-word-reveal>Empresas precisam de pessoas que entendam de gestão, números e futuro.</p><div className="about-story"><p>A ASAP nasceu da inquietação de três sócios: a contabilidade poderia entregar mais. Mais do que emitir guias, queríamos estar próximos das decisões que fazem um negócio avançar.</p><p>Unimos planejamento tributário e organização financeira a uma assessoria consultiva. Interpretamos os números de hoje para ajudar você a enxergar os próximos passos.</p></div><div className="about-bottom"><span>Mais próximos.<br />Em cada etapa.</span><a className="editorial-button" href={contact.whatsapp} target="_blank" rel="noreferrer">Conheça nossa forma de trabalhar <Arrow diagonal /></a></div></div>
  </section>
}

export function Services() {
  return <section className="services" id="servicos" aria-labelledby="services-title"><div className="opening-wrap">
    <div className="services-heading"><div><p className="eyebrow">Nossas soluções</p><h2 id="services-title" data-line-reveal>Orientação para{' '}<br />o seu próximo passo.</h2></div><p>Da abertura da empresa às decisões<br />do dia a dia, conte com a ASAP.</p></div>
    <div className="service-grid">
      <div className="services-emblem" aria-hidden="true"><img src="/images/mark-large.png" width="600" height="600" alt="" loading="lazy" /></div>
      {services.map((service, i) => <details className={`service-card service-card-${i}`} id={`service-${i}`} key={service.title} name="asap-services" onToggle={() => ScrollTrigger.refresh()}>
        <summary><span className="service-category"><span>0{i + 1}</span>{service.category}</span><h3>{service.title}</h3><span className="service-card-link"><span className="service-label-closed">Conheça o serviço</span><span className="service-label-open">Fechar detalhes</span><span className="service-toggle" aria-hidden="true"><span /><span /></span></span></summary>
        <div className="service-detail"><p>{service.text}</p><a href={contact.whatsapp} target="_blank" rel="noreferrer">Conversar sobre este serviço <Arrow diagonal /></a></div>
      </details>)}
    </div>
    <div className="services-bottom"><span>Cada empresa tem seu momento.</span><div><p>Ao seu lado como uma parceira estratégica, com conhecimento contábil e uma visão alinhada aos seus objetivos.</p><a className="text-link" href="#contato">Vamos entender o seu negócio <Arrow diagonal /></a></div></div>
  </div></section>
}
