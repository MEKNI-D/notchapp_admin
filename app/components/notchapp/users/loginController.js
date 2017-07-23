/**
 * Created by Donia on 22/03/2017.
 */
angular
    .module('altairApp',['ui.router'])
    .controller('authCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$location',
        'utils',
        'authentication',
        function ($scope, $rootScope, $state, $location, utils, authentication) {
            /********************added authentication  service as dep*************/
            var vm = this;
            vm.credentials = {
                firstName : "",
                lastName : "",
                phoneNumber : "",
                email : "",
                password : "",
                repeatPassword : ""
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
                        $state.go('restricted.dashboard');
                        console.log(res);

                    });
            };
            /***************end*****************************/
            /**************Registration*****************/
            vm.onSubmitRegistration = function () {
                console.log('Submitting registration');
                console.log(vm.credentials);
                if (vm.credentials.email == "" && vm.credentials.password == "" &&
                vm.credentials.firstName == "" && vm.credentials.lastName == "" &&
                vm.credentials.phoneNumber == "" && vm.credentials.repeatPassword == ""){
                    UIkit.modal.alert('Vous devez remplir tous les champs!');
                }else if (vm.credentials.email == ""){
                    UIkit.modal.alert('Champ email requis');
                }else if (vm.credentials.password == ""){UIkit.modal.alert('Champ mot de passe requis');}
                else if (vm.credentials.firstName == ""){UIkit.modal.alert('Champ prénom requis');}
                else if (vm.credentials.lastName == ""){UIkit.modal.alert('Champ nom requis');}
                else if (vm.credentials.phoneNumber == ""){UIkit.modal.alert('Champ télépohne requis');}
                else if (vm.credentials.repeatPassword == ""){UIkit.modal.alert('Champ vérification mot de passe requis');}
                else{
                    console.log('I am here')
                    authentication
                        .registering(vm.credentials)
                        .error(function(err){
                            alert(err);
                            console.log("error section");
                            console.log(err);
                            UIkit.modal.alert('Attention!')
                        })
                        .then(function(res){
                            var loadingModal = function(modal){
                                modal = UIkit.modal.blockUI('<div class=\'uk-text-center\'>Patientez s il vous plaît...<br/>' +
                                '<img class=\'uk-margin-top\' src=\'assets/img/spinners/spinner.gif\' alt=\'\'>');
                                setTimeout(function(){ modal.hide() }, 400) };
                            loadingModal();
                            $location.path('/login');
                            console.log(res);
                        });
                }

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