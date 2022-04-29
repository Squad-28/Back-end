init-docker:
	docker-compose up -d --build
open-mysql:
	docker-compose exec mysql mysql -uroot --password=root
init-node-project:
	docker run -it -u node --workdir /app --rm -v $(pwd):/app node:16.14.2-alpine3.14 ash
open-backend: 
	docker-compose exec backend ash