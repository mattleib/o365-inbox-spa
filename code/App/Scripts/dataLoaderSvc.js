angular.module('inboxApp')
.service('dataLoaderSvc', [ '$rootScope', 'webRequestSvc', function ($rootScope, webRequestSvc) {

      return {
          prepareApiCall: function () {
            $rootScope.pageLoadDataBar = true;
            $rootScope.pageLoadDataHasError = false;
            $rootScope.pageLoadDataErrorText = "in-progress";
          },
          successApiCall: function() {
            $rootScope.pageLoadDataBar = false;
            $rootScope.pageLoadDataHasError = false;
            $rootScope.pageLoadDataErrorText = "success";
          },
          errorApiCall: function (err, status, headers) {
            $rootScope.pageLoadDataBar = false;
            $rootScope.pageLoadDataHasError = true;
            $rootScope.pageLoadDataErrorText = webRequestSvc.getHttpErrorMessage(err, status, headers);
          },
          resetApiCall: function () {
            $rootScope.pageLoadDataBar = false;
            $rootScope.pageLoadDataHasError = false;
            $rootScope.pageLoadDataErrorText = null;
          },
      };
}]);
