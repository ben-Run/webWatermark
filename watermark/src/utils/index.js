/**
 *获取到body的垂直距离
 * @export
 * @param {*} el
 * @returns
 */
export function getOffsetTopBybody (el) {
  let offsetTop = 0
  while (el && el.tagName !== 'body') {
    offsetTop += el.offsetTop
    el = el.offsetParent
  }
  return offsetTop
}
/**
 *获取到body的水平距离
 * @export
 * @param {*} el
 * @returns
 */
export function getOffsetLeftBybody (el) {
  let offsetLeft = 0
  while (el && el.tagName !== 'body') {
    offsetLeft += el.offsetLeft
    el = el.offsetParent
  }
  return offsetLeft
}
/**
 * 随机数
 * @param min{Number}
 * @param max{Number}
 * @returns {Number}
 */
export function getRandomInt (min = 1, max = 99999) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
