$('body').on('click', '#search-btn', function (event) {

    event.preventDefault();


    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=53012fe47d7d4df88e3e77c94cc85269";


    function nytSearch() {

        var query
        var searchQ = $("#state-input" + " " + "#city-input").val();
        var limitAmt = $("#noToRetrieve").val();
        var startY = $("#date-input").val();
        var endY = startY;

        // var endY = $("#endYear").val();


        if (searchQ == "") {
            alert("Search terms are required.");
            return;
        }

        url += "&q=" + searchQ;

        if (endY !== "") {
            url += "&end_date=" + endY;
        }

        if (startY !== "") {
            url += "&start_date=" + startY;
        }

        if (limitAmt !== "") {
            limitAmt = 1;
            url += "&limit=" + limitAmt;
        }

        $.ajax({
            url: url,
            method: 'GET',
        }).done(function (result) {
            console.log(result);
            console.log(url);
            var articleObjects = result.response.docs;
            for (var i = 0; i < 1; i++) {
                var element = articleObjects[i];
                console.log(element.web_url);
                console.log(element.snippet);

                var varDiv = $('<tr>');
                var td1 = $('<td>' + startY + '</td>');
                var td2 = $('<td>' + element.web_url + " " + element.snippet + '</td>');
                
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