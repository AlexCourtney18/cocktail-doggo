var subBreedButtonEl = document.querySelector("#sub-button");
var subImagesEl = document.querySelector("#sub-images");
var errorBoxEl = document.querySelector("#error-page-box");
var errorContentEl = document.querySelector("#error-page-content");
var wikipedia = document.getElementById("wikipedia"); //This is the element with the random dog facts inside. Should change the name to be something other than wikipedia later.
var statistics = document.getElementById("statistics");
var resultChopped;
var dogFamily;
var searchButtonOriginal = document.getElementById("orange");
var searchFlag = false; // This variable is asking "Have you searched before?" 
var successfulSearchFlag; // This variable is asking "Have you succeeded at a search before?"

var doggieButtonClick;

searchButtonOriginal.addEventListener("click", openPage);
searchButtonOriginal.addEventListener("click", clearSearch);

var searchFlag = false; // This variable is asking "Have you searched before?" 
var successfulSearchFlag; // This variable is asking "Have you succeeded at a search before?"

function clearSearch() {
    document.querySelector("#dogQ").classList.add('hidden');
    document.getElementById('search').value = "";
}

function openPage() {
    while (userCardContainer.firstChild) {
        userCardContainer.removeChild(userCardContainer.firstChild);
    };
    document.querySelector("#webpage-title").classList.add('titleLefted');
    document.querySelector("#webpage-subtitle").classList.add('subtitleLefted')
    document.querySelector("#search-container").classList.add('searchRighted')
    document.querySelector("#deckbox").classList.add('resultsRighted')

    var searchResult = document.getElementById("search").value; // Grabs result
    resultChopped = searchResult.toLowerCase().replace(/\s/g, ''); // Cuts out spaces and makes all lowercase to search easier
    searchHistory(resultChopped);

    //THIS IS the call to the dog facts API>>>>>>>
    getDogInfo(resultChopped);
    //>>>>>>>>>>>>
    getBreed(resultChopped);
}



// Reference to Card Template
const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");
const url = "https://dog.ceo/api/breeds/list/all";

let breeds = [];

const handleSearchInput = (event) => {
    // Clear Card Container
    userCardContainer.innerHTML = "";

    // Get Search Textbox Value
    const searchTerm = event.target.value.toLowerCase();

    // Don't Add Cards if Search Input is Empty
    if (searchTerm === "") {
        document.querySelector("#dogQ").classList.add('hidden')
        return;
    };

    document.querySelector("#dogQ").classList.remove('hidden')

    // Filter Breeds by Search Term 
    const filterBreeds = breeds.filter(breed => {
        return breed.includes(searchTerm);
    });

    // Add Cards of Filtered Breeds
    filterBreeds.forEach(breed => {
        // Clone Card Template
        const card = userCardTemplate.content.cloneNode(true).children[0];
        const body = card.querySelector("[data-body]");

        // Set Cloned Card Text to Breed Name
        body.textContent = breed;

        // Append Card to Container
        userCardContainer.append(card);
        $(card).on("click", function () {
            resultChopped = body.textContent;
            console.log(resultChopped);
            document.querySelector("#webpage-title").classList.add('titleLefted');
            document.querySelector("#webpage-subtitle").classList.add('subtitleLefted')
            document.querySelector("#search-container").classList.add('searchRighted')
            document.querySelector("#deckbox").classList.add('resultsRighted')
            getDogInfo();
            searchHistory(resultChopped);
            getBreed(resultChopped);
            while (userCardContainer.firstChild) {
                userCardContainer.removeChild(userCardContainer.firstChild);
            }
        })
    });
};

// Search Input Event Listener
searchInput.addEventListener("input", handleSearchInput);


const getDogBreeds = async () => {
    let response = await fetch(url);
    let data = await response.json();
    breeds = Object.keys(data.message);
};

