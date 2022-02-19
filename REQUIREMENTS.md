# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index                   : GET method `'/products'`
- Show                    : GET method `'/products/:id'`
- Create [token required] : POST method,body:Product Type   `'/products'`


#### Users
- Index [token required]   : GET method `'/users'`
- Show [token required]    : GET method `'/users/:id'` 
- Create N[token required] : POST method,body:User Type `'/users'`
- Authenticate             : POST method, body:username and password `'/users/authenticate'`

#### Orders
- Index                                                  : GET method `'/orders'`           
- Show                                                   : GET method `'/orders/:id'`
- Current Order by user (args: user id)[token required]  : GET method `'/orders/byuser/:user_id'`
- Create [token required]                                : POST method,request.userData:userData Type   `'/orders'`
- AddProduct [token required]                            : Put method,body:OrderProduct Type   `'/orders'`
 

## Data Shapes
#### Product
-  id
- name
- price


#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

