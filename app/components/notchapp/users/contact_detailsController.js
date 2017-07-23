/**
 * Created by Donia on 19/07/2016.
 */
angular
    .module('altairApp')
    .controller('client_detailsCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$location',
        '$stateParams',
        'UsersFactory',
        'AgenciesFactory',
        function ($rootScope,$scope,$state,$location,$stateParams,UsersFactory, AgenciesFactory) {
            $scope.user = UsersFactory.getUser($stateParams.id).then(function(response){
                $scope.user = response.data;
                console.log($scope.user)
                AgenciesFactory.getAllInstitutionAgencies(response.data.institution_id).then(function (response) {
                    $scope.institution_agencies = response.data;
                });
            });

            $scope.editUser = function (user) {
                console.log(user.user.isEnabled);

                    if(user.user.isEnabled == 0){

                        user.isEnabled = 1;
                        var editedUser = user;
                        editedUser.status = 'enabled';
                        UsersFactory.editUser($stateParams.id, editedUser).success(function (response) {
                            console.log('success');
                            console.log(response);
                            /*$state.reload()
                             */
                        });
                    }else if (user.user.isEnabled == 1){
                        console.log('i am hereeeeeeeeeeee')
                        user.isEnabled = 0;
                        var editedUser = user;
                        editedUser.status = 'disabled'
                        console.log(editedUser);
                        UsersFactory.editUser($stateParams.id, editedUser).success(function (response) {
                            console.log('success');
                            console.log(response);
                            /*$state.reload()
                             */
                        });

                }/*else {
                    console.log(status)
                    UsersFactory.editUser($stateParams.id, user).success(function (response) {
                        console.log('success');
                        console.log(response);
                        /!*$state.reload()
                         *!/
                    });
                }*/

            }
    
    }
    ])
;