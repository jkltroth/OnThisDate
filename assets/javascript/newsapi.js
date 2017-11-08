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
        var dateFormatted = moment(startY).format("YYYYMMDD");
        var endY = dateFormatted;

        // var endY = $("#endYear").val();



        if ((searchState == "") || (searchCity == "")) {
            alert("Search terms are required.");
            return;
        };

        url += "&q=" + searchCity;
        url += "&fq=" + searchState;


        // create before and after dates 
        // var date = new Date(dateFormatted);
        console.log(startY);
        var dateresult = startY.split('-');
        var dd = dateresult[2];
        var mm = dateresult[1];
        var yyyy = dateresult[0];
        console.log(yyyy + " " + mm + " " + dd);
        dd--;
        console.log(dd + " " + mm);
        var datebefore = yyyy + "/" + mm + "/" + dd;
        var dateafter =  yyyy + "/" + mm + "/" + dd;
        if (dd < 10) {
            datebefore = '0' + yyyy + "/" + mm + "/" + dd;

        } else if (dd >= 10) {
            datebefore = yyyy + "/" + mm + "/" + dd;
        }

        console.log(datebefore);

        dd = dd + 2;

        if (dd < 10) {
            dateafter = '0' + yyyy + "/" + mm + "/" + dd;

        } else if (dd >= 10) {
            dateafter = yyyy + "/" + mm + "/" + dd;
        }

        console.log(dateafter);
        var dateB = moment(datebefore).format("YYYYMMDD");
        var dateA = moment(dateafter).format("YYYYMMDD");
     
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

                varDiv.append(td1);
                varDiv.append(td2);

                $("#news-results-table").append(varDiv);
                $("#news-results-table").hover(function () {
                    $(this).css("background-color", "darkblue");
                }, function () {
                    $(this).css("background-color", "lightblue");
                });

            }





        }).fail(function (err) {
            throw err;
        });
    };

    nytSearch();


}); // end onclick