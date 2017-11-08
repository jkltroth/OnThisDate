$('body').on('click', '#search-btn', function (event) {

    event.preventDefault();


    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=53012fe47d7d4df88e3e77c94cc85269";


    function nytSearch() {

        var query
        var searchState = $("#state-input").val();
        var searchCity = $("#city-input").val();
        var searchQ = searchState + " " + searchCity;
        var limitAmt = $("#noToRetrieve").val();
        var startY = $("#date-input").val();
        var dateFormatted = moment(startY).format("YYYYMMDD");
        var endY = dateFormatted;

        // var endY = $("#endYear").val();


        if (searchQ == "") {
            alert("Search terms are required.");
            return;
        }

        url += "&q=" + searchQ;

        if (endY !== "") {
            // url += "&end_date=" + dateFormatted;
        }

        if (startY !== "") {
            url += "&begin_date=" + dateFormatted;
        }

        if (limitAmt !== "") {
            limitAmt = 1;
            url += "&limit=" + limitAmt;
        }
console.log("searchQ is " + searchQ);

        $.ajax({
            url: url,
            method: 'GET',
        }).done(function (result) {
            console.log(result);
            console.log(url);
            var articleObjects = result.response.docs;
            for (var i = 0; i < 4; i++) {
                var element = articleObjects[i];
                console.log(element.web_url);
                console.log(element.abstract);
                var dateFormatted = moment(startY).format("MM/DD/YYYY");
                console.log("formatted date is " + dateFormatted);
                var articleText="";
                if (!(element.abstract)) { 
                    articleText = element.snippet}

                    else {articleText = element.abstract;};

                var varDiv = $('<tr>');
                var td1 = $('<td>' + dateFormatted + '</td>');
                var td2 = $('<td>' + '<a href="' + element.web_url  + '" >' + element.web_url + '</a><br>' + articleText + '</td>');

                // var td2 = $('<td>' + element.web_url + '<br>' + articleText + '</td>');

                varDiv.append(td1);
                varDiv.append(td2);

                $("#news-results-table").append(varDiv);


            }





        }).fail(function (err) {
            throw err;
        });
    };

    nytSearch();


}); // end onclick