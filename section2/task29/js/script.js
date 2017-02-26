(function(){
	var submit = document.getElementById('submit'),
		name = document.getElementById('name'),
		warn = document.getElementById('warn');
	function addEvent(elem,type,handler){
		if(elem.addEventListener){
			elem.addEventListener(type,handler,false);
		}else if(elem.attachEvent){
			elem.attachEvent('on'+type,handler);
		}else{
			elem['on'+type] = handler;
		}
	}
	function getLength(str){
		var len = 0;
		for(var i = 0;i<str.length;i++){
			if(str.charCodeAt(i)>127||str.charCodeAt(i)==94){
				len += 2;
			}else{
				len++;
			}
		}
		return len;
	}
	addEvent(submit,'click',function(){
		var value = name.value,
			//pattern = /^\w{4,16}$/;
			len = getLength(value);
		if(len==0){
			warn.innerHTML = '姓名不能为空';
			warn.style.color="red";
			name.style.border = "1px solid red";
		}else if(len<4||len>16){
			warn.innerHTML='输入的必须是4-16为字符';//汉字有问题
			warn.style.color="red";
			name.style.border = "1px solid red";
		}else{
			warn.innerHTML = '名称格式正确';
			warn.style.color="green";
			name.style.border = "1px solid green";
		}
	});

	
})();