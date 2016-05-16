/*!
 * =====================================================
 * pop v0.0.3 (http://zhaomenghuan.github.io/pop/)
 * =====================================================
 */

;!function(w){
	var config={
		v:'0.0.3',
		site:'http://zhaomenghuan.github.io/pop/',
		mask:true, //默认开启遮罩层
		time:2000,  //默认定时2s自动关闭
		position:"center"
	};
	
	//选择器
	var $ = function(el){
		return document.querySelector(el);
	}
	//生成节点
	var creatEle = function(el){
		return document.createElement(el);
	}
	//判断是否字符串
	var isString = function(obj){
		return typeof obj == "string";
	}
	//判断是否为数组
	var isArray = function(obj){
		return Object.prototype.toString.call(obj) === '[object Array]'; 
	}
	//带默认值的设置
	var isEmpty = function(obj,def){
		return obj?obj:def;
	}
	
	var clearTimer=null;
	w.pop={	
		v:config.v,
		site:config.site,
		view:function(opt){
			var pop=creatEle("div"),mask=creatEle("div"),model=creatEle("div"),content=creatEle("div");;
			pop.className="pop";
			/*遮罩*/
			if((opt.mask===undefined && config.mask) || opt.mask){
				mask.className="mask";
				mask.addEventListener('click',function(){
					w.pop.close();	
				});
				pop.appendChild(mask);
			}
			/*弹出层*/
			if(opt.position===undefined || opt.position===config.position){
				model.className="model";
			}else if(opt.position=="bottom"){
				model.className="toast";
			}
			pop.appendChild(model);
			if(opt.style){
				model.setAttribute("style",opt.style);
			}
			//标题
			if(opt.title){
				var title=creatEle("h3");
				title.className="title";
				if(isArray(opt.title)){
					title.innerHTML=opt.title[0];
					title.setAttribute('style',opt.title[1]);
				}else if(isString(opt.title)){
					title.innerHTML=opt.title;
				}
				model.appendChild(title);
			}
			//内容
			if(opt.content || opt.select){
				content.className="content";
				content.innerHTML=isEmpty(opt.content,null);
				model.appendChild(content);
			}
			//按钮
			if(opt.btn){
				btngroup=creatEle("div");
				btngroup.className="btngroup";
				model.appendChild(btngroup);
				var btnNum=opt.btn.length,btn={};
				for(var i=0;i<btnNum;i++){
					btn['btn'+i]=creatEle("div");
					btn['btn'+i].className="btn";
					btn['btn'+i].innerHTML=opt.btn[i];
					btn['btn'+i].index=i;
					btn['btn'+i].addEventListener('click',function(){
						w.pop.close();
						if(btnNum==1){
							opt.fun();
						}else{
							opt.fun[this.index]();
						}
					})
					btngroup.appendChild(btn['btn'+i]);
				}	
			}
				
			/*上拉菜单*/
			if(opt.sheet){
				var sheet=creatEle("div"),btngroup=creatEle("div");
				sheet.className="actionsheet";
				btngroup.className="content";
				//标题
				if(opt.sheettitle){
					var title=creatEle("h4");
					title.innerHTML=opt.sheettitle;
					btngroup.appendChild(title);
				}
				//按钮		
				var length=opt.item.length,item={};
				for(var i=0;i<length;i++){
					item["btn"+i]=creatEle("button");
					item["btn"+i].innerHTML=opt.item[i];
					item["btn"+i].index=i;
					item["btn"+i].addEventListener('click',function(){
						w.pop.close();
						if(btnNum==1){
							opt.fun();
						}else{
							opt.fun[this.index]();
						}
					})
					btngroup.appendChild(item["btn"+i]);
				}
				sheet.appendChild(btngroup);
				pop.appendChild(sheet);
			}
			
			/*选择框*/
			if(opt.select){
				content.className="select";
				var list=creatEle("ul");
				//按钮		
				var length=opt.item.length,item={};
				for(var i=0;i<length;i++){
					item["btn"+i]=creatEle("li");
					item["btn"+i].className="option";
					item["btn"+i].innerHTML=opt.item[i];
					item["btn"+i].index=i;
					item["btn"+i].addEventListener('click',function(){
						w.pop.close();
						if(btnNum==1){
							opt.fun();
						}else{
							opt.fun[this.index]();
						}
					})
					list.appendChild(item["btn"+i]);
				}
				content.appendChild(list);
			}
			
			return pop;
		},
		open:function(opt){
			document.body.appendChild(w.pop.view(opt));
			if(opt.time){
				var time=isEmpty(opt.time,config.time);
				clearTimer=setTimeout(function(){
					w.pop.close();
				},time);
			}
		},
		close:function(){
			if(clearTimer) clearTimeout(clearTimer);
			var pop=$(".pop");
			document.body.removeChild(pop);
		},
		toast:function(opt,style){
			w.pop.open({
				content:(isArray(opt)?opt[0]:opt),
				time:(isArray(opt)?opt[1]:config.time),
				mask:(isArray(opt)?opt[2]:true),
				position:(isArray(opt)?opt[3]:"center"),
				style:style
			});
		},
		alert:function(opt,handle){
			w.pop.open({
				title:isEmpty(opt[0],'提示框'),
				content:isEmpty(opt[1],w.pop.site),
				btn:[isEmpty(opt[2],'OK')],
				fun:handle
			});
		},
		sheet:function(opt){
			w.pop.open({
				sheet:true,
				sheettitle:opt.title,
				item:opt.btn,
				fun:opt.fun
			});
		},
		select:function(opt){
			w.pop.open({
				select:true,
				title:opt.title,
				item:opt.btn,
				fun:opt.fun
			});
		},
		loading:function(opt){
			var html='<div class="loading">'+
					'<div class="bounce1"></div>'+
					'<div class="bounce2"></div>'+
					'<div class="bounce3"></div>'+
				'</div>',
				bgcolor="background-color:transparent";
				
			if(opt){
				var content=isEmpty(opt.content,html),
					time=isEmpty(opt.time,config.time),
					style=isEmpty(opt.style,bgcolor);
					
				pop.toast([content,time],style);
			}else{
				pop.toast([html,3000],bgcolor);
			}
		}
	}
}(window);