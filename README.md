![capa projeto](delivery.png)

## Descrição do projeto

O **Paraíso da Gastronomia** é um site de delivery especializado em marmitex, oferecendo refeições caseiras, frescas e saborosas para seus clientes. Este projeto visa criar uma plataforma online onde os usuários possam visualizar o cardápio, fazer pedidos personalizados e realizar pagamentos de forma segura e prática.

## Indice

- [Funcionalidades](#funcionalidades)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Acompanhe o desenvolvimento do projeto](#acompanhe-o-desenvolvimento-do-projeto)
- [Descrição das etapas](#descrição-das-etapas)
  - [Requisitos e Funcionalidades](#1---requisitos-e-funcionalidades)
    - [Gestão de Pedidos](#11-gestão-de-pedidos)
    - [Geolocalização (Talvez)](#2-geolocalização-talvez)
    - [Integração com Pagamento](#3-integração-com-pagamento)
    - [Notificações e Suporte](#4-notificações-e-suporte)
    - [Gestão de pedidos (adm e funcionários)](#12-gestão-de-pedidos-adm-e-funcionarios)
  - [Cadastro de Clientes](#13-cadastro-de-clientes)
  - [Avaliações e Comentários dos Clientes](#14-avaliações-e-comentários-dos-clientes)
  - [Tecnologias e Ferramentas](#2---tecnologias-e-ferramentas)
  - [Criar o Design e Layout](#3---criar-o-design-e-layout)
  - [Configurar Ambiente de Desenvolvimento](#4---configurar-ambiente-de-desenvolvimento)
  - [Desenvolver a Estrutura do Site](#5---desenvolver-a-estrutura-do-site)
  - [Implementar Funcionalidades de Menu e Pedido](#6---implementar-funcionalidades-de-menu-e-pedido)
  - [Integrar Sistema de Pagamento](#7---integrar-sistema-de-pagamento)
  - [Desenvolver o Back-end e Banco de Dados](#8---desenvolver-o-back-end-e-banco-de-dados)
  - [Testar Funcionalidades e Responsividade](#9---testar-funcionalidades-e-responsividade)
  - [Implementar Medidas de Segurança](#10---implementar-medidas-de-segurança)
  - [Realizar Testes Finais e Correções](#11---realizar-testes-finais-e-correções)
  - [Deploy do Site](#12---deploy-do-site)
  - [Monitorar e Manter o Site](#13---monitorar-e-manter-o-site)

## Funcionalidades

- **Visualização do Cardárpio**: Apresentação detalhada dos pratos oferecidos, com descrições, fotos e preços.
- **Sistema de Pedido**: Opção para personalizar marmitex com diferentes combinações de pratos.
- **Sistema de Pagamento Integrado**: Métodos de pagamento seguros, incluindo cartão de crédito, débito e Pix.
- **Painel de Administração**: Ferramenta para que os administradores do site possam gerenciar os pedidos, atualizar o cardápio e visualizar relatórios.
- **Notificação de Confirmação**: Envio de notificações aos clientes sobre o status do pedido, incluindo confirmações e tempo estimado de entrega.
- **Responsividade**: Envio de notificações aos clientes sobre o status do pedido, incluindo confirmações e tempo estimado de entrega.

## Tecnologias utilizadas

- **Front-end**: React.js para criação da interface do usuário, garantindo uma experiência fluida e interativa.
- **Back-end**: Node.js e Express para gerenciamento do servidor e APIs.
- **Banco de Dados**: MongoDB para armazenamento de dados de clientes, pedidos e produtos.
- **Sistema de Autenticação**: JWT para autenticação segura dos usuários.
- **Integração de Pagamentos**: Stripe ou PayPal para processamento de pagamentos.
- **Hospedagem**: Vercel ou Netlify para deploy do front-end, e Heroku para o back-end.
- **Ferramentas de Desenvolvimento**: Figma para design de interfaces, Postman para testes de APIs, e Git/GitHub para controle de versão.

## Acompanhe o desenvolvimento do projeto

- [x] Definir Requisitos e Funcionalidades
- [x] Escolher Tecnologias e Ferramentas
- [x] Criar o Design e Layout
- [x] Configurar Ambiente de Desenvolvimento
- [x] Desenvolver a Estrutura do Site
- [x] Implementar Funcionalidades de Menu e Pedido
- [ ] Integrar Sistema de Pagamento
- [ ] Desenvolver o Back-end e Banco de Dados
- [x] Testar Funcionalidades e Responsividade
- [x] Implementar Medidas de Segurança
- [x] Realizar Testes Finais e Correções

# Descrição das etapas

## 1 - Requisitos e Funcionalidades

### 1.1 Gestão de Pedidos:

Implementar um sistema para receber, rastrear e gerenciar pedidos de clientes.

#### 1. Recebimento de Pedidos:

- **Formulário de Pedido**: Criar um formulário onde os clientes possam selecionar itens do menu, adicionar opções personalizadas (se necessário) e fornecer informações básicas como nome, endereço e número de telefone.
- **Confirmação de Pedido**: Mostrar uma página de confirmação com um resumo do pedido e um número de referência, e envie um e-mail ou SMS de confirmação para o cliente.
  Rastreamento de Pedidos:
- **Status do Pedido**: Adicionar um sistema de status que possa ser atualizado conforme o pedido avança. Status típicos incluem "Recebido", "Preparando", "Em Rota" e "Entregue".
  Atualizações Automáticas: Envie atualizações automáticas por e-mail ou SMS quando o status do pedido mudar, para que os clientes saibam onde está o pedido.
  Gerenciamento de Pedidos:
- **Painel Administrativo**: Crie um painel para que os administradores (ou funcionários) possam ver todos os pedidos, filtrar por status e atualizar o status dos pedidos manualmente.
- **Detalhes do Pedido**: Permita que os administradores visualizem os detalhes de cada pedido, incluindo itens, quantidades, endereço de entrega e informações do cliente.
- **Histórico de Pedidos**: Mantenha um histórico dos pedidos para referência futura e análise.

#### 2. Geolocalização (Talvez).

- **Mapa de Entrega**: Se for possível, integre uma funcionalidade de mapa para mostrar ao cliente a localização do entregador em tempo real.
- **Estimativa de Tempo**: Ofereça uma estimativa de tempo de entrega com base na localização do cliente e no trânsito atual, se disponível.

#### 3. Integração com Pagamento:

- **Processamento de Pagamento:** Se possível, integre um sistema de pagamento online para que os clientes possam pagar ao fazer o pedido, reduzindo o trabalho para você e acelerando o processo.

#### 4. Notificações e Suporte:

- **Notificações para Clientes:** Configure notificações para confirmar recebimento, informar sobre o andamento e notificar a entrega.
- **Suporte ao Cliente:** Inclua uma maneira fácil para os clientes entrarem em contato com você para resolver problemas ou fazer alterações no pedido.

---

### 1.2 Gestão de pedidos (adm e funcionarios):

Desenvolver um sistema web para a gestão de pedidos, acessível para administradores e funcionários.

#### 1. Painel de Controle para Administradores

- **Visão Geral dos Pedidos**: Resumo básico dos pedidos atuais, como pedidos em aberto, concluídos e cancelados.
- **Notificações em Tempo Real** Alertas básicos para novos pedidos e alterações de status.

#### 2. Gestão de Pedidos

- **Visualização de Detalhes do Pedido:** Exibição dos detalhes do pedido, incluindo itens, endereço e método de pagamento.
- **Atualização do Status do Pedido:** Alterar o status do pedido conforme necessário (ex: em preparo, pronto para entrega, entregue).
- **Histórico de Pedidos:** Acesso simples ao histórico de pedidos, com consulta por cliente ou data.

#### 3. Controle de Tempo e Prioridade

- **Tempo Estimado de Preparação e Entrega:** Aproximar o tempo de preparo e entrega para ajudar a manter os prazos.
- **Priorização de Pedidos:** Ajustar a ordem de preparo, se necessário, para pedidos urgentes.

#### 4. Gestão de Entregas

- **Atribuição de Entregadores:** Associar pedidos a entregadores disponíveis manualmente.
- **Rastreamento de Entregas:** Permitir acompanhamento básico da localização dos entregadores.
- **Confirmação de Entrega:** Atualizar o status quando o pedido for entregue.

#### 5. Gestão de Estoque e Disponibilidade

- **Atualização de Disponibilidade de Itens:** Atualizar rapidamente a disponibilidade de produtos para evitar pedidos de itens esgotados.

#### 6. Gerenciamento de Pagamentos

- **Monitoramento de Pagamentos:** Exibir detalhes básicos de pagamento (online ou na entrega).

#### 7. Gestão de Cancelamentos e Reembolsos

- **Solicitação de Cancelamento:** Gerenciar solicitações de cancelamento com aprovação ou rejeição.
- **Política de Reembolso:** Processar reembolsos para pedidos cancelados.
- **Gestão de Finanças:** Criar um módulo para controle financeiro, incluindo receita, despesas e relatórios financeiros.

#### 8. Suporte ao Cliente e Feedback

- **Chat com Clientes:** Comunicação direta para resolver dúvidas e problemas.
- **Recebimento de Feedback:** Coletar avaliações e sugestões para melhorias.

#### 9. Configurações de Operação

- **Horários de Funcionamento:** Ajustar horários de funcionamento do delivery.
- **Zonas de Entrega e Taxas:** Configurar áreas de entrega e suas taxas básicas.

#### 10. Integrações

- **Integração com Sistemas de Pagamento:** Suporte a plataformas de pagamento comuns (cartões, PIX).
  ***

### 1.3 Cadastro de Clientes:

Implementar funcionalidades para registro e gerenciamento de contas de clientes.

---

### 1.4 Avaliações e comentários dos clientes:

- Ofertas e promoções especiais
- Newsletter para atualizações e promoções

---

### 2 - Tecnologias e Ferramentas

- NodeJs, React, react-notistack, Firebase, vercel, mongoDB\*\*

---

### 3 - Criar o Design e Layout

- Desenvolver o design do site e definir a aparência visual

---

### 4 - Configurar Ambiente de Desenvolvimento

- Preparar ambiente de desenvolvimento com todas as ferramentas necessárias.

---

### 5 - Desenvolver a Estrutura do Site

- Comecar a codificar a estrutura básica do site, incluindo o layout e a navegação.

---

### 6 - Implementar Funcionalidades de Menu e Pedido

- Adicionar funcionalidades específicas, como a visualização do menu e a capacidade de fazer pedidos.

---

### 7 - Integrar Sistema de Pagamento

- Configurar e integrar o sistema de pagamento para permitir transações seguras.

---

### 8 - Desenvolver o Back-end e Banco de Dados

- Desenvolver o back-end para gerenciar dados e pedidos, e configure o banco de dados.

---

### 9 - Testar Funcionalidades e Responsividade

- Testar o site para garantir que todas as funcionalidades estão funcionando corretamente e que o site é responsivo.

---

### 10 - Implementar Medidas de Segurança

- Adicionar medidas de segurança para proteger dados e transações.

---

### 11 - Realizar Testes Finais e Correções

- Realizar testes finais e faça correções com base nos resultados dos testes.

---

### 12 - Deploy do Site

- Publicar o site em um servidor para torná-lo acessível ao público.

---

### 13 - Monitorar e Manter o Site

- Monitorar o desempenho do site e faça manutenção contínua para garantir que ele funcione corretamente.
