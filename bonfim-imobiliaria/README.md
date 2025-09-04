# Bonfim Imobiliária - Site React

Site moderno e profissional para a Bonfim Imobiliária, especializada em lotes e terrenos em Porto Velho, Rondônia.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool rápida e moderna
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento para SPA
- **Lucide React** - Ícones modernos
- **Recharts** - Gráficos interativos para análise de mercado

## ✨ Funcionalidades

### 🏠 Páginas Principais
- **Início** - Hero section, features e estatísticas
- **Buscar Terrenos** - Sistema de busca com filtros avançados
- **Análise de Mercado** - Gráficos e estatísticas de preços por bairro
- **Lotes e Terrenos** - Catálogo completo de propriedades
- **Sobre** - Informações da empresa e equipe

### 🔍 Sistema de Busca
- Filtros por tipo de imóvel (Terreno/Lote)
- Filtros por cidade e bairro
- Filtros por faixa de preço
- Filtros por área
- Busca por texto livre

### 📊 Análise de Mercado
- Gráficos de barras, linha e área
- Estatísticas por bairro
- Evolução temporal de preços
- Distribuição por tipo de imóvel
- Metodologia detalhada

### 📱 Design Responsivo
- Interface adaptável para todos os dispositivos
- Navegação mobile-friendly
- Componentes otimizados para touch

## 🛠️ Instalação

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Passos

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd bonfim-imobiliaria
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse o site**
   - Abra [http://localhost:5173](http://localhost:5173) no navegador

## 📁 Estrutura do Projeto

```
bonfim-imobiliaria/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Navbar.jsx      # Navegação principal
│   │   └── Footer.jsx      # Rodapé do site
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.jsx        # Página inicial
│   │   ├── SearchProperties.jsx  # Busca de propriedades
│   │   ├── MarketAnalysis.jsx    # Análise de mercado
│   │   ├── Properties.jsx        # Catálogo de propriedades
│   │   └── About.jsx             # Sobre a empresa
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Ponto de entrada
│   ├── index.css           # Estilos globais
│   └── App.css             # Estilos da aplicação
├── public/                 # Arquivos estáticos
│   └── BIMTECH.jpg        # Logo da empresa
├── tailwind.config.js      # Configuração do Tailwind
├── postcss.config.js       # Configuração do PostCSS
├── package.json            # Dependências e scripts
└── README.md              # Este arquivo
```

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#3b82f6', // Azul principal
  },
  secondary: {
    500: '#eab308', // Amarelo secundário
  }
}
```

### Logo
Substitua o arquivo `public/BIMTECH.jpg` pela nova logo da empresa.

### Conteúdo
Edite os arquivos JSX nas pastas `components/` e `pages/` para modificar textos, imagens e funcionalidades.

## 🚀 Deploy

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

### Deploy no Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente se necessário
3. Deploy automático a cada push

### Deploy no Netlify
1. Conecte seu repositório ao Netlify
2. Configure o build command: `npm run build`
3. Configure o publish directory: `dist`

## 📱 Funcionalidades Mobile

- Menu hambúrguer responsivo
- Cards adaptáveis para touch
- Gráficos otimizados para mobile
- Formulários mobile-friendly

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview da build
- `npm run lint` - Verificação de código

## 📊 Dados de Exemplo

O site inclui dados de exemplo para demonstração:
- 6 propriedades (terrenos e lotes)
- Estatísticas de 8 bairros de Porto Velho
- Evolução de preços de 6 meses
- Informações de contato reais

## 🌐 Integrações

- **WhatsApp** - Links diretos para contato
- **Email** - Formulários de contato
- **Telefone** - Links para ligação
- **Redes Sociais** - Links preparados (configurar URLs)

## 📈 Próximas Funcionalidades

- [ ] Sistema de favoritos
- [ ] Comparador de propriedades
- [ ] Calculadora de financiamento
- [ ] Integração com APIs de imóveis
- [ ] Sistema de notificações
- [ ] Área do cliente
- [ ] Blog de notícias do mercado

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade da Bonfim Imobiliária.

## 📞 Suporte

Para suporte técnico ou dúvidas:
- **Email**: engrodrigofblopes@gmail.com
- **Telefone**: (69) 99256-1830
- **WhatsApp**: (69) 99256-1830

---

**Bonfim Imobiliária** - Especialistas em Lotes e Terrenos em Porto Velho, RO
