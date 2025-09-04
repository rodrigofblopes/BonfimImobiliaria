import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Home as HomeIcon, Ruler, DollarSign, Phone, Mail, MessageCircle, Star, Shield, Users, Award, ChevronRight } from 'lucide-react'

const Home = () => {
  const [searchForm, setSearchForm] = useState({
    type: '',
    city: '',
    neighborhood: '',
    minPrice: '',
    maxPrice: ''
  })

  const handleSearchChange = (e) => {
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Implementar lógica de busca
    console.log('Buscar:', searchForm)
  }

  // Dados de exemplo das propriedades em destaque
  const featuredProperties = [
    {
      id: 1,
      title: "Terreno Residencial - Nova Porto Velho",
      price: 45000,
      area: 200,
      pricePerM2: 225,
      neighborhood: "Nova Porto Velho",
      type: "Terreno",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Lote Comercial - Centro",
      price: 80000,
      area: 150,
      pricePerM2: 533,
      neighborhood: "Centro",
      type: "Lote",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Terreno Residencial - São Cristóvão",
      price: 35000,
      area: 180,
      pricePerM2: 194,
      neighborhood: "São Cristóvão",
      type: "Terreno",
      image: "/api/placeholder/300/200"
    }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section com imagem de fundo */}
      <section className="relative h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-yellow-accent">
              Faça sua busca online
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-200">
              Encontre o terreno ideal em Porto Velho, Rondônia
            </p>
            
            {/* Formulário de busca no hero */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <select
                    name="type"
                    value={searchForm.type}
                    onChange={handleSearchChange}
                    className="w-full p-4 rounded-lg bg-white bg-opacity-90 text-black border-0 focus:ring-2 focus:ring-yellow-accent"
                  >
                    <option value="">Tipo de Imóvel</option>
                    <option value="terreno">Terreno</option>
                    <option value="lote">Lote</option>
                  </select>
                </div>

                <div>
                  <select
                    name="city"
                    value={searchForm.city}
                    onChange={handleSearchChange}
                    className="w-full p-4 rounded-lg bg-white bg-opacity-90 text-black border-0 focus:ring-2 focus:ring-yellow-accent"
                  >
                    <option value="">Cidade</option>
                    <option value="porto-velho">Porto Velho</option>
                  </select>
                </div>

                <div>
                  <select
                    name="neighborhood"
                    value={searchForm.neighborhood}
                    onChange={handleSearchChange}
                    className="w-full p-4 rounded-lg bg-white bg-opacity-90 text-black border-0 focus:ring-2 focus:ring-yellow-accent"
                  >
                    <option value="">Bairro</option>
                    <option value="centro">Centro</option>
                    <option value="nova-porto-velho">Nova Porto Velho</option>
                    <option value="sao-cristovao">São Cristóvão</option>
                    <option value="cidade-nova">Cidade Nova</option>
                  </select>
                </div>

                <div>
                  <button type="submit" className="w-full p-4 bg-yellow-accent text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center">
                    <Search className="h-5 w-5 mr-2" />
                    Buscar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Destaques */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-black">
              Destaques
            </h2>
            <Link to="/properties" className="text-yellow-accent hover:text-yellow-400 font-medium flex items-center">
              Ver mais <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <HomeIcon className="h-16 w-16 text-gray-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-yellow-accent text-black text-sm font-medium rounded-full">
                      {property.type}
                    </span>
                    <span className="text-2xl font-bold text-black">
                      {formatPrice(property.price)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.neighborhood}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600">
                      <Ruler className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.area}m²</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      R$ {property.pricePerM2}/m²
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
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
        </div>
      </section>

      {/* Seção de Imagem Promocional */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Realize o Sonho da Casa Própria
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Encontre o terreno perfeito para construir sua casa dos sonhos em Porto Velho
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/69992561830"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-yellow-accent text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                <MessageCircle className="h-5 w-5 mr-2 inline" />
                Fale Conosco
              </a>
              <Link to="/about" className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black font-medium rounded-lg transition-colors">
                Conheça Nossa História
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Por que Escolher a Bonfim Imobiliária?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Especialistas em lotes e terrenos com anos de experiência no mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-yellow-accent mb-4 flex justify-center">
                <Shield className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">
                Documentação Regularizada
              </h3>
              <p className="text-gray-600">
                Todos os nossos imóveis possuem documentação em dia e regularizada
              </p>
            </div>

            <div className="text-center">
              <div className="text-yellow-accent mb-4 flex justify-center">
                <MapPin className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">
                Localizações Estratégicas
              </h3>
              <p className="text-gray-600">
                Terrenos em bairros com infraestrutura e potencial de valorização
              </p>
            </div>

            <div className="text-center">
              <div className="text-yellow-accent mb-4 flex justify-center">
                <Users className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">
                Atendimento Especializado
              </h3>
              <p className="text-gray-600">
                Equipe experiente pronta para ajudar você a encontrar o imóvel ideal
              </p>
            </div>

            <div className="text-center">
              <div className="text-yellow-accent mb-4 flex justify-center">
                <Award className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">
                Transparência Total
              </h3>
              <p className="text-gray-600">
                Informações claras e precisas sobre cada propriedade
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home