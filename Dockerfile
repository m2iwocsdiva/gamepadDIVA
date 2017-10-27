# ProjectD

FROM debian
#COPY ./public-html/ /usr/local/apache2/htdocs/

# INSTALL base
RUN apt-get update
# RUN apt-get -y install git apache2
RUN apt-get -y install php-cli
RUN apt-get install -y nodejs
# javascript-common

#Diva

RUN mkdir -p /var/www/html
COPY ./ProjectD /var/www/html
RUN ls /var/www/html

# /etc/init.d/apache2 start

EXPOSE 80
# CMD /etc/init.d/apache2 start
WORKDIR /var/www/html
CMD php -S 0.0.0.0:80
