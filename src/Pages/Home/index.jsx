import './styles.css'
import { useEffect, useState } from 'react'
import Header from '../../Components/Header/index.jsx'
import Footer from '../../Components/Footer/index.jsx'
import Test from '../../assets/topo1.jpg'
import LogoVer from '../../assets/logVer.png'
import Motion from '../../Components/Motion/index.jsx'
import AOS from 'aos'
import BannerContato from '../../assets/bannerContato.jpg'
import WhiteLogo from '../../assets/whiteLogo.png'
import WhiteLogoHori from '../../assets/whiteLogoHori.png'
import WhiteWhats from '../../assets/whiteWhats.svg'
import WhiteInsta from '../../assets/whiteInsta.svg'
import Empresa1 from '../../assets/empresa1.jpg'
import Empresa2 from '../../assets/empresa2.jpg'
import Empresa3 from '../../assets/empresa3.jpg'
import Check from '../../assets/check.svg'
import Wpp from '../../assets/wpp.svg'
import MobileContato from '../../assets/contatoMobile.jpg'
import EmailJS from '@emailjs/browser'

export default function Home() {

    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: false
        });
    }, []);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mensagem, setMensagem] = useState('')

    function sendEmail(e) {
        e.preventDefault();

        if (name === '' || email === '' || mensagem === '') {
            alert('Preencha todos os campos.')
            return;
        }

        const templeteParms = {
            from_name: name,
            message: mensagem,
            email: email
        }

        EmailJS.send('service_o11g70i', 'template_xg4ywsk', templeteParms, '2yEIfIVajKnumjGT5')
            .then((response) => {
                alert('Email enviado!')
                console.log("Email enviado!", response.status, response.text)
                setName('')
                setEmail('')
                setMensagem('')
            }, (err) => {
                console.log('Erro: ', err)
            })
    }

    return (
        <>
            <Header />

            <main>
                <div className="containerSobreNos" id='empresa'>
                    <div className="boxSobreNosLeft">
                        <h2><span className='spanNos' data-aos="zoom-in-right">Empresa</span></h2>
                        <p data-aos="fade-up">A ASAP Assessoria Contábil nasceu de uma inquietação compartilhada por três sócios: o mercado contábil tradicional estava entregando apenas o básico. Percebemos que as empresas não precisavam de mais alguém para emitir guias, mas de parceiros que entendessem de gestão, números e futuro.
                            Nossa fundação é baseada na entrega de valor real. Acreditamos que o sucesso de um negócio depende de um planejamento tributário inteligente e de uma saúde financeira sólida — pilares que, muitas vezes, são deixados de lado pela contabilidade convencional.</p>

                        <p data-aos="fade-up">Mais do que o registro de fatos passados, entregamos a visão necessária para suas decisões futuras. Estamos aqui para garantir que a sua contabilidade seja o motor, e não o freio, do seu crescimento.</p>
                    </div>
                    <div className="boxSobreNosRight">
                        <div className="imgsSobreNosTop">
                            <img src={Empresa1} alt="" id='img1' data-aos="fade-up" data-aos-delay="400" />
                            <img src={Empresa2} alt="" id='img2' data-aos="fade-up" data-aos-delay="800" />
                        </div>
                        <div className="imgsSobreNosBottom">
                            <img src={Empresa3} alt="" id='img3' data-aos="fade-up" data-aos-delay="1200" />
                            <img src={Test} alt="" id='img4' data-aos="fade-up" data-aos-delay="1600" />
                        </div>
                    </div>
                    <div className="imgLogoVert">
                        <img src={LogoVer} alt="" data-aos="zoom-in" />
                    </div>
                </div>

                <div className="containerVantagens" id='servicos'>
                    <div className="boxVantagens">
                        <div className="logoVantagens"><img src={WhiteLogoHori} alt="" data-aos="fade-right" /></div>
                        <div className="vantagensList">
                            <div className="itemVantagens" data-aos="fade-down" data-aos-delay="200">
                                <img src={Check} alt="" />
                                <div className="vantegensText">
                                    <h2>Abertura e Regularização de CNPJ</h2>
                                    <p>Legalizamos sua empresa com agilidade, escolhendo a melhor estrutura jurídica e o regime tributário mais econômico desde o primeiro dia.</p>
                                </div>
                            </div>
                            <div className="itemVantagens" data-aos="fade-down" data-aos-delay="400">
                                <img src={Check} alt="" />
                                <div className="vantegensText">
                                    <h2>Planejamento Tributário Estratégico</h2>
                                    <p>Analisamos minuciosamente sua operação para reduzir a carga de impostos legalmente, transformando custos em economia real para o seu caixa.</p>
                                </div>
                            </div>
                            <div className="itemVantagens" data-aos="fade-down" data-aos-delay="600">
                                <img src={Check} alt="" />
                                <div className="vantegensText">
                                    <h2>BPO Financeiro e Gestão de Caixa</h2>
                                    <p>Assumimos o operacional do seu financeiro, entregando contas a pagar/receber e relatórios de fluxo de caixa para você focar apenas em crescer.</p>
                                </div>
                            </div>
                            <div className="itemVantagens" data-aos="fade-down" data-aos-delay="800">
                                <img src={Check} alt="" />
                                <div className="vantegensText">
                                    <h2>Assessoria Contábil Consultiva</h2>
                                    <p>Muito além do balanço: interpretamos seus números para oferecer insights estratégicos que auxiliam na tomada de decisões importantes.</p>
                                </div>
                            </div>
                            <div className="itemVantagens" data-aos="fade-down" data-aos-delay="1000">
                                <img src={Check} alt="" />
                                <div className="vantegensText">
                                    <h2>Gestão de Folha de Pagamento e RH</h2>
                                    <p>Garantimos total conformidade com a legislação trabalhista e previdenciária, trazendo segurança para sua relação com colaboradores.</p>
                                </div>
                            </div>
                            <div className="itemVantagens" data-aos="fade-down" data-aos-delay="1200">
                                <img src={Check} alt="" />
                                <div className="vantegensText">
                                    <h2>Diagnóstico e Recuperação Fiscal</h2>
                                    <p>Revisamos seu histórico em busca de tributos pagos a maior ou créditos não aproveitados, injetando fôlego financeiro no seu negócio.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Motion />

                <div className="cotainerContato" id='contato'>
                    <img src={BannerContato} alt="" id='bannerContatoDefault' />
                    <img src={MobileContato} alt="" id='bannerContatoMobile' />
                    <div className="contatoContent">
                        <div className="boxContatoLeft">
                            <img src={WhiteLogo} alt="" data-aos="fade-down"/>
                            <div className="boxIconsContato">
                                <h3 data-aos="zoom-in">Visite todas nossas redes socias!</h3>
                                <div className="iconsRow" data-aos="fade-up">
                                    <a href="https://api.whatsapp.com/send/?phone=5531994701413&text&type=phone_number&app_absent=0">
                                        <div className="boxIcon">
                                            <img src={WhiteWhats} alt="" />
                                            <p>WhatsApp</p>
                                        </div>
                                    </a>
                                    <a href="https://www.instagram.com/asap.contab/">
                                        <div className="boxIcon">
                                            <img src={WhiteInsta} alt="" />
                                            <p>Instagram</p>
                                        </div>
                                    </a>
                                </div>

                            </div>
                        </div>
                        <div className="contatoForm">
                            <h2 data-aos="fade-left">Entre em contato com nosso time!</h2>
                            <form action="submit" onSubmit={sendEmail}>
                                <div className="whiteLogoContato"><img src={WhiteLogoHori} alt="" data-aos="zoom-in" /></div>
                                <input
                                    type="text"
                                    name='nome'
                                    placeholder='Nome'
                                    id='inputContact'
                                    onChange={(e) => { setName(e.target.value) }}
                                    value={name}
                                    data-aos="fade-down"
                                    data-aos-delay="600"
                                />
                                <input
                                    type="email"
                                    name='email'
                                    placeholder='Email'
                                    id='inputContact'
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    value={email}
                                    data-aos="fade-down"
                                    data-aos-delay="800"
                                />
                                <textarea
                                    name="mensagem"
                                    id="mensagem"
                                    cols="30"
                                    rows="10"
                                    onChange={(e) => { setMensagem(e.target.value) }}
                                    placeholder='Mensagem...'
                                    value={mensagem}
                                    data-aos="fade-down"
                                    data-aos-delay="1000"
                                ></textarea>

                                <button type='submit' data-aos="fade-down" data-aos-delay="800">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="boxWppIcon">
                    <a href="https://api.whatsapp.com/send/?phone=5531994701413&text&type=phone_number&app_absent=0">
                        <div className="wppIcon">
                            <img src={Wpp} alt="" />
                        </div>
                    </a>
                </div>
            </main>

            <Footer />
        </>
    )

}