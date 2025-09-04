import { useState } from 'react'
import { MapPin, Home, Ruler, DollarSign, Phone, Mail, MessageCircle, Search, Filter } from 'lucide-react'

const Properties = () => {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const properties = [
    {
      id: 1,
      type: 'Terreno',
      title: 'Terreno Residencial - Bairro Nova Porto Velho',
      city: 'Porto Velho',
      neighborhood: 'Nova Porto Velho',
      price: 45000,
      area: 200,
      pricePerM2: 225,
      description: 'Terreno plano, ideal para construção residencial. Documentação regularizada, água e luz próximas. Localização estratégica com fácil acesso ao centro da cidade.',
      features: ['Plano', 'Documentação Regularizada', 'Água e Luz Próximas', 'Acesso Principal', 'Área Verde'],
      address: 'Rua das Palmeiras, 123 - Nova Porto Velho',
      contact: {
        phone: '(69) 99256-1830',
        whatsapp: '69992561830',
        email: 'engrodrigofblopes@gmail.com'
      },
      images: ['/terreno-1.jpg', '/terreno-1-2.jpg', '/terreno-1-3.jpg']
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
      description: 'Lote em localização estratégica, perfeito para comércio ou escritório. Alto fluxo de pessoas, próximo a pontos de ônibus e comércio estabelecido.',
      features: ['Localização Estratégica', 'Alto Fluxo', 'Documentação Regularizada', 'Próximo ao Comércio', 'Transporte Público'],
      address: 'Av. Sete de Setembro, 456 - Centro',
      contact: {
        phone: '(69) 99256-1830',
        whatsapp: '69992561830',
        email: 'engrodrigofblopes@gmail.com'
      },
      images: ['/lote-1.jpg', '/lote-1-2.jpg', '/lote-1-3.jpg']
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
      description: 'Terreno em bairro tranquilo, ideal para família. Ótima localização próxima a escolas, igreja e comércio local. Ambiente familiar e seguro.',
      features: ['Bairro Tranquilo', 'Escolas Próximas', 'Transporte Público', 'Igreja Próxima', 'Comércio Local'],
      address: 'Rua São José, 789 - São Cristóvão',
      contact: {
        phone: '(69) 99256-1830',
        whatsapp: '69992561830',
        email: 'engrodrigofblopes@gmail.com'
      },
      images: ['/terreno-2.jpg', '/terreno-2-2.jpg', '/terreno-2-3.jpg']
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
      description: 'Lote em bairro em desenvolvimento, excelente para investimento. Infraestrutura sendo implementada, potencial de valorização significativo.',
      features: ['Em Desenvolvimento', 'Potencial de Valorização', 'Documentação Regularizada', 'Infraestrutura em Andamento', 'Área Residencial'],
      address: 'Rua das Flores, 321 - Cidade Nova',
      contact: {
        phone: '(69) 99256-1830',
        whatsapp: '69992561830',
        email: 'engrodrigofblopes@gmail.com'
      },
      images: ['/lote-2.jpg', '/lote-2-2.jpg', '/lote-2-3.jpg']
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
      description: 'Terreno industrial com excelente acesso e infraestrutura. Ideal para galpões, depósitos ou indústrias. Zona industrial bem estabelecida.',
      features: ['Zona Industrial', 'Acesso Principal', 'Infraestrutura Completa', 'Área para Galpões', 'Logística Favorável'],
      address: 'Av. Industrial, 654 - Bairro Industrial',
      contact: {
        phone: '(69) 99256-1830',
        whatsapp: '69992561830',
        email: 'engrodrigofblopes@gmail.com'
      },
      images: ['/terreno-3.jpg', '/terreno-3-2.jpg', '/terreno-3-3.jpg']
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
      description: 'Lote em bairro nobre, ambiente familiar e seguro. Próximo a parques, áreas de lazer e com excelente infraestrutura urbana.',
      features: ['Bairro Nobre', 'Segurança', 'Área Verde', 'Parques Próximos', 'Infraestrutura Completa'],
      address: 'Rua das Nações, 987 - Jardim das Nações',
      contact: {
        phone: '(69) 99256-1830',
        whatsapp: '69992561830',
        email: 'engrodrigofblopes@gmail.com'
      },
      images: ['/lote-3.jpg', '/lote-3-2.jpg', '/lote-3-3.jpg']
    }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const openWhatsApp = (whatsapp, message) => {
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const openEmail = (email, subject, body) => {
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(url)
  }

  // Filtrar propriedades
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !selectedType || property.type === selectedType
    const matchesCity = !selectedCity || property.city === selectedCity
    return matchesSearch && matchesType && matchesCity
  })

  const uniqueTypes = [...new Set(properties.map(p => p.type))]
  const uniqueCities = [...new Set(properties.map(p => p.city))]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title text-primary">
            Lotes e Terrenos Disponíveis
          </h1>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Conheça nossa seleção de lotes e terrenos em Porto Velho. 
            Todos com documentação regularizada e localizações estratégicas.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-card rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-light" />
              <input
                type="text"
                placeholder="Buscar por nome ou bairro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field w-full pl-10"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field"
            >
              <option value="">Tipo de Imóvel</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="input-field"
            >
              <option value="">Cidade</option>
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <button className="btn-secondary flex items-center justify-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtrar
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="properties-grid mb-12">
          {filteredProperties.map(property => (
            <div key={property.id} className="card overflow-hidden">
              {/* Property Image */}
              <div className="h-64 bg-gradient-to-br from-primary-light to-primary-200 flex items-center justify-center relative">
                <Home className="h-20 w-20 text-primary" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                    {property.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                    Disponível
                  </span>
                </div>
              </div>

              {/* Property Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-text-dark">
                    {property.title}
                  </h3>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(property.price)}
                  </span>
                </div>

                <div className="flex items-center text-text-light mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{property.address}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-text-light">
                    <Ruler className="h-4 w-4 mr-2" />
                    <span className="text-sm">{property.area}m²</span>
                  </div>
                  <div className="text-sm text-text-light">
                    R$ {property.pricePerM2}/m²
                  </div>
                </div>

                <p className="text-text-light text-sm mb-4 line-clamp-3">
                  {property.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {property.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-primary-light text-primary text-xs rounded">
                      {feature}
                    </span>
                  ))}
                  {property.features.length > 3 && (
                    <span className="px-2 py-1 bg-secondary text-text-dark text-xs rounded">
                      +{property.features.length - 3} mais
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedProperty(property)}
                    className="btn-secondary flex-1"
                  >
                    Ver Detalhes
                  </button>
                  <button
                    onClick={() => openWhatsApp(property.contact.whatsapp, `Olá! Gostaria de saber mais sobre o ${property.type} em ${property.neighborhood}`)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="gradient-primary text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Nossa equipe está sempre buscando novas oportunidades. Entre em contato 
            e conte-nos sobre suas necessidades específicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/69992561830"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp
            </a>
            <a
              href="tel:69992561830"
              className="px-6 py-3 bg-white text-primary hover:bg-gray-100 font-medium rounded-lg transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Ligar
            </a>
            <button
              onClick={() => openEmail('engrodrigofblopes@gmail.com', 'Consulta sobre Lotes e Terrenos', 'Olá! Gostaria de saber mais sobre lotes e terrenos disponíveis em Porto Velho.')}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              Email
            </button>
          </div>
        </div>
      </div>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-text-dark">
                  {selectedProperty.title}
                </h2>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="text-text-light hover:text-text-dark text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Property Images */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {selectedProperty.images.map((image, index) => (
                  <div key={index} className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Home className="h-8 w-8 text-gray-400" />
                  </div>
                ))}
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-dark mb-3">Informações do Imóvel</h3>
                  <div className="space-y-2 text-sm text-text-light">
                    <div className="flex justify-between">
                      <span>Tipo:</span>
                      <span className="font-medium">{selectedProperty.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Área:</span>
                      <span className="font-medium">{selectedProperty.area}m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Preço por m²:</span>
                      <span className="font-medium">R$ {selectedProperty.pricePerM2}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Preço Total:</span>
                      <span className="font-medium text-primary">{formatPrice(selectedProperty.price)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-text-dark mb-3">Localização</h3>
                  <div className="space-y-2 text-sm text-text-light">
                    <div className="flex justify-between">
                      <span>Cidade:</span>
                      <span className="font-medium">{selectedProperty.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bairro:</span>
                      <span className="font-medium">{selectedProperty.neighborhood}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Endereço:</span>
                      <span className="font-medium">{selectedProperty.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-dark mb-3">Descrição</h3>
                <p className="text-text-light">{selectedProperty.description}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-dark mb-3">Características</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProperty.features.map((feature, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-light text-primary text-sm rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-text-dark mb-4">Entre em Contato</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => openWhatsApp(selectedProperty.contact.whatsapp, `Olá! Gostaria de saber mais sobre o ${selectedProperty.type} em ${selectedProperty.neighborhood}`)}
                    className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => openEmail('engrodrigofblopes@gmail.com', `Consulta sobre ${selectedProperty.type} em ${selectedProperty.neighborhood}`, `Olá! Gostaria de saber mais sobre o ${selectedProperty.type} em ${selectedProperty.neighborhood}. Preço: ${formatPrice(selectedProperty.price)}. Área: ${selectedProperty.area}m².`)}
                    className="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Email
                  </button>
                  <a
                    href={`tel:${selectedProperty.contact.phone}`}
                    className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Ligar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Properties
