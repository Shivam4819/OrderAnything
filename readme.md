# Kilobyte Assignment

This assignment is build on Nodejs. MySql database is used for storing the data.

## Note-

I have added functions for jwt auth but cannot integrate with apis due to lack of time, if provided more time i will integrate jwt auth.
## Api:


1. menu-

    * This api display all the menu stored in menu table
   
            curl --location --request GET 'http://localhost:3000/menu'

2. order- 

    * This api store the final order in table
  
            curl --location --request POST 'http://localhost:3000/order' \
            --header 'Content-Type: application/json' \
            --data-raw '{
                "items": [
                    {
                        "itemId": 4,
                        "categoryId":2,
                        "itemName": "shirts", 
                        "quantity":1,
                        "price":200
                    },
                    {
                        "itemId": 5,
                        "categoryId":2,
                        "itemName": "pants",
                        "quantity":1,
                        "price":2000
                    },
                    {
                        "itemId": 6,
                        "categoryId":2,
                        "itemName": "tshirt",
                        "quantity":1,
                        "price":2000
                    }
                ],
                "customerId": 4,
                "finalPrice": 4200
        
             }'


3. detials- 
    
    * This api help admin to view all the placed order and there status.

            curl --location --request GET 'http://localhost:3000/details'

4. getdelivery-

     * This api help admin to view all the details about the delivery boys

            curl --location --request GET 'http://localhost:3000/getdelivery'

5. assign-

    * This api helps admin to assign delivery task to one of its employee.

            curl --location --request POST 'http://localhost:3000/assign' \
            --header 'Content-Type: application/json' \
            --data-raw '{
                "orderid":2,
                "boyId":2
            }

6. free-

    *  This api help admin to reset delivery boy status once delivery is completed.

            curl --location --request POST 'http://localhost:3000/free' \
            --header 'Content-Type: application/json' \
            --data-raw '{
                "boyId":1
            }'

7. update- 

    * This api helps the delivery boy to update the status of the packet

            curl --location --request POST 'http://localhost:3000/update' \
            --header 'Content-Type: application/json' \
            --data-raw '{
                "orderId":1,
                "status":"delivered"
            }'

8. items-

    * This api help delivery boy to see all the items inside the order assigned to him.

            curl --location --request POST 'http://localhost:3000/items' \
            --header 'Content-Type: application/j
            4. FinalOrder-
                * Columns- {orderId,customerId,status,finalPrice}
                * Primary key- orderId.
            
            5. FinalItems-
            
                * Columns-{orderId,item} son' \
            --data-raw '{
                "boyId":1
            }'

9. login- 

    * This api help user to login to app

            curl --location --request POST 'http://localhost:3000/login' \
            --header 'Content-Type: application/json' \
            --data-raw '{
                "phone":1234567854,
                "password":"vostro"
            }'

10. register-

    * This api help new user to create account 

            curl --location --request POST 'http://localhost:3000/register' \
            --header 'Content-Type: application/json' \
            --data-raw '{
                "userid":1,
                "phone":1234567854,
                "password":"vostro"
            }'


## Tables Structure-

1. category- 

    * Columns- {id , name}
    * This table store all different category
    * Primary key- id

2. categoryLocation-

    * Columns- {catId, location}
    * This table has location for different category
    * Foreign Key- catId , reference to id of category table

3. menu-

    * Columns-{itemId,categoryId,itemName,price}
    * This table has list of menus 
    * Primary key- itemId
    * Foreign Key- categoryId , reference to id of category table

4. FinalOrder-
    * Columns- {orderId,customerId,status,finalPrice}
    * Primary key- orderId.

5. FinalItems-

    * Columns-{orderId,itemId,itemName,quantity,price,address}
    * It stores all items inside order table
    * Foriegn Key- orderId, reference orderId of FinalOrder

6. deliveryBoy-

    * Columns- {boyId, name, contact, status, orderId}
    * This table store information about delivery boy and its current status.
    * Primary Key- boyId.

7. Login-

    * Columns- {userid,phone,password}
    * This table store users information
    
