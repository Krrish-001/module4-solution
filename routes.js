(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        // Home state
        $stateProvider.state('home', {
            url: '/',
            template: '<h2>Welcome to our Restaurant</h2><a ui-sref="categories">See Menu Categories</a>'
        });

        // Categories state
        $stateProvider.state('categories', {
            url: '/categories',
            template: '<categories categories="categories"></categories>',
            controller: 'CategoriesController as categoriesCtrl',
            resolve: {
                categories: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        });

        // Items state
        $stateProvider.state('items', {
            url: '/items/{categoryShortName}',
            template: '<items items="items"></items>',
            controller: 'ItemsController as itemsCtrl',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
            }
        });
    }
})();
