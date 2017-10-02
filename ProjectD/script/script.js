var id=1;
var multiplicateur=1;
var sc=0;
var waitTime;
var iteration=0;

/* Options */
var volumeSong = 0.5;
var volumeChime = 0.6;
var playvideo = true;
var pathchime = "audio/chimes/clap.mp3";
var timerTaverse = 3000;
/* */

var beatmap;
var bpm;
var audio;
var video;
var chime;
/* TODO */
/*
	- Supprimer les imputs valider
*/
/********/

jQuery(document).ready(function(){
	chargement("Ressources/senbonzakura");
	
})

function chargement(path){

	//Lancer l'écran de chargement

	$.getJSON(path + "/beatmap.json", function(data){
		console.log(data); // DEBUG

		//Rajouter nom de la chanson sur le chargement
		
		bpm = data.BPM;
		beatmap = data.beatmap;
		/* Audio */
		audio = document.createElement("AUDIO");
		audio.src = path + "/" + data.Audio;
		audio.volume = volumeSong;
		
		/* Chime */ //Verifier si il n'y en a pas un dasn le pack et le proposer
		
		chime = document.createElement("AUDIO");
		chime.src = pathchime;
		chime.volume = volumeChime;
		
		//Rajouter le ptemps de la chanson (audio.duration) 
		
		/* Video */
		if(playvideo){
			video = document.createElement("video");
			video.src = path + "/" + data.Video;
			video.muted = true;
			video.type = "video/mp4";
			if(data.loop == true) video.loop = true;
			
			document.body.appendChild(video);
		}
		
	}).done(function() {
		
		//Enlever l'écran de chargement
		//Verifier si les éléments sont bien charger ?
		
		start();
		
	}).fail(function() {
    console.log( "error" ); //erreur
  });
  
}

function start(){

	if(playvideo) video.play();
	audio.play();

	create();
	setTimeout(function(){setInterval(isMissed,1)},beatmap[0].t*250*60/bpm);
	video.onended = function() { //Fin de la vidéo. Affichage de l'image
		//alert("The video has ended"); //DEBUG
	};
	
	audio.onended = function() { //Fin de l'audio. Redirection sur l'écran de fin
		alert("The audio has ended"); //DEBUG
	};
}

function create(){
	waitTime=beatmap[iteration].t*250*60/bpm;
	setTimeout(function(){
		//console.log(beatmap[iteration].i);
		iteration++;
		if(iteration<1000){
			createinput(beatmap[iteration].i,iteration);
			deleteinput(iteration);
			create();
		}
	},waitTime);
}

function createinput(x,i){
	
		var input = document.createElement("div");
		switch(x){
			case "u": input.className += "arrow-up"; input.id="arrow"; break;
			case "d": input.className += "arrow-down"; input.id="arrow"; break;
			case "l": input.className += "arrow-left"; input.id="arrow"; break;
			case "r": input.className += "arrow-right"; input.id="arrow"; break;
			case "p": input.className += "push"; break;
			default: break;
		}
		var box = document.createElement("div");
		box.classList.add('box');
		box.id = i;
		
		document.getElementById("fond").appendChild(box).appendChild(input);

}

function deleteinput(i){
	setTimeout(function(){
		//if(!document.getElementById(i).classList.contains("good"))miss();
		document.getElementById(i).remove();
	},timerTaverse);
	
	// $(id2).remove(); //Ne marche pas ?
}



function testinginput(key){

	var b1 = document.getElementById("check");
	var b2 = document.getElementById(id).firstChild;
	
	if(isCollide(b1,b2)){
		switch(key){
			case 90:
				if(b2.classList.contains("arrow-up")) {correct(b2);}
				else {incorrect();}
				break;
			case 83:
				if(b2.classList.contains("arrow-down")) {correct(b2);}
				else {incorrect();}
				break;
			case 68:
				if(b2.classList.contains("arrow-right")) {correct(b2);}
				else {incorrect();}
				break;
			case 81:
				if(b2.classList.contains("arrow-left")) {correct(b2);}
				else {incorrect();}
				break;
			case 32:
				if(b2.classList.contains("push")) {correct(b2);}
				else {incorrect();}
				break;
			default:
				break;
		}
	}
	else{
		switch(key){
			case 90:
				incorrect();
				break;
			case 83:
				incorrect();
				break;
			case 68:
				incorrect();
				break;
			case 81:
				incorrect();
				break;
			case 32:
				incorrect();
				break;
			default:
				break;
		}
	}
}
function isCollide(a, b) {
	var rect1 = a.getBoundingClientRect();
	var rect2 = b.getBoundingClientRect();
	var hitpoint1= (rect1.left+rect1.right)/2
	var hitpoint2 = (rect2.left+rect2.right)/2
	if(hitpoint1-100<hitpoint2 && hitpoint1+100>hitpoint2){return true}
}

function isMissed(){	
	var rect1 = document.getElementById("check").getBoundingClientRect();
	var rect2 = document.getElementById(id).firstChild.getBoundingClientRect();
	var hitpoint1 = (rect1.left+rect1.right)/2;
	var hitpoint2 = (rect2.left+rect2.right)/2;
	if (hitpoint1-100 > hitpoint2)miss();
}

function correct(objet){
	id++;
	chime.play();
	objet.parentElement.className +=" good";
	objet.remove();
	document.getElementById("message").innerHTML = "GOOD";
	document.getElementById("message").style.visibility = "visible";
	setTimeout(function(){document.getElementById("message").style.visibility = "hidden";},500);
	addScore(1);
	multiplicateur++;
			
}

function incorrect(){
	document.getElementById("message").innerHTML = "FAIL";
	document.getElementById("message").style.visibility = "visible";
	setTimeout(function(){document.getElementById("message").style.visibility = "hidden";},500);
	multiplicateur=1;
}

function miss(){
	id++;
	document.getElementById("message").innerHTML = "MISS";
	document.getElementById("message").style.visibility = "visible";
	setTimeout(function(){document.getElementById("message").style.visibility = "hidden";},500);
	multiplicateur=1;
}

/* Score */
function addScore(s){
	sc = parseInt($(score).text());
	sc = sc + s*multiplicateur;
	$(score).text(sc);
}
