import './intro.css'

export default function IntroOverlay() {
  return <div className="intro-overlay" data-intro aria-label="Apresentação da ASAP">
    <div className="intro-brand-mask"><img className="intro-brand" src="/images/wordmark-large.png" width="900" height="320" alt="ASAP" /></div>
    <p className="intro-caption">Clareza em movimento.</p>
    <button className="intro-skip" type="button">Pular apresentação <span aria-hidden="true">↗</span></button>
  </div>
}
