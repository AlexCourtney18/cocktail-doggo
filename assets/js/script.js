var subBreedButtonEl = document.querySelector("#sub-button");
var subImagesEl = document.querySelector("#sub-images");
var wikipedia = document.getElementById("wikipedia"); //This is the element with the random dog facts inside. Should change the name to be something other than wikipedia later.
var statistics = document.getElementById("statistics");
var resultChopped;
var dogFamily;

function openPage() {
    var searchResult = document.getElementById("search").value; // Grabs result
    resultChopped = searchResult.toLowerCase().replace(/\s/g, ''); // Cuts out spaces and makes all lowercase to search easier
    
    //dogFamily = resultChopped;
    console.log(dogFamily); //Sam added these console.logs to keep track of data needed to get the dog stats API working
    console.log(searchResult);
    console.log(resultChopped);
    
    //THIS IS the call to the dog facts API>>>>>>>
    getDogInfo(resultChopped);
    //>>>>>>>>>>>>

    getBreed(resultChopped);
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
                    //dogBreedFacts(); //SAM. Work on getting functionality to work in API
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

                                            // create a container for each sub-image/append
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
            // clear previous content even when breed is searched that returns "not found"
            subImagesEl.textContent = "";
            subBreedButtonEl.textContent = "";
            console.log("dog breed not found");
        }
    });
}
// button click function for sub-breed buttons to pass through breed family + btnClick sub breed to breed images function

var doggieButtonClick;

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

//BELOW IS THE WORK ON GETTING DOG DATA
//This is to change with quick dog facts each time a sub-breed button is clicked
$(subBreedButtonEl).on("click", "button", function() {
    getDogInfo();
});

//This is the random dog facts API call
var getDogInfo = function() {
    
    //this while loop is removing all the previously created elements so the container can be filled with new information
    while (wikipedia.firstChild) {
        wikipedia.removeChild(wikipedia.firstChild);
    }

    var factHeader = document.createElement("h2") //THIS IS THE h2 for the random dog facts.
    factHeader.classList.add("randomfactheader");
    factHeader.innerText = "Quick dog facts:";
    wikipedia.appendChild(factHeader);

    var dogInfo = "https://www.dogfactsapi.ducnguyen.dev/api/v1/facts/?number=5"  

    fetch(dogInfo).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
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

var dogBreedFacts = function() {

        $.ajax({
            method: "GET",
            url: "https://api.api-ninjas.com/v1/dogs?name=" + doggieButtonClick,
            headers: { "X-Api-Key": "m1XEFgtJy+tOPfM7jpV2uw==DtLxNYGo7mhPpvOz"},
            contentType: "application/json",
            success: function(data) {
                console.log(data);

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
            }

        });
};

//THIS FUNCTION has all of the dog statistic elements to be styled. NOTE: To dynamically create
//a class for each element, use (well use statHeader as an example) statHeader.setAttribute("class", "apple", "orange", "lemon"), etc.
//NOTE FOR STYLING: If it is easier, all of the <li> elements can be turned into <p> elements, and be appended to a <div> rather thant a <ul>.
//same goes for the random dog facts (they can be turned into <p> elements instead of <li> if its better that way);
function printDoggieFacts() {

    while(statistics.firstChild) {
        statistics.removeChild(statistics.firstChild);
    }

    var statHeader = document.createElement("h2");
    statHeader.innerText = "Doggie stats for this good girl:"
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
}; 


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





