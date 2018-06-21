
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

var daysArray = [];

function daysLeft(xp) {
    if (xp >= 13034431) {return 0;}
    //var tempDL = (13,034,431-xp)/50000;
    var tempDL = 13034431-xp;
    tempDL = Math.floor(tempDL/50000);
    //assuming all skills at 50kxp per hour for now
    daysArray.push(tempDL);
    return tempDL;
}



function formatPlayerData(d) {
    var formatted = d.split("\n");
    formatted=formatted.slice(0,28);
    // index 0 is the rank - 1 is the level - 2 is the xp
    
    var woodcutting = formatted[9].split(",");
    var farming = formatted[20].split(",");
    var slayer = formatted[19].split(",");
    var herblore = formatted[16].split(",");
    var agility = formatted[17].split(",");
    var dungeoneering = formatted[25].split(",");
    var divination = formatted[26].split(",");
    var fishing = formatted[11].split(",");
    
    //assign current level
    woodcutting[1] = $("#woodcutting .current_level").text(woodcutting[1]);
    farming[1] = $("#farming .current_level").text(farming[1]);
    slayer[1] = $("#slayer .current_level").text(slayer[1]);
    agility[1] = $("#agility .current_level").text(agility[1]);
    dungeoneering[1] = $("#dungeoneering .current_level").text(dungeoneering[1]);
    divination[1] = $("#divination .current_level").text(divination[1]);
    fishing[1] = $("#fishing .current_level").text(fishing[1]);
    herblore[1] = $("#herblore .current_level").text(herblore[1]);
    
    
    //assign days left
    woodcutting[2] = $("#woodcutting .days_to_max").text(daysLeft(parseInt(woodcutting[2])));
    farming[2] = $("#farming .days_to_max").text(daysLeft(farming[2]));
    slayer[2] = $("#slayer .days_to_max").text(daysLeft(slayer[2]));
    herblore[2] = $("#herblore .days_to_max").text(daysLeft(herblore[2]));
    agility[2] = $("#agility .days_to_max").text(daysLeft(agility[2]));
    dungeoneering[2] = $("#dungeoneering .days_to_max").text(daysLeft(dungeoneering[2]));
    divination[2] = $("#divination .days_to_max").text(daysLeft(divination[2]));
    fishing[2] = $("#fishing .days_to_max").text(daysLeft(fishing[2]));
    
    var overallDays = $(".main .days_to_max").text(Math.max(...daysArray));
    
    console.log(farming[2]);
}

