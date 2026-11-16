# Intro ASAP — Clareza em movimento

Implementada na arquitetura React/Vite existente, com GSAP e SplitText já instalados. A entrada anterior foi integrada a uma única timeline; layout, conteúdo, links e formulário foram preservados.

## Direção

A referência https://two26.studio foi aberta e capturada em desktop/mobile. Foi observado um loader fullscreen claro com traço laranja e, depois, uma composição tipográfica dominante. O timing exato de toda a transição não pôde ser medido. A interpretação ASAP usa azul-marinho, marca original branca e cortina vertical, sem importar assets da referência.

Timeline após recursos essenciais prontos: marca 0–0,85s; assinatura 0,3–0,8s; saída da marca e cortina 1,15–2,1s; fotografia 1,45s; marca da hero 1,55s; texto mascarado 1,65s; apoio/CTA 1,95s; header 2,15s. Final em aproximadamente 2,8s. Mobile reduz deslocamento e stagger.

## Reprodução

`npm run dev -- --host 127.0.0.1 --port 5180`

Abra http://127.0.0.1:5180/?intro=replay para forçar a apresentação. Sem o parâmetro, ela ocorre uma vez por sessão; links com hash entram diretamente no conteúdo. Movimento reduzido ignora a abertura. O botão Pular também conclui a sequência.

## Ciclo de vida

`useIntroAnimation` controla recursos, timeline, sessão, inert, bloqueio de scroll e limpeza no unmount/StrictMode. Fontes e imagens essenciais usam promises reais, sem porcentagens simuladas. Rejeições não bloqueiam a timeline. Uma saída de segurança em cinco segundos libera o conteúdo caso os recursos ou a animação não concluam. Nenhuma biblioteca foi adicionada.

## Validação

Lint e build aprovados. Navegador validado em 375×812, 390×844, 768×1024, 1366×768, 1440×900 e 1920×1080: sem overflow horizontal; scroll e inert restaurados. Sessão subsequente, botão Pular e movimento reduzido conferidos. Sem erros de execução observados. StrictMode ativo durante os testes.

Limitações: não houve medição em aparelho físico intermediário nem benchmark comparativo de LCP. A tentativa de simular falha da fotografia por bloqueio de rede não foi conclusiva: a imagem ainda carregou. A recuperação de rejeições está implementada, mas esse cenário não foi confirmado visualmente. Navegação entre rotas não se aplica ao site atual de página única. Nenhum envio de formulário foi realizado.
