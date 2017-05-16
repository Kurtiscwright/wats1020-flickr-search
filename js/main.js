// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){
    // Place your code here, inside the document ready handler.

    // Create a function called `searchImages()`. This function will handle the
    // process of taking a user's search terms and sending them to Flickr for a
    // response.

    var searchImages = function(tags) {

    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

    $.getJSON(flickrAPI, {
      tags: tags,
      tagmode: "any",
      format: "json",
    }).done(function(data) {
      $("#images").empty();
      $.each(data.items, function(i, item) {
        var newListItem = $('<li>').addClass("col-md-4");  //This is adding items to a list inside of the images class and creating a bootstrap column command
        var newTitle = $('<p class = "image-title">').html(item.title).appendTo(newListItem); //This adds a paragraph container for the title of the item's pulled with a new class inside of the html for the new item's listed in the newListItem tag
        var newDate = $('<p class = "image-date">').text(item.date_taken).appendTo(newListItem); //This is adding another seperate paragraph container that holds the data pulled from the item. It is also being added to the listed photos
        var newDescription = $('<p class = "image-description">').html(item.description).appendTo(newListItem); //This is pulling description's from the API and placing them in a new paragraph container inside of the listed item
        var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').addClass("flickr-link btn btn-sm").appendTo(newListItem); //This is adding a link so that each photo can take the user to it's flickr page.

        var newButton = $("<button class='btn btn-sm btn-primary'> Enlarge</button>").attr({ //This is an object built around enlarging and bringing to the fore-front of the page
          "data-title": item.title, //This pulls the title of the item from the API
          "data-toggle": "modal", // This is adding a jQuery modal or toggle
          "data-target": "#infoModal", //This is telling the code where to place itself and that location is the infoModal class
          "data-imgsrc": item.media.m, //This is pulling the source of the item, so the photo itself
          "data-description": item.description, //This pulls the description from the API
          "type": "button" //This is finalizing the fact that the object is a button

        }).appendTo(newListItem); //This adds everything in the newButton variable to the newListItem for each photo pulled


        $(newListItem).appendTo('#images'); //This is adding the listitem to the images class in the html file
        if (i === 15) { //if i is stricely equal to 15 then return false or if the number of items found adds up to less than 15 return nothing.
          return false;
        }
      });
    });
  };


    $('button.search').on('click', function(event) { //This is a functional button forcing the search of the flickr API to happen.
      event.preventDefault();
      var searchValue = $(event.target.parentElement).find('input[name = "searchText"]')[0]; //This variable is what is actually being searched for when the search is called. It is looking for tags that is inside of the field searchText
      searchImages(searchValue.value); //This is when the search finally starts and is called for.

    });

    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target



}); //this ends the JS script
