// CORS error
// const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchQuery}&srlimit=10`;


// Wikipedia API functionality
// necessary global variables
let searchQuery;
let articleUrl;
let artistExtract;
let artistDescription;
let artistName;
// API call to wikipedia below: makes use of simple requests. Wikimedia API is the one that provides code to be able to specialize API calls to wikipedia. 
function getInfo() {
  let apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${searchQuery}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      articleUrl = data.content_urls.desktop.page;
      artistExtract = data.extract;
      artistDescription = data.description;
      artistName = data.title;
      // console.log(artistName);
      // console.log(artistDescription);
      // console.log(artistExtract);
      // console.log(articleUrl);

      // put together wikiDiv
      makeInfoElement()
    })
    .catch(error => {
      console.log(error);
    });
}
// put together wikiDiv
function makeInfoElement () {
  // make div
  let wikiDiv = $('<div>')
  wikiDiv.addClass('wikiBox')
  // make elements and populate using global variables
  let artist = $('<h2>');
  artist.text(artistName);
  let description = $('<h3>');
  description.text(artistDescription);
  let extract = $('<p>');
  extract.text(artistExtract);
  let url = $('<a>');
  url.text('Learn More').attr('href', articleUrl)
  extract.append(url)
  wikiDiv.append(artist, description, extract)
  // append to content div
  $('.content').append(wikiDiv);
}
// event listner for each tile
$('.tile').on('click', function() {
  searchQuery = $(this).find('p').text();
  getInfo();
  $('.content').empty()
})