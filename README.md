

:Commands to run in the folder for the server side

Run the command: composer install

Rename the settings file from .env.example to .env

Change the database connection settings in the parameters:

DB_DATABASE=

DB_USERNAME=

Create a database

Run the command: php artisan migrate:fresh --seed

Run the command: php artisan key:generate

Run the command: php artisan serve

Front:
:Commands to run in the folder for the client 

Run the command: npm install

Run the command: npm run dev

:User with admin privileges

Username: admin@gmail.com

Password: a12345678

:Actions for user with these privilege

View all users - delete, update, add

Add new users with employee permissions

View all tasks of all users - delete, update, add tasks for themselves

:User with employee privileges

Username: employee@gmail.com

Password: e12345678
