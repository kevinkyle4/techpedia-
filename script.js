// variables
var titles = []
var tableInfoArray = []
var linkDisplay = $("#wikilink")
linkDisplay.css("display","none")
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
        console.log(id)
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
                var frameworkTitle = "https://en.wikipedia.org" + currentRow.children("a").attr("title");
                frameworkInfo.push({
                    name: frameworkName,
                    link: frameworkLink,
                    title: frameworkTitle.replace("https://en.wikipedia.org", "")
                });

            }
        });
        cb(frameworkInfo);
    });
    
}

// function that creates our stargazer statistic 
function testing(frameWorkName, cb) {

    var newQuery = "https://api.github.com/orgs/" + frameWorkName + "/repos"
    
    $.ajax({
        url: newQuery,
        method: "GET"
    }).then(function (response) {
        var results = response[0].stargazers_count
        cb(results)
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
var languages = ["PHP", "Java", "HTML, CSS", "JavaScript", "C++", "Python"];
var logoImagesArray = ["https://i.ibb.co/KXZ8v0F/download-5.png", "https://i.ibb.co/z71GRWt/download-9.png", "https://i.ibb.co/FVCY1k4/download-7.png",  "https://i.ibb.co/MpWbHXK/download-8.png", "https://i.ibb.co/x2Fz2Jv/download-3.png", "https://i.ibb.co/x5v3MgT/download-5.jpg"];


function createButtons(array1, array2) {
    var body = $("#mainBody")
    
    $(array1).each(function (i) {
        var button = $("<button>").text(array1[i]);
        var image = $("<img>").attr("src", array2[i])
        var buttonDiv = $("<div>").attr("class", "")
        
        button.attr("id", array1[i])
        image.attr("class", "button").css("max-height", "+=150").css("max-width","+=180").css("min-height", "+=150").css("min-width",   )
        button.attr("class", "button")
        
        body.append(buttonDiv)
        buttonDiv.append(image)
        buttonDiv.append("<br>")
        buttonDiv.append(button)

        
        
    })
    
}


createButtons(languages, logoImagesArray)


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

            if (titles[i].name != null) {
                var frameworkTitle = $("<tr>").text(titles[i].name).attr("href", titles[i].link);
                $(frameworkTitle).attr("id", titles[i].name).attr("class", "framework").attr("title", titles[i].title)
                
                $("#table").append(frameworkTitle);
            }
            
        })
    });
    
    
})

// creates a table of basic information based on framework selected.
$("#table").on("click", ".framework", function () {
    $("#table2").empty()
    $(".middle").empty()

    
    var frameworkLink = $(this).attr("href")
    getFrameworkTable(frameworkLink, function () {
        linkDisplay.attr("href", frameworkLink).css("display", "")

        tableInfoArray.forEach(function (item, i) {
            var row = $("<tr>").attr("id", "row" + [i]).attr("class", "tabledata")
            var tableTitle = $("<th>").text(tableInfoArray[i].title);
            var tableInfo = $("<td>").text(tableInfoArray[i].info);
            $("#table2").append(row);
            $("#row" + [i]).append(tableTitle);
            $("#row" + [i]).append(tableInfo);
            
        })
        
    })
})

$("#table").on("click", ".framework", function (e) {
    var currentEl = $(this).text()

    testing(currentEl, function (response) {

        var rating = $("<div>")
        var starsEl = $("<div>").text("Stargazer Rating: " + response)
        var extrastar = $("<i>").attr("class", "fa fa-star")

        $(rating).append(extrastar)
        $(rating).append(starsEl)

        $(".middle").prepend(rating)

    });
});
