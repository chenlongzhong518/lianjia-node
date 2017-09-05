//声明一个模块并用一个变量接收
var app = angular.module('app', []);

app.config(['$interpolateProvider',function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
}])
//定义一个控制器
app.controller('kszf',function($scope,$http) {

	$scope.keyword = '';
    $scope.suggestList = [];
    $scope.suggest = function() {
        $http.get('http://localhost:4000/Suggest/'+$scope.keyword).then(function(res) {
           $scope.suggestList = res.data.data.result;
       })
    }
    $scope.searchData = [{
        left: 20,
        text: '请输入区域、商圈或小区名开始找房',
        btn: '开始找房',
        title:'找二手房'
    }, {
        left: 88,
        text: '请输入楼盘名称开始找房',
        btn: '开始找房',
        title:'找新房'
    }, {
        left: 150,
        text: '输入地铁线或地铁站可以找房地铁附近的房源',
        btn: '开始找房',
        title:'找租房'
    }, {
        left: 210,
        text: '请输入小区名开始查找小区',
        btn: '开始搜索',
        title:'找小区'
    }, {
        left: 272,
        text: '房产知识有疑问？来搜搜吧',
        btn: '开始搜索',
        title:'搜问答'
    }];
    $scope.tab = function(index){
        $scope.currentIndex=index;
    }
//  $scope.$on('ngRepeatFinished', function(){
//	
//      
//	})

});

//定义一个控制器(新房新起航)
app.controller('xfxqh', function($scope) {
	$scope.xfarr= [
		{img:'img/xf1.gif.510x300.jpg',title:'阳光城京兆府',price:'1400万/套'},
		{img:'img/xf2.jpg.510x300.jpg',title:'北科建泰禾丽春湖院子',price:'68000元/平'},
		{img:'img/xf3.jpg.510x300.jpg',title:'中骏西山天璟',price:'67000元/平'}
	];
});

//定义一个控制器(新房新起航)
app.controller('eshf', function($scope) {
	$scope.esfarr= [
		{img:'img/2sf1.jpg.280x210.jpg',price:'580万',title:'瑞丽江畔 正规南向两居室',ms1:'瑞丽江畔',ms2:'2室1厅',ms3:'92.25平米',ly:'链家网推荐在售房源'},
		{img:'img/2sf2.jpg.280x210.jpg',price:'340万',title:'满五年全南向两居室，近地铁',ms1:'华龙苑南里',ms2:'2室1厅',ms3:'60.74平米',ly:'链家网推荐在售房源'},
		{img:'img/2sf3.jpg.280x210.jpg',price:'799万',title:'南北通透大两。居户型方正采',ms1:'星河城东区',ms2:'2室1厅',ms3:'111.13平米',ly:'链家网推荐在售房源'},
		{img:'img/2sf4.jpg.280x210.jpg',price:'800万',title:'枫竹苑二区 方正三居 满五',ms1:'枫竹苑二区',ms2:'3室2厅',ms3:'123.11平米',ly:'链家网推荐在售房源'},
	];
});

app.directive('renderFinish', function ($timeout) {      //renderFinish自定义指令
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});

//获取后台数据
app.controller('zhaofang', function($scope, $http) {
	$scope.nr1 = [];
	$scope.zhaofang = function() {
		$http({
			url: 'http://localhost:2555/zhaofang'
		}).then(function(res) {
			$scope.nr1 = res.data;
		}, function() {

		})
	}
	$scope.zhaofang();

})

window.onload = function() {
	var oHeader = document.getElementsByTagName('header')[0];
	
	var oI = document.querySelector('.kszf .ul3 li i');
	var oInp = document.querySelectorAll('.kszf input')[0];
	var oBtn = document.querySelectorAll('.kszf input')[1];
	var oDaoding = document.querySelector('.daoding');

	
	//登录窗口
	document.querySelector(".dl").onclick = function() {
		document.querySelector(".dlck").style.display = "block";
		document.querySelector(".dlbj").style.display = "block";
	}
	document.querySelector(".dlbj").onclick = function() {
		document.querySelector(".dlck").style.display = "none";
		document.querySelector(".dlbj").style.display = "none";
	}

	window.onscroll = function() {
		var oScroll = document.documentElement.scrollTop || document.body.scrollTop;
		//背景图滚动
		oHeader.style.backgroundPositionY = -oScroll * 0.06 + 'px';
		//回顶部
		if(oScroll >= 500) {
			oDaoding.style.display = 'block'
		} else {
			oDaoding.style.display = 'none'
		}
		oDaoding.onclick = function() {
			var start = oScroll;
			var end = 0;
			var total = end - oScroll;
			var time = 500;
			var count = Math.ceil(time / 30);	//取整
			var n = 0;
			var timer = null;
			timer = setInterval(function() {
				n++;

				if(document.documentElement.scrollTop) {
					document.documentElement.scrollTop = start + n * total / count;
				} else {
					document.body.scrollTop = start + n * total / count;
				}
				if(n == count) {
					clearInterval(timer);
				}
			}, 30);
		};
	}
}

$(function() {
	//字体轮播
	var oUl2 = $('.lfxx .ul2');
	var aLi2 = $('.lfxx .ul2 li');
	var h = -35;
	var now = 0;
	var aLen = aLi2.length;
	oUl2.css('height', -h * aLen);

	//下一页
	function nextPage() {
		now++;
		if(now == aLen - 2) {
			oUl2.stop().animate({
				'top': h * (now + 1)
			}, function() {
				oUl2.css('top', h);
			});
			now = 0;
		} else {
			oUl2.stop().animate({
				'top': h * (now + 1)
			});
		}
	};
	setInterval(nextPage, 3000)
	//新房，新起航图片缩放
	$('.nr3 .xinfang .picture').mouseenter(function() {
		$(this).children('img').css('transform','scale(1.05)');
	})
	$('.nr3 .xinfang .picture').mouseleave(function() {
		$(this).children('img').css('transform','scale(1)');
	})	
})