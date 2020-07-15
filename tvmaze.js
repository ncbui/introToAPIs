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
  // TODO: Make an ajax request to the searchShows api.  Remove hard coded data.
  let showResponse = await axios.get("http://api.tvmaze.com/singlesearch/shows", {params: {q: query}});
  // console.log(showResponse);
  return [
    {
      id: showResponse.data.id,
      name: showResponse.data.name,
      summary: showResponse.data.summary,
      image: showResponse.data.image.original
    }
  ]
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  // $showsList.empty();

  // check within showRespone.image for a url
      // if there isn't make sure we dont break other cards
      // use given URL OR default /missing-image.png
  


  for (let show of shows) {
    
    if (show.image === undefined) show.image = `/missing-image.png`
    

    console.log(show.image);
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src="${show.image}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
         </div>
       </div>
      `);

    $showsList.prepend($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

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


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
}