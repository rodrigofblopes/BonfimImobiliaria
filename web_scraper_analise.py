#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sistema de Web Scraping e Análise Estatística de Preços de Imóveis
Bonfim Imobiliária - Porto Velho, RO

Funcionalidades:
- Web scraping de sites como VivaReal, Zap Imóveis, OLX
- Análise estatística com inferência
- Cálculo de preços médios por m² por bairro
- Geração de relatórios e gráficos
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json
import time
import random
from scipy import stats
import matplotlib.pyplot as plt
import seaborn as sns
from typing import Dict, List, Tuple, Optional
import logging

# Configuração de logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class WebScraperImoveis:
    """Classe principal para web scraping de imóveis"""
    
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
        
        # Bairros de Porto Velho para análise
        self.bairros_porto_velho = [
            'Centro', 'Nova Porto Velho', 'Trio', 'Caiari', 'Areal', 'Embratel',
            'Cidade Nova', 'Jardim América', 'Jardim Europa', 'Jardim Tropical',
            'Conjunto Habitacional Tancredo Neves', 'Conjunto Habitacional Marechal Rondon',
            'Conjunto Habitacional Marechal Castelo Branco', 'Conjunto Habitacional Marechal Cordeiro de Farias',
            'Conjunto Habitacional Marechal Costa e Silva', 'Conjunto Habitacional Marechal Deodoro',
            'Conjunto Habitacional Marechal Floriano Peixoto', 'Conjunto Habitacional Marechal Hermes',
            'Conjunto Habitacional Marechal Lott', 'Conjunto Habitacional Marechal Mascarenhas de Moraes',
            'Conjunto Habitacional Marechal Rondon', 'Conjunto Habitacional Marechal Castelo Branco',
            'Conjunto Habitacional Marechal Cordeiro de Farias', 'Conjunto Habitacional Marechal Costa e Silva',
            'Conjunto Habitacional Marechal Deodoro', 'Conjunto Habitacional Marechal Floriano Peixoto',
            'Conjunto Habitacional Marechal Hermes', 'Conjunto Habitacional Marechal Lott',
            'Conjunto Habitacional Marechal Mascarenhas de Moraes'
        ]
        
        # Dados coletados
        self.dados_imoveis = []
        
    def scrape_vivareal(self, bairro: str, tipo: str = 'terreno') -> List[Dict]:
        """Web scraping do VivaReal"""
        try:
            logger.info(f"Scraping VivaReal para {bairro} - {tipo}")
            
            # URL base do VivaReal para Porto Velho
            base_url = "https://www.vivareal.com.br/venda/ro/porto-velho"
            
            # Parâmetros de busca
            params = {
                'tipos': tipo,
                'bairros': bairro.lower().replace(' ', '-'),
                'precoMin': 0,
                'precoMax': 1000000
            }
            
            response = self.session.get(base_url, params=params, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            imoveis = []
            
            # Buscar cards de imóveis
            cards = soup.find_all('div', class_='property-card')
            
            for card in cards[:20]:  # Limitar a 20 resultados por bairro
                try:
                    # Extrair informações básicas
                    titulo = card.find('h2', class_='property-title')
                    titulo = titulo.text.strip() if titulo else "Sem título"
                    
                    # Extrair preço
                    preco_elem = card.find('span', class_='property-price')
                    if preco_elem:
                        preco_texto = preco_elem.text.strip()
                        preco = self.extrair_preco(preco_texto)
                    else:
                        preco = 0
                    
                    # Extrair área
                    area_elem = card.find('span', class_='property-area')
                    if area_elem:
                        area_texto = area_elem.text.strip()
                        area = self.extrair_area(area_texto)
                    else:
                        area = 0
                    
                    # Extrair localização
                    localizacao = card.find('span', class_='property-location')
                    localizacao = localizacao.text.strip() if localizacao else bairro
                    
                    # Calcular preço por m²
                    preco_m2 = preco / area if area > 0 else 0
                    
                    imovel = {
                        'titulo': titulo,
                        'preco': preco,
                        'area': area,
                        'preco_m2': preco_m2,
                        'bairro': bairro,
                        'tipo': tipo,
                        'fonte': 'VivaReal',
                        'data_coleta': datetime.now().isoformat(),
                        'localizacao': localizacao
                    }
                    
                    imoveis.append(imovel)
                    
                except Exception as e:
                    logger.warning(f"Erro ao processar card: {e}")
                    continue
            
            logger.info(f"VivaReal: {len(imoveis)} imóveis encontrados para {bairro}")
            return imoveis
            
        except Exception as e:
            logger.error(f"Erro no scraping VivaReal para {bairro}: {e}")
            return []
    
    def scrape_zap_imoveis(self, bairro: str, tipo: str = 'terreno') -> List[Dict]:
        """Web scraping do Zap Imóveis"""
        try:
            logger.info(f"Scraping Zap Imóveis para {bairro} - {tipo}")
            
            # URL base do Zap Imóveis para Porto Velho
            base_url = "https://www.zapimoveis.com.br/venda/terreno/ro/porto-velho"
            
            # Parâmetros de busca
            params = {
                'bairro': bairro,
                'tipo': tipo,
                'precoMin': 0,
                'precoMax': 1000000
            }
            
            response = self.session.get(base_url, params=params, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            imoveis = []
            
            # Buscar cards de imóveis
            cards = soup.find_all('div', class_='card-container')
            
            for card in cards[:20]:  # Limitar a 20 resultados por bairro
                try:
                    # Extrair informações básicas
                    titulo = card.find('h2', class_='card-title')
                    titulo = titulo.text.strip() if titulo else "Sem título"
                    
                    # Extrair preço
                    preco_elem = card.find('span', class_='card-price')
                    if preco_elem:
                        preco_texto = preco_elem.text.strip()
                        preco = self.extrair_preco(preco_texto)
                    else:
                        preco = 0
                    
                    # Extrair área
                    area_elem = card.find('span', class_='card-area')
                    if area_elem:
                        area_texto = area_elem.text.strip()
                        area = self.extrair_area(area_texto)
                    else:
                        area = 0
                    
                    # Extrair localização
                    localizacao = card.find('span', class_='card-location')
                    localizacao = localizacao.text.strip() if localizacao else bairro
                    
                    # Calcular preço por m²
                    preco_m2 = preco / area if area > 0 else 0
                    
                    imovel = {
                        'titulo': titulo,
                        'preco': preco,
                        'area': area,
                        'preco_m2': preco_m2,
                        'bairro': bairro,
                        'tipo': tipo,
                        'fonte': 'Zap Imóveis',
                        'data_coleta': datetime.now().isoformat(),
                        'localizacao': localizacao
                    }
                    
                    imoveis.append(imovel)
                    
                except Exception as e:
                    logger.warning(f"Erro ao processar card: {e}")
                    continue
            
            logger.info(f"Zap Imóveis: {len(imoveis)} imóveis encontrados para {bairro}")
            return imoveis
            
        except Exception as e:
            logger.error(f"Erro no scraping Zap Imóveis para {bairro}: {e}")
            return []
    
    def scrape_olx(self, bairro: str, tipo: str = 'terreno') -> List[Dict]:
        """Web scraping do OLX"""
        try:
            logger.info(f"Scraping OLX para {bairro} - {tipo}")
            
            # URL base do OLX para Porto Velho
            base_url = "https://ro.olx.com.br/porto-velho"
            
            # Parâmetros de busca
            params = {
                'q': f"{tipo} {bairro}",
                'c': 'real-estate',
                'sf': 1
            }
            
            response = self.session.get(base_url, params=params, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            imoveis = []
            
            # Buscar cards de imóveis
            cards = soup.find_all('div', class_='sc-1g4f7se-0')
            
            for card in cards[:20]:  # Limitar a 20 resultados por bairro
                try:
                    # Extrair informações básicas
                    titulo = card.find('h2', class_='sc-1g4f7se-0')
                    titulo = titulo.text.strip() if titulo else "Sem título"
                    
                    # Extrair preço
                    preco_elem = card.find('span', class_='sc-1g4f7se-0')
                    if preco_elem:
                        preco_texto = preco_elem.text.strip()
                        preco = self.extrair_preco(preco_texto)
                    else:
                        preco = 0
                    
                    # Extrair área (pode estar no título ou descrição)
                    area = self.extrair_area_do_texto(titulo)
                    
                    # Calcular preço por m²
                    preco_m2 = preco / area if area > 0 else 0
                    
                    imovel = {
                        'titulo': titulo,
                        'preco': preco,
                        'area': area,
                        'preco_m2': preco_m2,
                        'bairro': bairro,
                        'tipo': tipo,
                        'fonte': 'OLX',
                        'data_coleta': datetime.now().isoformat(),
                        'localizacao': bairro
                    }
                    
                    imoveis.append(imovel)
                    
                except Exception as e:
                    logger.warning(f"Erro ao processar card: {e}")
                    continue
            
            logger.info(f"OLX: {len(imoveis)} imóveis encontrados para {bairro}")
            return imoveis
            
        except Exception as e:
            logger.error(f"Erro no scraping OLX para {bairro}: {e}")
            return []
    
    def extrair_preco(self, texto: str) -> float:
        """Extrai preço de texto"""
        try:
            # Remove caracteres não numéricos exceto vírgula e ponto
            texto_limpo = ''.join(c for c in texto if c.isdigit() or c in ',.')
            
            # Substitui vírgula por ponto para conversão
            texto_limpo = texto_limpo.replace(',', '.')
            
            # Converte para float
            preco = float(texto_limpo)
            
            # Se o preço for muito baixo, pode estar em milhares
            if preco < 1000:
                preco *= 1000
                
            return preco
        except:
            return 0
    
    def extrair_area(self, texto: str) -> float:
        """Extrai área de texto"""
        try:
            # Busca por padrões de área (ex: 200m², 200 m², 200 metros)
            import re
            padrao = r'(\d+(?:[.,]\d+)?)\s*(?:m²|metros?|m2)'
            match = re.search(padrao, texto.lower())
            
            if match:
                area = float(match.group(1).replace(',', '.'))
                return area
            else:
                return 0
        except:
            return 0
    
    def extrair_area_do_texto(self, texto: str) -> float:
        """Extrai área do texto do título/descrição"""
        try:
            # Busca por padrões de área
            import re
            padrao = r'(\d+(?:[.,]\d+)?)\s*(?:m²|metros?|m2|m)'
            match = re.search(padrao, texto.lower())
            
            if match:
                area = float(match.group(1).replace(',', '.'))
                return area
            else:
                return 0
        except:
            return 0
    
    def coletar_dados_completos(self, tipos: List[str] = None) -> List[Dict]:
        """Coleta dados de todos os sites para todos os bairros"""
        if tipos is None:
            tipos = ['terreno', 'lote']
        
        logger.info("Iniciando coleta completa de dados...")
        
        for bairro in self.bairros_porto_velho:
            logger.info(f"Coletando dados para {bairro}")
            
            for tipo in tipos:
                # VivaReal
                imoveis_vr = self.scrape_vivareal(bairro, tipo)
                self.dados_imoveis.extend(imoveis_vr)
                
                # Zap Imóveis
                imoveis_zap = self.scrape_zap_imoveis(bairro, tipo)
                self.dados_imoveis.extend(imoveis_zap)
                
                # OLX
                imoveis_olx = self.scrape_olx(bairro, tipo)
                self.dados_imoveis.extend(imoveis_olx)
                
                # Pausa entre requisições para não sobrecarregar os servidores
                time.sleep(random.uniform(1, 3))
        
        logger.info(f"Coleta concluída. Total de {len(self.dados_imoveis)} imóveis coletados.")
        return self.dados_imoveis
    
    def salvar_dados(self, arquivo: str = 'dados_imoveis.json'):
        """Salva dados coletados em arquivo JSON"""
        try:
            with open(arquivo, 'w', encoding='utf-8') as f:
                json.dump(self.dados_imoveis, f, ensure_ascii=False, indent=2)
            logger.info(f"Dados salvos em {arquivo}")
        except Exception as e:
            logger.error(f"Erro ao salvar dados: {e}")
    
    def carregar_dados(self, arquivo: str = 'dados_imoveis.json'):
        """Carrega dados de arquivo JSON"""
        try:
            with open(arquivo, 'r', encoding='utf-8') as f:
                self.dados_imoveis = json.load(f)
            logger.info(f"Dados carregados de {arquivo}")
        except Exception as e:
            logger.error(f"Erro ao carregar dados: {e}")
            self.dados_imoveis = []

class AnaliseEstatistica:
    """Classe para análise estatística dos dados coletados"""
    
    def __init__(self, dados: List[Dict]):
        self.dados = dados
        self.df = pd.DataFrame(dados)
        
        # Limpar dados
        self.limpar_dados()
    
    def limpar_dados(self):
        """Remove dados inválidos e outliers"""
        # Remover registros sem preço ou área
        self.df = self.df.dropna(subset=['preco', 'area', 'preco_m2'])
        
        # Remover preços por m² muito baixos ou muito altos (outliers)
        Q1 = self.df['preco_m2'].quantile(0.25)
        Q3 = self.df['preco_m2'].quantile(0.75)
        IQR = Q3 - Q1
        
        limite_inferior = Q1 - 1.5 * IQR
        limite_superior = Q3 + 1.5 * IQR
        
        self.df = self.df[
            (self.df['preco_m2'] >= limite_inferior) & 
            (self.df['preco_m2'] <= limite_superior)
        ]
        
        logger.info(f"Dados limpos: {len(self.df)} registros válidos")
    
    def calcular_estatisticas_por_bairro(self) -> pd.DataFrame:
        """Calcula estatísticas por bairro"""
        stats_bairro = self.df.groupby('bairro').agg({
            'preco_m2': ['count', 'mean', 'median', 'std', 'min', 'max'],
            'preco': ['mean', 'median'],
            'area': ['mean', 'median']
        }).round(2)
        
        # Flatten column names
        stats_bairro.columns = ['_'.join(col).strip() for col in stats_bairro.columns]
        
        # Calcular intervalo de confiança (95%)
        stats_bairro['preco_m2_ic_inferior'] = stats_bairro['preco_m2_mean'] - 1.96 * stats_bairro['preco_m2_std'] / np.sqrt(stats_bairro['preco_m2_count'])
        stats_bairro['preco_m2_ic_superior'] = stats_bairro['preco_m2_mean'] + 1.96 * stats_bairro['preco_m2_std'] / np.sqrt(stats_bairro['preco_m2_count'])
        
        # Calcular variação percentual (se houver dados históricos)
        stats_bairro['variacao_percentual'] = 0  # Placeholder para dados históricos
        
        # Calcular tendência (baseado na mediana vs média)
        stats_bairro['tendencia'] = stats_bairro.apply(
            lambda x: 'Alta' if x['preco_m2_median'] > x['preco_m2_mean'] else 'Baixa', axis=1
        )
        
        return stats_bairro
    
    def calcular_estatisticas_gerais(self) -> Dict:
        """Calcula estatísticas gerais do mercado"""
        stats_gerais = {
            'total_imoveis': len(self.df),
            'preco_medio_geral': self.df['preco_m2'].mean(),
            'preco_mediano_geral': self.df['preco_m2'].median(),
            'desvio_padrao_geral': self.df['preco_m2'].std(),
            'preco_minimo': self.df['preco_m2'].min(),
            'preco_maximo': self.df['preco_m2'].max(),
            'area_media': self.df['area'].mean(),
            'area_mediana': self.df['area'].median()
        }
        
        # Calcular intervalo de confiança geral
        n = len(self.df)
        if n > 0:
            erro_padrao = self.df['preco_m2'].std() / np.sqrt(n)
            stats_gerais['ic_95_inferior'] = stats_gerais['preco_medio_geral'] - 1.96 * erro_padrao
            stats_gerais['ic_95_superior'] = stats_gerais['preco_medio_geral'] + 1.96 * erro_padrao
        
        return stats_gerais
    
    def identificar_bairros_extremos(self) -> Dict:
        """Identifica bairros com preços mais altos e mais baixos"""
        stats_bairro = self.calcular_estatisticas_por_bairro()
        
        # Bairro mais caro
        bairro_mais_caro = stats_bairro.loc[stats_bairro['preco_m2_mean'].idxmax()]
        
        # Bairro mais barato
        bairro_mais_barato = stats_bairro.loc[stats_bairro['preco_m2_mean'].idxmin()]
        
        return {
            'mais_caro': {
                'bairro': bairro_mais_caro.name,
                'preco_medio': bairro_mais_caro['preco_m2_mean'],
                'qtd_imoveis': bairro_mais_caro['preco_m2_count']
            },
            'mais_barato': {
                'bairro': bairro_mais_barato.name,
                'preco_medio': bairro_mais_barato['preco_m2_mean'],
                'qtd_imoveis': bairro_mais_barato['preco_m2_count']
            }
        }
    
    def gerar_relatorio_completo(self) -> Dict:
        """Gera relatório completo de análise"""
        relatorio = {
            'data_geracao': datetime.now().isoformat(),
            'estatisticas_gerais': self.calcular_estatisticas_gerais(),
            'estatisticas_por_bairro': self.calcular_estatisticas_por_bairro().to_dict('index'),
            'bairros_extremos': self.identificar_bairros_extremos(),
            'resumo_executivo': self.gerar_resumo_executivo()
        }
        
        return relatorio
    
    def gerar_resumo_executivo(self) -> str:
        """Gera resumo executivo da análise"""
        stats_gerais = self.calcular_estatisticas_gerais()
        bairros_extremos = self.identificar_bairros_extremos()
        
        resumo = f"""
        RESUMO EXECUTIVO - ANÁLISE DE MERCADO IMOBILIÁRIO - PORTO VELHO
        
        📊 ESTATÍSTICAS GERAIS:
        • Total de imóveis analisados: {stats_gerais['total_imoveis']:,}
        • Preço médio por m²: R$ {stats_gerais['preco_medio_geral']:.2f}
        • Preço mediano por m²: R$ {stats_gerais['preco_mediano_geral']:.2f}
        • Área média dos imóveis: {stats_gerais['area_media']:.1f} m²
        
        🏆 DESTAQUES:
        • Bairro mais caro: {bairros_extremos['mais_caro']['bairro']} (R$ {bairros_extremos['mais_caro']['preco_medio']:.2f}/m²)
        • Bairro mais barato: {bairros_extremos['mais_barato']['bairro']} (R$ {bairros_extremos['mais_barato']['preco_medio']:.2f}/m²)
        
        📈 INSIGHTS:
        • O mercado imobiliário de Porto Velho apresenta {len(self.df['bairro'].unique())} bairros com ofertas ativas
        • A variação de preços entre bairros é de {stats_gerais['preco_maximo'] - stats_gerais['preco_minimo']:.2f}%
        • Recomenda-se análise detalhada por bairro para investimentos específicos
        """
        
        return resumo
    
    def salvar_relatorio(self, arquivo: str = 'relatorio_mercado.json'):
        """Salva relatório em arquivo JSON"""
        try:
            relatorio = self.gerar_relatorio_completo()
            with open(arquivo, 'w', encoding='utf-8') as f:
                json.dump(relatorio, f, ensure_ascii=False, indent=2)
            logger.info(f"Relatório salvo em {arquivo}")
        except Exception as e:
            logger.error(f"Erro ao salvar relatório: {e}")

def main():
    """Função principal para execução do sistema"""
    logger.info("Iniciando sistema de análise de mercado imobiliário...")
    
    # Inicializar scraper
    scraper = WebScraperImoveis()
    
    # Coletar dados (ou carregar se já existirem)
    try:
        scraper.carregar_dados()
        logger.info("Dados carregados do arquivo existente")
    except:
        logger.info("Arquivo de dados não encontrado. Iniciando coleta...")
        scraper.coletar_dados_completos()
        scraper.salvar_dados()
    
    # Realizar análise estatística
    if scraper.dados_imoveis:
        analise = AnaliseEstatistica(scraper.dados_imoveis)
        
        # Gerar relatório
        relatorio = analise.gerar_relatorio_completo()
        analise.salvar_relatorio()
        
        # Exibir resumo
        print(analise.gerar_resumo_executivo())
        
        logger.info("Análise concluída com sucesso!")
    else:
        logger.warning("Nenhum dado disponível para análise")

if __name__ == "__main__":
    main()
