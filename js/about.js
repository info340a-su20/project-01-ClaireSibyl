'use strict';

//COMMENT SECTION---------------------------------------------------------------------------------------------------

//commentList is an array of comment objects with properties: id, name, description, and date
let state = {
  commentList: [
      {id:1, name:'Anne', description:'wow so cool yay', date:'21/08/2020 @22:12:12'}
  ],
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
    newDiv.classList.add('single_comment');

    let identifier = document.createElement('p');
    identifier.classList.add('identifier');
    identifier.textContent = comment.name + " - " + comment.date;

    let commentArea = document.createElement('p');
    commentArea.classList.add('comment_area');
    commentArea.textContent = comment.description;

    newDiv.appendChild(identifier);
    newDiv.appendChild(commentArea);

    return newDiv;

}

//Renders all comments from state's commentList
function renderCommentList() {

    let commentSection = document.getElementById('comment_section');

    //do I really need to delete everything?
    commentSection.innerHTML = ""; 

    for (let i = 0; i < state.commentList.length; i++) {

      commentSection.appendChild(createCommentItemElement(state.commentList[i]));

    }

    renderInput();
}

//Initialize comments?!
renderCommentList();

//Updates input to match state
//Updates disabled feature of submit button
function renderInput() {

    let nameInputElement = document.getElementById('name_field');
    let commentInputElement = document.getElementById('comment_field');
    let submitCommentButton = document.getElementById('submit_button');

    nameInputElement.value = state.inputtedName;
    commentInputElement.value = state.inputtedComment;

    submitCommentButton.disabled = true;

    submitCommentButton.style.backgroundColor = '#b2aec2';

    if (state.inputtedName != "" && state.inputtedComment != "") {

        submitCommentButton.disabled = false;
        submitCommentButton.style.backgroundColor = '#eae5ff';

    }

}

//MUSIC SECTION---------------------------------------------------------------------------------------------------

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

    newP.innerHTML = "<b>"+ track.trackName+ "</b>" +  " by: " + "<cite>" + track.artistName + "</cite>";

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
