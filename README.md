# Book-Record-Application

Server >>storing certain book data >>user Register >>subscriber

This is a book management api server/ Backend for library system or mangement of record or books or manuals

Fine System:
User: 06/03/2023-06/06/2023
07/06/2023 -> 50 x 3=150

Subscription:
3 months:(Basic)
6 months:(Standard)
12 months:(Premium)

If the subscription type is a standard and starting date is 06/03/2023
then it is valid till 06/06/2023

withinsubscription => if we missed the rreneewal ->50 per day
subscription date also missed =>> also missed the renewal >>100+50 per day

> > missed by renewal data ->> 50/-
> > missed by subscription data ->> 100/-
> > missed by renewal + subscription data ->> 150/-

#Routes and endpoints

## /users ☑️

POST: Create a new user here.
GET: Get all the user here. >> all the user

## /users/{id}

GET: Get a user by id >>single user
PUT: Update a user by their id.
DELETE: Delete a user by their id(( check if she/he have an issued book) && (is there any fine to paid))

## /users/subscription-detail/{id}

GET: Get a user subscription detail >>Date of subscription >> Valid till >> Is there any fine

## /books

GET: Get all the book.
POST: Create/Add a new book.

## /books/{id}

GET: Get a book by id.
PUT: Update a boook by id

## /books/issued

GET: Get all book which issued

## /books/issued/withFine

GET: Get all issued book with their fine.

## npm init

## npm i nodemon --save-dev
