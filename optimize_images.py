#!/usr/bin/env python3
"""
Script para otimizar imagens do site da imobiliária
Reduz o tamanho das imagens mantendo a qualidade visual
"""

import os
from PIL import Image
import shutil

def optimize_image(input_path, output_path, quality=85, max_width=1920):
    """
    Otimiza uma imagem reduzindo seu tamanho e qualidade
    """
    try:
        with Image.open(input_path) as img:
            # Converter para RGB se necessário
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Redimensionar se muito grande
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Salvar com compressão otimizada
            img.save(output_path, 'JPEG', quality=quality, optimize=True, progressive=True)
            
            # Calcular redução
            original_size = os.path.getsize(input_path)
            new_size = os.path.getsize(output_path)
            reduction = ((original_size - new_size) / original_size) * 100
            
            print(f"✅ {os.path.basename(input_path)}: {original_size/1024/1024:.1f}MB → {new_size/1024/1024:.1f}MB ({reduction:.1f}% redução)")
            
    except Exception as e:
        print(f"❌ Erro ao otimizar {input_path}: {e}")

def create_backup():
    """Cria backup das imagens originais"""
    backup_dir = "public/backup_original_images"
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)
        print(f"📁 Criado diretório de backup: {backup_dir}")
    
    # Copiar imagens originais para backup
    for root, dirs, files in os.walk("public"):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                src = os.path.join(root, file)
                rel_path = os.path.relpath(src, "public")
                dst = os.path.join(backup_dir, rel_path)
                
                # Criar diretório se não existir
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                
                if not os.path.exists(dst):
                    shutil.copy2(src, dst)
                    print(f"💾 Backup: {rel_path}")

def optimize_all_images():
    """Otimiza todas as imagens do site"""
    print("🚀 Iniciando otimização de imagens...")
    
    # Criar backup primeiro
    create_backup()
    
    # Lista de imagens para otimizar com configurações específicas
    images_to_optimize = [
        # Imagens dos lotes (qualidade alta, mas comprimida)
        ("public/1C - Prudente de Moraes/fotolote1.JPG", "public/1C - Prudente de Moraes/fotolote1_optimized.jpg", 80),
        ("public/1C - Prudente de Moraes/fotolote2.JPG", "public/1C - Prudente de Moraes/fotolote2_optimized.jpg", 80),
        ("public/2C - Prudente de Moraes/1.JPG", "public/2C - Prudente de Moraes/1_optimized.jpg", 80),
        ("public/2C - Prudente de Moraes/2.JPG", "public/2C - Prudente de Moraes/2_optimized.jpg", 80),
        
        # Ortomosaicos (qualidade média, redimensionar)
        ("public/1C - Prudente de Moraes/Ortomosaico.jpg", "public/1C - Prudente de Moraes/Ortomosaico_optimized.jpg", 70, 1200),
        ("public/2C - Prudente de Moraes/Ortomosaico.jpg", "public/2C - Prudente de Moraes/Ortomosaico_optimized.jpg", 70, 1200),
        
        # Logo (qualidade alta, pequeno)
        ("public/BIMTECH.jpg", "public/BIMTECH_optimized.jpg", 90),
    ]
    
    for image_config in images_to_optimize:
        input_path = image_config[0]
        output_path = image_config[1]
        quality = image_config[2]
        max_width = image_config[3] if len(image_config) > 3 else 1920
        
        if os.path.exists(input_path):
            optimize_image(input_path, output_path, quality, max_width)
        else:
            print(f"⚠️  Arquivo não encontrado: {input_path}")
    
    print("\n✨ Otimização concluída!")
    print("\n📋 Próximos passos:")
    print("1. Teste as imagens otimizadas no site")
    print("2. Se estiver satisfeito, substitua as originais pelas otimizadas")
    print("3. Atualize os caminhos no HTML se necessário")

if __name__ == "__main__":
    optimize_all_images()
