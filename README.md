

# project test

##:Commands to run in the folder for the server side

1) Run the command: composer install

2) Rename the settings file from .env.example to .env

3)Change the database connection settings in the parameters:

DB_DATABASE=

DB_USERNAME=

4) Create a database

5) Run the command: php artisan migrate:fresh --seed

6) Run the command: php artisan key:generate

7) Run the command: php artisan serve

##:Commands to run in the folder for the client 

1) Run the command: npm install

2) Run the command: npm run dev

## :User with admin privileges

Username: admin@gmail.com

Password: a12345678

##:Actions for user with these privilege

View all users - delete, update, add

Add new users with employee permissions

View all tasks of all users - delete, update, add tasks for themselves

## :User with employee privileges

Username: employee@gmail.com

Password: e12345678
