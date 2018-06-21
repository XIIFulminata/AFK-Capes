
$(document).ready(function() {
    var playerData;
    
    $("#go-btn").click(function() {
        getPlayerData(document.getElementById("player-name-input").value).done(function(data) {
        playerData = formatPlayerData(data);
        //var str = $("#player-attack-level").text('99');
        //console.log(str);
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
    formatted=formatted.slice(0,28);
    // index 0 is the rank - 1 is the level - 2 is the xp
    var total = formatted[0].split(",")[1];
    var attack = formatted[1].split(",")[1];
    attack = $("#player-attack-level").text(attack);
    var woodcutting = formatted[9].split(",")[1];
    //woodcutting = $("#player-woodcutting-level").text(woodcutting);
    console.log(total);
    console.log(formatted);
}

