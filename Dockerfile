# ProjectD

FROM debian
#COPY ./public-html/ /usr/local/apache2/htdocs/

# INSTALL base
RUN apt-get update
RUN apt-get -y install php-cli
RUN apt-get install -y nodejs npm
# javascript-common

#Diva
RUN mkdir -p /var/www/html
COPY ./ProjectD /var/www/html

#Node.js
RUN cd /var/www/html/script
RUN npm init

EXPOSE 80

WORKDIR /var/www/html
CMD php -S 0.0.0.0:80
CMD node /var/www/html/script/node-arduino.js
