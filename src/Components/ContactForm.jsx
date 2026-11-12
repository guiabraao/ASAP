import { useRef, useState } from 'react'
import EmailJS from '@emailjs/browser'
import Arrow from './Arrow'
import { contact } from '../content'
export default function ContactForm() {
  const [status, setStatus] = useState('idle')
  const sending = useRef(false)
  async function onSubmit(event) {
    event.preventDefault()
    if (sending.current) return
    const form = event.currentTarget
    const data = new FormData(form)
    const params = { from_name: data.get('name').trim(), email: data.get('email').trim(), message: data.get('message').trim() }
    if (!params.from_name || !params.message) { setStatus('invalid'); return }
    sending.current = true
    setStatus('sending')
    try {
      // Integração preexistente: identificadores públicos do EmailJS.
      await EmailJS.send('service_o11g70i', 'template_xg4ywsk', params, { publicKey: '2yEIfIVajKnumjGT5' })
      form.reset()
      setStatus('success')
    } catch { setStatus('error') } finally { sending.current = false }
  }
  return <form className="contact-form" onSubmit={onSubmit} aria-labelledby="form-title">
    <h3 id="form-title">Prefere deixar uma mensagem?</h3>
    <div className="form-row"><label htmlFor="contact-name">Seu nome<input id="contact-name" name="name" autoComplete="name" required maxLength="120" placeholder="Como podemos chamar você?" /></label><label htmlFor="contact-email">Seu e-mail<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength="254" placeholder="voce@empresa.com.br" /></label></div>
    <label htmlFor="contact-message">Como podemos ajudar?<textarea id="contact-message" name="message" required maxLength="5000" rows="3" placeholder="Conte um pouco sobre o seu negócio." /></label>
    <div className="form-bottom"><p>Usaremos seus dados para responder<br />à sua solicitação de contato.</p><button className="button button-light" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}<Arrow diagonal /></button></div>
    <div className="form-status" role="status" aria-live="polite">{status === 'success' && 'Mensagem enviada. Obrigado por entrar em contato com a ASAP!'}{status === 'invalid' && 'Preencha seu nome e sua mensagem antes de enviar.'}{status === 'error' && <>Não foi possível enviar agora. Tente novamente ou <a href={contact.whatsapp} target="_blank" rel="noreferrer">fale pelo WhatsApp</a>.</>}</div>
  </form>
}
