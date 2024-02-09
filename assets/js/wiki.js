// CORS error
// const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchQuery}&srlimit=10`;

// localStroage functionality
let artistString = localStorage.getItem("artists");
let artistArray = artistString ? artistString.split(",") : [];

// Wikipedia API functionality
// necessary global variables
let searchQuery;
let articleUrl;
let artistExtract;
let artistDescription;
let artistName;
let artistImage;
console.log(artistArray)

// API call to Wikipedia to retrieve artist information
function getInfo() {
  let apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${searchQuery}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      articleUrl = data.content_urls.desktop.page;
      artistExtract = data.extract;
      artistDescription = data.description;
      artistName = data.title;
      artistImage = data.thumbnail ? data.thumbnail.source : null;

      // Update the wikiDiv with artist information
      makeInfoElement();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Create and display the artist information div
function makeInfoElement() {
  // Create the imageContainer div
  let imageContainer = $('<div class="flex items-center justify-center"></div>');
  // Create the profilePic element
  let profilePic = $(`<img src="${artistImage}" alt="artist image" class="rounded">`);
  // Create the artist details div
  let details = $('<div></div>');
  // Create the artist name heading
  let name = $(`<h3 class="text-pink-300 text-xl font-bold text-center md:text-left">${artistName}</h3>`);
  // Create the artist description paragraph
  let description = $(`<p class="text-pink-300 text-sm text-center md:text-left">${ artistDescription}</p>`);
  // Create the artist extract paragraph
  let extract = $(`<p class="text-pink-300 text-sm text-center md:text-left">${artistExtract}</p>`);
  // Create the artist extract paragraph
  let link = $(`<p class="text-pink-300 text-sm text-center md:text-left">Check out the full wiki <a class="text-gray-100" href="${articleUrl}">here</a>!</p>`);
  // Append the profilePic to the imageContainer div
  imageContainer.append(profilePic);
  // Append the name and description to the details div
  details.append(name, description, extract, link);
  // Clear artist-profile div
  $('#artist-profile').empty();
  // Show artist-profile div
  $('#artist-profile').removeClass('hidden');
  // Append the imageContainer and details to the artist-profile div
  $('#artist-profile').append(imageContainer, details);
  // Clear video div
  // $('#artist-profile').empty();
  // Show video div
  $('#video-div').removeClass('hidden');
  // Append the imageContainer and details to the artist-profile div
  
}

// Event listener for each tile
$(".tile").on("click", function () {
  searchQuery = $(this).text();
  getInfo();
  console.log(searchQuery);
  console.log(artistDescription);
  $('#picks-main').remove();
  $('#description').remove();
// will only work if artist is removed from array
  if (artistArray.includes(searchQuery)) {
    return;
  } else {
    artistArray.push(searchQuery);
    localStorage.setItem("artists", artistArray);
    artistString = localStorage.getItem("artists");
    artistArray = artistString.split(",")
    console.log(artistArray)
    generateArtistButtons();
  }
});

// Navigation to home
let homeBtn = $("#home");

homeBtn.on("click", function () {
  location.reload();
});

// Function to generate and append artist buttons to desktop nav bar based on local storage
function generateArtistButtons() {
  $('#favorites').empty();
  $('#favoritesMobile').empty();
  // Favorites on desktop nav bar
  if (artistArray.length > 0) {
    artistArray.forEach(function(artist) {
      let div = $('<div></div>').addClass('flex flex-row justify-center');
      let h2 = $('<h2></h2>').addClass('artist-btn text-pink-300 py-2 hover:text-pink-100 ').text(`${artist} `);
      let span = $('<span></span>').addClass('trash').append($('<i></i>').addClass('far fa-trash-alt'));
      h2.append(span);
      div.append(h2);
      $('#favorites').append(div);

      $(".artist-btn").on("click", function () {
        searchQuery = $(this).text();
        getInfo();
        getYoutubeData(searchQuery);
        console.log(searchQuery);
        console.log(artistDescription);
        $('#picks-main').remove();
        $('#description').remove();
      });
    });
  }

  // Favorites on mobile nav bar (generate h3)
  if (artistArray.length > 0) {
    $('#yourFavoritesMobile').removeClass('hidden');

    artistArray.forEach(function(artist) {
      let div = $('<div></div>').addClass('flex flex-row justify-center');
      let h2 = $('<h2></h2>').addClass('artist-btn text-pink-300 py-2 hover:text-pink-100').text(`${artist} `);
      let span = $('<span></span>').addClass('trash').append($('<i></i>').addClass('far fa-trash-alt'));
      h2.append(span);
      div.append(h2);
      $('#favoritesMobile').append(div);

      $(".artist-btn").on("click", function () {
        searchQuery = $(this).text();
        getInfo();
        getYoutubeData(searchQuery);
        console.log(searchQuery);
        console.log(artistDescription);
        $('#picks-main').remove();
        $('#description').remove();
      });
    });
  }
  
  let removedArtist;
  // delegate actions to generated buttons
  $(".trash").on("click", function (event) {
    $(event.target).closest('div').addClass('hidden')
    removedArtist = $(event.target).closest('h2').text()
  //   console.log(removedArtist);
    if ($(event.target).closest('div').hasClass('hidden')) {
      artistArray = artistArray.filter((eachArtist) => {
        eachArtist !== removedArtist;
      })
      localStorage.setItem("artists", artistArray);
      console.log(artistArray);
      // remove artist from favorites
      // $(this).closest('div').remove();
      generateArtistButtons();
    }

  });

}

// on load, generate artist buttons
generateArtistButtons();

// Mobile nav bar open and close
let hamburgerButton = $('#hamburger');
let navContent = $('#nav-content');

hamburgerButton.on('click', function() {
  if (navContent.is(':hidden')) {
    navContent.slideDown();
  } else {
    navContent.slideUp();
  }
});

// input
$("#search-button1").on("click", function() {
  $('#description').addClass('hidden');
  $('#picks-main').addClass('hidden');
  $('#artist-profile').addClass('hidden');
  $('#video-div').removeClass('hidden');
  let searchQuery = $("#top-videos1").val();
  getYoutubeData(searchQuery);

  if (navContent.is(':hidden')) {
    navContent.slideDown();
  } else {
    navContent.slideUp();
  }

});

$("#search-button2").on("click", function() {
  $('#description').addClass('hidden');
  $('#picks-main').addClass('hidden');
  $('#artist-profile').addClass('hidden');
  $('#video-div').removeClass('hidden');
  let searchQuery = $("#top-videos2").val();
  getYoutubeData(searchQuery);

  if (navContent.is(':hidden')) {
    navContent.slideDown();
  } else {
    navContent.slideUp();
  }
});


// YouTube API
var apiKey = "AIzaSyCy1NoX2mcRK-v9AaG3YZELMJtUStODOt8";


function getYoutubeData(searchQuery) {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=12&type=video&videoSyndicated=true&videoLicense=creativeCommon&key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      var videoInfo = data.items;

      var youtubeVideos = document.getElementById("video-div");
      youtubeVideos.innerHTML = ""; // Clear existing videos before adding new ones
      for (var i = 0; i < data.items.length; i++) {
        var youtubeVideo = document.createElement("div");
        youtubeVideo.classList.add("youtube-video", "relative", "pb-56", "w-full", "h-0");

        youtubeVideo.innerHTML = `
          <iframe
            class="absolute top-0 left-0 w-full h-full m-2"
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
    let searchQuery = $(item).text();
    getYoutubeData(searchQuery);
  });

});

document.querySelectorAll(".artist-btn").forEach((item) => {
  item.addEventListener("click", () => {
    let searchQuery = $(item).text();
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