import { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Home, DollarSign, Ruler } from 'lucide-react'

const SearchProperties = () => {
  const [filters, setFilters] = useState({
    type: '',
    city: '',
    neighborhood: '',
    priceRange: '',
    area: ''
  })

  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // Dados de exemplo
  const sampleProperties = [
    {
      id: 1,
      type: 'Terreno',
      title: 'Terreno Residencial - Bairro Nova Porto Velho',
      city: 'Porto Velho',
      neighborhood: 'Nova Porto Velho',
      price: 45000,
      area: 200,
      pricePerM2: 225,
      description: 'Terreno plano, ideal para construção residencial. Documentação regularizada.',
      features: ['Plano', 'Documentação Regularizada', 'Água e Luz Próximas'],
      image: '/terreno-1.jpg'
    },
    {
      id: 2,
      type: 'Lote',
      title: 'Lote Comercial - Centro',
      city: 'Porto Velho',
      neighborhood: 'Centro',
      price: 80000,
      area: 150,
      pricePerM2: 533,
      description: 'Lote em localização estratégica, perfeito para comércio ou escritório.',
      features: ['Localização Estratégica', 'Alto Fluxo', 'Documentação Regularizada'],
      image: '/lote-1.jpg'
    },
    {
      id: 3,
      type: 'Terreno',
      title: 'Terreno Residencial - Bairro São Cristóvão',
      city: 'Porto Velho',
      neighborhood: 'São Cristóvão',
      price: 35000,
      area: 180,
      pricePerM2: 194,
      description: 'Terreno em bairro tranquilo, ideal para família. Ótima localização.',
      features: ['Bairro Tranquilo', 'Escolas Próximas', 'Transporte Público'],
      image: '/terreno-2.jpg'
    },
    {
      id: 4,
      type: 'Lote',
      title: 'Lote Residencial - Bairro Cidade Nova',
      city: 'Porto Velho',
      neighborhood: 'Cidade Nova',
      price: 55000,
      area: 220,
      pricePerM2: 250,
      description: 'Lote em bairro em desenvolvimento, excelente para investimento.',
      features: ['Em Desenvolvimento', 'Potencial de Valorização', 'Documentação Regularizada'],
      image: '/lote-2.jpg'
    },
    {
      id: 5,
      type: 'Terreno',
      title: 'Terreno Comercial - Bairro Industrial',
      city: 'Porto Velho',
      neighborhood: 'Industrial',
      price: 120000,
      area: 300,
      pricePerM2: 400,
      description: 'Terreno industrial com excelente acesso e infraestrutura.',
      features: ['Zona Industrial', 'Acesso Principal', 'Infraestrutura Completa'],
      image: '/terreno-3.jpg'
    },
    {
      id: 6,
      type: 'Lote',
      title: 'Lote Residencial - Bairro Jardim das Nações',
      city: 'Porto Velho',
      neighborhood: 'Jardim das Nações',
      price: 42000,
      area: 160,
      pricePerM2: 262,
      description: 'Lote em bairro nobre, ambiente familiar e seguro.',
      features: ['Bairro Nobre', 'Segurança', 'Área Verde'],
      image: '/lote-3.jpg'
    }
  ]

  useEffect(() => {
    setProperties(sampleProperties)
    setFilteredProperties(sampleProperties)
  }, [])

  const cities = ['Porto Velho']
  const neighborhoods = {
    'Porto Velho': [
      'Nova Porto Velho',
      'Centro',
      'São Cristóvão',
      'Cidade Nova',
      'Industrial',
      'Jardim das Nações',
      'Trio Velho',
      'Areal',
      'Caiari',
      'Embratel',
      'Flodoaldo Pontes Pinto',
      'Nossa Senhora das Graças',
      'Nossa Senhora de Fátima',
      'Olaria',
      'Pedrinhas',
      'Santa Bárbara',
      'São João Bosco',
      'Tiradentes',
      'Vila Princesa'
    ]
  }

  const priceRanges = [
    'Até R$ 30.000',
    'R$ 30.000 - R$ 50.000',
    'R$ 50.000 - R$ 80.000',
    'R$ 80.000 - R$ 120.000',
    'Acima de R$ 120.000'
  ]

  const areaRanges = [
    'Até 150m²',
    '150m² - 200m²',
    '200m² - 300m²',
    '300m² - 500m²',
    'Acima de 500m²'
  ]

  const applyFilters = () => {
    let filtered = properties.filter(property => {
      // Filtro por tipo
      if (filters.type && property.type !== filters.type) return false
      
      // Filtro por cidade
      if (filters.city && property.city !== filters.city) return false
      
      // Filtro por bairro
      if (filters.neighborhood && property.neighborhood !== filters.neighborhood) return false
      
      // Filtro por faixa de preço
      if (filters.priceRange) {
        const [min, max] = getPriceRange(filters.priceRange)
        if (property.price < min || property.price > max) return false
      }
      
      // Filtro por área
      if (filters.area) {
        const [min, max] = getAreaRange(filters.area)
        if (property.area < min || property.area > max) return false
      }
      
      // Filtro por termo de busca
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        return (
          property.title.toLowerCase().includes(searchLower) ||
          property.description.toLowerCase().includes(searchLower) ||
          property.neighborhood.toLowerCase().includes(searchLower)
        )
      }
      
      return true
    })
    
    setFilteredProperties(filtered)
  }

  const getPriceRange = (range) => {
    switch (range) {
      case 'Até R$ 30.000': return [0, 30000]
      case 'R$ 30.000 - R$ 50.000': return [30000, 50000]
      case 'R$ 50.000 - R$ 80.000': return [50000, 80000]
      case 'R$ 80.000 - R$ 120.000': return [80000, 120000]
      case 'Acima de R$ 120.000': return [120000, Infinity]
      default: return [0, Infinity]
    }
  }

  const getAreaRange = (range) => {
    switch (range) {
      case 'Até 150m²': return [0, 150]
      case '150m² - 200m²': return [150, 200]
      case '200m² - 300m²': return [200, 300]
      case '300m² - 500m²': return [300, 500]
      case 'Acima de 500m²': return [500, Infinity]
      default: return [0, Infinity]
    }
  }

  const clearFilters = () => {
    setFilters({
      type: '',
      city: '',
      neighborhood: '',
      priceRange: '',
      area: ''
    })
    setSearchTerm('')
    setFilteredProperties(properties)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  useEffect(() => {
    applyFilters()
  }, [filters, searchTerm])

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title text-primary">
            Buscar Terrenos
          </h1>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            Encontre o terreno ideal com nossos filtros avançados. 
            Especialistas em lotes e terrenos em Porto Velho.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar por título, descrição ou bairro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field w-full pl-10"
              />
            </div>

            {/* Filter Button */}
            <div className="flex items-center justify-end">
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors mr-4"
              >
                Limpar Filtros
              </button>
              <button className="btn-secondary flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtros
              </button>
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
            {/* Tipo de Imóvel */}
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="input-field"
            >
              <option value="">Tipo de Imóvel</option>
              <option value="Terreno">Terreno</option>
              <option value="Lote">Lote</option>
            </select>

            {/* Cidade */}
            <select
              value={filters.city}
              onChange={(e) => setFilters({...filters, city: e.target.value, neighborhood: ''})}
              className="input-field"
            >
              <option value="">Cidade</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {/* Bairro */}
            <select
              value={filters.neighborhood}
              onChange={(e) => setFilters({...filters, neighborhood: e.target.value})}
              className="input-field"
              disabled={!filters.city}
            >
              <option value="">Bairro</option>
              {filters.city && neighborhoods[filters.city]?.map(neighborhood => (
                <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
              ))}
            </select>

            {/* Faixa de Preço */}
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="input-field"
            >
              <option value="">Faixa de Preço</option>
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>

            {/* Área */}
            <select
              value={filters.area}
              onChange={(e) => setFilters({...filters, area: e.target.value})}
              className="input-field"
            >
              <option value="">Área</option>
              {areaRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-text-dark">
              Resultados ({filteredProperties.length})
            </h2>
            <div className="text-sm text-text-light">
              {filteredProperties.length > 0 ? 'Terrenos encontrados' : 'Nenhum terreno encontrado'}
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <Home className="h-16 w-16 text-text-light mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-dark mb-2">
                Nenhum terreno encontrado
              </h3>
              <p className="text-text-light mb-4">
                Tente ajustar os filtros ou entre em contato conosco.
              </p>
              <a
                href="https://wa.me/69992561830"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span className="mr-2">💬</span>
                WhatsApp
              </a>
            </div>
          ) : (
            <div className="properties-grid">
              {filteredProperties.map(property => (
                <div key={property.id} className="card overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-primary-light to-primary-200 flex items-center justify-center">
                    <Home className="h-16 w-16 text-primary" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                        {property.type}
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-text-dark mb-2">
                      {property.title}
                    </h3>
                    
                    <div className="flex items-center text-text-light mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.neighborhood}, {property.city}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-text-light">
                        <Ruler className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.area}m²</span>
                      </div>
                      <div className="text-sm text-text-light">
                        R$ {property.pricePerM2}/m²
                      </div>
                    </div>
                    
                    <p className="text-text-light text-sm mb-4 line-clamp-2">
                      {property.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-primary-light text-primary text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="btn-secondary flex-1">
                        Ver Detalhes
                      </button>
                      <a
                        href={`https://wa.me/69992561830?text=Olá! Gostaria de saber mais sobre o ${property.type} em ${property.neighborhood}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        💬
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchProperties
