const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const playlistEl = document.getElementById('playlist');

const songs = [
  { title: "Blinding Lights", artist: "The Weeknd", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Dance Monkey", artist: "Tones and I", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Circles", artist: "Post Malone", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Don't Start Now", artist: "Dua Lipa", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "Sunflower", artist: "Post Malone & Swae Lee", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { title: "Watermelon Sugar", artist: "Harry Styles", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { title: "Levitating", artist: "Dua Lipa", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { title: "Senorita", artist: "Shawn Mendes & Camila Cabello", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { title: "Bad Guy", artist: "Billie Eilish", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { title: "Shape of You", artist: "Ed Sheeran", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  { title: "Memories", artist: "Maroon 5", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
  { title: "Rockstar", artist: "Post Malone", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
  { title: "Closer", artist: "The Chainsmokers", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
  { title: "Happier", artist: "Marshmello & Bastille", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },
  { title: "Perfect", artist: "Ed Sheeran", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" },
  { title: "Believer", artist: "Imagine Dragons", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" },
  { title: "Girls Like You", artist: "Maroon 5", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3" },
  { title: "Faded", artist: "Alan Walker", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3" },
  { title: "Counting Stars", artist: "OneRepublic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3" },
  { title: "Thunder", artist: "Imagine Dragons", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3" }
];

let currentIndex = -1;
let isPlaying = false;

// Create playlist UI
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = ${song.title} - ${song.artist};
  li.addEventListener('click', () => {
    loadSong(index);
    playAudio();
  });
  playlistEl.appendChild(li);
});

function loadSong(index) {
  currentIndex = index;
  audio.src = songs[index].url;
  songTitle.textContent = songs[index].title;
  songArtist.textContent = songs[index].artist;
  updateActiveSong();
}

function updateActiveSong() {
  const lis = playlistEl.querySelectorAll('li');
  lis.forEach((li, i) => {
    li.classList.toggle('active', i === currentIndex);
  });
}

function playAudio() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '&#10074;&#10074;'; // pause icon
}

function pauseAudio() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = '&#9654;'; // play icon
}

playBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseAudio();
  } else {
    if (currentIndex === -1) loadSong(0);
    playAudio();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    loadSong(currentIndex - 1);
    playAudio();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < songs.length - 1) {
    loadSong(currentIndex + 1);
    playAudio();
  }
});

// Update progress bar as song plays
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
  }
});

// Seek when user changes progress bar
progress.addEventListener('input', () => {
  if (audio.duration) {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  }
});

// Auto play next song when current ends
audio.addEventListener('ended', () => {
  if (currentIndex < songs.length - 1) {
    loadSong(currentIndex + 1);
    playAudio();
  } else {
    pauseAudio();
  }
});
