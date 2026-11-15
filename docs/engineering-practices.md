# Qualidade e operação do portfólio

## Construção

Preserve a arquitetura Next.js App Router. Use tipos strict, componentes de
servidor quando apropriado e componentes de cliente apenas para interações.
Mantenha navegação semântica, foco, contraste, teclado e redução de movimento.
Não exponha serviços privados como projetos públicos nem publique resultados
de demonstração como evidência de resultados reais.

## Testes e TDD

Escreva o contrato e o teste antes de alterar comportamento. Cada bug deve ter
regressão que falhe no cenário original e passe após a correção. Falha de
ambiente não comprova um defeito de produto. Corrija código quando um teste
correto falhar; só altere expectativas antigas com mudança de contrato justificada.

Use testes de unidade para dados, transformações e configuração. Use E2E em
celular e desktop para navegação, conteúdo, acessibilidade, imagens, documentos,
movimento reduzido e layout. Use os testes de infraestrutura para verificar
o Compose real, usuário não root, bind em loopback, recursos e rede dedicada.

`npm run verify` executa formatação, lint, tipos, unidade, build, isolamento e
E2E. Rode o gate completo ao final do lote. Examine warnings, exceções e falhas
silenciosas. Registre aprovado, falhou, bloqueado e não executado com evidência
da revisão candidata; não invente cobertura ou garantia de funcionamento total.

## Hospedagem

A imagem Linux contém o runtime standalone e seus assets, conforme a
documentação do Next.js. A produção usa o Compose de `ops/compose.yaml`,
um usuário não root, filesystem somente leitura, cache temporário limitado,
CPU e memória limitadas e rede própria. Somente o proxy do host alcança a
porta em loopback. O portfólio não recebe credenciais nem acesso ao banco do bot
ou ao Vigoru.

Antes da publicação, valide o runtime Linux, os cabeçalhos HTTP, o certificado
TLS, o redirecionamento de www, o sitemap, o robots e os assets. Registre os
hashes dos artefatos e preserve a imagem anterior para reversão. DNS e deploy
são alterações externas e dependem de autorização da ação em andamento.

## Referências oficiais

- https://nextjs.org/docs/app/api-reference/config/next-config-js/output
- https://playwright.dev/docs/best-practices
- https://docs.docker.com/engine/containers/resource_constraints/
- https://docs.docker.com/reference/compose-file/services/

## Build isolado

Use portfoliobuild.slice para compilar, separado de portfolio.slice.
No systemd, nomes com hifen criam uma hierarquia e herdam limites do pai.
O build possui teto de 1792 MiB e 50% de uma CPU; o runtime continua em
384 MiB e 20% de uma CPU. Nao use portfolio-build.slice, filho do runtime.
Valide Slice=-.slice no host antes de compilar.

Referencia: https://www.freedesktop.org/software/systemd/man/257/systemd.slice.html
