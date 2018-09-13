var notFound = new String("http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available").valueOf();
var desriptionString;

$(function(){

    //Url used to access the API, many variations can be used, to see these look at the interactive documentation of the API found on Marvels site
    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?nameStartsWith=Spider';
    $.getJSON( marvelAPI, {
        //As this is a client side application these is no need for the private API key only the public will be used. However if this was created using any sever side technologies the private API key must be used as
        // well as a time stamp. All three of these varibles would be used in unison and encrypted in MD5
        apikey: '3996055df50e231be7c25a0aee2e71a0'
    })
        .done(function( response ) {
            var results = response.data.results;
            var resultsLen = results.length;
            console.log(resultsLen);
            var output = '<ul class="list-group">';

            for(var i=0; i<resultsLen; i++){
                var imageCheck = new String(results[i].thumbnail.path).valueOf();
                var descrCheck = new String(results[i].description).valueOf();
                if (descrCheck != "") {
                    desriptionString = results[i].description;
                    console.log("1");
                }
                else {
                    desriptionString = "No Description Available";
                }
                if(imageCheck != notFound) {
                    var imgPath = results[i].thumbnail.path + '/standard_fantastic.' + results[i].thumbnail.extension;
                }
                else {
                    var imgPath = src="images/imageNotFound.png";
                }
                    output += '<button type="button" data-toggle="modal" data-target="#'+results[i].id+'Modal"><li class="list-group-item"><img src="' + imgPath + '"><br>'+results[i].name+'</li></button>\n' +
                              '<!-- Modal -->\n' +
                              '<div class="modal fade" id="'+results[i].id+'Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n' +
                              '<div class="modal-dialog" role="document">\n' +
                              '<div class="modal-content">\n' +
                              '<div class="modal-header">\n' +
                              '<h5 class="modal-title" id="exampleModalLabel">'+results[i].name+'</h5>\n' +
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
            output += '</ul>'
            $('#results').append(output);
        });

});