# UserRestaurants

"UserRestaurants" manages your delicious restaurant list.

## Features

-   Sign up
-   Login by username&password or oauth2
-   Display restaurants on multiple pages
-   Search restaurants by name or category
-   Order restaurants
-   Flash messages
-   Create a new restaurant
-   Check restaurant information
-   Edit restaurant information
-   Delete restaurant information

## Environment requirements

-   Node.js v18
-   MySQL server v8

## Installation

1. Clone the repository

```
git clone https://github.com/LoS-Light/UserRestaurants.git
```

<br />

2. Move to the UserRestaurants directory

```
cd UserRestaurants
```

<br />

3. Restore the dependencies

```
npm install
```

<br />

4. Create example environment configs

```
npm run env:create
```

<br />

5. Launch Mysql Server

Launch your mysql server, and edit environment config files in folder "env".<br />
There are two config files in it, ".env.development.local" and ".env.production.local".<br />
Change the "DB_MYSQL_USERNAME", "DB_MYSQL_PASSWORD", "SESSION_SECRET" to match your mysql server connection settings.

<br />

6. Create a new database and seed test data.

```
npm run db:create
npm run seed
```

<br />

7. Launch the application

Run app in development mode

```
npm run dev
```

or

Run app in production mode

```
npm run build
npm run start
```

In your browser, open http://localhost:3000 to see the website.

<br />

8. Login by oauth2 (Optional)

Edit environment config files in folder "env".<br />
There are two config files in it, ".env.development.local" and ".env.production.local".<br />
Change items below to match your account settings.

OAUTH2_FACEBOOK_CLIENT_ID<br />
OAUTH2_FACEBOOK_CLIENT_SECRET<br />
OAUTH2_GOOGLE_CLIENT_ID<br />
OAUTH2_GOOGLE_CLIENT_SECRET

## Demo

https://userrests.loslight.com

## Screenshots

![image](https://github.com/LoS-Light/UserRestaurants/blob/main/screenshots/restaurants-01.jpg)
![image](https://github.com/LoS-Light/UserRestaurants/blob/main/screenshots/restaurants-02.jpg)
![image](https://github.com/LoS-Light/UserRestaurants/blob/main/screenshots/restaurants-03.jpg)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
