var id1=1;
var id2=1;

/* Options */
var volume = 0.5;
var playvideo = true;
/* */

var beatmap;
var bpm;
var audio;
var video;

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
		audio.volume = volume;
		
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
		// Verifier si les éléments sont bien charger ?
		
		start();
		
	}).fail(function() {
    console.log( "error" ); //erreur
  });
  
}

function start(){

	if(playvideo) video.play();
	audio.play();

	var id1=1;
	setInterval(create,1000);
	setTimeout(function(){setInterval(del,1000);},3000);
	
	video.onended = function() { //Fin de la vidéo. Affichage de l'image
		//alert("The video has ended"); //DEBUG
	};
	
	audio.onended = function() { //Fin de l'audio. Redirection sur l'écran de fin
		alert("The audio has ended"); //DEBUG
	};
}

function create(){
	createinput(id1)

	if(id1>=3) id1=1;
	else 	id1++;
}

function del(){
	deleteinput(id2)
		if(id2>=3) id2=1;
	else 	id2++;
}	

function createinput(){

	var input = document.createElement("div");
	var rand = Math.floor(Math.random() * 5) + 1  
	switch(rand){
		case 1: input.className += "arrow-up"; input.id="arrow"; break;
		case 2: input.className += "arrow-down"; input.id="arrow"; break;
		case 3: input.className += "arrow-left"; input.id="arrow"; break;
		case 4: input.className += "arrow-right"; input.id="arrow"; break;
		case 5: input.className += "push";break;
		//case 6: input.className += "clap";break;
	}
	
	var box = document.createElement("div");
	box.classList.add('box');
	box.id = id1;
	
	document.getElementById("fond").appendChild(box).appendChild(input);
}

function deleteinput(){
	if($(id2).hasClass("good")){for(var i=0;i<6;i++){miss(i);}}
	document.getElementById(id2).remove();
	// $(id2).remove(); //Ne marche pas ?
}



function testinginput(key){

	var b1 = document.getElementById("check");
	var b2 = document.getElementById(id2).firstChild;
	
	if(isCollide(b1,b2)){
		switch(key){
			case 90:
				if(b2.classList.contains("arrow-up")) {addScore(1); for(var i=0;i<6;i++){correct(i);}b2.className +=" good";}
				else {for(var i=0;i<6;i++){incorrect(i);}}
				break;
			case 83:
				if(b2.classList.contains("arrow-down")) {addScore(1); for(var i=0;i<6;i++){correct(i);}b2.className +=" good";}
				else {for(var i=0;i<6;i++){incorrect(i);}}
				break;
			case 68:
				if(b2.classList.contains("arrow-right")) {addScore(1); for(var i=0;i<6;i++){correct(i);}b2.className +=" good";}
				else {for(var i=0;i<6;i++){incorrect(i);}}
				break;
			case 81:
				if(b2.classList.contains("arrow-left")) {addScore(1); for(var i=0;i<6;i++){correct(i);}b2.className +=" good";}
				else {for(var i=0;i<6;i++){incorrect(i);}}
				break;
			case 32:
				if(b2.classList.contains("push")) {addScore(1); for(var i=0;i<6;i++){correct(i);}b2.className +=" good";}
				else {for(var i=0;i<6;i++){incorrect(i);}}
				break;
			default:
				break;
		}
	}
	else{
		switch(key){
			case 90:
				for(var i=0;i<6;i++){incorrect(i)};
				break;
			case 83:
				for(var i=0;i<6;i++){incorrect(i)};
				break;
			case 68:
				for(var i=0;i<6;i++){incorrect(i)};
				break;
			case 81:
				for(var i=0;i<6;i++){incorrect(i)};
				break;
			case 32:
				for(var i=0;i<6;i++){incorrect(i)};
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
	if(hitpoint1-65<hitpoint2 && hitpoint1+65>hitpoint2){return true}
}

function correct(i){
	if (i%2 ==0){
		setTimeout(function(){
			document.getElementById("fond").style.borderColor = "#00ccff";
			document.getElementById("check").style.backgroundColor ="#00ccff";
		},150*i);}
	else{
		setTimeout(function(){
			document.getElementById("fond").style.borderColor = "white";
			document.getElementById("check").style.backgroundColor ="rgba(0,0,0,0.6)";
		},150*i);}
}

function incorrect(i){
	if (i%2 ==0){
		setTimeout(function(){
			document.getElementById("fond").style.borderColor = "red";
			document.getElementById("check").style.backgroundColor ="red";
		},150*i);}
	else{
		setTimeout(function(){
			document.getElementById("fond").style.borderColor = "white";
			document.getElementById("check").style.backgroundColor ="rgba(0,0,0,0.6)";
		},150*i);}
}

function miss(i){
	if (i%2 ==0){
		setTimeout(function(){
			document.getElementById("fond").style.borderColor = "grey";
			document.getElementById("check").style.backgroundColor ="grey";
		},150*i);}
	else{
		setTimeout(function(){
			document.getElementById("fond").style.borderColor = "white";
			document.getElementById("check").style.backgroundColor ="rgba(0,0,0,0.6)";
		},150*i);}
}

/* Score */
function addScore(s){
	var sc = parseInt($(score).text());
	sc = sc + s;
	$(score).text(sc);
}
