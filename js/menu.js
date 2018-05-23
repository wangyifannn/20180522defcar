$.ajax({
    // "url": "http://localhost/car/defcar/json/menu.json",
    "url": "https://wangyifannn.github.io/newdefcar/json/menu.json",
    "type": "get",
    "data": {},
    // "dataType": "jsonp", //数据类型为jsonp  
    // "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
    "success": function(res) {
        console.log(res);
        var menuli = "";
        for (var i = 0; i < res.length; i++) {
            menuli =
                '<li class="sidebar-dropdown">' +
                '<a class="sidebar_dropdown_hover two_a" href="#"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-' + res[i].url + '"></use></svg><span>' +
                res[i].name + '</span><span class="badge">' + res[i].childrenMenus.length + '</span></a>' +
                '<div class="sidebar-submenu">' +
                '<ul class="menuli_ulli' + i + '">' +
                '</ul>' +
                '</div>' +
                '</li>';
            $("#myTab").append(menuli);
            var menuli_ulli = "";
            for (var k = 0; k < res[i].childrenMenus.length; k++) {
                var menuli_ulli_menu3li = "";
                if (res[i].childrenMenus[k].childrenMenus.length > 0) {
                    for (var j = 0; j < res[i].childrenMenus[k].childrenMenus.length; j++) {
                        menuli_ulli_menu3li += '<li class="' + res[i].childrenMenus[k].childrenMenus[j].url + '"><a href="../html/' + res[i].childrenMenus[k].childrenMenus[j].url + '.html">' + res[i].childrenMenus[k].childrenMenus[j].name + '</a> </li>';
                    }
                    menuli_ulli += '<li class="sidebar-dropdown threeMenu">' +
                        '<a class="sidebar_dropdown_hover three_a" href="#"><span>' +
                        res[i].childrenMenus[k].name + '</span><span class="badge">' + res[i].childrenMenus[k].childrenMenus.length + '</span></a>' +
                        '<div class="sidebar-submenu">' +
                        '<ul class="menuli_ulli_menu3li' + i + '">' + menuli_ulli_menu3li + '</ul>' +
                        '</div>' +
                        '</li>';
                } else {
                    menuli_ulli += '<li class="li_a ' + res[i].childrenMenus[k].url + '"><a href="../../../car/20180522defcar/html/' + res[i].childrenMenus[k].url + '.html#html=' + res[i].childrenMenus[k].url + '">' + res[i].childrenMenus[k].name + '</a> </li>';
                }
                $(".menuli_ulli" + i).html(menuli_ulli);
            }
        }
        $(".sidebar-dropdown > a.two_a").click(function() {
            $(".sidebar-submenu").slideUp(250);
            if ($(this).parent().hasClass("active")) {
                $(".sidebar-dropdown").removeClass("active");
                $(this).parent().removeClass("active");
            } else {
                $(".sidebar-dropdown").removeClass("active");
                $(this).next(".sidebar-submenu").slideDown(250);
                $(this).parent().addClass("active");
            }
        });
        $(".sidebar-submenu").slideUp(250);
        $(function() {　　
            var htmlHas = "." + getHashParameter('html');
            console.log(htmlHas);
            console.log($(htmlHas));
            console.log($(htmlHas).parent().parent());
            $(htmlHas).addClass("active");
            $(htmlHas).parent().parent().slideDown(250);
        });
        // 点击选中切换页面并改变面包屑导航路径
        $(".sidebar-submenu ul li").click(function() {
            if ($(this).parent().parent().parent().hasClass("threeMenu")) {
                var ss = '<li>' + $(this).parent().parent().siblings().children()[0].innerText + "/" + '</li><li>' + this.innerText + '</li>';
                changBread(this.parentNode.parentNode.parentNode.children[0].innerText, ss);
            } else if ($(this).hasClass("threeMenu")) {
                changBread(this.parentNode.parentNode.parentNode.children[0].children[1].innerText, "车辆录入");
            } else {
                changBread(this.parentNode.parentNode.parentNode.children[0].children[1].innerText, this.innerText);
            }
            var sib = $(this).parent().parent().parent().siblings();
            for (var i = 0; i < sib.length; i++) {
                $(sib[i]).removeClass("active");
                if (sib[i].children[1]) {
                    var li2 = sib[i].children[1].children[0];
                    for (var j = 0; j < li2.children.length; j++) {
                        $(li2.children[j]).removeClass("active");
                    }
                }
            }
        });

        //驾驶员管理
        // $(".driverList").click(function() {
        //     loadDriverList();
        // });
    },
    "error": function(data) {
        // window.location.href = "../../../car/CarMangae0/html/login.html";
    }
})


// 解决tabs标签在当前页面点击后，再次点击，失效问题。
function removecss(box) {
    $(".sidebar-submenu a").removeClass("active");
}