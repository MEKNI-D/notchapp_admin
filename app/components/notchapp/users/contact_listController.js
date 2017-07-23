angular
    .module('altairApp')
    .controller('clients_Ctrl', [
        '$rootScope',
        '$scope',
        '$window',
        'contact_list',
        'UsersFactory',
        'AgenciesFactory',
        function ($rootScope,$scope,$window,contact_list,UsersFactory, AgenciesFactory) {


            function loadUsers(){
                UsersFactory.getAllUsers().success(function (response) {
                    $scope.contact_list = response;
                    console.log(response);
                });
            }
            loadUsers();

            $scope.status= ['enabled', 'disabled'];
            $scope.agencies = [];
            AgenciesFactory.getAllAgencies().success(function (agencies) {
                agencies.forEach(function (entry) {
                    $scope.agencies.push({agency: {id : entry.id, name: entry.name}});
                });
            });
            console.log($scope.agencies)

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