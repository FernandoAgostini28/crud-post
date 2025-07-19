# CRUD de Posts com Angular

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-F8BBD0?style=for-the-badge&logo=angular&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

Um projeto de exemplo que demonstra um CRUD (Create, Read, Update, Delete) completo de posts, construído com as versões mais recentes do Angular e Angular Material.

## ✨ Funcionalidades

- **Listagem de Posts**: Visualização dos posts com scroll infinito.
- **Criação de Posts**: Formulário para adicionar novos posts.
- **Edição de Posts**: Formulário para atualizar posts existentes.
- **Exclusão de Posts**: Funcionalidade para remover posts.
- **Recorte de Imagem**: Utiliza a biblioteca `ngx-image-cropper` para recortar a imagem do post antes do upload.
- **Scroll Infinito**: Carrega mais posts conforme o usuário rola a página, utilizando `ngx-infinite-scroll`.
- **Backend Simulado**: Usa `json-server` para simular uma API RESTful a partir de um arquivo `db.json`.
- **Qualidade de Código**: Configurado com ESLint, Prettier e Husky para garantir um código limpo e padronizado.

## 🛠️ Tecnologias Utilizadas

- Angular
- Angular Material
- TypeScript
- RxJS
- ngx-image-cropper
- ngx-infinite-scroll
- JSON Server
- ESLint
- Prettier
- Husky

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
- Node.js (versão 18 ou superior)
- Angular CLI instalado globalmente: `npm install -g @angular/cli`

### Passos

1. **Clone o repositório:**

   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd crud-post
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Execute a aplicação:**

   Para que o projeto funcione corretamente, você precisará de **dois terminais** abertos simultaneamente.

   - #### **Terminal 1: Iniciar o Backend (JSON Server)**

     Este comando irá iniciar um servidor de API fake que observa o arquivo `db.json` e o disponibiliza na porta 3000.

     ```bash
     npm run json:server
     ```

     O servidor de API estará disponível em `http://localhost:3000`.

   - #### **Terminal 2: Iniciar o Frontend (Aplicação Angular)**

     Este comando irá iniciar o servidor de desenvolvimento do Angular.

     ```bash
     npm start
     ```

     A aplicação estará disponível em `http://localhost:4200`. O projeto já está configurado (`proxy.conf.json`) para redirecionar as chamadas de API para o `json-server`.

## 📜 Scripts Disponíveis

No arquivo `package.json`, você encontrará os seguintes scripts:

- `npm start`: Executa a aplicação em modo de desenvolvimento.
- `npm run json:server`: Inicia o servidor mock de API com `json-server`.
- `npm run build`: Compila a aplicação para produção na pasta `dist/`.
- `npm run watch`: Compila a aplicação em modo de desenvolvimento e observa as mudanças nos arquivos.
- `npm run lint`: Executa o linter (ESLint) para verificar a qualidade do código.
- `npm test`: Executa os testes unitários com Karma.