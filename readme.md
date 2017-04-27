
# 数据与模版概览

> 本文旨在对于数据与模版渲染发展演进分析，从最初的字符串拼接到现在流行的MVVM模式，各种方式的产生和进步就是为了更好解决更简单更方便地处理业务数据到页面渲染的过程

# 1、背景

当我们需要把后端数据展现在页面时，都需要牵涉到逻辑数据到页面渲染的处理过程。 在前端技术发展中，数据与模版渲染之间的处理模式，出现了几个阶段的变革，从最原始的JS拼接字符串，再到MVC的数据、模版、控制层的双向绑定，再到MVVM数据驱动与模版融合的方式。配合现代浏览器演进对js属性变化高版本语言的支持，处理数据和模版更加便利。

## 1.1 类型分类(宽泛)
> 由于库文件有的只针对解决数据到渲染的部分问题，因此需要配合使用。但归纳起来具有代表性。

- 原始阶段：JS字符串拼接
- 第一阶段：模版引擎渲染（MV）（如artTemplate、underscore等）
- 第二阶段：模版视图通过控制层双向绑定（MVC）(Backbone等）
- 第三阶段：数据模型、视图、视图模版，数据驱动展现（MVVM）(React、Vue等）

# 2、场景案例

1.服务器端获取数据
2.渲染列表
3.通过按钮删除、新增项目，删除、增加时重新设置选中class

## 2.1、服务器端获取的Json数据

```
{
    "status": "OK",
    "list": [
        {
            "id": "01",
            "names": "Javascript"
        },
        {
            "id": "02",
            "names": "Css"
        },
        {
            "id": "03",
            "names": "Html"
        },
        {
            "id": "04",
            "names": "Less"
        },
        {
            "id": "05",
            "names": "Json"
        }
    ]
}
```
## 2.2、页面根据数据渲染列表

- 01.Javascript
- **02.Css**
- 03.Html
- 04.Less
- 05.Json

## 2.3、操作演示
- 删除列表第一行数据数据并重新渲染
- 增加一行数据数据并重新渲染

# 3、数据与模版渲染多种模式demo

## 3.1、原始阶段：JS字符串拼接

> js对象中数据通过拼接为html字符串，再操作dom节点改变dom节点内容

### 典型框架
- 例如js中定义变量中包含某种特殊字符，然后进行替换为数据的js字符形式，为最初的模版雏形

````
var data={
    id:123
}
var tpl="<li>{{id}}</li>"
var html=tpl.replace("{{id}}",data.id);
console.log(html);
````

### 优点
- js处理方便自由简单

### 缺点
- 数据量大拼接难以维护修改麻烦,比如大量table数据的拼接

- 第一阶段：js模版渲染

## 3.2、第一阶段：模版渲染(MV)
> 通过数据传递给处理模版的js模版引擎库，得到渲染数据后的html字符串，再手动操作节点改变对应dom节点内容

### 典型框架
- artTemplate
- underscore

### 代码示例
#### artTemplate
html

```
<script type="text/html" id="tpl-artTemplate-list">
    {{each list as obj i}}
    {{if obj.id == activeId}}
        <li class="red" data-id="{{obj.id}}">{{obj.id}}.{{obj.names}}</li>
    {{else}}
    <li data-id="{{obj.id}}">{{obj.id}}.{{obj.names}}</li>
    {{/if}}
    {{/each}}
</script>
```
js
```
var html = "";
html = template("tpl-artTemplate-list", {
        list: list,
        activeId: activeId
});
return html;
```
#### underscore
html
```
<script type="text/template" id="tpl-underscore-list">
    <% _.each(list, function (obj) { %>
    <% if(obj.id==activeId) %>
    <li class="red" data-id="<%= obj.id %>"><%= obj.id %>.<%= obj.names %></li>
    <% else %>
    <li data-id="<%= obj.id %>"><%= obj.id %>.<%= obj.names %></li>
    <% }); %>
</script>
```
js
```
var html = "";
var tpl = $("#tpl-underscore-list").html();
var compiled = _.template(tpl);
html = compiled({
        list: list,
        activeId: activeId
});
return html;
```
### 优点
- 只需要维护模版和数据
- 可以自主控制渲染时机
- 在nodejs服务器端更多便利

### 缺点
- 需要引入模版引擎、模版文件，以及维护模版
- 需要手动进行下一步的更新UI操作

## 3.3、第二阶段：模版视图通过控制层双向绑定(MVC)
> 通过MVC库框架，为框架指定数据，按照格式编写DOM节点模版，当数据变动，对应UI页面自动渲染。闭环，双向绑定，UI变动也会对应数据变动

### 典型框架
- Backbone

### 示例代码
数据、渲染等都交给框架控制层处理
```
        //定义书的模型类
        var Book = Backbone.Model.extend({
                defaults: {
                        id: '',
                        names: ""
                }
        });
        //定义书的集合对象
        var books = new Backbone.Collection(null, {
                model: Book
        });
        //根据数据放入到对象中
        for (var i = 0; i < dataList.length; i++) {
                var dataListItem = dataList[i];
                books.add(dataListItem);
        }
```

### 优点
- 双向绑定，只需要考虑数据和页面显示，所有事件MVC托管
- 能处理复杂业务，代码交给MVC框架托管，提高系统代码一致性

### 缺点
- 闭环，不够灵活，过于依赖库
- 学习成本大

## 3.4、第三阶段：数据模型、视图、视图模版，数据驱动展现(MVVM)
> 单向数据驱动页面，只有数据变动才会UI变动

### 典型框架

- react
- vue
- knockout.js

### 优点
- 数据驱动视图，更注重数据逻辑处理
- 配合高版本浏览器支持属性变化事件触发数据修改后自动处理视图
- 增加虚拟DOM减少节点手动处理
- 通过nodejs平台可以更好构建目前成型的react/vue模式的单页面应用

### 缺点
- 大部分都需要现代浏览器支持一些自动化的特性
- 都需要库支持

# 总结
对于技术的使用一句话概括：不忘初心。数据和页面模版渲染的模式不断变化，但最初的目的是分离业务和展现专注于处理数据业务。经历了发展，最终的MVVM模式是结合了最初的数据决定展现，又融合了模版的思想，再加上高版本浏览器支持属性变动自动触发事件，自动处理变化后的UI，更智能化。

## 建议
- 上述的各类都有各自的应用场景，要考虑项目中实际需求，比如兼容性要求高，有些库是针对于高版本现代浏览器平台，才会发挥对应的效果
- 学习某种技术，不能被平台束缚，针对具体的技术进行学习。如：想学习react、vue，但受到当下单页面应用的node环境束缚，但其实可以完全只进行react的学习锻炼其使用。
- 新技术的出现要理性看待有方向性，其出现是为了解决的问题所在，提升什么改进什么。
# 4、附录
## 4.1、案例地址
- [数据与模版渲染](http://git.xyz.cn/front-end/front-end-hatch.git)
