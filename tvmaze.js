<<<<<<< HEAD
/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */
// practice how to run function from the console
async function doAndShowSearch() {
  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
}

$("#search-form").on("submit", function (evt) {
  evt.preventDefault();
  doAndShowSearch();
});

=======
>>>>>>> 977f38ecbfccf6ee08cde3df4c55ca68a0f99e63

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default image if no image exists,
           (image isn't needed until later)>
      }
 */

async function searchShows(query) {
  let showResponse = await axios.get(
    "http://api.tvmaze.com/singlesearch/shows", 
    {params: 
      {q: query}
    });
  // console.log(showResponse);
  let {id, name, summary, image} = showResponse.data;
  return [
    {
      id,
      name,
      summary,
      image
    }
  ]
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  // Why commented out & kept?
  // keep incase... debugging etc?
  // $showsList.empty();

  // check within showRespone.image for a url
      // if there isn't make sure we dont break other cards
      // use given URL OR default /missing-image.png
  
  for (let show of shows) {
    
    if (show.image.original === undefined) show.image.original = `/missing-image.png`

    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src="${show.image.original}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="toggle-episodes">Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.prepend($item);
  }
}

$("#shows-list").on("click", ".toggle-episodes", handleShowEpisodes);

async function handleShowEpisodes(event) {
  let showId = $(event.target).closest(".card").attr("data-show-id");
  let episodeInfo = await getEpisodes(showId);
  // Break
  populateEpisodes(episodeInfo);
  $("#episodes-area").show();
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */
// practice how to run function from the console
async function doAndShowSearch() {
  let query = $("#search-query").val();
  if (!query) return;

$('#shows-list').on("click", ".toggle-episodes" , handleShowEpisodes);

async function handleShowEpisodes(event) {
  console.log(event.target)
  let $showId = $(event.target).closest("div.card").attr("data-show-id")
  console.log($showId)

  await getEpisodes($showId)
  let newEpisodeListing = createEpisodesListing($showId)
  let episodeElements = populateEpisodes(newEpisodeListing) 
  // episodeElement contains array of elements
  // for each episode, append 
  for (let episode of episodeElements){
    $('#episodes-list').append(episode);
  }
  console.log(episodeElements)
  // $('#episodes-list').append(episodeElements)// added through populate episodes
  // toggles display on the episodes-area div
  // $('.episodes-area').css("display", "inline-block" )
  $('.episodes-area').show()
  
  console.log(newEpisodeListing)
  // append to episodes-list
  // toggles display of #episodes-area
  
}



/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  const episodeResponse = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  let episodesInfo = [];
  for (let episode of episodeResponse.data) {
    const {episodeID, name, season, number} = episode;
    episodesInfo.push({episodeID, name, season, number});
  }
  return episodesInfo;
  // take an id and plug in that id into the api call.
  // take the response and assign it to a variable.
  // create an array with each episode's id, name, season, episodeNumber as an object and return that array.

  // TODO: return array-of-episode-info, as described in docstring above
}

async function createEpisodesListing(id) {
  let episodeInfo = await getEpisodes(id);
  populateEpisodes(episodeInfo);
  // console.log(populateEpisodes(episodeInfo))
}

function populateEpisodes(episodesInfo) {
  console.log("This is episodes info", episodesInfo);
  $("#episodes-list").empty();
  for (let episode of episodesInfo) {
    console.log("loop");
    let $newLi = $("<li>");
    const {name, season, number} = episode;
    $newLi.text(`${name} (season ${season}, episode ${number})`);
    console.log($newLi);
    let $epsList = $("#episodes-list")
    console.log("this is episode list", $epsList);
    $epsList.append($newLi);
  }
  return episodesToPopulate;
}

// iterate over the episodesInfo. For each episode,
// create a <li>${name} (season ${season}, episode ${number})</li>
// Take each new list tag and append it to the #episode-list.
