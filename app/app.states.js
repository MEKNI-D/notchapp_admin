altairApp
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider
                .when('/dashboard', '/')
                .otherwise('/');

            $stateProvider
            // -- ERROR PAGES --
                .state("error", {
                    url: "/error",
                    templateUrl: 'app/views/error.html'
                })
                .state("error.404", {
                    url: "/404",
                    templateUrl: 'app/components/pages/error_404View.html'
                })
                .state("error.500", {
                    url: "/500",
                    templateUrl: 'app/components/pages/error_500View.html'
                })
            // -- LOGIN PAGE --
                .state("login", {
                    url: "/login",
                    templateUrl: 'app/components/notchapp/users/loginView.html',
                    controller: 'authCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_iCheck',
                                'app/components/notchapp/users/loginController.js'
                            ]);
                        }]
                    }
                })
                .state("register", {
                    url: "/register",
                    templateUrl: 'app/components/notchapp/users/registerView.html',
                    controller: 'authCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_iCheck',
                                'app/components/notchapp/users/loginController.js'
                            ]);
                        }]
                    }
                })
            // -- RESTRICTED --
                .state("restricted", {
                    abstract: true,
                    url: "",
                    views: {
                        'main_header': {
                            templateUrl: 'app/shared/header/headerView.html',
                            controller: 'main_headerCtrl',
                            controllerAs: 'vm'
                        },
                        'main_sidebar': {
                            templateUrl: 'app/shared/main_sidebar/main_sidebarView.html',
                            controller: 'main_sidebarCtrl'
                        },
                        '': {
                            templateUrl: 'app/views/restricted.html'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_selectizeJS',
                                'lazy_switchery',
                                'lazy_prismJS',
                                'lazy_autosize',
                                'lazy_iCheck',
                                'lazy_style_switcher'
                            ],{ serie: true });
                        }]
                    }
                })
            // -- DASHBOARD --
                .state("restricted.dashboard", {
                    url: "/",
                    templateUrl: 'app/components/dashboard/dashboardView.html',
                    controller: 'dashboardCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                // ocLazyLoad config (app/app.js)
                                'lazy_countUp',
                                'lazy_charts_peity',
                                'lazy_charts_easypiechart',
                                'lazy_charts_metricsgraphics',
                                'lazy_charts_chartist',
                                'lazy_weathericons',
                                'lazy_google_maps',
                                'lazy_clndr',
                                'app/components/dashboard/dashboardController.js'
                            ], {serie: true} );
                        }],
                        sale_chart_data: function($http){
                            return $http({method: 'GET', url: 'data/mg_dashboard_chart.min.json'})
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        user_data: function($http){
                            return $http({ method: 'GET', url: 'data/user_data.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Dashboard'
                    }

                })
                .state("restricted.agencies", {
                    url: "/agencies",
                    templateUrl: 'app/components/notchapp/agencies/agenciesView.html',
                    controller: 'chartsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_charts_chartist',
                                'lazy_charts_metricsgraphics',
                                'lazy_charts_c3',
                                'app/components/plugins/chartsController.js'
                            ], {serie: true});
                        }],
                        mg_chart_linked_1: function($http){
                            return $http({ method: 'GET', url: 'data/mg_brief-1.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        mg_chart_linked_2: function($http){
                            return $http({ method: 'GET', url: 'data/mg_brief-2.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        mg_confidence_band: function($http){
                            return $http({ method: 'GET', url: 'data/mg_confidence_band.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        mg_currency: function($http){
                            return $http({ method: 'GET', url: 'data/mg_some_currency.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Agences'
                    }
                })

            // -- KENDO UI --
                .state("restricted.kendoui", {
                    url: "/kendoui",
                    template: '<div ui-view autoscroll="false"/>',
                    abstract: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('lazy_KendoUI');
                        }]
                    }
                })
                .state("restricted.kendoui.autocomplete", {
                    url: "/autocomplete",
                    templateUrl: 'app/components/kendoUI/autocompleteView.html',
                    controller: 'autocompleteCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/kendoUI/autocompleteController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Autocomplete (kendoUI)'
                    }
                })
                .state("restricted.kendoui.calendar", {
                    url: "/calendar",
                    templateUrl: 'app/components/kendoUI/calendarView.html',
                    controller: 'calendarCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/kendoUI/calendarController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Calendar (kendoUI)'
                    }
                })
                .state("restricted.kendoui.colorpicker", {
                    url: "/colorPicker",
                    templateUrl: 'app/components/kendoUI/colorPickerView.html',
                    data: {
                        pageTitle: 'ColorPicker (kendoUI)'
                    }
                })
                .state("restricted.kendoui.combobox", {
                    url: "/combobox",
                    templateUrl: 'app/components/kendoUI/comboboxView.html',
                    controller: 'comboboxCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/kendoUI/comboboxController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Combobox (kendoUI)'
                    }
                })
                .state("restricted.kendoui.datepicker", {
                    url: "/datepicker",
                    templateUrl: 'app/components/kendoUI/datepickerView.html',
                    controller: 'datepickerCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/kendoUI/datepickerController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Datepicker (kendoUI)'
                    }
                })
                .state("restricted.kendoui.datetimepicker", {
                    url: "/datetimepicker",
                    templateUrl: 'app/components/kendoUI/datetimepickerView.html',
                    controller: 'datetimepickerCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/kendoUI/datetimepickerController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Datetimepicker (kendoUI)'
                    }
                })
                .state("restricted.kendoui.dropdown_list", {
                    url: "/dropdown_list",
                    templateUrl: 'app/components/kendoUI/dropdown_listView.html',
                    controller: 'dropdownListCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/kendoUI/dropdown_listController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Dropdown List (kendoUI)'
                    }
                })
                .state("restricted.kendoui.masked_input", {
                    url: "/masked_input",
                    templateUrl: 'app/components/kendoUI/masked_inputView.html',
                    controller: 'maskedInputCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/kendoUI/masked_inputController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Masked Input (kendoUI)'
                    }
                })
                .state("restricted.kendoui.menu", {
                    url: "/menu",
                    templateUrl: 'app/components/kendoUI/menuView.html',
                    controller: 'menuCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/kendoUI/menuController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Menu (kendoUI)'
                    }
                })
                .state("restricted.kendoui.multiselect", {
                    url: "/multiselect",
                    templateUrl: 'app/components/kendoUI/multiselectView.html',
                    controller: 'multiselectCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/kendoUI/multiselectController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Multiselect (kendoUI)'
                    }
                })
                .state("restricted.kendoui.numeric_textbox", {
                    url: "/numeric_textbox",
                    templateUrl: 'app/components/kendoUI/numeric_textboxView.html',
                    controller: 'numericTextboxCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/kendoUI/numeric_textboxController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Numeric textbox (kendoUI)'
                    }
                })
                .state("restricted.kendoui.panelbar", {
                    url: "/panelbar",
                    templateUrl: 'app/components/kendoUI/panelbarView.html',
                    data: {
                        pageTitle: 'PanelBar (kendoUI)'
                    }
                })
                .state("restricted.kendoui.timepicker", {
                    url: "/timepicker",
                    templateUrl: 'app/components/kendoUI/timepickerView.html',
                    data: {
                        pageTitle: 'Timepicker (kendoUI)'
                    }
                })
                .state("restricted.kendoui.toolbar", {
                    url: "/toolbar",
                    templateUrl: 'app/components/kendoUI/toolbarView.html',
                    controller: 'toolbarCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/kendoUI/toolbarController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Toolbar (kendoUI)'
                    }
                })
                .state("restricted.kendoui.window", {
                    url: "/window",
                    templateUrl: 'app/components/kendoUI/windowView.html',
                    controller: 'windowCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/kendoUI/windowController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Window (kendoUI)'
                    }
                })

                // -- Ratings--
                .state("restricted.ratings", {
                    url: "/ratings",
                    template: '<div ui-view autoscroll="false"/>',
                    abstract: true
                })
                .state("restricted.ratings.general", {
                    url: "/general",
                    templateUrl: 'app/components/notchapp/ratingsView.html',
                    data: {
                        pageTitle: 'Ratings'
                    }
                })
                .state("restricted.ratings.statistics", {
                    url: "/statistics",
                    templateUrl: 'app/components/notchapp/ratingStatisticsView.html',
                    controller: 'chartsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_charts_chartist',
                                'lazy_charts_metricsgraphics',
                                'lazy_charts_c3',
                                'app/components/plugins/chartsController.js'
                            ], {serie: true});
                        }],
                        mg_chart_linked_1: function($http){
                            return $http({ method: 'GET', url: 'data/mg_brief-1.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        mg_chart_linked_2: function($http){
                            return $http({ method: 'GET', url: 'data/mg_brief-2.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        mg_confidence_band: function($http){
                            return $http({ method: 'GET', url: 'data/mg_confidence_band.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        mg_currency: function($http){
                            return $http({ method: 'GET', url: 'data/mg_some_currency.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Statistics'
                    }
                })
            // -- COMPONENTS --
                .state("restricted.components", {
                    url: "/components",
                    template: '<div ui-view autoscroll="false"/>',
                    abstract: true
                })
                .state("restricted.components.accordion", {
                    url: "/accordion",
                    templateUrl: 'app/components/components/accordionView.html',
                    data: {
                        pageTitle: 'Accordion (components)'
                    }
                })
                .state("restricted.components.buttons", {
                    url: "/buttons",
                    templateUrl: 'app/components/components/buttonsView.html',
                    data: {
                        pageTitle: 'Buttons (components)'
                    }
                })
                .state("restricted.components.buttons_fab", {
                    url: "/buttons_fab",
                    templateUrl: 'app/components/components/fabView.html',
                    data: {
                        pageTitle: 'Buttons FAB (components)'
                    }
                })
                .state("restricted.components.cards", {
                    url: "/cards",
                    templateUrl: 'app/components/components/cardsView.html',
                    controller: 'cardsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/components/cardsController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Cards (components)'
                    }
                })
                .state("restricted.components.colors", {
                    url: "/colors",
                    templateUrl: 'app/components/components/colorsView.html',
                    data: {
                        pageTitle: 'Colors (components)'
                    }
                })
                .state("restricted.components.common", {
                    url: "/common",
                    templateUrl: 'app/components/components/commonView.html',
                    data: {
                        pageTitle: 'Common (components)'
                    }
                })
                .state("restricted.components.dropdowns", {
                    url: "/dropdowns",
                    templateUrl: 'app/components/components/dropdownsView.html',
                    data: {
                        pageTitle: 'Dropdowns (components)'
                    }
                })
                .state("restricted.components.dynamic_grid", {
                    url: "/dynamic_grid",
                    templateUrl: 'app/components/components/dynamic_gridView.html',
                    data: {
                        pageTitle: 'Dynamic Grid (components)'
                    }
                })
                .state("restricted.components.grid", {
                    url: "/grid",
                    templateUrl: 'app/components/components/gridView.html',
                    data: {
                        pageTitle: 'Grid (components)'
                    }
                })
                .state("restricted.components.icons", {
                    url: "/icons",
                    templateUrl: 'app/components/components/iconsView.html',
                    data: {
                        pageTitle: 'Icons (components)'
                    }
                })
                .state("restricted.components.lists", {
                    url: "/lists",
                    templateUrl: 'app/components/components/listsView.html',
                    data: {
                        pageTitle: 'Lists (components)'
                    }
                })
                .state("restricted.components.modal", {
                    url: "/modal",
                    templateUrl: 'app/components/components/modalView.html',
                    data: {
                        pageTitle: 'Modals/Lightboxes (components)'
                    }
                })
                .state("restricted.components.nestable", {
                    url: "/nestable",
                    templateUrl: 'app/components/components/nestableView.html',
                    controller: 'nestableCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/components/nestableController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Nestable (components)'
                    }
                })
                .state("restricted.components.notifications", {
                    url: "/notifications",
                    templateUrl: 'app/components/components/notificationsView.html',
                    controller: 'notificationsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/components/notificationsController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Notifications (components)'
                    }
                })
                .state("restricted.components.panels", {
                    url: "/panels",
                    templateUrl: 'app/components/components/panelsView.html',
                    data: {
                        pageTitle: 'Panels (components)'
                    }
                })
                .state("restricted.components.preloaders", {
                    url: "/preloaders",
                    templateUrl: 'app/components/components/preloadersView.html',
                    controller: 'preloadersCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/components/preloadersController.js');
                        }]
                    },
                    data: {
                        pageTitle: 'Preloaders (components)'
                    }
                })
                .state("restricted.components.sortable", {
                    url: "/sortable",
                    templateUrl: 'app/components/components/sortableView.html',
                    controller: 'sortableCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_dragula',
                                'app/components/components/sortableController.js'
                            ], {serie:true} );
                        }]
                    },
                    data: {
                        pageTitle: 'Sortable (components)'
                    }
                })
                .state("restricted.components.tables_examples", {
                    url: "/tables_examples",
                    templateUrl: 'app/components/components/tables_examplesView.html',
                    data: {
                        pageTitle: 'Tables Examples (components)'
                    }
                })
                .state("restricted.components.tables", {
                    url: "/tables",
                    templateUrl: 'app/components/components/tablesView.html',
                    data: {
                        pageTitle: 'Tables (components)'
                    }
                })
                .state("restricted.components.tabs", {
                    url: "/tabs",
                    templateUrl: 'app/components/components/tabsView.html',
                    data: {
                        pageTitle: 'Tabs (components)'
                    }
                })
                .state("restricted.components.tooltips", {
                    url: "/tooltips",
                    templateUrl: 'app/components/components/tooltipsView.html',
                    data: {
                        pageTitle: 'Tooltips (components)'
                    }
                })
                .state("restricted.components.typography", {
                    url: "/typography",
                    templateUrl: 'app/components/components/typographyView.html',
                    data: {
                        pageTitle: 'Typography (components)'
                    }
                })
            // -- E-COMMERCE --
                .state("restricted.ecommerce", {
                    url: "/ecommerce",
                    template: '<div ui-view autoscroll="false"/>',
                    abstract: true
                })
                .state("restricted.ecommerce.product_details", {
                    url: "/product_details",
                    templateUrl: 'app/components/ecommerce/product_detailsView.html',
                    controller: 'productCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/ecommerce/productController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Product Details'
                    }
                })
                .state("restricted.ecommerce.product_edit", {
                    url: "/product_edit",
                    templateUrl: 'app/components/ecommerce/product_editView.html',
                    controller: 'productCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/ecommerce/productController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Product Edit'
                    }
                })
                .state("restricted.ecommerce.products_list", {
                    url: "/products_list",
                    templateUrl: 'app/components/ecommerce/products_listView.html',
                    controller: 'products_listCtrl',
                    resolve: {
                        products_data: function($http){
                            return $http({method: 'GET', url: 'data/ecommerce_products.json'})
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_pagination',
                                'app/components/ecommerce/products_listController.js'
                            ], { serie: true } );
                        }]
                    },
                    data: {
                        pageTitle: 'Products List'
                    }
                })
                .state("restricted.ecommerce.products_grid", {
                    url: "/products_grid",
                    templateUrl: 'app/components/ecommerce/products_gridView.html',
                    controller: 'products_gridCtrl',
                    resolve: {
                        products_data: function($http){
                            return $http({method: 'GET', url: 'data/ecommerce_products.json'})
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/ecommerce/products_gridController.js'
                            ], { serie: true } );
                        }]
                    },
                    data: {
                        pageTitle: 'Products Grid'
                    }
                })
            // -- PLUG
                // --
                .state("restricted.plugins", {
                    url: "/plugins",
                    template: '<div ui-view autoscroll="false"/>',
                    abstract: true
                })
                .state("restricted.plugins.calendar", {
                    url: "/calendar",
                    templateUrl: 'app/components/plugins/calendarView.html',
                    controller: 'calendarCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_fullcalendar',
                                'app/components/plugins/calendarController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Calendar'
                    }
                })
                .state("restricted.plugins.code_editor", {
                    url: "/code_editor",
                    templateUrl: 'app/components/plugins/code_editorView.html',
                    controller: 'code_editorCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_codemirror',
                                'app/components/plugins/code_editorController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Code Editor'
                    }
                })
                .state("restricted.plugins.charts", {
                    url: "/charts",
                    templateUrl: 'app/components/plugins/chartsView.html',
                    controller: 'chartsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_charts_chartist',
                                'lazy_charts_metricsgraphics',
                                'lazy_charts_c3',
                                'app/components/plugins/chartsController.js'
                            ], {serie: true});
                        }],
                        mg_chart_linked_1: function($http){
                            return $http({ method: 'GET', url: 'data/mg_brief-1.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        mg_chart_linked_2: function($http){
                            return $http({ method: 'GET', url: 'data/mg_brief-2.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        mg_confidence_band: function($http){
                            return $http({ method: 'GET', url: 'data/mg_confidence_band.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        mg_currency: function($http){
                            return $http({ method: 'GET', url: 'data/mg_some_currency.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Charts'
                    }
                })
                .state("restricted.plugins.datatables", {
                    url: "/datatables",
                    templateUrl: 'app/components/plugins/datatablesView.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'bower_components/angular-resource/angular-resource.min.js',
                                'lazy_datatables',
                                'app/components/plugins/datatablesController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Datatables'
                    }
                })
                .state("restricted.plugins.diff_view", {
                    url: "/diff_view",
                    templateUrl: 'app/components/plugins/diff_viewView.html',
                    controller: 'diff_viewCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_diff',
                                'app/components/plugins/diff_viewController.js'
                            ],{serie:true});
                        }]
                    },
                    data: {
                        pageTitle: 'Diff View'
                    }
                })
                .state("restricted.plugins.gantt_chart", {
                    url: "/gantt_chart",
                    controller: 'gantt_chartCtrl',
                    templateUrl: 'app/components/plugins/gantt_chartView.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_gantt_chart',
                                'app/components/plugins/gantt_chartController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Gantt Chart'
                    }
                })
                .state("restricted.plugins.google_maps", {
                    url: "/google_maps",
                    templateUrl: 'app/components/plugins/google_mapsView.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_google_maps',
                                'app/components/plugins/google_mapsController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Google Maps'
                    }
                })
                .state("restricted.plugins.tablesorter", {
                    url: "/tablesorter",
                    templateUrl: 'app/components/plugins/tablesorterView.html',
                    controller: 'tablesorterCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_tablesorter',
                                'app/components/plugins/tablesorterController.js'
                            ],{serie:true});
                        }],
                        ts_data: function($http){
                            return $http({ method: 'GET', url: 'data/tablesorter.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Tablesorter'
                    }
                })
                .state("restricted.plugins.vector_maps", {
                    url: "/vector_maps",
                    templateUrl: 'app/components/plugins/vector_mapsView.html',
                    controller: 'vector_mapsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_vector_maps',
                                'app/components/plugins/vector_mapsController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Vector Maps'
                    }
                })

            // -- PAGES --
                .state("restricted.pages", {
                    url: "/pages",
                    template: '<div ui-view autoscroll="false" ng-class="{ \'uk-height-1-1\': page_full_height }" />',
                    abstract: true
                })
                .state("restricted.pages.blank", {
                    url: "/blank",
                    templateUrl: 'app/components/pages/blankView.html',
                    data: {
                        pageTitle: 'Blank Page'
                    }
                })
                .state("restricted.users.contact_list", {
                    url: "/contact_list",
                    templateUrl: 'app/components/notchapp/users/contact_listView.html',
                    controller: 'clients_Ctrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/notchapp/users/contact_listController.js'
                            ],{serie: true});
                        }],
                        contact_list: function($http){
                            return $http({ method: 'GET', url: 'data/contact_list.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Contact List'
                    }
                })
                .state("restricted.users.contact_details", {
                    url: "/contact_details/{id}",
                    templateUrl: 'app/components/notchapp/users/contact_detailsView.html',
                    controller: 'client_detailsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/notchapp/users/contact_detailsController.js'
                            ],{serie: true});
                        }],
                        contact_list: function($http){
                            return $http({ method: 'GET', url: 'data/contact_list.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Informations Client'
                    }
                })
                .state("restricted.users.contact_edit", {
                    url: "/client_edit/{id}",
                    templateUrl: 'app/components/notchapp/users/client_editView.html',
                    controller: 'client_detailsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/notchapp/users/contact_detailsController.js'
                            ],{serie: true});
                        }]
                    },
                    data: {
                        pageTitle: 'Informations Client'
                    }
                })
                .state("restricted.pages.gallery", {
                    url: "/gallery",
                    templateUrl: 'app/components/pages/galleryView.html',
                    controller: 'galleryCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/pages/galleryController.js'
                            ],{serie: true});
                        }]
                    },
                    data: {
                        pageTitle: 'Gallery'
                    }
                })
                .state("restricted.pages.help", {
                    url: "/help",
                    templateUrl: 'app/components/pages/helpView.html',
                    controller: 'helpCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/pages/helpController.js'
                            ],{serie: true});
                        }],
                        help_data: function($http){
                            return $http({ method: 'GET', url: 'data/help_faq.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Help Center'
                    }
                })

                .state("restricted.pages.mailbox", {
                    url: "/mailbox",
                    templateUrl: 'app/components/pages/mailboxView.html',
                    controller: 'mailboxCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/pages/mailboxController.js');
                        }],
                        messages: function($http){
                            return $http({ method: 'GET', url: 'data/mailbox_data.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Mailbox'
                    }
                })
                .state("restricted.pages.notes", {
                    url: "/notes",
                    templateUrl: 'app/components/pages/notesView.html',
                    controller: 'notesCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/pages/notesController.js'
                            ]);
                        }],
                        notes_data: function($http){
                            return $http({ method: 'GET', url: 'data/notes_data.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Notes'
                    }
                })
                .state("restricted.pages.pricing_tables", {
                    url: "/pricing_tables",
                    templateUrl: 'app/components/pages/pricing_tablesView.html',
                    data: {
                        pageTitle: 'Pricing Tables'
                    }
                })
                .state("restricted.pages.settings", {
                    url: "/settings",
                    templateUrl: 'app/components/pages/settingsView.html',
                    controller: 'settingsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('app/components/pages/settingsController.js')
                        }]
                    },
                    data: {
                        pageTitle: 'Settings'
                    }
                })
                .state("restricted.pages.todo", {
                    url: "/todo",
                    templateUrl: 'app/components/pages/todoView.html',
                    controller: 'todoCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/pages/todoController.js'
                            ]);
                        }],
                        todo_data: function($http){
                            return $http({ method: 'GET', url: 'data/todo_data.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'users profile'
                    }
                })
                .state("restricted.users", {
                    url: "/users",
                    template: '<div ui-view autoscroll="false" ng-class="{ \'uk-height-1-1\': page_full_height }" />',
                    abstract: true
                })
                .state("restricted.users.user_profile", {
                    url: "/user_profile",
                    templateUrl: 'app/components/notchapp/users/user_profileView.html',
                    controller: 'profileCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/notchapp/users/user_profileController.js'
                            ]);
                        }],
                        user_data: function($http){
                            return $http({ method: 'GET', url: 'data/user_data.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'users profile'
                    }
                })
                .state("restricted.pages.user_edit", {
                    url: "/user_edit",
                    templateUrl: 'app/components/sherrington/users/user_editView.html',
                    controller: 'user_editCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/sherrington/users/user_editController.js'
                            ]);
                        }],
                        user_data: function($http){
                            return $http({ method: 'GET', url: 'data/user_data.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        groups_data: function($http){
                            return $http({ method: 'GET', url: 'data/groups_data.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'users edit'
                    }
                })
                .state("restricted.pages.issues", {
                    url: "/issues",
                    abstract: true,
                    template: '<div ui-view autoscroll="false" ng-class="{ \'uk-height-1-1\': page_full_height }" />',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_tablesorter',
                                'app/components/pages/issuesController.js'
                            ]);
                        }],
                        issues_data: function($http){
                            return $http({ method: 'GET', url: 'data/issues.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    }
                })
                .state("restricted.pages.issues.list", {
                    url: "/list",
                    templateUrl: 'app/components/pages/issues_listView.html',
                    controller: 'issuesCtrl',
                    data: {
                        pageTitle: 'Issues List'
                    }
                })
                .state("restricted.pages.issues.details", {
                    url: "/details/{issueId:[0-9]{1,4}}",
                    controller: 'issuesCtrl',
                    templateUrl: 'app/components/pages/issue_detailsView.html',
                    data: {
                        pageTitle: 'Issue Details'
                    }
                })
                .state("restricted.pages.blog", {
                    url: "/blog",
                    template: '<div ui-view autoscroll="false" ng-class="{ \'uk-height-1-1\': page_full_height }" />',
                    controller: 'blogCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/pages/blogController.js'
                            ]);
                        }],
                        blog_articles: function($http){
                            return $http({ method: 'GET', url: 'data/blog_articles.json' })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    abstract: true
                })
                .state("restricted.pages.blog.list", {
                    url: "/list",
                    controller: 'blogCtrl',
                    templateUrl: 'app/components/pages/blog_listView.html',
                    data: {
                        pageTitle: 'Blog List'
                    }
                })
                .state("restricted.pages.blog.article", {
                    url: "/article/{articleId:[0-9]{1,4}}",
                    controller: 'blogCtrl',
                    templateUrl: 'app/components/pages/blog_articleView.html',
                    data: {
                        pageTitle: 'Blog Article'
                    }
                })
        
             .state("restricted.produits", {
                    url: "/produits",
                    //controller: 'blogCtrl',
                    templateUrl: 'app/components/sherrington/products.html',
                
               controller: 'prodCtrl',
            
                    resolve: {
                        products_data: function($http){
                            return $http({method: 'GET', url: 'data/ecommerce_products.json'})
                                .then(function (data) {
                                    return data.data;
                                });
                        },
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_pagination',
                                'app/components/sherrington/productsCtrl.js'
                            ], { serie: true } );
                        }]
                    },
                    data: {
                        pageTitle: 'Products List'
                    }
 
                   
                })
    
        }
    ]);
