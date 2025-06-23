# 🛍️ DressUp E-commerce

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

Projeto de front-end desenvolvido para a disciplina de Programação Web, simulando um site de e-commerce de roupas moderno e funcional. O projeto foi construído utilizando apenas tecnologias front-end (HTML, CSS e JavaScript), com o auxílio do framework Bootstrap para garantir responsividade e componentes modernos. Toda a lógica de negócio, como autenticação de usuários e carrinho de compras, é simulada no lado do cliente através do `localStorage` e `sessionStorage`.

---

## ✨ Funcionalidades Principais

O site conta com um conjunto completo de funcionalidades que simulam uma experiência real de e-commerce:

### 👤 **Sistema de Autenticação de Usuários**
* **Página de Cadastro Completa:** Formulário com múltiplos campos e validação de dados em tempo real (campos obrigatórios, formato de CPF, confirmação de senha).
* **Página de Login:** Autenticação de usuários baseada nos dados cadastrados.
* **Persistência de Dados:** As informações de cadastro são salvas no `localStorage` do navegador, persistindo mesmo após o fechamento da aba.
* **Gerenciamento de Sessão:** O status de login do usuário é mantido através do `sessionStorage`, mantendo o usuário conectado durante a navegação entre as páginas.

### 🛒 **Sistema de E-commerce e Carrinho**
* **Listagem de Produtos:** Uma grade de produtos responsiva e visualmente agradável.
* **Filtro de Produtos por Categoria:** Botões interativos que filtram os produtos exibidos sem recarregar a página.
* **Carrinho de Compras Funcional:**
    * Usuários precisam estar logados para adicionar itens ao carrinho.
    * Feedback visual ao adicionar um item.
    * Ícone do carrinho na barra de navegação com um contador de itens.
    * Modal (pop-up) que exibe os itens do carrinho, quantidade e valor total.
* **Interface Dinâmica:** A UI se adapta ao status do usuário (ex: botão "Login" muda para "Logout", botões de compra são habilitados/desabilitados).

### 🎨 **Design e UX**
* **Responsividade Completa:** O layout se adapta perfeitamente a desktops, tablets e celulares.
* **Identidade Visual Consistente:** Paleta de cores e tipografia aplicadas de forma coesa em todas as páginas.
* **Componentes Reutilizáveis:** Uso consistente de `navbar` e `footer` em todo o site.
* **Microinterações:** Efeitos de `hover` em botões e cards para uma experiência mais agradável.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Para a estruturação semântica do conteúdo.
* **CSS3:** Para estilização customizada, layout com Flexbox e Grid.
* **JavaScript (ES6+):** Para toda a lógica de interatividade, validações, manipulação do DOM e simulação de back-end.
* **Bootstrap 5:** Framework principal para o sistema de grid, componentes responsivos (Navbar, Cards, Modal) e utilitários.
* **Bootstrap Icons:** Para iconografia utilizada na interface.
* **Boxicons:** Para os ícones na página de login.
* **ViaCEP API:** Utilizada no formulário de cadastro para preenchimento automático do endereço a partir do CEP.
* **Web Storage API:** `localStorage` e `sessionStorage` para persistência de dados no navegador.

---

## 📂 Estrutura do Projeto

O projeto está organizado da seguinte forma para facilitar a manutenção:

/
|-- index.html              # Página Inicial  
|-- PRODUTOS-MARLON.html      # Página de Produtos  
|-- SOBRE-NOS-JOAO.html     # Página Sobre Nós  
|-- TELA-LOGIN-PAULO.html   # Página de Login  
|-- CADASTRO-RICARDO.html   # Página de Cadastro  
|  
|-- /css/
|   |-- cadastro.css  
|   |-- produtos.css  
|   |-- (outros arquivos de estilo)  
|  
|-- /js/  
|   |-- auth.js             # Módulo com funções de autenticação e carrinho  
|   |-- cadastro.js         # Lógica específica da página de cadastro  
|  
|-- /imagens/  
|-- /produtos/          # Imagens dos produtos  
|-- (outras imagens)  

---

## ⚙️ Como a Lógica Interna Funciona

Como um projeto puramente front-end, a simulação de um banco de dados é feita com a Web Storage API:

* **Cadastro de Usuários:** Ao se cadastrar, um objeto de usuário é criado e adicionado a um array. Este array é então salvo como uma string JSON no `localStorage` sob a chave `'users'`.
* **Sistema de Login:** Na tela de login, o script busca o array de `'users'` do `localStorage`, procura por uma correspondência de e-mail e senha e, se encontrar, salva os dados do usuário logado no `sessionStorage` sob a chave `'loggedInUser'`.
* **Carrinho de Compras:** Os produtos adicionados ao carrinho são salvos em um array no `localStorage` sob a chave `'cart'`. Isso garante que o carrinho não se perca se o usuário recarregar a página.

---

## 🚀 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd seu-repositorio
    ```
3.  **Abra o arquivo `index.html`** diretamente no seu navegador de preferência (Google Chrome, Firefox, etc.).

    * **Dica:** Para uma melhor experiência e para evitar problemas com requisições (como a da API ViaCEP), é recomendado usar uma extensão de servidor local, como o **Live Server** do Visual Studio Code.

---

## 👥 Autores

* **Marlon** - (Função no Projeto, ex: Lógica de Produtos e Carrinho)
* **Marlon** - (Função no Projeto, ex: Página de Produtos)
* **Paulo** - (Função no Projeto, ex: Tela de Login)
* **Ricardo** - (Função no Projeto, ex: Tela de Cadastro)
* **João** - (Função no Projeto, ex: Página Sobre Nós)
