var characterResults = {};
var comicResults;
var eventResults;
var notFound = new String("http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available").valueOf();

$(document).ready(function() {
    $("#submit").click(function () {

        $("#results").empty();
        var characterName = $('#characterSearch').val();
        characterSearch(characterName, process);
        //console.log(characterResults);
    });
});

function characterSearch(name, callback) {

    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?nameStartsWith='+name;
    $.getJSON( marvelAPI, {
        //As this is a client side application these is no need for the private API key only the public will be used. However if this was created using any sever side technologies the private API key must be used as
        // well as a time stamp. All three of these varibles would be used in unison and encrypted in MD5
        apikey: '3996055df50e231be7c25a0aee2e71a0'
    })
        .then(function( response ) {

            //console.log(response.data.results);
            characterResults = response.data.results;
            callback(characterResults);

        });

}

function comicSearch(id) {

    var marvelAPI = 'https://gateway.marvel.com/v1/public/comics/'+id;
    $.getJSON( marvelAPI, {
        //As this is a client side application these is no need for the private API key only the public will be used. However if this was created using any sever side technologies the private API key must be used as
        // well as a time stamp. All three of these varibles would be used in unison and encrypted in MD5
        apikey: '3996055df50e231be7c25a0aee2e71a0'
    })
        .done(function( response ) {
            comicResults = response.data.results;
        });

}

function eventSearch(id) {

    var marvelAPI = 'https://gateway.marvel.com/v1/public/comics/'+id;
    $.getJSON( marvelAPI, {
        //As this is a client side application these is no need for the private API key only the public will be used. However if this was created using any sever side technologies the private API key must be used as
        // well as a time stamp. All three of these varibles would be used in unison and encrypted in MD5
        apikey: '3996055df50e231be7c25a0aee2e71a0'
    })
        .done(function( response ) {
            eventResults = response.data.results;
        });

}

function process(characterResult) {
    var resultsLen = characterResults.length;
    var output = '<ul class="list-group">';
    for(var i=0; i<resultsLen; i++){

        var imageCheck = new String(characterResults[i].thumbnail.path).valueOf();
        var descrCheck = new String(characterResults[i].description).valueOf();

        //Check for Thumbnail Image on Character & generation of modals
        if(imageCheck != notFound) {
            var imgPath = characterResults[i].thumbnail.path + '/standard_fantastic.' + characterResults[i].thumbnail.extension;
        }
        else {
            imgPath = src="images/imageNotFound.png";
        }
        //Check for Character Description
        if (descrCheck != "") {
            desriptionString = characterResults[i].description;
        }
        else {
            desriptionString = "No Description Available";
        }
        output += '<button type="button" data-toggle="modal" data-target="#'+characterResults[i].id+'Modal"><li class="list-group-item"><img src="' + imgPath + '"><br>'+characterResults[i].name+'</li></button>\n' +
            '<!-- Modal -->\n' +
            '<div class="modal fade" id="'+characterResults[i].id+'Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n' +
            '<div class="modal-dialog" role="document">\n' +
            '<div class="modal-content">\n' +
            '<div class="modal-header">\n' +
            '<h5 class="modal-title" id="exampleModalLabel">'+characterResults[i].name+'</h5>\n' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
            '<span aria-hidden="true">&times;</span>\n' +
            '</button>\n' +
            '</div>\n' +
            '<div class="modal-body">\n' +
            '<h3>Biography</h3>'
            +desriptionString+
            '</div>\n' +
            '<div class="modal-footer">\n' +
            '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>';

    }
    output += '</ul>';
    $('#results').append(output);
}