angular
    .module('altairApp',['ui.router'])
    .controller('loginCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$location',
        'utils',
        'authentication',
        function ($state,$location,$scope,$rootScope,utils,authentication) {
/********************added authentication  service as dep*************/
            $scope.menuOrientation = "vertical";
            var vm = this;
            vm.credentials = {
                name : "",
                email : "",
                password : ""
            };
            //using login function from authentication service
            vm.onSubmitLogin = function () {
                console.log("testtttt");
                authentication
                    .login(vm.credentials)
                    .error(function(err){
                        alert(err);
                        console.log("error section");
                        console.log(err);
                    })
                    .then(function(res){
                        //alert('something');
                        //$state.go('restricted.dashboard');
                        //$location.path('/');
                        console.log(res);
                        /*$location.path('/');*/
                    });
               // $state.go('restricted.dashboard');
            };
            /***************end*****************************/
            /**************Registration*****************/
            vm.onSubmitRegistration = function () {
                console.log('Submitting registration');
                authentication
                    .registering(vm.credentials)
                    .error(function(err){
                        alert(err);
                        console.log("error section");
                        console.log(err);
                    })
                    .then(function(res){
                       // $location.path('profile');
                        console.log(res);
                    });
            };
            /**************end*****************************/

            $scope.registerFormActive = false;

            var $login_card = $('#login_card'),
                $login_form = $('#login_form'),
                $login_help = $('#login_help'),
                $register_form = $('#register_form'),
                $login_password_reset = $('#login_password_reset');

            // show login form (hide other forms)
            var login_form_show = function() {
                $login_form
                    .show()
                    .siblings()
                    .hide();
            };

            // show register form (hide other forms)
            var register_form_show = function() {
                $register_form
                    .show()
                    .siblings()
                    .hide();
            };

            // show login help (hide other forms)
            var login_help_show = function() {
                $login_help
                    .show()
                    .siblings()
                    .hide();
            };

            // show password reset form (hide other forms)
            var password_reset_show = function() {
                $login_password_reset
                    .show()
                    .siblings()
                    .hide();
            };

            $scope.loginHelp = function($event) {
                $event.preventDefault();
                utils.card_show_hide($login_card,undefined,login_help_show,undefined);
            };

            $scope.backToLogin = function($event) {
                $event.preventDefault();
                $scope.registerFormActive = false;
                utils.card_show_hide($login_card,undefined,login_form_show,undefined);
            };

            $scope.registerForm = function($event) {
                $event.preventDefault();
                $scope.registerFormActive = true;
                utils.card_show_hide($login_card,undefined,register_form_show,undefined);
            };

            $scope.passwordReset = function($event) {
                $event.preventDefault();
                utils.card_show_hide($login_card,undefined,password_reset_show,undefined);
            };

            }


    ])
;