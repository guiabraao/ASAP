# ASAP Assessoria Contábil

Redesign da aplicação React 19 + Vite existente. Referência principal corrigida: https://sincro.es/en/ (página inicial).

## Executar

```sh
npm install
npm run dev
```

```sh
npm run lint
npm run build
npm run preview
```

## Direção visual

A abertura adapta a composição da referência à identidade original da ASAP: logotipo em grande escala, coluna de apresentação, fotografia local em preto e branco, símbolo da marca e destaque navegável dos serviços. A segunda seção usa duas colunas com separador vertical, título amplo e texto institucional. A terceira apresenta os seis serviços reais em um grid assimétrico azul.

Cores: azul-marinho `#071732`, azul institucional `#234b8c`, base clara `#fcfcfa`, cinza azulado `#edf1f5` e texto secundário `#576373`. Manrope variável hospedada localmente, com licença em `public/fonts/OFL-Manrope.txt`.

A composição foi revista antes da implementação para substituir a abertura anterior de headline e foto por uma abertura centrada na marca. A fotografia e o símbolo ocupam a largura da página; a assimetria dos serviços cria espaços para o movimento da própria marca.

## Conteúdo e arquitetura preservados

- React + Vite, sem migração. O projeto original tem uma página, sem rotas adicionais configuradas.
- História dos três sócios, seis serviços, três princípios, cinco depoimentos e âncoras `#empresa`, `#servicos`, `#clientes` e `#contato`.
- WhatsApp e Instagram publicados no site oficial.
- Integração EmailJS preexistente e seus parâmetros de template.
- Arquivos originais em `src/assets`; versões otimizadas em `public/images`.

Conteúdo em `src/content.js`. Abertura em `src/Components/Opening.jsx` e `opening.css`. Animações em `src/useOpeningMotion.js`. GSAP, ScrollTrigger e SplitText substituem AOS e Framer Motion. React Router foi removido porque não havia rotas implementadas.

A auditoria inicial identificou alturas fixas em viewport, textos acessíveis apenas por hover, campos com IDs repetidos e referência a `width` inexistente no carrossel. O redesign usa dimensões flexíveis, detalhes nativos nos serviços, navegação manual dos depoimentos e formulário com rótulos e estados acessíveis.

## Movimento

Entrada coordenada de header, marca, apresentação e fotografia. Títulos revelados por linhas com SplitText, texto institucional destacado progressivamente e símbolo conectando os espaços livres do grid durante a rolagem. No mobile não há percurso animado do símbolo nem parallax na abertura. `prefers-reduced-motion` remove as animações, preservando todo o conteúdo. Efeitos e instâncias de SplitText são revertidos ao desmontar ou mudar o breakpoint.

## Verificações

- Lint e build de produção concluídos.
- Layout em 320, 390, 768, 1024, 1440 e 1920 px, sem overflow horizontal após o ajuste de largura mínima.
- Menu mobile, Escape e retorno de foco; serviços expansíveis e abertura exclusiva; destaque navegável dos seis serviços; cinco depoimentos; princípios por setas e tecla End.
- Âncoras e imagens visíveis verificadas.
- Axe 4.11, regras WCAG 2 A/AA e 2.1 AA: nenhuma violação encontrada na sessão final limpa. Auditoria automática não substitui revisão humana de acessibilidade.
- Movimento reduzido: sem máscaras do SplitText, sem transformação animada no símbolo e sem serviços ocultos.
- Não foram coletadas métricas de campo de Core Web Vitals.

Capturas de revisão em `docs/screenshots`. Ferramentas temporárias em `.qa`, ignoradas pelo Git e pelo ESLint.

## Pontos para validação editorial

O briefing cita `instagram.com/asapcontabil/`, mas o site oficial e o código publicam `instagram.com/asap.contab/`. O link existente foi preservado. O Instagram indicado no briefing não pôde ser consultado.

As fotografias locais não têm identificação que comprove serem da equipe ASAP. Foram usadas como imagens de apoio, sem atribuição de nomes ou cargos. Não foram criadas estatísticas, datas de fundação, endereço, certificações ou resultados adicionais.

O teste do formulário retornou sucesso apesar da tentativa de interceptação da rede. Pode ter gerado um e-mail de teste com nome “Verificação local”, endereço `teste@example.com` e mensagem informando tratar-se de teste. Os testes de envio foram interrompidos. A confirmação da entrega real e o destinatário continuam sob a configuração do EmailJS existente.

## Fontes

- https://www.asapcontabil.com.br/ — história, serviços, princípios, depoimentos e contatos, confirmados no site renderizado.
- https://sincro.es/en/ — referência corrigida de composição e movimento, inspecionada em desktop e mobile. Nenhum texto ou asset da referência foi incorporado.

Trabalho realizado localmente. O site público da ASAP não foi publicado ou alterado por esta implementação.

Rolagem suave com Lenis sincronizada ao ticker do GSAP e ao ScrollTrigger. Touch permanece nativo; movimento reduzido desativa a suavização. Implementação em src/useSmoothScroll.js.
