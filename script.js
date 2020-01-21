


// variables
var titles = []

// function containing ajax call
function getFrameworkInfo(wikipediaTableHeaderName, cb) {
    //everything inside of this function works, we just need to figure out the return of the array
    var frameworkInfo = [];
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/wiki/Comparison_of_web_frameworks",
        method: "GET"
    }).then(function (res) {
        //create a jquery object with the response that we get 
        var html = $(res);
        //use the param to create an id tag
        var id = "#" + wikipediaTableHeaderName.replace(" ", "_");
        var javaHeader = html.find(id);
        var javaTableRows = javaHeader.parent().next().next().children("tbody").children("tr");

        javaTableRows.each(function (i) {
            //skip the first header that says "Project"
            if (i != 0) {
                //get the text content of each row that we found, aka each framework
                var currentRow = $(this).find("th:nth-child(1)");
                var frameworkName = currentRow.text();
                var frameworkLink = "https://en.wikipedia.org" + currentRow.children("a").attr("href");
                frameworkInfo.push({
                    name: frameworkName,
                    link: frameworkLink
                });

            }
        });
        cb(frameworkInfo);
    });

}



var languages = ["PHP", "Java", "HTML, CSS", "JavaScript", "C++"];

function createButtons(array) {
    var body = $("#mainBody")

    $(array).each(function (i) {
        var button = $("<button>").text(array[i])
        button.attr("id", array[i])
        button.attr("class", "button")
        body.append(button)

    })

}


createButtons(languages)



// event listeners
$(".button").click(function (event) {
    event.preventDefault();
    titles = [];
    var id = $(event.target).attr("id");

    getFrameworkInfo(id, function (results) {
       
        results.forEach(function (result) {
            titles.push(result);
        });

        console.log(titles)

        titles.forEach(function (i) {
            var frameworkTitle = $("<h1>");

            frameworkTitle.text(titles.name)
            console.log(frameworkTitle);
        })
    });


})

