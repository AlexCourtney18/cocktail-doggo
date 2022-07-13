# Doggypedia

## Installation
No special installation is required. All functionality of the website is supported by all web browsers.

## Usage
When the user lands on our website, they will see our search bar with some brief instructions. The user will search for breeds by their family such as hound, terrier, spaniel, etc.
When the user begins to enter their breed, results based on their inputs will be displayed below the search bar. These results can be clicked to navigate immediately to their desired breed.
Once a breed is clicked or searched, if the breed includes sub-breeds, the user will be shown a group of buttons for the various sub-breeds that are clickable. Once the sub-breed button is clicked, the website will display images of the breed as well as stats for the breed. If the breed does not have sub-breeds such as labrador or pitbull, they'll immediately be shown the images and stats for those breeds. If the breed or sub-breed is not found in our database, the user will be shown 5 interesting dog facts at random.

After a dog is searched, the search bar moves to the header and continues to function as before. Users can click the Doggypedia logo to return to the homepage.
All breed families searched will populate into the "Recent History" section found in the upper right-hand corner of the website. Users can hover their mouse over the Recent History to display previous searches. If the Recent History becomes too full for the user's preference, they can clear the history with the yellow button next to the history.

** Screenshot 1 **
** Screenshot 2 **

## Credits
This was a group project. Our team members include Kit Banker, Alex Courtney, Kelsie Kidd, Jonny Thompson, and Sam Varney. Our project featured the use of three APIs:
* https://api-ninjas.com/api/dogs : This API contains the dog stats
* https://dog.ceo/dog-api/ : This API contains the dog images
* https://github.com/DucNgn/Dog-Facts-API-v2 : This API contains random dog facts


## Features
* Predictive search-results which allow the user to see and select available breeds that match their inputs before commiting to a search.
* Three ways to search: Clicking the predictive breed buttons, searching by hitting enter, searching by clicking the Search button.
* Recent history that stores your previous searches to make it easier to navigate between multiple breeds.
* Clickable-buttons for the sub-breeds to make it easier to find the exact dog you're looking for.
* Images and stats for the breed including playfulness, trainability, shedding, energy, and drooling.
* 500 interesting dog facts that are randomized and displayed to the user whenever a breed is not found in the databases.

## Tests
While our databases are quite encompassing, we recognize that it may not have every breed or sub-breed that exists in the world. We made sure to include a landing page whenever a breed is searched that is not found in our database. The user can find this landing page by entering anything into the search bar that's not a dog breed.

To test the full functionality, we recommend entering your favorite breed into the seach bar. From there you can navigate through the sub-breeds such as russell terrier, toy terrier, yorkshire terrier, etc by clicking the buttons that populate near the top of the screen. From there try searching another breed family you're interested in using the search bar. When you hover your mouse over the Recent History button, you'll see a drop-down list of your search history. You can quickly navigate through the previously searched breeds by clicking the buttons. As you search more and more breeds, your Recent History will grow. Try clearing it by pressing the yellow Clear History button. Rinse and repeat! 
