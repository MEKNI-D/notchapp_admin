altairApp
    .service('detectBrowser', [
        '$window',
        function($window) {
            // http://stackoverflow.com/questions/22947535/how-to-detect-browser-using-angular
            return function() {
                var userAgent = $window.navigator.userAgent,
                    browsers  = {
                        chrome  : /chrome/i,
                        safari  : /safari/i,
                        firefox : /firefox/i,
                        ie      : /internet explorer/i
                    };

                for ( var key in browsers ) {
                    if ( browsers[key].test(userAgent) ) {
                        return key;
                    }
                }
                return 'unknown';
            }
        }
    ])
    .service('preloaders', [
        '$rootScope',
        '$timeout',
        'utils',
        function($rootScope,$timeout,utils) {
            $rootScope.content_preloader_show = function(style,container) {
                var $body = $('body');
                if(!$body.find('.content-preloader').length) {
                    var image_density = utils.isHighDensity() ? '@2x' : '' ;

                    var preloader_content = (typeof style !== 'undefined' && style == 'regular')
                        ? '<img src="assets/img/spinners/spinner' + image_density + '.gif" alt="" width="32" height="32">'
                        : '<div class="md-preloader"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" width="32" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg></div>';

                    var thisContainer = (typeof container !== 'undefined') ? container : $body;

                    thisContainer.append('<div class="content-preloader">' + preloader_content + '</div>');
                    $timeout(function() {
                        $('.content-preloader').addClass('preloader-active');
                    });
                }
            };
            $rootScope.content_preloader_hide = function() {
                var $body = $('body');
                if($body.find('.content-preloader').length) {
                    // hide preloader
                    $('.content-preloader').removeClass('preloader-active');
                    // remove preloader
                    $timeout(function() {
                        $('.content-preloader').remove();
                    }, 500);
                }
            };

        }
    ])
    .service('authentication', authentication)
.service('meanData', meanData)

authentication.$inject = ['$http', '$window'];
function authentication ($http, $window) {

    var saveToken = function (token) {
        $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
        return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function() {
        var token = getToken();
        var payload;

        if(token){
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    var currentUser = function() {
        if(isLoggedIn()){
            var token = getToken();
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return {
                email : payload.email,
                firstName : payload.firstName
            };
        }
    };

    var registering = function(user) {
        return $http.post('https://notchappbackend.herokuapp.com/clients/register', user).success(function(data){
            saveToken(data.token);
        });
    };

     login = function(user) {
        return $http.post('https://notchappbackend.herokuapp.com/clients/login', user).success(function(data) {
            saveToken(data.token);
        });
    };

    logout = function() {
        $window.localStorage.removeItem('mean-token');
    };

    return {
        currentUser : currentUser,
        saveToken : saveToken,
        getToken : getToken,
        isLoggedIn : isLoggedIn,
        registering : registering,
        login : login,
        logout : logout
    };
}

meanData.$inject = ['$http', 'authentication'];
function meanData ($http, authentication) {
    var getProfile = function () {
        return $http.get('https://notchappbackend.herokuapp.com/clients/profile', {
            headers: {
                Authorization: 'Bearer '+ authentication.getToken()
            }
        });
    };
    return {
        getProfile : getProfile
    };
}
;