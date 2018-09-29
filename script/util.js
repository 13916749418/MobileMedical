//自定义参数
const reqHost = 'http://211.152.43.99:8082/InterfaceForApp/';

//过滤emoji
const emotionReg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;

//自定义常用方法
//↓使用cookie
function setCookie(cname,cvalue,exdays){
	var d = new Date();
	//d.setTime(d.getTime()+(exdays*24*60*60*1000));
  d.setTime(d.getTime()+(exdays*1000*60));//暂定单位【分钟】
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
	}
	return "";
}
//↑使用cookie

//封装下拉刷新
function downPullRefresh(api,req){
	api.setRefreshHeaderInfo({
      loadingImg: 'widget://image/pull_arrow.png',
      bgColor: '#f6f6f6',
      textColor: '#666',
      textDown: '下拉刷新...',
      textUp: '松开刷新...',
      showTime: false,
  }, function(ret, err) {
      //在这里从服务器加载数据，加载完成后调用api.refreshHeaderLoadDone()方法恢复组件到默认状态
			req.success();

  });
}

//封装滑动加载
function downScrollLoad(api,req){
	api.addEventListener({
			name: 'scrolltobottom',
			extra: {
					threshold: 300
			}
	}, function(ret, err) {
			req.success();

	});
}

//底部导航
function getWhichPage(req){
  var tabBar = api.require('tabBar');
  tabBar.open({
      bgImg: 'widget://image/tab_bg.jpg',
      selecteIndex:0,
      h:60,
      perScreenBtn:4,
      items: [{
          title: '首页',
          img: 'widget://image/tab_0.png',
          selected: 'widget://image/tab_0_on.png',
          color:'#a0a0a0',
          selectedTitleColor:'#c4311b',
          //badge: '1'
      }, {
          title: '发现',
          img: 'widget://image/tab_1.png',
          selected: 'widget://image/tab_1_on.png',
          color:'#a0a0a0',
          selectedTitleColor:'#c4311b',
          //badge: '2'
      }, {
          title: '商家',
          img: 'widget://image/tab_2.png',
          selected: 'widget://image/tab_2_on.png',
          color:'#a0a0a0',
          selectedTitleColor:'#c4311b',
          //badge: '1'
      }, {
          title: '我的',
          img: 'widget://image/tab_3.png',
          selected: 'widget://image/tab_3_on.png',
          color:'#a0a0a0',
          selectedTitleColor:'#c4311b',
          //badge: '2'
      }],
      fixedOn: api.frameName
  }, function(res, err) {
    req.success({
      index:res.index
    })

  });
}

// 返回键双击退出
function initExitEvent() {
    var exitFlag = false;
    api.addEventListener({
        name: 'keyback'
    }, function(ret, err) {
        if (!exitFlag) {
            api.toast({
                msg: '再按一次退出',
                duration: 2000,
                location: 'bottom'
            });
            exitFlag = true;
        } else {
            api.closeWidget({
                silent: true
            });
        }
        setTimeout(function() {
            exitFlag = false;
        }, 2000);
    });
};
