var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var videoCategory = urlParams.get("videoCategory");
var apiKey = "AIzaSyCrcdQtMI9l2TOl4dRnJTinCz6AigyIvcQ";

fetch(
  `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${videoCategory}&maxResults=10&type=video&videoEmbeddable=true&key=${apiKey}`
)
  .then((response) => response.json())
  .then((data) => {
    var videoInfo = data.items;
    var youtubeVideo = document.getElementById("videoContainer");
    console.log(videoInfo);
    for (var i = 0; i < data.items.length; i++) {
      youtubeVideo.innerHTML += ` 
        <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/${videoInfo[i].id.videoId}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>`;
    }
  })
  .catch((error) => {
    console.error(error);
  });

  