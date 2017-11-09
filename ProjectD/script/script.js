var id = 1;
var multiplicateur = 1;
var sc = 0;
var iteration = 0;
var miss = 0;
var waitTime;

var blocker=0;

/* Options */
var playvideo = true;
var pathchime = "audio/chimes/clap.mp3";
var timerTaverse = 3000;
var tolerance = $(window).width() * 0.08;
/* */

var beatmap;
var bpm;
var audio;
var video;

// Timer à 2 secondes
var timerLED = 2000;

// On initialise un timeout de base
var timeout = setTimeout(function() {
		$("#logLED").load("http://localhost:8000/led/off");
	}, timerLED);

var chimes = new Array();
var cptChime = 0;

jQuery(document).ready(function() {
	chargement();
});

function chargement() {

	//Lancer l'écran de chargement
	$("body").css("background-image", 'url("images/loading.gif")');

	//$.getJSON(path + "/beatmap.json", function(data){
	//$.getJSON(jsonBeatmap, function(data){

	//var data = $.parseJSON(jsonBeatmap);
	//console.log(jsonBeatmap);
	//console.log(a);

	//var url = window.URL.createObjectURL(new Blob(jsonBeatmap));
	var url = window.URL.createObjectURL(jsonBeatmap);
	var urlVideo = window.URL.createObjectURL(blobVideo);
	var urlAudio = window.URL.createObjectURL(blobAudio);
	//console.log("url : " + url);

	//var path = "";

	/*blobVideo.onload = function() {

		console.log("Vidéo chargé");
	};*/

	// NOTES :
	// transmission du fichier beatmap.js fonctionne
	// reste à récupérer fichiers .mp3 et .mp4

	//$.getJSON(url + "/beatmap.json", function(data){
	$.getJSON(url, function(data) {

		console.log(data); // DEBUG

		//Rajouter nom de la chanson sur le chargement
		$("#nom").html(data.Name);
		nameSong = data.Name;

		bpm = data.BPM;
		beatmap = data.beatmap;
		/* Audio */
		audio = document.createElement("AUDIO");
		//audio.src = path + "/" + data.Audio;
		audio.src = urlAudio;
		audio.volume = volumeSong;

		/* Chime */

		for (var i = 0; i < 10; i++) { //TODO Ajuster et ajouter variable
			chimes[i] = document.createElement("AUDIO");
			chimes[i].src = pathchime;
			chimes[i].volume = volumeChime;
		}

		//Rajouter le temps de la chanson (audio.duration)
		audio.addEventListener('loadedmetadata', function() {
			var duree = Math.round(audio.duration);
			var nbMinutes = Math.trunc(duree / 60);
			var nbSecondes = duree % 60;
			$("#duree").html(nbMinutes + ":" + (nbSecondes < 10 ? "0" : "") + nbSecondes);
		});

		/* Video */
		if (playvideo) {
			video = document.createElement("video");
			video.src = urlVideo;
			video.preload = "";
			video.muted = true;
			video.type = "video/mp4";
			if (data.loop === true) video.loop = true;

			document.body.appendChild(video);
		}

	}).done(function() {

		$("body").css("background-image", "none");

		start();

	}).fail(function() {
		console.log("error"); //erreur
	});

}

function start() {

	if (playvideo) video.play();
	audio.play();

	create(0, 1);

	setTimeout(function() {setInterval(function() {isMissed()}, 1);}, beatmap[0].t * 250 * 60 / bpm);
	video.onended = function() { //Fin de la vidéo. Affichage de l'image
		fond(link);
		$("video").remove();
	};

	audio.onended = function() { //Fin de l'audio. Redirection sur l'écran de fin

		
		$("#Doom").load("resultat.html");
		missf=miss;
		iterationf=iteration;
		scoref=sc;

	};
}

function create(it, i) {

	if (it < beatmap.length) {

		var tmp = beatmap[it];

		if (isNaN(tmp) === true) {

			createinput(tmp, i);

			it++;
			i++;

			create(it, i);
		} else {

			waitTime = tmp * 250 * 60 / bpm;

			it++;

			setTimeout(function() {
				create(it, i);
			}, waitTime);

		}
	}
}

