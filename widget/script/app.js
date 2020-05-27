  // 適配不同宽度的屏幕
  var html_width = document.documentElement.clientWidth || document.body.clientWidth;
  var htmlDom = document.getElementsByTagName("html")[0];
  htmlDom.style.fontSize = html_width / 36 + 'px';
  var imgurl = "http://test.bjzq.yqin.cn"
  var html_win = 'widget://html/'
  var api_url = "http://test.bjzq.yqin.cn/"
  var _appsecret = '6b9528016630c063ad9c75b53708356c';
  function _openWin(url, data) {
      var data = data || {}
      api.openWin({
          name: url,
          vScrollBarEnabled: false,
          hScrollBarEnabled: false,
          url: html_win + url + '.html',
          pageParam: data
      });
  }
  function getlevel() {
      var newlevel = api.systemVersion;
      if(newlevel==10||newlevel==10){
        return  29
      }else if(newlevel==9.0||newlevel==9){
          return  28
      }else if(newlevel==8.1){
          return  27
      }else if(newlevel==8.0||newlevel==8){
          return  26
      }else if(newlevel==7.1){
          return  25
      }else if(newlevel==7.0||newlevel==7){
          return  24
      }else if(newlevel==6.0||newlevel==6||newlevel=='6.0.1'){
          return  23
      }else if(newlevel==5.1){
          return  22
      }else if(newlevel==5.0||newlevel==5){
          return  21
      }else if(newlevel=='4.4w'){
          return  20
      }else if(newlevel==4.4){
          return  19
      }else if(newlevel==4.3){
          return  18
      }else if(newlevel==4.2){
          return  17
      }else if(newlevel==4.1){
          return  16
      }else if(newlevel=='4.0.3'){
          return  15
      }else if(newlevel==4.0||newlevel==4){
          return  14
      }else if(newlevel==3.2){
          return  13
      }else if(newlevel==3.1){
          return  12
      }else if(newlevel==3.0||newlevel==3){
          return  11
      }
      return newlevel;
  }
  function getconfig(type = 0, fun) {
      if (!$api.getStorage('config') || type) {
          _ajax('api/index/options', function(ret,err) {
              if (ret.errCode == 1) {
                  $api.setStorage('config', ret.data)
                  if (fun) {
                      fun(ret.data);
                  }
              }
              return ret.data;
          })
      } else {
          return $api.getStorage('config');
      }
  }

  function _openWintoken(url, data) {
      if (!$api.getStorage('token')) {
          _openWin('login')
          return
      }
      var data = data || {}
      api.openWin({
          name: url,
          vScrollBarEnabled:false,
          url: html_win + url + '.html',
          pageParam: data
      });
  }

  function _openWin_(url, data) { //打开window后禁止右滑
      var data = data || {}
      api.openWin({
          name: url,
          vScrollBarEnabled:false,
          url: html_win + url + '.html',
          pageParam: data,
          slidBackEnabled: false
      });
  }

  function _msg(title, duration, location) {
      //top            //顶部
      //middle        //中间
      //bottom        //底部
      if (!location) {
          location = 'middle';
      }
      if (!duration) {
          duration = 2000;
      }
      api.toast({
          msg: title,
          duration: duration,
          location: location
      });
  }

  function _setStatusBarStyle() { //进入页面设置为黑色，监听返回设置为白色
      api.setStatusBarStyle({
          style: 'dark',
          color: 'rgba(0,0,0,0)'
      });
      api.addEventListener({
          name: 'keyback'
      }, function(ret, err) {
          api.closeWin({
              name: ''
          });
          api.setStatusBarStyle({
              style: 'light',
              color: 'rgba(0,0,0,0)'
          });
      });
  }

  function setStatusBarStylemoren() { //进入页面设置为黑色，监听返回设置为白色
      api.setStatusBarStyle({
          style: 'light',
          color: 'rgba(0,0,0,0)'
      });
  }

  function _setStatusBarStyleLight() {
      api.setStatusBarStyle({ //进入页面设置为白色，监听返回设置为黑色
          style: 'light',
          color: 'rgba(0,0,0,0)'
      });
      api.addEventListener({
          name: 'keyback'
      }, function(ret, err) {
          api.closeWin({
              name: ''
          });
          api.setStatusBarStyle({
              style: 'dark',
              color: 'rgba(0,0,0,0)'
          });
      });
  }


  function closeWinL() {
      api.setStatusBarStyle({ //关闭window时设置状态栏颜色为白色
          style: 'light',
          color: 'rgba(0,0,0,0)'
      });
      api.closeWin();
  }

  function closeWinD() {
      api.setStatusBarStyle({ //关闭window时设置状态栏颜色为黑色
          style: 'dark',
          color: 'rgba(0,0,0,0)'
      });
      api.closeWin();
  }

  function fnCloseWidget() { //监听返回按钮退出应用
      var isExit = false;
      api.addEventListener({
          name: 'keyback'
      }, function(ret, err) {
          if (isExit == true) {
              api.closeWidget({
                  id: 'A6027119505629',
                  silent: true
              });
          } else {
              api.toast({
                  msg: '再按一次退出应用',
                  duration: 3000,
                  location: 'middle'
              });
              isExit = true;
              setTimeout(function() {
                  isExit = false;
              }, 1000)
          }
      });
  }

  function setRefreshHeaderInfo(fn, bgColor, textColor) { //下拉刷新
      if (!bgColor) {
          bgColor = 'rgba(8,95,209,1)'
      }
      if (!textColor) {
          textColor = '#fff'
      }
      api.setRefreshHeaderInfo({
          loadingImg: 'widget://image/xiala.png',
          bgColor: bgColor,
          textColor: textColor,
          textDown: '下拉刷新...',
          textUp: '松开刷新...'
      }, function(ret, err) {
          fn()
          api.refreshHeaderLoadDone()
      });
  }

  function addEventListener(fn1, fn2) { //  监听页面一显示就刷新数据
      api.addEventListener({
          name: 'viewappear'
      }, function(ret, err) {
          if (fn1) {
              fn1()
          }

      });
  }

  function showProgress() {
      setTimeout(() => {
          api.showProgress({
              style: 'default',
              animationType: 'fade',
              title: '加载中...',
              modal: false
          });
      }, 100)
  }

  function marginBottom() { //判断是否为iphonex 以上机型
      let h = api.safeArea.top
      if (h == 44) {
          margin_bottom = 89
      } else {
          margin_bottom = 72
      }
  }

  function text_slide() {
      var scroll_div = $api.dom('.scroll-div>div');
      console.log(JSON.stringify(scroll_div))
      // $api.css(scroll_div, ';');
      $api.addCls(scroll_div, 'scroll_active');
      var x = 0
      var scroll_interval = setInterval(function() {
          $api.addCls(scroll_div, 'scroll_active');
          x -= 3
          var len = vm.textList.length - 1
          if (x == -3 * len) {
              scroll_div.style.marginTop = x + 'rem'
              setTimeout(function() {
                  x = 0
                  $api.removeCls(scroll_div, 'scroll_active');
                  scroll_div.style.marginTop = x + 'rem'
              }, 500)
          }
          scroll_div.style.marginTop = x + 'rem'
      }, 2500);

  }

  function initEventListenter(fn) { //上拉加载更多
      api.addEventListener({
          name: 'scrolltobottom',
          extra: {
              threshold: 0
          }
      }, function(ret, err) {
          fn()
      });
  }

  function usercopy(text, msg) {
      //text为需要复制的文本
      var clipBoard = api.require('clipBoard');
      clipBoard.set({
          value: text
      }, function(ret, err) {
          if (ret) {
              console.log(JSON.stringify(ret));
              if (msg) {
                  _msg(msg)
              }
          } else {
              console.log('複製失敗，請重試');
          }
      });
  }
  var publicFunction = {
      //检测APP所需权限是否开启，并提示用户开启对应权限
      //callBack回调事件可自行在调用的时候写入
      checkPermission: function(callBack) {

          //验证照相、相册、存储、通知权限（有需要可以继续增加，详看对应文档）https://docs.apicloud.com/Client-API/api#hasPermission
          var resultList = api.hasPermission({
              list: ['camera', 'photos', 'storage']
          });

          var _permission = new Array();
          for (var i = 0; i < resultList.length; i++) {
              if (resultList[i].granted == false) {
                  _permission.push(resultList[i].name);
              }
          }

          if (!!_permission && JSON.stringify(_permission) != '[]') {
              api.requestPermission({
                  list: _permission,
                  code: 1
              }, function(ret, err) {
                  for (var i = 0; i < ret.list.length; i++) {
                      if (ret.list[i].granted == false) {
                          api.confirm({
                              title: '缺少权限，将导致部分功能无法使用',
                              msg: '请确认开启对应权限。',
                              buttons: ['确定开启', '取消']
                          }, function(ret, err) {
                              if (ret.buttonIndex == 1) {
                                  publicFunction.checkPermission(callBack);
                              } else {
                                  callBack();
                                  return;
                              }

                          });
                      } else {

                          callBack();
                          return;
                      }
                  }
              });
          } else {
              callBack();
              return;
          }
      }
  }
  // 获取token
  function getToken() {
      var newToken = $api.getStorage('token');
      if (newToken) {
          return newToken;
      } else {
          _uot();
          return null;
      }
  }

  function _uot() {
      $api.setStorage('token', null);
  }
  // getSign用到的字符串处理
  function paramsStrSort(paramsStr, timestamp) {
      var newUrl = paramsStr + '@' + timestamp + '@' + _appsecret;
      // console.log('加密前字符串' + newUrl);
      return md5(newUrl);
  }

  function jsonSort(jsonObj) {
      let arr = [];
      for (var key in jsonObj) {
          if (jsonObj[key] != undefined)
              arr.push(key);
          // console.log('键值对-' + key + '-' + jsonObj[key]);
      }
      arr.sort();
      let str = '';
      for (var i in arr) {
          str += jsonObj[arr[i]] + "&"
      }
      var relurt = str.substr(0, str.length - 1);
      return relurt;
  }
  // 生成sign签名
  function getSign(params, timestamp) {
      var relurt = '';
      if (typeof params == "string") {
          relurt = paramsStrSort(params, timestamp);
      } else if (typeof params == "object") {
          // console.log('原始加密数组' + JSON.stringify(params));
          var relurt = jsonSort(params);
          relurt = paramsStrSort(relurt, timestamp);
      }
      return relurt;
  }


  function _ajax(url, callback, data, files) {
      // console.log(sx_url + url);
      data = data || {};
      var token = getToken();
      // console.log(token)
      var device = api.systemType;
      data['token'] = token || 'token';
      var timestamp = Date.parse(new Date());
      var sign = getSign(data, timestamp);
      // console.log(sign);
      data['sign'] = sign;
      data['time'] = timestamp;
      // console.log('加密后提交数组' + JSON.stringify(data));
      var postdata = {
          values: data
      };
      // console.log(JSON.stringify(postdata))

      if (files)
          postdata['files'] = files;
      api.ajax({
          url: api_url + url,
          method: 'POST',
          data: postdata
      }, function(res, err) {
          if (res && res.errCode == -1) {
              _openWin('login')
          } else {
              callback(res, err);
          }
      });

  }

  function UILoading(U_id) {
      var activity = api.require('UILoading');
      activity.closeKeyFrame();
      activity.keyFrame({
          rect: {
              w: 100,
              h: 100
          },
          styles: {
              bg: 'rgba(0,0,0,0.5)',
              corner: 5,
              interval: 50,
              frame: {
                  w: 80,
                  h: 80
              }
          }
      });
  }

  function UILoading_Close(U_id) {
      var uiloading = api.require('UILoading');
      uiloading.closeKeyFrame();
  }

  function dialogBox(title, content, fn_,fn1_) {
      var dialogBox = api.require('dialogBox');
      dialogBox.alert({
          texts: {
              title: title,
              content: content,
              leftBtnTitle: '取消',
              rightBtnTitle: '确认'
          },
          styles: {
              w: 280,
              corner: 3,
              title: {
                  marginT: 15,
                  icon: 'widget://image/alert.png',
                  iconSize: 25,
                  titleSize: 14,
                  titleColor: '#000'
              },
              content: {
                  color: '#000',
                  size: 14
              },
              left: {
                  marginB: 10,
                  marginL: 10,
                  w: 120,
                  h: 35,
                  color: '#F08080',
                  bg: '#fff',
                  size: 13
              },
              right: {
                  marginB: 10,
                  marginL: 20,
                  w: 120,
                  h: 35,
                  bg: '#fff',
                  color: '#F08080',
                  size: 13
              },
              tapClose: true,
          }
      }, function(ret) {
          if (ret.eventType == 'left') {
              var dialogBox = api.require('dialogBox');
              dialogBox.close({
                  dialogName: 'alert'
              });
              fn1_()
          } else if (ret.eventType == 'right') {
              var dialogBox = api.require('dialogBox');
              dialogBox.close({
                  dialogName: 'alert'
              });
              fn_()

          }
      });
  }

  function openFabu() {
      var h = api.winHeight * 0.75
      var w = api.winWidth - 80
      api.openFrame({
          name: 'fbtask_button',
          url: './fbtask_button.html',
          rect: {
              x: w,
              y: h,
              w: 80,
              h: 50
          },
          pageParam: {
              name: 'test'
          },
          animation: {
              type: 'movein',
              subType: "from_right", //动画子类型（详见动画子类型常量）
              duration: 600 //动画过渡时间，默认300毫秒
          },
          bounces: false,
          bgColor: 'rgba(0,0,0,0)',
          vScrollBarEnabled: false,
          hScrollBarEnabled: false,
      });
  }

  //登录融云聊天
  function loginRong(userId, name) {
      return;
      //会员头像
      var appKey = "cpj2xarlchvcn";
      var appSecret = "DxnvKY1Ub4";
      var nonce = Math.floor(Math.random() * 1000000);
      //随机数
      var timestamp = Date.now();
      //时间戳
      var signature = sha1("" + appSecret + nonce + timestamp);
      //数据签名(通过哈希加密计算)
      api.ajax({
          url: "http://api.cn.ronghub.com/user/getToken.json",
          method: "post",
          headers: {
              "RC-App-Key": appKey,
              "RC-Nonce": "" + nonce,
              "RC-Timestamp": "" + timestamp,
              "RC-Signature": "" + signature,
              "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
              values: {
                  userId: userId,
                  name: name,
              }
          }
      }, function(ret, err) {
          if (ret) {
              $api.setStorage('tokenrong', ret.token);
              var rong = api.require('UIRongCloud');
              rong.init(function(ret, err) {
                  if (ret.status == 'error')
                      api.toast({
                          msg: err.code
                      });
              });
              rong.connect({
                  token: ret.token
              }, function(ret, err) {
                  if (ret.status != 'success') {
                    _msg('登录融云聊天失败');
                  }
              });
              rong.pushListener(function(ret, err) {
                      console.log('hello world:' + "" + JSON.stringify(ret))
              })
          } else {
            _msg('登录融云聊天失败');
          }
      });
  }
  // 验证手机号码
  function _isMobile(mobile) {
      if (mobile == "") {
          return false;
      } else {
          if (!/^0{0,1}(13[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9]|16[0-9]|14[0-9])[0-9]{8}$/.test(mobile)) {
              return false;
          }
          return true;
      }
  }
