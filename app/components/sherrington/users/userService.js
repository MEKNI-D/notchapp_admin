/**
 * Created by Donia on 14/07/2016.
 */
angular
    .module('altairApp')
    .factory('UserssFactory', function($http){

        var data = {};

        data.getAllUsers= function(){
            return $http.get('http://localhost:5000/clients');
        };

        data.getUser = function(id){
            return $http.get('http://localhost:5000/clients/'+id);
        };

        data.activateUser = function(id){
            return $http.get('http://localhost:5000/clients/activate/'+id);
        };

        data.banUser = function(id){
            return $http.get('http://localhost:5000/clients/ban/'+id);
        };
        return data;

        });
