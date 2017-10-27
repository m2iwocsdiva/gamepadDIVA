# ProjectD

FROM debian
#COPY ./public-html/ /usr/local/apache2/htdocs/

# INSTALL base
RUN apt-get update
RUN apt-get -y install git apache2
#curl apt-transport-https
#RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs


#Diva
RUN rm /var/www/html/index.html

COPY ProjectD/* /var/www/html/

#RUN mkdir tmpGit
#RUN cd tmpGit
#RUN git clone https://github.com/m2iwocsdiva/gamepadDIVA.git
#RUN cd /
#RUN cp -r /tmpGit/gamepadDIVA/ProjectD/* /var/www/html/
#RUN rm -R tmpGit

# /etc/init.d/apache2 start

# CONFIG
#USER root

EXPOSE 80
