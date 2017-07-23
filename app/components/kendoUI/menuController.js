angular
    .module('altairApp')
    .controller('menuCtrl', [
        '$scope',
        function ($scope) {
            $scope.menuOrientation = "vertical";
            $scope.onSelect = function(ev) {
                alert($(ev.item.firstChild).text());
            };
        }
    ]);