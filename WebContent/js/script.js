$(document).ready(function() {

	// initialize stuff
	collapseMe();
	pickdate();
	storeItem();
	refreshIndex();
	initItems();
});

function collapseMe() {
	$('.collapse').collapse();
	$('#colme').collapse('hide');
}

function pickdate() {
	$('.datepicker').datepicker({
		format : 'dd.mm.yyyy',
		autoclose : true,
		language : 'de-DE'
	});
}

function initItems() {
	$('.poetry-container-content').empty();
	var it = localStorage["pstore.index"].split(";");
	
	for (var i = 0; i < (it.length) - 1; i++) {
		displayItem(it[i]);
	}
	removeItem();
}

function displayItem(index) {
	var cont = "<div class=\"poetry-container-entry\" id=\"e_" + index + "\">";
	cont += "<div class=\"poetry-container-entry-head\">" + localStorage["pstore." + index + ".title"] + "</div>";
	cont += "<div class=\"poetry-container-entry-content\">" + localStorage["pstore." + index + ".title"] + "</div>";
	cont += "<div class=\"poetry-container-entry-foot\">";
	cont += "<div class=\"poetry-container-entry-foot-left\">Created on " + localStorage["pstore." + index + ".title"] + "</div>";
	cont += "<div class=\"poetry-container-entry-foot-right\"><span class=\"poetry-container-entry-delete-click\" id=\"d_" + index + "\">L&ouml;schen</span></div>";
	cont += "</div>";
	cont += "</div>";
	
	$('.poetry-container-content').append(cont);
}

function refreshIndex() {
	var s = "";
	var t = "";
	for (var i = 0; i < localStorage.length; i++) {
		t = localStorage.key(i).split(".");
		if (t[2] == "title")
		{
			s += t[1] + ";";
		}
	}
	localStorage["pstore.index"] = s;
}

function storeItem() {
	$('#btn-add').click(function() {
		var tit = $('#editor-title').val();
		var cor = $('#editor-corpus').val();
		var dat = $('#editor-date').val();
		
		if (tit == "" || cor == "" || dat == "") {
			alert("Bitte alle Felder ausfüllen!");
			return;
		}
		
		var id = countI();
		localStorage["pstore." + id + ".title"] = tit;
		localStorage["pstore." + id + ".text"] = cor;
		localStorage["pstore." + id + ".timestamp"] = dat;
		
		//felder leeren und editor einklappen
		$('#editor-title').val("");
		$('#editor-corpus').val("");
		$('#editor-date').val("");
		$('#colme').collapse('hide');
		
		refreshIndex();
		initItems();
	});
}

function removeItem() {
	$('.poetry-container-entry-delete-click').click(function() {
		var t = ($(this).attr('id')).split("_");
		var id = t[1];
		localStorage.removeItem("pstore." + id + ".title");
		localStorage.removeItem("pstore." + id + ".text");
		localStorage.removeItem("pstore." + id + ".timestamp");
//		localStorage["pstore.pcount"]--;
		$('#e_' + id).remove();
		refreshIndex();
	});
}

function countI() {
	var i = localStorage["pstore.pid"];
//	var c = localStorage["pstore.pcount"];
	if (isNaN(i) || i == "" || i == null) {
		i = 0;
	} else {
		i = parseInt(localStorage["pstore.pid"]);
	}
//	if (isNaN(c) || c == "" || c == null) {
//		c = 1;
//	} else {
//		c = parseInt(localStorage["pstore.pcount"]);
//	}
	i++;
//	c++;
	localStorage["pstore.pid"] = i;
//	localStorage["pstore.pcount"] = c;
	return i;
}