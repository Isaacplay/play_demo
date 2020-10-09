/**
 * Created by licheng on 19/7/9.
 */

//判断设备
//判断访问终端
var browser = {
  versions:function(){
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };
  }(),
  language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

//对图片进行旋转，压缩的方法，最终返回base64  渲染给img标签的src
function compressImg (img, fileType, orientation) {
  var degree=0,drawWidth,drawHeight,width,height;
  drawWidth=img.width;
  drawHeight=img.height;
  //以下改变一下图片大小
  var maxSide = Math.max(drawWidth, drawHeight);
  if (maxSide > 1024) {
    var minSide = Math.min(drawWidth, drawHeight);
    minSide = minSide / maxSide * 1024;
    maxSide = 1024;
    if (drawWidth > drawHeight) {
      drawWidth = maxSide;
      drawHeight = minSide;
    } else {
      drawWidth = minSide;
      drawHeight = maxSide;
    }
  }
  var canvas = document.createElement('canvas');
  canvas.width=width=drawWidth;
  canvas.height=height=drawHeight;
  var context=canvas.getContext('2d');
  //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
  if(browser.versions.ios){
    switch(orientation){
      //iphone横屏拍摄，此时home键在左侧
      case 3:
        degree=180;
        drawWidth=-width;
        drawHeight=-height;
        break;
      //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
      case 6:
        canvas.width=height;
        canvas.height=width;
        degree=90;
        drawWidth=width;
        drawHeight=-height;
        break;
      //iphone竖屏拍摄，此时home键在上方
      case 8:
        canvas.width=height;
        canvas.height=width;
        degree=270;
        drawWidth=-width;
        drawHeight=height;
        break;
    }
  }
  //使用canvas旋转校正
  context.rotate(degree*Math.PI/180);
  context.drawImage(img,0,0,drawWidth,drawHeight);
  // 压缩0.5就是压缩百分之50
  var base64data = canvas.toDataURL(fileType, 0.5);
  canvas = context = null;
  return base64data;
}

module.exports = {
  compressImg: compressImg
}
