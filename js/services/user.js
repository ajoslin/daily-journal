App.factory('$user', ['$firebaseSimpleLogin', 'appFirebase', '$rootScope', function($firebaseSimpleLogin, appFirebase, $rootScope) {
  var auth = $firebaseSimpleLogin(appFirebase);
  var user;
  var ready = false;

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, newUser) {
    user = newUser;
    ready = true;
  });
  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    user = null;
    ready = true;
  });

  return {
    get: function() {
      return user;
    },
    uid: function() {
      return user && user.uid;
    },
    authenticated: function() {
      return !!user;
    },
    loading: function() {
      return !ready;
    },
    loginGoogle: function() {
      return auth.$login('google');
    },
    logout: function() {
      return auth.$logout();
    }
  };

}]);
