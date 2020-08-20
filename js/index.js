'use strict';

let spRitaCard = document.getElementById('sp_rita_card');
let spSyaroCard = document.getElementById('sp_syaro_card');
let spMiruCard = document.getElementById('sp_miru_card');
let spIrisuCard = document.getElementById('sp_irisu_card');

let state = {
    bossList: [
      {id:1, boss:'SP Rita', on:false},
      {id:2, boss:'SP Syaro', on:false},
      {id:3, boss:'SP Miru', on:false},
      {id:4, boss:'SP Irisu', on:false}
    ]
};


let allBossSections = Array.prototype.slice.call(document.getElementsByClassName('boss_section'));

function toggleDisplay() {

    let section = document.getElementById('sp_rita_section');
    let boss = 'SP Rita';

    /*seek correct boss*/
    if (this == spSyaroCard) {

        section = document.getElementById('sp_syaro_section');
        boss = 'SP Syaro';

    } else if (this == spMiruCard) {

        section = document.getElementById('sp_miru_section');
        boss = 'SP Miru';

    } else if (this == spIrisuCard) {

        section = document.getElementById('sp_irisu_section');
        boss = 'SP Irisu';
    }

    /*toggle displays*/
    for (let i = 0; i < allBossSections.length; i++) {

            if (allBossSections[i] != section) {

                allBossSections[i].style.display = 'none';
            
            }
    }

    section.style.display = 'flex';

    /*update the state*/
    for (let i = 0; i < state.bossList.length; i++) {

        if (state.bossList[i].boss == boss) {

            state.bossList[i].on = true;

        } else {

            state.bossList[i].on = false;
        }

    }

    

}


spRitaCard.addEventListener('click', toggleDisplay);
spSyaroCard.addEventListener('click', toggleDisplay);
spMiruCard.addEventListener('click', toggleDisplay);
spIrisuCard.addEventListener('click', toggleDisplay);

let allPortraits= Array.prototype.slice.call(document.getElementsByClassName('portrait_card'));

function toggleGlow() {

  
    this.style.boxShadow = '0px 5px 10px rgb(255, 120, 154), 0px -5px 10px rgb(255, 120, 154), 5px 0px 10px rgb(255, 120, 154), -5px 0px 10px rgb(255, 120, 154)';

    for (let i = 0; i < allPortraits.length; i++) {

        if (this != allPortraits[i]) {

            allPortraits[i].style.boxShadow = '1px 1px 3px rgba(0, 0, 0, 0.16), 1px 1px 3px rgba(0, 0, 0, 0.23)';

        }

    }

}

spRitaCard.addEventListener('click', toggleGlow);
spSyaroCard.addEventListener('click', toggleGlow);
spMiruCard.addEventListener('click', toggleGlow);
spIrisuCard.addEventListener('click', toggleGlow);


let allVideos = Array.prototype.slice.call(document.getElementsByTagName('video'));


let loopButton = document.getElementById('loop');
loopButton.addEventListener('click', setVideos);

function setVideos() {

    if (loopButton.innerHTML == "Loop<i class=\"fas fa-sync-alt\"></i>") {

        loopButton.innerHTML = "Unloop <i class=\"fas fa-sync-alt\"></i>";                
        
        for (let i = 0; i < allVideos.length; i++) {
            allVideos[i].autoplay = true;
            allVideos[i].muted = true;
            allVideos[i].loop = true;
            allVideos[i].controls = true;
            allVideos[i].load();
        }

    } else {

        loopButton.innerHTML = "Loop<i class=\"fas fa-sync-alt\"></i>";
        for (let i = 0; i < allVideos.length; i++) {
            allVideos[i].autoplay = false;
            allVideos[i].muted = false;
            allVideos[i].loop = false;
            allVideos[i].load();
        }   

    }
        
}

setVideos();