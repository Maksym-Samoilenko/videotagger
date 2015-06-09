var search = can.Component.extend({
  tag : "search",
  template: "<input type='text' id='searchid' name='search'><br>",
  
  events: {
    "#searchid input": function(){

    }

  }
});

var addVideo = can.Component.extend({
  tag : "vid",
  template: "<button id='videoForm'>Add video</button><div id='addVideoForm' class='hidden'></div>",
  
  events: {
    "#addVideo click": function(){
        console.log('add new video');
      var video = {videoTitle: $('#videoname').val(),videoUrl : $('#videourl').val()}
              $.ajax({
  url: "/addVideo",
  dataType: 'json',
  type: 'GET',
  data: { 'videoData' : JSON.stringify(video)}
}).done(function( data ) {
  console.log('done');
  $("#addVideoForm").addClass('hidden');
  $("#addVideoForm").empty();
});
  },
  "#videoForm click": function(){
    $("#addVideoForm").append("<input type='text' id='videoname'><br><input type='text' id='videourl' ><br><button id='addVideo'>Add video</button>");
    $("#addVideoForm").removeClass('hidden');
       }

  }
});

   
var allVideo = can.Component.extend({
  tag : "allvid",
  template: "<button id='allVideo'>All video</button><div id=allVideo></div> ",
  
  events: {
    "#allVideo click": function(){
     var video = {videoTitle: $('#videoname').val(),videoUrl : $('#videourl').val()}
     $.ajax({
  url: "/allVideo",
  dataType: 'json',
  type: 'GET'
}).done(function( data ) {

  $("#wrap").empty();
  $.each(data,function(index, value){
    console.log(JSON.stringify(value));
    
    $("#wrap").append("<div id='wrap'><video width='600' height='400' id='"+value.videoUrl+"' class='video-js vjs-default-skin' controls data-setup='{}' preload='auto'><source src='"+value.videoUrl+"' type='video/mp4'/></video></div>");
var myPlayer = _V_(value.videoUrl);
myPlayer.ready(function(){
var bubbles;
var filmsBubbles = '{';
$.ajax({
  url: "/allBubblesByVideoUrl",
  dataType: 'json',
  type: 'GET',
  data: { 'videoid' : value.videoUrl}
}).done(function( data ) {
console.log(JSON.stringify(data));
bubbles = data;
$.each(bubbles,function(index,val){
    if(index !== 0 ){
        filmsBubbles += ',';
    }
console.log(index);
console.log(val);
filmsBubbles += '"' + index + '"' + ':' + '{ "type": "content", "effect": "slide","className": "bubbles2","content": "<span>' + val.content +'</span>",    "dimensions": ["30%","30%"],"position": ["200px", "240px"], "config" : [' + val.start + ',' + val.end +'] }';
})
filmsBubbles += '}';
console.log(filmsBubbles);
var captionsDemo = new Bubbles.videoJS(this.id, 'bubblesContainer', JSON.parse(filmsBubbles));
console.log('film bubbles is parsed');
})
});
// OnClick - Toggle between play and pause




});});}}});

$("body").append(can.view.mustache("<search/>")({}))
$("body").append(can.view.mustache("<vid/>")({}))
$("body").append(can.view.mustache("<allvid/>")({}))
Bubbles.effects['slide_jquery'] = function (object, data, mode) {
                if (mode)
                    $(object).css({'margin-top': 0, 'opacity': 0}).show().animate({'margin-top': 30, 'opacity': 1}, 600);
                else
                    $(object).animate({'margin-top': 0, 'opacity': 0}, 600, function () {
                        $(this).hide();
                    });
            }