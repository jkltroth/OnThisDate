var dateA, dateB;

function formIsValid() {
    var form = document.getElementById('needs-validation');
    var errDiv = $("#errorDiv");
    if (form.checkValidity() === false) {
        $('.errorDiv').html('Please populate all fields');
        console.log('failed validation');
        event.preventDefault();
        event.stopPropagation();
        return false;
    } else {
        var dateToCheck = $("#date-input").val();
        return checkDate(dateToCheck);
    }
}

function checkDate(dateIn) {

    console.log("in checkDate");
    var dateSplit = dateIn.split('-');
    var dateInput = new Date();
    if (dateSplit[0] > dateInput.getFullYear() || dateSplit[0] < 1900 ) {
        $('.errorDiv').html("Enter valid date");
        return false;
    }
    dateInput.setYear(dateSplit[0]);
    dateInput.setMonth(dateSplit[1] - 1);
    dateInput.setDate(dateSplit[2]);
    console.log("date input " + dateInput);

    // check if date year is valid and not in future
    var todaysDate = new Date();
    if (dateInput > todaysDate) {
        $('.errorDiv').html("Enter valid date");
        return false;

    };

    var yesterday = new Date(dateInput.getTime());
    yesterday.setDate(yesterday.getDate() - 1);
    console.log(yesterday);

    var tomorrow = new Date(dateInput.getTime());
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log(tomorrow);

    dateB = moment(yesterday).format("YYYYMMDD");
    dateA = moment(tomorrow).format("YYYYMMDD");
    console.log(dateB);
    console.log(dateA);
    return true;

};



$(document).ready(function () {
    // form submit handler
    $('body').on('click', '#search-btn', function (event) {
        dateA = "";
        dateB = "";
        $("#news-results").empty();
        if (formIsValid()) {

            event.preventDefault();
            $(".errorDiv").html("");
            var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=53012fe47d7d4df88e3e77c94cc85269";

            function nytSearch() {

                var query
                var searchState = $("#state-input").val();
                var searchCity = $("#city-input").val();
                // var searchQ = searchState + "%20" + searchCity;
                var limitAmt = $("#noToRetrieve").val();
                var startY = $("#date-input").val();
                console.log("date entered is = " + startY);

                // var dateFormatted = moment(startY).format("YYYYMMDD");
                var endY = startY;

                // var endY = $("#endYear").val();

                // if ((searchState == "") || (searchCity == "")) {
                //     alert("Search terms are required.");
                //     return;
                // };

                url += "&q=" + searchCity;
                url += "&fq=" + searchState;


                // create before and after dates 


                if (endY !== "") {
                    url += "&begin_date=" + dateB;
                }

                if (startY !== "") {
                    url += "&end_date=" + dateA;
                }

                if (limitAmt !== "") {
                    limitAmt = 1;
                    url += "&limit=" + limitAmt;
                }

                // console.log("searchQ is " + searchQ);

                $.ajax({
                    url: url,
                    method: 'GET',
                }).done(function (result) {
                    console.log(result);
                    console.log(url);

                    var articleObjects = result.response.docs;
                    for (var i = 0; i < articleObjects.length; i++) {
                        var element = articleObjects[i];
                        console.log(element.web_url);
                        console.log(element.abstract);
                        var dateFormatted = moment(startY).format("MM/DD/YYYY");
                        console.log("formatted date is " + dateFormatted);
                        var articleText = "";
                        if (!(element.abstract)) {
                            articleText = element.snippet
                        } else {
                            articleText = element.abstract;
                        };
                        var pubDate = moment(element.pub_date).format("MM/DD/YYYY");
                        var varDiv = $('<tr>');
                        var td1 = $('<td>' + pubDate + '</td>');
                        var td2 = $('<td>' + '<a href="' + element.web_url + '" >' + element.web_url + '</a><br>' + articleText + '</td>');

                        // var td2 = $('<td>' + element.web_url + '<br>' + articleText + '</td>');
                        varDiv.text("");
                        $("#news-results-table").append(varDiv);

                        varDiv.append(td1);
                        varDiv.append(td2);

                        $("#news-results-table").append(varDiv);
                        // $("#news-results-table").hover(function () {
                        //     $(this).css("background-color", "darkblue");
                        // }, function () {
                        //     $(this).css("background-color", "lightblue");
                        // });

                    }


                    if (!(pubDate)) {

                        $("#news-results").text("No articles meet your criteria");
                    }



                }).fail(function (err) {
                    throw err;
                });
            };
            $("#news-results").empty();
            nytSearch();

        } else {
            event.preventDefault();
        }
    }); // end onclick
}); //end doc.ready