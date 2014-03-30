App.factory('$user', [
  '$firebaseSimpleLogin',
  'appFirebase',
  '$rootScope',
  function ($firebaseSimpleLogin, appFirebase, $rootScope) {
    var auth = $firebaseSimpleLogin(new Firebase('https://daily-journal.firebaseio.com'));
    var user;
    var ready = false;
    $rootScope.$on('$firebaseSimpleLogin:login', function (e, newUser) {
      console.log('login', newUser);
      user = newUser;
      ready = true;
    });
    $rootScope.$on('$firebaseSimpleLogin:logout', function () {
      console.log('logout');
      user = null;
      ready = true;
    });
    $rootScope.$on('$firebaseSimpleLogin:error', function (e, err) {
      console.log('loginError', err);
    });
    return {
      get: function () {
        return user;
      },
      uid: function () {
        return user && user.uid;
      },
      authenticated: function () {
        return !!user;
      },
      loading: function () {
        return !ready;
      },
      loginGoogle: function () {
        return auth.$login('google', { rememberMe: true });
      },
      logout: function () {
        return auth.$logout();
      }
    };
  }
]);