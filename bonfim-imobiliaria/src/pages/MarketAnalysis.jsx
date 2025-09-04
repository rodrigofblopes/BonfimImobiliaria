import { useState, useEffect } from 'react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts'
import { 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Calendar, 
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon
} from 'lucide-react'

const MarketAnalysis = () => {
  const [filters, setFilters] = useState({
    propertyType: '',
    priceRange: '',
    period: '6m'
  })

  const [chartType, setChartType] = useState('bar')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  // Dados de exemplo para demonstração
  const sampleData = {
    neighborhoods: [
      { name: 'Nova Porto Velho', count: 15, avgPrice: 250, medianPrice: 240, minPrice: 180, maxPrice: 320, trend: 'up' },
      { name: 'Centro', count: 8, avgPrice: 550, medianPrice: 540, minPrice: 480, maxPrice: 620, trend: 'stable' },
      { name: 'São Cristóvão', count: 12, avgPrice: 200, medianPrice: 195, minPrice: 160, maxPrice: 250, trend: 'up' },
      { name: 'Cidade Nova', count: 20, avgPrice: 280, medianPrice: 275, minPrice: 220, maxPrice: 350, trend: 'up' },
      { name: 'Industrial', count: 6, avgPrice: 400, medianPrice: 395, minPrice: 350, maxPrice: 450, trend: 'stable' },
      { name: 'Jardim das Nações', count: 10, avgPrice: 320, medianPrice: 315, minPrice: 280, maxPrice: 380, trend: 'up' },
      { name: 'Trio Velho', count: 14, avgPrice: 180, medianPrice: 175, minPrice: 140, maxPrice: 220, trend: 'up' },
      { name: 'Areal', count: 18, avgPrice: 220, medianPrice: 215, minPrice: 180, maxPrice: 280, trend: 'stable' }
    ],
    priceEvolution: [
      { month: 'Jan', avgPrice: 240, transactions: 45 },
      { month: 'Fev', avgPrice: 245, transactions: 52 },
      { month: 'Mar', avgPrice: 250, transactions: 48 },
      { month: 'Abr', avgPrice: 255, transactions: 55 },
      { month: 'Mai', avgPrice: 260, transactions: 62 },
      { month: 'Jun', avgPrice: 265, transactions: 58 }
    ],
    propertyTypes: [
      { name: 'Terrenos', value: 65, color: '#1e3c72' },
      { name: 'Lotes', value: 35, color: '#ffd700' }
    ]
  }

  const generalStats = {
    totalProperties: 103,
    avgPriceGeneral: 265,
    medianPriceGeneral: 260,
    priceVariation: '+4.2%',
    mostExpensive: 'Centro',
    cheapest: 'Trio Velho',
    totalTransactions: 380,
    avgTransactionValue: 265000
  }

  useEffect(() => {
    setData(sampleData)
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const getChartComponent = () => {
    const chartData = filters.propertyType 
      ? data.neighborhoods?.filter(item => item.count > 0) || []
      : data.neighborhoods || []

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'avgPrice' ? formatPrice(value) : value,
                  name === 'avgPrice' ? 'Preço Médio/m²' : 'Quantidade'
                ]}
              />
              <Legend />
              <Bar dataKey="avgPrice" fill="#1e3c72" name="Preço Médio/m²" />
            </BarChart>
          </ResponsiveContainer>
        )
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data.priceEvolution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'avgPrice' ? formatPrice(value) : value,
                  name === 'avgPrice' ? 'Preço Médio/m²' : 'Transações'
                ]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="avgPrice" 
                stroke="#1e3c72" 
                strokeWidth={3}
                name="Preço Médio/m²"
              />
              <Line 
                type="monotone" 
                dataKey="transactions" 
                stroke="#ffd700" 
                strokeWidth={3}
                name="Transações"
              />
            </LineChart>
          </ResponsiveContainer>
        )
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'avgPrice' ? formatPrice(value) : value,
                  name === 'avgPrice' ? 'Preço Médio/m²' : 'Quantidade'
                ]}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="avgPrice" 
                stackId="1" 
                stroke="#1e3c72" 
                fill="#1e3c72" 
                fillOpacity={0.6}
                name="Preço Médio/m²"
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      
      default:
        return null
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-600 transform rotate-180" />
      default:
        return <TrendingUp className="h-4 w-4 text-gray-400" />
    }
  }

  const COLORS = ['#1e3c72', '#ffd700', '#ff6b35', '#EF4444', '#8B5CF6']

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title text-primary">
            Análise de Mercado Imobiliário
          </h1>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Dados atualizados sobre preços por m², tendências e estatísticas do mercado 
            de lotes e terrenos em Porto Velho, Rondônia.
          </p>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-text-light" />
              <span className="text-sm font-medium text-text-dark">Filtros:</span>
            </div>
            
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
              className="input-field"
            >
              <option value="">Todos os Tipos</option>
              <option value="Terreno">Terrenos</option>
              <option value="Lote">Lotes</option>
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="input-field"
            >
              <option value="">Todas as Faixas</option>
              <option value="low">Até R$ 200/m²</option>
              <option value="medium">R$ 200-400/m²</option>
              <option value="high">Acima de R$ 400/m²</option>
            </select>

            <select
              value={filters.period}
              onChange={(e) => setFilters({...filters, period: e.target.value})}
              className="input-field"
            >
              <option value="3m">Últimos 3 meses</option>
              <option value="6m">Últimos 6 meses</option>
              <option value="12m">Último ano</option>
            </select>

            <button
              onClick={() => setLoading(true)}
              className="btn-secondary flex items-center"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>

            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>
        </div>

        {/* General Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-light">Preço Médio Geral</p>
                <p className="text-2xl font-bold text-text-dark">{formatPrice(generalStats.avgPriceGeneral)}/m²</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600 font-medium">{generalStats.priceVariation}</span>
              <span className="text-sm text-text-light ml-1">vs mês anterior</span>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-light">Total de Imóveis</p>
                <p className="text-2xl font-bold text-text-dark">{generalStats.totalProperties}</p>
              </div>
              <MapPin className="h-8 w-8 text-secondary" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-text-light">Disponíveis para venda</span>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-light">Bairro Mais Caro</p>
                <p className="text-lg font-bold text-text-dark">{generalStats.mostExpensive}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-text-light">Maior valor por m²</span>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-light">Bairro Mais Barato</p>
                <p className="text-lg font-bold text-text-dark">{generalStats.cheapest}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-text-light">Menor valor por m²</span>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="card p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-2">Visualização dos Dados</h3>
              <p className="text-sm text-text-light">
                Escolha o tipo de gráfico para visualizar as informações de preços por bairro
              </p>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setChartType('bar')}
                className={`p-3 rounded-lg transition-colors ${
                  chartType === 'bar' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-text-dark hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`p-3 rounded-lg transition-colors ${
                  chartType === 'line' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-text-dark hover:bg-gray-200'
                }`}
              >
                <LineChartIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setChartType('area')}
                className={`p-3 rounded-lg transition-colors ${
                  chartType === 'area' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-text-dark hover:bg-gray-200'
                }`}
              >
                <PieChartIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="card p-6 mb-8">
          <h3 className="text-lg font-semibold text-text-dark mb-4">
            {chartType === 'line' ? 'Evolução Temporal dos Preços' : 'Preços por Bairro'}
          </h3>
          {getChartComponent()}
        </div>

        {/* Detailed Table */}
        <div className="card p-6 mb-8">
          <h3 className="text-lg font-semibold text-text-dark mb-4">
            Análise Detalhada por Bairro
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-primary-light">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Bairro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Quantidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Preço Médio/m²
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Mediana
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Faixa de Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Tendência
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {data.neighborhoods?.map((neighborhood, index) => (
                  <tr key={index} className="hover:bg-primary-light">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-dark">
                      {neighborhood.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light">
                      {neighborhood.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark font-medium">
                      {formatPrice(neighborhood.avgPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light">
                      {formatPrice(neighborhood.medianPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light">
                      {formatPrice(neighborhood.minPrice)} - {formatPrice(neighborhood.maxPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTrendIcon(neighborhood.trend)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Property Type Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-text-dark mb-4">
              Distribuição por Tipo de Imóvel
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.propertyTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.propertyTypes?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-text-dark mb-4">
              Metodologia da Análise
            </h3>
            <div className="space-y-4 text-sm text-text-light">
              <p>
                <strong>Coleta de Dados:</strong> Monitoramento contínuo de anúncios em plataformas 
                como VivaReal, Zap Imóveis e OLX, focando em lotes e terrenos em Porto Velho.
              </p>
              <p>
                <strong>Processamento:</strong> Limpeza automática de dados, remoção de outliers 
                usando método IQR, e cálculo de estatísticas robustas por bairro.
              </p>
              <p>
                <strong>Atualização:</strong> Dados atualizados semanalmente, com análise de 
                tendências mensais e sazonais.
              </p>
              <p>
                <strong>Precisão:</strong> Margem de erro estimada em ±5% para preços médios 
                e ±10% para estatísticas de bairros com menor volume de dados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketAnalysis
