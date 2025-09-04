/**
 * Sistema de Análise de Mercado Imobiliário
 * Bonfim Imobiliária - Porto Velho, RO
 * 
 * Funcionalidades:
 * - Filtros de análise
 * - Tabela de preços por bairro
 * - Gráficos estatísticos
 * - Integração com dados do backend
 */

class AnaliseMercado {
    constructor() {
        this.dados = [];
        this.filtros = {
            tipo: 'todos',
            preco: 'todos',
            periodo: '30'
        };
        
        this.inicializar();
    }
    
    inicializar() {
        this.carregarDados();
        this.configurarEventos();
        this.atualizarInterface();
    }
    
    configurarEventos() {
        // Filtros
        document.getElementById('analiseTipo').addEventListener('change', (e) => {
            this.filtros.tipo = e.target.value;
            this.atualizarAnalise();
        });
        
        document.getElementById('analisePreco').addEventListener('change', (e) => {
            this.filtros.preco = e.target.value;
            this.atualizarAnalise();
        });
        
        document.getElementById('analisePeriodo').addEventListener('change', (e) => {
            this.filtros.periodo = e.target.value;
            this.atualizarAnalise();
        });
    }
    
    async carregarDados() {
        try {
            // Simular dados de exemplo (em produção, viria do backend)
            this.dados = this.gerarDadosExemplo();
            this.atualizarInterface();
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            this.mostrarErro('Erro ao carregar dados de mercado');
        }
    }
    
    gerarDadosExemplo() {
        // Dados simulados para demonstração
        const bairros = [
            'Centro', 'Nova Porto Velho', 'Trio', 'Caiari', 'Areal', 'Embratel',
            'Cidade Nova', 'Jardim América', 'Jardim Europa', 'Jardim Tropical'
        ];
        
        const dados = [];
        
        bairros.forEach(bairro => {
            const precoBase = Math.random() * 200 + 50; // R$ 50-250/m²
            const qtdImoveis = Math.floor(Math.random() * 20) + 5; // 5-25 imóveis
            
            dados.push({
                bairro: bairro,
                preco_medio_m2: precoBase.toFixed(2),
                qtd_imoveis: qtdImoveis,
                variacao: (Math.random() * 20 - 10).toFixed(1), // -10% a +10%
                tendencia: Math.random() > 0.5 ? 'Alta' : 'Baixa',
                preco_medio: (precoBase * 200).toFixed(0), // Preço médio total
                area_media: (Math.random() * 200 + 100).toFixed(0), // 100-300m²
                desvio_padrao: (precoBase * 0.3).toFixed(2)
            });
        });
        
        return dados;
    }
    
    atualizarAnalise() {
        this.atualizarInterface();
        this.atualizarGraficos();
    }
    
    atualizarInterface() {
        this.atualizarEstatisticas();
        this.atualizarTabela();
    }
    
    atualizarEstatisticas() {
        const dadosFiltrados = this.aplicarFiltros();
        
        if (dadosFiltrados.length === 0) {
            this.mostrarErro('Nenhum dado encontrado com os filtros selecionados');
            return;
        }
        
        // Calcular estatísticas
        const precos = dadosFiltrados.map(d => parseFloat(d.preco_medio_m2));
        const mediaGeral = precos.reduce((a, b) => a + b, 0) / precos.length;
        const totalImoveis = dadosFiltrados.reduce((a, b) => a + parseInt(b.qtd_imoveis), 0);
        
        // Bairro mais caro
        const maisCaro = dadosFiltrados.reduce((max, atual) => 
            parseFloat(atual.preco_medio_m2) > parseFloat(max.preco_medio_m2) ? atual : max
        );
        
        // Bairro mais barato
        const maisBarato = dadosFiltrados.reduce((min, atual) => 
            parseFloat(atual.preco_medio_m2) < parseFloat(min.preco_medio_m2) ? atual : min
        );
        
        // Atualizar interface
        document.getElementById('mediaGeral').textContent = `R$ ${mediaGeral.toFixed(2)}`;
        document.getElementById('totalImoveis').textContent = totalImoveis.toLocaleString();
        document.getElementById('bairroMaisCaro').textContent = maisCaro.bairro;
        document.getElementById('bairroMaisBarato').textContent = maisBarato.bairro;
    }
    
    atualizarTabela() {
        const dadosFiltrados = this.aplicarFiltros();
        const tbody = document.getElementById('tabelaPrecos');
        
        if (dadosFiltrados.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500">Nenhum dado encontrado</td></tr>';
            return;
        }
        
        tbody.innerHTML = '';
        
        dadosFiltrados.forEach(dado => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50';
            
            const variacaoClass = parseFloat(dado.variacao) >= 0 ? 'text-green-600' : 'text-red-600';
            const variacaoIcon = parseFloat(dado.variacao) >= 0 ? '↗️' : '↘️';
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${dado.bairro}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">R$ ${dado.preco_medio_m2}</div>
                    <div class="text-xs text-gray-500">± R$ ${dado.desvio_padrao}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${dado.qtd_imoveis}</div>
                    <div class="text-xs text-gray-500">${dado.area_media} m² médios</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm ${variacaoClass}">
                        ${variacaoIcon} ${Math.abs(parseFloat(dado.variacao))}%
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        dado.tendencia === 'Alta' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }">
                        ${dado.tendencia}
                    </span>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }
    
