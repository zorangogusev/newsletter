SPA app for creating, editing, deleting, displaying news, with registration and login for users

Used Technologies <br/>
Docker, PHP7.3, Maria-DB10.1, Laravel8.17.2
React(react-router, redux, jwt, react-hook-form, rc-pagination)

## Live demo on Heroku
[http://app-newsletter-demo.herokuapp.com](http://app-newsletter-demo.herokuapp.com)

register, login and can add/edit/delete news, and display them in home page <br/>

================================================================================

Instalation

sudo composer install <br/>
sudo php artisan key:generate <br/>

to connect to database add/replace in .env file 
    
    #DOCKER file data
    DB_CONNECTION=mysql   
    DB_HOST=newsletter-mariadb-10.1
    DB_PORT=3306
    DB_DATABASE=newsletter
    DB_USERNAME=zoran
    DB_PASSWORD=zoran



check/update/modify in docker/dev/docker-compose.yml file, volumes on line 12 and line 26 <br/>
check/update/modify .docker/dev/newsletter.conf file <br/>

change owner and permissions on storage folder <br/>

        sudo chmod -R 777 storage storage
        sudo chown -R www-data:www-data storage storage

run docker
    
    sudo docker-compose up -d --build

add in /etc/hosts file <ipaddres> newsletter.deb.test <br/>
if is used vbox in the browser on newsletter.deb.test:8080/ <br/>
or newsletter.deb.test

create database in docker container
    
        sudo docker exec -it newsletter-mariadb-10.1 bash
        mysql -u root -p // enter password zoran
        CREATE DATABASE newsletter;

to execute migrations enter in the docker bash in /var/www/html/newsletter folder

    sudo docker exec -it newsletter bash
    cd /var/www/html/newsletter/
    php artisan migrate


to install jwt

    php artisan jwt:secret
