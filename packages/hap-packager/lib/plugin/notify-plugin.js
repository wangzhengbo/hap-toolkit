"use strict";var _http=_interopRequireDefault(require("http")),_fs=_interopRequireDefault(require("fs")),_sharedUtils=require("@hap-toolkit/shared-utils"),_recordClient=require("@hap-toolkit/shared-utils/lib/record-client"),_config=_interopRequireDefault(require("@hap-toolkit/shared-utils/config"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}let clientExists=!1;function getDeviceInfo(e,t){const o=_http.default.request({path:"/deviceinfo",host:e.ip,port:e.port,timeout:3e3},e=>{e.on("data",e=>{t(null,JSON.parse(e))})}).on("error",e=>{t(e)}).on("timeout",function(){o.abort()});o.end()}function sendUpdateReq(e){const t=`http://${e.ip}:${e.port}/update`,o={host:e.ip,port:e.port,path:"/update",timeout:3e3},r=_http.default.request(o,()=>{_sharedUtils.colorconsole.log(`### App Server ### 通知手机更新rpk文件成功: ${t} `)}).on("error",e=>{_sharedUtils.colorconsole.log(`### App Server ### 通知手机更新rpk文件失败(可忽略): ${t} 错误信息: ${e.message}`)}).on("timeout",function(){_sharedUtils.colorconsole.log(`### App Server ### 通知手机更新rpk文件超时(可忽略): ${t}`),r.abort()});r.end()}function notify(){const e=_config.default.clientRecordPath;if(_fs.default.existsSync(e)){const t=(0,_recordClient.getRecords)(e),o=(0,_recordClient.getProjectClients)(t);o.length>0&&(_sharedUtils.colorconsole.log("### App Loader ### 通知手机更新rpk文件"),o.forEach(function(e){"127.0.0.1"!==e.ip?sendUpdateReq(e):getDeviceInfo(e,t=>{t||sendUpdateReq(e)})}),clientExists=!0)}clientExists||_sharedUtils.colorconsole.log("### App Server ### 没有记录手机地址，不会通知手机更新rpk文件")}function NotifyPlugin(e){this.options=e}module.exports=notify,NotifyPlugin.prototype.apply=function(e){e.hooks.done.tap("NotifyPlugin",function(){notify()})},module.exports=NotifyPlugin;
//# sourceMappingURL=notify-plugin.js.map