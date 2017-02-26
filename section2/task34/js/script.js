window.onload = function(){


	var row = 5,
		cell = 5,
		rotate = 0,
		orient = 1;//up:1;right2;down:3;left:4
		
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
		$('box').style.transition = 'left 0.8s,top 0.8s,transform 0.8s';
		$('box').style.background = 'red';
		

	}

	var command = {
		Go:function(rotate){
			
			var orient = rotate/90%4;

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
				case -1:case 3:
					cell = cell>1?cell-1:cell;
					break;
			}
			boxPos(row,cell);
		},
		TraLef:function(){
			cell = cell>1?cell-1:cell;
			boxPos(row,cell);
		},
		TraTop:function(){
			row = row>1?row-1:row;
			boxPos(row,cell);
		},
		TraRig:function(){
			cell = cell<10?cell+1:cell;
			boxPos(row,cell);
		},
		TraBot:function(){
			row = row<10?row+1:row;
			boxPos(row,cell);
		},
		MovLef:function(orient){
			rotate = (4-orient)*90;
			$('box').style.transform = 'rotate(' + rotate + 'deg)';
			orient = 4;
			cell = cell>1?cell-1:cell;
			boxPos(row,cell);
		},
		MovTop:function(orient){
			rotate = (1-orient)*90;
			$('box').style.transform = 'rotate(' + rotate + 'deg)';
			orient = 1;
			row = row>1?row-1:row;
			boxPos(row,cell);
		},
		MovRig:function(orient){
			rotate = (2-orient)*90;
			$('box').style.transform = 'rotate(' + rotate + 'deg)';
			orient = 2;
			cell = cell<10?cell+1:cell;
			boxPos(row,cell);
		},
		MovBot:function(orient){
			rotate = (3-orient)*90;
			$('box').style.transform = 'rotate(' + rotate + 'deg)';
			orient = 3;
			row = row<10?row+1:row;
			boxPos(row,cell);
		}
	};
	function checkInput(){
		var value = $('inValue').value.toUpperCase();
		switch(value){
			case 'GO':command.Go(rotate);break;
			case 'TRA LEF':command.TraLef();break;
			case 'TRA TOP':command.TraTop();break;
			case 'TRA RIG':command.TraRig();break;
			case 'TRA BOT':command.TraBot();break;
			case 'MOV TOP':command.MovTop(orient);break;
			case 'MOV LEF':command.MovLef(orient);break;
			case 'MOV RIG':command.MovRig(orient);break;
			case 'MOV BOT':command.MovBot(orient);break;
		}
	}
	//绑定各个按钮
	addEvent($('TraLef'),'click',function(){
		command.TraLef();
	});
	addEvent($('TraTop'),'click',function(){
		command.TraTop();
	});
	addEvent($('TraRig'),'click',function(){
		command.TraRig();
	});
	addEvent($('TraBot'),'click',function(){
		command.TraBot();
	});
	addEvent($('MovTop'),'click',function(){
		command.MovTop(orient);
	});
	addEvent($('MovLef'),'click',function(){
		command.MovLef(orient);
	});
	addEvent($('MovRig'),'click',function(){
		command.MovRig(orient);
	});
	addEvent($('MovBot'),'click',function(){
		command.MovBot(orient);
	});

	//处理输入指令
	addEvent($('command'),'click',function(){
		checkInput();
	});

	//绑定方向键与enter键
	addEvent(document,'keydown',function(e){
		var e = e || window.event;
		switch(e.keyCode){
			case 37:command.MovLef(orient);e.preventDefault();break;
			case 38:command.MovTop(orient);e.preventDefault();break;
			case 39:command.MovRig(orient);e.preventDefault();break;
			case 40:command.MovBot(orient);e.preventDefault();break;
			case 13:checkInput();break;

		}
	});
	//初始化
	boxPos(row,cell);
	
	window.onresize = function(){
		boxPos(row,cell);
	}
}
