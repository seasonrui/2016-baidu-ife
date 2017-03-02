
var  Waterfall= function(config){
	this.box = config.box;
	this.column = config.column;
	this.oParent = document.getElementById(config.parent);
	
}

Waterfall.prototype.init = function(){
	var dataInt = {'data':[{'src':'19.jpg'},{'src':'20.jpg'},{'src':'21.jpg'},{'src':'22.jpg'}]};
	

	this.render();
	this.clickImage();

	var that = this;

	window.onscroll = function(){

		if(that.checkScrollSlide()){

			for(var i = 0;i < dataInt.data.length;i++){
				var oBox = document.createElement('div');
				oBox.className = that.box;
				that.oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				oImg = document.createElement('img');
				oImg.src = './images/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			that.render();
		}
	}
	window.onresize = function() {
		that.render();
	}
	
}
/**
*获取最小高度的列项
*
**/
Waterfall.prototype.getMinHeight = function(){

	var oBoxArr = document.querySelectorAll("."+config.box),
		hArr = [];

	function getPos(arr,val){
		for(var i in arr){
			if(arr[i] == val){
				return i;
			}
		}
	}
	//计算最小高度
	for(var i = 0;i < oBoxArr.length;i++){
		if(i < this.column){
			hArr.push(oBoxArr[i].offsetHeight);
		}else{

			minHeight = Math.min.apply(null,hArr);
			minIndex = getPos(hArr,minHeight);
			
			oBoxArr[i].style.position = 'absolute';
			oBoxArr[i].style.top = minHeight+'px';
			oBoxArr[i].style.left = oBoxArr[minIndex].offsetLeft + 'px';
			hArr[minIndex] += oBoxArr[i].offsetHeight;
		}
	}

}
/**
*渲染
*通过列项计算图片宽度，获取最小高度的列进行布局。
*/

Waterfall.prototype.render = function(){

	var minHeight,
		minIndex,
		boxWidth = this.oParent.offsetWidth/this.column,
		imgWidth = this.oParent.offsetWidth/this.column-20;

	//设置box宽度，图片宽度
	var images = document.getElementsByTagName("img");

	for(var i = 0;i < images.length;i++){
		images[i].style.width = imgWidth+'px';
	}
	this.getMinHeight();
	
}

/**
*判断是否需要加载新的图片
*@return {boolean}
*/
Waterfall.prototype.checkScrollSlide = function(){

	var boxs = document.querySelectorAll("."+this.box),
	 	lastBoxH = boxs[boxs.length-1].offsetTop + Math.floor(boxs[boxs.length-1].offsetHeight/2),
	 	scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
		clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
		console.log(boxs.length);

	return (lastBoxH < scrollTop+clientHeight) ? true : false;


}

Waterfall.prototype.clickImage = function(e){
	
	this.oParent.addEventListener('click',function(e){
		var e = e || window.event,
			target = e.target;

		if(target.tagName == 'IMG'){
			var imgSrc = target.getAttribute('src');
			// 创建一个div 显示img
			
			var displayDiv = document.createElement('div');
			displayDiv.className = 'displayImg';
			var displayImg = document.createElement('img');
			displayImg.setAttribute('src',imgSrc);
			displayDiv.appendChild(displayImg);
			document.body.appendChild(displayDiv);

			displayDiv.addEventListener('click',function(e){
				var e = e || window.event,
				target = e.target;
				if(target.tagName == 'IMG'){
					e.preventDefault();
				}else{
					this.style.display = 'none';
				}	
			})
		}

	})
	
}

