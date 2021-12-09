// Creating container to reference issues 
var issueContainerEl = document.querySelector("#issue-container");

// Creating a function to get repositories 
var getRepoIssues = function (repo) {
    console.log(repo);

    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    // Using a fetch request to grab the code written above -- (2) Updating fetch request
    fetch(apiUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // Changing the initial console log to display function created below on page
                displayIssues(data)
            });
        }
        else {
            alert("There was a problem with your request!");
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


// Callback function 
getRepoIssues("twitter/interactive");