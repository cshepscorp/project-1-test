// Create a function called `myFunction()`
// YOUR CODE HERE
var searchTerm = document.querySelector("#searchTerm");

// API key ticketmaster
var tmApi = '&apikey=2MALjZsA5tAXCU1xKvJPNTzJVAsqk24J';

// API stuff for Yelp
// Client ID
// Bq0WKZfzysX-Slot-wMLOg

// API Key
// mi3KrWTTIR6u6MzcBQIouugyJle-VR6pDa8Um5HOTaq8MbS2em5Y3ulktm9qsQbLmnc5ZfOB2hume657ENCZsdL2aJLXsq4Q136tr6BtkRZmVH49RgXLZv351cNdYXYx

var yelpApi = 'mi3KrWTTIR6u6MzcBQIouugyJle-VR6pDa8Um5HOTaq8MbS2em5Y3ulktm9qsQbLmnc5ZfOB2hume657ENCZsdL2aJLXsq4Q136tr6BtkRZmVH49RgXLZv351cNdYXYx';
var yelpdClientId = 'Bq0WKZfzysX-Slot-wMLOg';

// YOUR CODE HERE
var loadEventsByCity = function() {
  // var rating = document.getElementById("rating").value;
  var theirSearch = searchTerm.value.trim();
  // var apiUrl = 'https://api.giphy.com/v1/gifs/search?api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&q=' + theirSearch + '&rating=' + rating;
  var brewApiUrl = 'https://api.openbrewerydb.org/breweries/search?query=' + theirSearch;

  fetch(brewApiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        // brewContainer.innerHTML = '';
        // Create a variable that will select the <div> where the GIF will be displayed
        var brewHeadline = document.createElement('h3');
        brewHeadline.textContent = 'Showing all breweries in ' + searchTerm.value;
        
        for(var i = 0; i < response.length; i++) {
          // console.log(response[i]);
          var brewContainer = document.querySelector("#response-container");
          
          var brewSearchListItem = document.createElement('li');
          var brewSearchReturn = document.createElement('a');
          brewSearchReturn.setAttribute('href', response[i].website_url);
          brewSearchReturn.setAttribute('type', 'submit');
          brewSearchReturn.setAttribute('target', '_blank');
          brewSearchReturn.textContent = response[i].name;
          console.log(brewSearchReturn + 'is bse');
          brewContainer.append(brewSearchListItem);
          brewSearchListItem.append(brewSearchReturn);

          brewContainer.append(brewSearchReturn);
          searchTerm.value = '';
        };
        brewContainer.prepend(brewHeadline);
      });

      var tmApiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?sort=date,asc&city='
      + theirSearch + tmApi;

      fetch(tmApiUrl)
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            // Create a variable that will select the <div> where the GIF will be displayed
            var univHeadline = document.createElement('h3');
            univHeadline.textContent = 'Showing all events in ' + searchTerm.value;
            
            for(var i = 0; i < response._embedded.events.length; i++) {
              var univContainer = document.querySelector("#event-container");

              var univSearchReturnList = document.createElement('li');
              var univSearchReturn = document.createElement('a');
              univSearchReturn.setAttribute('href', response._embedded.events[i].url);
              univSearchReturn.setAttribute('type', 'submit');
              univSearchReturn.setAttribute('target', '_blank');
              univSearchReturn.textContent = response._embedded.events[i].name + ' (' + response._embedded.events[i].dates.start.localDate + ')';
              
              // Append to the <div>
              univContainer.append(univSearchReturnList);
              univSearchReturnList.append(univSearchReturn);
              searchTerm.value = '';
            };
            univContainer.prepend(univHeadline);
          });

          var yelpApiUrl = 'https://api.yelp.com/v3/businesses/search?location=' + theirSearch;
  
      fetch(yelpApiUrl, {
          
          headers: {
            'Authorization': `Bearer ${yelpApi}`,
          },
          method: 'GET',
          dataType: 'json',
          })
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            // Create a variable that will select the <div> where the GIF will be displayed
            var yelpHeadline = document.createElement('h3');
            yelpHeadline.textContent = 'Showing all events in ' + searchTerm.value;
            
            for(var i = 0; i < response.businesses.length; i++) {
              var yelpContainer = document.querySelector("#event-container");

              var yelpSearchReturnList = document.createElement('li');
              var yelpSearchReturn = document.createElement('a');
              yelpSearchReturn.setAttribute('href', response.businesses[i].url);
              yelpSearchReturn.setAttribute('type', 'submit');
              yelpSearchReturn.setAttribute('target', '_blank');
              yelpSearchReturn.textContent = response.businesses[i].name + ' (Rating:' + response.businesses[i].rating + ')';
              
              // Append to the <div>
              univContainer.append(yelpSearchReturnList);
              yelpSearchReturnList.append(yelpSearchReturn);
              searchTerm.value = '';
            };
            yelpContainer.prepend(yelpHeadline);
          });
        
};
