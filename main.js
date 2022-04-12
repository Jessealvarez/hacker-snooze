
//preliminary code before fetching data from source
//creating a place for the story articles to go 

let newsBox = document.querySelector("#news-container");

//create a new list for the articles to be organized in
let storyList = document.createElement("ol");
storyList.className = "list-group list-group-numbered";

//append each new list article to the main container from line 5
newsBox.appendChild(storyList);

fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')

    .then(function (httpResponse){
        return httpResponse.json();
    })
    .then(function (data){
        return data;
    })

    //after getting information from Hacker News, start a loop to actually fill in each article with info
    .then(function(storyId){
        for (let i = 0; i < 150; i++) {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId[i]}.json?print=pretty`)
                .then(function (httpResponse) {
                    return httpResponse.json();
                })
                .then(function (data) {
                    console.log(data);
                    
                    //every iteration pulls a story and assigns it so it can be added to a numbered list
                    let story = document.createElement("li");
                    story.className = "list-group-item"
                    let commentNumber = data.kids.length;

                    storyList.appendChild(story);

                    //fill in the data for each story on each newly created blank space on the list
                    story.innerHTML = `<a href="${data.url}">${data.title}</a> <br /> ${data.score} points BY ${data.by} comments: ${commentNumber}`
                })
        }
    })