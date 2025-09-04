# 🚀 Instruções para Uso e Modificação do Template Lage Imóveis

## ✅ **O que foi criado:**

1. **`site_local.html`** - Versão local modificável do site
2. **Servidor local rodando na porta 8000**
3. **Interface interativa para testes**

## 🌐 **Como acessar:**

- **URL Local:** http://localhost:8000/site_local.html
- **Servidor:** Python HTTP Server (porta 8000)

## 🎯 **Funcionalidades para Teste:**

### **1. Modificação Interativa de Imóveis:**
- **Clique nos cards de imóveis** para editar:
  - Preço
  - Localização  
  - Descrição
- Os cards têm bordas douradas tracejadas para indicar que são editáveis

### **2. Formulário de Contato:**
- Formulário funcional (modo teste)
- Validação de campos obrigatórios
- Mensagem de confirmação

### **3. Navegação Suave:**
- Menu com scroll suave para as seções
- Design responsivo para mobile e desktop

## 🎨 **Como Modificar o Template:**

### **Modificações Simples (HTML):**
```html
<!-- Alterar título -->
<title>Seu Título Personalizado</title>

<!-- Alterar logo -->
<div class="logo">🏠 Sua Imobiliária</div>

<!-- Alterar cores principais -->
<style>
.header {
    background: linear-gradient(135deg, #SUA_COR1 0%, #SUA_COR2 100%);
}
</style>
```

### **Modificações de Conteúdo:**
```html
<!-- Alterar texto do hero -->
<h1>Seu Título Principal</h1>
<p>Sua descrição personalizada</p>

<!-- Alterar informações de contato -->
<p><strong>Telefone:</strong> Seu telefone</p>
<p><strong>Email:</strong> seu@email.com</p>
```

### **Modificações de Estilo (CSS):**
```css
/* Alterar cores principais */
:root {
    --primary-color: #1e3c72;    /* Azul principal */
    --accent-color: #ffd700;     /* Dourado */
    --text-color: #333;          /* Texto escuro */
}

/* Alterar fontes */
body {
    font-family: 'Sua Fonte', sans-serif;
}

/* Alterar tamanhos */
.hero-content h1 {
    font-size: 4rem; /* Tamanho do título */
}
```

## 🔧 **Estrutura do Projeto:**

```
📁 Site-Lage-Imoveis-master/
├── 📄 site_local.html          # Template principal (EDITAR AQUI)
├── 📄 INSTRUCOES_USO.md        # Este arquivo
├── 📁 web/                     # Versão Flutter original
├── 📁 lib/                     # Código Flutter
├── 📁 assets/                  # Imagens e recursos
└── 📄 pubspec.yaml             # Configurações Flutter
```

## 🚀 **Próximos Passos Recomendados:**

### **1. Personalização Básica:**
- [ ] Alterar nome da imobiliária
- [ ] Alterar cores da marca
- [ ] Alterar informações de contato
- [ ] Adicionar suas próprias imagens

### **2. Funcionalidades Avançadas:**
- [ ] Integrar com banco de dados de imóveis
- [ ] Adicionar sistema de busca
- [ ] Implementar galeria de fotos
- [ ] Adicionar mapa de localização

### **3. Otimizações:**
- [ ] Otimizar imagens para web
- [ ] Adicionar SEO meta tags
- [ ] Implementar cache
- [ ] Adicionar analytics

## 💡 **Dicas de Desenvolvimento:**

### **Para Desenvolvedores:**
1. **Use o console do navegador** (F12) para debug
2. **Modifique o CSS** para personalizar o visual
3. **Adicione JavaScript** para funcionalidades interativas
4. **Teste em diferentes dispositivos** para responsividade

### **Para Não-Desenvolvedores:**
1. **Use editores simples** como Notepad++ ou VS Code
2. **Faça backup** antes de cada modificação
3. **Teste sempre** após cada alteração
4. **Use o modo de edição interativa** clicando nos cards

## 🔄 **Como Atualizar:**

1. **Edite o arquivo** `site_local.html`
2. **Salve as alterações**
3. **Recarregue o navegador** (F5)
4. **Teste as modificações**

## 📱 **Responsividade:**

O template já está configurado para:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)  
- ✅ Mobile (até 767px)

## 🎨 **Paleta de Cores Atual:**

- **Azul Principal:** #1e3c72
- **Azul Secundário:** #2a5298
- **Dourado:** #ffd700
- **Dourado Hover:** #ffed4e
- **Texto:** #333
- **Fundo Claro:** #f8f9fa

## 🚨 **Troubleshooting:**

### **Site não carrega:**
- Verifique se o servidor está rodando: `netstat -an | findstr :8000`
- Reinicie o servidor: `python -m http.server 8000`

### **Modificações não aparecem:**
- Limpe o cache do navegador (Ctrl+F5)
- Verifique se salvou o arquivo
- Confirme que está editando o arquivo correto

### **Erros no console:**
- Abra F12 no navegador
- Verifique a aba Console para mensagens de erro
- Corrija os erros de sintaxe HTML/CSS/JavaScript

## 📞 **Suporte:**

- **Console do navegador:** F12 → Console
- **Inspeção de elementos:** F12 → Elements
- **Teste de responsividade:** F12 → Toggle device toolbar

---

**🎉 Agora você pode testar e modificar o template localmente!**

**URL:** http://localhost:8000/site_local.html
**Arquivo para editar:** `site_local.html`
