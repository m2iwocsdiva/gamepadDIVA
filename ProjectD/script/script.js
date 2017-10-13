var id=1;
var multiplicateur=1;
var sc=0;
var waitTime;
var iteration=0;

/* Options */
var volumeSong = 0;
var volumeChime = 0.6;
var playvideo = true;
var pathchime = "audio/chimes/clap.mp3";
var timerTaverse = 3000;
var tolerance = $(window).width()*0.08;
/* */

var beatmap;
var bpm;
var audio;
var video;

var chimes = new Array();
var cptChime = 0;

jQuery(document).ready(function(){
	chargement("Ressources/senbonzakura");
	
})

function chargement(path){

	//Lancer l'écran de chargement
	$("body").css("background-image",'url("images/loading.gif")');
	
	$.getJSON(path + "/beatmap.json", function(data){
		console.log(data); // DEBUG

		//Rajouter nom de la chanson sur le chargement
		$("#nom").html(data.Name);
		
		bpm = data.BPM;
		beatmap = data.beatmap;
		/* Audio */
		audio = document.createElement("AUDIO");
		audio.src = path + "/" + data.Audio;
		audio.volume = volumeSong;
		
		/* Chime */ //Verifier si il n'y en a pas un dasn le pack et le proposer
		
		for(var i = 0; i < 10; i++){ //TODO Ajuster et ajouter variable
			chimes[i] = document.createElement("AUDIO");
			chimes[i].src = pathchime;
			chimes[i].volume = volumeChime
		}
		
		//Rajouter le ptemps de la chanson (audio.duration) 
		audio.addEventListener('loadedmetadata',function(){
			var duree      = Math.round(audio.duration);
			var nbMinutes  = Math.trunc(duree/60);
			var nbSecondes = duree%60;
			$("#duree").html(nbMinutes+":"+(nbSecondes<10?"0":"")+nbSecondes);
		});
		
		/* Video */
		if(playvideo){
			video = document.createElement("video");
			video.src = path + "/" + data.Video;
			video.muted = false;
			video.type = "video/mp4";
			if(data.loop == true) video.loop = true;
			
			document.body.appendChild(video);
		}
		
	}).done(function() {
		
		//Enlever l'écran de chargement
		//Verifier si les éléments sont bien charger ?
		$("body").css("background-image","none");
		
		start();
		
	}).fail(function() {
    console.log( "error" ); //erreur
  });
  
}

function afficherResultat(nbMisses)
{
	$("#fond, #message, audio, video").remove();
	
	$("body").append("<div class=\"info\"></div>");
	
	/* affichage du nombre de cibles manquées */
	
	$(".info").append("<p id=\"pMisses\">Manqués : </p>");
	$("#pManques").append("<span id=\"misses\"></span>");
	$("#misses").html(nbMisses);
}

function start(){

	if(playvideo) video.play();
	audio.play();

	create(0,1);
	setTimeout(function(){setInterval(isMissed,1)},beatmap[0].t*250*60/bpm);
	video.onended = function() { //Fin de la vidéo. Affichage de l'image
		//alert("The video has ended"); //DEBUG
	};
	
	audio.onended = function() { //Fin de l'audio. Redirection sur l'écran de fin
	//window.location.href = "resultat.html?score="+sc;
	afficherResultat(0/* nombre de misses à modifier */);
	};
}

function create(it,i){

	console.log("Debug " + beatmap.length);

	if(it < beatmap.length){
		
		var tmp = beatmap[it];
		
		if(isNaN(tmp) == true)
		{
		
			createinput(tmp,i);
			
			it++;
			i++;
			
			create(it,i);
		}
		else
		{
			
			waitTime = tmp*250*60/bpm;
			
			it++;
			
			setTimeout(function(){
				create(it,i);
			},waitTime);
			
		}
		
		
	}
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
		setTimeout(function(){deleteinput(i);},timerTraverse);

function deleteinput(i){
	document.getElementById(i).remove();
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
	/*else{
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
	}*/
}
function isCollide(a, b) {
	var rect1 = a.getBoundingClientRect();
	var rect2 = b.getBoundingClientRect();
	var hitpoint1= (rect1.left+rect1.right)/2
	var hitpoint2 = (rect2.left+rect2.right)/2
	if(hitpoint1-tolerance<hitpoint2 && hitpoint1+tolerance>hitpoint2){return true}
}

function isMissed(){	
	if(document.getElementById(id)!=null){
		var rect1 = document.getElementById("check").getBoundingClientRect();
		var rect2 = document.getElementById(id).firstChild.getBoundingClientRect();
		var hitpoint1 = (rect1.left+rect1.right)/2;
		var hitpoint2 = (rect2.left+rect2.right)/2;
		if (hitpoint1-tolerance > hitpoint2)miss();
	}
}

function correct(objet){

	chimes[cptChime].play();
	cptChime++;
	if(cptChime == 10){
		cptChime = 0;
	}
	id++;
	objet.parentElement.className +=" good";
	objet.className += " validate";
	//objet.remove();
	
	document.getElementById("message").innerHTML = "GOOD";
	document.getElementById("message").style.visibility = "visible";
	setTimeout(function(){document.getElementById("message").style.visibility = "hidden";},500);
	addScore(1);
	multiplicateur++;

	$("#logLED").load("http://localhost:8000/led/on-green"); setTimeout(function(){
  	$("#logLED").load("http://localhost:8000/led/off");
	}, 200);
			
}

function incorrect(){

	//Test jq
	/*$(message).text("FAIL");
	$(message).show();
	setTimeout(function(){ $(message).hide(); }, 500);*/

	document.getElementById("message").innerHTML = "FAIL";
	document.getElementById("message").style.visibility = "visible";
	setTimeout(function(){document.getElementById("message").style.visibility = "hidden";},500);
	multiplicateur=1;

	$("#logLED").load("http://localhost:8000/led/on-red"); setTimeout(function(){
  	$("#logLED").load("http://localhost:8000/led/off");
	}, 200);
}

function miss(){
	id++;
	//Test jq
	/*$(message).text("MISS");
	$(message).show();
	setTimeout(function(){ $(message).hide(); }, 500);*/

	document.getElementById("message").innerHTML = "MISS";
	document.getElementById("message").style.visibility = "visible";
	setTimeout(function(){document.getElementById("message").style.visibility = "hidden";},500);
	multiplicateur=1;

	$("#logLED").load("http://localhost:8000/led/on-grey"); setTimeout(function(){
  	$("#logLED").load("http://localhost:8000/led/off");
	}, 200);
}

/* Score */
function addScore(s){

	sc = parseInt($(score).text());
	sc = sc + s/**multiplicateur*/;
	$(score).text(sc);
}
