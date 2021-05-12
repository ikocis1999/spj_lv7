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

oVijestiModul.service('modal', function(){
	this.otvoriModal = function(sHref)
	{
		$('#modals').removeData('bs.modal');
	 	$('#modals').modal({
	 		remote: sHref,
	 		show: true
	 	});
	};
});
oVijestiModul.controller('MojKontoler',function($scope){
	
});
oVijestiModul.diretive('modal',function(){
	return{
		template: '<div class="modal fade" id="modals" tabindex="-1" role="dialog" aria-hidden="true">'+
					'<div class="modal-dialog">'+
 						'<div class="modal-content">'+
 							'Modal'+
 						'</div>'+
 					 '</div>'+
					'</div>',
		restrict: "E",
		transclude: true,
        replace:true,
      	scope:true,
      	link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;
        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });
        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });
        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
    	}
	};
});
