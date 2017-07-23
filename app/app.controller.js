/*
 *  Altair Admin angularjs
 *  controller
 */
angular
    .module('altairApp')
    .controller('mainCtrl', [
        '$scope',
        '$rootScope',
        function ($scope,$rootScope) {}
    ])
    .controller('main_headerCtrl', [
        '$timeout',
        '$scope',
        '$state',
        '$window',
        'meanData',
        function ($timeout, $scope, $state, $window, meanData) {

            /* ***********************post authentication********************* */
            /* *****keeping current user information in the main_header********* */
            var vm = this;
            /* getting token from local storage if exists */
            var token = $window.localStorage['mean-token'];
            var payload;
            /*  if token exists */
            if(token){
                /* parsing token to get current user profile */
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                vm.isLoggedIn = payload.exp > Date.now() / 1000;
            } else {
                /* no token found in the browser's local storage */
                console.log('hi hi hi ih there is no user token');
            }
            /* if the token is valid yet */
            if(vm.isLoggedIn){
                var token = $window.localStorage['mean-token'];
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                //to remove just testing
                console.log(payload);
            }
            /* Load User */
            function loadUser(){
                meanData.getProfile()
                    .success(function(data) {
                        console.log('I have been called')
                        if(data){
                            console.log(data);
                            $scope.currentUser = data;
                        }
                    })
                    .error(function (e) {
                        console.log('user session ended, opening anonymous session');
                    });



            }
            loadUser();

            /************************************************************/
            /* ************************Logout************************** */
             vm.logout = function(){
                 console.log('hi local storage');
                 localStorage.removeItem('mean-token');
                $state.go('login');
            };

            /**********************************************************/
            $scope.user_data = {
                name: "Lue Feest",
                avatar: "assets/img/avatars/avatar_11_tn.png",
                alerts: [
                    {
                        "title": "Hic expedita eaque.",
                        "content": "Nemo nemo voluptatem officia voluptatum minus.",
                        "type": "warning"
                    },
                    {
                        "title": "Voluptatibus sed eveniet.",
                        "content": "Tempora magnam aut ea.",
                        "type": "success"
                    },
                    {
                        "title": "Perferendis voluptatem explicabo.",
                        "content": "Enim et voluptatem maiores ab fugiat commodi aut repellendus.",
                        "type": "danger"
                    },
                    {
                        "title": "Quod minima ipsa.",
                        "content": "Vel dignissimos neque enim ad praesentium optio.",
                        "type": "primary"
                    }
                ],
                messages: [
                    {
                        "title": "Reiciendis aut rerum.",
                        "content": "In adipisci amet nostrum natus recusandae animi fugit consequatur.",
                        "sender": "Korbin Doyle",
                        "color": "cyan"
                    },
                    {
                        "title": "Tenetur commodi animi.",
                        "content": "Voluptate aut quis rerum laborum expedita qui eaque doloremque a corporis.",
                        "sender": "Alia Walter",
                        "color": "indigo",
                        "avatar": "assets/img/avatars/avatar_07_tn.png"
                    },
                    {
                        "title": "At quia quis.",
                        "content": "Fugiat rerum aperiam et deleniti fugiat corporis incidunt aut enim et distinctio.",
                        "sender": "William Block",
                        "color": "light-green"
                    },
                    {
                        "title": "Incidunt sunt.",
                        "content": "Accusamus necessitatibus officia porro nisi consectetur dolorem.",
                        "sender": "Delilah Littel",
                        "color": "blue",
                        "avatar": "assets/img/avatars/avatar_02_tn.png"
                    },
                    {
                        "title": "Porro ut.",
                        "content": "Est vitae magni eum expedita odit quisquam natus vel maiores.",
                        "sender": "Amira Hagenes",
                        "color": "amber",
                        "avatar": "assets/img/avatars/avatar_09_tn.png"
                    }
                ]
            };

            $scope.alerts_length = $scope.user_data.alerts.length;
            $scope.messages_length = $scope.user_data.messages.length;


            $('#menu_top').children('[data-uk-dropdown]').on('show.uk.dropdown', function(){
                $timeout(function() {
                    $($window).resize();
                },280)
            });


        }
    ])

    .controller('main_sidebarCtrl', [
        '$timeout',
        '$scope',
        '$rootScope',
        function ($timeout,$scope,$rootScope) {

            $scope.$on('onLastRepeat', function (scope, element, attrs) {
                $timeout(function() {
                    if(!$rootScope.miniSidebarActive) {
                        // activate current section
                        $('#sidebar_main').find('.current_section > a').trigger('click');
                    } else {
                        // add tooltips to mini sidebar
                        var tooltip_elem = $('#sidebar_main').find('.menu_tooltip');
                        tooltip_elem.each(function() {
                            var $this = $(this);

                            $this.attr('title',$this.find('.menu_title').text());
                            UIkit.tooltip($this, {});
                        });
                    }
                })
            });

            // language switcher
            $scope.langSwitcherModel = 'gb';
            var langData = $scope.langSwitcherOptions = [
                {id: 1, title: 'English', value: 'gb'},
                {id: 2, title: 'French', value: 'fr'},
                {id: 3, title: 'Chinese', value: 'cn'},
                {id: 4, title: 'Dutch', value: 'nl'},
                {id: 5, title: 'Italian', value: 'it'},
                {id: 6, title: 'Spanish', value: 'es'},
                {id: 7, title: 'German', value: 'de'},
                {id: 8, title: 'Polish', value: 'pl'}
            ];
            $scope.langSwitcherConfig = {
                maxItems: 1,
                render: {
                    option: function(langData, escape) {
                        return  '<div class="option">' +
                            '<i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i>' +
                            '<span>' + escape(langData.title) + '</span>' +
                            '</div>';
                    },
                    item: function(langData, escape) {
                        return '<div class="item"><i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i></div>';
                    }
                },
                valueField: 'value',
                labelField: 'title',
                searchField: 'title',
                create: false,
                onInitialize: function(selectize) {
                    $('#lang_switcher').next().children('.selectize-input').find('input').attr('readonly',true);
                }
            };

            // menu entries
            $scope.sections = [
                {
                    id: 0,
                    title: 'Dashboard',
                    icon: '&#xE871;',
                    link: 'restricted.dashboard'
                },
                {
                    id: 6,
                    title: 'Utilisateurs',
                    icon: '&#xE87C;',
                    submenu: [
                        {
                            title: 'Liste des utilisateurs',
                            link: 'restricted.users.contact_list'
                        },
                        {
                            title: 'Mon Profil',
                            link: 'restricted.users.user_profile'
                        },
                    ]
                },
                {
                    id: 7,
                    title: 'Notes',
                    icon: 'star_rate',
                    submenu: [
                        {
                            title: 'Critères',
                            link: 'restricted.ratings.general'
                        },
                        {
                            title: 'Statistiques',
                            link: 'restricted.ratings.statistics'
                        },
                        /*{
                            title: 'Age / Genre',
                            link: 'restricted.ratings.statistics'
                        },*/
                        {
                            title: 'Agences',
                            icon: 'home',
                            link: 'restricted.agencies'
                        },
                    ]
                },
                {
                    id: 1,
                    title: 'Commentaires',
                    icon: 'comment',
                    link: 'restricted.pages.mailbox'
                },
                {
                    id: 15,
                    title: 'Actions',
                    icon: 'settings',
                    link: ''
                },

                //
                // {
                //     id: 9,
                //     title: 'Kendo UI Widgets',
                //     icon: '&#xE1BD;',
                //     submenu: [
                //         {
                //             title: 'Autocomplete',
                //             link: 'restricted.kendoui.autocomplete'
                //         },
                //         {
                //             title: 'Calendar',
                //             link: 'restricted.kendoui.calendar'
                //         },
                //         {
                //             title: 'ColorPicker',
                //             link: 'restricted.kendoui.colorpicker'
                //         },
                //         {
                //             title: 'ComboBox',
                //             link: 'restricted.kendoui.combobox'
                //         },
                //         {
                //             title: 'DatePicker',
                //             link: 'restricted.kendoui.datepicker'
                //         },
                //         {
                //             title: 'DateTimePicker',
                //             link: 'restricted.kendoui.datetimepicker'
                //         },
                //         {
                //             title: 'DropDownList',
                //             link: 'restricted.kendoui.dropdown_list'
                //         },
                //         {
                //             title: 'Masked Input',
                //             link: 'restricted.kendoui.masked_input'
                //         },
                //         {
                //             title: 'Menu',
                //             link: 'restricted.kendoui.menu'
                //         },
                //         {
                //             title: 'MultiSelect',
                //             link: 'restricted.kendoui.multiselect'
                //         },
                //         {
                //             title: 'Numeric TextBox',
                //             link: 'restricted.kendoui.numeric_textbox'
                //         },
                //         {
                //             title: 'PanelBar',
                //             link: 'restricted.kendoui.panelbar'
                //         },
                //         {
                //             title: 'TimePicker',
                //             link: 'restricted.kendoui.timepicker'
                //         },
                //         {
                //             title: 'Toolbar',
                //             link: 'restricted.kendoui.toolbar'
                //         },
                //         {
                //             title: 'Window',
                //             link: 'restricted.kendoui.window'
                //         }
                //     ]
                // },
                // {
                //     id: 10,
                //     title: 'Components',
                //     icon: '&#xE87B;',
                //     submenu: [
                //         {
                //             title: 'Accordions',
                //             link: 'restricted.components.accordion'
                //         },
                //         {
                //             title: 'Buttons',
                //             link: 'restricted.components.buttons'
                //         },
                //         {
                //             title: 'Buttons: FAB',
                //             link: 'restricted.components.buttons_fab'
                //         },
                //         {
                //             title: 'Cards',
                //             link: 'restricted.components.cards'
                //         },
                //         {
                //             title: 'Colors',
                //             link: 'restricted.components.colors'
                //         },
                //         {
                //             title: 'Common',
                //             link: 'restricted.components.common'
                //         },
                //         {
                //             title: 'Dropdowns',
                //             link: 'restricted.components.dropdowns'
                //         },
                //         {
                //             title: 'Dynamic Grid',
                //             link: 'restricted.components.dynamic_grid'
                //         },
                //         {
                //             title: 'Grid',
                //             link: 'restricted.components.grid'
                //         },
                //         {
                //             title: 'Icons',
                //             link: 'restricted.components.icons'
                //         },
                //         {
                //             title: 'Lightbox/Modal',
                //             link: 'restricted.components.modal'
                //         },
                //         {
                //             title: 'Lists',
                //             link: 'restricted.components.lists'
                //         },
                //         {
                //             title: 'Nestable',
                //             link: 'restricted.components.nestable'
                //         },
                //         {
                //             title: 'Panels',
                //             link: 'restricted.components.panels'
                //         },
                //         {
                //             title: 'Notifications',
                //             link: 'restricted.components.notifications'
                //         },
                //         {
                //             title: 'Preloaders',
                //             link: 'restricted.components.preloaders'
                //         },
                //         {
                //             title: 'Sortable',
                //             link: 'restricted.components.sortable'
                //         },
                //         {
                //             title: 'Tables',
                //             link: 'restricted.components.tables'
                //         },
                //         {
                //             title: 'Tables Examples',
                //             link: 'restricted.components.tables_examples'
                //         },
                //         {
                //             title: 'Tabs',
                //             link: 'restricted.components.tabs'
                //         },
                //         {
                //             title: 'Tooltips',
                //             link: 'restricted.components.tooltips'
                //         },
                //         {
                //             title: 'Typography',
                //             link: 'restricted.components.typography'
                //         }
                //     ]
                // },
                // {
                //     id: 11,
                //     title: 'E-commerce',
                //     icon: '&#xE8CB;',
                //     submenu: [
                //         {
                //             title: 'Product Details',
                //             link: 'restricted.ecommerce.product_details'
                //         },
                //         {
                //             title: 'Product Edit',
                //             link: 'restricted.ecommerce.product_edit'
                //         },
                //         {
                //             title: 'Products Grid',
                //             link: 'restricted.ecommerce.products_grid'
                //         },
                //         {
                //             title: 'Products List',
                //             link: 'restricted.ecommerce.products_list'
                //         }
                //     ]
                // },
                // {
                //     id: 12,
                //     title: 'Plugins',
                //     icon: '&#xE8C0;',
                //     submenu: [
                //         {
                //             title: 'Calendar',
                //             link: 'restricted.plugins.calendar'
                //         },
                //         {
                //             title: 'Charts',
                //             link: 'restricted.plugins.charts'
                //         },
                //         {
                //             title: 'Code Editor',
                //             link: 'restricted.plugins.code_editor'
                //         },
                //         {
                //             title: 'Datatables',
                //             link: 'restricted.plugins.datatables'
                //         },
                //         {
                //             title: 'Diff View',
                //             link: 'restricted.plugins.diff_view'
                //         },
                //         {
                //             title: 'Gantt Chart',
                //             link: 'restricted.plugins.gantt_chart'
                //         },
                //         {
                //             title: 'Google Maps',
                //             link: 'restricted.plugins.google_maps'
                //         },
                //         {
                //             title: 'Tablesorter',
                //             link: 'restricted.plugins.tablesorter'
                //         },
                //         {
                //             title: 'Vector Maps',
                //             link: 'restricted.plugins.vector_maps'
                //         }
                //     ]
                // },
                // {
                //     id: 13,
                //     title: 'Pages',
                //     icon: '&#xE24D;',
                //     submenu: [
                //         {
                //             title: 'Blank',
                //             link: 'restricted.pages.blank'
                //         },
                //         /*{
                //             title: 'Contact List',
                //             link: 'restricted.users.contact_list'
                //         },*/
                //         {
                //             title: 'Gallery',
                //             link: 'restricted.pages.gallery'
                //         },
                //         {
                //             title: 'Help/Faq',
                //             link: 'restricted.pages.help'
                //         },
                //         {
                //             title: 'Login Page',
                //             link: 'login'
                //         },
                //         {
                //             title: 'Notes',
                //             link: 'restricted.pages.notes'
                //         },
                //         {
                //             title: 'Pricing Tables',
                //             link: 'restricted.pages.pricing_tables'
                //         },
                //         {
                //             title: 'Settings',
                //             link: 'restricted.pages.settings'
                //         },
                //         {
                //             title: 'Todo',
                //             link: 'restricted.pages.todo'
                //         },
                //         {
                //             title: 'users edit',
                //             link: 'restricted.pages.user_edit'
                //         },
                //         {
                //             title: 'Blog List',
                //             link: 'restricted.pages.blog.list',
                //             group: 'Blog'
                //         },
                //         {
                //             title: 'Blog Article',
                //             link: 'restricted.pages.blog.article({ articleId: 1 })'
                //         },
                //         {
                //             title: 'Error 404',
                //             link: 'error.404',
                //             group: 'Errors'
                //         },
                //         {
                //             title: 'Error 500',
                //             link: 'error.500'
                //         }
                //     ]
                // }
            ]

        }
    ])

;
