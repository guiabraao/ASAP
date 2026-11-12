export default function Brand({ light = false }) {
  return <span className="brand" aria-label="ASAP Assessoria Contábil">
    <img className="brand-symbol" src={`/images/mark${light ? '-white' : ''}.png`} width="62" height="62" alt="" />
    <span className="brand-divider" />
    <img className="brand-wordmark" src={`/images/wordmark${light ? '-white' : ''}.png`} width="138" height="44" alt="" />
  </span>
}
