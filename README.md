# webWatermark
web watermmark for common js 
实现水印有很多方法，比如写个盒子脱离文档流，用图标做背景图等。 有时候我们需要加水印的位置不是那么好确定或者水印间距等需要灵活控制的时候，使用js拼接进body也不错。
支持body、或者某个区域加水印
支持图片水印、文字水印
![图片说明1](https://github.com/ben-Run/webWatermark/blob/master/watermark/src/img/20180812-01.png?raw=true)
![图片说明1](https://github.com/ben-Run/webWatermark/blob/master/watermark/src/img/20180812-02.png?raw=true)

使用

直接使用 webWatermark.js 即可

因为水印盒子的z-index 是 9999，所以页面内容z-index设为9999即可

如果有弹出层，只需要弹出层z-index 大于9999 即可



