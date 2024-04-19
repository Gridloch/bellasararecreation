
// Gets info about the horse from data.json file
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
horseName = urlParams.get('name')

function urlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

if (!horseName || !urlExists(`./images/horse/${horseName}`)) {
    horseName ='peter'
}
let horseData
const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function() {
  const myObj = JSON.parse(this.responseText);
  horseData = myObj
}
xmlhttp.open("GET", `./images/horse/${horseName}/data.json`);
xmlhttp.send();


// This scene is just used to load the image for the loading screen
class Load extends Phaser.Scene 
{
    constructor ()
    {
        super({ key: 'Load' });
    }

    preload ()
    {
        this.load.image('card_back', './images/selector/card_back.png');
    }

    create ()
    { 
        this.scene.start(loadInto);
    }
}