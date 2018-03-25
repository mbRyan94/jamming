let usersAccessToken = '';
let expiresIn = '';
const clientId = '66cfdf36b0784cf9a344d6a9ab228123';
const redirectURL = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (usersAccessToken) {
      return usersAccessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) != null && window.location.href.match(/expires_in=([^&]*)/)!= null) {
      usersAccessToken = window.location.href.match(/access_token=([^&]*)/).split('=')[1]; //evtl. noch [0] vor split()
      expiresIn = window.location.href.match(/expires_in=([^&]*)/).split('=')[1]; //evtl. noch [0] vor split()

      //Der AccessToken wird gelöscht (verfällt, wird wieder zum Leerstring), wenn die Zeit abgelaufen ist.
      window.setTimeout(() => usersAccessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
    }
  },

  search(term) {
    fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
          {
            headers: {
              Authorization: `Bearer ${usersAccessToken}`
            }
          }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)).then(jsonResponse => {

        if (!jsonResponse.tracks) {
          return [];
        } else {
          return jsonResponse.tracks.items.map(track => {
              return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
              }

          });
        }
      })
  }

};

export default Spotify;
