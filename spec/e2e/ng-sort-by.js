'use strict'

define(['src/ng-sort-by'], function () {

  describe("ng-sort-by", function () {

    beforeEach(module('ngSortBy'));

    it("2 == 1", function() {
      expect(2).to.equal(1);
    });

    it("2 == 2", function() {
      expect(2).to.equal(2);
    });

    it("injects angular controller", inject(function ($rootScope, $controller) {
      var scope = $rootScope.$new();
      var ctrl = $controller("HelloWorldCtrl", {
        $scope: scope
      });

      expect(scope.message).to.equal("Hello World");
    }));
  });
});
