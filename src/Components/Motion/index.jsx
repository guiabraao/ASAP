import './styles.css'
import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import Star from '../../assets/star.svg'
import AOS from 'aos'

export default function Motion() {

    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: false
        });
    }, []);


    const feedback = [
        { id: 1, nome: "SVM Ltda", texto: "Nos auxiliaram desde a abertura do CNPJ. Por sermos do ramo do marketing digital, a experiência da ASAP nesse segmento foi essencial para termos todo o apoio necessário." },
        { id: 2, nome: "Condomínio Alcindo Cobra", texto: "Graças ao método de diagnóstico do time ASAP, conseguimos encontrar uma dívida de gestões passadas e cuidar de todos os nossos débitos. Reorganizaram a contabilidade do nosso condomínio." },
        { id: 3, nome: "C&S Construções e Serviços", texto: "O suporte que tivemos com a ASAP foi essencial para refazermos o nosso planejamento tributário. Conseguimos recuperar mais de 100 mil em crédito de impostos pagos a mais." },
        { id: 4, nome: "Splendore Studio de Beleza", texto: "Foi meu primeiro suporte contábil, e fui muito bem atendidas desde o diagnóstico com o time comercial até na parte operacional." },
        { id: 5, nome: "Garden Representações LTDA", texto: "Conseguimos reduzir quase 30% da carga tributária que estávamos pagando, graças a um pequeno ajuste feito pelo time operacional da ASAP." }
    ]

    const controls = useAnimation();
    const carouselRef = useRef(null);
    const duplicateCarrosel = [...feedback, ...feedback]

    useEffect(() => {
        controls.start({
            x: ["0%", "-50%"],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: '20',
                    ease: "linear",
                }
            }
        })
    }, [controls])

    return (
        <>
            <div className="containerCarrossel" id='clientes'>
                <div className="txtMotionIntro" data-aos="fade-down">
                    <h1>Feedbacks <span className='sobrenosCarrossel'>sobre nós</span></h1>
                    <p>Conheça oque falam sobre nosso serviço na internet.</p>
                </div>

                <div className="containerMotion">
                    <motion.div className='motionFeedback' ref={carouselRef}>
                        <motion.div
                            className="innerFeedback"
                            animate={controls}
                            onDragEnd={() => {
                                controls.start({
                                    x: -width,
                                    transition: {
                                        duration: 20,
                                        ease: "linear",
                                        repeat: Infinity,
                                        repeatType: "loop",
                                    },
                                });
                            }}
                        >
                            <motion.div className="motionItemFeedback">

                                {duplicateCarrosel.map((item, id) => (

                                    <div className="cardMotion" key={id}>
                                        <div className="cardMotionTop">
                                            <h2>{item.nome}</h2>
                                            <div className="star">
                                                <img src={Star} alt="" />
                                                <p>5/5</p>
                                            </div>
                                        </div>
                                        <p>{item.texto}</p>
                                    </div>

                                ))}

                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}