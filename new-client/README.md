- We are having a basic react app with signup, login, posts and other components.
- We implemented the functionality inside the signup component that it can make a post request to over API
    To register a new user.
- We implemented the functionality inside the login Component to make a post request to the API to Authenticate a user.
- API was sending back token and firstName details of the user after successful login and we were storing that token into the local storage.
- We updated our Navbar that it will behave differently if a user is logged in and differently if user is not logged in.
- In Posts component we are making a get request using Axios to fetch all posts from our API
- All post route was changed to public so it can be accessible by every user even if he is not logged in.
- In Create Post component, we made private so it will be only accessible when one user is logged inf, because only registered users can create new Posts.
- In our create-post end point inside OUR API we declared it as Private. So it will be only accessible when the user provides a valid token
- Because in our Post schema 'owner' property of was set Required true, that means it must be provided. And it was of type of Mongoose ObjectId
- To accomplish this validation of Post Schema what we did?
    - When were generating a new token as user reached to auth/login end point , we also used  _id provided to us from MongoDB as payload.
    - Because of it when ever user was sending a new post with token we were decoding / verifying the token. As a result we were getting the userId
        out of it.
    - And we attached that userId to the request object in side the AuthorizationHandler , so we can have access to userId inside our controller where it is required. with code req.userId = payload._id

    - As Post schema was looking for property of owner , so in side the create post controller we did const owner = req.userId
    - Then we used it to create a New Post to avoid errors.
