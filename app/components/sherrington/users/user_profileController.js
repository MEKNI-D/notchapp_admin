angular
    .module('altairApp')
    .controller('user_profileCtrl', [
        '$rootScope',
        '$scope',
        '$resource',
        'user_data',
        'meanData',
        'UsersFactory',
        function ($rootScope,$scope,$resource,user_data,meanData,UsersFactory) {


            var cu = this;
            console.log(cu);

            cu.user = {};
            console.log(cu.user);

            meanData.getProfile()
                .success(function(data) {
                    cu.user = data;
                    $scope.user = data;
                  console.log(cu.user);
                  console.log(cu.user.email);


                })
                .error(function (e) {
                    console.log(e);
                });
            console.log(cu.user);

            $scope.user_data = user_data[0];
            $scope.user_data_contacts = user_data[0].contact;

        }
    ])
;