$('body').on('click', '#search-btn', function (event) {

    event.preventDefault();


    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=53012fe47d7d4df88e3e77c94cc85269";


    function nytSearch() {

        var query
        var searchState = $("#state-input").val();
        var searchCity = $("#city-input").val();
        // var searchQ = searchState + "%20" + searchCity;
        var limitAmt = $("#noToRetrieve").val();
        var startY = $("#date-input").val();

        // var dateFormatted = moment(startY).format("YYYYMMDD");
        var endY = startY;

        // var endY = $("#endYear").val();



        if ((searchState == "") || (searchCity == "")) {
            alert("Search terms are required.");
            return;
        };

        url += "&q=" + searchCity;
        url += "&fq=" + searchState;


        // create before and after dates 
        var dateSplit = startY.split('-');
        var today = new Date();
        today.setYear(dateSplit[0]);
        today.setMonth(dateSplit[1] -1);
        today.setDate(dateSplit[2]);
        console.log(today);
        
        var yesterday = new Date(today.getTime());
        yesterday.setDate(yesterday.getDate()-1);
        console.log(yesterday);

        var tomorrow = new Date(today.getTime());
        tomorrow.setDate(tomorrow.getDate()+1);
        console.log(tomorrow);
        
        var dateB = moment(yesterday).format("YYYYMMDD");
        var dateA = moment(tomorrow).format("YYYYMMDD");
        console.log(dateB);
        console.log(dateA);

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

                $("#news-results-table").text("No articles meet your criteria");
            }



        }).fail(function (err) {
            throw err;
        });
    };
    // $("#news-results-table").empty();
    nytSearch();


}); // end onclick