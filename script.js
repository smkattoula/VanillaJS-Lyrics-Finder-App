const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// Create a function that allows you to search lyrics by song or artist
async function searchSongs(term) {
  //   fetch(`${apiURL}/suggest/${term}`)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));

  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

// Create a function that shows the song and artist in the DOM
function showData(data) {
  //   let output = "";

  //   data.data.forEach((song) => {
  //     output += `<li><span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //     <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button></li>`;
  //   });

  //   result.innerHTML = `<ul class="songs">
  //     ${output}
  //   </ul>`;

  result.innerHTML = `<ul class="songs">
    ${data.data
      .map(
        (
          song
        ) => `<li><span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button></li>`
      )
      .join("")}
  </ul>`;

  if (data.prev || data.next) {
    more.innerHTML = `${
      data.prev
        ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
        : ""
    }
    ${
      data.next
        ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
        : ""
    }`;
  } else {
    more.innerHTML = "";
  }
}

// Create a function that gets the prev and next songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

//Event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});
