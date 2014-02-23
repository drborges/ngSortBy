'use strict'

angular.module('ngSortBy', [])
  .directive('ngSortBy', function() {
    return {
      link: function(scope, element, attrs) {
        var isNewSortingType = function(selectedSortBy, currentSorting) {
          function sortingTypeOf(sortBy) {
            return sortBy.split('').filter(function(char) { return char !== '-'; }).join('');
          }

          return (!currentSorting || sortingTypeOf(currentSorting) !== selectedSortBy);
        };

        var toggleSorting = function (sortBy) {
          return sortBy[0] === '-' ? sortBy.slice(1) : '-' + sortBy;
        };

        element.bind('click', function() {
          scope.$apply(function() {
            var currentSorting = isNewSortingType(attrs.ngSortBy, scope.ngSortBy) ? attrs.ngSortBy : toggleSorting(scope.ngSortBy);
            scope.ngSortBy = currentSorting;
          });
        });
      }
    };
  });