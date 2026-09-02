const musicToggle = document.getElementById("musicToggle");
const musicText = document.getElementById("musicText");
const musicIcon = document.getElementById("musicIcon");

let player;
let isPlaying = false;

/*
  Your YouTube song:
  https://www.youtube.com/watch?v=yD7tXEo19cM
*/

const youtubeVideoId = "yD7tXEo19cM";


function onYouTubeIframeAPIReady() {
player = new YT.Player("youtubePlayer", {
  height: "200",
  width: "200",
    videoId: youtubeVideoId,

    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: youtubeVideoId
    },

    events: {
      onReady: () => {
        player.setVolume(50);
      },

      onStateChange: (event) => {

        if (event.data === YT.PlayerState.PLAYING) {
          isPlaying = true;

          musicText.textContent = "pause our song";
          musicIcon.textContent = "❚❚";
        }

        if (
          event.data === YT.PlayerState.PAUSED ||
          event.data === YT.PlayerState.ENDED
        ) {
          isPlaying = false;

          musicText.textContent = "play our song";
          musicIcon.textContent = "♫";
        }

      }
    }
  });
}


musicToggle.addEventListener("click", () => {

  if (!player || typeof player.playVideo !== "function") {
    return;
  }

  if (!isPlaying) {
    player.playVideo();
  } else {
    player.pauseVideo();
  }

});


/* REASONS I LOVE YOU */

const reasons = [
  "you make ordinary things feel extraordinary.",
  "the way you make the future feel exciting.",
  "being with you feels like home.",
  "your paitence with me.",
  "the way you understand me.",
  "you make me feel chosen.",
  "the way you look at me.",
  "how natural loving you feels.",
  "i love the person i am when i'm with you.",
];

let reasonIndex = 0;

const reasonButton =
  document.getElementById("reasonButton");

const reasonBubble =
  document.getElementById("reasonBubble");


reasonButton.addEventListener("click", () => {

  reasonBubble.textContent =
    reasons[reasonIndex % reasons.length];

  reasonIndex++;

  reasonButton.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.18) rotate(-8deg)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 350,
      easing: "ease-out"
    }
  );

});

let letterStarted = false;

const typedLetter = document.getElementById("typedLetter");

const letterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !letterStarted) {
        letterStarted = true;
        typeBirthdayLetter();
      }
    });
  },
  {
    threshold: 0.35
  }
);

letterObserver.observe(typedLetter);


function typeBirthdayLetter() {
  const text = typedLetter.dataset.text || "";
  let index = 0;

  typedLetter.textContent = "";

  function typeNextCharacter() {
    if (index < text.length) {
      typedLetter.textContent += text.charAt(index);
      index++;

      setTimeout(typeNextCharacter, 28);
    }
  }

  typeNextCharacter();
}