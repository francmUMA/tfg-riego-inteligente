#!/bin/bash
sudo apt-get install cmake nodejs npm
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh # Pulsar 1 - Instalación estándar de Rust
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash # Instalación de NVM
source ~/.bashrc # Cargar NVM
nvm install 22 # Instalación de Node.js
#----------------------------------------
cd tfg-riego-inteligente/backend
npm install # Instalación de dependencias de backend
cd ..
cd tf-riego-inteligente/raspberry
touch broker.config
echo "broker_ip":"192.168.191.98" > broker.config
cargo build # Compilación de la aplicación