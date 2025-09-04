import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/BIMTECH.jpg"
                alt="Bonfim Imobiliária"
                className="h-12 w-auto rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-yellow-accent">Bonfim Imobiliária</h3>
                <p className="text-sm text-gray-400">Porto Velho, RO</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Especialistas em lotes e terrenos em Porto Velho. 
              Conectamos você ao terreno ideal para realizar seus sonhos.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-accent transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-accent transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/69992561830"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-accent transition-colors duration-300"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-accent mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-yellow-accent transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-yellow-accent transition-colors">
                  Propriedades
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-300 hover:text-yellow-accent transition-colors">
                  Buscar
                </Link>
              </li>
              <li>
                <Link to="/market-analysis" className="text-gray-300 hover:text-yellow-accent transition-colors">
                  Análise de Mercado
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-yellow-accent transition-colors">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-accent mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-yellow-accent mt-1" />
                <div>
                  <p className="text-gray-300">Rua México, 1604</p>
                  <p className="text-gray-300">Porto Velho, Rondônia</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-accent" />
                <div>
                  <p className="text-gray-300">(69) 99256-1830</p>
                  <p className="text-gray-400 text-sm">WhatsApp disponível</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-accent" />
                <div>
                  <p className="text-gray-300">engrodrigofblopes@gmail.com</p>
                  <p className="text-gray-400 text-sm">Resposta em até 24h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Horário de Atendimento */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-accent mb-4">Horário de Atendimento</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-yellow-accent" />
                <div>
                  <p className="text-gray-300">Segunda a Sexta</p>
                  <p className="text-gray-400 text-sm">8h às 18h</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-yellow-accent" />
                <div>
                  <p className="text-gray-300">Sábado</p>
                  <p className="text-gray-400 text-sm">8h às 12h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Bonfim Imobiliária. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-yellow-accent text-sm transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-accent text-sm transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer