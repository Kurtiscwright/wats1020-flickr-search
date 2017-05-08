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
        var newListItem = $('<li>').addClass("col-md-4");
        var newTitle = $('<p class = "image-title">').html(item.title).appendTo(newListItem);
        var newDate = $('<p class = "image-date">').text(item.date_taken).appendTo(newListItem);
        var newDescription = $('<p class = "image-description">').html(item.description).appendTo(newListItem);
        var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').addClass("flickr-link btn btn-sm").appendTo(newListItem);

        var newButton = $("<button class='btn btn-sm btn-primary'> Enlarge</button>").attr({
          "data-title": item.title,
          "data-toggle": "modal",
          "data-target": "#infoModal",
          "data-imgsrc": item.media.m,
          "data-description": item.description,
          "type": "button"

        }).appendTo(newListItem);


        $(newListItem).appendTo('#images');
        if (i === 15) {
          return false;
        }
      });
    });
  };


    $('button.search').on('click', function(event) {
      event.preventDefault();
      var searchValue = $(event.target.parentElement).find('input[name = "searchText"]')[0];
      console.log(searchValue);
      searchImages(searchValue.value);

    });

    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target



});
