After cloning this repo to your computer, navigate to this repo in your CLI and please make sure to run "npm i" to install dependancies. After this, (assuming you are using vs code as this is what I have used) create a new terminal and in this terminal run "node server.js" to run the server.js file. Go back to the first terminal, and then run "ng serve" to open a link to the web app on your local device.

Upon loading the website, you will be able to view a list of movies. Feel free to filter and sort these movies. Should you wish to gain access to your personalised list of favourite movies, go to the register page in the navigation bar. When selecting a username, the username must be between 3 and 20 characters, and can only contain letters, numbers, dots and underscores. When selecting a password, the password must be at least 8 characters long, and the password must contain an uppercase letter, a lowercase letter and a number.

On homepage, you will now be able to add movies to your favourites. To view your list of favourite movies, navigate to the favourites page. Here, you can also remove movies from your favourites. 

Local storage means you will stay logged in even if you close down the app and load it back up again, and still retain access to the favourites list you created.

Should you log out, you can log back in using the login page, and the favourites list you created can still be accessed as the movies.json file is kept up-to-date through http requests when you add and remove movies from your favourites list.

If there is issues with not being able to retain the favourites list when logging out of an account and logging back in, please try restarting both running the server.js file and deploying the web app on the two terminals. I have had issues with retaining the list of favourite movies upon logging out and back into an account, sometimes access is retained and sometimes not, I haven't been able to fully understand why.
