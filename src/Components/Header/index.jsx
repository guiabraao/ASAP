import './styles.css'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import Logo from '../../assets/logo.png'
import WhiteLogo from '../../assets/whiteLogo.png'
import LogoHorizontal from '../../assets/logoHori.png'
import Banner from '../../assets/banner.png'
import Valor1 from '../../assets/img1.jpg'
import Valor2 from '../../assets/img2.jpg'
import Valor3 from '../../assets/img3.jpg'
import Menu from '../../assets/menu.svg'
import BannerMobile from '../../assets/bannerMobile.png'

export default function Header() {

    const [expanded, setExpanded] = useState(null)

    const toggleNav = () => {
        setExpanded(!expanded)
    }

    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: false
        });
    }, []);


    return (
        <>
            <header>
                <div className="headerTop" data-aos="fade-down">

                    <div className="leftHeaderTop">
                        <img src={Logo} alt="" />
                        <div className="borderHeader"></div>
                        <div className="logoHorizontal"><img src={LogoHorizontal} alt="" /></div>
                    </div>

                    <nav>
                        <ul className='header-nav-list'>
                            <a href="#empresa"><li><span>Empresa</span></li></a>
                            <a href="#servicos"><li><span>Serviços</span></li></a>
                            <a href="#clientes"><li><span>Clientes</span></li></a>
                            <a href="#contato"><li><span>Contato</span></li></a>
                        </ul>
                    </nav>

                </div>
                <div className="headerMobile">
                    <img src={Menu} alt="" onClick={toggleNav} />
                </div>
                {expanded && (
                    <div className="boxHeaderMobile" data-aos="fade-down">
                        <img src={WhiteLogo} alt="" />
                        <nav>
                            <ul className='mobile-nav-list'>
                                <a href="#empresa"><li><span>Empresa</span></li></a>
                                <a href="#servicos"><li><span>Serviços</span></li></a>
                                <a href="#clientes"><li><span>Clientes</span></li></a>
                                <a href="#contato"><li><span>Contato</span></li></a>
                            </ul>
                        </nav>
                    </div>
                )}
                <div className="bannerHeader">
                    <img src={Banner} alt="" data-aos="zoom-down" id='bannerHeaderDefault' />
                    <img src={BannerMobile} alt="" id='bannerHeaderMobile' />
                    <div className="contentBannerHeader">
                        <div className="textBannerHeader">
                            <h2 data-aos="fade-left" data-aos-delay="300">Entregando a <span className='solucao'>solução</span> correta para o seu negócio</h2>
                            <p data-aos="zoom-in" data-aos-delay="600">Nascemos para transformar a relação entre empresa e contador. Mais do que emitir guias, somos o seu braço direito em gestão financeira e planejamento tributário estratégico.</p>
                        </div>
                    </div>
                </div>
            </header>
            <div className="valores">
                <div className="containerValores">

                    <div className="boxValores">

                        <div className="valoresList">

                            <div className="valorItem" data-aos="fade-down" data-aos-delay="400">
                                <img src={Valor1} alt="" />
                                <div className="valorItemContent">
                                    <h2>Agilidade</h2>
                                    <p>Atendimento dinâmico e suporte 24 horas consultivo no tempo que o seu negócio exige. Na ASAP, a eficiência é a nossa prioridade para que você não perca tempo com burocracia.</p>
                                </div>
                            </div>
                            <div className="valorItem" data-aos="fade-down" data-aos-delay="1000">
                                <img src={Valor2} alt="" />
                                <div className="valorItemContent">
                                    <h2>Previsibilidade</h2>
                                    <p>Antecipamos cenários através de uma assessoria financeira ativa. Tenha clareza total sobre o futuro do seu caixa e tome decisões baseadas em dados reais.</p>
                                </div>
                            </div>
                            <div className="valorItem" data-aos="fade-down" data-aos-delay="1600">
                                <img src={Valor3} alt="" />
                                <div className="valorItemContent">
                                    <h2>Segurança</h2>
                                    <p>Proteção jurídica e tributária absoluta. Aplicamos inteligência fiscal para garantir que sua empresa esteja sempre em conformidade, pagando apenas o imposto justo.</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )

}