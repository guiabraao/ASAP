import Brand from '../Brand'
import Arrow from '../Arrow'
import { contact, navigation } from '../../content'
import './styles.css'
export default function Footer() {
  return <footer className="site-footer"><div className="wrap">
    <div className="footer-top">
      <div><a href="#inicio" aria-label="ASAP Contábil, voltar ao início"><Brand light /></a><p>Conhecimento contábil.<br />Parceria de verdade.</p></div>
      <nav aria-label="Navegação do rodapé"><span className="footer-label">Explore</span>{[...navigation, ['Contato', '#contato']].map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="footer-connect"><span className="footer-label">Perto de você</span><a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp <Arrow diagonal /></a><a href={contact.instagram} target="_blank" rel="noreferrer">Instagram <Arrow diagonal /></a><span className="footer-phone">{contact.phone}</span></div>
      <a className="back-top" href="#inicio">Voltar ao topo <Arrow diagonal /></a>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} ASAP Assessoria Contábil</span><span>Clareza para seguir em frente.</span></div>
  </div></footer>
}
