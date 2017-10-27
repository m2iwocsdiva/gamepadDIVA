# ProjectD

FROM debian
#COPY ./public-html/ /usr/local/apache2/htdocs/

# INSTALL base
RUN apt-get update
RUN apt-get -y install php-cli curl gnupg2

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get -y install nodejs

#Diva
RUN mkdir -p /var/www/html
COPY ./ProjectD /var/www/html

#Node.js
RUN npm install /var/www/html/script johnny-five express http socket.io fs

EXPOSE 80

RUN echo '#!/bin/bash \nphp -S 0.0.0.0:80 & \nnode /var/www/html/script/node-arduino.js' >> /init.sh
RUN chmod 777 init.sh

WORKDIR /var/www/html
CMD /init.sh
