// Creating new var in reference to the HTML components made 
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
// Creating new variables for the HTML elements created (i.e. repo-search & repo-container)
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

//Creating a SubmitHandler fucntion + callback here 
var formSubmitHandler = function (event) {
    event.preventDefault();

    // get value  from input element 
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
}


//Creating a function to Display Repos
var displayRepos = function (repos, searchTerm) {

    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    // clear old content (which were the console.log for the variables just made)
    repoContainerEl.textContent= "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo 
        var repoEl = document.createElement("div");
        repoEl.classlist = "list-item flex-row justify-space-between align-center";

        // create a span element to hold repository name 
        var titleEL = document.createElement("span");
        titleEL.textContent = repoName;

        // append to container 
        repoEl.appendChild(titleEL);

        // Code to display Issues 

        //create a status element
        var statusEl = document.createElement("span");
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container 
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};


// I am now restructing this entire fuction... yay! 
var getUserRepos = function (user) {
    // format the github api url 
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url 
    fetch(apiUrl).then(function(reponse) {
        // request was successful
        if (reponse.ok) {
            reponse.json().then(function(data) {
            displayRepos(data, user);
            });
        } else {
            alert("Error: GitHub User Not Found");
        }
    })
        .catch(function(error) {
            // Notice this '.catch()' getting chained onto the end of the '.then()' method
            alert("Unable to connect to GitHub");
        });
};


userFormEl.addEventListener("submit", formSubmitHandler);

