angular
    .module('altairApp')
    .controller('profileCtrl', [
        '$rootScope',
        '$scope',
        'user_data',
        'meanData',
        'AgenciesFactory',
        function ($rootScope,$scope,user_data,meanData, AgenciesFactory) {

            meanData.getProfile()
                .success(function(data) {
                    $scope.user = data;
                    AgenciesFactory.getAllInstitutionAgencies(data.institution).success(function (agencies) {
                        console.log(agencies)
                        $scope.agencies = agencies;
                    });
                })
                .error(function (e) {
                    console.log(e);
                });


        }
    ])
;