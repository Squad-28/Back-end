echo "[DOCKER] criando network..."
docker network create --driver bridge squad_28_technical_share

echo "[DOCKER] criando volume..."
docker volume create --name=v_mysql

echo "[.ENV] criando volume..."
cp .env.example .env

echo "[DOCKER COMPOSE] iniciando os containers..."
docker-compose up -d

echo "[AGUARDANDO]..."
sleep 7

echo "[DOCKER COMPOSE] criando banco de dados..."
docker-compose exec mysql mysql -uroot --password=root -e 'CREATE DATABASE IF NOT EXISTS squad_28_technical_share;'

echo "[DOCKER COMPOSE] iniciando a API..."
docker-compose exec backend yarn dev

echo "[FIM]"