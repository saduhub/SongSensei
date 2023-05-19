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
  // Create div
  let wikiDiv = $("<div>");
  wikiDiv.addClass("wikiBox");

  //Create Youtube Div
  const youtubeDiv = '<div id="videoContainer"></div>';

  // Create elements and populate using global variables
  let artist = $("<h2>");
  artist.text(artistName);
  let description = $("<h3>");
  description.text(artistDescription);
  let extract = $("<p>");
  extract.text(artistExtract);
  let url = $("<a>");
  url.text("Learn More").attr("href", articleUrl);
  extract.append(url);

  // Append artist image if available
  if (artistImage) {
    let image = $("<img>");
    image.attr("src", artistImage);
    wikiDiv.append(image);
  }

  // Append artist information to the wikiDiv
  wikiDiv.append(artist, description, extract);

  // Append the wikiDiv to the content div
  $(".content").append(wikiDiv);
  $(".content").append(youtubeDiv);
}

// Event listener for each tile
$(".tile").on("click", function () {
  searchQuery = $(this).find("p").text();
  getInfo();
  $(".content").empty();
  if (artistArray.includes(searchQuery)) {
    return;
  } else {
    artistArray.push(searchQuery);
    localStorage.setItem("artists", artistArray);
    updateNav();
  }
});

// Navigation to home
let home = $(".sidenav").find('a:contains("Home")');

home.on("click", function () {
  location.reload();
});

// make buttons based on localstorage
function preloadButtons() {
  if (artistArray.length > 0) {
    artistArray.forEach(function (artist) {
      $(".artist-buttons").append(
        `<div class="menu-btn">
        <a href="#" class="artist-btn">${artist}</a>
        <span class="artist-delete-btn" data-name="${artist}">x</span>
        </div>
        `
      );
    });
  }
  // delegate actions to generated buttons
  $(".artist-btn").on("click", function (event) {
    event.preventDefault();
    searchQuery = $(this).text();
    getInfo();
    $(".content").empty();
  });
  /** delete button */
  $(".artist-delete-btn").on("click", function (event) {
    console.log('click');
    const artistName = event.currentTarget.dataset.name;
    const cloneArtistArray = artistArray.slice();
    console.log('cloneArtistArray', cloneArtistArray);
    const nameIndex = cloneArtistArray.findIndex((e) => e === artistName);
    nameIndex > -1 && cloneArtistArray.splice(nameIndex, 1);
    if (cloneArtistArray.length > 0) {
      localStorage.setItem("artists", cloneArtistArray);
    } else {
      localStorage.removeItem("artists");
    }
    artistArray = cloneArtistArray;
    event.preventDefault();
    // updateNav();
    location.reload();
  });
}


// on load, populates buttons
preloadButtons();

function updateNav() {
  $(".artist-buttons").empty();
  preloadButtons();
}
