# 🏠 Sistema de Análise de Mercado Imobiliário
## Bonfim Imobiliária - Porto Velho, RO

Sistema completo para análise de preços por m² de lotes e terrenos em Porto Velho, utilizando web scraping e inferência estatística.

## 🚀 Funcionalidades

### 📊 **Análise de Mercado**
- **Preços por m² por bairro** com estatísticas detalhadas
- **Filtros avançados** por tipo de imóvel, faixa de preço e período
- **Gráficos interativos** de distribuição de preços e evolução temporal
- **Inferência estatística** com intervalos de confiança e análise de tendências

### 🔍 **Web Scraping Automático**
- **VivaReal**: Coleta de dados de terrenos e lotes
- **Zap Imóveis**: Análise de preços e características
- **OLX**: Dados de mercado secundário
- **Atualização automática** a cada 24 horas

### 📈 **Análise Estatística**
- **Médias e medianas** por bairro
- **Desvios padrão** e intervalos de confiança
- **Identificação de outliers** e tendências
- **Relatórios executivos** automáticos

## 🛠️ Instalação e Configuração

### **1. Requisitos do Sistema**
```bash
# Python 3.8+
python --version

# Node.js 16+ (para desenvolvimento)
node --version
```

### **2. Instalar Dependências Python**
```bash
# Instalar todas as dependências
pip install -r requirements.txt

# Ou instalar individualmente
pip install requests beautifulsoup4 pandas numpy scipy matplotlib seaborn
```

### **3. Configurar Ambiente**
```bash
# Criar ambiente virtual (recomendado)
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Instalar dependências no ambiente virtual
pip install -r requirements.txt
```

## 📋 Como Usar

### **1. Executar Web Scraping**
```bash
# Executar coleta de dados
python web_scraper_analise.py

# O sistema irá:
# - Coletar dados de todos os sites
# - Salvar em dados_imoveis.json
# - Gerar relatório_mercado.json
```

### **2. Acessar Análise no Site**
1. **Abrir o site**: `site_local.html`
2. **Navegar para**: "Análise de Mercado"
3. **Usar filtros**:
   - Tipo: Terreno, Lote ou Todos
   - Faixa de Preço: Baixo, Médio, Alto
   - Período: 30 dias a 1 ano

### **3. Interpretar Resultados**
- **📊 Estatísticas Gerais**: Preço médio geral, total de imóveis
- **🏆 Bairros Extremos**: Mais caro e mais barato
- **📈 Tabela Detalhada**: Preços por bairro com variações
- **📊 Gráficos**: Distribuição e evolução temporal

## 🔧 Configuração Avançada

### **Personalizar Bairros**
```python
# Em web_scraper_analise.py
self.bairros_porto_velho = [
    'Seu Bairro',
    'Outro Bairro',
    # Adicionar mais bairros
]
```

### **Ajustar Filtros de Preço**
```python
# Em web_scraper_analise.py
def aplicar_filtros_preco(self, dados, faixa):
    if faixa == 'baixo':
        return dados[dados['preco_m2'] <= 100]
    elif faixa == 'medio':
        return dados[(dados['preco_m2'] > 100) & (dados['preco_m2'] <= 200)]
    elif faixa == 'alto':
        return dados[dados['preco_m2'] > 200]
    return dados
```

### **Configurar Intervalo de Atualização**
```python
# Em web_scraper_analise.py
# Pausa entre requisições (em segundos)
time.sleep(random.uniform(1, 3))  # 1-3 segundos

# Para atualização automática
import schedule
schedule.every(24).hours.do(self.coletar_dados_completos)
```

## 📊 Estrutura dos Dados

### **Formato JSON dos Imóveis**
```json
{
  "titulo": "Terreno 200m² - Centro",
  "preco": 50000,
  "area": 200,
  "preco_m2": 250,
  "bairro": "Centro",
  "tipo": "terreno",
  "fonte": "VivaReal",
  "data_coleta": "2024-01-15T10:30:00",
  "localizacao": "Rua Principal, Centro"
}
```

