function afficherResultat(nbMisses)
{
	$("#fond, #message, audio, video").remove();
	
	$("body").append("<div class=\"info\"></div>");
	
	/* affichage du nombre de cibles manquées */
	
	$(".info").append("<p id=\"pMisses\">Manqués : </p>");
	$("#pMisses").append("<span id=\"misses\"></span>");
	$("#misses").html(nbMisses);
	
	/* affichage d'un lien vers la page d'accueil */
	
	$("body").append("<div class=\"liens\"></div>");
	$(".liens").append("<a href=\"index.html\">Retour accueil</a>");
}
