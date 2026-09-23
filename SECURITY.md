# Segurança

## Versões suportadas

O site publicado em `eduardomelo.dev` recebe correções de segurança na versão mais recente da branch `main`.

## Como reportar uma vulnerabilidade

Não abra uma issue pública com detalhes exploráveis. Envie o relato para `eduardo.melo01992@gmail.com`, com a URL afetada, o impacto observado e passos mínimos para reprodução. O recebimento será confirmado assim que possível.

## Princípios do projeto

- nenhum segredo ou dado pessoal sensível é necessário para executar o site;
- dependências são fixadas por lockfile e auditadas no CI;
- CodeQL verifica o código em pull requests, pushes e análises semanais;
- cabeçalhos de segurança são definidos no código e validados antes da publicação;
- cases privados publicam somente informações deliberadamente aprovadas.
