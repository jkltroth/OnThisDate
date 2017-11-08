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
    });

});

// Firebase watcher + initial loader
database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log("Train Name: " + childSnapshot.val().date);
    console.log("Destination: " + childSnapshot.val().state);
    console.log("First Train Time: " + childSnapshot.val().city);

    let date = childSnapshot.val().date;

    let state = childSnapshot.val().state;

    let city = childSnapshot.val().city;

    // append items to html
    $("#recentSearches").prepend(
        "<tr><td class='city'> " + city +
        " </td><td class='state'> " + state +
        " </td><td class='date'> " + moment(date).format("MM/DD/YYYY") + "</td></tr>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});