angular
    .module('altairApp')
    .factory('ProductFactory', function($resource){
    return {
       resource : function()
        {
        
return $resource('http://localhost:3000/items/:id',{ id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });        
            
        
        }
    }
                    
})
    /*.factory('UsersFactory', function($resource){
        return {
            resource : function()
            {

                return $resource('http://localhost:3000/users' ,{
                    update: {
                        method: 'PUT' // this method issues a PUT request
                    }
                });


            }
        }
    }

    )*/
;