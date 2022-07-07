var subBreedButtonEl = document.querySelector("#sub-button");
var subImagesEl = document.querySelector("#sub-images");
var resultChopped;

function openPage() {
    var searchResult = document.getElementById("search").value; // Grabs result
    resultChopped = searchResult.toLowerCase().replace(/\s/g, ''); // Cuts out spaces and makes all lowercase to search easier
    console.log(searchResult);
    console.log(resultChopped);
    // if (resultChopped === "bulldog") {
    //     window.location.href = "./index.html";
    //     console.log(searchResult);
    // }

    // if (resultChopped === "goldenretriever") { //Change this to function as "Check database for resultChopped and if it's there, go there"
    //     window.location.href = "./index.html";
    //     console.log(searchResult);
    // }
    // call sub-breed api function
    getBreed(resultChopped);
    //getBreedImage(resultChopped);
}

// fetch dog sub-breed list
function getBreed(resultChopped) {
    var apiUrl = "https://dog.ceo/api/breed/" + resultChopped + "/list";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                createButton(data);
                // create buttons for sub-breeds
                function createButton(data) {
                    // clear any existing buttons
                    subBreedButtonEl.textContent = "";
                    for (var i = 0; i < data.message.length; i++) {
                        if (data.message[i]) {
                            subBreed = data.message[i];
                            //console.log(subBreed + "SUB BREED");
                        }
                        console.log(subBreed + " SUB BREED");

                        // create a container for each sub-breed
                        var buttonEl = document.createElement("button");

                        // create a span element to hold sub-breed name
                        var titleEl = document.createElement("span");
                        titleEl.textContent = subBreed;

                        buttonEl.appendChild(titleEl);

                        subBreedButtonEl.appendChild(buttonEl);

                        // add click event listener for sub-breed buttons
                        subBreedButtonEl.addEventListener("click", buttonClick);
                        //console.log(click);
                    }
                }
                if (data.message.length === 0) {
                    console.log("BLANK ARRAY");
                    getBreedImage(resultChopped);
                    // fetch breed images
                    function getBreedImage(resultChopped) {
                        var apiImageUrl = "https://dog.ceo/api/breed/" + resultChopped + "/images";
                        
                        subImagesEl.textContent = "";
                        fetch(apiImageUrl).then(function (response) {
                            if (response.ok) {
                                response.json().then(function (data) {
                                    console.log(data);

                                    for (var i = 0; i < 4; i++) {
                                        if (data.message[i]) {

                                            var subParentEl = document.createElement("div");
                                            subImagesEl.appendChild(subParentEl);

                                            subImage = data.message[i];

                                            console.log(subImage + " SUB IMAGE");

                                            // create a container for each sub-image
                                            var imageEl = document.createElement("img");
                                            imageEl.setAttribute("src", subImage);
                                            subParentEl.appendChild(imageEl);
                                        }
                                    }
                                });
                            } else {
                                console.log("breed IMAGE not found");
                            }
                        });
                    }
                }
            });
        } else {
            console.log("dog breed not found");
        }
    });
}

function buttonClick(event) {
    var btnClick = event.target.textContent;
    getBreedImage(resultChopped + "/" + btnClick);
}

// fetch breed image
function getBreedImage(resultChopped) {
    var apiImageUrl = "https://dog.ceo/api/breed/" + resultChopped + "/images";

    subImagesEl.textContent = "";
    fetch(apiImageUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                for (var i = 0; i < 4; i++) {
                    if (data.message[i]) {

                        var subParentEl = document.createElement("div");
                        subImagesEl.appendChild(subParentEl);

                        subImage = data.message[i];

                        console.log(subImage + " SUB IMAGE");

                        // create a container for each sub-image
                        var imageEl = document.createElement("img");
                        imageEl.setAttribute("src", subImage);
                        subParentEl.appendChild(imageEl);
                    }
                }
            });
        } else {
            console.log("breed IMAGE not found");
        }
    });
}

function searchHistory() { //rudimentary way of grabbing the recent search so we can get the information and save it to local storage (not implemented)
    var recentSearch = [];
    recentSearch.push($('#search').val());

    $.each(recentSearch, function (index, value) {
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



    // ALEX Pseudo Code
    // when breed family is searched, display clickable buttons of sub-breeds
    // if no sub-breeds return (array length 0), but family returns (ex pitbull) - display images of family
    // when sub-breed buttons are clicked, display images for sub-breed
    // test comments 












