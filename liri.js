require("dotenv").config();

var axios = require("axios");




// OMDB Query Command below
var movieName = process.argv[3];
function info() {
    if (process.argv[2] === "movie-this") {
        var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&apikey=trilogy";

        console.log(movieUrl);

        axios.get(movieUrl).then(
            function (response) {
                console.log("Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("This movie was produced in the " + response.data.Country);
                console.log("Languages: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            });



        // Bands-in-Town
    } else if (process.argv[2] === "concert-this") {
        var artist = process.argv[3];
        var bandUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        console.log(bandUrl);

        axios.get(bandUrl).then(
            function (response) {
                for (i = 0; i < response.data.length; i++) {
                    console.log(JSON.stringify("Name of the Venue: " + response.data[i].venue.name, null, 2));
                    console.log(JSON.stringify("Venue location: " + response.data[i].venue.city, null, 2));
                    console.log(JSON.stringify("Date of the Event: " + response.data[i].datetime));
                }
            });


    // Spotify below
    } else if (process.argv[2] === "spotify-this-song") {
        var song = process.argv[3];
        var Spotify = require('node-spotify-api');
    var keys = require("./keys.js");

    var spotify = new Spotify(keys.spotify);

    spotify.search({type: 'track', query: song}, function(err,data) {
        if (err) {
            console.log("Error: " + err);
            return;
        }
        songInfo = data.tracks.items;
        for (var i = 0; i < songInfo.length; i++){
            var album = songInfo[i].album.name;
            var name = songInfo[i].name;
            var url = songInfo[i].preview_url;
            var artist = songInfo[i].artists[0].name;
            console.log("\nSong Title: " + name + "\nArtist(s) Name: " + artist + "\nAlbum Name: " + album + "\nPreview Url: " + url);
            };
    });
    };
        
}


info();


// Make it so liri.js can take in one of the following commands:
// do-what-it-says

// Command to do what it says if nothing is selected?

// node liri.js do-what-it-says
