function MainService($http, $log) {

    var key = "68372f035a4d545c305c57647c620ffc";

    this.htmlEncode = function htmlEncode(s) {
        var el = document.createElement("div");
        el.innerText = el.textContent = s;
        s = el.innerHTML;
        return s;
    };

    this.getLyrics = function(artist, song){

      artist = this.htmlEncode(artist);
      song = this.htmlEncode(song);


      return $http({
          method: 'GET',
          url: 'https://api.vagalume.com.br/' + 'search.php?art=' + artist + '&mus=' + song + '&apikey={' + key + '}'
      }).then(function(response) {
          if (response.status === 200)
              return response.data;
          else
            console.log("getLyrics failed, logging response.status: ", response.status);
      });
    };

    this.getArtistSongs = function(artist){

      artist = this.htmlEncode(artist);

      return $http({
          method: 'GET',
          url: 'https://api.vagalume.com.br/search.artmus?q=' + artist + '&limit=10'
      }).then(function(response) {
          if (response.status === 200){
              console.log(response.data);
              return response.data;
          }else
            console.log("getArtistSongs failed, logging response.status: ", response.status);
      });
    };

    this.getSongsByTitleOrExcerpt = function(song){

      song = this.htmlEncode(song);

      return $http({
          method: 'GET',
          url: 'https://api.vagalume.com.br/' + 'search.excerpt?q=' + song + '&limit=10'
      }).then(function(response) {
          if (response.status === 200)
              return response.data;
          else
            console.log("getSongsByTitleOrExcerpt failed, logging response.status: ", response.status);
      });
    };
}

angular.module('App').service('MainService', MainService);
