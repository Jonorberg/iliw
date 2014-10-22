// This is the jQuery way of doing something after the page (and for example all other javascript libraries) are loaded.
$(document).ready(function(){
	var feed = new Instafeed({
        get: 'tagged',
        tagName: 'vuxenresan',
        clientId: '088e7ceced2c4a8cba62ca9e44de92d2',
        template: '<a href="{{link}}"><img src="http:{{image}}" /></a>',
        resolution: 'low_resolution',
        sortBy: 'most-recent'
    });
    feed.run();

 	var feed = new Instafeed({
        get: 'tagged',
        tagName: 'tbt',
        clientId: '088e7ceced2c4a8cba62ca9e44de92d2',
        template: '<a href="{{link}}"><img src="http:{{image}}" /></a>',
        resolution: 'low_resolution',
        sortBy: 'most-recent'
    });
    feed.run();


    // find template and compile it
	var templateSource = document.getElementById('results-template').innerHTML,
	    template = Handlebars.compile(templateSource),
	    resultsPlaceholder = document.getElementById('results'),
	    playingCssClass = 'playing',
	    audioObject = null;

	var fetchTracks = function (albumId, callback) {
	    $.ajax({
	        url: 'https://api.spotify.com/v1/albums/' + albumId,
	        success: function (response) {
	            callback(response);
	        }
	    });
	};

	var searchAlbums = function (query) {
	    $.ajax({
	        url: 'https://api.spotify.com/v1/search',
	        data: {
	            q: query,
	            type: 'album'
	        },
	        success: function (response) {
	            console.log(response);
	            resultsPlaceholder.innerHTML = template(response);
	        }
	    });
	};

	results.addEventListener('click', function(e) {
	    var target = e.target;
	    if (target !== null && target.classList.contains('cover')) {
	        if (target.classList.contains(playingCssClass)) {
	            audioObject.pause();
	        } else {
	            if (audioObject) {
	                audioObject.pause();
	            }
	            fetchTracks(target.getAttribute('data-album-id'), function(data) {            
	                audioObject = new Audio(data.tracks.items[0].preview_url);
	                audioObject.play();
	                target.classList.add(playingCssClass);
	                audioObject.addEventListener('ended', function() {
	                    target.classList.remove(playingCssClass);
	                });
	                audioObject.addEventListener('pause', function() {
	                    target.classList.remove(playingCssClass);
	               });
	            });
	        }
	    }
	});

	document.getElementById('search-form').addEventListener('submit', function (e) {
	    e.preventDefault();
	}, false);

    // This intializes the addb library. 1281 is an appId that I've registered for me for the url http://localhost:8080 which
    // is where the page lives on my local machine. You will have to change this to your appId (which should be connected to
    // http://iliw.unvelo.se I guess?).
    addb.init({
        appId: 1249
    });

    // This connects code to the search button in the markup
    $('#search').click(function(){
    	console.log('search click');
        // This clears out the vodka-out list in the markup
        $('#vodka-out').html('');

        // This makes a call to the addb api and sends...
        addb.drinks().withIngredient($('#query').val()).loadSet(function(query) { 
            // ...the results into a jQuery .each loop, which...
            $(query.result).each(function(index, drink){
                // ...prints the results in a html list.

                $('#vodka-out').append("<h1>" + drink.name + "</h1>" + "<img width='306px' height='306px' style='display:inline-block;' title='" + drink.name + "' src='" + drink.image() + "'/>"+"<P>" + drink.descriptionPlain + "</p>");

                for (var i =  0; i < drink.ingredients.length; i++) {
                    $('#vodka-out').append("<li>" + drink.ingredients[i].textPlain + "</li>");

                };

                searchAlbums(drink.name);
            });
        });
    });
});