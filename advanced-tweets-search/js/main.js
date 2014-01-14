$(function () {
  window.client = new Codebird;
  window.client.setConsumerKey("ZqFKs1oTnbUsZXUToYyELg", "ij4IinKo39AcfpOwD8VqgVYEai1NBqcSOAc209ZKg8");
  window.client.setToken("1918071552-oah2f9kJaDOo4d1VWFLD7uzpj1fGmNiWyEbORA", "hRg1jpQ7RRjTuhnGS8z3PXILwTWDY9Trm8YSRZg");

  window.iLabel = 0;

  var history = [];
  var keywords;
  var result;

  $('#search_box').submit(function () {
      console.log('place ' + document.getElementById('place').value);
      console.log(document.getElementById('search').value);
      console.log('lala');
      if(document.getElementById('search').value == 'Search some tweets!')
      {
          $('#search').val('');
      }
      if(document.getElementById('since').value == 'YYYY-MM-DD')
      {
          $('#since').val('');
      }
      if(document.getElementById('until').value == 'YYYY-MM-DD')
      {
          $('#until').val('');
      }
      if(document.getElementById('place').value == 'e.g. Venice')
      {
          $('#place').val('');
      }
      if(document.getElementById('num_tweets').value == '50 by default')
      {
          $('#num_tweets').val('');
      }
      keywords = document.getElementById('search').value;
      var count;
      if(document.getElementById('num_tweets').value == "")
      {
          count = 50;
      }
      else
      {
          count = document.getElementById('num_tweets').value;
      }

      window.client.__call(
          "geo_search",
          { query: document.getElementById('place').value},
          function (location){
              console.log('location is right below me!');
              console.log(location);
              window.place_var = location;

              location_str = "";
              if (typeof location.result === "undefined"){
                location_str = "";
              }
              else{
                  location_str = location.result.places[0].id;
              }
              window.client.__call(
                  "search_tweets",

                  { q: keywords,
                    since: document.getElementById('since').value,
                    until: document.getElementById('until').value,
                    place: location_str,
                    count: count
                    },

                  function (result) {
                      history.push(keywords);
                      console.log(history.toString());
                      console.log('Wolala');
                      console.log('since ' + document.getElementById('since').value);
                      console.log('until ' + document.getElementById('until').value);
                      if (location.result!=undefined){
                          console.log('place ' + location.result.places[0].id);
                      }
                      var statuses = result && result.statuses;
                      if (statuses && Array.isArray(statuses) && statuses.length)
                      {
                          console.log('in if loop');
                          $(".tweet_entry").html("");
                          console.log(result);
                          statuses.forEach(function (status) {
                              console.log('doing forEach');
                              $('.tweet_entry').append('<pre><p>' +  '<img' + ' src="'+ status.user.profile_image_url + '" width="20" height="20">' + JSON.stringify(status['text'], null, 4) + '</p>' + '<a href="' + 'http://twitter.com/' + status.user.screen_name + '" target="_blank"' + '" class="at_end" >User Info</a>' + ' ' + '<a href="' + 'http://twitter.com/' + status.user.screen_name + '/status/' + status.id_str + '" target="_blank"' + '" class="at_end" >Go to This Tweet</a>' + '                         <em>   Retweeted: ' + status.retweet_count + '   Created at ' + status.created_at.slice(0,19) + '</em>' +'</pre>');
                          })
                      }
                      if ($("#history li").size() >= 10)
                      {
                          jQuery("#history li:first-child").remove();
                      }

                      $('#history').append('<li id=' + '"' +window.iLabel + '" class = "history_el">' + keywords + '</li>');
                      window.iLabel = window.iLabel + 1;
                  }

              );
          }
      );
      return false;
  });
});
