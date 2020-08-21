'use strict';

//commentList is an array of comment objects with properties: id, name, description, and date
let state = {
  commentList: [],
  inputtedName: "",
  inputtedComment: ""
};

//Adds 'input' event listener to the name input field
//changes the state's inputtedName to the value of the name input field
let nameInputElement = document.getElementById('name_field');

nameInputElement.addEventListener('input', function() {

    state.inputtedName = nameInputElement.value;

    renderInput();

});

//Add's 'input' event listener to the comment textarea field
//changes the state's inputtedComment to the value of the comment textarea field
let commentInputElement = document.getElementById('comment_field');

commentInputElement.addEventListener('input', function() {

    state.inputtedComment = commentInputElement.value;

    renderInput();

});

//Adds a 'click' event listner to the submit button
//calls addNewComment
let submitCommentButton = document.getElementById('submit_button');

submitCommentButton.addEventListener('click', addNewComment);


//Makes a new comment object to add to the state's commentList
//renders the comment list
function addNewComment() {

    let newComment = {};

    if (state.commentList.length != 0) {
        newComment.id = state.commentList[state.commentList.length - 1].id + 1;
    } else {
        newComment.id = 1;
    }

    newComment.name = state.inputtedName;
    newComment.description = state.inputtedComment;
    
    let today = new Date();
    let month = String(today.getDate()).padStart(2, '0');
    let day = String(today.getMonth() + 1).padStart(2, '0');
    let minutes = String(today.getMinutes()).padStart(2, '0');
    let seconds = String(today.getSeconds()).padStart(2, '0');
    
    today = month + "/" + day + "/" + today.getFullYear() + 
    " @" + today.getHours() + ":" + minutes + ":" + seconds;
    
    newComment.date = today;
    
    state.commentList.push(newComment);

    state.inputtedName = "";
    state.inputtedComment = "";

    renderCommentList();

}


//Takes a comment from the state's commentList array
//Formats it into HTML
function createCommentItemElement(comment) {
    
    let newDiv = document.createElement('div');

    let identifier = document.createElement('p');

    identifier.textContent = comment.name + " " + comment.date;

    let commentArea = document.createElement('p');

    commentArea.textContent = comment.description;

    newDiv.appendChild(identifier);
    newDiv.appendChild(commentArea);

    newDiv.classList.add('single_comment');

    return newDiv;

}

//Define a function `renderTaskList()` that will fill in the provided <ol> with 
//list items (<li>) representing each task in the `state.taskList`. Call your
//`createTaskItemElement()` function to create each <li> element.
//Make sure your function removes any previous list content so that only the 
//current task list is shown after this render call!

function renderCommentList() {

    let commentSection = document.getElementById('comment_section');

    //do I really need to delete everything?
    commentSection.innerHTML = ""; 

    for (let i = 0; i < state.commentList.length; i++) {

      commentSection.appendChild(createCommentItemElement(state.commentList[i]));

    }

    renderInput();
}

//Call your `renderTaskList()` function to render the initial list of tasks!

renderCommentList();

//Time to fix some of the user experience. Define a new function `renderInput()`
//that does two things:
// 1. It should set the <input>'s value to be the `state.inputtedText` (so the
//    web page matches the state on render).
// 2. It should "disable" the <button> if the `state.inputtedText` is empty, but
//    enable it there is inputted text. You can disable a button but setting its
//    `disabled` property to `true` (and to `false` to enable).
//Add calls to your `renderInput()` function to BOTH the end of `renderTaskList()`
//AND to the end of your `'input'` event callback (so the input renders on each
//user interaction).

function renderInput() {

    let nameInputElement = document.getElementById('name_field');
    let commentInputElement = document.getElementById('comment_field');
    let submitCommentButton = document.getElementById('submit_button');

    nameInputElement.value = state.inputtedName;
    commentInputElement.value = state.inputtedComment;

    submitCommentButton.disabled = true;

    if (state.inputtedName != "" && state.inputtedComment != "") {

        submitCommentButton.disabled = false;

    }

}

//---------------------------------------



//one "track" is an object from the results array; with an artistName, trackName, previewURL, and artworkUrl100
function renderTrack(track) {

    let newDiv = document.createElement('div');


    let newTrackImg = document.createElement('img');

    newTrackImg.src = track.artworkUrl100;
    newTrackImg.alt = track.trackName;
    newTrackImg.title = track.trackName;

    newTrackImg.style.cursor = 'pointer';

    newTrackImg.addEventListener('click', function(){

        playTrackPreview(track, this)

    });

    newTrackImg.classList.add('music_img');

    newDiv.appendChild(newTrackImg);

    let newP = document.createElement('p');

    newP.classList.add('music_label');

    newP.innerHTML = "<b>"+ track.trackName+ "</b>" +  " by: " + "<em>" + track.artistName + "</em>";

    newDiv.appendChild(newP);

    newDiv.classList.add('track_div');
    document.getElementById('music').appendChild(newDiv);


}

//Render search
  
function renderSearchResults(searchResults, term) {


    if (searchResults.results == undefined || searchResults.results.length == 0) {

        renderError(new Error("Something went wrong loading the tracks! ):"));

    } else {
        
        //for each array item (object) in the results array of the searchResults object, call renderTrack
        let title = term.substr(10, term.length - 1);

        for (let i = 0; i < searchResults.results.length; i++) {

            if (searchResults.results[i].trackName.toLowerCase() == title){
                renderTrack(searchResults.results[i]);

            }

        } 

    }
}
  
  
//Fetch
const URL_TEMPLATE = "https://itunes.apple.com/search?entity=song&term={searchTerm}";

    function fetchTrackList(term) {

    let url = URL_TEMPLATE.replace("{searchTerm}", term);

    let promise = fetch(url)
    .then(function(response) {
        let dataPromise = response.json();
        return dataPromise;
        
    })
    .then(function(data) {
        renderSearchResults(data, term);
    })
    .catch(function(error){
        renderError(error);
    });

    return promise;

}
  
  
fetchTrackList("rabi-ribi melting point (dlc)");
fetchTrackList("rabi-ribi azure (dlc)");
fetchTrackList("rabi-ribi boss battle #3"); //high-tech duel
fetchTrackList("rabi-ribi boss battle #7"); //sudden death
fetchTrackList("rabi-ribi boss battle #8"); //M.R.
fetchTrackList("rabi-ribi final boss battle #3"); //rfn - III
fetchTrackList("rabi-ribi opening"); //theme of rabi-ribi

//Errors

function renderError(error) {

    let newAlertP = document.createElement('p');

    newAlertP.textContent = error.message;

    document.getElementById('music').appendChild(newAlertP);

}
  

//Audio

const audio = { previewAudio: new Audio() };

function playTrackPreview(track, img) {
    if(audio.previewAudio.src !== track.previewUrl){ 
        document.querySelectorAll('img').forEach(function(element){
        element.classList.remove('current_glow');
        }); 

        audio.previewAudio.pause(); 
        audio.previewAudio = new Audio(track.previewUrl); 
        audio.previewAudio.play(); 
        img.classList.add('current_glow'); 
    } 
    else {
        if(audio.previewAudio.paused){ 
        audio.previewAudio.play();
        } else {
        audio.previewAudio.pause();
        }
        img.classList.toggle('current_glow'); 
    }
}
