//globals
let currentSongIndex, audio,musicTitle, loader, playing, playPauseButton, loopAudio, songList ,nextSong, prevSong,playRandom, shuffle, playAll, playShuffled, volumeLoader, volumeViewer, newSong, file, preview, plus, newSongArea, closeButton, audio1;

window.onload = ()=>{
    allSongs();
    init();
    
}

const init = ()=>{

    playing = false;
    shuffle = false;

    songList = [];
    currentSongIndex = 0;

    audio = new Audio();


    musicTitle = document.querySelector('.music-title');
    loader = document.querySelector('.loader');
    playPauseButton = document.querySelector('.player-play-pause');
    loopAudio = document.querySelector('.player-loop');
    nextSong = document.querySelector('.player-next');
    prevSong = document.querySelector('.player-prev');
    playRandom = document.querySelector('.player-random');
    playAll = document.querySelector('.play-all');
    playShuffled = document.querySelector('.play-shuffle');
    volumeLoader = document.querySelector('.volume-loader');
    volumeViewer = document.querySelector('.currentVolume');
    newSong = document.querySelector('#send');
    file = document.querySelector('#file');
    preview = document.querySelector('.preview');
    plus = document.querySelector('.addSong');
    newSongArea = document.querySelector('.newSongArea');
    closeButton = document.querySelector('.close');


    loader.addEventListener('change',forward);
    playPauseButton.addEventListener('click',playPause);
    loopAudio.addEventListener('click',loop);
    nextSong.addEventListener('click',playNextSong);
    prevSong.addEventListener('click',playPrevSong);
    playRandom.addEventListener('click',shufflePlay);
    playShuffled.addEventListener('click',shuffleMode);
    playAll.addEventListener('click',()=>{
        play(0);
    });
    volumeLoader.addEventListener('change',volumeUpDown);
    newSong.addEventListener('click',addSong);
    file.addEventListener('change',previewFile);
    plus.addEventListener('click',openClose);
    closeButton.addEventListener('click',closeNewSongArea);

    volumeViewer.style.top = ((window.innerHeight/2)-150)+'px';
    volumeViewer.style.left = ((window.innerWidth/2)+350)+'px';

}

//get all songs from server

const allSongs = () =>{
    const xml = new XMLHttpRequest();
    xml.onreadystatechange = () =>{
        if(xml.readyState == 4 && xml.status == 200){
            songList = JSON.parse(xml.responseText);

        }
    }
    xml.open('GET', 'views/songs_api.php',true);
    xml.send();

}

//play audio
const play = (index) => {
    playing = true;
    currentSongIndex = Number(index);

    if(audio1!=undefined){
         audio1.pause();
    }
   
    //setting title at the header
    musicTitle.textContent = songList[currentSongIndex].substring(0,40);

    //playing audio
    audio.src = "assets/musics/"+songList[currentSongIndex];

    if(playing){
        audio.play();
        playPauseButton.textContent = "=";
    }

    //set background to the current song parent
    let song = document.querySelector('#song'+currentSongIndex);
    for(let i = 0; i<songList.length; i++){
        document.querySelector('#song'+i).parentNode.style.backgroundColor = '#00000000';
    }
    song.parentNode.style.backgroundColor ='#111';
    //progress bar data
    
    audio.ontimeupdate = () =>{
     loader.value = audio.currentTime;
     loader.max = Number(audio.duration);
     loader.step = 1;
//play next audio after the current audio ends
     if(audio.ended && !audio.loop){
        if(!shuffle){
            playNextSong();
        }else{
            shuffleSong();
        }
        
     }
    }

}

//change currentTime

const forward = () =>{
    if(audio.currentSrc.trim()!=""){
        audio.currentTime = Number(loader.value);
        loader.value=this.value;
       
    }
}

//playPause

const playPause = () =>{
    if(!playing){
        playPauseButton.textContent = "=";
        audio.play();
        playing = true;
    }else{
        playPauseButton.innerHTML = "&Delta;";
        audio.pause();
        playing = false;
    }
}


//loop audio

const loop = () =>{
    audio.loop = !audio.loop;

    if(audio.loop){
        loopAudio.style.textDecoration = "underline";
    }else{
        loopAudio.style.textDecoration = "none";
    }
}

//play nextSong

const playNextSong = () =>{

    let next =Number(currentSongIndex+1);
    if(currentSongIndex>=songList.length-1){
        next = 0;
    }

    play(next);
}

//play previous song

const playPrevSong = () =>{

    let prev =Number(currentSongIndex-1);
    if(currentSongIndex<=0){
        prev = songList.length-1;
    }

    play(prev);
}

//activate play random

const shufflePlay = () =>{
    if(!shuffle){
        playRandom.style.textDecoration = "underline";
    }else{
        playRandom.style.textDecoration = "none"; 
    }

    shuffle = !shuffle;

}

//if play random is activated, play randomly
const shuffleSong = () =>{
    let random = Math.round(Math.random()*songList.length-1);
    while(currentSongIndex==random){
        random = Math.round(Math.random()*songList.length-1);
    }
    play(random);
}

//play in shuffleMode

const shuffleMode = () => {
    playRandom.style.textDecoration = "underline";
    shuffle = true;
    shuffleSong();
}

//increase and decrease volum level

const volumeUpDown = () => {
    if(playing){
        audio.volume = volumeLoader.value/100;
        volumeViewer.textContent = audio.volume;
        volumeViewer.style.display = "block";

        setTimeout(()=>{
            volumeViewer.style.display = "none";
        },2000)
    }
}

//add new song

const addSong = () => {
    if(file.value.trim()!=""){
        let formData = new FormData();
        formData.append('file',file.files[0]);

        fetch('views/new_song_api.php',{
            method:'POST',
            body:formData
        }).then(response => {
            return response.json();
        }).then(responseData => {
            console.log(responseData);
        }).catch(error => {
            console.log(error);
        })
    }
}

//preview file

const previewFile = $file => {
    let newFile = file.files[0];
    let object = window.URL.createObjectURL(newFile);
    audio1 = new Audio();
    audio1.src = object;
    preview.textContent = newFile.name;
    audio.pause();
    audio1.play();
}

//show and hide new song form

const openClose = () => {
    newSongArea.style.display = "flex";
}

const closeNewSongArea = () =>{
    newSongArea.style.display = "none";
    audio1.pause();
}