# Portfólio — Eduardo Melo

Portfólio profissional de [Eduardo Melo](https://github.com/asmeduardo), Engenheiro de Software com foco em Java, Spring Boot, APIs REST e React. O projeto apresenta experiências e cases por meio de fatos verificáveis, sem expor código, dados ou estratégias de produtos privados.

## Objetivo

O site foi construído para permitir que recrutadores e equipes técnicas compreendam rapidamente:

- os problemas que Eduardo ajudou a resolver;
- as decisões tomadas durante cada projeto;
- os resultados sustentados por evidências;
- a disciplina de engenharia aplicada ao próprio portfólio.

## Stack

- Next.js com App Router e React;
- TypeScript em modo estrito;
- Tailwind CSS;
- Zod para validar o conteúdo estruturado;
- Vitest para testes unitários;
- Playwright e axe-core para fluxos ponta a ponta e acessibilidade;
- GitHub Actions para CI e CodeQL;
- Netlify para previews e produção.

## Desenvolvimento local

Requisitos: Node.js 22 e npm.

```bash
npm ci
npm run dev
```

O site estará disponível em `http://localhost:3000`.

## Qualidade

```bash
npm run check
npx playwright install chromium
npm run test:e2e
```

`npm run check` valida formatação, ESLint, TypeScript, testes unitários e build de produção. Os testes de navegador cobrem os layouts mobile e desktop, acessibilidade automatizada, navegação, página 404 e disponibilidade do currículo.

## CI/CD e branches

O projeto usa uma estratégia trunk-based:

- `main` permanece publicável e será protegida;
- mudanças usam branches curtas e pull requests;
- o CI executa auditoria de dependências, verificações estáticas, testes e build;
- o CodeQL executa SAST em pushes, pull requests e semanalmente;
- o Netlify cria previews e só publica uma versão cujo próprio build execute o gate `npm run check`.

## Segurança e privacidade

O site não possui banco de dados, autenticação, formulário ou scripts de rastreamento. Nenhum segredo é necessário para o build. Projetos privados são descritos em alto nível e métricas só entram no conteúdo quando existe uma fonte verificável.

Consulte [SECURITY.md](SECURITY.md) para reportar vulnerabilidades.

## Licença e template

A estrutura visual partiu do template público Magic UI Portfolio. A atribuição e a licença MIT estão registradas em [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) e [LICENSE](LICENSE).
