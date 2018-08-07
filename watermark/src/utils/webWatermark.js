/*
 * @Author: bensong.long
 */
const watermarkType = ['text', 'img']
const defaults = {
  watermark_type: watermarkType[0],
  watermark_box: 'body',
  watermark_txt: '文字水印测试',
  watermark_x: 20,
  watermark_y: 20,
  watermark_rows: 0, // 行数
  watermark_cols: 0, // 水印列数
  watermark_x_space: 0, // 水印x轴间隔
  watermark_y_space: 0, // 水印y轴间隔
  watermark_font: '微软雅黑',
  watermark_color: 'black',
  watermark_fontsize: '18px',
  watermark_alpha: 0.4, // 水印透明度，要求设置在大于等于0.003(0.15)
  watermark_width: 200, // 水印宽度
  watermark_height: 128, // 水印高度
  watermark_angle: 0, // 水印倾斜度数
  imgUrl: '' // 背景图url
}
export function watermark (options) {
  if (typeof options === 'string') {
    options = {watermark_txt: options}
  }
  if (document.querySelector('#watermarkBox')) {
    document.querySelector('#watermarkBox').remove()
  }
  const defaultSettings = Object.assign({}, defaults, options)
  let pageWidth = 0
  let pageHeight = 0
  if (defaultSettings.watermark_box === 'body') {
    pageWidth = Math.max(document.body.scrollWidth, document.body.clientWidth)
    pageHeight = Math.max(document.body.scrollHeight, document.body.clientHeight)
  } else {
    pageWidth = Math.max(document.querySelector(`#${defaultSettings.watermark_box}`).scrollWidth, document.querySelector(`#${defaultSettings.watermark_box}`).clientWidth)
    pageHeight = Math.max(document.querySelector(`#${defaultSettings.watermark_box}`).scrollHeight, document.querySelector(`#${defaultSettings.watermark_box}`).clientHeight)
    // 重设x、y位置
    defaultSettings.watermark_x = document.querySelector(`#${defaultSettings.watermark_box}`).offsetLeft
    defaultSettings.watermark_y = document.querySelector(`#${defaultSettings.watermark_box}`).offsetTop + 85
  }
  // 创建文档碎片
  let watermarkDF = document.createDocumentFragment()
  // 创建水印外壳div
  let watermarkBox = document.querySelector('#watermarkBox')
  if (!watermarkBox) {
    watermarkBox = document.createElement('div')
    watermarkBox.id = 'watermarkBox'
    watermarkBox.className = 'watermarkBox' // css
    watermarkBox.style.width = `${pageWidth}px`
    watermarkBox.style.height = `${pageHeight}px`
    watermarkBox.style.position = 'absolute'
    watermarkBox.style.left = `${defaultSettings.watermark_x}px`
    watermarkBox.style.top = `${defaultSettings.watermark_y}px`
  }
  // 如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
  if (defaultSettings.watermark_cols === 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width * defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > pageWidth)) {
    defaultSettings.watermark_cols = parseInt((pageWidth) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space)) + 2
    // defaultSettings.watermark_x_space = parseInt((pageWidth - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1))
  }
  // 如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
  if (defaultSettings.watermark_rows === 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > pageHeight)) {
    defaultSettings.watermark_rows = parseInt(pageHeight / (defaultSettings.watermark_height + defaultSettings.watermark_y_space))
  }
  // 如果超出30px 按照正常行数填充
  if ((defaultSettings.watermark_height + defaultSettings.watermark_y_space) * defaultSettings.watermark_rows - pageHeight < -30) {
    defaultSettings.watermark_rows = defaultSettings.watermark_rows - 1
    pageHeight = pageHeight - (defaultSettings.watermark_y_space + defaultSettings.watermark_height)
  }
  window.onresize = _ => {
    watermark(defaultSettings)
  }
  // let x = ''
  // let y = ''
  for (var i = 0; i < defaultSettings.watermark_rows; i++) {
    // y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i
    for (var j = 0; j < defaultSettings.watermark_cols; j++) {
      // x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j
      let maskDiv = ''
      if (defaultSettings.watermark_type === 'img') {
        maskDiv = document.createElement('img')
        maskDiv.src = defaultSettings.imgUrl
        maskDiv.style.height = `${defaultSettings.watermark_height}px`
      } else {
        maskDiv = document.createElement('div')
        let maskText = document.createTextNode(defaultSettings.watermark_txt)
        maskDiv.appendChild(maskText)
        maskDiv.style.fontSize = defaultSettings.watermark_fontsize
        maskDiv.style.fontFamily = defaultSettings.watermark_font
        maskDiv.style.color = defaultSettings.watermark_color
        maskDiv.style.height = `${defaultSettings.watermark_height}px`
      }
      // 设置水印div style
      maskDiv.id = 'maskDiv' + i + j
      maskDiv.style.pointerEvents = 'none'
      maskDiv.style.webkitTransform = `rotate(-${defaultSettings.watermark_angle}deg)`
      maskDiv.style.MozTransform = `rotate(-${defaultSettings.watermark_angle}deg)`
      maskDiv.style.msTransform = `rotate(-${defaultSettings.watermark_angle}deg)`
      maskDiv.style.OTransform = `rotate(-${defaultSettings.watermark_angle}deg)`
      maskDiv.style.transform = `rotate(-${defaultSettings.watermark_angle}deg)`
      maskDiv.style.visibility = ''
      maskDiv.style.position = 'private'
      maskDiv.style.overflow = 'hidden'
      maskDiv.style.zIndex = '9999'
      maskDiv.style.opacity = defaultSettings.watermark_alpha
      maskDiv.style.textAlign = 'center'
      maskDiv.style.width = `${defaultSettings.watermark_width}px`
      maskDiv.style.display = 'block'
      // maskDiv.style.marginRight = `${defaultSettings.watermark_x_space}px`
      maskDiv.style.marginBottom = `${defaultSettings.twatermark_y_space}px`
      // maskDiv.style.border = 'solid #eee 1px'
      watermarkBox.appendChild(maskDiv)
    }
  }
  watermarkDF.appendChild(watermarkBox)
  document.body.appendChild(watermarkDF)
}
