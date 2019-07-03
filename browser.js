(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Slider = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/**
 * config 结构
 * {
 *   width: 600, // 图片宽度
 *   sleep: 1, // 每次移动完毕停留多久
 *   dy: 1, // 每次推送的像素
 *   container: element, // 展示容器 dom 节点
 *   queue: array // 要显示的图片队列
 * }
 */
var Slider = function Slider(_ref) {
  var width = _ref.width,
      sleep = _ref.sleep,
      container = _ref.container,
      dy = _ref.dy,
      queue = _ref.queue;

  if (!container || !container.appendChild) throw Error("\u6307\u5B9A\u5BB9\u5668\u4E0D\u5B58\u5728");

  width = Math.max(+width, 0) || 600;

  var images = []; // 已经加载的图片的队列
  var MAX_IMAGES = 3; // 最大同时显示图片数量

  // 加载的图片序号从0开始递增
  var _index = 0;

  // 获取当前图片前一个图片的底部位置
  var getBottom = function getBottom(img) {
    if (!img) return 0;
    return Math.max(0, img.height + parseInt(img.style.top, 10));
  };

  // 向上推
  var slide = function slide() {
    if (!images.length) return setTimeout(slide, 100);
    images.forEach(function (img) {
      var v = parseInt(img.style.top, 10);
      img.style.top = v - dy + "px";
    });
    setTimeout(slide, sleep);
  };

  // 显示一张图片
  var showImage = function showImage() {
    while (images.length && getBottom(images[0]) <= 0) {
      container.removeChild(images.pop());
    }

    if (MAX_IMAGES <= images.length) return setTimeout(showImage, 100);
    if (!queue.length) return setTimeout(showImage, 100);
    var img = new Image();
    img.width = width;

    // 图片压入队列
    img.onload = function () {
      img.style.position = "absolute";
      img.style.top = getBottom(images[images.length - 1]) + "px";
      container.appendChild(img);
      images.push(img);
      setTimeout(showImage, 100);
    };

    // 开始加载图片
    img.src = queue.pop();
  };

  showImage();
  slide();
};

module.exports = Slider;
},{}]},{},[1])(1)
});
