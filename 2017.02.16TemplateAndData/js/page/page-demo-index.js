/**
 * Created by lucheng0902 on 2017/2/15.
 */
(function () {
    var PageDemo = {
        config: {
            JsConfig: {
                activeId: "02"
            },
            ArtTemplate: {
                activeId: "03"
            },
            Underscore: {
                activeId: "02"
            },
            Backbone: {
                activeId: "03"
            }
        },
        cache: {},
        init: function () {
            var _this = this;

            //获取数据并渲染，直接采用原始拼接方式
            PageConfig.getTestData(function (jsondata) {
                console.log(jsondata);
                $("#testDataFromServer").html(JSON.stringify(jsondata));


                //存入js缓存
                _this.cache.list = jsondata.list;
                var html;
                if (PageConfig.currentPage == PageConfig.PageType.StepOringin.jsConcat) {
                    //根据数据获取渲染
                    html = _this.getRenderDomByDataByJsConcat(jsondata.list);
                    //执行
                    _this.updateDomByJsConcat(html);
                }
                //根据不同的页面，页面加载采用不同模式进行渲染
                else if (PageConfig.currentPage == PageConfig.PageType.StepOneTemplate.artTemplate) {
                    //根据数据获取渲染
                    html = _this.getRenderDomByDataByArtTemplate(jsondata.list);
                    //执行
                    _this.updateDomByArtTemplate(html);
                }
                //根据不同的页面，页面加载采用不同模式进行渲染
                else if (PageConfig.currentPage == PageConfig.PageType.StepOneTemplate.underscore) {
                    //根据数据获取渲染
                    html = _this.getRenderDomByDataUnderscore(jsondata.list);
                    //执行
                    _this.updateDomByUnderscore(html);
                }
                //根据不同的页面，页面加载采用不同模式进行渲染
                else if (PageConfig.currentPage == PageConfig.PageType.StepSecondMVC.backbone) {
                    _this.initBackBone(jsondata.list);
                }
                //根据不同的页面，页面加载采用不同模式进行渲染
                else if (PageConfig.currentPage == PageConfig.PageType.StepThirdMVVM.vue) {
                    _this.initVue(jsondata.list);
                }
                //根据不同的页面，页面加载采用不同模式进行渲染
                else if (PageConfig.currentPage == PageConfig.PageType.StepThirdMVVM.react) {
                    _this.initReact(jsondata.list);
                }
                else {
                    //根据数据获取渲染
                    html = _this.getRenderDomByDataByJsConcat(jsondata.list);
                    //执行
                    _this.updateDomByJsConcat(html);
                }

            });

            _this.initEvent();
        },
        initEvent: function () {
            var _this = this;
            //删除数据并刷新
            $(".J-demo-btn-testModifyDataAndRefresh").on("click", function () {
                var $this = $(this);
                var rel = $this.attr("data-rel");
                var operation = $this.attr("data-operation");
                //1.直接js拼接
                if (rel == PageConfig.PageType.StepOringin.jsConcat) {
                    _this.handleListByJsConcat(operation);
                }

                //2.通过artTemplate渲染
                else if (rel == PageConfig.PageType.StepOneTemplate.artTemplate) {
                    _this.handleListByArtTemplate(operation);
                }

                //2.1 通过underscore渲染
                else if (rel == PageConfig.PageType.StepOneTemplate.underscore) {
                    _this.handleListByUnderscore(operation);
                }

                //3.1 通过backbone渲染
                else if (rel == PageConfig.PageType.StepSecondMVC.backbone) {
                    _this.handleListByBackbone(operation);
                }

                //3.1 通过backbone渲染
                else if (rel == PageConfig.PageType.StepThirdMVVM.vue) {
                    _this.handleListByVue(operation);
                }
            });
        },
        //-----------------1.直接js拼接---------------------
        /**
         * 直接进行js操作
         * @param operation
         */
        handleListByJsConcat: function (operation) {

            var _this = this;
            //1.获取数据
            var listOld = _this.cache.list;
            console.log("handleListByJsConcat listOld>>", listOld);

            //数据处理
            if (operation == "add") {
                var newId = "10" + Math.floor(Math.random() * 50);
                //2.更新数据
                _this.cache.list.push({
                    id: newId,
                    names: "name" + Math.floor(Math.random() * 50)
                });

                //设置当前选中为新增加的
                _this.config.JsConfig.activeId = newId;
            }
            else if (operation == "del") {
                //2.更新数据
                _this.cache.list.shift();

                //删除后将选中为倒数第二个选中
                if (_this.cache.list.length > 1) {
                    _this.config.JsConfig.activeId = _this.cache.list[_this.cache.list.length - 2].id;
                }

            }
            PageConfig.appendRecord("数据处理操作：<strong>" + operation + " </strong>,旧数据" + JSON.stringify(listOld));
            PageConfig.appendRecord("<strong>新数据</strong>    " + JSON.stringify(_this.cache.list));


            //3.更新DOM
            var html = _this.getRenderDomByDataByJsConcat(_this.cache.list);
            PageConfig.appendRecord("<strong>根据数据获取需要渲染的html</strong>：  getRenderDomByDataByJsConcat>>         " + PageConfig.htmlEncode(html));
            //4.渲染对应html节点
            _this.updateDomByJsConcat(html);
            PageConfig.appendRecord("<strong>更新DOM</strong>： updateDomByJsConcat ");
        },
        /**
         * 获取渲染数据
         * @param list
         * @returns {string}
         */
        getRenderDomByDataByJsConcat: function (list) {
            var _this = this;
            var activeId = _this.config.JsConfig.activeId;
            var html = "";
            for (var i = 0; i < list.length; i++) {
                var itemData = list[i];
                if (itemData.id == activeId) {
                    html += '<li class="blue" data-id="' + itemData.id + '">' + itemData.id + '.' + itemData.names + '</li>';
                }
                else {
                    html += '<li data-id="' + itemData.id + '">' + itemData.id + '.' + itemData.names + '</li>';
                }
            }
            return html;
        },
        /**
         * 更新Dom节点
         * @param html
         */
        updateDomByJsConcat: function (html) {
            $("#testDataFromServerResult").html(html);
        },

        //-----------------2.artTemplate模版渲染---------------------
        handleListByArtTemplate: function (operation) {

            var _this = this;
            //1.获取数据
            var listOld = _this.cache.list;
            console.log("handleListByArtTemplate listOld>>", listOld);


            //数据处理
            if (operation == "add") {
                var newId = "10" + Math.floor(Math.random() * 50);
                //2.更新数据
                _this.cache.list.push({
                    id: newId,
                    names: "name" + Math.floor(Math.random() * 50)
                });

                //增加后设置当前选中
                _this.config.ArtTemplate.activeId = newId;
            }
            else if (operation == "del") {
                //2.更新数据
                _this.cache.list.shift();

                //删除后设置当前选中为倒数第二个
                //删除后将选中为倒数第二个选中
                if (_this.cache.list.length > 1) {
                    _this.config.ArtTemplate.activeId = _this.cache.list[_this.cache.list.length - 2].id;
                }
            }


            PageConfig.appendRecord("数据处理操作：<strong>" + operation + " </strong>,旧数据" + JSON.stringify(listOld));
            PageConfig.appendRecord("<strong>新数据</strong>    " + JSON.stringify(_this.cache.list));

            //3.更新DOM
            var html = _this.getRenderDomByDataByArtTemplate(_this.cache.list);
            PageConfig.appendRecord("<strong>根据数据获取需要渲染的html</strong>：  getRenderDomByDataByArtTemplate>>         " + PageConfig.htmlEncode(html));
            //4.渲染对应html节点
            _this.updateDomByArtTemplate(html);
            PageConfig.appendRecord("<strong>更新DOM</strong>： updateDomByArtTemplate ");
        },
        /**
         * 获取渲染数据
         * @param list
         * @returns {string}
         */
        getRenderDomByDataByArtTemplate: function (list) {
            var activeId = this.config.ArtTemplate.activeId;
            var html = "";
            html = template("tpl-artTemplate-list", {
                list: list,
                activeId: activeId
            });
            return html;
        }, /**
         * 更新Dom节点
         * @param html
         */
        updateDomByArtTemplate: function (html) {
            $("#testDataFromServerResult").html(html);
        },
        //-----------------2.1 underscore模版渲染---------------------
        handleListByUnderscore: function (operation) {

            var _this = this;
            //1.获取数据
            var listOld = _this.cache.list;
            console.log("handleListByUnderscore listOld>>", listOld);


            //数据处理
            if (operation == "add") {
                var newId = "10" + Math.floor(Math.random() * 50);
                //2.更新数据
                _this.cache.list.push({
                    id: newId,
                    names: "name" + Math.floor(Math.random() * 50)
                });

                 _this.config.Underscore.activeId = newId;
            }
            else if (operation == "del") {
                //2.更新数据
                _this.cache.list.shift();

                //删除后将选中为倒数第二个选中
                if (_this.cache.list.length > 1) {
                    _this.config.Underscore.activeId = _this.cache.list[_this.cache.list.length - 2].id;
                }
            }


            PageConfig.appendRecord("数据处理操作：<strong>" + operation + " </strong>,旧数据" + JSON.stringify(listOld));
            PageConfig.appendRecord("<strong>新数据</strong>    " + JSON.stringify(_this.cache.list));

            //3.更新DOM
            var html = _this.getRenderDomByDataUnderscore(_this.cache.list);
            PageConfig.appendRecord("<strong>根据数据获取需要渲染的html</strong>：  getRenderDomByDataUnderscore>>         " + PageConfig.htmlEncode(html));
            //4.渲染对应html节点
            _this.updateDomByUnderscore(html);
            PageConfig.appendRecord("<strong>更新DOM</strong>： updateDomByUnderscore ");
        },
        /**
         * 获取渲染数据
         * @param list
         * @returns {string}
         */
        getRenderDomByDataUnderscore: function (list) {
            var activeId = this.config.Underscore.activeId;
            var html = "";
            var tpl = $("#tpl-underscore-list").html();
            var compiled = _.template(tpl);
            html = compiled({
                list: list,
                activeId: activeId
            });
            return html;
        },
        initBackBone: function (dataList) {
            var _this = this;
            var activeId = this.config.Backbone.activeId;
            console.log("initBackBone", dataList);


            // 定义模型类
            var Book = Backbone.Model.extend({
                defaults: {
                    id: '',
                    names: ""
                }
            });
            // 创建集合对象
            var books = new Backbone.Collection(null, {
                model: Book
            });
            //根据数据放入到对象中
            for (var i = 0; i < dataList.length; i++) {
                var dataListItem = dataList[i];
                books.add(dataListItem);
            }
            _this.cache.bookBackboneCollection = books;
            // 在控制台输出集合中的模型列表
            // console.dir(books.models);
            // console.log(books);

            //案例：查找集合中
            // var targetObj=books.find(function(model){
            //     return model.get('id') == '02';
            // });
            // console.log(targetObj);

            //定义渲染的item的视图
            var ItemView = Backbone.View.extend({
                tagName: 'li',
                className: 'list-item',
                render: function () {
                    var names = this.model.get('names');
                    var id = this.model.get('id');
                    this.$el.html(id + "-" + names);
                    this.$el.attr("data-id", id);
                    return this;
                }
            });
            var ListView = Backbone.View.extend({
                activevId: activeId,
                initialize: function () {
                    if (this.collection) {
                        this.byId = {};
                        this.views = [];
                        this.collection.each(this.registerView, this);
                        this.listenTo(this.collection, 'reset', this.resetView);
                        this.listenTo(this.collection, 'add', this.addView);
                        this.listenTo(this.collection, 'remove', this.removeview);
                        this.listenTo(this.collection, 'change', this.updateView);
                        this.listenTo(this.collection, 'sort', this.resetView);
                    }
                },
                registerView: function (model) {
                    var view = new ItemView({model: model});
                    this.byId[model.cid] = view;
                    this.views.push(view);
                },
                addView: function (model) {
                    var view = new ItemView({model: model});
                    var at = this.collection.indexOf(model);
                    this.byId[model.cid] = view;
                    $before = this.views[at - 1].$el;
                    $before.after(view.render().$el);
                    this.views.splice(at, 0, view);
                },
                removeview: function (model) {
                    // var view = new ItemView({model: model});
                    // var at = this.collection.indexOf(model);
                    // this.byId[model.cid] = view;
                    // $before = this.views[at - 1].$el;
                    // $before.after(view.render().$el);
                    // this.views.splice(at, 0, view);
                    // this.views.removeview();
                    // this.render();
                },
                removeviewByIndex: function (index) {
                    var model = this.collection.models[index];
                    var view = new ItemView({model: model});

                    this.collection.remove(model);
                    this.views.splice(index, 1);
                    this.render();
                },
                resetView: function () {
                    this.byId = {};
                    this.views = [];
                    this.collection.each(this.registerView, this);
                    this.render();
                },
                updateView: function (model) {
                    var view = this.byId[model.cid];
                    view.render();
                },
                render: function () {
                    var __this = this;
                    this.$el.empty();
                    _.each(this.views, function (view) {
                        $_el = view.render().$el;
                        var id = view.model.id;
                        if (id == _this.config.Backbone.activeId) {
                            $_el.addClass("red");
                        }
                        __this.$el.append($_el);
                    });
                    return this;
                }
            });
            //
            _this.cache.bookBackboneListVuew = new ListView({
                el: '#testDataFromServerResult',
                collection: books
            });
            _this.cache.bookBackboneListVuew.render();

            console.log(_this.cache.bookBackboneListVuew);
        },
        /**
         * 更新Dom节点
         * @param html
         */
        updateDomByUnderscore: function (html) {
            $("#testDataFromServerResult").html(html);
        },
        //-----------------3 Backbone渲染---------------------
        handleListByBackbone: function (operation) {

            var _this = this;
            //1.获取数据
            var listOld = _this.cache.list;
            console.log("handleListByUnderscore listOld>>", _this.cache.bookBackboneListVuew.collection);
            PageConfig.appendRecord("<strong>原数据</strong>    " + JSON.stringify(_this.cache.bookBackboneListVuew.collection));

            //数据处理
            if (operation == "add") {
                var newId = "10" + Math.floor(Math.random() * 50);
                //2.更新数据
                _this.cache.bookBackboneListVuew.collection.add({
                    id: newId,
                    names: "name" + Math.floor(Math.random() * 50)
                });
                console.log("handleListByUnderscore listNew>>", _this.cache.bookBackboneListVuew.collection);


                //增加数据设置当前选中为增加的
                _this.config.Backbone.activeId = newId;
                //更新视图
                _this.cache.bookBackboneListVuew.resetView();
            }
            else if (operation == "del") {
                if (_this.cache.bookBackboneListVuew.collection.models.length > 0) {
                    //2.删除第一个
                    _this.cache.bookBackboneListVuew.removeviewByIndex(0);
                }
                else {
                    console.log("backbone collection数据列表为空");
                }


                //将选中的为倒数第二个
                if (_this.cache.bookBackboneListVuew.collection.models.length > 2) {
                    _this.config.Backbone.activeId = _this.cache.bookBackboneListVuew.collection.models[_this.cache.bookBackboneListVuew.collection.models.length - 2].id;
                }
                _this.cache.bookBackboneListVuew.resetView();
            }
            PageConfig.appendRecord("<strong>新数据</strong>    " + JSON.stringify(_this.cache.bookBackboneListVuew.collection));
            //3.更新DOM 自动

        },
        initVue: function (dataList) {
            var _this = this;
            console.log("initVue", dataList);

            _this.cache.vueList = new Vue({
                el: "#testDataFromServerResult",
                data: {
                    items: dataList,
                    activeId: "03"
                },
                methods: {
                    showItemCurrent: function () {

                    }
                }
            });

            console.log(_this.cache.vueList.items);
        },
        handleListByVue: function (operation) {
            var _this = this;
            //1.获取数据
            var listOld = _this.cache.vueList.items;
            console.log("handleListByVue listOld>>", _this.cache.vueList.items);
            PageConfig.appendRecord("<strong>原数据</strong>    " + JSON.stringify(_this.cache.vueList.items));


            //数据处理
            if (operation == "add") {
                var newId = "10" + Math.floor(Math.random() * 50);
                //2.更新数据
                _this.cache.vueList.items.push({
                    id: newId,
                    names: "name" + Math.floor(Math.random() * 50)
                });
                //实现将选中的为增加的
                _this.cache.vueList.activeId = newId;
                console.log("handleListByVue listNew>>", _this.cache.vueList);
            }
            else if (operation == "del") {
                if (_this.cache.vueList.items.length > 0) {
                    _this.cache.vueList.items.splice(0, 1);
                    if (_this.cache.vueList.items.length > 1) {
                        //实现将选中的为增加的
                        _this.cache.vueList.activeId = _this.cache.vueList.items[_this.cache.vueList.items.length - 2].id;
                    }

                }
                else {
                    console.log("数据已清空", _this.cache.vueList);
                }
            }
            PageConfig.appendRecord("<strong>新数据</strong>    " + JSON.stringify(_this.cache.vueList.items));
        },

        initReact: function (dataList) {
            var _this = this;
            console.log("initReact", dataList);

            // _this.cache.reactList=
            window.PageReactInit();
        }
    };
    PageDemo.init();
    window.PageDemo = PageDemo;
})();