$(document).ready(function() {

  // var resElement = document.getElementById('res');
  $('.form').submit(function(){
    var resElement = document.getElementById('res');
    resElement.innerHTML = " ";

    searchQuery();
    return false;
  });
 
  $('#search-bttn').click(function(){
    var resElement = document.getElementById('res');
    resElement.innerHTML = " ";
    searchQuery();
  });
  function searchQuery(){
    var q = $('#query').val();
    var apiCall = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+q+"&callback=?";
    
    $.ajax({
      url:  apiCall,
      dataType: 'jsonp',
      type: 'POST',
      success: (response) =>{
        var data = response.query.pages;
        render(data);
      },
      error: (error) => {
        alert('Nothing found. Please try again!');
      }
    });
    
    
  }

   function render(data){
    var selection ="http://en.wikipedia.org/?curid=";
    
    for(var url in data){
      $('#res').append("<div id='resultdiv'><a target='_blank' href='"+selection+data[url].pageid+"'><h3>"+data[url].title+"</h3><p>"+data[url].extract+"</p></a></div>");
    }
  }
});