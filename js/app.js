var oVijestiModul = angular.module('vijesti-app', []);

oVijestiModul.controller('controllerVijesti', function ($scope, $http) {
	$scope.oVijesti = [];

	$http({
		method: "GET",
		url: "vijesti.json"
	}).then(function(response){
		console.log(response);
		$scope.oVijesti = response.data;
	}, function(response){
		console.log('Greška');
	});

	$scope.showModal = false;
	$scope.open = function(){
		$scope.showModal = !$scope.showModal;
	};
});

oVijestiModul.directive("prikaziVijestiSve", function(){
	return{
		restrict: "E",
		templateUrl: "templates/vijesti.html"
	};
});

oVijestiModul.filter('datum', function(){
	return function(txt){
		var sDate = "";
		if (txt!=undefined) {
			sDate = txt.split("-").join(".");
		}
		return sDate;
	}
});

function DodajVijest()
{
	var sVijestNaziv=$("#post_naziv").val();
	var sVijestTekst=$("#post_tekst").val();
	if(sVijestNaziv=="" || sVijestTekst=="")
	{
		alert('Popunite sva polja');
	}
	else
	{
		$.ajax(
		{
			url: 'http://localhost/spj_lv7/vijesti.php', 
			type: 'POST',
			datatype: 'html',
			data: 
			{
				akcija: 'dodaj_vijest',
				vijest_naziv: sVijestNaziv,
				vijest_tekst: sVijestTekst
			},
			success: function (sOdgovorPosluzitelja)
			{
				alert('Vijest je uspješno dodana!');
			},
			error: function(XMLHttpRequest, textStatus, exception)
			{
				console.log('Došlo je do pogreške');
			},
			async:true
		});
	}
}
function ObrisiVijest(nVijestID)
{
	$.ajax(
	{
		url: 'http://localhost/spj_lv7/vijesti.php', 
		type: 'POST',
		datatype: 'html',
		data: 
		{
			akcija: 'obrisi_vijest',
			vijest_id: nVijestID
		},
		success: function (sOdgovorPosluzitelja)
		{
			alert('Vijest je uspješno obrisana');
		},
		error: function(XMLHttpRequest, textStatus, exception)
		{
			console.log('Došlo je do pogreške');
		},
		async:true
	});
}

