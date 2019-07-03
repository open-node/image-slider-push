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
const Slider = ({ width, sleep, container, dy, queue, max }) => {
  if (!container || !container.appendChild) throw Error(`指定容器不存在`);

  width = Math.max(+width, 0) || 600;

  const images = []; // 已经加载的图片的队列
  const MAX_IMAGES = Math.max(3, max | 0); // 最大同时显示图片数量
  sleep = Math.max(10, sleep);
  dy = Math.max(1, dy | 0);

  // 加载的图片序号从0开始递增
  let _index = 0;

  // 获取当前图片前一个图片的底部位置
  const getBottom = img => {
    if (!img) return 0;
    return img.height + (parseInt(img.style.top, 10) | 0);
  };

  // 向上推
  const slide = () => {
    if (!images.length) return setTimeout(slide, 100);
    images.forEach(img => {
      img.style.top = (parseInt(img.style.top, 10) | 0) - dy;
    });
    if (getBottom(images[0]) < -10) showImage(images.shift());
    setTimeout(slide, sleep);
  };

  // 显示一张图片
  const showImage = img => {
    if (!queue.length) return setTimeout(showImage.bind(null, img), 100);
    images.push(img);
    img.src = queue.pop();
  };

  const init = () => {
    for (let i = 0; i < MAX_IMAGES; i += 1) {
      const img = new Image();
      img.width = width;
      img.style.position = "absolute";
      img.style.top = 0;
      img.style.zIndex = 999 - i;
      container.appendChild(img);

      img.onload = () => {
        let init = parseInt(images[0].style.top, 10) | 0;
        for (const x of images) {
          x.style.top = init;
          init += x.height;
        }
      };
      showImage(img);
    }
    slide();
  };

  init();
};

module.exports = Slider;
