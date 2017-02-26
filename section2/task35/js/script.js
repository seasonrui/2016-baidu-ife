(function(){

	var row = 5,
		cell = 5,
		rotate = 0,
		orient = 1,//up:1;right2;down:3;left:4
		id = 1;
	var queue = new Array();
	var queueNum = new Array();
		
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
			orient = 3;
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
		},
		TurnLeft:function(){
			rotate -= 90;
			$('box').style.transform = 'rotate(' + rotate + 'deg)';
		},
		TurnRight:function(){
			rotate += 90;
			$('box').style.transform = 'rotate(' + rotate + 'deg)';
		},
		TurnBack:function(){
			rotate += 180;
			$('box').style.transform = 'rotate(' + rotate + 'deg)';
		}	
		};
	
	addEvent($('inCommand'),'keyup',function(){
		//判断\n个数
		var strArr = $('textarea').value.split('\n');
		var str = '';
		for(var i  = 0;i < strArr.length;i++){
			var j = i+1;
			var str = str + '<li>'+j+'</li>';
		}
		$('ol').innerHTML = str;
	})


	//执行函数
	function execute(){
		console.log(queue);
		setTimeout(function(){
			var shift = queue.shift().toUpperCase();
			var num = queueNum.shift();
			console.log(shift);
			switch(shift){
				case 'GO':command.Go(rotate);break;
				case 'TRA LEF':command.TraLef();break;
				case 'TRA TOP':command.TraTop();break;
				case 'TRA RIG':command.TraRig();break;
				case 'TRA BOT':command.TraBot();break;
				case 'MOV TOP':command.MovTop(orient);break;
				case 'MOV LEF':command.MovLef(orient);break;
				case 'MOV RIG':command.MovRig(orient);break;
				case 'MOV BOT':command.MovBot(orient);break;
				case 'TUN LEF':command.TurnLeft();break;
				case 'TUN RIG':command.TurnRight();break;
				case 'TUN BAC':command.TurnBack();break;
				//指令出错 第num个子元素
				default:
					var li = document.getElementsByTagName('li');
					li[num].style.backgroundColor = 'red';
			}
			if(queue.length>0){
				execute();
			}
		},600);
	}

	//处理输入命令
	addEvent($('command'),'click',function(){
		var strArr = $('textarea').value.split('\n');
		
		for(var i = 0;i<strArr.length;i++){
			//含有数字
			if(/\d+/.test(strArr[i])){
				//找出command
				var rowCommand = strArr[i].replace(/\s+\d+\s*/g,'');
				//找出次数
				var number = strArr[i].replace(/[^0-9]/ig,'');
				//将指令放入队列中
				for(var j = 0;j < number;j++){
					queue.push(rowCommand);
					queueNum.push(i);

				}
			}else{
				queue.push(strArr[i]);
				queueNum.push(i);
			}
		}
		execute();
	});


	//清除命令
	addEvent($('refresh'),'click',function(){
		$('textarea').value = '';
		$('ol').innerHTML = '<li>1</li>';
		id = 1;
	})

	//处理行数与textarea同时滚动
	addEvent($('textarea'),'scroll',function(){
		var li = document.getElementsByTagName('li');
		li[0].style.marginTop = -$('textarea').scrollTop+'px';
	})


	//初始化
	boxPos(row,cell);
	window.onresize = function(){
		boxPos(row,cell);
	}


})();

