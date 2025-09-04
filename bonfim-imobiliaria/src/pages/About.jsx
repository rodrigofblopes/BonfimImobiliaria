import { MapPin, Phone, Mail, Clock, Award, Users, Target, Shield, TrendingUp } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Transparência',
      description: 'Trabalhamos com total transparência em todas as transações, fornecendo informações claras e precisas sobre cada imóvel.'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Foco no Cliente',
      description: 'Nosso compromisso é entender as necessidades específicas de cada cliente e encontrar a solução ideal para seus projetos.'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Excelência',
      description: 'Buscamos constantemente a excelência em nossos serviços, oferecendo as melhores oportunidades de investimento e construção.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Confiança',
      description: 'Construímos relacionamentos duradouros baseados na confiança, ética e compromisso com nossos clientes.'
    }
  ]

  const team = [
    {
      name: 'Rodrigo F. B. Lopes',
      role: 'Engenheiro Civil e Corretor',
      description: 'Especialista em mercado imobiliário com mais de 10 anos de experiência em Porto Velho. Formado em Engenharia Civil pela UFRO.',
      contact: {
        phone: '(69) 99256-1830',
        email: 'engrodrigofblopes@gmail.com'
      }
    }
  ]

  const achievements = [
    {
      number: '100+',
      label: 'Clientes Atendidos',
      description: 'Famílias e investidores que confiaram em nossos serviços'
    },
    {
      number: '50+',
      label: 'Terrenos Vendidos',
      description: 'Lotes e terrenos comercializados com sucesso'
    },
    {
      number: '15+',
      label: 'Bairros Cobertos',
      description: 'Áreas de Porto Velho onde atuamos'
    },
    {
      number: '100%',
      label: 'Satisfação',
      description: 'Clientes satisfeitos com nossos serviços'
    }
  ]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-title text-primary">
            Sobre a Bonfim Imobiliária
          </h1>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Especialistas em lotes e terrenos em Porto Velho, Rondônia. 
            Nossa missão é conectar você ao terreno ideal para realizar seus sonhos.
          </p>
        </div>

        {/* Company Overview */}
        <div className="card p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-text-light">
                <p>
                  A Bonfim Imobiliária nasceu da paixão por Porto Velho e do desejo de 
                  oferecer um serviço diferenciado no mercado imobiliário local. 
                  Especializamo-nos em lotes e terrenos, entendendo que cada metro 
                  quadrado representa um sonho, um projeto ou um investimento.
                </p>
                <p>
                  Com anos de experiência no mercado de Rondônia, nossa equipe 
                  conhece profundamente cada bairro, suas características e potencial 
                  de desenvolvimento. Isso nos permite oferecer assessoria especializada 
                  e encontrar as melhores oportunidades para nossos clientes.
                </p>
                <p>
                  Acreditamos que Porto Velho tem um potencial imenso para crescimento, 
                  e queremos fazer parte dessa história, conectando pessoas aos lugares 
                  onde construirão seu futuro.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/BIMTECH.jpg"
                alt="Bonfim Imobiliária"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-4 rounded-lg shadow-lg">
                <p className="font-semibold">Porto Velho, RO</p>
                <p className="text-sm text-blue-100">Desde 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="gradient-primary text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
            <p className="text-blue-100 leading-relaxed">
              Facilitar o acesso a lotes e terrenos de qualidade em Porto Velho, 
              oferecendo assessoria especializada e transparente para que nossos 
              clientes realizem seus sonhos de construção e investimento com 
              segurança e confiança.
            </p>
          </div>
          <div className="bg-gray-900 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
            <p className="text-gray-300 leading-relaxed">
              Ser a imobiliária de referência em Porto Velho para lotes e terrenos, 
              reconhecida pela excelência no atendimento, transparência nas transações 
              e conhecimento profundo do mercado local.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="section-title text-primary">
            Nossos Valores
          </h2>
          <div className="features-grid">
            {values.map((value, index) => (
              <div key={index} className="text-center card p-6">
                <div className="text-secondary mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-text-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="section-title text-primary">
            Nossa Equipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-light to-primary-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-dark mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-text-light mb-4 leading-relaxed">
                  {member.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center text-text-light">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">{member.contact.phone}</span>
                  </div>
                  <div className="flex items-center justify-center text-text-light">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">{member.contact.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="section-title text-primary">
            Nossos Números
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="text-4xl font-bold text-secondary mb-2">
                  {achievement.number}
                </div>
                <h3 className="text-lg font-semibold text-text-dark mb-2">
                  {achievement.label}
                </h3>
                <p className="text-text-light text-sm">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Location and Contact */}
        <div className="card p-8 mb-16">
          <h2 className="section-title text-primary">
            Nossa Localização
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text-dark">Endereço</h3>
                    <p className="text-text-light">Rua México, 1604</p>
                    <p className="text-text-light">Porto Velho, Rondônia</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text-dark">Telefone</h3>
                    <p className="text-text-light">(69) 99256-1830</p>
                    <p className="text-text-light">WhatsApp disponível</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text-dark">Email</h3>
                    <p className="text-text-light">engrodrigofblopes@gmail.com</p>
                    <p className="text-text-light">Resposta em até 24h</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text-dark">Horário de Funcionamento</h3>
                    <p className="text-text-light">Segunda a Sexta: 8h às 18h</p>
                    <p className="text-text-light">Sábado: 8h às 12h</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-16 w-16 mx-auto mb-4" />
                <p>Mapa da Localização</p>
                <p className="text-sm">Rua México, 1604 - Porto Velho, RO</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="gradient-primary text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Pronto para encontrar seu terreno?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Nossa equipe está pronta para ajudá-lo a encontrar o terreno perfeito 
            para seu projeto ou investimento em Porto Velho.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/69992561830"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span className="mr-2">💬</span>
              WhatsApp
            </a>
            <a
              href="tel:69992561830"
              className="px-8 py-3 bg-white hover:bg-gray-100 text-primary font-medium rounded-lg transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Ligar Agora
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
