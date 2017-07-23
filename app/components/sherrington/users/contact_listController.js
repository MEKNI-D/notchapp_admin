angular
    .module('altairApp')
    .controller('contact_Ctrl', [
        '$rootScope',
        '$scope',
        '$window',
        'contact_list',
        'UsersFactory',
        function ($rootScope,$scope,$window,contact_list,UsersFactory) {

            function loadUsers(){
            UsersFactory.getAllUsers().success(function (response) {
                $scope.users = response;
                console.log($scope.users);
            });
            }
            loadUsers();

            $scope.roles=["customer","business"];
            $scope.status=["active","banned"];

            $scope.$on('onLastRepeat', function (scope, element, attrs) {
                $scope.$apply(function () {
                    UIkit.grid($('#contact_list'),{
                        controls: '#contact_list_filter',
                        gutter: 20
                    });
                });
            })

        }
    ]);