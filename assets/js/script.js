function openPage() {
    var searchResult = document.getElementById("search").value; // Grabs result
    var resultChopped = searchResult.toLowerCase().replace(/\s/g, ''); // Cuts out spaces and makes all lowercase to search easier
    console.log(searchResult);
    if (resultChopped === "bulldog") {
        window.location.href="./index.html";
        console.log(searchResult);
    }

    if (resultChopped === "goldenretriever") { //Change this to function as "Check database for resultChopped and if it's there, go there"
        window.location.href="./index.html";
        console.log(searchResult);
    }
}

function searchHistory() { //rudimentary way of grabbing the recent search so we can get the information and save it to local storage (not implemented)
    var recentSearch = [];
    recentSearch.push($('#search').val());

    $.each(recentSearch, function(index, value) {
        const p = document.createElement("p");
        p.innerHTML = value;
        document.getElementById("historyLine1").appendChild(p);
    })
}
    //Pseudo Code

    //Search for something
    //Search becomes history 1, history 2 becomes history 1, and history 3 becomes history 2
    //If any history is empty, do not show box logic
    //Only show search history when search bar is clicked
    //Also, make it so it saves the history variables to browser

    //Would like to make it so clicking the search bar icon does a search, but didn't get to it









