function openPage() {
    var searchResult = document.getElementById("search").value.toLowerCase().replace(/\s/g, ''); // This grabs the result, makes it all lowercase, and removes the spaces from the variable.
    console.log(searchResult);
    if (searchResult.toLowerCase() === "bulldog") {
        window.location.href="./index.html";
        console.log(searchResult);
    }

    if (searchResult.toLowerCase() === "goldenretriever") { //Change this to function as "Check database for searchResult and if it's there, go to that page"
        window.location.href="./index.html";
        console.log(searchResult);
    }
}

function searchHistory() {
    var recentSearch = [];
    recentSearch.push($('#search').val());

    $.each(recentSearch, function(index, value) {
        const p = document.createElement("p");
        p.innerHTML = value;
        document.getElementById("historyLine").appendChild(p);
    })

    // Ordering

    // Search Bar
    // History 1
    // History 2
    // History 3

    //Pseudo Code

    //Search for something
    //Search becomes history 1, history 2 becomes history 1, and history 3 becomes history 2
    //If any history is empty, do not show box logic
    //Only show when search bar is clicked
}


















