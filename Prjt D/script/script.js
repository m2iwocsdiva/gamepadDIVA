jQuery(document).ready(function(){
		setInterval(createinput,1000);	
		})
	function createinput(){
		var input = document.createElement("div");
		input.className += "push";
		document.body.appendChild(input);
	}
	