# Car Dealership

This project was created by me. I use Vue (Javascript framework). It is a platform for selling cars. You have the opportunity to create an account, add your car for sale and view other people's cars.

## Page available to logged users

- **Dynamic Edit Page** - It is loaded with the data of the selected car in a similar form, which is used when adding a car.
- **Dynamic Delete Page** - The data for the selected car is loaded in one field and the user is asked if he is sure that he wants to delete the car from the database.
- **My Profile Page** - This page show information for account and your cars.

## Pages available to logged out users

- **Dynamic Home Page** - Shows how many cars are available on the database
  - **Dynamic Catalog Page** - Shows all cars available in the database showing the brand, model, engine,year, gearbox and price, if there are no cars displays the message "No cars in database!"
  - **Dynamic Detail Car Page** - Shows all the information of the car, which includes a description. If you own the car, you have the right to edit and delete buttons, if you do not own these buttons.
  - **Static Login Page**
  - **Static Register Page**
  - **Static About Page**
  - **Static Contacts Page**

## Back-end

- For back-end I use firebase. Authentication and Realtime Database.

## Front-end

- Vue
- HTML
- CSS
- JavaScript

## Project setup

```
pnpm install
```

### Compiles and hot-reloads for development

```
pnpm run serve
```

### Compiles and minifies for production

```
pnpm run build
```

### Lints and fixes files

```
pnpm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
