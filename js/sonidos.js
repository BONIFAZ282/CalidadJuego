const audio = document.getElementById("myAudio");

//establecer el volumen
audio.volume = 0.3;

audio.addEventListener("ended", function() {
  this.currentTime = 0;
  this.play();
});

audio.play();
