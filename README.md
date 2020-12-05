# movie-theater-backend-firestore

 **Firestore** Backend for Moviestaden movie theater app
 
 To setup Firestore:
 1. Create Google Cloud accout and Google Cloud project.
 2. In the project create a Firestore database instance in _Native_ mode : Navigate to [Firestore](https://console.cloud.google.com/firestore/data/).  
 3. To run the client library, you must first set up authentication by creating a [service account](https://console.cloud.google.com/apis/credentials/serviceaccountkey) and downloading a JSON key.
 4. Add the server client library to your app `npm install --save @google-cloud/firestore` or do `npm i` in cloned project.
 5. Initialize an instance of Firestore:  
 > `const Firestore = require('@google-cloud/firestore');    

> const db = new Firestore({  
>    projectId: 'YOUR_PROJECT_ID',  
>    keyFilename: '/path/to/keyfile.json',  
> });`  
[more info](https://cloud.google.com/firestore/docs/quickstart-servers#cloud-console)  
[how to](https://cloud.google.com/firestore/docs/how-to)


### Routes:  

##### Movies  
 1. Create new movie  
   Route: POST 'api/v1/movies'  
   Request Body:   
   {  
    title: String,
    overview: String,  
    popularity: Number,  
    poster_path: String,  
    backdrop_path: String,  
    runtime: Number,
    genres: [String],
    release_date: Date,  
    tmdb_id: Number,  
    status: String    
    }  

2. Read (all movies)
   Route: GET 'api/v1/movies'

3. Read (movie by Id)
   Route: GET 'api/v1/movies/movieId'

4. Update(movie by Id)
   Route: PATCH 'api/v1/movies/movieId'
   Request Body: {any field from POST}

5. Delete(movie by Id)
   Route: DELETE 'api/v1/movies/movieId'

##### Showtimes

1. Create (new showtime for a specific movie)
   Route: POST 'api/v1/movies/movieId/showtimes'
   Request Body:  
   {  
    startAt: Date,  
    endAt: Date,  
    hallName: string,  
    unavailableSeats: [Number]  
    city: string,  
    movie: movieId
    }

2. Read (all showtimes for a specific movie)
   Route: GET 'api/v1/movies/movieId/showtimes'

3. Read (showtime by Id)
   Route: GET 'api/v1/movies/movieId/showtimes/showtimeId'

4. Update(showtime by Id)
   Route: PATCH 'api/v1/movies/movieId/showtimes/showtimeId'
   Request Body: {any field from POST}

5. Delete(showtime by Id)
   Route: DELETE 'api/v1/movies/movieId/showtimes/showtimeId'

##### Reservations

1. Create (new reservation for a specific showtime)
   Route: POST 'api/v1/movies/movieId/showtimes/showtimeId/reservations'
   Request Body:  
   {  
   username: String  
   email: Date,  
   isPaymentSucceed: Boolean, (default: false)  
   isEmailSend: Boolean, (default: false)
   seats: [Number]  
   totalPrice: Number,  
   showtime: showtimeId
   }  
   
2. Read (all reservations for a specific showtime)
   Route: GET 'api/v1/movies/movieId/showtimes/showtimeId/reservations/reservationId'
   
3. Read (reservations for a specific showtime )
   Route: GET 'api/v1/movies/movieId/showtimes/showtimeId/reservations/reservationId'
   
4. Update(reservation by Id)
   Route: PATCH 'api/v1/movies/movieId/showtimes/showtimeId/reservations/reservationId'
   Request Body:  
   {any field from POST or any of:  
   stripeCustomerId: String,  
   stripeAmountCharged: Number,  
   stripeCheckoutSessionId: String,  
   stripePaymentIntentId: String,  
   stripePaymentCreateAt: Date,  
   }  
