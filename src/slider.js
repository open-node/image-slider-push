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
const Slider = ({ width, sleep, container, dy, queue }) => {
  if (!container || !container.appendChild) throw Error(`指定容器不存在`);

  width = Math.max(+width, 0) || 600;

  const images = []; // 已经加载的图片的队列
  const MAX_IMAGES = 3; // 最大同时显示图片数量

  // 加载的图片序号从0开始递增
  let _index = 0;

  // 获取当前图片前一个图片的底部位置
  const getBottom = img => {
    if (!img) return 0;
    return Math.max(0, img.height + parseInt(img.style.top, 10));
  };

  // 向上推
  const slide = () => {
    if (!images.length) return setTimeout(slide, 100);
    images.forEach(img => {
      const v = parseInt(img.style.top, 10);
      img.style.top = `${v - dy}px`;
    });
    setTimeout(slide, sleep);
  };

  // 显示一张图片
  const showImage = () => {
    while (images.length && getBottom(images[0]) <= 0) {
      container.removeChild(images.pop());
    }

    if (MAX_IMAGES <= images.length) return setTimeout(showImage, 100);
    if (!queue.length) return setTimeout(showImage, 100);
    const img = new Image();
    img.width = width;

    // 图片压入队列
    img.onload = () => {
      img.style.position = "absolute";
      img.style.top = `${getBottom(images[images.length - 1])}px`;
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
