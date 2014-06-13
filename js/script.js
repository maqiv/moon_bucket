$(document).ready(function() {

	// initialize stuff
	collapseMe();
	pickdate();
	storeItem();
	refreshIndex();
	initItems();
	
	$('#mySexyTabs a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});
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
	$('.poetry-container-content #poetries').empty();
	$('.poetry-container-content #drafts').empty();
	var it = localStorage['pstore.index'].split(';');
	
	for (var i = 0; i < (it.length) - 1; i++) {
		displayItem(it[i]);
	}
	publishItem();
	removeItem();
}

function displayItem(index) {
	var cont = '<div class="poetry-container-entry" id="e_' + index + '">';
	cont += '<div class="poetry-container-entry-head">' + localStorage['pstore.' + index + '.title'] + '</div>';
	cont += '<div class="poetry-container-entry-content">' + localStorage['pstore.' + index + '.text'] + '</div>';
	cont += '<div class="poetry-container-entry-foot">';
	cont += '<div class="poetry-container-entry-foot-left">Created on ' + localStorage['pstore.' + index + '.timestamp'] + '</div>';
	cont += '<div class="poetry-container-entry-foot-right">' + ((localStorage['pstore.' + index + '.public'] == 'false') ? '<span class="poetry-container-entry-public-click">Ver&ouml;ffentlichen</span>' : '') + '<span class="poetry-container-entry-delete-click">L&ouml;schen</span></div>';
	cont += '</div></div>';
	
	$('.poetry-container-content #' + ((localStorage['pstore.' + index + '.public'] == 'true') ? 'poetries' : 'drafts')).append(cont);
}

function refreshIndex() {
	var s = '';
	var t = '';
	for (var i = 0; i < localStorage.length; i++) {
		t = localStorage.key(i).split('.');
		if (t[2] == 'title')
		{
			s += t[1] + ';';
		}
	}
	localStorage['pstore.index'] = s;
}

function storeItem() {
	$('#btn-add').click(function() {
		var tit = $('#editor-title').val();
		var cor = $('#editor-corpus').val();
		var dat = $('#editor-date').val();
		var pub = $('#check-draft').prop('checked');
		
		if (tit == '' || cor == '' || dat == '') {
			alert("Bitte alle Felder ausf\u00fcllen!");
			return;
		}
		
		var id = countI();
		localStorage['pstore.' + id + '.title'] = tit;
		localStorage['pstore.' + id + '.text'] = cor;
		localStorage['pstore.' + id + '.timestamp'] = dat;
		localStorage['pstore.' + id + '.public'] = pub;
		
		//felder leeren und editor einklappen
		$('#editor-title').val('');
		$('#editor-corpus').val('');
		$('#editor-date').val('');
		$('#check-draft').attr('checked', false);
		$('#colme').collapse('hide');
		
		refreshIndex();
		initItems();
	});
}

function removeItem() {
	$('.poetry-container-entry-delete-click').click(function() {
		var t = ($(this).closest('.poetry-container-entry').attr('id')).split('_');
		var id = t[1];
		localStorage.removeItem('pstore.' + id + '.title');
		localStorage.removeItem('pstore.' + id + '.text');
		localStorage.removeItem('pstore.' + id + '.timestamp');
		localStorage.removeItem('pstore.' + id + '.public');
		$('#e_' + id).remove();
		refreshIndex();
	});
}

function publishItem() {
	$('.poetry-container-entry-public-click').click(function() {
		var t = ($(this).closest('.poetry-container-entry').attr('id')).split('_');
		console.log(t[1]);
		var id = t[1];
		localStorage['pstore.' + id + '.public'] = 'true';
		refreshIndex();
		initItems();
		$('#mySexyTabs a[href="#poetries"]').tab('show');
	});
}

function countI() {
	var i = localStorage['pstore.pid'];
	if (isNaN(i) || i == '' || i == null) {
		i = 0;
	} else {
		i = parseInt(localStorage['pstore.pid']);
	}
	i++;
	localStorage['pstore.pid'] = i;
	return i;
}