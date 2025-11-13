# Portfolio - Programação e Plataformas

Este é o meu portfólio pessoal da disciplina de Programação e Plataformas, desenvolvido como projeto full stack.

## 📁 Estrutura do Projeto

```
portfolio/
├── index.html          # Página principal
├── css/
│   └── style.css      # Estilos do portfolio
├── js/
│   └── script.js      # Scripts e interações
├── server.js          # Backend Node.js + Express
└── README.md          # Este arquivo
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

### Instalação

1. **Instale as dependências do backend:**

```bash
npm install express cors
```

2. **Inicie o servidor:**

```bash
node server.js
```

O servidor estará rodando em `http://localhost:3000`

3. **Abra o projeto no navegador:**

Acesse `http://localhost:3000` no seu navegador favorito.

## 🎯 Funcionalidades Implementadas

### Front-end (HTML + CSS + JavaScript)

- ✅ Design responsivo (funciona em mobile, tablet e desktop)
- ✅ Tema claro/escuro com localStorage
- ✅ Scroll suave entre seções
- ✅ Filtro de missões por categoria
- ✅ Expandir/recolher detalhes das missões
- ✅ Timeline interativa da evolução
- ✅ Botão "voltar ao topo"
- ✅ Animações e transições suaves

### Back-end (Node.js + Express)

- ✅ API RESTful com rotas para missões e timeline
- ✅ Dados em memória (sem necessidade de banco de dados)
- ✅ CORS habilitado para requisições do frontend
- ✅ Tratamento de erros

## 📡 Rotas da API

### Missões

- `GET /api/missoes` - Retorna todas as missões
- `GET /api/missoes?category=frontend` - Filtra por categoria
- `GET /api/missoes/:id` - Retorna uma missão específica

### Timeline

- `GET /api/timeline` - Retorna todos os eventos da timeline
- `GET /api/timeline/:id` - Retorna um evento específico

## 🎨 Tecnologias Utilizadas

### Front-end
- HTML5 (semântico)
- CSS3 (Flexbox e Grid)
- JavaScript puro (ES6+)
- Google Fonts (Poppins)

### Back-end
- Node.js
- Express
- CORS

## 📝 Como Personalizar

### Modificar as Missões

Edite o array `missoes` no arquivo `server.js`:

```javascript
const missoes = [
    {
        id: 1,
        title: "Nome da Missão",
        category: "frontend", // ou "logica" ou "projeto"
        description: "Descrição curta...",
        learnings: "O que você aprendeu..."
    },
    // ... mais missões
];
```

### Modificar a Timeline

Edite o array `timeline` no arquivo `server.js`:

```javascript
const timeline = [
    {
        id: 1,
        period: "Período",
        title: "Título da etapa",
        description: "Descrição do momento..."
    },
    // ... mais eventos
];
```

### Modificar as Cores

Edite as variáveis CSS no arquivo `css/style.css`:

```css
:root {
    --color-primary: hsl(6, 78%, 65%);    /* Coral/Rosa */
    --color-secondary: hsl(174, 62%, 59%); /* Turquesa */
    /* ... outras cores */
}
```

## 🌙 Tema Dark/Light

O tema é salvo automaticamente no `localStorage` do navegador. Para alternar, clique no botão no canto superior direito (🌙/☀️).

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- 📱 Mobile (até 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (acima de 1024px)

## 🔧 Melhorias Futuras

Algumas ideias para expandir o projeto:

- [ ] Adicionar banco de dados real (MongoDB, PostgreSQL)
- [ ] Sistema de autenticação
- [ ] Upload de imagens das missões
- [ ] Filtros mais avançados
- [ ] Gráficos de evolução
- [ ] Comentários nas missões
- [ ] Deploy em produção

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte da disciplina de Programação e Plataformas.

---

**Desenvolvido com 💖 e muito JavaScript**
