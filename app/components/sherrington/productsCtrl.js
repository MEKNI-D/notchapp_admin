angular
    .module('altairApp')
    .controller('prodCtrl', 
        
        function ($scope,$rootScope,products_data, ProductFactory) {

            //ProductService.sayHello() ; 

         //   console.log( ProductService.getAll())
            // products data
            $scope.products_data = ProductFactory.resource().query() ;

    console.log($scope.products_data)
            $scope.pageSize = 10;

            $scope.filter_status_options = [
                {
                    value: '',
                    title: 'All'
                },
                {
                    value: 'en stock',
                    title: 'en stock'
                },
                {
                    value: 'hors stock',
                    title: 'hors stock'
                },
                {
                    value: 'ships_3_5_days',
                    title: 'Ships in 3-5 days'
                }
            ];

            $scope.filter_status_config = {
                create: false,
                valueField: 'value',
                labelField: 'title',
                placeholder: 'Status...'
            };

            $scope.filterData = {
                status: ["en stock ","hors Stock","ships_3_5_days"]
            };

            $scope.filter_pageSize = ['5', '10', '15'];

        }
    )
;
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};