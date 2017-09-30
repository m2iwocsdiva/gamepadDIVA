var id1=1;
var id2=1;
jQuery(document).ready(function(){
	var id1=1;
	setInterval(create,1000);
	setTimeout(function(){setInterval(del,1000);},3000);
})

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
		case 1: input.className += "up";break;
		case 2: input.className += "down";break;
		case 3: input.className += "left";break;
		case 4: input.className += "right";break;
		case 5: input.className += "push";break;
		//case 6: input.className += "clap";break;
	}
	input.id=id1;
	document.body.appendChild(input);
}

function deleteinput(){
	document.getElementById(id2).remove();
}

function testinginput(key){
	var b1 = document.getElementById("check");
	var b2 = document.getElementById(id2);
	if(isCollide(b1,b2)){
		switch(key){
			case 90:
				if(b2.classList.contains("up")) {for(var i=0;i<6;i++){correct(i);}}
				else {for(var i=0;i<6;i++){incorrect(i);}}
				break;
			case 83:
				if(b2.classList.contains("down")) {for(var i=0;i<6;i++){correct(i);}}
				else {for(var i=0;i<6;i++){incorrect(i);}}
				break;
			case 68:
				if(b2.classList.contains("right")) {for(var i=0;i<6;i++){correct(i);}}
				else {for(var i=0;i<6;i++){incorrect(i);}}
				break;
			case 81:
				if(b2.classList.contains("left")) {for(var i=0;i<6;i++){correct(i);}}
				else {for(var i=0;i<6;i++){incorrect(i);}}
				break;
			case 32:
				if(b2.classList.contains("push")) {for(var i=0;i<6;i++){correct(i);}}
				else {for(var i=0;i<6;i++){incorrect(i);}}
				break;
			default:
				break;
		}
	}
	else{
		for(var i=0;i<6;i++){
			incorrect(i);
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