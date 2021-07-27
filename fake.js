
function randomFakeScript(templates, coords) {
    var coord = coords.split(' ');
    var coordSplit = coord[Math.floor(Math.random() * coord.length)].split('|');
    document.forms[0].x.value = coordSplit[0];
    document.forms[0].y.value = coordSplit[1];

    jQuery('input[class=unitsInput]').val(0);
    var count;

    for (var templateId in templates) {
        var configMatched = true;
        var troopConfig = templates[templateId];
        for (var unit in troopConfig) {
            if (troopConfig.hasOwnProperty(unit)) {
                if (troopConfig[unit] > 0 && typeof document.forms[0][unit] != 'undefined') {
                    count = parseInt(document.forms[0][unit].nextSibling.nextSibling.innerHTML.match(/\d+/));
                    if (count < 0 || troopConfig[unit] > count) {
                        configMatched = false
                    }
                }
            }
        }
        if(configMatched){
            for (var unit in troopConfig) {
                document.forms[0][unit].value = Math.min(troopConfig[unit], count);
            }
            break;
        }
    }
}

function sequentialFakeScript(templates, coords) {
    coords = coords.split(' ');
    index = 0;
    fakecookie = document.cookie.match('(^|;) ?farm=([^;]*)(;|$)');

    if (fakecookie != null) index = parseInt(fakecookie[2]);
    if (index >= coords.length) alert('All villages were extracted, now start from the first!');
    if (index >= coords.length) index = 0;

    coords = coords[index];
    coords = coords.split('|');
    index = index + 1;
    cookie_date = new Date(2030, 1, 1);
    document.cookie = 'farm=' + index + ';expires=' + cookie_date.toGMTString();
    document.forms[0].x.value = coords[0];
    document.forms[0].y.value = coords[1];

    jQuery('input[class=unitsInput]').val(0);
    var count;
    for (var troopConfig in templates) {
        var configMatched = true;
        for (var unit in troopConfig) {
            if (troopConfig.hasOwnProperty(unit)) {
                if (troopConfig[unit] > 0 && typeof document.forms[0][unit] != 'undefined') {
                    count = parseInt(document.forms[0][unit].nextSibling.nextSibling.innerHTML.match(/\d+/));
                    if (count > 0 && troopConfig[unit] < count) {
                        document.forms[0][unit].value = Math.min(troopConfig[unit], count);
                    } else {
                        configMatched = false
                    }
                }
            }
        } 
        if(configMatched){
            break;
        }
    }
    
}



if (game_data.screen === 'place' && game_data.mode === null) {
    const {
        sendMode,
        troopConfigs,
        coords
    } = config;
    if (sendMode === 'random') randomFakeScript(troopConfigs, coords);
    if (sendMode === 'sequential') sequentialFakeScript(troopConfigs, coords);
} else {
    UI.InfoMessage('Redirecting...');
    setTimeout(function () {
        window.location.assign(game_data.link_base_pure + 'place');
    }, 500);
}
