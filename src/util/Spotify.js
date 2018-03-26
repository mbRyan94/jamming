let usersAccessToken = '';
let expiresIn = '';
const clientId = '66cfdf36b0784cf9a344d6a9ab228123';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (usersAccessToken) {
      return usersAccessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) != null) {
      usersAccessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1]; //evtl. noch [0] vor split()


      //Der AccessToken wird gelöscht (verfällt, wird wieder zum Leerstring), wenn die Zeit abgelaufen ist.
      window.setTimeout(() => usersAccessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return usersAccessToken;
    } else {
      const authUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = authUri;
      console.log(authUri);
    }
  },

  search(term) {
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const usersAccessToken = this.getAccessToken();
    console.log(`accessToken ${usersAccessToken}`);
    return fetch(endpoint, {
      headers: {
        Authorization: 'Bearer ' + usersAccessToken
      }
    }).then(response => {
      console.log(response);
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      } else {
        console.log(jsonResponse.tracks.items);
        return jsonResponse.tracks.items.map(track => ({
  				id: track.id,
  				name: track.name,
  				artist: track.artists[0].name,
  				album: track.album.name,
  				uri: track.uri


        }));
      }

    })

  }
};

export default Spotify;
