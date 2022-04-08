"use strict";

(function () {
  //获取网页宽高兼容方法
  function getScreen() {
    var width, height;

    if (window.innerWidth) {
      width = window.innerWidth;
      height = window.innerHeight;
    } else if (document.compatMode === 'BackCompat') {
      width = document.body.clientWidth;
      height = document.body.clientHeight;
    } else {
      width = document.documentElement.clientWidth;
      height = document.documentElement.clientHeight;
    }

    return {
      width: width,
      height: height
    };
  } //获取网页滚动距离


  function getPageScroll() {
    var x, y;

    if (window.pageYOffset) {
      x = window.pageXOffset;
      y = window.pageYOffset;
    } else if (document.compatMode === 'BackCompat') {
      x = document.body.scrollLeft;
      y = document.body.scrollTop;
    } else {
      x = document.documentElement.scrollLeft;
      y = document.documentElement.scrollTop;
    }

    return {
      x: x,
      y: y
    };
  } //添加事件


  function addEvent(ele, name, fn) {
    if (ele.attachEvent) {
      ele.attachEvent('on' + name, fn);
    } else {
      ele.addEventListener(name, fn);
    }
  } //获取元素属性


  function getStyleAttr(obj, name) {
    if (obj.currentStyle) {
      return obj.currentStyle[name];
    } else {
      return getComputedStyle(obj)[name];
    }
  } //高级时间格式化fmt格式可为yyyy-MM-dd hh:mm:ss


  function dateFormat(fmt, date) {
    //1.处理年
    //1.1找到yyyy
    // + 在正则表达式中表示匹配1个或多个连续的指定字符 
    //let reg = /y+/;
    var yearStr = fmt.match(/y+/);

    if (yearStr) {
      yearStr = yearStr[0]; //1.2获取到当前的年

      var yearNum = date.getFullYear() + ''; //'2019'

      yearNum = yearNum.substr(4 - yearStr.length); //1.3利用当前的年替换掉yyyy

      fmt = fmt.replace(yearStr, yearNum);
    } //2.处理其他的时间


    var obj = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds()
    };

    for (var key in obj) {
      var reg = new RegExp("".concat(key)); //取出格式化字符串中对应的格式字符 MM dd hh mm ss

      var fmtStr = fmt.match(reg);

      if (fmtStr) {
        fmtStr = fmtStr[0]; //单独处理一位或者两位的时间

        if (fmtStr.length == 1) {
          //一位
          fmt = fmt.replace(fmtStr, obj[key]);
        } else {
          //两位
          var numStr = '00' + obj[key]; // '00' + 4 = '004'
          // '00' + 12 = '0012'

          numStr = numStr.substr((obj[key] + '').length);
          fmt = fmt.replace(fmtStr, numStr);
        }
      }
    } //3.将格式化之后的字符串返回


    return fmt;
  } //防抖函数封装


  function debounce(fn, delay) {
    var timerId = null;
    return function () {
      var self = this;
      var args = arguments;
      timerId && clearTimeout(timerId);
      timerId = setTimeout(function () {
        fn.apply(self, args);
      }, delay || 1000);
    };
  } //节流函数封装


  function throttle(fn, delay) {
    var timerId = null;
    var flag = true;
    return function () {
      if (!flag) return;
      flag = false;
      var self = this;
      var args = arguments;
      timerId && clearTimeout(timerId);
      timerId = setTimeout(function () {
        flag = true;
        fn.apply(self, args);
      }, delay || 1000);
    };
  }

  window.getScreen = getScreen;
  window.getPageScroll = getPageScroll;
  window.addEvent = addEvent;
  window.getStyleAttr = getStyleAttr;
  window.dateFormat = dateFormat;
  window.debounce = debounce;
  window.throttle = throttle;
})();