    aplicarFiltros() {
        let dadosFiltrados = [...this.dados];
        
        // Filtro por tipo
        if (this.filtros.tipo !== 'todos') {
            // Em uma implementação real, filtraria por tipo de imóvel
            // Por enquanto, mantém todos os dados
        }
        
        // Filtro por preço
        if (this.filtros.preco !== 'todos') {
            dadosFiltrados = dadosFiltrados.filter(dado => {
                const preco = parseFloat(dado.preco_medio_m2);
                switch (this.filtros.preco) {
                    case 'baixo':
                        return preco <= 100;
                    case 'medio':
                        return preco > 100 && preco <= 200;
                    case 'alto':
                        return preco > 200;
                    default:
                        return true;
                }
            });
        }
        
        // Filtro por período (simulado)
        if (this.filtros.periodo !== '30') {
            // Em uma implementação real, filtraria por data
            // Por enquanto, mantém todos os dados
        }
        
        return dadosFiltrados;
    }
    
    atualizarGraficos() {
        this.atualizarGraficoDistribuicao();
        this.atualizarGraficoEvolucao();
    }
    
    atualizarGraficoDistribuicao() {
        const canvas = document.getElementById('graficoDistribuicao');
        const ctx = canvas.getContext('2d');
        
        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const dadosFiltrados = this.aplicarFiltros();
        if (dadosFiltrados.length === 0) return;
        
        // Criar histograma simples
        const precos = dadosFiltrados.map(d => parseFloat(d.preco_medio_m2));
        const min = Math.min(...precos);
        const max = Math.max(...precos);
        const bins = 5;
        const binSize = (max - min) / bins;
        
        const histograma = new Array(bins).fill(0);
        precos.forEach(preco => {
            const binIndex = Math.min(Math.floor((preco - min) / binSize), bins - 1);
            histograma[binIndex]++;
        });
        
        // Desenhar gráfico
        const barWidth = canvas.width / bins;
        const maxCount = Math.max(...histograma);
        
        ctx.fillStyle = '#10B981';
        histograma.forEach((count, index) => {
            const barHeight = (count / maxCount) * (canvas.height - 40);
            const x = index * barWidth + 10;
            const y = canvas.height - barHeight - 20;
            
            ctx.fillRect(x, y, barWidth - 5, barHeight);
            
            // Adicionar rótulos
            ctx.fillStyle = '#374151';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(count.toString(), x + barWidth/2, canvas.height - 5);
            
            // Rótulo de preço
            const precoBin = min + index * binSize;
            ctx.fillText(`R$ ${precoBin.toFixed(0)}`, x + barWidth/2, canvas.height - 25);
            
            ctx.fillStyle = '#10B981';
        });
        
        // Título
        ctx.fillStyle = '#111827';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Distribuição de Preços por m²', canvas.width/2, 20);
    }
    
    atualizarGraficoEvolucao() {
        const canvas = document.getElementById('graficoEvolucao');
        const ctx = canvas.getContext('2d');
        
        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const dadosFiltrados = this.aplicarFiltros();
        if (dadosFiltrados.length === 0) return;
        
        // Simular evolução temporal (em produção, viria de dados históricos)
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
        const precos = dadosFiltrados.map(d => parseFloat(d.preco_medio_m2));
        const precoBase = precos.reduce((a, b) => a + b, 0) / precos.length;
        
        const evolucao = meses.map((mes, index) => {
            const variacao = (Math.random() - 0.5) * 0.2; // ±10%
            return precoBase * (1 + variacao);
        });
        
        // Desenhar linha de evolução
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        const stepX = (canvas.width - 40) / (meses.length - 1);
        evolucao.forEach((preco, index) => {
            const x = 20 + index * stepX;
            const y = canvas.height - 20 - (preco / Math.max(...evolucao)) * (canvas.height - 40);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Adicionar pontos
        ctx.fillStyle = '#3B82F6';
        evolucao.forEach((preco, index) => {
            const x = 20 + index * stepX;
            const y = canvas.height - 20 - (preco / Math.max(...evolucao)) * (canvas.height - 40);
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Adicionar rótulos dos meses
        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        meses.forEach((mes, index) => {
            const x = 20 + index * stepX;
            ctx.fillText(mes, x, canvas.height - 5);
        });
        
        // Título
        ctx.fillStyle = '#111827';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Evolução de Preços (Últimos 6 meses)', canvas.width/2, 20);
    }
    
    mostrarErro(mensagem) {
        console.error(mensagem);
        // Em uma implementação real, mostrar notificação para o usuário
    }
    
    async atualizarDadosReais() {
        try {
            // Em produção, faria uma requisição para o backend
            const response = await fetch('/api/analise-mercado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.filtros)
            });
            
            if (response.ok) {
                const novosDados = await response.json();
                this.dados = novosDados;
                this.atualizarInterface();
            } else {
                throw new Error('Erro na requisição');
            }
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            this.mostrarErro('Erro ao atualizar dados de mercado');
        }
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.analiseMercado = new AnaliseMercado();
});

// Função global para atualizar análise (chamada pelo botão)
function atualizarAnalise() {
    if (window.analiseMercado) {
        window.analiseMercado.atualizarAnalise();
    }
}
