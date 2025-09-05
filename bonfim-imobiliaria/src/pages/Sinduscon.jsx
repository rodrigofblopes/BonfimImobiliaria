import { useState } from 'react'
import { Calculator, Building, Home, Info, ArrowRight, Download } from 'lucide-react'

const Sinduscon = () => {
  const [tipoSelecionado, setTipoSelecionado] = useState('residencial')
  const [metragem, setMetragem] = useState('')
  const [tipoConstrucao, setTipoConstrucao] = useState('')

  // Dados do CUB (baseados nos valores do ConectaPro)
  const dadosCUB = {
    residencial: {
      r1: { valor: 1850.45, descricao: "Casa popular (1 pavimento)" },
      r8: { valor: 2156.78, descricao: "Residência unifamiliar padrão" },
      r16: { valor: 2489.32, descricao: "Residência multifamiliar" }
    },
    comercial: {
      cs8: { valor: 2234.67, descricao: "Salas/Conjuntos comerciais" },
      cs16: { valor: 2567.89, descricao: "Lojas e sobrelojas" },
      galpao: { valor: 1678.23, descricao: "Galpões industriais" }
    }
  }

  const calcularCusto = (valorCUB) => {
    if (!metragem || parseFloat(metragem) <= 0) return null
    return valorCUB * parseFloat(metragem)
  }

  const getResultado = () => {
    if (!tipoConstrucao || !metragem) return null
    const valorCUB = dadosCUB[tipoSelecionado][tipoConstrucao]?.valor
    if (!valorCUB) return null
    return calcularCusto(valorCUB)
  }

  const resultado = getResultado()
  const materiais = resultado ? resultado * 0.55 : 0
  const maoDeObra = resultado ? resultado * 0.4 : 0

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-accent rounded-full flex items-center justify-center">
              <Calculator className="text-black text-xl" />
            </div>
            <h1 className="text-4xl font-bold text-black">
              Calculadora CUB Sinduscon
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calcule o custo da sua obra baseado nos valores oficiais do CUB (Custo Unitário Básico) 
            do Sinduscon-RO para Porto Velho
          </p>
        </div>

        {/* Card de Informações */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Info className="text-blue-600 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black">
                O que é o CUB?
              </h2>
              <p className="text-gray-600">
                Custo Unitário Básico - Referência oficial para construção civil
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800">📋 Definição:</h3>
              <p className="text-gray-600 leading-relaxed">
                O CUB é calculado mensalmente pelos Sinduscons e representa o custo 
                por metro quadrado de construção, incluindo materiais e mão de obra.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800">⚖️ Base Legal:</h3>
              <p className="text-gray-600 leading-relaxed">
                Estabelecido pela Lei 4.591/64 e NBR 12.721, é usado como referência 
                para financiamentos, contratos e avaliações imobiliárias.
              </p>
            </div>
          </div>
        </div>

        {/* Seletor de Tipo */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Selecione o Tipo de Construção
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => {
                setTipoSelecionado('residencial')
                setTipoConstrucao('')
                setMetragem('')
              }}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                tipoSelecionado === 'residencial'
                  ? 'border-yellow-accent bg-yellow-50 shadow-lg'
                  : 'border-gray-200 hover:border-yellow-accent'
              }`}
            >
              <Home className={`text-3xl mb-3 mx-auto ${
                tipoSelecionado === 'residencial' ? 'text-yellow-accent' : 'text-gray-400'
              }`} />
              <h3 className="font-bold text-lg mb-2">Residencial</h3>
              <p className="text-gray-600 text-sm">
                Casas, apartamentos e residências
              </p>
            </button>

            <button
              onClick={() => {
                setTipoSelecionado('comercial')
                setTipoConstrucao('')
                setMetragem('')
              }}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                tipoSelecionado === 'comercial'
                  ? 'border-yellow-accent bg-yellow-50 shadow-lg'
                  : 'border-gray-200 hover:border-yellow-accent'
              }`}
            >
              <Building className={`text-3xl mb-3 mx-auto ${
                tipoSelecionado === 'comercial' ? 'text-yellow-accent' : 'text-gray-400'
              }`} />
              <h3 className="font-bold text-lg mb-2">Comercial</h3>
              <p className="text-gray-600 text-sm">
                Lojas, escritórios e galpões
              </p>
            </button>
          </div>
        </div>

        {/* Cards de Tipos com Calculadora */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Valores CUB - {tipoSelecionado === 'residencial' ? 'Residencial' : 'Comercial'}
          </h2>
          
          <div className="grid gap-6">
            {Object.entries(dadosCUB[tipoSelecionado]).map(([tipo, dados]) => (
              <div key={tipo} className="rounded-2xl border-2 border-gray-200 p-6 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col gap-2 mb-4">
                      <span className="font-bold text-yellow-accent text-lg">{tipo.toUpperCase()}</span>
                      <span className="font-semibold text-gray-800">{dados.descricao}</span>
                      <span className="text-green-700 font-bold text-xl">
                        R$ {dados.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/m²
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">Metragem (m²):</label>
                      <input
                        type="number"
                        value={tipoConstrucao === tipo ? metragem : ''}
                        onChange={(e) => {
                          setMetragem(e.target.value)
                          setTipoConstrucao(tipo)
                        }}
                        placeholder="Ex: 120"
                        className="w-full p-3 border-2 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-yellow-accent"
                      />
                    </div>
                  </div>
                </div>
                
                {tipoConstrucao === tipo && metragem && parseFloat(metragem) > 0 && (
                  <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
                    <div className="font-bold text-green-600 text-xl mb-2">
                      Total: R$ {calcularCusto(dados.valor)?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Materiais:</span> R$ {materiais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (55%)
                      </div>
                      <div>
                        <span className="font-semibold">Mão de obra:</span> R$ {maoDeObra.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (40%)
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-sm text-yellow-800">
              <strong>📅 Referência:</strong> Maio 2025 | 
              <strong> 📍 Região:</strong> Porto Velho-RO | 
              <strong> 🏛️ Fonte:</strong> Sinduscon-RO
            </p>
          </div>
        </div>

        {/* Links para Documentos */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Documentos Oficiais
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="/sinduscon/documentos/cub0525onerado.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 border-2 border-gray-200 rounded-2xl hover:border-yellow-accent hover:shadow-lg transition-all duration-300"
            >
              <Download className="text-3xl text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2">CUB Onerado</h3>
              <p className="text-gray-600 text-sm">
                Valores com impostos incluídos
              </p>
            </a>

            <a
              href="/sinduscon/documentos/cub0525desonerado.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 border-2 border-gray-200 rounded-2xl hover:border-yellow-accent hover:shadow-lg transition-all duration-300"
            >
              <Download className="text-3xl text-green-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2">CUB Desonerado</h3>
              <p className="text-gray-600 text-sm">
                Valores sem impostos
              </p>
            </a>

            <a
              href="/sinduscon/documentos/Cartilha-Principais-Aspectos.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 border-2 border-gray-200 rounded-2xl hover:border-yellow-accent hover:shadow-lg transition-all duration-300"
            >
              <Download className="text-3xl text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2">Cartilha CUB</h3>
              <p className="text-gray-600 text-sm">
                Guia completo sobre CUB
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sinduscon
