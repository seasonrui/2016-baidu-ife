function $(id){
	return document.getElementById(id);
}

var eventUtil = {

	addHandler:function(element,type,handler){

		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,handler);
		}else{
			element['on'+type]=handler;
		}
	},
	//事件代理
	delegateEvent:function(element,tag,eventName,listener){

		eventUtil.addHandler(element,eventName,function(event){
			var target = event.target || event.srcElement;
			if(target.tagName.toLowerCase() == tag.toLowerCase()){
				listener.call(target,event);
			}
		});
	}
};

var SortTable = function(config){
	//构造函数
	this.theadData = config.data.thead;
	this.tbodyData = config.data.tbody;
	this.mytable = $(config["id"]);
}

SortTable.prototype = {

	constructor:SortTable,
	/**
	*初始化
	*/
	init:function(config){
			
		this.createTable(config);
		//绑定排序事件 事件代理也可以
		var that = this;
		
		eventUtil.delegateEvent(this.mytable,'span','click',function(e){

			var index = e.target.parentNode.getAttribute('id');
			var type = this.className;
			that.sort(index,type);
			that.renderTable(that.mytable);

		})

	},
	/**
	*创建表格
	*/
	createTable:function(config){

		//创建表格
		var thead = document.createElement('thead'),
			tbody=document.createElement("tbody"),
			theadArr = config.data.thead,
			tbodyArr = config.data.tbody,
		    fragmentHtml = "";

		
		for(var i=0;len=theadArr.length,i<len;i++){
		
			if(theadArr[i].sortable == 'false'){
				fragmentHtml += "<th id='"+i+"'>"+theadArr[i].label+"</th>";
			}else{
				fragmentHtml += "<th id='"+i+"'>"+theadArr[i].label+"<span class='desc'></span><span class='asc'></span></th>";
			}
			
		}
		thead.innerHTML = fragmentHtml;
		this.mytable.appendChild(thead);
		

		//添加tbody
		fragmentHtml = "";
		for(var i=0;len=tbodyArr.length,i<len;i++){
			fragmentHtml += "<tr>"
			for(var j in tbodyArr[i]){
				fragmentHtml += "<td>"+tbodyArr[i][j]+"</td>"
			}
			fragmentHtml += "</tr>"
			
		}
		tbody.innerHTML = fragmentHtml;
		this.mytable.appendChild(tbody);
	},
	/**
	排序
	index:列项
	type:类型
	*/
	sort:function(index,type){

		if(type==='asc'){
			this.tbodyData.sort(function(a,b){
				return b[index] - a[index];
			});
		}else{
			this.tbodyData.sort(function(a,b){
				return a[index] - b[index];
			});
			
		}
	},

	/**
	渲染表格
	mytable:表格元素
	*/
	renderTable:function(mytable){
		
		var tbodyArr = mytable.getElementsByTagName('tbody')[0].getElementsByTagName('td');
		var index = 0;
		for(var i = 0;i<this.tbodyData.length;i++){
			for(var j = 0; j<this.tbodyData[i].length;j++){
				tbodyArr[index++].innerHTML = this.tbodyData[i][j];
			}
		}

	}

}
