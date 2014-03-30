var App = angular.module('dailyJournal', [
    'firebase',
    'ngAnimate',
    'pasvaz.bindonce'
  ]).constant('Firebase', Firebase).constant('moment', moment).constant('appFirebase', new Firebase('http://daily-journal.firebaseio.com')).controller('AppCtrl', [
    '$scope',
    'moment',
    '$user',
    'appFirebase',
    'jsonDateFilter',
    function ($scope, moment, $user, appFirebase, jsonDateFilter) {
      $scope.prettyDate = function (d) {
        return moment(d).format('dddd, MMMM Do, YYYY');
      };
      $scope.$user = $user;
      var userEntriesRef;
      $scope.$watch('$user.authenticated()', function (val) {
        if (!val) {
          return;
        }
        userEntriesRef = appFirebase.child('entries').child($user.uid());
        userEntriesRef.on('value', useValue);
      });
      function useValue(snapshot) {
        userEntriesRef.off('value');
        if (snapshot.val()) {
          var data = snapshot.val();
          data && setEntries(snapshot.val());
        }
      }
      function setEntries(data) {
        var todayJson = jsonDateFilter();
        var entries = [];
        angular.forEach(data || {}, function (text, date) {
          if (date != todayJson) {
            entries.push({
              date: date,
              text: text
            });
          }
        });
        entries = entries.sort(function (a, b) {
          return moment(a.date).isAfter(b.date) ? 1 : -1;
        });
        $scope.oldEntries = entries;
        function keepScroll() {
          var today = document.querySelector('.card.today');
          var scrollContent = document.querySelector('.scroll-content');
          scrollContent.scrollTop = today.offsetTop - 20;
        }
        keepScroll();
        setTimeout(keepScroll);
      }
    }
  ]);