let audioPlayer = document.getElementById("audioPlayer");
let songTitle = document.getElementById("songTitle");

function playSong(file, title) {
  audioPlayer.src = file;
  audioPlayer.play();
  songTitle.textContent = "▶️ Now Playing: " + title;
}

function searchSong() {
  let query = document.getElementById("searchBox").value.toLowerCase();
  alert("Search feature coming soon!\nYou typed: " + query);
}
