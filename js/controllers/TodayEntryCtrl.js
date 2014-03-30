App.controller('TodayEntryCtrl', ['$scope', '$user', 'jsonDateFilter', '$firebase', 'appFirebase', function($scope, $user, jsonDateFilter, $firebase, appFirebase) {

  $scope.todayJson = jsonDateFilter();
  var editable = document.querySelector('[contenteditable]');
  editable.style['min-height'] = window.innerHeight - 44 + 'px';

  if (!localStorage.entryDate ||
     localStorage.entryDate != jsonDateFilter()) {
    localStorage.entryDate = jsonDateFilter();
    localStorage.entryText = 'Type here...';
  }

  var initialValue = $scope.entryText = localStorage.entryText;
  var mostRecentValue;
  $scope.$watch('entryText', function(value, oldValue) {
    localStorage.entryText = value;
    mostRecentValue = oldValue;
  });

  if (!$user.authenticated()) {
    $scope.$watch('$user.authenticated()', function(value) {
      if (value) {
        initRemote();
      }
    });
  } else {
    initRemote();
  }

  function initRemote() {
    var ref = $firebase(appFirebase
      .child($user.uid())
      .child(jsonDateFilter()));

    ref.$bind($scope, 'entryText').then(function() {
      if (mostRecentValue != initialValue) {
        $scope.entryText = mostRecentValue;
      }
    });
  }

}]);
