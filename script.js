

// variables
var titles = []
var tableInfoArray = []
var languages = ["PHP", "Java", "HTML, CSS", "JavaScript", "C++", "Python"];

// functions containing ajax calls //

// function that creates our list of frameworks
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
        console.log(html)

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

// function that creates our framework tables
function getFrameworkTable(frameworkLink, cb) {
    //everything inside of this function works
    var queryURL = "https://cors-anywhere.herokuapp.com/" + frameworkLink
    tableInfoArray = []

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
        //create a jquery object with the response that we get 
        var html = $(res);
        //use the param to create an class tag
        var tableClass = ".infobox"
        var infoTable = html.find(tableClass);
        var infoTableHeader = html.find(".summary").text()
        var infoTableRows = infoTable.children("tbody").children("tr")
        console.log(infoTableRows)

        infoTableRows.each(function (i) {

            //get the text content of each row that we found
            var currentRowTitle = $(this).find("th").text();
            var currentRowInfo = $(this).find("td").text()


            if (currentRowTitle != "" && currentRowInfo != "") {
                tableInfoArray.push({
                    title: currentRowTitle,
                    info: currentRowInfo
                });

            }

        });

        cb(tableInfoArray);

    });

}


// Functions without ajax calls

// function that dynamically creates our buttons on load
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


// event listeners //

// Creates the framworks table based on language selected
$(".button").click(function (event) {
    event.preventDefault();
    titles = [];
    $("#table").empty()

    var id = $(event.target).attr("id");

    getFrameworkInfo(id, function (results) {

        results.forEach(function (result) {
            titles.push(result);
        });

        titles.forEach(function (item, i) {
            var frameworkTitle = $("<tr>").text(titles[i].name).attr("href", titles[i].link);
            $(frameworkTitle).attr("id", titles[i].name).attr("class", "framework")

            $("#table").append(frameworkTitle);

        })
    });


})

// creates a table of basic information based on framework selected.
$("#table").on("click", ".framework", function () {
    $("#table").empty()

    var frameworkLink = $(this).attr("href")
    getFrameworkTable(frameworkLink, function () {


        console.log(tableInfoArray)

        tableInfoArray.forEach(function (item, i) {
            var row =$("<tr>").attr("id", "row"+[i])
            var tableTitle = $("<th>").text(tableInfoArray[i].title);
            var tableInfo = $("<td>").text(tableInfoArray[i].info);

            $("#table").append(row);
            $("#row"+[i]).append(tableTitle);
            $("#row"+[i]).append(tableInfo);


            console.log("hi")
        })
    })
})
