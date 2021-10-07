var health_boost = "Adds health points to your guard.";
var power_boost = "Increases your guards attack strength.";
var next_level = "Leave this level and go to the next.";
var attack_bandits = "Attack the bandits!";

var i = 0;
function f() {
    var elements = document.getElementsByClassName('dungeon-crawler-clickable')

    var blue = $.grep(elements, function(v) {
        return v.parentElement.tooltipText === health_boost || v.parentElement.tooltipText === power_boost;
    });

    var gold = $.grep(elements, function(v) {
        return v.parentElement.tooltipText === next_level;
    });

    var green = $.grep(elements, function(v) {
        return v.parentElement.tooltipText === undefined || v.parentElement.tooltipText === null;
    });

    if(blue.length > 0) {
        iterate(blue);
    }else if(green.length > 0){
        iterate(green);
    }else if(gold.length > 0 && blue.length == 0 && green.length == 0){
        iterate(gold);
    } else {
        UI.InfoMessage('Play Over', 500);
        return 0;
    }


    i++;
    if( i > -1 ){
        setTimeout( f, 250 );
    }
}
f();

function iterate(boxes){
    for (const box of boxes){
        box.click()
    }
}
