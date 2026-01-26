
const music = new Audio('Audio/1.mpeg');
//music.play();
const songs = [
    {
        id:1,
        songName: `Supreme<br><span class="subtitle">Shubh</span>`,
        poster: "img/Shubh/1.jpg"
    },
    {
        id:2,
        songName: `Fell For You<br><span class="subtitle">Shubh</span>`,
        poster: "img/Shubh/2.jpg"
    },
    {
        id:3,
        songName: `Bandana<br><span class="subtitle">Shubh</span>`,
        poster: "img/Shubh/3.jpg"
    },
    {
        id:4,
        songName: `No Love<br><span class="subtitle">Shubh</span>`,
        poster: "img/Shubh/4.jpg"
    },
    {
        id:5,
        songName: `Cheques<br><span class="subtitle">Shubh</span>`,
        poster: "img/Shubh/5.jpg"
    },
    {
        id:6,
        songName: `Aura<br><span class="subtitle">Shubh</span>`,
        poster: "img/Shubh/6.jpg"
    },
    {
        id:7,
        songName: `King Shit<br><span class="subtitle">Shubh</span>`,
        poster: "img/Shubh/7.jpg"
    },
    {
        id:8,
        songName: `Dil Diyan Gallan<br><span class="subtitle">Atif Aslam</span>`,
        poster: "img/8.jpg"
    },
    {
        id:9,
        songName: `Mery Hamsafar<br><span class="subtitle">Rahat Fateh Ali</span>`,
        poster: "img/9.jpg"
    },
    {
        id:10,
        songName: `Rafta Rafta<br><span class="subtitle"> Raj Ranjodh</span>`,
        poster: "img/10.jpg"
    },
    {
        id:11,
        songName: `Yaar Na Miley<br><span class="subtitle">Yoyo Honey Singh</span>`,
        poster: "img/11.jpg"
    },
    {
        id:12,
        songName: `Sinf e Ahan<br><span class="subtitle">Asim Azhar</span>`,
        poster: "img/12.jpg"
    },
    {
        id:13,
        songName: `Oo Ry Piya<br><span class="subtitle">Rahat Fateh Ali Khan</span>`,
        poster: "img/13.jpg"
    },
    {
        id:14,
        songName: `Hari Hari Angaan<br><span class="subtitle">Farhan, Naveed</span>`,
        poster: "img/14.jpg"
    },
    {
        id:15,
        songName: `Beqarar Ye Dil<br><span class="subtitle">Asim, Qirat Haider</span>`,
        poster: "img/15.jpg"
    },
    {
        id:16,
        songName: `Tu Janny Na<br><span class="subtitle">Atif Aslam</span>`,
        poster: "img/16.jpg"
    },
    {
        id:17,
        songName:  `Tinka Tinka<br><span class="subtitle">Shani Arshad</span>`,
        poster: "img/17.jpg"
    },
    {
        id:18,
        songName: `Pyar Hy Tum Sy Magar<br><span class="subtitle">Hania Amir</span>`,
        poster: "img/18.jpg"
    },
    {
        id:19,
        songName: `Khani<br><span class="subtitle">Rahat Fateh Ali</span>`,
        poster: "img/19.jpg"
    }
]


Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;

});


     //master play

let masterPlay = document.getElementById('masterPlay');
masterPlay.addEventListener('click', () =>{
    if(music.paused || music.currentTime<=0){
        music.play();
        masterPlay.classList.add('bi-pause-fill');
        masterPlay.classList.remove('bi-play-fill');

    }
    else{
        music.pause();
        masterPlay.classList.remove('bi-pause-fill');
        masterPlay.classList.add('bi-play-fill');
    }
});

const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((el) => {
        el.style.background = `linear-gradient(90deg, #36e2ec22 0%, #23263a 100%, .0)`;
    })
}

const makeAllplays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el) => {
        el.classList.add('bi-play-circle-fill');
        el.classList.remove('bi-pause-circle-fill');
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play'); 
let download = document.getElementById('download'); 
let title = document.getElementById('title'); 


Array.from(document.getElementsByClassName('playListPlay')).forEach((e) =>{
    e.addEventListener('click', (el) =>{
        index = el.target.id;
        music.src = `Audio/Shubh/${index}.mpeg`;
        poster_master_play.src = `img/Shubh/${index}.jpg`;
        music.play();
        masterPlay.classList.add('bi-pause-fill');
        masterPlay.classList.remove('bi-play-fill');

        download.href = `Audio/Shubh/${index}.mpeg`;
        let songTitles = songs.filter((els) => {
            return els.id == index;
        });
        songTitles.forEach((elss) => {
            let {songName} = elss;
            title.innerHTML = songName;
            download.setAttribute('download', songName);
        });

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = `linear-gradient(90deg, #36e2ec22 0%, #23263a 100%)`;
        makeAllplays();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');

    });
});
                        //Time in master play

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];