getDogBreeds();

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
                        }
                        console.log(subBreed + " SUB BREED");

                        // create a container for each sub-breed
                        var buttonEl = document.createElement("button");

                        // create a span element to hold sub-breed name
                        var titleEl = document.createElement("span");
                        titleEl.textContent = subBreed;

                        // append elements
                        buttonEl.appendChild(titleEl);

                        subBreedButtonEl.appendChild(buttonEl);

                        // add click event listener for sub-breed buttons
                        subBreedButtonEl.addEventListener("click", buttonClick);
                    }
                }
                // functionality to load breed images immediately if there are no sub-breeds listed in the api
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
                                    clearSearch();
                                    document.querySelector("#main-container").classList.add('vh20');
                                    for (var i = 0; i < 3; i++) {
                                        if (data.message[i]) {

                                            var subParentEl = document.createElement("div");
                                            subImagesEl.appendChild(subParentEl);

                                            subImage = data.message[i];

                                            console.log(subImage + " SUB IMAGE");

                                            // create a container for each sub-image/append
                                            var imageEl = document.createElement("img");
                                            imageEl.setAttribute("src", subImage);
                                            subParentEl.appendChild(imageEl);
                                            if (imageEl.height >= imageEl.width) {
                                                imageEl.setAttribute("height", imageEl.width);
                                                imageEl.setAttribute("class", "maxW");
                                                imageEl.setAttribute("class", "theH");
                                            } else {
                                                imageEl.setAttribute("width", imageEl.height);
                                                imageEl.setAttribute("class", "theH");
                                                imageEl.setAttribute("class", "maxW");
                                            }
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
            document.querySelector("#error-page-box").classList.add('hidden');
            document.querySelector("#error-page-content").classList.add('hidden');
            document.querySelector("#dog-facts").classList.add('hidden');

            doggieButtonClick = resultChopped;
            while (statistics.firstChild) {
                statistics.removeChild(statistics.firstChild);
            }
            console.log(doggieButtonClick);
            dogBreedFacts();
        } else {
            // clear previous content even when breed is searched that returns "not found"
            subImagesEl.textContent = "";
            subBreedButtonEl.textContent = "";
            console.log("dog breed not found");
            document.querySelector("#error-page-box").classList.remove('hidden');
            document.querySelector("#error-page-content").classList.remove('hidden');
            document.querySelector("#dog-facts").classList.remove('hidden');
            document.querySelector("#main-container").classList.add('vh25');

            while (statistics.firstChild) {

                statistics.removeChild(statistics.firstChild);
            }
        }
    });
}
// button click function for sub-breed buttons to pass through breed family + btnClick sub breed to breed images function

function buttonClick(event) {
    var btnClick = event.target.textContent;
    getBreedImage(resultChopped + "/" + btnClick);

    doggieButtonClick = event.target.textContent;
    console.log(doggieButtonClick);
    //console.log(dogFamily);
    dogBreedFacts();
}

// fetch breed image
function getBreedImage(resultChopped) {
    var apiImageUrl = "https://dog.ceo/api/breed/" + resultChopped + "/images";

    subImagesEl.textContent = "";
    fetch(apiImageUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                for (var i = 0; i < 3; i++) {
                    if (data.message[i]) {

                        var subParentEl = document.createElement("div");
                        subImagesEl.appendChild(subParentEl);

                        subImage = data.message[i];

                        console.log(subImage + " SUB IMAGE");

                        // create a container for each sub-image
                        var imageEl = document.createElement("img");
                        imageEl.setAttribute("src", subImage);
                        subParentEl.appendChild(imageEl);
                        if (imageEl.height >= imageEl.width) {
                            imageEl.setAttribute("height", imageEl.width);
                            imageEl.setAttribute("class", "maxW");
                            imageEl.setAttribute("class", "theH");
                        } else {
                            imageEl.setAttribute("width", imageEl.height);
                            imageEl.setAttribute("class", "theH");
                            imageEl.setAttribute("class", "maxW");
                        }
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
    recentSearch.push(resultChopped);

    $.each(recentSearch, function (index, value) {
        const p = document.createElement("p");
        p.innerHTML = value;
        console.log(p);
    })
}

//BELOW IS THE WORK ON GETTING DOG DATA
//This is to change with quick dog facts each time a sub-breed button is clicked
$(subBreedButtonEl).on("click", "button", function () {
    getDogInfo();
});

//This is the random dog facts API call
var getDogInfo = function () {

    //this while loop is removing all the previously created elements so the container can be filled with new information
    while (wikipedia.firstChild) {
        wikipedia.removeChild(wikipedia.firstChild);
    }

    var factHeader = document.createElement("h2") //THIS IS THE h2 for the random dog facts.
    factHeader.classList.add("randomfactheader");
    factHeader.innerText = "";
    wikipedia.appendChild(factHeader);

    var dogInfo = "https://www.dogfactsapi.ducnguyen.dev/api/v1/facts/?number=5"

    fetch(dogInfo).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                //console.log(data);
                dataArr = data.facts;
                //console.log(dataArr);
                for (var i = 0; i < dataArr.length; i++) {
                    var randomFact = document.createElement("li");
                    randomFact.classList.add("randomfact");
                    randomFact.innerText = dataArr[i];
                    wikipedia.appendChild(randomFact);
                }
            })
        }
    })
};

