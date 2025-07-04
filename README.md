# Bazar   - E-commerce Vue.js

Um e-commerce completo desenvolvido em Vue.js com Tailwind CSS e Flowbite Vue para um bazar de roupas, calçados e acessórios.

## Características 🛍️

- **Frontend**: Vue.js 3 + Composition API
- **Styling**: Tailwind CSS + Flowbite Vue
- **Backend**: JSON Server (simulação de API REST)
- **Roteamento**: Vue Router
- **Requisições HTTP**: Axios
- **Responsivo**: Design adaptável para mobile e desktop

## Funcionalidades 📦

- ✅ Página inicial com hero section e produtos em destaque
- ✅ Catálogo de produtos com filtros (categoria, gênero, faixa etária)
- ✅ Página de detalhes do produto
- ✅ Sistema de busca e ordenação
- ✅ Layout responsivo
- ✅ Navegação dinâmica
- ✅ Páginas institucionais (Sobre, Contato)

## Como executar 🚀

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório** (se necessário)
   ```bash
   git clone <url-do-repositorio>
   cd bazar
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto completo** (Frontend + Backend)
   ```bash
   npm run dev:full
   ```

   Este comando irá:
   - Iniciar o JSON Server na porta 3001 (API)
   - Iniciar o servidor de desenvolvimento Vue.js na porta 3000

### Comandos disponíveis

```bash
# Desenvolvimento (apenas frontend)
npm run dev

# Servidor JSON (apenas backend)
npm run server

# Desenvolvimento completo (frontend + backend)
npm run dev:full

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Acesso 🌐

- **Frontend**: http://localhost:3000
- **API (JSON Server)**: http://localhost:3001

## Estrutura do Projeto 📁

```
bazar/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Navbar.vue
│   │   ├── Footer.vue
│   │   └── ProductCard.vue
│   ├── views/              # Páginas
│   │   ├── Home.vue
│   │   ├── Products.vue
│   │   ├── ProductDetail.vue
│   │   ├── About.vue
│   │   └── Contact.vue
│   ├── router/             # Configuração de rotas
│   │   └── index.js
│   ├── services/           # Serviços de API
│   │   └── api.js
│   ├── style.css           # Estilos globais
│   ├── App.vue
│   └── main.js
├── db.json                 # Banco de dados JSON
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Dados de Exemplo 🛒

O projeto inclui dados de exemplo no arquivo `db.json` com:

- 8 produtos de diferentes categorias
- Roupas (masculino/feminino, adulto/infantil)
- Calçados (tênis, sandálias, sapatos)
- Acessórios (bolsas, relógios)
- Informações completas (preço, estoque, tamanhos, cores)

## Tecnologias Utilizadas 🔧

- **Vue.js 3**: Framework JavaScript progressivo
- **Vite**: Build tool e servidor de desenvolvimento
- **Tailwind CSS**: Framework CSS utilitário
- **Flowbite Vue**: Componentes UI baseados em Tailwind
- **Vue Router**: Roteamento SPA
- **Axios**: Cliente HTTP
- **JSON Server**: Simulação de API REST
- **Concurrently**: Execução de múltiplos comandos

## Responsividade 📱

O projeto é totalmente responsivo e funciona bem em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Deploy 🚀

Para fazer o deploy do projeto:

1. **Build do frontend**:
   ```bash
   npm run build
   ```

2. **Para o backend (JSON Server)**, você pode usar serviços como:
   - Railway
   - Heroku
   - Vercel
   - Netlify Functions

## Contribuindo 🤝

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença 📄

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Suporte 📞

Se você tiver alguma dúvida ou problema, por favor abra uma issue no repositório.

---

**Bazar** - Onde a moda encontra a tecnologia! 🛍️✨
