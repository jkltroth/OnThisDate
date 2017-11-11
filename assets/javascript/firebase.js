// Function to capitalize first letters of city/town inpu and to lowercase all other letters
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCekWQfFABo4qLyw2juKrVUBsg6vuTso6o",
    authDomain: "project1jklp.firebaseapp.com",
    databaseURL: "https://project1jklp.firebaseio.com",
    projectId: "project1jklp",
    storageBucket: "project1jklp.appspot.com",
    messagingSenderId: "968694440426"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// On click function for the submit button..
$('#search-btn').on('click', function (event) {
    if (formIsValid()) {

        // Prevent page refresh
        event.preventDefault();

        // Set date input to dateInput variable
        let dateInput = $("#date-input").val().trim();
        // Format dateInput as YYYYMMDD
        let dateFormatted = moment(dateInput).format("YYYYMMDD");
        // Set state input to state variable
        let state = $("#state-input").val().trim();
        // Set city input to city variable
        let city = $("#city-input").val().trim();

        // Push input values (as variables) to the database
        database.ref().push({
            date: dateFormatted,
            state: state,
            city: city,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    } else {
        event.preventDefault();
    }
});

// Firebase watcher + initial loader
database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function (childSnapshot) {

    //Remove the 5th item in the table when something changes in the DB
    $("#recentSearches tr:nth-child(5)").remove();

    // Log everything that's coming out of snapshot
    console.log("Date: " + childSnapshot.val().date);
    console.log("State: " + childSnapshot.val().state);
    console.log("City: " + childSnapshot.val().city);

    let city = childSnapshot.val().city;

    city = toTitleCase(city);

    let state = childSnapshot.val().state;

    let date = childSnapshot.val().date;

    // append items to html
    $("#recentSearches").prepend(
        "<tr><td class='city'> " + city +
        " </td><td class='state'> " + state +
        " </td><td class='date'> " + moment(date).format("MM/DD/YYYY") + "</td></tr>");


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});