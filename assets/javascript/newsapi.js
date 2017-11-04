$('body').on('click', '#search', function (event) {

    event.preventDefault();


    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=53012fe47d7d4df88e3e77c94cc85269";


    function nytSearch() {

        var query
        var searchQ = $("#location").val().trim();
        var limitAmt = $("#noToRetrieve").val();
        var startY = $("#startYear").val();
        var endY = $("#endYear").val();


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


            }





        }).fail(function (err) {
            throw err;
        });
    };

    nytSearch();


}); // end onclick