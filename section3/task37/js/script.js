function $(id){
	return document.getElementById(id);
}

function Dialog(config){
	this.triggerEle = $(config.id);
	this.title = config.title || '提示';
	this.content = config.content || '这是内容';
	this.width = config.width;
	this.height = config.height;
	
}

Dialog.prototype.init = function (config) {
	//  如果有则不创建
	var that = this;
	this.addHandler(this.triggerEle, 'click', function(){
		that.createDialog();
	});
}
Dialog.prototype.addHandler = function (element,type,handler) {
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	}else if(element.attachEvent){
		element.attachEvent('on'+type,handler);
	}else{
		element['on'+type]=handler;
	}
}

Dialog.prototype.createDialog = function () {

	// body添加dialog
	this.dialog = document.createElement('div');
	this.dialog.id = 'dialog';
	var str = '<div class="dialog-header" id="dialog-header">' + this.title + '</div><div class="dialog-body">' + this.content + '</div><div class="dialog-footer"><button class="btn" id="confirm">确认</button><button class="btn" id="cancel">取消</button></div>';
	this.dialog.innerHTML = str;
	document.body.appendChild(this.dialog);

	// body添加mask
	this.mask = document.createElement('div');
	this.mask.id = 'mask';
	document.body.appendChild(this.mask);

	//绑定消失事件
	var that = this;
	this.addHandler(mask, 'click', function(){
		that.hidden();
	});
	this.addHandler($('confirm'), 'click', function(){
		that.hidden();
	});
	this.addHandler($('cancel'), 'click', function(){
		that.hidden();
	});
	this.drag($('dialog-header'), this.dialog);
}

Dialog.prototype.hidden = function () {
	document.body.removeChild(this.dialog);
	document.body.removeChild(this.mask);
}

/**
* 拖拽效果
* @param { Object } 触发拖拽的DOM元素
* @param { Object } 要进行拖拽的DOM元素
*/
Dialog.prototype.drag = function (target, movElem) {
	//可视区域高度
    var clientWidth = document.documentElement.clientWidth,
        clientHeight = document.documentElement.clientHeight,
        isDraging = false,
        mouseX,
        mouseY;
    //鼠标按下，标记为可拖动，获取相对距离
    var down = function(e){
        var e = e || window.event;
        console.log(e);
        isDraging = true;
        mouseX = e.pageX - movElem.offsetLeft;
        mouseY = e.pageY - movElem.offsetTop;
        
    }
    var that = this;
    //鼠标移动
    var move = function(e){
        var e = e || window.event;
        if(isDraging === true){
        	that.dialog.style.margin = '0px';
            var moveX = e.pageX - mouseX,
                moveY = e.pageY - mouseY,
                //限定范围 moveX>0 并且moveX<(页面最大宽度-浮层宽度)
                movElemWidth = movElem.offsetWidth,
                movElemHeight = movElem.offsetHeight,
                maxX = clientWidth - movElemWidth,
                maxY = clientHeight - movElemHeight;

            moveX = Math.min(maxX,Math.max(0,moveX));
            moveY = Math.min(maxY,Math.max(0,moveY));

            
            movElem.style.left = moveX + 'px';
            movElem.style.top = moveY + 'px';
        }
    }
    //鼠标抬起
    var up = function(e){
        isDraging = false;
    }
    this.addHandler(target, 'mousedown', down);
    this.addHandler(movElem, 'mousemove', move);
    this.addHandler(document, 'mouseup', up);

}