function createinput(x, i) {
	var input = document.createElement("div");
	switch (x) {
		case "u":
			input.className += "arrow-up";
			input.id = "arrow";
			break;
		case "d":
			input.className += "arrow-down";
			input.id = "arrow";
			break;
		case "l":
			input.className += "arrow-left";
			input.id = "arrow";
			break;
		case "r":
			input.className += "arrow-right";
			input.id = "arrow";
			break;
		case "p":
			input.className += "push";
			break;
		default:
			break;
	}
	var box = document.createElement("div");
	box.classList.add('box');
	box.id = i;

	document.getElementById("fond").appendChild(box).appendChild(input);
	setTimeout(function() {
		deleteinput(i);
	}, timerTaverse);
}

function deleteinput(i) {
	document.getElementById(i).remove();
}



function testinginput(key) {
	var b1 = document.getElementById("check");
	var b2 = document.getElementById(id).firstChild;
	if(blocker==0){
		if (isCollide(b1, b2)) {
			switch (key) {
				case 90:
					if (b2.classList.contains("arrow-up")) {
						correct(b2);
					} else {
						incorrect();
					}
					break;
				case 83:
					if (b2.classList.contains("arrow-down")) {
						correct(b2);
					} else {
						incorrect();
					}
					break;
				case 68:
					if (b2.classList.contains("arrow-right")) {
						correct(b2);
					} else {
						incorrect();
					}
					break;
				case 81:
					if (b2.classList.contains("arrow-left")) {
						correct(b2);
					} else {
						incorrect();
					}
					break;
				case 32:
					if (b2.classList.contains("push")) {
						correct(b2);
					} else {
						incorrect();
					}
					break;
				default:
					break;
			}
		}
	}
}

function isCollide(a, b) {
	var rect1 = a.getBoundingClientRect();
	var rect2 = b.getBoundingClientRect();
	var hitpoint1 = (rect1.left + rect1.right) / 2;
	var hitpoint2 = (rect2.left + rect2.right) / 2;
	if (hitpoint1 - tolerance < hitpoint2 && hitpoint1 + tolerance > hitpoint2) {
		return true;
	}
}

function isMissed() {    
	if (document.getElementById(id) !== null) {
		var rect1 = document.getElementById("check").getBoundingClientRect();
		var rect2 = document.getElementById(id).firstChild.getBoundingClientRect();
		var hitpoint1 = (rect1.left + rect1.right) / 2;
		var hitpoint2 = (rect2.left + rect2.right) / 2;
		if (hitpoint1 - tolerance > hitpoint2) missed();
	}
}

function correct(objet) {

	chimes[cptChime].play();
	cptChime++;

	if (cptChime == 10) {
		cptChime = 0;
	}

	id++;
	objet.parentElement.className += " good";
	objet.className -= "box";
	objet.className += " validate";

	setTimeout(function() {
		objet.remove();
	}, 500);
	document.getElementById("message").innerHTML = "GOOD";
	document.getElementById("message").style.visibility = "visible";
	setTimeout(function() {
		document.getElementById("message").style.visibility = "hidden";
	}, 500);

	addScore(1);
	iteration++;
	multiplicateur++;

	$("#logLED").load("http://localhost:8000/led/on-green");

	clearTimeout(timeout);

	timeout = setTimeout(function() {
		$("#logLED").load("http://localhost:8000/led/off");
	}, timerLED);
}

function incorrect() {
		blocker=1;
		console.log(blocker);
		setTimeout(function(){blocker=0;console.log(blocker);},300);
		document.getElementById("message").innerHTML = "FAIL";
		document.getElementById("message").style.visibility = "visible";
		setTimeout(function() {
			document.getElementById("message").style.visibility = "hidden";
		}, 500);
		multiplicateur = 1;
		miss++;
		$("#logLED").load("http://localhost:8000/led/on-red");

		clearTimeout(timeout);
		timeout = setTimeout(function() {
			$("#logLED").load("http://localhost:8000/led/off");
		}, timerLED);
}

function missed() {
	id++;
	document.getElementById("message").innerHTML = "MISS";
	document.getElementById("message").style.visibility = "visible";
	setTimeout(function() {
		document.getElementById("message").style.visibility = "hidden";
	}, 500);
	multiplicateur = 1;
	miss++;
	$("#logLED").load("http://localhost:8000/led/on-grey");
	clearTimeout(timeout);

	timeout = setTimeout(function() {
		$("#logLED").load("http://localhost:8000/led/off");
	}, timerLED);
}

/* Score */
function addScore(s) {

	sc = parseInt($(score).text());
	sc = sc + s * multiplicateur ;
	$(score).text(sc);
}
