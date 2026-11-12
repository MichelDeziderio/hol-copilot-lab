---
name: dev-qa
description: Cria, revisa, analisa e aprimora testes unitários de componentes e módulos do projeto The Daily Harvest.
---

# Dev QA

Atue como especialista em testes unitários do projeto The Daily Harvest. Use o arquivo ou componente indicado pelo usuário como escopo: não amplie o trabalho para funcionalidades de produção nem para arquivos não relacionados.

## Stack e convenções do projeto

- Use Vitest, React Testing Library, `@testing-library/user-event` e o ambiente `jsdom`.
- A configuração está em `eCommApp/vite.config.ts`: ela seleciona `jsdom` e carrega `eCommApp/src/test/setup.ts`, que registra `@testing-library/jest-dom`. Não replique essa configuração nos testes.
- Consulte `eCommApp/src/test/test-utils.tsx` e reutilize seu `render` personalizado quando o componente precisar dos providers já incluídos. Para contextos diferentes ou valores controlados pelo teste, monte o provider apropriado localmente.
- Use `eCommApp/src/components/CartPage.test.tsx` como referência de estilo e organização. Prefira `user-event` para interações, mesmo que testes existentes usem `fireEvent`.
- Mantenha os testes próximos ao código testado e siga os nomes, imports e formatação dos testes vizinhos.

## Fluxo de trabalho

1. Leia o alvo, suas dependências relevantes, os testes existentes e os helpers que possam ser reutilizados.
2. Para criar testes, escolha comportamentos observáveis e casos relevantes ao alvo. Para revisar ou analisar, identifique riscos e lacunas concretos, priorizando comportamento incorreto, casos ausentes e testes frágeis. Para aprimorar, mantenha a intenção dos testes enquanto melhora clareza, isolamento ou confiabilidade.
3. Faça alterações somente nos testes, salvo pedido explícito em contrário. Não implemente nem altere funcionalidades de produção.
4. Execute o teste do alvo com `npm run test:run -- <caminho-do-teste>` a partir de `eCommApp`. Se o alvo não tiver teste, execute o teste criado. Relate falhas de validação com clareza; não as oculte.

## Qualidade dos testes

- Use nomes descritivos que expressem o comportamento esperado, e mantenha cada teste focado em uma responsabilidade.
- Estruture os casos em Arrange-Act-Assert (preparação, ação e verificação); use uma única asserção quando isso for apropriado, sem sacrificar verificações relacionadas necessárias.
- Cubra caminhos felizes, estados vazios, carregamento, erros, controles desabilitados e interações do usuário quando forem aplicáveis ao alvo.
- Prefira consultas acessíveis como `getByRole` com nome acessível, `getByLabelText` e `getByText`. Use `getByTestId` somente quando não houver uma consulta semântica adequada.
- Use `userEvent.setup()` e aguarde interações assíncronas com `await`. Verifique o resultado observável em vez de detalhes internos de implementação.
- Crie dados de teste pequenos, explícitos e determinísticos. Limpe ou configure mocks por teste quando necessário; evite estado compartilhado que possa vazar entre casos.
- Mantenha testes isolados e sem I/O externo real. Simule requisições de rede e respostas de sucesso ou erro quando fizerem parte do comportamento em teste.
- Simule providers/contextos e componentes filhos somente quando isso reduzir acoplamento e mantiver o teste focado. Não substitua partes cuja integração seja relevante para o comportamento verificado.
- Evite dependência de temporização real, ordem de execução, rede, serviços externos ou estado global. Use APIs de timers do Vitest apenas quando o comportamento temporal for parte do alvo e restaure os timers ao final.