var dogBreedFacts = function () {

    $.ajax({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/dogs?name=" + doggieButtonClick,
        headers: { "X-Api-Key": "m1XEFgtJy+tOPfM7jpV2uw==DtLxNYGo7mhPpvOz" },
        contentType: "application/json",
        success: function (data) {
            console.log(data);

            if (data.length === 0) {
                while (statistics.firstChild) {
                    statistics.removeChild(statistics.firstChild);
                }
                statError = document.createElement("p")
                statError.innerText = "We're sorry, our database does not have any statistics for this amazing friend just yet."
                statistics.appendChild(statError);
                return;
            }
            else if (data[0].max_life_expectancy) {
                maxLife = "Life span: " + data[0].max_life_expectancy + " years."
                console.log(maxLife);

                maxHeight = "Maximum height: " + data[0].max_height_male + " inches.";
                console.log(maxHeight);

                maxWeight = "Maximum weight: " + data[0].max_weight_male + " lbs.";
                console.log(maxWeight);

                playful = "Playfulness: " + data[0].playfulness;
                console.log(playful);

                training = "Trainability: " + data[0].trainability;
                console.log(training);

                shedding = "Shedding: " + data[0].shedding;
                console.log(shedding);

                energy = "Energy: " + data[0].energy;
                console.log(energy);

                drooling = "Drooling: " + data[0].drooling;
                console.log(drooling);

                printDoggieFacts();
                window.scrollTo(0, document.body.scrollHeight);
            }
        }

    });
};

//THIS FUNCTION has all of the dog statistic elements to be styled. NOTE: To dynamically create
//a class for each element, use (we'll use statHeader as an example) statHeader.setAttribute("class", "apple", "orange", "lemon"), etc.
//NOTE FOR STYLING: If it is easier, all of the <li> elements can be turned into <p> elements, and be appended to a <div> rather than a <ul>.
//same goes for the random dog facts (they can be turned into <p> elements instead of <li> if its better that way);
function printDoggieFacts() {

    while (statistics.firstChild) {
        statistics.removeChild(statistics.firstChild);
    }

    var statHeader = document.createElement("h2");
    statHeader.innerText = "Doggie stats for your new best friend:"
    statistics.appendChild(statHeader);

    var life = document.createElement("li");
    life.innerText = maxLife;
    statistics.appendChild(life);

    var weight = document.createElement("li")
    weight.innerText = maxWeight;
    statistics.appendChild(weight);

    var height = document.createElement("li");
    height.innerText = maxHeight;
    statistics.appendChild(height);

    var secondaryHeader = document.createElement("h3");
    secondaryHeader.innerText = "The following stats are rated on a scale from 0 through 5:";
    statistics.appendChild(secondaryHeader);

    var play = document.createElement("li");
    play.innerText = playful;
    statistics.appendChild(play);

    var train = document.createElement("li");
    train.innerText = training;
    statistics.appendChild(train);

    var shed = document.createElement("li");
    shed.innerText = shedding;
    statistics.appendChild(shed);

    var clif = document.createElement("li");
    clif.innerText = energy;
    statistics.appendChild(clif);

    var drool = document.createElement("li");
    drool.innerText = drooling;
    statistics.appendChild(drool);

    window.scrollTo(0, document.body.scrollHeight);
};
