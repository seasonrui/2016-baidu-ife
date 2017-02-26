(function(){

	function $(ele){
 		return document.getElementById(ele);
	}

	var data = {"北京":['北京大学','清华大学','中国人民大学'],
				"西安":['西安交通大学','陕西师范大学','西安电子科技大学'],
				"上海":['上海交通大学','复旦大学','同济大学']
				};

	function initStudentSelect(){
		var str = "";
		for(var i in data){
			str += "<option>"+i+"</option>";
		}
		$("city").innerHTML = str;

	}

	function schoolSelect(){
		var nowcity = $("city").value;
		var str = "";
			for(var i = 0,len = data[nowcity].length;i < len;i++){
				str += "<option>" + data[nowcity][i] + "</option>";
			}
		 $("school").innerHTML = str;
	}

	$("city").onchange = schoolSelect;

	$("student").onclick = function(){
		$("studentSelect").style.display = "block";
		$("company").style.display = "none";
		initStudentSelect();
		schoolSelect();
		
	}
	$("noStudent").onclick = function(){
		
		$("studentSelect").style.display = "none";
		$("company").style.display = "block";
	}

	initStudentSelect();
	schoolSelect();
})();