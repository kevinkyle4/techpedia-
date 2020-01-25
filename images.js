function query1() {

    var queryURL = "https://cors-anywhere.herokuapp.com/https://www.wikipedia.org/w/api.php?action=query&format=json&prop=images&titles=C%2B%2B"


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

 
        var imageFile = (response.query.pages[72038].images[0]);
        return(imageFile);
    
});
};
// query1();

function query2() {

var queryURL2 = "https://cors-anywhere.herokuapp.com/http://en.wikipedia.org/w/api.php?action=query&titles=File:React-icon.svg&prop=imageinfo&iiprop=url&format=json";

$.ajax({
    url: queryURL2,
    method: "GET"
}).then(function (response) {

var imgURL = (response.query.pages[-1].imageinfo[0].url)
console.log(imgURL)

var iconid = $("#img-logo");
iconid.attr('src', imgURL);

});

    
};

query2();

