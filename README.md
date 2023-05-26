# Fashion-Heaven-BE

This is the backend of Fashion Heaven contains all the API's and fucntions.

## Authors

- [@TanishKamboj](https://github.com/TanishiViewLabs)
- [@PrashantiBirla](https://github.com/PrashantBirla)

## Run Locally

#### 1) Clone the project

```bash
 git clone https://github.com/iViewlabs-internal/Fashion-Heaven-BE.git
```

#### 2) Go to the project directory

```bash
  cd server/consumer
```

#### 3) Install dependencies

```bash
  npm install
```

#### 4) Start the server

```bash
  npm run start
```

## Deployment

To Start this project

```bash
  npm run Start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file add them accordingly

`MONGOURL`

`PORT`

`EMAIL_HOST`

`EMAIL_PORT`

`EMAIL_USER`

`EMAIL_PASS`

`clientID`

## Registeration API's- Consumer

These are the API's that will help in the Registeration of the consumer.

### Sign Up Consumer

```http
  POST /signup
```

| Request Body      | Type     | Description                            |
| :---------------- | :------- | :------------------------------------- |
| `firstName`       | `string` | **Required**. First Name               |
| `lastName`        | `string` | **Required**. Last Name                |
| `email`           | `string` | **Required**, **Unique**. Email        |
| `password`        | `string` | **Required**. Password                 |
| `confirmPassword` | `string` | **Required**. Confirm Password         |
| `phoneNumber`     | `string` | **Required**, **Unique**. Phone Number |

###### Will help to add new user to our DB and website.

### Login

```http
  Post /login
```

| Request Body | Type     | Description            |
| :----------- | :------- | :--------------------- |
| `email`      | `string` | **Required**. Email    |
| `password`   | `string` | **Required**. Password |

###### Will help to user to login into the website.

### Forget password

```http
  Post /forget
```

| Request Body | Type     | Description         |
| :----------- | :------- | :------------------ |
| `email`      | `string` | **Required**. Email |

###### This will help user to reset thier password you will get a link in your entered email that will expire after one click with the help you that you can reset your password.

### Forget password

```http
  Post /forget/{token}/{id}
```

| Parameter | Type     | Description         |
| :-------- | :------- | :------------------ |
| `token`   | `string` | **Required**. Token |
| `id`      | `string` | **Required**. id    |

###### In the email you will get a link it will contain token(will expire after one click) + id (object id) of the consumer in the DB.

| Request Body      | Type     | Description                    |
| :---------------- | :------- | :----------------------------- |
| `password`        | `string` | **Required**. Password         |
| `confirmPassword` | `string` | **Required**. Confirm Password |

###### New password will be updated and stored in the database.

## Cart API's- Consumer

These are API's that will help with cart functions for the User.

### Add To Cart

```http
  POST /addToCart
```

| Request Body | Type     | Description              |
| :----------- | :------- | :----------------------- |
| `productID`  | `string` | **Required**. Product ID |
| `color`      | `string` | **Required**. Color      |
| `size`       | `string` | **Required**. Size       |

###### Will store the product in the cart of the user.

### Get All Cart Items

```http
  GET /getCartItems
```

###### This will get all the items present in the cart of a user. We will indentify the user using Passport Session

### Remove From Cart

```http
  POST /deleteCartItem
```

| Request Body | Type     | Description                |
| :----------- | :------- | :------------------------- |
| `cartItemID` | `string` | **Required**. Cart Item ID |

###### As in the DB every cart will have an object \_id and you will delete it using that.

### Update Cart

```http
  POST /updateCart
```

| Request Body | Type     | Description              |
| :----------- | :------- | :----------------------- |
| `productID`  | `string` | **Required**. Product ID |
| `size`       | `string` | **Required**. Size       |
| `quantity`   | `Number` | **Required**. Quantity   |

###### Consumer can update the size/quantity he wants using this API.

### Check Out Cart

```http
  POST /checkOutCart
```

###### All of the items present in your cart will be ordered

## Order API's- Consumer

These are API's that will help with Order functions(eg Making order or Cancelling order) for the User.

### Add Order

```http
  POST /addOrder
```

| Request Body | Type          | Description              |
| :----------- | :------------ | :----------------------- |
| `productID`  | `string`      | **Required**. Product ID |
| `orderDate`  | `Date Object` | **Required**. Date       |
| `size`       | `string`      | **Required**. Size       |
| `quantity`   | `Number`      | **Required**. Quantity   |
| `color`      | `string`      | **Required**. Color      |

###### Will help the user to order the item he want.

### Update Order (Can Only be used using Admin service)

```http
  POST /updateOrder
```

| Request Body  | Type     | Description                |
| :------------ | :------- | :------------------------- |
| `orderID`     | `string` | **Required**. Order ID     |
| `orderStatus` | `string` | **Required**. Order Status |

###### This will help the admin to update the status of the order.

### Get All Orders

```http
  GET /getAllOrders
```

###### This will get all the orders of a user. We will indentify the user using Passport Session

### Get Order By ID

```http
  POST /getOrderByID
```

| Request Body | Type     | Description           |
| :----------- | :------- | :-------------------- |
| `orderID`    | `string` | **Required**. OrderID |

###### As in the DB every cart will have an object \_id and this will help us getting all the details

### Cancle Order

```http
  POST /cancleOrder
```

| Request Body | Type     | Description           |
| :----------- | :------- | :-------------------- |
| `orderID`    | `string` | **Required**. OrderID |

###### As in the DB every cart will have an object \_id and will help help us Cancelling the order.

### Filter Order Order

```http
  POST /filterOrder
```

| Request Body  | Type     | Description  |
| :------------ | :------- | :----------- |
| `filterMonth` | `string` | Filter Month |
| `filterYear`  | `string` | Filter Year  |

###### This will help to filter out the objcets acc to time.

## Product API's- Consumer

These are API's that will help with Product functions(eg searching or pagination) for the User.

### Get Product by SKU

```http
  POST /getBySKU
```

| Request Body | Type     | Description       |
| :----------- | :------- | :---------------- |
| `SKU`        | `string` | **Required**. SKU |

###### Will help to get all the details of the product just by using SKU

### Get Feed Products

```http
  GET /feedProducts/{page}/{limit}
```

| Query   | Type     | Description |
| :------ | :------- | :---------- |
| `page`  | `Number` | Page Number |
| `limit` | `Number` | Page Limit  |

###### You will get the product on feed using this if they are null then default value will be page = 1 & limit = 4

### Search Product in Feed

```http
  GET /searchProduct/{keyword}
```

| Query     | Type     | Description |
| :-------- | :------- | :---------- |
| `keyword` | `String` | keyword     |

###### You will get the product on feed using this

### Product Filter in Feed

```http
  GET /productFilter
```

| Query      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `audience` | `String` | Audience               |
| `category` | `String` | Category               |
| `minPrice` | `Number` | **Required** Min Price |
| `maxPrice` | `Number` | **Required** Max Price |

###### You will get the filtered product on feed using this.

## Profile API's- Consumer

These are API's that will help the user to get all the Profile functionality

### Get User details.

```http
  GET /getUser
```

###### Get all the details of the user using the User ID in the passport session.

### Get User Address

```http
  GET /getUserAddress
```

###### Get all the address of the user using the User ID in the passport session.

### Add Address to User

```http
  POST /addAddress
```

| Request Body   | Type     | Description    |
| :------------- | :------- | :------------- |
| `country`      | `string` | Country        |
| `state`        | `string` | State          |
| `city`         | `string` | City           |
| `zipCode`      | `Number` | Zip Code       |
| `addressLine1` | `string` | Address Line 1 |
| `addressLine2` | `string` | Address Line 2 |

###### This help in adding to a user.

### Delete Address of a User

```http
  POST /deleteAddress
```

| Request Body | Type     | Description |
| :----------- | :------- | :---------- |
| `addressID`  | `string` | Address ID  |

###### This help in deleting the address of a user using the Address ID as we have stored Address of User as a schema too.

### Update details of a User

```http
  POST /deleteAddress
```

| Request Body  | Type     | Description  |
| :------------ | :------- | :----------- |
| `firstName`   | `string` | First Name   |
| `lasttName`   | `string` | Last Name    |
| `email`       | `string` | Eamil        |
| `phoneNumber` | `string` | Phone Number |
| `age`         | `string` | Age          |

###### This help in Updating the details of the User.

## Review API's- Consumer

These are API's that will the user to give review of the product they ordered

### Add Review

```http
  POST /addReview
```

| Request Body         | Type     | Description              |
| :------------------- | :------- | :----------------------- |
| `productID`          | `string` | **Required**. Product ID |
| `orderID`            | `string` | **Required**. Order ID   |
| `Review Description` | `string` | Review Description       |
| `Rating`             | `Number` | Rating                   |

###### Will help to add a review to a product

### Delete Review

```http
  POST /deleteReview
```

| Request Body | Type     | Description              |
| :----------- | :------- | :----------------------- |
| `productID`  | `string` | **Required**. Product ID |
| `reviewID`   | `string` | Review ID                |

###### Will help to delete a review of a product

### Update Review

```http
  POST /updateReview
```

| Request Body         | Type     | Description              |
| :------------------- | :------- | :----------------------- |
| `reviewID`           | `string` | **Required**. Review ID  |
| `productID`          | `string` | **Required**. Product ID |
| `Review Description` | `string` | Review Description       |
| `Rating`             | `Number` | Rating                   |

###### Will help to update a review to a product

### Get ALL Reviews

```http
  POST /getReview
```

| Request Body | Type     | Description              |
| :----------- | :------- | :----------------------- |
| `productID`  | `string` | **Required**. Product ID |

###### Will help to get all review of a product

## Feedback

If you have any feedback, please reach out to us at [GitHub](https://github.com/TanishiViewLabs@)
