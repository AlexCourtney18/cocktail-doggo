var subBreedButtonEl = document.querySelector("#sub-button");
var subImagesEl = document.querySelector("#sub-images");
var errorBoxEl = document.querySelector("#error-page-box");
var errorContentEl = document.querySelector("#error-page-content");
var historyListEl = document.querySelector("#history-list");
var clearHistoryButton = document.querySelector("#clear-history-button");
var wikipedia = document.getElementById("wikipedia"); //This is the element with the random dog facts inside. Should change the name to be something other than wikipedia later.
var statistics = document.getElementById("statistics");
var randomDogBtn = document.getElementById("randog");
var resultChopped;
var dogFamily;
var searchButtonOriginal = document.getElementById("orange");
var doggieButtonClick;

searchButtonOriginal.addEventListener("click", openPage);
searchButtonOriginal.addEventListener("click", clearSearch);

function leavingHome() { //I put all of these in a function so I can just call the function a few times instead of spanning 20 lines
    document.querySelector("#title-box").classList.remove('centered');
    document.querySelector("#webpage-title").classList.add('headered');
    document.querySelector("#search-container").classList.add('searchHeadered');
    document.querySelector("#webpage-subtitle").classList.add('hidden');
    document.querySelector("#instructions").classList.add('hidden');
}

function pictureChange() {
    document.getElementById("randog").src="./assets/images/confused_dog_clicked.jpg";
}

/////////////////////////////////////////////////////////////////////
// This should change the dog button but it doesn't right now help //

$(randomDogBtn).on("click", "button", function () {
    pictureChange();
})

// This function should remove all elements within historyListEl (the Div that contains buttons with the class history-button), but it doesn't.

$(clearHistoryButton).on("click", "button", function(){
    $(historyListEl).find(".history-button").remove();
})

//                this stuff doesn't work                          //
/////////////////////////////////////////////////////////////////////

$(historyListEl).on("click", "button", function (event) {
    var melon = event.target.textContent;
    resultChopped = melon;
    var oldDogHistory = JSON.parse(localStorage.getItem("breeds"));
    if (oldDogHistory === null) {
        createHistoryButton();
    }
    else if (!oldDogHistory.includes(melon)) {
        createHistoryButton();
    }
    leavingHome();
    getBreed(resultChopped);
})

function clearSearch() {
    document.querySelector("#dogQ").classList.add('hidden');
    document.getElementById('search').value = "";
}

function openPage() {
    while (userCardContainer.firstChild) {
        userCardContainer.removeChild(userCardContainer.firstChild);
    }
    leavingHome();

    var searchResult = document.getElementById("search").value; // Grabs result
    resultChopped = searchResult.toLowerCase().replace(/\s/g, ''); // Cuts out spaces and makes all lowercase to search easier

    searchHistory(resultChopped);

    //THIS IS the call to the dog facts API
    getDogInfo(resultChopped);
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

        //event listener for the card, so that when you click something in the dropdown from the search bar, you get the results from the clicked option
        $(card).on("click", function () {
            resultChopped = body.textContent;
            leavingHome();
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
                createButton(data);
                // create buttons for sub-breeds
                function createButton(data) {
                    // clear any existing buttons
                    subBreedButtonEl.textContent = "";
                    for (var i = 0; i < data.message.length; i++) {
                        if (data.message[i]) {
                            subBreed = data.message[i];
                        }

                        // create a container for each sub-breed
                        var buttonEl = document.createElement("button");
                        buttonEl.textContent = subBreed;
                        subBreedButtonEl.appendChild(buttonEl);

                        // add click event listener for sub-breed buttons
                        subBreedButtonEl.addEventListener("click", buttonClick);
                    }
                    //this is to add a history button to the history button list for the given (searched for) dog
                    var oldDogHistory = JSON.parse(localStorage.getItem("breeds"));
                    if (oldDogHistory === null) {
                        createHistoryButton(resultChopped);
                        save(resultChopped);
                    }
                    else if (!oldDogHistory.includes(resultChopped)) {
                        createHistoryButton(resultChopped);
                        save(resultChopped);
                    }
                }
                // functionality to load breed images immediately if there are no sub-breeds listed in the api
                if (data.message.length === 0) {
                    getBreedImage(resultChopped);
                    // fetch breed images
                    function getBreedImage(resultChopped) {
                        var apiImageUrl = "https://dog.ceo/api/breed/" + resultChopped + "/images";

                        subImagesEl.textContent = "";
                        fetch(apiImageUrl).then(function (response) {
                            if (response.ok) {
                                response.json().then(function (data) {
                                    clearSearch();
                                    for (var i = 0; i < 3; i++) {
                                        if (data.message[i]) {

                                            var subParentEl = document.createElement("div");
                                            subImagesEl.appendChild(subParentEl);
                                            subImage = data.message[i];

                                            // create a container for each sub-image/append
                                            var imageEl = document.createElement("img");
                                            imageEl.setAttribute("src", subImage);
                                            imageEl.setAttribute("class", "dog-pic");
                                            subParentEl.appendChild(imageEl);
                                        }
                                    }
                                });
                            } 
                        });
                    }
                }
            });
            document.querySelector("#error-page-box").classList.add('hidden');
            document.querySelector("#error-page-content").classList.add('hidden');
            document.querySelector("#dog-facts").classList.add('hidden');

            doggieButtonClick = resultChopped;
            doggieButtonClick = doggieButtonClick.charAt(0).toUpperCase() + doggieButtonClick.substring(1, doggieButtonClick.length);
            while (statistics.firstChild) {
                statistics.removeChild(statistics.firstChild);
            }
            dogBreedFacts();
        } else {
            // clear previous content even when breed is searched that returns "not found"
            subImagesEl.textContent = "";
            subBreedButtonEl.textContent = "";
            console.log("dog breed not found");
            document.querySelector("#error-page-box").classList.remove('hidden');
            document.querySelector("#error-page-content").classList.remove('hidden');
            document.querySelector("#dog-facts").classList.remove('hidden');

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
    dogBreedFacts();
}

