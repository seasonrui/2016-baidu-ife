(function(){
	var inputArr = document.getElementsByTagName('input'),
		button = document.getElementById('submit');
	var tipText = [	{tip:"必填，长度为4~16个字符",success:"名称格式正确",fail:"名称格式错误"},
					{tip:"以字母开头，长度在6-18之间，只能包含字符、数字和下划线",success:"密码可用",fail:"密码格式错误"},
					{tip:"请再次输入密码",success:"密码输入一致",fail:"密码输入不一致"},
					{tip:"输入正确的邮箱格式",success:"邮箱格式正确",fail:"邮箱格式错误"},
					{tip:"必填,输入11位手机号",success:"手机格式正确",fail:"手机格式错误"},
					];
	var isWrong = true;
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
	function check(ele,index){
		var flag;
		var value = ele.value;
		switch(index){
			case 0:
				var len = getLength(value);
				if(len<4 || len>16){
					flag = 0;
				}else{
					flag = 1;
				}
				break;
			case 1:
				flag = /^[a-zA-Z]\w{5,17}$/.test(value);/*以字母开头，长度在6-18之间，只能包含字符、数字和下划线。 */
				break;
			case 2:
				var psw = document.getElementById('psw').value;
				flag = psw==value;
				break;
			case 3:
				flag = /^(\w+\.)*\w+@\w+(\.\w+)+$/.test(value);
				break;
			case 4:
				flag = /^(\+\d{1,4})?\d{7,11}$/.test(value);
				break;
		}
		if(flag){
			ele.style.border = '1px solid green';
			ele.nextElementSibling.innerHTML = tipText[index].success;
			ele.nextElementSibling.style.color = "green";
		}else{
			isWrong = false;
			ele.style.border = '1px solid red';
			ele.nextElementSibling.innerHTML = tipText[index].fail;
			ele.nextElementSibling.style.color = "red";
		}
		
	}

	for(var i = 0;i < inputArr.length;i++){
		(function(){
			var temp = i;
			addEvent(inputArr[temp],'focus',function(){
				inputArr[temp].style.border = '1px solid blue';
				inputArr[temp].nextElementSibling.innerHTML = tipText[temp].tip;
				inputArr[temp].nextElementSibling.style.color = "#ccc";

			});
			addEvent(inputArr[temp],'blur',function(){
				var flag = check(inputArr[temp],temp);
				
			})
		})(i);
	}
	addEvent(button,'click',function(e){
		isWrong = true;
		for(var i = 0;i<inputArr.length;i++){
			(function(){
				var temp = i;
				check(inputArr[temp],temp);
			})(i);
		}
		if(isWrong==false){
			alert("提交失败");
		}else{
			alert("提交成功");
		}
		e.preventDefault();
	});

})();