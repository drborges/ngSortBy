'use strict'

define(['lib/sinon/lib/sinon', 'src/ng-sort-by'], function () {

  describe("ngSortBy", function () {
    var $scope;
    var ngSortByCtrl;

    beforeEach(module('ngSortBy'));

    beforeEach(inject(function ($compile, $rootScope) {
      $scope = $rootScope;
      var sortByNameOnClick = angular.element('<button type="button" ng-model="predicate" ng-sort-by="name"></button>');
      var sortByTypeOnMouseenter = angular.element('<button type="button" ng-model="predicate" ng-sort-by="type" ng-sort-on="mouseenter"></button>');

      $compile(sortByNameOnClick)($rootScope);
      $compile(sortByTypeOnMouseenter)($rootScope);

      ngSortByCtrl = sortByNameOnClick.controller('ngSortBy');
    }));

    describe("ngSortByCtrl", function () {

      describe("#typeMatch", function () {
        it("undefined sort type is a type mismatch", function () {

          var sortByA = undefined,
              sortByB = '-name';

          var actual = ngSortByCtrl.typeMatch(sortByA, sortByB);

          expect(actual).to.be.false;
        });

        it("sort filters 'name' and '-name' have the same sort type 'name'", function () {
          var sortByA = 'name',
              sortByB = '-name';

          var actual = ngSortByCtrl.typeMatch(sortByA, sortByB);

          expect(actual).to.be.true;
        });

        it("sort filters 'name' and '-vendor' have different sort types", function () {
          var sortByA = 'name',
              sortByB = '-vendor';

          var actual = ngSortByCtrl.typeMatch(sortByA, sortByB);

          expect(actual).to.be.false;
        });

        it("sort filters 'name' and 'vendor' have different sort types", function () {
          var sortByA = 'name',
              sortByB = 'vendor';

          var actual = ngSortByCtrl.typeMatch(sortByA, sortByB);

          expect(actual).to.be.false;
        });
      });

      describe("#toggleSortDirection", function () {

        it("toggles ascending sort direction", function () {
          var sortBy = 'name';

          var toggledSortBy = ngSortByCtrl.toggleSortDirection(sortBy);

          expect(toggledSortBy).to.equal('-name');
        });

        it("toggles descending sort direction", function () {
          var sortBy = '-name';

          var toggledSortBy = ngSortByCtrl.toggleSortDirection(sortBy);

          expect(toggledSortBy).to.equal('name');
        });
      });

      // describe("#selectSortBy", function () {
      //   console.log(sinon)
      //   ngSortByCtrl.typeMatch = sinon.stub().returns(false);
        
      //   var newSortBy = ngSortByCtrl.selectSortBy('name', 'type');

      //   expect(newSortBy).to.equal('name');
      // });
    });
  });
});
