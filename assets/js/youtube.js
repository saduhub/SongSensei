var apiKey = "AIzaSyCV6PrVjxbthsHbXRdvNJ2UorJa4NKm3R0";

function getYoutubeData(searchQuery) {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=11&type=video&videoSyndicated=true&videoLicense=creativeCommon&key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      var videoInfo = data.items;
      var youtubeVideo = document.getElementById("videoContainer");
      for (var i = 1; i < data.items.length; i++) {
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
}

document.querySelectorAll(".tile").forEach((item) => {
  item.addEventListener("click", () => {
    let searchQuery = $(item).find("p").text();
    getYoutubeData(searchQuery);
  });
});

$(document).ready(() => {
  document.querySelectorAll(".artist-buttons")[0].childNodes.forEach((item) => {
    item.addEventListener("click", () => {
      let searchQuery = $(item).text();
      getYoutubeData(searchQuery);
    });
  });
});
