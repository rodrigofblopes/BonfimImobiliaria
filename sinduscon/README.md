# 📊 Módulo Sinduscon - Cálculo de Preços por m²

Este módulo contém todos os arquivos relacionados ao sistema de cálculo de preços por metro quadrado baseado no CUB (Custo Unitário Básico) do Sinduscon-RO.

## 📁 Estrutura de Arquivos

### 🎯 Páginas Next.js (src/app/)
- **`precos-cub/page.tsx`** - Página principal com calculadora CUB
- **`precos-cub/comercial/page.tsx`** - CUB para construções comerciais
- **`precos-cub/residencial/page.tsx`** - CUB para construções residenciais  
- **`precos-cub/detalhados/page.tsx`** - Análise detalhada (em desenvolvimento)
- **`blog/cub-sinduscon-2025/page.tsx`** - Artigo explicativo sobre CUB 2025

### 🌐 Arquivos HTML Estáticos (public/)
- **`artigo-cub-sinduscon-guia-completo.html`** - Guia completo sobre CUB
- **`precos-detalhados-cub.html`** - Tabelas detalhadas de preços

### 📄 Documentos PDF (documentos/)
- **`Cartilha-Principais-Aspectos.pdf`** - Cartilha explicativa do Sinduscon
- **`cub0525desonerado.pdf`** - CUB desonerado maio 2025
- **`cub0525onerado.pdf`** - CUB onerado maio 2025

## 💰 Valores CUB Implementados

### Residencial:
- **R1 (Popular)**: R$ 1.850,45/m²
- **R8 (Padrão)**: R$ 2.156,78/m²  
- **R16 (Alto)**: R$ 2.489,32/m²

### Comercial:
- **CS8 (Salas)**: R$ 2.234,67/m²
- **CS16 (Lojas)**: R$ 2.567,89/m²
- **Galpões**: R$ 1.678,23/m²

## ⚙️ Funcionalidades

✅ **Calculadoras interativas** com entrada de metragem
✅ **Separação de custos** (materiais 55%, mão de obra 40%)
✅ **Valores atualizados** de maio 2025
✅ **Interface responsiva** com design moderno
✅ **Navegação entre tipos** (residencial/comercial)
✅ **Artigos explicativos** sobre CUB

## 🚀 Como Implementar

1. Copie os arquivos para seu projeto Next.js
2. Ajuste os imports dos componentes (PageLayout, etc.)
3. Atualize os valores CUB conforme necessário
4. Configure as rotas no seu sistema de roteamento

## 📅 Última Atualização
- **Data**: Maio 2025
- **Região**: Porto Velho-RO
- **Fonte**: Sinduscon-RO

---
*Módulo extraído do projeto ConectaPro para reutilização em outros projetos.*
