/**
 * Created by 面向不对象 on 2017/4/13.
 */

//示例
// var AS = require('api-send');
// AS.config.APPID = "123";
// AS.config.HOST = "http://www.baidu.com";
// AS = new AS();
// AS.build();
 // 调试
var AS = require('./lib/api-send');
AS.config.APPID = "58f369a3a0bb9f006a9e2e2a";
AS.config.HOST = "http://localhost:3000";
AS = new AS();
AS.build();