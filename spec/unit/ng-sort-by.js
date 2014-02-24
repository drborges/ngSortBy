'use strict'

define(['src/ng-sort-by'], function () {

  describe("ngSortBy Module", function () {
    beforeEach(module('ngSortBy'));

    describe("SortService", function () {

      describe("#typeMatch", function () {
        it("undefined sort type is a type mismatch", inject(function (SortService) {
          var sortByA = undefined,
              sortByB = '-name';

          var actual = SortService.typeMatch(sortByA, sortByB);

          expect(actual).to.be.false;
        }));

        it("sort filters 'name' and '-name' have the same sort type 'name'", inject(function (SortService) {
          var sortByA = 'name',
              sortByB = '-name';

          var actual = SortService.typeMatch(sortByA, sortByB);

          expect(actual).to.be.true;
        }));

        it("sort filters 'name' and '-vendor' have different sort types", inject(function (SortService) {
          var sortByA = 'name',
              sortByB = '-vendor';

          var actual = SortService.typeMatch(sortByA, sortByB);

          expect(actual).to.be.false;
        }));

        it("sort filters 'name' and 'vendor' have different sort types", inject(function (SortService) {
          var sortByA = 'name',
              sortByB = 'vendor';

          var actual = SortService.typeMatch(sortByA, sortByB);

          expect(actual).to.be.false;
        }));
      });

      describe("#toggleSortDirection", function () {
        it("toggles ascending sort direction", inject(function (SortService) {
          var sortBy = 'name';

          var toggledSortBy = SortService.toggleSortDirection(sortBy);

          expect(toggledSortBy).to.equal('-name');
        }));

        it("toggles descending sort direction", inject(function (SortService) {
          var sortBy = '-name';

          var toggledSortBy = SortService.toggleSortDirection(sortBy);

          expect(toggledSortBy).to.equal('name');
        }));
      });
    });

    describe("ngSortBy", function () {
      var $scope;
      var sortByName;

      beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;
        sortByName = angular.element('<button type="button" ng-model="predicate" ng-sort-by="name"></button>');

        $compile(sortByName)($rootScope);
      }));

      it("set ngSortByPredicate on button click", function () {
        expect($scope.ngSortByPredicate).to.be.undefined;
        
        browserTrigger(sortByName, 'click');

        expect($scope.ngSortByPredicate).to.equal('name');
      });
    });
  });
});
