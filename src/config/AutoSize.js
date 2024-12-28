// 封装 rem + js 移动端适配方案
export function AutoSize() {
    //设计稿的宽度
    var psdWidth = 750;
  
    //预设字体值
    var preFontSize = 100;
  
    //当前屏幕宽度
    var curScreenWidth = document.documentElement.clientWidth;
    //当前屏幕对应的html字体值
    var curFontSize = (curScreenWidth * preFontSize) / psdWidth;
  
    //设备宽度在750px 
    if (curScreenWidth > 750) {
      curScreenWidth = 750;
    }
    //把计算下来的当前屏幕html字体值 赋值给html元素 documentElement属性会获取到html根元素 然后为之设置字体值
    document.documentElement.style.fontSize = curFontSize + "px";
}
  