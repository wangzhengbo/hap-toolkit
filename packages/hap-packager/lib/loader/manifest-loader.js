"use strict";var _path=_interopRequireDefault(require("path")),_fs=_interopRequireDefault(require("fs")),_loaderUtils=_interopRequireDefault(require("loader-utils")),_utils=require("../common/utils");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}const REGEXP_INT=/^[-+]?[0-9]+$/,REGEXP_URL=/^['"]?([^()]+?)['"]?$/gi,REGEXP_NAME=/^[a-zA-Z_][a-zA-Z0-9]*$/,validator={integer:function(e){return(e=(e||"").toString()).match(REGEXP_INT)?{value:!0}:{value:!1,reason:function(e,t){return"ERROR: manifest.json的配置项 `"+e+"` 的值 `"+t+"` 无效(仅支持整数)"}}},object:function(e){const t=(0,_utils.isPlainObject)(e);return{value:(0,_utils.isPlainObject)(e),reason:t?null:function(e,t){return"ERROR: manifest.json的配置项 `"+e+"` 的值 `"+t+"` 无效(仅支持对象)"}}},url:function(e){return(e=(e||"").toString().trim()).match(REGEXP_URL)?{value:!0}:{value:!1,reason:function(e,t){return"ERROR: manifest.json的配置项 `"+e+"` 的值 `"+t+"` 必须是url"}}},name:function(e){return(e=(e||"").toString()).match(REGEXP_NAME)?{value:!0}:{value:!1,reason:function(e,t){return"ERROR: manifest.json的配置项 `"+e+"` 的值 `"+t+"` 格式不正确"}}}},validatorMap={package:{type:validator.string,require:!0},name:{type:validator.string,require:!0},versionCode:{type:validator.integer,require:!0},icon:{type:validator.url,require:!0},config:{type:validator.object,require:!0},router:{type:validator.object,require:!0}};function validate(e,t){let r,a;const n=validatorMap[e];return n&&"function"==typeof n.type?(r=n.type(t)).reason&&(a={reason:r.reason(e,t)}):r={value:!0},{value:r.value,log:a}}const requireAttrMap=[];Object.keys(validatorMap).forEach(function(e){validatorMap[e].require&&requireAttrMap.push(e)}),module.exports=function(e,t){this.cacheable&&this.cacheable();const r=_loaderUtils.default.getOptions(this).path,a=JSON.parse(_fs.default.readFileSync(_path.default.join(r,"manifest.json")).toString()),n=[];if(a){let e,t;requireAttrMap.forEach(function(e){a[e]||n.push({line:1,column:1,reason:"ERROR: manifest.json缺少配置项 `"+e+"`"})}),Object.keys(a).forEach(r=>{e=a[r],(t=validate(r,e)).log&&n.push({line:1,column:1,reason:t.log.reason})}),(0,_utils.logWarn)(this,n),global.framework.manifest=a}this.callback(null,e,t)};
//# sourceMappingURL=manifest-loader.js.map