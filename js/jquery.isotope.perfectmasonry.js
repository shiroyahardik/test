;(function($,undefined){var version='1.2.1';var isotope=null,$context=null,$container=null,isFirstRun=true;$.extend($.Isotope.prototype,{_perfectMasonryReset:function(){var isVertical=this.options.perfectMasonry.layout!='horizontal',isLiquid=this.options.perfectMasonry.liquid==true;if(isFirstRun){isFirstRun=false;isotope=this;$context=$(this.element.context);$container=$context.parent();}
this.options.perfectMasonry.minCols=this.options.perfectMasonry.minCols||1;this.options.perfectMasonry.minRows=this.options.perfectMasonry.minRows||1;this.options.perfectMasonry.maxCols=this.options.perfectMasonry.maxCols||9999;this.options.perfectMasonry.maxRows=this.options.perfectMasonry.maxRows||9999;var properties=this.perfectMasonry={};this._getSegments();this._getSegments(true);this._perfectMasonryGetSegments();if(isLiquid){var width=$(this.element.context).parent().width(),height=$(this.element.context).parent().height();this.options.perfectMasonry.columnWidth=this.options.perfectMasonry.columnWidth||properties.columnWidth;this.options.perfectMasonry.rowHeight=this.options.perfectMasonry.rowHeight||properties.rowHeight;properties.cols=this.options.perfectMasonry.cols||Math.floor(width/this.options.perfectMasonry.columnWidth);properties.rows=this.options.perfectMasonry.rows||Math.floor(height/this.options.perfectMasonry.rowHeight);properties.cols=Math.min(Math.max(properties.cols,this.options.perfectMasonry.minCols),this.options.perfectMasonry.maxCols);properties.rows=Math.min(Math.max(properties.rows,this.options.perfectMasonry.minRows),this.options.perfectMasonry.maxRows);var diff=(isVertical?properties.columnWidth/(width/properties.cols):properties.rowHeight/(height/properties.rows));properties.columnWidth=Math.floor(properties.columnWidth/diff);properties.rowHeight=Math.floor(properties.rowHeight/diff);}
properties.grid=new Array(this.perfectMasonry.cols);properties.containerHeight=0;properties.containerWidth=0;},_perfectMasonryLayout:function($elems){var instance=this,properties=this.perfectMasonry,isVertical=instance.options.perfectMasonry.layout!='horizontal',isLiquid=instance.options.perfectMasonry.liquid==true;properties.grid=new Array(properties[(isVertical?'cols':'rows')]);$elems.each(function(){var $this=$(this);var colSpan=(isLiquid?$this.data('colSpan'):Math.ceil($this.outerWidth()/ (properties.columnWidth + 1))),
rowSpan=(isLiquid?$this.data('rowSpan'):Math.ceil($this.outerHeight()/ (properties.rowHeight + 1)));
if(!colSpan){colSpan=Math.ceil($this.outerWidth(true)/ (properties.columnWidth + 1));
rowSpan=Math.ceil($this.outerHeight(true)/ (properties.rowHeight + 1));
$this.data('colSpan',colSpan);$this.data('rowSpan',rowSpan);}
var aSpan=(isVertical?colSpan:rowSpan);var bSpan=(isVertical?rowSpan:colSpan);var max=Math.max((isVertical?properties.cols- colSpan:properties.rows- rowSpan)+ 1,1);var a=-1,x=0,y=0;while(++a<10000){properties.grid[a]=properties.grid[a]||[];for(var b=0;b<max;b++){var tile=properties.grid[a][b];if(tile){continue;}
var doesFit=true;if(colSpan>1||rowSpan>1){for(var i=0;i<aSpan;i++){for(var j=0;j<bSpan;j++){properties.grid[a+j]=properties.grid[a+j]||[];if(properties.grid[a+j][b+i]){doesFit=false;break;}}
if(!doesFit){break;}}}
if(!doesFit){continue}
for(var i=0;i<aSpan;i++){for(var j=0;j<bSpan;j++){properties.grid[a+j][b+i]=true;}}
var x=a,y=b;if(isVertical){var x=b,y=a;}
properties.containerWidth=Math.max(properties.containerWidth,(x+ aSpan)*properties.columnWidth);properties.containerHeight=Math.max(properties.containerHeight,(y+ bSpan)*properties.rowHeight);if(instance.options.perfectMasonry.liquid==true){$this.css({width:properties.columnWidth*colSpan,height:properties.rowHeight*rowSpan});}
instance._pushPosition($this,x*properties.columnWidth,y*properties.rowHeight);return;}}
instance._pushPosition($this,-9999,-9999);});var rows=(isVertical?properties.grid.length:properties.grid[0].length),cols=(isVertical?properties.grid[0].length:properties.grid.length);$(this.element.context).attr('data-isotope-rows',rows).attr('data-isotope-cols',cols);},_perfectMasonryGetContainerSize:function(){return{width:this.perfectMasonry.containerWidth,height:this.perfectMasonry.containerHeight};},_perfectMasonryResizeChanged:function(){var properties=this.perfectMasonry;var oldCols=properties.cols,oldRows=properties.rows;this._perfectMasonryGetSegments();if(this.options.perfectMasonry.layout=='horizontal'&&oldRows!==properties.rows){return true;}
if(oldCols!==properties.cols){return true;}
return false;},_perfectMasonryGetSegments:function(){var properties=this.perfectMasonry;var parent=this.options.perfectMasonry.parent||this.element.parent();var parentWidth=parent.width();properties.cols=Math.floor(parentWidth/properties.columnWidth)||1;var parentHeight=parent.height();properties.rows=Math.floor(parentHeight/properties.rowHeight)||1;}});})(jQuery);