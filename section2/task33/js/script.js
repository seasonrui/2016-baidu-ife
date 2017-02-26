(function(){

	var row = 10,
		cell = 5,
		rotate = 0;
		
	function $(ele){
		return document.getElementById(ele);
	}
	/**
	* 绑定事件处理程序以解决浏览器兼容性
	* @param {object} elem 绑定事件的元素
	* @param {string} type 事件类型
	* @param {function} handler 事件处理程序
	*/
	function addEvent(elem,type,handler){
		if(elem.addEventListener){
			elem.addEventListener(type,handler,false);
		}else if(elem.attachEvent){
			elem.attachEvent('on'+type,handler);
		}else{
			elem['on'+type] = handler;
		}
	}
	/**
	* 根据行列定位盒子位置
	* @param {number} row 行
	* @param {number} cell 列
	*/
	function boxPos(row,cell){
		var boxPosition = $('table').rows[row].cells[cell];
		var left = boxPosition.getBoundingClientRect().left+document.body.scrollLeft+1,
			top = boxPosition.getBoundingClientRect().top+document.body.scrollTop+1;
		$('box').style.left = left+ 'px';
		$('box').style.top = top+ 'px';
		$('box').style.background = 'red';
	}

	var command = {
		/**
		* 根据旋转角度定位盒子的方向
		* @param {number} rotate 角度 
		**/
		go:function(rotate){
			var orient = rotate/90%4;
			console.log('orient:'+orient);
			switch(orient){
				case 0: 
					row = row>1?row-1:row;
					break;
				case 1:case -3:
					cell = cell<10?cell+1:cell;
					break;
				case 2:case -2: 
					row = row<10?row+1:row;
					break;
				case 3:case -1:
					cell = cell>1?cell-1:cell;
					break;
			}
			boxPos(row,cell);
		},
		turnLeft:function(){
			rotate -= 90;
			$('box').style.transform = 'rotate(' + rotate + 'deg)';
		},
		turnRight:function(){
			rotate += 90;
			$('box').style.transform = 'rotate(' + rotate + 'deg)';
		},
		turnBack:function(){
			rotate += 180;
			$('box').style.transform = 'rotate(' + rotate + 'deg)';
		}	
	};

	boxPos(row,cell);
	
	addEvent($('go'),'click',function(){
		command.go(rotate);
	});
	addEvent($('turnLeft'),'click',function(){
		command.turnLeft();
	});
	addEvent($('turnRight'),'click',function(){
		command.turnRight();
	});
	addEvent($('turnBack'),'click',function(){
		command.turnBack();
	});

	addEvent($('command'),'click',function(){
		var value = $('inValue').value.toLowerCase();
		switch(value){
			case 'go':
				command.go(rotate);
				break;
			case 'tun lef':
				command.turnLeft();
				break;
			case 'tun rig':
				command.turnRight();
				break;
			case 'tun bac':
				command.turnBack();
				break;
		}
	});

	window.onresize = function(){
		boxPos(row,cell);
	}


})();