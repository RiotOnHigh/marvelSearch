$(function(){
    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?nameStartsWith=Iron';
    $.getJSON( marvelAPI, {
        apikey: '3996055df50e231be7c25a0aee2e71a0'
    })
        .done(function( response ) {
            var results = response.data.results;
            var resultsLen = results.length;
            console.log(resultsLen);
            var output = '<ul>';

            for(var i=0; i<resultsLen; i++){
                console.log(results[i].thumbnail.path);
                if(results[i].thumbnail.path != "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
                    var imgPath = results[i].thumbnail.path + '/standard_fantastic.' + results[i].thumbnail.extension;
                    output += '<li><img src="' + imgPath + '"><br>'+results[i].name+'</li>';
                }
                else {
                    output += '<li><img src="images/imageNotFound.png"><br>'+results[i].name+'</li>';
                }
            }
            output += '</ul>'
            $('#results').append(output);
        });

});