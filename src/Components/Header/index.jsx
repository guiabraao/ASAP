import { useEffect, useRef, useState } from 'react'
import Brand from '../Brand'
import Arrow from '../Arrow'
import { navigation, contact } from '../../content'
import './styles.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggle = useRef(null)
  const panel = useRef(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current.querySelector('a')?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current.focus() }
      if (event.key === 'Tab') {
        const links = [...panel.current.querySelectorAll('a')]
        const first = toggle.current
        const last = links.at(-1)
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    const desktop = window.matchMedia('(min-width: 901px)')
    const onResize = () => { if (desktop.matches) setOpen(false) }
    desktop.addEventListener('change', onResize)
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', onKey); desktop.removeEventListener('change', onResize) }
  }, [open])
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-is-open' : ''}`}>
    <div className="header-inner wrap">
      <a className="brand-link" href="#inicio" aria-label="ASAP Contábil, início" onClick={() => setOpen(false)}><Brand /></a>
      <span className="header-tagline">Clareza para<br />seguir em frente.</span>
      <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <a className="header-contact" href={contact.whatsapp} target="_blank" rel="noreferrer">Vamos conversar <Arrow diagonal /></a>
      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Navegação mobile" ref={panel}>
      {[...navigation, ['Contato', '#contato']].map(([label, href], index) => <a href={href} key={href} onClick={() => setOpen(false)}><span className="mobile-nav-index">0{index + 1}</span>{label}<Arrow diagonal /></a>)}
      <a className="mobile-whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">Falar pelo WhatsApp <Arrow diagonal /></a>
    </nav>}
  </header>
}
