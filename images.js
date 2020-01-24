
var imageId = ""
var globalImageURL = ""
function imageAjax(frameworkTitleEl, cb) {

    var title = frameworkTitleEl.attr("title")

    var queryURL = "https://cors-anywhere.herokuapp.com/https://www.wikipedia.org/w/api.php?action=query&format=json&prop=images&titles=" + title;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        var pagesProperty = response.query.pages;
        var firstImage = pagesProperty[Object.keys(pagesProperty)[0]].images[0].title;

        cb(firstImage);

    });
}

$("#table").on("click", ".framework", function () {
    // var title = $(this).attr("title");
    var currentEl = $(this);

    imageAjax(currentEl, function (response) {
        imageId = response;
        query2(imageId, function (imageUrl) {
            console.log("imageUrl: ")
            console.log(imageUrl);
            var frameworkLogo = $("<img>").attr("src", imageUrl)
            $("#table").(frameworkLogo)

        })
    });

    console.log(globalImageURL)
});

function query2(imageId, cb) {

    var queryURL2 = "https://cors-anywhere.herokuapp.com/http://en.wikipedia.org/w/api.php?action=query&titles=" + imageId + "&prop=imageinfo&iiprop=url&format=json";

    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var pagesProperty = response.query.pages;
        var objImageURL = pagesProperty[Object.keys(pagesProperty)[0]].imageinfo[0].url;

        cb(objImageURL);

    });


};

