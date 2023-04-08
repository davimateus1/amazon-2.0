# Amazon 2.0

## Descrição
O Amazon 2.0 é um projeto de clone do famoso e-commerce Amazon, desenvolvido para fins de estudo e prática de tecnologias web. O projeto foi criado com Next.js, um framework React para construção de aplicações server-side rendering e static site generation, e utiliza uma série de tecnologias populares, tais como:

- [Next.js](https://nextjs.org/docs): Framework de desenvolvimento web React com recursos avançados, como renderização do lado do servidor, geração estática de páginas e suporte a APIs.
- [Redux](https://redux.js.org/): Biblioteca de gerenciamento de estado para aplicações JavaScript.
- [Firebase](https://firebase.google.com/docs): Plataforma de desenvolvimento de aplicativos web e móveis do Google, que oferece recursos como autenticação, banco de dados em tempo real, armazenamento em nuvem e muito mais.
- [Axios](https://axios-http.com/docs/req_config): Biblioteca de cliente HTTP para fazer requisições a APIs.
- [Cloud-firestore](https://firebase.google.com/docs/firestore): Banco de dados NoSQL oferecido pelo Firebase, que permite armazenar e sincronizar dados em tempo real na nuvem.
- [Nextauth](https://next-auth.js.org/): Biblioteca de autenticação para Next.js, que oferece recursos como autenticação social, JWT, e muito mais.
- [Tailwind-css](https://tailwindcss.com/docs): Framework de design de interface de usuário baseado em classes para desenvolvimento rápido de interfaces modernas e responsivas.
- [Stripe-payment](https://stripe.com/docs): Integração com o serviço de pagamentos Stripe para processamento de transações financeiras.
- [Facebook-authentication](https://firebase.google.com/docs/auth/web/facebook-login): Autenticação de usuário com o Facebook usando o Firebase.
- [Google-authentication](https://firebase.google.com/docs/auth/web/google-signin): Autenticação de usuário com o Google usando o Firebase.
- [Moment.js](https://momentjs.com/docs/): Biblioteca de manipulação de datas e horas em JavaScript.
- [Prettier-eslint](https://prettier.io/docs/en/index.html): Ferramenta para formatar o código e garantir um estilo de codificação consistente.
- [Webhooks](https://stripe.com/docs/webhooks): Mecanismo para receber notificações em tempo real de eventos externos.
- [Micro](https://github.com/zeit/micro): Biblioteca para criação de serviços HTTP mínimos e leves em Node.js.
- [Firebase-admin](https://firebase.google.com/docs/admin/setup): Biblioteca para acesso ao Firebase a partir do servidor, permitindo ações administrativas.
- [React-responsive-carousel](https://www.npmjs.com/package/react-responsive-carousel): Componente de carrossel responsivo para React, utilizado para exibição de imagens e conteúdos em formato de slide.


## Funcionalidades
- Página inicial exibindo os produtos em destaque, com possibilidade de busca por nome.
- Carrinho de compras, onde é possível adicionar e remover produtos, atualizar quantidades e visualizar o total da compra.
- Sessão de pedidos, onde é possível ver todos os pedidos feitos que são listados diretamente do Cloud Firestore e fazer a busca por Order ID.
- Páginas de tratamento de erros (404) para melhor guiar o usuário na sua navegação pelo site.
- Autenticação de usuário, com suporte para autenticação com Facebook e Google.
- Processamento de pagamento utilizando o Stripe Payment, com fluxo completo de checkout.
- Integração com o Firebase para autenticação de usuários e armazenamento de dados.
- Uso de Redux para gerenciamento global do estado da aplicação, com uso do Redux Toolkit para facilitar a estruturação e configuração do Redux.
- Implementação de webhooks para receber notificações de eventos no Stripe, como confirmação de pagamento e atualização de status de pedidos e ao mesmo tempo atualizar o Cloud Firestore.
- SEO básico: Implementação de técnicas básicas de otimização para mecanismos de busca, como uso de meta tags, títulos e descrições relevantes, URLs amigáveis, entre outros.
- Estilização da aplicação com o uso do Tailwind CSS, com design responsivo utilizando o React Responsive Carousel e Heroicons-React para ícones.
- Configuração de linting e formatação de código utilizando o Prettier e Eslint para manter um código limpo e padronizado.

## Como rodar o projeto
1. Clone o repositório para sua máquina local.
2. Certifique-se de ter o Node.js e o NPM instalados em sua máquina.
3. Crie uma nova aplicação no Firebase e configure as chaves de API e autenticação de acordo com as documentações do Firebase e do Stripe.
4. No diretório do projeto, altere o arquivo `.env.example` para `.env.local` e adicione suas credenciais
5. Execute `yarn` para instalar as dependências do projeto.
6. Execute `yarn dev` para iniciar o servidor de desenvolvimento do Next.js.
7. Acesse `http://localhost:3000` em seu navegador para visualizar a aplicação.

## Desenvolvedor do Projeto

### Davi Mateus

- Email: [davimateusga@gmail.com](mailto:davimateusga@gmail.com)
- LinkedIn: [https://www.linkedin.com/in/davimateusg/](https://www.linkedin.com/in/davimateusg/)

Como desenvolvedor principal do projeto Amazon 2.0, me comprometi em criar um clone da Amazon para estudo utilizando as tecnologias listadas acima, espero que este projeto seja útil para aprendizado e contribua para a comunidade!

