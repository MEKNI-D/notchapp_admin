/**
 * Created by Donia on 19/07/2016.
 */
angular
    .module('altairApp')
    .controller('contact_detailsCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$location',
        '$stateParams',
        'UsersFactory',
        'UsersFactory',

        function ($rootScope,$scope,$state,$location,$stateParams,UsersFactory) {
/*
            console.log(UsersFactory.query());
*/

            console.log($stateParams.id);
            $scope.user = UsersFactory.getUser($stateParams.id).then(function(response){
                $scope.user = response.data[0];
            });

            console.log($scope.user);

            $scope.changeStatus = function(id){
                if ($scope.user.status =='active'){
                    console.log($stateParams.id);
                    UsersFactory.banUser($stateParams.id).then(function(response) {
                        $location.path('/users/contact_list');
                    });
                }else{ if($scope.user.status =='banned'){
                    UsersFactory.activateUser($stateParams.id).then(function(response) {
                        $location.path('/users/contact_list');
                    });
                }}

            }}

           /* $scope.user_data = user_data[0];
            $scope.user_data_contacts = user_data[0].contact;*/


    ])
;