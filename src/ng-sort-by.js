'use strict'

angular.module('ngSortBy', [])
  .directive('ngSortBy', function () {
    
    var ngSortByCtrl = function ($scope, $element, $attrs) {
      this.typeMatch = function (selectedSortBy, currentSortBy) {
        function withoutDirection(sortBy) {
          return sortBy.split('').filter(function(char) { return char !== '-'; }).join('');
        }

        return (!!currentSortBy && withoutDirection(currentSortBy) === selectedSortBy);
      };

      this.toggleSortDirection = function (sortBy) {
        return sortBy[0] === '-' ? sortBy.slice(1) : '-' + sortBy;
      };

      this.selectSortBy = function (selectedSortBy, currentSortBy) {
        var typeMismatch = !this.typeMatch(selectedSortBy, currentSortBy);
        var newSortBy = typeMismatch ? selectedSortBy : this.toggleSortDirection(currentSortBy);

        return newSortBy;
      };
    };

    var linkFn = function (scope, element, attrs, controllers) {
      var ngSortByCtrl = controllers[0];
      var ngModelCtrl = controllers[1];
      var triggerEventName = attrs.ngSortOn || 'click';

      element.bind(triggerEventName, function () {
        scope.$apply(function () {
          var newSortBy = ngSortByCtrl.selectSortBy(attrs.ngSortBy, ngModelCtrl.$modelValue);
          ngModelCtrl.$setViewValue(newSortBy);
        });
      });
    };

    return {
      require: ['ngSortBy', '^ngModel'],
      controller: ngSortByCtrl,
      link: linkFn
    };
  });