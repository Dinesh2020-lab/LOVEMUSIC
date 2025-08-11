const playBtn = document.getElementById('play-btn');
const audio = document.getElementById('audio');
const visualizer = document.getElementById('visualizer');
const playlistEl = document.getElementById('playlist');

const barsCount = 32;
let audioCtx;
let analyser;
let source;
let dataArray;
let animationId;
let currentIndex = 0;

// 20 Hindi & Telugu songs with free sample/demo mp3 links
const songs = [
  { title: "Telugu - Butta Bomma", url: "https://cdn.pixabay.com/download/audio/2022/03/23/audio_5c781a020d.mp3?filename=urban-groove-11890.mp3" },
  { title: "Hindi - Tujhe Kitna Chahne Lage", url: "https://cdn.pixabay.com/download/audio/2021/11/02/audio_b9732e4569.mp3?filename=cinematic-piano-9032.mp3" },
  { title: "Telugu - Samajavaragamana", url: "https://cdn.pixabay.com/download/audio/2021/10/04/audio_b0b77a0282.mp3?filename=upbeat-guitar-8744.mp3" },
  { title: "Hindi - Kesariya", url: "https://cdn.pixabay.com/download/audio/2021/11/05/audio_64a02e6c21.mp3?filename=acoustic-guitar-9091.mp3" },
  { title: "Telugu - Inkem Inkem Inkem Kaavaale", url: "https://cdn.pixabay.com/download/audio/2022/02/25/audio_0b2a5b6cd7.mp3?filename=happy-summer-10592.mp3" },
  { title: "Hindi - Phir Bhi Tumko Chaahunga", url: "https://cdn.pixabay.com/download/audio/2021/11/09/audio_1e5df84c20.mp3?filename=piano-ballad-9134.mp3" },
  { title: "Telugu - Dheera Dheera", url: "https://cdn.pixabay.com/download/audio/2022/03/23/audio_f05fef3dbd.mp3?filename=smooth-guitar-11895.mp3" },
  { title: "Hindi - Channa Mereya", url: "https://cdn.pixabay.com/download/audio/2021/11/02/audio_1d6e12244d.mp3?filename=emotional-piano-9033.mp3" },
  { title: "Telugu - Vachindamma", url: "https://cdn.pixabay.com/download/audio/2021/10/26/audio_3159e6a9d1.mp3?filename=chill-ambient-8881.mp3" },
  { title: "Hindi - Kabira", url: "https://cdn.pixabay.com/download/audio/2021/10/31/audio_92a370fd64.mp3?filename=acoustic-folk-9022.mp3" },
  { title: "Telugu - Samajavaragamana (Instrumental)", url: "https://cdn.pixabay.com/download/audio/2021/10/04/audio_b0b77a0282.mp3?filename=upbeat-guitar-8744.mp3" },
  { title: "Hindi - Tum Hi Ho", url: "https://cdn.pixabay.com/download/audio/2021/11/04/audio_0047b8697a.mp3?filename=romantic-piano-9076.mp3" },
  { title: "Telugu - Malupu", url: "https://cdn.pixabay.com/download/audio/2022/03/28/audio_20d58b6b5e.mp3?filename=funky-funk-12073.mp3" },
  { title: "Hindi - Ae Dil Hai Mushkil", url: "https://cdn.pixabay.com/download/audio/2022/02/17/audio_c6f434ad3b.mp3?filename=dramatic-piano-10501.mp3" },
  { title: "Telugu - Manasa Manasa", url: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_b08e23f245.mp3?filename=cinematic-hiphop-11962.mp3" },
  { title: "Hindi - Kabhi Jo Baadal Barse", url: "https://cdn.pixabay.com/download/audio/2022/02/07/audio_4f5aa69d92.mp3?filename=calm-piano-10344.mp3" },
  { title: "Telugu - Reddamma Bottu", url: "https://cdn.pixabay.com/download/audio/2021/10/06/audio_6d259a5a87.mp3?filename=soft-piano-8774.mp3" },
  { title: "Hindi - Tera Ban Jaunga", url: "https://cdn.pixabay.com/download/audio/2022/03/27/audio_7e0145273c.mp3?filename=calm-piano-12016.mp3" },
  { title: "Telugu - Nee Kallalona", url: "https://cdn.pixabay.com/download/audio/2021/10/26/audio_3159e6a9d1.mp3?filename=chill-ambient-8881.mp3" },
  { title: "Hindi - Jai Ho", url: "https://cdn.pixabay.com/download/audio/2022/03/20/audio_33b0c4bb48.mp3?filename=ethnic-folk-11782.mp3" }
];

// Create bars for visualizer
for(let i = 0; i < barsCount; i++) {
  const bar = document.createElement('div');
  bar.classList.add('bar');
  visualizer.appendChild(bar);
}
const bars = document.querySelectorAll('.bar');

function setupAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
  }
}

function animate() {
  analyser.getByteFrequencyData(dataArray);
  for(let i = 0; i < barsCount; i++) {
    let value = dataArray[i];
    let height = Math.max(value, 5);
    bars[i].style.height = height + 'px';
    bars[i].style.background = hsl(${i * 12}, 90%, 65%);
    bars[i].style.boxShadow = 0 0 10px hsl(${i * 12}, 90%, 65%);
  }
  animationId = requestAnimationFrame(animate);
}

// Playlist UI creation
function createPlaylist() {
  songs.forEach((song, i) => {
    const li = document.createElement('li');
    li.textContent = song.title;
    li.addEventListener('click', () => {
      loadSong(i);
      playAudio();
    });
    playlistEl.appendChild(li);
  });
}

function updatePlaylistUI() {
  const items = playlistEl.querySelectorAll('li');
  items.forEach((item, i) => {
    item.classList.toggle('active', i === currentIndex);
  });
}

function loadSong(index) {
  currentIndex = index;
  audio.src = songs[index].url;
  audio.load();
  updatePlaylistUI();
}

function playAudio() {
  setupAudioContext();
  audioCtx.resume();
  audio.play();
  playBtn.textContent = '⏸ Pause';
  animate();
}

function pauseAudio() {
  audio.pause();
  playBtn.textContent = '▶ Play';
  cancelAnimationFrame(animationId);
  bars.forEach(bar => {
    bar.style.height = '5px';
    bar.style.boxShadow = 'none';
  });
}

playBtn.addEventListener('click', () => {
  if(audio.paused){
    playAudio();
  } else {
    pauseAudio();
  }
});

// Auto play next song on end
audio.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playAudio();
});

// Initialize app
createPlaylist();
loadSong(0);
</script>