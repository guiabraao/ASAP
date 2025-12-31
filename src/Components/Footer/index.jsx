import './styles.css'
import WhiteLogo from '../../assets/whiteLogo.png'
import WhiteLogoHori from '../../assets/whiteLogoHori.png'
import WhiteWhats from '../../assets/whiteWhats.svg'
import WhiteInsta from '../../assets/whiteInsta.svg'

export default function Footer() {

    return (
        <>
            <footer>
                <div className="boxFooterTop">
                    <div className="logoFooter"><img src={WhiteLogo} alt="" /></div>
                    <img src={WhiteLogoHori} alt="" />
                </div>
                <nav>
                    <ul className='footer-nav-list'>
                        <a href="#empresa"><li><span>Empresa</span></li></a>
                        <a href="#servicos"><li><span>Serviços</span></li></a>
                        <a href="#clientes"><li><span>Clientes</span></li></a>
                        <a href="#contato"><li><span>Contato</span></li></a>
                    </ul>
                </nav>
                <div className="iconsFooter">
                    <a href="https://api.whatsapp.com/send/?phone=5531994701413&text&type=phone_number&app_absent=0"><img src={WhiteWhats} alt="" /></a>
                    <a href="https://www.instagram.com/asap.contab/" className='instaFooter'><img src={WhiteInsta} alt="" /></a>
                </div>

            </footer>
        </>
    )
}