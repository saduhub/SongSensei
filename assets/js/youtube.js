var apiKey = "AIzaSyBh6RkOr7FT_ie20etsDyCW0iTJP_w2DHY";

function getYoutubeData(searchQuery) {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=10&type=video&videoSyndicated=true&videoLicense=creativeCommon&key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      var videoInfo = data.items;
      var youtubeVideos = document.getElementById("videoContainer");
      youtubeVideos.innerHTML = ""; // Clear existing videos before adding new ones
      for (var i = 0; i < data.items.length; i++) {
        var youtubeVideo = document.createElement("div");
        youtubeVideo.classList.add("youtube-video");

        youtubeVideo.innerHTML = `
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/${videoInfo[i].id.videoId}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>`;

        youtubeVideos.appendChild(youtubeVideo);
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