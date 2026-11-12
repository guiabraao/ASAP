import { useState } from 'react'
import Arrow from '../Arrow'
import { testimonials } from '../../content'
import './styles.css'
export default function Testimonials() {
  const [active, setActive] = useState(0)
  const item = testimonials[active]
  return <section className="testimonials section-space" id="clientes" aria-labelledby="clients-title"><div className="wrap testimonial-grid">
    <div className="testimonial-intro"><p className="eyebrow">Relações que fazem a diferença</p><h2 id="clients-title">Confiança que<br />se constrói junto.</h2><p>Quem está ao nosso lado<br />conta essa história.</p><div className="quote-controls"><button aria-label="Depoimento anterior" onClick={() => setActive((active + testimonials.length - 1) % testimonials.length)}><Arrow className="reverse-arrow" /></button><button aria-label="Próximo depoimento" onClick={() => setActive((active + 1) % testimonials.length)}><Arrow /></button><span>{String(active + 1).padStart(2, '0')} <span className="counter-total">/ 05</span></span></div></div>
    <div className="quote-content" aria-live="polite" aria-atomic="true"><span className="quote-mark" aria-hidden="true">“</span><figure key={active}><blockquote>{item.text}</blockquote><figcaption><span className="client-line" />{item.name}<span className="client-caption">Cliente ASAP</span></figcaption></figure></div>
  </div></section>
}
