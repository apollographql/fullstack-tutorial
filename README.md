## Full Stack App Server

This is the backend implementation for the full stack app of the new Learn tutorial site.


### Schema Design

* Core features (upcoming launches)
    * Browse upcoming launches (home screen)
        * Get upcoming launches query
        * Carousel of launches
        * Reserve your place on a launch
    * My trips
        * Get my trips query
        * Cancel your trip mutation
        * See list of trips that you've signed up for
        * Almost like a profile page (email, avatar)
    * Cart to save launches with a simple checkout feature to save them to the server
        * Local state mutation to save trips to the cart
        * Local state mutation to remove the trip from the cart
        * Reserve launch mutation to send trips to the server
        * No money required to reserve your spot
    * Navigation between the 3 screens
        * React Router


* Nice to have (past launches)
    * Find a launch near you