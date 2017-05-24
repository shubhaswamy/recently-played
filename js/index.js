// shoot js when DOM is loaded
$(document).ready(function() {
  
    // setting global variables
    var recentTrackUrl = "https://ws.audioscrobbler.com/2.0?method=user.getRecentTracks&user=shubhaswamy&limit=1&api_key=9f69c0460a627dddc4696e84707458a0&format=json";
    var defaultCoverImage = "https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png";
    var refreshTime = 5000; //look for updated JSON every "xxx" miliseconds
    
    //definig the function which gets JSON data from the last.fm api and sets it to the 
    function setRecentTrack() {
        $.getJSON(recentTrackUrl, function(data){
            var info = data.recenttracks.track[0]; 
                var track = info.name; 
                var artist = info.artist["#text"]; 
                var album = info.album["#text"]; 
                var cover = info.image[3]["#text"]; 
                var url = info.url;
                //var nowplaying = info["@attr"];
            
            
            if ( cover.length > 0 ) {
                $(".cover").attr("src", cover);
                $("body, .blurred-background").css("background-image", "url(" + cover + ")");
                }
            else {
                $(".cover").attr("src", defaultCoverImage);
                $("body, .blurred-background").css("background-image", "url(" + defaultCoverImage + ")");
            }
            
            var abDefaults = {
              normalizeTextColor: true,
              normalizedTextColors: {
                light: "rgba(255,255,255,0.7)",
                dark:  "rgba(0,0,0,0.7)"
              },
            }
            
            $(".cover-container").attr("href", url);
            $.adaptiveBackground.run(abDefaults);
            $(".cover").attr("title", "Cover of \"" + album + "\" by " + artist);
            $(".artist").html(artist);
            $(".track").html(track);
            $(".album").html(album);

            if (nowplaying) {
                $(".time").html("is listening to right now");
            }
            else {
                var timestamp = parseFloat(info.date.uts); 
                var timeISO = new Date(timestamp * 1000).toISOString();
                $(".time").html("was listening to ");
                $("time").attr("datetime", timeISO);
                $("time.timeago").timeago(); 
            }
        });
    } 
    //run function on pageload then load on time interval
    setRecentTrack();
    setInterval(setRecentTrack, refreshTime);       

    
});