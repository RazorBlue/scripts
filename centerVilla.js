javascript:
if (window.location.href.indexOf('screen=overview_villages&mode=prod') < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "overview_villages&mode=prod");
}
else {
    var tempLength = $("#production_table tr:not(:first)").length;
    var coords = [];
    var bestCoord = '500|500';

    for (var i = 0; i < tempLength; i++) {
        coords.push($("#production_table tr:not(:first)").eq(i).children()[1].innerText.match(/(\d*)\|(\d*)/)[0]);
    }

    var bestDistance = 999999999999;

    function checkDistance(coord1, coord2) {
        //calculate distance from current village
        var a = coord1.match(/(\d*)\|(\d*)/)[1] - coord2.match(/(\d*)\|(\d*)/)[1];
        var b = coord1.match(/(\d*)\|(\d*)/)[2] - coord2.match(/(\d*)\|(\d*)/)[2];
        var distance = Math.round(Math.hypot(a, b));
        return distance;
    }
    counter = 0;
    coords.forEach((village) => {
        thisDistance = 0;
        counter++;
        for (var i = 0; i < coords.length; i++) {
            thisDistance += checkDistance(village, coords[i]);
        }
        console.log(thisDistance/tempLength);
        if (thisDistance < bestDistance) {
            bestDistance = thisDistance;
            bestCoord = village;
        }
        if (counter === coords.length) {
            callback();
        }
    });
    function callback() {
        alert("The most optimal village is " + bestCoord + ". The total rundistance from all your villages to it is " + bestDistance +", which equals around " + Math.round(bestDistance/tempLength) + " average rundistance");
    };

}
