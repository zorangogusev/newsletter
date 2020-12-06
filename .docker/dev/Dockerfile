FROM debian:10.3

# Install apache, PHP, and supplimentary programs. openssh-server, curl, and lynx-cur are for debugging the container.
RUN apt-get update && apt-get -y upgrade && apt-get -y install \
    apache2 php7.3 php7.3-mysql libapache2-mod-php7.3 curl lynx git php7.3-curl php7.3-xdebug php7.3-zip php7.3-mbstring php7.3-xml php7.3-gd php7.3-memcache php7.3-intl php-pear php7.3-dev php7.3-redis php7.3-bcmath zip unzip rsync nano ssh supervisor

RUN apt-get update && apt-get -y upgrade && apt-get -y install \
    gcc make autoconf libc-dev pkg-config libmcrypt-dev

RUN pecl install mcrypt-1.0.3
RUN bash -c "echo extension=/usr/lib/php/20180731/mcrypt.so > /etc/php/7.3/cli/conf.d/20-mcrypt.ini"
RUN bash -c "echo extension=/usr/lib/php/20180731/mcrypt.so > /etc/php/7.3/apache2/conf.d/20-mcrypt.ini"

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Enable apache mods.
RUN a2enmod php7.3
RUN a2enmod rewrite

# Update the PHP.ini file, enable <? ?> tags and quieten logging.
RUN sed -i "s/short_open_tag = Off/short_open_tag = On/" /etc/php/7.3/apache2/php.ini
RUN sed -i "s/error_reporting = .*$/error_reporting = E_ERROR | E_WARNING | E_PARSE/" /etc/php/7.3/apache2/php.ini

# Manually set up the apache environment variables
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid

# APACHE PHP Project settings
ADD 20-xdebug.ini /etc/php/7.3/apache2/conf.d/20-xdebug.ini
ADD 20-xdebug.ini /etc/php/7.3/cli/conf.d/20-xdebug.ini

# enable the site
#ADD newsletter.conf /etc/apache2/sites-available/newsletter.conf
ADD newsletter.conf /etc/apache2/sites-available/newsletter.conf
RUN a2ensite newsletter.conf

# Expose apache.
EXPOSE 80

# SSH
EXPOSE 22
RUN mkdir /var/run/sshd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PermitRootLogin yes/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN echo "root:zoran" | chpasswd

# Supervisor

RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

#PROJECT SPECIFIC
ENV XDEBUG_CONFIG "idekey=phpstorm-xdebug"
ENV YII_ENVIRONMENT "DEVELOPMENT"
# COPY ENV variables to etc
RUN env | grep = >> /etc/environment

# By default start up apache in the foreground, override with /bin/bash for interative.
#CMD /usr/sbin/apache2ctl -D FOREGROUND
#CMD /usr/sbin/sshd -D
CMD /usr/bin/supervisord
