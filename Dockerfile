FROM node:20.5.1

LABEL author='tae'

COPY . var/www
WORKDIR /var/www

VOLUME [ "/var/www" ]

EXPOSE 8000

ENTRYPOINT ["npm","run","start:dev"]
