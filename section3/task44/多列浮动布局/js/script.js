
var  Waterfall= function(config) {
	this.element = document.querySelector('#'+config.gallary);
}

Waterfall.prototype.init = function() {
	var dataInt = {'data':[{'src':'4.jpg'},{'src':'5.jpg'},{'src':'6.jpg'}]};
	var that = this;
	that.clickImage();
	window.onscroll = function () {
		if(that.checkScrollSlide()){
			console.log(dataInt.data.length)
			for(var i = 0;i < dataInt.data.length;i++) {
				var liElment = document.createElement('li');
				var str = '<div><img src="images/'+dataInt.data[i].src+'"></div>';
				liElment.innerHTML = str;
				that.getMinhColumn().appendChild(liElment);
			}
		}	
	}
}


/**
* 获取最小高度列项
* @return {obj}
*/
Waterfall.prototype.getMinhColumn = function() {

	var oColumns = document.querySelectorAll('.wf_col');
	var j = 0;
	var minColumn = oColumns[0];
	for(var i = 1;i < oColumns.length;i++){
		if(oColumns[i].offsetHeight < minColumn.offsetHeight){
			minColumn = oColumns[i];
			j = i;
		}
		
	}
	console.log(j);
	return minColumn;

}

/**
*判断是否需要加载新的图片
*@return {boolean}
*/
Waterfall.prototype.checkScrollSlide = function(){

	var height = this.getMinhColumn().offsetTop + Math.floor(this.getMinhColumn().offsetHeight/2),
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
		clientHeight = document.body.clientHeight || document.documentElement.clientHeight;

	return (height < scrollTop+clientHeight) ? true : false;
}
/**
*点击图片显示
*
*/
Waterfall.prototype.clickImage = function(e){
	
	this.element.addEventListener('click',function(e){
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

