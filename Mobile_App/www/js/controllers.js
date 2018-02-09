angular
    .module("app.controllers", [])

.controller("newsFeedCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps) {
        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ? "nightmodeBackground" : "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ? "nightmodeHeaderClass" : "normalHeaderClass";
        };
    }
])

.controller("settingsCtrl", [
    "$scope",
    "$stateParams",
    "$ionicPopup",
    "$rootScope",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $ionicPopup, $rootScope, sharedProps) {
        $scope.setNightmode = function() {
            $rootScope.$broadcast("nightmodeChange", $scope.isNightmode);
            sharedProps.addData("isNightmode", $scope.isNightmode);
        };

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ? "nightmodeBackgroundMain" : "normalBackgroundMain";
        }

        $scope.getFontClass = function() {
            return $scope.isNightmode ? 'nightmodeFontColor' : 'normalBlackLetters';
        }

        $scope.showDisplayInformation = function() {
            var promptAlert = $ionicPopup.alert({
                title: "Display Information",
                template: "<b>Night Mode:</b> Enables night mode for easier reading in low lighting environment.</br>" +
                    "<b>Cache News:</b> Enables caching of 10 latest retrieved articles for offline reading.</br>" +
                    "<b>Font Size:</b> Sets the font size [Range available 14px-24px]."
            });
        };

        $scope.showFilteringInformation = function() {
            var promptAlert = $ionicPopup.alert({
                title: "Filtering Information",
                template: "<b>Markup Toxic:</b> Highlights toxic language.</br>" +
                    "<b>Hide Toxic:</b> Removes toxic language from view.</br>" +
                    "<b>Tolerance:</b> Sets your prefered tolerance level against toxic language. The higher the bar the less tolerant you are."
            });
        };
    }
])

.controller("addSourcesCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps) {
        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ? "nightmodeBackground" : "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };
    }
])

.controller("eyeReaderCtrl", [
    "$scope",
    "$stateParams",
    "$rootScope",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $rootScope, sharedProps) {
        $rootScope.$on("nightmodeChange", function(event, args) {
            $scope.isNightmode = args;
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ? "nightmodeBackground" : "normalBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.getSidemenuIconClass = function() {
            return $scope.isNightmode ? "nightmodeSidemenuIcon" : "normalSidemenuIcon";
        }

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ? "nightmodeHeaderClass" : "normalHeaderClass";
        };
    }
])

.controller("profileCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps) {
        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ? "nightmodeBackground" : "normalBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };
    }
])

.controller("editProfileCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps) {
        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ? "nightmodeBackground" : "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };
    }
])

.controller("signupCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps) {}
])

.controller("loginCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps) {}
])

.controller("articleCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps) {
        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ? "nightmodeBackground" : "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ? "nightmodeHeaderClass" : "normalHeaderClass";
        };
    }
])

.controller("savedArticlesCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps) {
        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ? "nightmodeBackground" : "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ? "nightmodeHeaderClass" : "normalHeaderClass";
        };
    }
])

.controller("statisticsCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps) {
        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ? "nightmodeBackground" : "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ? "nightmodeHeaderClass" : "normalHeaderClass";
        };
    }
]);