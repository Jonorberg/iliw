// This is the jQuery way of doing something after the page (and for example all other javascript libraries) are loaded.
$(document).ready(function(){

//The pop up code
    ;(function($) {

         // DOM Ready
        $(function() {

            // Binding a click event
            // From jQuery v.1.7.0 use .on() instead of .bind()
            $('#my-button').on('click', function(e) {

                // Prevents the default action to be triggered. 
                e.preventDefault();

                // Triggering bPopup when click event is fired
                $('#element_to_pop_up').bPopup();

            });

        });

    })(jQuery);

//This code does the page scrolling down 300px when any of the icons is clicked
    $(function() {
    $(".icons").on("click", function() {
        $("body").animate({"scrollTop": window.scrollY+760}, 1000);
        return false;
    });
});


//This code hides the title for the result and show it when something is searched for
    $(function() {
    $("h1.partyrecepie").hide();
        $(".icons").click(function() {
            $("h1.partyrecepie").show();
    });
});

    var feed = new Instafeed({
        get: 'tagged',
        tagName: 'funhats',
        clientId: '088e7ceced2c4a8cba62ca9e44de92d2',
        template: '<a href="{{link}}"><img src="http:{{image}}" /></a>',
        resolution: 'low_resolution',
        sortBy: 'most-recent'
    });

$('#funhats').click(function() {
    $('#instafeed').html('');
    feed.run();
}); 
    var feed2 = new Instafeed({
        get: 'tagged',
        tagName: 'comicon',
        clientId: '088e7ceced2c4a8cba62ca9e44de92d2',
        template: '<a href="{{link}}"><img src="http:{{image}}" /></a>',
        resolution: 'low_resolution',
        sortBy: 'most-recent'
    });
    $('#superhero').click(function() {
        $('#instafeed').html('');
  feed2.run();
    }); 

    var feed3 = new Instafeed({
        get: 'tagged',
        tagName: 'rockabilly',
        clientId: '088e7ceced2c4a8cba62ca9e44de92d2',
        template: '<a href="{{link}}"><img src="http:{{image}}" /></a>',
        resolution: 'low_resolution',
        sortBy: 'most-recent'
    });
    $('#rockabilly').click(function() {
        $('#instafeed').html('');
  feed3.run();
});

    var feed3 = new Instafeed({
        get: 'tagged',
        tagName: 'halloweencostume',
        clientId: '088e7ceced2c4a8cba62ca9e44de92d2',
        template: '<a href="{{link}}"><img src="http:{{image}}" /></a>',
        resolution: 'low_resolution',
        sortBy: 'most-recent'
    });
    $('#halloween').click(function() {
        $('#instafeed').html('');
  feed3.run();
});

    var feed4 = new Instafeed({
        get: 'tagged',
        tagName: 'hippilife',
        clientId: '088e7ceced2c4a8cba62ca9e44de92d2',
        template: '<a href="{{link}}"><img src="http:{{image}}" /></a>',
        resolution: 'low_resolution',
        sortBy: 'most-recent'
    });
    $('#flowerpower').click(function() {
        $('#instafeed').html('');
  feed4.run();
});

    var feed5 = new Instafeed({
        get: 'tagged',
        tagName: 'moustaches',
        clientId: '088e7ceced2c4a8cba62ca9e44de92d2',
        template: '<a href="{{link}}"><img src="http:{{image}}" /></a>',
        resolution: 'low_resolution',
        sortBy: 'most-recent'
    });
    $('#moustasch').click(function() {
        $('#instafeed').html('');
  feed5.run();
});

//Random quotes 

var quotes=new Array();
quotes[0] = "Please use the following to shake your drinks and booty:";
quotes[1] = "Please party hard using our recipe:";
quotes[2] = "Use this inspiration to make your party blow minds:";
quotes[3] = "This is your mindblowing inspiration that will make your party blow minds:";
quotes[4] = "Drink irresponsibly and have the most awesome party!";
quotes[5] = "Please party hard using our recipe:";
quotes[6] = "This is your fun fest!";

var q = quotes.length;
var whichquote=Math.round(Math.random()*(q-1));

function showquote(){
    document.getElementById('quote').innerHTML = quotes[whichquote];
}
showquote();


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
        appId: 1249,
        defaultPageSize: 10
    });
    $('.icons').click(function(){
        console.log('search click');
        // This clears out the vodka-out list in the markup
        $('#vodka-out').html('');

        // This makes a call to the addb api and sends...
        addb.drinks().withType($('#query').val()).loadSet(function(query) { 
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
    // This connects code to the search button in the markup
    $('.icons').click(function(){
        console.log('search click');
        // This clears out the vodka-out list in the markup
        $('#vodka-out').html('');

        // This makes a call to the addb api and sends...
        addb.drinks().withIngredient($('#query').val()).loadSet(function(query) { 
            // ...the results into a jQuery .each loop, which...
            $(query.result).each(function(index, drink){
                // ...prints the results in a html list.

                $('#vodka-out').append("<h3>" + drink.name + "</h3>" + "<img width='306px' height='306px' style='display:inline-block;' title='" + drink.name + "' src='" + drink.image() + "'/>"+"<P>" + drink.descriptionPlain + "</p>");

                for (var i =  0; i < drink.ingredients.length; i++) {
                    $('#vodka-out').append("<li>" + drink.ingredients[i].textPlain + "</li>");

                };

                searchAlbums(drink.name);
            });
        });
    });
});