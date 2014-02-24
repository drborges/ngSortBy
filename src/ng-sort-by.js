'use strict'

angular.module('ngSortBy', [])
  .service('SortService', function () {
    this.typeMatch = function (selectedSortBy, currentSortBy) {
      function withoutDirection(sortBy) {
        return sortBy.split('').filter(function(char) { return char !== '-'; }).join('');
      }

      return (!!currentSortBy && withoutDirection(currentSortBy) === selectedSortBy);
    };

    this.toggleSortDirection = function (sortBy) {
      return sortBy[0] === '-' ? sortBy.slice(1) : '-' + sortBy;
    };
  })

  .directive('ngSortBy', function (SortService) {
    return {
      require: '^ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        var triggerEventName = attrs.ngSortOn || 'click';

        element.bind(triggerEventName, function () {
          scope.$apply(function () {
            var typeMismatch = !SortService.typeMatch(attrs.ngSortBy, ngModelCtrl.$modelValue);
            var currentSorting = typeMismatch ? attrs.ngSortBy : SortService.toggleSortDirection(ngModelCtrl.$modelValue);

            ngModelCtrl.$setViewValue(currentSorting);
          });
        });
      }
    };
  });