/**
 * Created by Donia on 24/03/2017.
 */
angular
    .module('altairApp')
    .factory('AgenciesFactory', function($http){

        var data = {};

        data.getAllAgencies= function(){
            return $http.get('https://notchappbackend.herokuapp.com/agencies');
        };

        data.getAllInstitutionAgencies= function(id){
            return $http.get('https://notchappbackend.herokuapp.com/agencies/institution/'+id);
        };

        data.getAgency = function(id){
            return $http.get('https://notchappbackend.herokuapp.com/agencies/'+id);
        };
        return data;

    });
