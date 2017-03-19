
$(document).ready(function() {
    var playerData;
    
    $("#go-btn").click(function() {
        getPlayerData("xiifulminata").done(function(data) {
        playerData = formatPlayerData(data);
        var str = $("#player-attack-level").text('99');
        console.log(str);
      })
  
});
});


function getPlayerData(username) {
    var url = "http://services.runescape.com/m=hiscore/index_lite.ws?player=" + username;
    
    return $.get(url,function(data) {
        
    });
   
}


function formatPlayerData(d) {
    var formatted = d.split("\n");
    console.log(formatted);
}

