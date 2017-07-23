angular
    .module('altairApp')
    .factory('UsersFactory', function($http){

        var data = {};

        data.getAllUsers= function(){
            return $http.get('https://notchappbackend.herokuapp.com/clients');
        };

        data.getUser = function(id){
            return $http.get('https://notchappbackend.herokuapp.com/clients/'+id);
        };

        data.editUser = function(id, user){
            return $http.post('https://notchappbackend.herokuapp.com/clients/edit/'+id, user);
        };

        data.activateUser = function(id){
            return $http.get('https://notchappbackend.herokuapp.com/clients/activate/'+id);
        };

        data.banUser = function(id){
            return $http.get('https://notchappbackend.herokuapp.com/clients/ban/'+id);
        };
        return data;

        });