music.addEventListener('timeupdate', () =>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min1 = Math.floor(music_dur/60);
    let sec1 = Math.floor(music_dur%60);
    if(sec1< 10){
        sec1 = `0${sec1}`;
    }
    currentEnd.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if(sec2 < 10){
        sec2 = `0${sec2}`;
    }
    currentStart.innerText = `${min2}:${sec2}`;

    let progressBar = parseInt((music_curr / music_dur) *100);
    seek.value = progressBar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});

              //move progressBar forward AND backward

seek.addEventListener('change', () =>{
    music.currentTime = seek.value * music.duration /100;
});

                     //volume bar
let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');       

vol.addEventListener('change', () =>{
    if(vol.value == 0){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-off-fill');
    }
    if(vol.value > 0){
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    if(vol.value >50){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;
});


                   //next and previous song

let back = document.getElementById('back');
let next = document.getElementById('next');
back.addEventListener('click', () =>{
    index -= 1;
    if(index <1){
        index = Array.from(document.getElementsByClassName('songItem')).length;

    }
    music.src = `Audio/Shubh/${index}.mpeg`;
        poster_master_play.src = `img/Shubh/${index}.jpg`;
        music.play();
        masterPlay.classList.add('bi-pause-fill');
        masterPlay.classList.remove('bi-play-fill');
        download.href = `Audio/Shubh/${index}.mpeg`;

        let songTitles = songs.filter((els) => {
            return els.id == index;
        });
        songTitles.forEach((elss) => {
            let {songName} = elss;
            title.innerHTML = songName;
            download.setAttribute('download', songName);
        });

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = `linear-gradient(90deg, #36e2ec22 0%, #23263a 100%)`;
        makeAllplays();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');

});

next.addEventListener("click", ()=>{
    index +=1;
    if(index > Array.from(document.getElementsByClassName('songItem')).length){
        index = 1;

    }
    music.src = `Audio/Shubh/${index}.mpeg`;
        poster_master_play.src = `img/Shubh/${index}.jpg`;
        music.play();
        masterPlay.classList.add('bi-pause-fill');
        masterPlay.classList.remove('bi-play-fill');
        download.href = `Audio/Shubh/${index}.mpeg`;
        let songTitles = songs.filter((els) => {
            return els.id == index;
        });
        songTitles.forEach((elss) => {
            let {songName} = elss;
            title.innerHTML = songName;
            download.setAttribute('download', songName);
        });

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = `linear-gradient(90deg, #36e2ec22 0%, #23263a 100%)`;
        makeAllplays();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
});

      //popular songs 


let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');
let pop_song = document.getElementsByClassName('pop_song')[0];


pop_song_right.addEventListener('click', ()=>{
    pop_song.scrollLeft += 390;
})
pop_song_left.addEventListener('click', ()=>{
    pop_song.scrollLeft -= 390;
})
          //popular artists
let pop_art_left = document.getElementById('pop_art_left');
let pop_art_right = document.getElementById('pop_art_right');
let Item = document.getElementsByClassName('Item')[0];


pop_art_right.addEventListener('click', ()=>{
    Item.scrollLeft += 390;
})
pop_art_left.addEventListener('click', ()=>{
    Item.scrollLeft -= 390;
})


                     // Search Music
let search_results = document.getElementsByClassName('search_results')[0];
songs.forEach(element => {
    const { id, songName, poster} = element;
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = "#"+ id;
    card.innerHTML = `
    <div class="d-flex"><img src="${poster}" alt="" width="10%" height="10%">
                  <div class="content ">   
                     ${songName}
                  </div>
              </div>
              `;

     search_results.appendChild(card);       
    
});

let input = document.getElementsByTagName('input')[0];
input.addEventListener('keyup',()=>{
    let input_value = input.value. toUpperCase();
    let items = search_results.getElementsByTagName('a');

    for (let index = 0; index < items.length; index++) {
        let as = items[index].getElementsByClassName('content')[0];
        let text_value = as.textContent || as.innerHTML;

        if (text_value.toUpperCase().indexOf(input_value) > -1) {
            items[index].style.display = "flex";
            
        } else {
            items[index].style.display = "none";
            
        }

        if (input.value == 0) {
            search_results.style.display = "none";
            
        } else {
            search_results.style.display = "";
            
        }
    }
});