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
  let profilePic = $(`<img src="${artistImage}" alt="artist image">`);
  // Create the artist details div
  let details = $('<div></div>');
  // Create the artist name heading
  let name = $(`<h3 class="text-pink-300 text-xl font-bold">${artistName}</h3>`);
  // Create the artist description paragraph
  let description = $(`<p class="text-pink-300 text-sm">${ artistDescription}</p>`);
  // Create the artist extract paragraph
  let extract = $(`<p class="text-pink-300 text-sm">${artistExtract}</p>`);
  // Create the artist extract paragraph
  let link = $(`<p class="text-pink-300 text-sm">Check out his wiki <a class="text-gray-100" href="${articleUrl}">here</a>!</p>`);
  // Append the profilePic to the imageContainer div
  imageContainer.append(profilePic);
  // Append the name and description to the details div
  details.append(name, description, extract, link);
  // Clear artist-profile div
  $('#artist-profile').empty();
  // Append the imageContainer and details to the artist-profile div
  $('#artist-profile').append(imageContainer, details);
}

// Event listener for each tile
$("#tile").on("click", function () {
  searchQuery = $(this).text();
  getInfo();
  console.log(searchQuery);
  console.log(artistDescription);
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

// Function to generate and append artist buttons based on local storage
function generateArtistButtons() {
  $('#favorites').empty();

  if (artistArray.length > 0) {
    artistArray.forEach(function(artist) {
      let div = $('<div></div>').addClass('flex flex-row justify-center');
      let h2 = $('<h2></h2>').addClass('text-pink-300 py-2 hover:text-pink-100').text(`${artist} `);
      let span = $('<span></span>').addClass('trash').append($('<i></i>').addClass('far fa-trash-alt'));
      h2.append(span);
      div.append(h2);
      $('#favorites').append(div);
    });
  }
  
  // delegate actions to generated buttons
  $(".trash").on("click", function () {
    console.log("works!");
    $(this).closest('div').remove();
    // need to remove artist from array
  });

}

// on load, generate artist buttons
generateArtistButtons();

let hamburgerButton = $('#hamburger');
let navContent = $('#nav-content');

hamburgerButton.on('click', function() {
  if (navContent.is(':hidden')) {
    navContent.slideDown();
  } else {
    navContent.slideUp();
  }
});