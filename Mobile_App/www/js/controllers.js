angular
    .module("app.controllers", ["ngCordova", "ngStorage"])

.controller("newsFeedCtrl", [
    "$scope",
    "$rootScope",
    "$http",
    "$stateParams",
    "sharedProps",
    "$ionicPopup",
    "$ionicActionSheet",
    "$timeout",
    "$localStorage",
    "$sessionStorage", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function(
        $scope,
        $rootScope,
        $http,
        $stateParams,
        sharedProps,
        $ionicPopup,
        $ionicActionSheet,
        $timeout,
        $localStorage,
        $sessionStorage
    ) {
        var savedArticlesId = [];
        $scope.sources = {
            total: 2
        };

        $http.get("./test_data/articles/templateArticle.js").then(function(res) {
            $scope.articles = res.data;
        });

        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
        });

        $scope.showReportOptions = function() {
            var promptAlert = $ionicPopup.show({
                title: "Report",
                templateUrl: "templates/reportTemplate.html",
                buttons: [{
                        text: "Cancel",
                        type: "button-light",
                        onTap: function(e) {
                            //e.preventDefault();
                        }
                    },
                    {
                        text: "Confirm",
                        type: "button-positive",
                        onTap: function(e) {}
                    }
                ]
            });
        };

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ?
                "nightmodeBackground" :
                "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ?
                "nightmodeHeaderClass" :
                "normalHeaderClass";
        };

        $scope.saveArticle = function(id) {
            if (_.contains(savedArticlesId, id)) {
                savedArticlesId = unsaveArticle(id);
                showRemovedToast();
                return;
            }
            savedArticlesId.push(id);
            showSavedToast();
        };

        function unsaveArticle(id) {
            return savedArticlesId.filter(e => e !== id);
        }

        function showSavedToast() {
            var hideSheet = $ionicActionSheet.show({
                titleText: "Article saved"
            });
            $timeout(function() {
                hideSheet();
            }, 500);
        }

        function showRemovedToast() {
            var hideSheet = $ionicActionSheet.show({
                titleText: "Article unsaved"
            });
            $timeout(function() {
                hideSheet();
            }, 500);
        }
    }
])

.controller("settingsCtrl", [
    "$scope",
    "$stateParams",
    "$ionicPopup",
    "$rootScope",
    "sharedProps",
    "$interval",
    "$timeout", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function(
        $scope,
        $stateParams,
        $ionicPopup,
        $rootScope,
        sharedProps,
        $interval,
        $timeout
    ) {
        $scope.data = {
            cachenewsEnabled: sharedProps.getData("cachenewsEnabled") == undefined ?
                false : sharedProps.getData("cachenewsEnabled").value,
            fontsize: sharedProps.getData("fontsize") == undefined ?
                16 : sharedProps.getData("fontsize").value,
            markupEnabled: sharedProps.getData("markupEnabled") == undefined ?
                false : sharedProps.getData("markupEnabled").value,
            hideEnabled: sharedProps.getData("hideEnabled") == undefined ?
                false : sharedProps.getData("hideEnabled").valu,
            tolerance: sharedProps.getData("tolerance") == undefined ?
                50 : sharedProps.getData("tolerance").value
        };

        $scope.$on("$ionicView.beforeLeave", function() {
            console.log("trying to leave....");
            sharedProps.addData("cachenewsEnabled", $scope.data.cachenewsEnabled);
            sharedProps.addData("fontsize", $scope.data.fontsize);
            sharedProps.addData("markupEnabled", $scope.data.markupEnabled);
            sharedProps.addData("hideEnabled", $scope.data.hideEnabled);
            sharedProps.addData("tolerance", $scope.data.tolerance);
        });

        $scope.setNightmode = function() {
            $rootScope.$broadcast("nightmodeChange", $scope.data.isNightmode);
            sharedProps.addData("isNightmode", $scope.data.isNightmode);
        };

        $scope.getBackgroundClass = function() {
            return $scope.data.isNightmode ?
                "nightmodeBackgroundMain" :
                "normalBackgroundMain";
        };

        $scope.getFontClass = function() {
            return $scope.data.isNightmode ?
                "nightmodeFontColor" :
                "normalBlackLetters";
        };

        $scope.$watch("data.fontsize", function() {
            console.log($scope.data.fontsize);
            switch ($scope.data.fontsize) {
                case 14:
                    $scope.textsize = 120;
                case 16:
                    $scope.textsize = 140;
                case 18:
                    $scope.textsize = 150;
                case 20:
                    $scope.textsize = 160;
                case 22:
                    $scope.textsize = 180;
                case 24:
                    $scope.textsize = 200;
            }
        });
    }
])

