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
        document.getElementById("historyLine1").appendChild(p);
    })

    //Pseudo Code

    //Search for something
    //Search becomes history 1, history 2 becomes history 1, and history 3 becomes history 2
    //If any history is empty, do not show box logic
    //Only show search history when search bar is clicked
    //Also, make it so it saves the history variables to browser
}

//Search Bar testing
//I screwed something up by the way, can't tell why the X icon is posting whatever I have in the search form, maybe because of onChange

const clearIcon = document.querySelector(".clear-icon");
const searchBar = document.querySelector(".search");
const searchIcon = document.querySelector(".search-icon");

clearIcon.addEventListener("click", () => {
  searchBar.value = "";
  clearIcon.style.visibility = "hidden";
})

searchIcon.addEventListener("click", () => {
    searchBar.value = "";
    clearIcon.style.visibility = "hidden";
})
















