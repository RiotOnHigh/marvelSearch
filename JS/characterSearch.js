var characterResults = {};
var comicResults = {};
var eventResults = {};

//Button click functions
$(document).ready(function() {

    //Submit button to search for a character
    $("#submit").click(function() {
        if ($('#characterSearch').val() == '') {
            alert('Input can not be left blank');
        } else {
            var characterName = $('#characterSearch').val();
            $("#results").empty();
            characterSearch(characterName, processCharacterSearch);
        }
    });

    //function needed for DOM to see button within a modal being pressed
    $(document).on("click", ".eventInfo", function(event) {

        var eventID = $(this).val();
        $("#info").empty();
        eventSearch(eventID, processSearch);

    });

    //function needed for DOM to see button within a modal being pressed
    $(document).on("click", ".comicInfo", function(event) {

        var comicID = $(this).val();
        $("#info").empty();
        comicSearch(comicID, processSearch);

    });

});

//Makes request to Marvel API with callback function to render info on DOM
function characterSearch(name, callback) {

    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?nameStartsWith=' + name;
    $.getJSON(marvelAPI, {
        //As this is a client side application these is no need for the private API key only the public will be used. However if this was created using any sever side technologies the private API key must be used as
        // well as a time stamp. All three of these varibles would be used in unison and encrypted in MD5
        apikey: '3996055df50e231be7c25a0aee2e71a0'
    })
        .done(function(response) {

            characterResults = response.data.results;
            callback(characterResults);

        })
        .fail(function(err) {
            console.log(err);
        });

}

//Makes request to Marvel API with callback function to render info on DOM
function comicSearch(id, callback) {

    var marvelAPI = id;
    $.getJSON(marvelAPI, {
        //As this is a client side application these is no need for the private API key only the public will be used. However if this was created using any sever side technologies the private API key must be used as
        // well as a time stamp. All three of these varibles would be used in unison and encrypted in MD5
        apikey: '3996055df50e231be7c25a0aee2e71a0'
    })
        .done(function(response) {

            comicResults = response.data.results[0];
            callback(comicResults);

        })
        .fail(function(err) {
            console.log(err);
        });

}

//Makes request to Marvel API with callback function to render info on DOM
function eventSearch(id, callback) {

    var marvelAPI = id;
    $.getJSON(marvelAPI, {
        //As this is a client side application these is no need for the private API key only the public will be used. However if this was created using any sever side technologies the private API key must be used as
        // well as a time stamp. All three of these varibles would be used in unison and encrypted in MD5
        apikey: '3996055df50e231be7c25a0aee2e71a0'
    })
        .done(function(response) {
            eventResults = response.data.results[0];
            callback(eventResults);
        })
        .fail(function(err) {
            console.log(err);
        });

}

//Takes the information from character search and renders the results on screen
//This creates buttons with image and name of characters from results and creates modals that will display info on character
function processCharacterSearch(characterResult) {

    var resultsLen = characterResults.length;
    var output = '<ul class="list-group">';
    for (var i = 0; i < resultsLen; i++) {

        var imageCheck = new String(characterResults[i].thumbnail.path).valueOf();
        var descrCheck = new String(characterResults[i].description).valueOf();
        var notFound = new String("http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available").valueOf();

        //Check for Thumbnail Image on Character & generation of modals
        if (imageCheck != notFound) var imgPath = characterResults[i].thumbnail.path + '/standard_fantastic.' + characterResults[i].thumbnail.extension;
        else imgPath = src = "images/imageNotFound.png";

        //Check for Character Description
        if (descrCheck != "") desriptionString = characterResults[i].description;
        else desriptionString = "Sorry, No Description Available";

        output += '<button type="button" data-toggle="modal" data-target="#' + characterResults[i].id + 'Modal"><li class="list-group-item"><img src="' + imgPath + '"><br>' + characterResults[i].name + '</li></button>\n' +
            '<!-- Modal -->\n' +
            '<div class="modal fade" id="' + characterResults[i].id + 'Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n' +
            '<div class="modal-dialog" role="document">\n' +
            '<div class="modal-content">\n' +
            '<div class="modal-header">\n' +
            '<h5 class="modal-title" id="exampleModalLabel">' + characterResults[i].name + '</h5>\n' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
            '<span aria-hidden="true">&times;</span>\n' +
            '</button>\n' +
            '</div>\n' +
            '<div class="modal-body">\n' +
            '<h2>Biography</h2>' + desriptionString +
            '<br/>' +
            '<h2>Top Comics</h2>' +
            '<ol>';

        var comicLen = characterResults[i].comics.items.length;
        if (comicLen === 0) output += '<p>Sorry, No Comics Available</p>';
        else {
            for (var x = 0; x < comicLen; x++) {
                output +=
                    '<div class="row">' +
                    '<div class="col-sm-8"> ' +
                    '<li>' +
                    '<p>' + characterResults[i].comics.items[x].name + '</p>' +
                    //'<p>' + characterResults[i].comics.items[x].name + '</p>' +
                    '</li>\n' +
                    '</div>' +
                    '<div class="col-sm-4">' +
                    '<button class="comicInfo" value="' + characterResults[i].comics.items[x].resourceURI + '">More Info?</button>' +
                    '</div>' +
                    '</div>';

            }
        }

        output += '</ol>' +
            '<h2>Top Events</h2>' +
            '<ol>';


        var eventLen = characterResults[i].events.items.length;
        if (eventLen === 0) output += '<p>Sorry, No Events Available</p>';
        else {
            if (eventLen > 5) eventLen = 5;
            for (var y = 0; y < eventLen; y++) {
                output += '<div class="row">' +
                    '<div class="col-sm-8"> ' +
                    '<li>' +
                    '<p>' + characterResults[i].events.items[y].name + '</p>' +
                    '</li>\n' +
                    '</div>' +
                    '<div class="col-sm-4">' +
                    '<button class="eventInfo" value="' + characterResults[i].events.items[y].resourceURI + '">More Info?</button>' +
                    '</div>' +
                    '</div>';

            }
        }

        output += '</ol>' +
            '</div>\n' +
            '<div class="modal-footer">\n' +
            '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>';

    }
    output += '<div id="info" class="col-sm-4">' +
        '</div>' +
        '</ul>';
    $('#results').append(output);
}

//Inserts information from API into info div of searches
function processSearch(searchResults) {

    var searchOutput =
        '<div class="modal fade" id="comicModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n' +
        '<div class="modal-dialog" role="document">\n' +
        '<div class="modal-content">\n' +
        '<div class="modal-header">\n' +
        '<h5 class="modal-title" id="exampleModalLabel">' + searchResults.title + '</h5>\n' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '<span aria-hidden="true">&times;</span>\n' +
        '</button>\n' +
        '</div>\n' +
        '<div class="modal-body">\n' +
        '<h2>Biography</h2>' + searchResults.description +
        '<br/>' +
        '</div>\n' +
        '<div class="modal-footer">\n' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>';


    $('#info').append(searchOutput);
    $('#comicModal').modal();


}