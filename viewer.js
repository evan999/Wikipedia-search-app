window.onLoad(function() {
  /* when form is submitted */
  $('.form').submit(function(){
    $('#res').html(" "); // set innerHtml of res div as blank
    callWikipedia();
    return false;
  });
  /* when search button is clicked */
  $('#search-bttn').click(function(){
    $('#res').html(" ");
    callWikipedia();
  });
  function callWikipedia(){
    var q = $('#query').val();
    var apiCall = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+q+"&callback=?";
    /*
    fetch( apiCall, {
    method: 'POST',
    // Other init settings such as 'credentials'
    } ).then( function ( response ) {
    if ( response.ok ) {
        return response.json();
    }
    throw new Error( 'Nothing was found. Please try again!' + response.statusText );
    } ).then( function ( res ) {
    // do something with data
        var data = res.query.pages;
        render(data);
    });
    */
    $.ajax({
      url:  apiCall,
      dataType: 'jsonp',
      type: 'POST',
      success: (res) =>{
        var data = res.query.pages;
        render(data);
      },
      error: (error) => {
        alert('Nothing found. Please try again!');
      }
    });
    
  }
  /* render function to append the search result pages */
  function render(data){
    var selectionLink ="http://en.wikipedia.org/?curid=";
    for(var url in data){
      $('#res').append("<div id='resultdiv'><a target='_blank' href='"+selectionLink+data[url].pageid+"'><h3>"+data[url].title+"</h3><p>"+data[url].extract+"</p></a></div>");
    }
  }
});