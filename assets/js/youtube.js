var youtubeButton = document.getElementById('youtube');

youtubeButton.addEventListener('click', () => {

    var apiKey = 'AIzaSyCy1NoX2mcRK-v9AaG3YZELMJtUStODOt8';
    var query = 'chill music';

  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {

    var videoId = data.items[0].id.videoId;

      var embedUrl = `https://www.youtube.com/embed/${videoId}`;

      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', embedUrl);
      iframe.setAttribute('width', '560');
      iframe.setAttribute('height', '315');

      var youtubeVideo = document.querySelector('div');
      youtubeVideo.innerHTML = '';
      youtubeVideo.appendChild(iframe);
    })
    .catch(error => {
      console.error(error);
    });
});