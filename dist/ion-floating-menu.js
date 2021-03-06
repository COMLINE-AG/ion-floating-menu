/*!
 * Copyright 2016 PREGIOTEK
 * http://pregiotek.com/
 *
 * ion-floating-menu
 * Material UI-like Floating Action Button and Menu for Ionic applications.
 *
 * By @ennedigi
 * 
 * Licensed under the MIT license. Please see LICENSE for more information.
 *
 */


angular.module('ion-floating-menu', [])

    .directive('ionFloatingButton', function () {

        return {
            restrict: 'E',
            scope: {
                click: '&?',
                buttonColor: '@?',
                buttonClass: '@?',
                icon: '@?',
                iconColor: '@?',
                hasFooter: '=?'},
            template: '<ul id="floating-button" ng-style="{\'bottom\' : \'{{bottomValue}}\' }">' +
            '<li ng-class="buttonClass" ng-style="{\'background-color\': buttonColor }">' +
            '<a ng-click="click()"><i class="icon menu-icon" ng-class="{ \'{{icon}}\' : true}" ng-style="{\'color\': iconColor }"></i></a>' +
            '</li>' +
            '</ul>',
            replace: true,
            transclude: true,
            controller: function ($scope) {
                $scope.buttonColor = $scope.buttonColor || '#2AC9AA';
                $scope.icon = $scope.icon || 'ion-plus';
                $scope.iconColor = $scope.iconColor || '#fff';
                $scope.hasFooter = $scope.hasFooter || false;
                if ($scope.hasFooter) {
                    $scope.bottomValue = '60px';
                } else {
                    $scope.bottomValue = '20px';
                }
            }
        };
    })
    .directive('ionFloatingMenu', function () {
        
        return {
            restrict: 'E',
            scope: {
                placement: '@?',
                menuOpenColor: '@?',
                menuOpenIcon: '@?',
                menuOpenIconColor: '@?',
                menuDeactivatedColor: '@?',
                menuIcon: '@?',
                menuIconColor: '@?',
                hasFooter: '=?'
            },
            template: '<ul id="floating-menu"  \n\
                            ng-style="{\'bottom\' : \'{{bottomValue}}\'}" \n\
                            ng-class="{\'active\' : isOpen, \'br\' : bottomRight, \'bl\' : bottomLeft}" \n\
                            ng-click="open()">' +
            '<div ng-transclude></div>' +
            '<span><li class="menu-button icon menu-icon" ng-class="icon" ng-style="{\'background-color\' : buttonColor, \'color\': iconColor}"></li></span>' +
            '</ul>',
            replace: true,
            transclude: true,
            link: function (scope, element, attrs, ctrl, transclude)
            {
                element.find('div').replaceWith(transclude());
            },
            controller: function ($scope) {
                $scope.isOpen = false;
                $scope.isDeactivated = false;
                // by default, the button-menu is placed in the bottom right corner
                $scope.bottomRight = true;
                $scope.bottomLeft = false;

                $scope.open = function () {
                    if ($scope.isDeactivated) {
                        $scope.isOpen = false;
                        $scope.setClose();
                        return;
                    }
                    $scope.isOpen = !$scope.isOpen;

                    if ($scope.isOpen) {
                        $scope.setOpen();
                    } else {
                        $scope.setClose();
                    }
                };
                $scope.setOpen = function () {
                    $scope.buttonColor = menuOpenColor;
                    $scope.icon = menuOpenIcon;
                    $scope.iconColor = menuOpenIconColor;
                };
                $scope.setClose = function () {
                    if ($scope.isDeactivated)
                    {
                        $scope.buttonColor = menuDeactivatedColor;
                    }
                    else {
                        $scope.buttonColor = menuOpenColor;
                    }
                    $scope.icon = menuIcon;
                    $scope.iconColor = menuIconColor;
                };
                $scope.setDeactivated = function () {
                    $scope.isDeactivated = true;
                    $scope.isOpen = false;
                    $scope.buttonColor = menuDeactivatedColor;
                    $scope.icon = menuIcon;
                    $scope.iconColor = menuIconColor;
                };
                var menuDeactivatedColor = $scope.menuDeactivatedColor || '#b2b2b2';
                var menuIcon = $scope.menuIcon || 'ion-plus';
                var menuIconColor = $scope.menuIconColor || '#fff';
                var menuOpenColor = $scope.menuOpenColor || '#2AC9AA';
                var menuOpenIcon = $scope.menuOpenIcon || 'ion-minus';
                var menuOpenIconColor = $scope.menuOpenIconColor || '#fff';

                var placement = $scope.placement || 'right';
                if (placement === 'right'){
                    $scope.bottomRight = true;
                    $scope.bottomLeft = !$scope.bottomRight;
                }else{
                    $scope.bottomRight = false;
                    $scope.bottomLeft = !$scope.bottomRight;
                }

                $scope.setClose();
                //Has a footer
                $scope.hasFooter = $scope.hasFooter || false;
                if ($scope.hasFooter) {
                    $scope.bottomValue = '60px';
                } else {
                    $scope.bottomValue = '20px';
                }

                $scope.$on('app.offline', function (event, eventArgs) {
                    $scope.$apply(function () {
                        $scope.setDeactivated();
                    });
                });

                $scope.$on('app.online', function (event, eventArgs) {
                    $scope.$apply(function () {
                        $scope.isDeactivated = false;
                        $scope.buttonColor = menuOpenColor;
                    });
                });

                $scope.$on('floating-menu-collapse', function(event, eventArgs){
                    if ($scope.isOpen) {
                        $scope.isOpen = false;
                        $scope.setClose();
                    }
                });


            }
        };
    })
    .directive('ionFloatingItem', function () {

        return {
            restrict: 'E',
            require: ['^ionFloatingMenu'],
            scope: {
                click: '&?',
                icon: '@',
                buttonColor: '@?',
                buttonClass: '@?',
                iconColor: '@?',
                text: '@?',
                textClass: '@?'},
            template:
            '<li ng-click="click()" ng-class="buttonClass" ng-style="{\'background-color\': buttonColor }">' +
            '<span ng-if="text" class="label-container"><span class="label" ng-class="textClass" ng-bind="text"></span></span><i class="icon menu-icon" ng-class="{ \'{{icon}}\' : true}" ng-style="{\'color\': iconColor }"></i>' +
            '</li>',
            replace: true,
            controller: function ($scope) {
                $scope.buttonColor = $scope.buttonColor || '#2AC9AA';
                $scope.iconColor = $scope.iconColor || '#fff';
            }
        };
    });
