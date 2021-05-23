(function(){
  function Waterfall(opt){
    this.el = document.getElementById(opt.el);
    this.oItems = this.el.getElementsByTagName('div');
    this.column = opt.column;
    this.gap = opt.gap;
    this.itemWidth = (this.el.offsetWidth - (this.column - 1) * this.gap) / this.column;
    this.heightArr = [];

    this.init();
  }

  Waterfall.prototype.init = function(){
    this.render();
  }

  Waterfall.prototype.render = function(){
    var item = null, minIndex = -1;
    for(var i = 0; i < this.oItems.length; i++){
      item = this.oItems[i];
      item.style.width = this.itemWidth + 'px';
      if(i < this.column){
        // 第一排的top是0; left是前几个的宽度+间隔宽度
        item.style.top = 0;
        item.style.left = i * (this.itemWidth + this.gap) + 'px';
        this.heightArr.push(item.offsetHeight);
      }else{
        console.log(this.heightArr);
        // 后面的放入高度最小的那一列，left值不变，top是最小那一列的高度
        minIndex = getMinIndex(this.heightArr);
        item.style.top = this.heightArr[minIndex] + this.gap + 'px'
        console.log(item.style.top);
        item.style.left = this.oItems[minIndex].style.left;
        // 更新最小那一列的高度
        this.heightArr[minIndex] += item.offsetHeight;
        
      }
    }
  }

  /**
   * 获取数组中最小值的索引
   * @param {*} arr 
   * @returns 
   */
  function getMinIndex(arr){
    return arr.indexOf(Math.min.apply(null, arr))
  }
  window.Waterfall = Waterfall;
})();