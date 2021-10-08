/* 
Script: Golddigger.js
Version: 1.0
*/
const health_boost = "Adds health points to your guard.";
const power_boost = "Increases your guards attack strength.";
const next_level = "Leave this level and go to the next.";
const attack_bandits = "Attack the bandits!";

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
        iterate(bestPick(blue));
    }else if(green.length > 0){
        iterate(bestPick(green));
    }else if(gold.length > 0 && blue.length == 0 && green.length == 0){
        iterate(gold);
    } else {
        UI.ErrorMessage('Help me kill the bandits', 500);
        //return 0;
    }

    i++;
    if( i > -1 ){
        setTimeout( f, 500 );
    }
}
f();

function iterate(elements){
    for (const element of elements){
        element.click()
    }
}

function bestPick(elements) {
    var best = []
    for (const element of elements){
        var total = 0;
        var coords = element.dataset.coordinates.split("-");
        if(coords[0] == 2){
            best.push(element);
            break;
        }
    }
    if(best.length == 0){
        best.push(elements[0]);
    }
    return best;
    
}
