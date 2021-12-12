// Creating a variable to display repo-names 
var repoNameEl = document.querySelector("#repo-name");

// Here I'm creating a new function getRepoName, and placing the call at the bottom 
var getRepoName = function () {

    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    // took out the console.log and replaced it with a call function & repo name variable
    getRepoIssues(repoName);
    // Adding a conditional statement 
    if (repoName) {
        repoNameEl.textContent = repoName;

        getRepoIssues(repoName);
    } else {
        // if no repo was given, redirect to the homepage
        document.location.replace("./index.html")
    }
};


// Creating container to reference issues 
var issueContainerEl = document.querySelector("#issue-container");

// Here I'm creating a DOM reference to the container I just created in my sing-repo.html
var limitWarningEl = document.querySelector("#limit-warning");ß

// Creatinga DisplayWarning function w/ parameters
var displayWarning = function (repo) {
    // add text to warning container 
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute = ("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute = ("target", "_blank");

    // append to warning container 
    limitWarningEl.appendChild(linkEl);
};

// Creating a function to get repositories 
var getRepoIssues = function (repo) {

    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    // Using a fetch request to grab the code written above -- (2) Updating fetch request
    fetch(apiUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // Changing the initial console log to display function created below on page
                displayIssues(data)

                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    // Here I am replacing the console.log to to the function I just created (displayWarning)
                    displayWarning(repo);
                }
            });
        }
        else {
            // if not successful, redirect to homepage 
            document.location.replace("./index.html");
        }
    });
}
// function to display issues 
var displayIssues = function (issues) {

    // Creating a function that checks for issues 
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a")
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title 
        var titlEl = document.createElement("span");
        titlEl.textContent = issues[i].title;

        //append to container (titleEl being the child)
        issueEl.appendChild(titlEl);

        // create a type element 
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request 
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container 
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
};


// Callback function -- removing the hardcoded string in the function
getRepoIssues();

// Callback function for getRepoName
getRepoName();