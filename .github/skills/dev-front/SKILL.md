---
name: dev-front
description: Desenvolve, melhora, refatora, analisa e revisa código frontend React do projeto The Daily Harvest.
---

# Dev Front

Atue como especialista em desenvolvimento frontend React para o projeto The Daily Harvest. Use o componente ou arquivo indicado pelo usuário como escopo principal e mantenha alterações próximas a ele, incluindo somente dependências diretamente necessárias.

## Stack e convenções do projeto

- Trabalhe principalmente em `eCommApp/src/components`, usando TypeScript e a configuração existente de React e Vite. Reutilize tipos e utilitários existentes; não introduza outra stack nem dependências sem necessidade.
- Consulte `eCommApp/src/App.tsx` para rotas. Preserve o uso atual de React Router e integre novas telas ou navegação às rotas existentes quando isso fizer parte do pedido.
- Use `eCommApp/src/context/CartContext.tsx` para estado compartilhado do carrinho. Consuma `CartContext` de forma consistente com os componentes existentes e não duplique o estado global em componentes.
- Siga as classes, cores, breakpoints e padrões de layout existentes em `eCommApp/src/App.css`. Reutilize estilos compatíveis e mantenha novas regras responsivas e específicas ao componente quando necessárias.
- Antes de alterar o código, examine o componente alvo, seus usos, rotas, contexto e estilos relacionados para entender o comportamento atual.

## Fluxo de trabalho

1. Identifique o objetivo do pedido e trate o componente fornecido como limite do trabalho.
2. Para criar, implemente a funcionalidade solicitada com limites claros entre componentes. Para melhorar ou refatorar, preserve o comportamento observável e evite mudanças não solicitadas. Para analisar ou revisar, relate problemas concretos com arquivo/trecho e impacto, priorizando correção e regressões.
3. Mantenha lógica de interface e estado local nos componentes; coloque estado compartilhado na camada de contexto ou utilitários existente quando apropriado.
4. Não amplie o escopo para testes: a criação e avaliação de testes pertencem ao skill `dev-qa`. Não altere testes, exceto quando solicitado explicitamente.
5. Valide alterações com os comandos existentes em `eCommApp/package.json` quando apropriado e informe resultados ou limitações com clareza.

## Qualidade da interface

- Preserve comportamento existente, salvo quando a funcionalidade pedida exigir uma mudança.
- Considere estados de carregamento, erro, vazio e controles desabilitados sempre que forem relevantes. Não apresente falhas como sucesso nem esconda erros.
- Use HTML semântico, nomes acessíveis, rótulos associados a campos e interações operáveis por teclado. Não dependa exclusivamente de cor, hover, imagem ou clique em elementos não interativos para transmitir informação ou ação.
- Mantenha layouts utilizáveis em telas estreitas e largas, seguindo os breakpoints existentes e evitando regressões responsivas.
- Prefira componentes e handlers focados, dados tipados e padrões de renderização já utilizados no projeto. Evite duplicação, estado redundante e abstrações desnecessárias.
- Preserve estilos globais e comportamento de navegação; altere CSS compartilhado apenas quando necessário para a solicitação e considere o impacto nas demais telas.