// fetch breed image
function getBreedImage(resultChopped) {
    var apiImageUrl = "https://dog.ceo/api/breed/" + resultChopped + "/images";

    subImagesEl.textContent = "";
    fetch(apiImageUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                for (var i = 0; i < 3; i++) {
                    if (data.message[i]) {

                        var subParentEl = document.createElement("div");
                        subImagesEl.appendChild(subParentEl);

                        subImage = data.message[i];

                        // create a container for each sub-image
                        var imageEl = document.createElement("img");
                        imageEl.setAttribute("src", subImage);
                        subParentEl.appendChild(imageEl);
                        imageEl.setAttribute("class", "dog-pic");
                    }
                }
            });
        } 
    });
}

function searchHistory() { //rudimentary way of grabbing the recent search so we can get the information and save it to local storage (not implemented)
    var recentSearch = [];
    recentSearch.push(resultChopped);

    $.each(recentSearch, function (index, value) {
        const p = document.createElement("p");
        p.innerHTML = value;
    })
}

//creates a button in the search history section for each new breed selected
function createHistoryButton(breedName) {
    var historyEl = document.createElement("button");
    historyEl.textContent = breedName;
    historyEl.classList.add("history-button", "is-light", "button", "fontQuicksand");
    historyListEl.appendChild(historyEl);
}

function save(resultChopped) {
    if (localStorage.getItem("breeds") == null) {
        localStorage.setItem("breeds", "[]");
    }

    var oldBreed = JSON.parse(localStorage.getItem("breeds"));
    oldBreed.push(resultChopped);

    localStorage.setItem("breeds", JSON.stringify(oldBreed));
}

//loads the previously searched history buttons
function loadHistory() {
    populate = JSON.parse(localStorage.getItem("breeds"));

    if (populate !== null) {
        for (i = 0; i < populate.length; i++) {
            var breedName = populate[i];
            createHistoryButton(breedName);
        }
    }
}

//This is the random dog facts API call
function getDogInfo() {

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
                dataArr = data.facts;
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

//This function fetches the dog statistics for the given (searched for) dog
function dogBreedFacts() {

    $.ajax({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/dogs?name=" + doggieButtonClick,
        headers: { "X-Api-Key": "m1XEFgtJy+tOPfM7jpV2uw==DtLxNYGo7mhPpvOz" },
        contentType: "application/json",
        success: function (data) {

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

                maxHeight = "Maximum height: " + data[0].max_height_male + " inches.";

                maxWeight = "Maximum weight: " + data[0].max_weight_male + " lbs.";

                playful = "Playfulness: " + data[0].playfulness;

                training = "Trainability: " + data[0].trainability;

                shedding = "Shedding: " + data[0].shedding;

                energy = "Energy: " + data[0].energy;

                drooling = "Drooling: " + data[0].drooling;

                printDoggieFacts();
                window.scrollTo(0, document.body.scrollHeight);
            }
        }
    });
};

//this function prints the dog statistics to the screen for the given (searched for) dog
function printDoggieFacts() {

    doggieButtonClick = doggieButtonClick.charAt(0).toUpperCase() + doggieButtonClick.substring(1, doggieButtonClick.length);
    while (statistics.firstChild) {
        statistics.removeChild(statistics.firstChild);
    }
    var statHeader = document.createElement("h2");
    statHeader.innerText = doggieButtonClick + " Information" 
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
    secondaryHeader.innerText = "Doggystats (Min: 0, Max: 5)";
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
    clif.classList.add('.no-bullets');
    statistics.appendChild(clif);

    var drool = document.createElement("li");
    drool.innerText = drooling;
    statistics.appendChild(drool);

    window.scrollTo(0, document.body.scrollHeight);
};

loadHistory();
