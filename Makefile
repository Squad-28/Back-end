dk-open-mysql:
	docker-compose exec mysql mysql -uroot --password=root
dk-init-node:
	docker run -it -u node --workdir /app --rm -v $(pwd):/app node:16.14.2-alpine3.14 ash
dk-backend:
	docker-compose exec backend ash