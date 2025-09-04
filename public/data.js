// Dados dos bairros e regiões de Porto Velho, RO
// Baseado no Plano Diretor Municipal e divisão administrativa oficial

const portoVelhoData = {
    // Regiões administrativas de Porto Velho
    regioes: {
        'centro-sul': {
            nome: 'Centro-Sul',
            bairros: [
                'Centro',
                'São Cristóvão',
                'Nossa Senhora das Graças',
                'Olaria',
                'Pedrinhas'
            ]
        },
        'norte': {
            nome: 'Norte',
            bairros: [
                'Nova Porto Velho',
                'Cidade Nova',
                'Jardim dos Migrantes',
                'Vila Princesa',
                'São José'
            ]
        },
        'leste': {
            nome: 'Leste',
            bairros: [
                'Areal',
                'Baixa da União',
                'Costa e Silva',
                'Embaixador',
                'Flodoaldo Pinto'
            ]
        },
        'oeste': {
            nome: 'Oeste',
            bairros: [
                'Industrial',
                'Lagoa',
                'Mato Grosso',
                'Rio Madeira',
                'Triângulo',
                'Tucumanzal'
            ]
        },
        'calama': {
            nome: 'Calama',
            bairros: [
                'Calama'
            ]
        }
    },

    // Todos os bairros de Porto Velho
    bairros: [
        'Areal',
        'Baixa da União',
        'Calama',
        'Centro',
        'Cidade Nova',
        'Costa e Silva',
        'Embaixador',
        'Flodoaldo Pinto',
        'Industrial',
        'Jardim dos Migrantes',
        'Lagoa',
        'Mato Grosso',
        'Nossa Senhora das Graças',
        'Nova Porto Velho',
        'Olaria',
        'Pedrinhas',
        'Rio Madeira',
        'São Cristóvão',
        'São José',
        'Triângulo',
        'Tucumanzal',
        'Vila Princesa'
    ],

    // Tipos de imóveis disponíveis
    tiposImoveis: [
        { value: 'terreno', label: 'Terreno' },
        { value: 'lote', label: 'Lote' },
        { value: 'chacara', label: 'Chácara' },
        { value: 'sitio', label: 'Sítio' },
        { value: 'fazenda', label: 'Fazenda' }
    ],

    // Faixas de preço
    faixasPreco: [
        { value: 'ate-50k', label: 'Até R$ 50.000' },
        { value: '50k-100k', label: 'R$ 50.000 - R$ 100.000' },
        { value: '100k-200k', label: 'R$ 100.000 - R$ 200.000' },
        { value: '200k-500k', label: 'R$ 200.000 - R$ 500.000' },
        { value: 'acima-500k', label: 'Acima de R$ 500.000' }
    ],

    // Tamanhos de terreno
    tamanhosTerreno: [
        { value: 'ate-200m2', label: 'Até 200m²' },
        { value: '200m2-500m2', label: '200m² - 500m²' },
        { value: '500m2-1000m2', label: '500m² - 1.000m²' },
        { value: '1000m2-5000m2', label: '1.000m² - 5.000m²' },
        { value: 'acima-5000m2', label: 'Acima de 5.000m²' }
    ],

    // Propriedades reais da Bonfim Imobiliária
    propriedades: [
        {
            id: 1,
            tipo: 'terreno',
            titulo: 'Lote 1C - Rua Prudente de Moraes',
            bairro: 'Centro',
            endereco: 'Rua Prudente de Moraes',
            preco: 0, // Preço a ser definido
            area: 0, // Área a ser definida
            precoPorM2: 0,
            descricao: 'Terreno localizado na Rua Prudente de Moraes, bairro Centro. Excelente localização com fácil acesso e infraestrutura completa.',
            caracteristicas: ['Localização central', 'Infraestrutura completa', 'Fácil acesso', 'Documentação regularizada'],
            contato: '69992561830',
            fotos: [
                '1C - Prudente de Moraes/fotolote1.JPG',
                '1C - Prudente de Moraes/fotolote2.JPG',
                '1C - Prudente de Moraes/Ortomosaico.jpg'
            ],
            video: '1C - Prudente de Moraes/Reels-Lote1.mp4',
            disponivel: true
        },
        {
            id: 2,
            tipo: 'terreno',
            titulo: 'Lote 2C - Rua Prudente de Moraes',
            bairro: 'Centro',
            endereco: 'Rua Prudente de Moraes',
            preco: 0, // Preço a ser definido
            area: 0, // Área a ser definida
            precoPorM2: 0,
            descricao: 'Terreno localizado na Rua Prudente de Moraes, bairro Centro. Ótima oportunidade de investimento em localização estratégica.',
            caracteristicas: ['Localização central', 'Infraestrutura completa', 'Fácil acesso', 'Documentação regularizada'],
            contato: '69992561830',
            fotos: [
                '2C - Prudente de Moraes/1.JPG',
                '2C - Prudente de Moraes/2.JPG',
                '2C - Prudente de Moraes/Ortomosaico.jpg'
            ],
            video: '2C - Prudente de Moraes/ReelsLote2.mp4',
            disponivel: true
        }
    ]
};

// Funções utilitárias
function getBairrosPorRegiao(regiao) {
    return portoVelhoData.regioes[regiao]?.bairros || [];
}

function getRegiaoPorBairro(bairro) {
    for (const [regiao, dados] of Object.entries(portoVelhoData.regioes)) {
        if (dados.bairros.includes(bairro)) {
            return regiao;
        }
    }
    return null;
}

function filtrarPropriedades(filtros) {
    return portoVelhoData.propriedades.filter(propriedade => {
        if (filtros.tipo && propriedade.tipo !== filtros.tipo) return false;
        if (filtros.bairro && propriedade.bairro !== filtros.bairro) return false;
        if (filtros.precoMin && propriedade.preco < filtros.precoMin) return false;
        if (filtros.precoMax && propriedade.preco > filtros.precoMax) return false;
        if (filtros.areaMin && propriedade.area < filtros.areaMin) return false;
        if (filtros.areaMax && propriedade.area > filtros.areaMax) return false;
        return true;
    });
}

function formatarPreco(preco) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(preco);
}

function formatarArea(area) {
    return `${area.toLocaleString('pt-BR')}m²`;
}

// Exportar para uso global
window.portoVelhoData = portoVelhoData;
window.getBairrosPorRegiao = getBairrosPorRegiao;
window.getRegiaoPorBairro = getRegiaoPorBairro;
window.filtrarPropriedades = filtrarPropriedades;
window.formatarPreco = formatarPreco;
window.formatarArea = formatarArea;
