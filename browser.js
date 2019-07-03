(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Slider = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/**
 * config 结构
 * {
 *   width: 600, // 图片宽度
 *   sleep: 1, // 每次移动完毕停留多久
 *   dy: 1, // 每次推送的像素
 *   container: element, // 展示容器 dom 节点
 *   queue: array, // 要显示的图片队列
 *   max: number // 容器内最多容纳的图片数量
 * }
 */
var Slider = function Slider(_ref) {
  var width = _ref.width,
      sleep = _ref.sleep,
      container = _ref.container,
      dy = _ref.dy,
      queue = _ref.queue,
      max = _ref.max;

  if (!container || !container.appendChild) throw Error("\u6307\u5B9A\u5BB9\u5668\u4E0D\u5B58\u5728");

  width = Math.max(+width, 0) || 600;

  var images = []; // 已经加载的图片的队列
  var MAX_IMAGES = Math.max(3, max | 0); // 最大同时显示图片数量
  sleep = Math.max(10, sleep);
  dy = Math.max(1, dy | 0);

  // 加载的图片序号从0开始递增
  var _index = 0;

  // 获取当前图片前一个图片的底部位置
  var getBottom = function getBottom(img) {
    if (!img) return 0;
    return img.height + (parseInt(img.style.top, 10) | 0);
  };

  // 向上推
  var slide = function slide() {
    if (!images.length) return setTimeout(slide, 100);
    images.forEach(function (img) {
      img.style.top = (parseInt(img.style.top, 10) | 0) - dy;
    });
    if (getBottom(images[0]) < -10) showImage(images.shift());
    setTimeout(slide, sleep);
  };

  // 显示一张图片
  var showImage = function showImage(img) {
    if (!queue.length) return setTimeout(showImage.bind(null, img), 100);
    images.push(img);
    img.src = queue.pop();
  };

  var init = function init() {
    for (var i = 0; i < MAX_IMAGES; i += 1) {
      var img = new Image();
      img.width = width;
      img.style.position = "absolute";
      img.style.top = 0;
      img.style.zIndex = 999 - i;
      container.appendChild(img);

      img.onload = function () {
        var init = parseInt(images[0].style.top, 10) | 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var x = _step.value;

            x.style.top = init;
            init += x.height;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      };
      showImage(img);
    }
    slide();
  };

  init();
};

module.exports = Slider;
},{}]},{},[1])(1)
});
