const apiKey = 'cec4a079f063f3323e52bbe875bc56bb'

let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2,'0');
let day = String(today.getDate()).padStart(2,'0');


let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${month}/${day}`;

// let response = await fetch( url,
//     {
//         headers: {
//             'Authorization': `Bearer ${apiKey}`,
//             'Api-User-Agent': 'SongSensei (https://saduhub.github.io/SongSensei/)'
//         }
//     }
// );
// response.json()
//     .then(console.log).catch(console.error);

// console.log(response)


async function makeRequest() {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Api-User-Agent': 'SongSensei (https://saduhub.github.io/SongSensei/)'
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error('Error: ' + response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  makeRequest();



// function makeRequest() {
//     fetch(url, 
//         {
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Api-User-Agent': 'SongSensei (https://saduhub.github.io/SongSensei/)'
//             }
//         }
//         )
//         .then(function(response) {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 alert('Error: ' + response.statusText);
//             }
//         })
//         .then(function(data) {
//             console.log(data);
//         })
//         .catch(function(error) {
//             console.log(error.message);
//         });
// }

// makeRequest();

// let today = new Date();
// let year = today.getFullYear();
// let month = String(today.getMonth() + 1).padStart(2, '0');
// let day = String(today.getDate()).padStart(2, '0');

// let url = `https://en.wikipedia.org/api/rest_v1/feed/featured/${year}/${month}/${day}`;

// function makeRequest() {
//     fetch(url)
//         .then(function(response) {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error('Error: ' + response.statusText);
//             }
//         })
//         .then(function(data) {
//             console.log(data);
//         })
//         .catch(function(error) {
//             console.log(error.message);
//         });
// }

// makeRequest();