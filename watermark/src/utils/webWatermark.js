/*
 * @Author: bensong.long
 */
import {getOffsetTopBybody, getOffsetLeftBybody, getRandomInt} from './index'
const watermarkType = ['text', 'img']
const defaults = {
  type: watermarkType[0],
  container: 'body', // 默认填充整个网页容器
  txt: '文字水印测试', // 水印文字
  xStart: 20, // x轴开始位置
  yStart: 20, // y轴开始位置
  rows: 0, // 行数
  cols: 0, // 水印列数
  xSpace: 50, // 水印x轴间隔
  ySpace: 50, // 水印y轴间隔
  font: '微软雅黑', // 字体
  fontColor: 'black', // 颜色
  fontSize: '18px', // 大小
  alpha: 0.4, // 水印透明度，要求设置在大于等于0.003(0.15)
  width: 200, // 水印宽度
  height: 128, // 水印高度
  angle: 45, // 水印倾斜度数
  imgUrl: '' // 背景图url
}
export function watermark (options) {
  options = typeof options === 'string' ? {txt: options} : options
  if (document.querySelector('.watermarkBox')) {
    document.querySelector('.watermarkBox').remove()
  }
  const defaultSettings = Object.assign({}, defaults, options)
  let watermarkWidth = 0 // 区域
  let watermarkHeight = 0
  if (defaultSettings.container === 'body') {
    watermarkWidth = Math.max(document.body.scrollWidth, document.body.clientWidth)
    watermarkHeight = Math.max(document.body.scrollHeight, document.body.clientHeight)
  } else {
    watermarkWidth = Math.max(document.querySelector(`${defaultSettings.container}`).scrollWidth,
      document.querySelector(`${defaultSettings.container}`).clientWidth)
    watermarkHeight = Math.max(document.querySelector(`${defaultSettings.container}`).scrollHeight,
      document.querySelector(`${defaultSettings.container}`).clientHeight)
    // 重设x、y位置
    defaultSettings.xStart = getOffsetLeftBybody(document.querySelector(`${defaultSettings.container}`))
    defaultSettings.yStart = getOffsetTopBybody(document.querySelector(`${defaultSettings.container}`))
  }
  // 创建文档碎片
  let oFragmeng = document.createDocumentFragment()
  // 创建水印外壳div
  let watermarkBox = document.querySelector('#watermarkBox')
  if (!watermarkBox) {
    watermarkBox = document.createElement('div')
    watermarkBox.id = 'watermarkBox' + getRandomInt()
    watermarkBox.className = 'watermarkBox' // css
    watermarkBox.style.width = `${watermarkWidth}px`
    watermarkBox.style.height = `${watermarkHeight}px`
    watermarkBox.style.position = 'absolute'
    watermarkBox.style.left = `${defaultSettings.xStart}px`
    watermarkBox.style.top = `${defaultSettings.yStart}px`
  }
  // 重新计算列数 行数
  if (defaultSettings.cols === 0 ||
    (parseInt((defaultSettings.width + defaultSettings.xSpace) * defaultSettings.cols) > watermarkWidth)) {
    defaultSettings.cols = parseInt((watermarkWidth + defaultSettings.xSpace) / (defaultSettings.width + defaultSettings.xSpace)) + 1
  }
  if (defaultSettings.rows === 0 ||
    (parseInt((defaultSettings.height + defaultSettings.ySpace) * defaultSettings.rows + defaultSettings.yStart) > watermarkHeight)) {
    defaultSettings.rows = parseInt((watermarkHeight + defaultSettings.ySpace) / (defaultSettings.height + defaultSettings.ySpace)) + 1
  }
  window.onresize = _ => {
    watermark(defaultSettings)
  }
  let row = null
  for (var i = 0; i < defaultSettings.rows; i++) {
    row = document.createElement('section')
    row.className = 'watermarkRow'
    row.style.overflow = 'hidden'
    row.style.display = 'flex'
    row.style.display = '-webkit-box'
    row.style.display = '-ms-flexbox'
    for (var j = 0; j <= defaultSettings.cols; j++) {
      let item = null
      if (defaultSettings.type === 'img') {
        item = document.createElement('img')
        item.src = defaultSettings.imgUrl
      } else {
        item = document.createElement('div')
        let maskText = document.createTextNode(defaultSettings.txt)
        item.appendChild(maskText)
        item.style.fontSize = defaultSettings.fontsize
        item.style.fontFamily = defaultSettings.font
        item.style.color = defaultSettings.color
        item.style.lineHeight = `${defaultSettings.height}px`
      }
      // 设置水印div style
      item.id = 'item' + i + j
      if (j !== 0 && j !== defaultSettings.cols) {
        item.style.marginLeft = `${defaultSettings.xSpace / 2}px`
        item.style.marginRight = `${defaultSettings.xSpace / 2}px`
      }
      if (i !== 0 && i !== defaultSettings.rows - 1) {
        item.style.marginTop = `${defaultSettings.ySpace / 2}px`
        item.style.marginBottom = `${defaultSettings.ySpace / 2}px`
      }
      item.style.pointerEvents = 'none'
      item.style.webkitTransform = `rotate(-${defaultSettings.angle}deg)`
      item.style.MozTransform = `rotate(-${defaultSettings.angle}deg)`
      item.style.msTransform = `rotate(-${defaultSettings.angle}deg)`
      item.style.OTransform = `rotate(-${defaultSettings.angle}deg)`
      item.style.transform = `rotate(-${defaultSettings.angle}deg)`
      item.style.position = 'relative'
      item.style.overflow = 'hidden'
      item.style.zIndex = '9999'
      item.style.opacity = defaultSettings.alpha
      item.style.textAlign = 'center'
      item.style.width = `${defaultSettings.width}px`
      item.style.height = `${defaultSettings.height}px`
      item.style.display = 'block'
      // item.style.border = 'solid #eee 1px'
      row.appendChild(item)
    }
    watermarkBox.appendChild(row)
  }
  oFragmeng.appendChild(watermarkBox)
  document.body.appendChild(oFragmeng)
}
