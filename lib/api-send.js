'use strict';
var fs = require('fs');
var charset = require('superagent-charset');
var superagent = require('superagent');
charset(superagent);

var config = require('./config');

var AS = function(option){
	this._appid = config.APPID;
	this._host = config.HOST;
	if(!config.APPID && config.HOST) {
	    throw new Error('缺少配置参数');
	}
} 
AS.config = config;
AS.prototype = {
	build:function(path,router){
		//解析
		for(var i = 0; i < router.stack.length; i++){
			var stack = router.stack[i];
			//获取点击链接
			var url = path + stack.route.path;
			var method = stack.route.stack[0].method;
			//发送请求
			this.send(method,url);
		}
	},
	send:function(method,url){
		console.log(method);
		console.log(this._host+url);
		var para = {};
		//发送请求
        if(method == "get"){
            superagent.get(this._host+url)
            .query(para)
            .end((err, result) => {
                if(result.statusCode == 200){
                    var result = JSON.parse(result.text);
                    console.log("请求成功");
                }else{
                    console.log("请求失败");
                }
            });
        }else{
            superagent.post(this._host+url)
            .send(para)
            .end((err, result) => {
                if(result.statusCode == 200){
                    var result = JSON.parse(result.text);
                    console.log("请求成功");
                }else{
                    console.log("请求失败");
                }
            });
        }
	},
	add:function(req,data){
		var url = req.originalUrl;
		var api_url = this._host+url;
		var api_request = req.method;
		var api_name = url.split("/")[1]+url.split("/")[2].slice(0, 1).toUpperCase() + url.split("/")[2].slice(1);
		var api_desc = api_name;
		var api_type = url.split("/")[1].slice(0, 1).toUpperCase() + url.split("/")[1].slice(1);
		var api_para = [];
		for(var key in data){
			var api_para_li = {};
			api_para_li.para_name = key;
			api_para_li.para_type = "String";
			api_para_li.para_desc = data[key];
			api_para_li.para_must = data[key] ? 1 : 0;
			api_para.push(api_para_li);
		}
		var data = {
	          app_id      : this._appid,
	          api_name    : api_name,
	          api_type    : api_type,
	          api_desc    : api_desc,
	          api_url     : api_url,
	          api_request : api_request,
	          api_para    : JSON.stringify(api_para)
	    }

	    superagent.get("http://apimanage.leanapp.cn/api/addbynode")
        .query(data)
        .end((err, result) => {
            if(result.statusCode == 200){
                console.log("上传成功");
                return true;
            }else{
                console.log("上传失败");
                return true;
          	}
        });
	}
}

module.exports = AS;