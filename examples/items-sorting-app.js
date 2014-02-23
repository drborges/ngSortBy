angular.module('ItemsSortingApp', ['ngSortBy']).controller('ItemsCtrl', function($scope) {
  $scope.items = [{
    name: "Nexus 5",
    type: "phone",
    vendor: {
        name: "Google"
    }
  }, {
    name: "iPhone 5",
    type: "phone",
    vendor: {
        name: "Apple"
    }
  }, {
    name: "Android",
    type: "os",
    vendor: {
        name: "Google"
    }
  }, {
    name: "iOS",
    type: "os",
    vendor: {
        name: "Apple"
    }
  }];
});