.controller("addSourcesCtrl", [
    "$scope",
    "$http",
    "$stateParams",
    "sharedProps",
    "$ionicLoading",
    "$ionicActionSheet",
    "$timeout", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function(
        $scope,
        $http,
        $stateParams,
        sharedProps,
        $ionicLoading,
        $ionicActionSheet,
        $timeout
    ) {
        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
        });

        $scope.sources = {
            total: 0,
            sites: []
        };

        $http.get("./test_data/sources.js").then(function(res) {
            $scope.sources.sites = res.data;
            $scope.sources.total = $scope.sources.sites.length;
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ?
                "nightmodeBackground" :
                "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.selectSource = function(sourceTitle) {
            showSuccessToast(sourceTitle);
        };

        $scope.deselectSource = function(sourceTitle) {};

        function showSuccessToast(sourceTitle) {
            // $ionicLoading.show({ template: 'Item Added!', noBackdrop: true, duration: 2000 });
            var hideSheet = $ionicActionSheet.show({
                titleText: sourceTitle + " selected"
            });
            $timeout(function() {
                hideSheet();
            }, 500);
        }

        function showFailureToast(sourceTitle) {
            var hideSheet = $ionicActionSheet.show({
                titleText: "Failed to select " + sourceTitle
            });
            $timeout(function() {
                hideSheet();
            }, 500);
        }
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
        $scope.currUser = $rootScope.globals.currentUser.username;

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
            return $scope.isNightmode ?
                "nightmodeSidemenuIcon" :
                "normalSidemenuIcon";
        };

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ?
                "nightmodeHeaderClass" :
                "normalHeaderClass";
        };
    }
])

.controller("profileCtrl", [
    "$scope",
    "$rootScope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams, sharedProps) {
        $scope.user = $rootScope.activeUser;
        if ($scope.user.sex == 0) {
            $scope.displaySex = "Female";
        } else if ($scope.user.sex == 1) {
            $scope.displaySex = "Male";
        } else {
            $scope.displaySex = "Other";
        }

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
    "$rootScope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams, sharedProps) {
        $scope.sexOptions = [
            { name: "Female", id: 0 },
            { name: "Male", id: 1 },
            { name: "Other", id: 2 }
        ];

        $scope.user = $rootScope.activeUser;
        $scope.selectedSex = $scope.user.sex;

        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ?
                "nightmodeBackground" :
                "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };
    }
])

.controller("signupCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps",
    "UserService",
    "$window",
    "$state", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps, UserService, $window, $state) {
        $window.localStorage.clear();
        $scope.user = {};
        $scope.sexOptions = [{ name: "Female", id: 0 }, { name: "Male", id: 1 }, { name: "Other", id: 2 }];
        $scope.user.sex = 0;

        $scope.register = function() {
            UserService.Create($scope.user).then(function(response) {
                if (response.success) {
                    console.log("signup successfull");
                    $state.go("login");
                } else {
                    console.log("signup unsuccessfull");
                }
                console.log($window.localStorage.users);
            });
        };
    }
])

.controller("loginCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps",
    "$location",
    "AuthenticationService",
    "$state",
    "$window", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function(
        $scope,
        $stateParams,
        sharedProps,
        $location,
        AuthenticationService,
        $state,
        $window
    ) {
        function createUserSettings() {
            sharedProps.addData("isNightmode", false);
            sharedProps.addData("cachenewsEnabled", false);
            sharedProps.addData("fontsize", 16);
            sharedProps.addData("markupEnabled", false);
            sharedProps.addData("hideEnabled", false);
            sharedProps.addData("tolerance", 50);
        }

        $scope.login = function() {
            AuthenticationService.Login(
                $scope.login.username,
                $scope.login.password,
                function(response) {
                    if (response.success) {
                        AuthenticationService.SetCredentials(
                            $scope.login.username,
                            $scope.login.password
                        );
                        createUserSettings();
                        $state.go("eyeReader.newsFeed");
                        console.log("login successfull");
                    } else {
                        console.log("failed to login");
                    }
                }
            );
        };
    }
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

        $scope.article = $stateParams.article;

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ?
                "nightmodeBackground" :
                "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ?
                "nightmodeHeaderClass" :
                "normalHeaderClass";
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
            return $scope.isNightmode ?
                "nightmodeBackground" :
                "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ?
                "nightmodeHeaderClass" :
                "normalHeaderClass";
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
            return $scope.isNightmode ?
                "nightmodeBackground" :
                "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ?
                "nightmodeHeaderClass" :
                "normalHeaderClass";
        };
    }
])

.controller("reportArticleCtrl", [
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
            return $scope.isNightmode ?
                "nightmodeBackground" :
                "lightmodeBackground";
        };
    }
]);