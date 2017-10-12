function afficherResultat(nbMisses)
{
	$("#fond, #message, audio, video").remove();
	
	$("body").append("<div class=\"info\"></div>");
	
	/* affichage du nombre de cibles manquées */
	
	$(".info").append("<p id=\"pMisses\">Manqués : </p>");
	$("#pManques").append("<span id=\"misses\"></span>");
	$("#misses").html(nbMisses);
}
