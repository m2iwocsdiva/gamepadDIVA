# ProjectD
# docker run -ti --privileged --device=/dev/ttyACM0 -p 8001:80 -p 3000:3000 -p 8000:8000 diva

FROM node
RUN apt-get update
RUN apt-get -y install apache2

RUN mkdir -p /var/www/html
COPY ./ProjectD /var/www/html

#Node.js
WORKDIR "/var/www/html/script"
RUN npm install

WORKDIR "/"
RUN echo '#!/bin/bash \nchmod 666 /dev/ttyACM0 \n/etc/init.d/apache2 start \nchmod -R 777 /var/www/html \ncd /var/www/html/script/ \nnode node-arduino.js \n/bin/bash ' >> /init.sh
RUN chmod 777 init.sh

EXPOSE 80 3000 8000

USER root

WORKDIR /var/www/html
CMD /init.sh