### **Relatório de Análise**
```json
{
  "data_geracao": "2024-01-15T10:30:00",
  "estatisticas_gerais": {
    "total_imoveis": 150,
    "preco_medio_geral": 180.50,
    "preco_mediano_geral": 175.00
  },
  "estatisticas_por_bairro": {
    "Centro": {
      "preco_m2_count": 25,
      "preco_m2_mean": 220.00,
      "preco_m2_median": 215.00
    }
  }
}
```

## 🚨 Considerações Importantes

### **Ética e Legalidade**
- ✅ **Respeitar robots.txt** dos sites
- ✅ **Pausas entre requisições** para não sobrecarregar
- ✅ **Usar dados apenas para análise** e não para spam
- ✅ **Verificar termos de uso** de cada site

### **Limitações Técnicas**
- ⚠️ **Sites podem mudar estrutura** HTML
- ⚠️ **Rate limiting** pode bloquear requisições
- ⚠️ **Dados podem estar desatualizados**
- ⚠️ **Alguns sites bloqueiam scraping**

### **Melhorias Recomendadas**
- 🔄 **Proxy rotation** para evitar bloqueios
- 🔄 **Selenium** para sites com JavaScript
- 🔄 **API oficial** quando disponível
- 🔄 **Cache inteligente** para dados históricos

## 📈 Exemplos de Uso

### **1. Análise para Investidores**
```python
# Identificar bairros com melhor custo-benefício
analise = AnaliseEstatistica(dados)
bairros_extremos = analise.identificar_bairros_extremos()

print(f"Melhor investimento: {bairros_extremos['mais_barato']['bairro']}")
print(f"Preço médio: R$ {bairros_extremos['mais_barato']['preco_medio']}/m²")
```

### **2. Relatório para Clientes**
```python
# Gerar relatório personalizado
relatorio = analise.gerar_relatorio_completo()
print(relatorio['resumo_executivo'])
```

### **3. Análise de Tendências**
```python
# Comparar preços entre períodos
dados_antigos = carregar_dados('dados_2023.json')
dados_atuais = carregar_dados('dados_2024.json')

variacao = ((dados_atuais['preco_medio'] - dados_antigos['preco_medio']) / 
            dados_antigos['preco_medio']) * 100
print(f"Variação anual: {variacao:.2f}%")
```

## 🆘 Suporte e Solução de Problemas

### **Problemas Comuns**

#### **1. Erro de Conexão**
```bash
# Verificar conectividade
ping www.vivareal.com.br

# Verificar proxy/firewall
curl -I https://www.vivareal.com.br
```

#### **2. Dados Não Carregam**
```python
# Verificar logs
logging.basicConfig(level=logging.DEBUG)

# Testar scraping individual
scraper = WebScraperImoveis()
dados = scraper.scrape_vivareal('Centro', 'terreno')
print(f"Imóveis encontrados: {len(dados)}")
```

#### **3. Gráficos Não Aparecem**
```javascript
// Verificar console do navegador
console.log('Dados carregados:', window.analiseMercado.dados);

// Verificar canvas
const canvas = document.getElementById('graficoDistribuicao');
console.log('Canvas:', canvas);
```

### **Logs e Debug**
```python
# Ativar logs detalhados
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

## 🔮 Roadmap e Futuras Funcionalidades

### **Versão 2.0**
- 📱 **App mobile** para consultas rápidas
- 🤖 **IA para previsões** de preços
- 📊 **Dashboard interativo** com mais gráficos
- 🔔 **Alertas automáticos** para oportunidades

### **Versão 3.0**
- 🌐 **API pública** para integração
- 📈 **Machine Learning** para análise avançada
- 🗺️ **Mapas interativos** com preços por região
- 💰 **Calculadora de investimento** com ROI

## 📞 Contato e Suporte

- **Desenvolvedor**: Rodrigo F. B. Lopes
- **Email**: engrodrigofblopes@gmail.com
- **Telefone**: (69) 99256-1830
- **WhatsApp**: (69) 99256-1830

## 📄 Licença

Este projeto é desenvolvido para uso interno da **Bonfim Imobiliária**.
Todos os direitos reservados.

---

**⚠️ Aviso**: Este sistema é para uso educacional e profissional. Respeite sempre os termos de uso dos sites e as leis de proteção de dados.
