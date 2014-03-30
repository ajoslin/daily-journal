App.filter('jsonDate', [
  'moment',
  function (moment) {
    return function (d) {
      return moment(d).format('YYYY-MM-DD');
    };
  }
]);