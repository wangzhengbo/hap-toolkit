"use strict";const{transformSync:transformSync}=require("@babel/core"),babelPlugin=require("@babel/plugin-transform-template-literals"),allowedKeywords="Infinity,undefined,NaN,null,isFinite,isNaN,true,false,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,this,require",allowedKeywordsRE=new RegExp("^("+allowedKeywords.replace(/,/g,"\\b|")+"\\b)"),improperKeywords="break,case,class,catch,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,let,return,super,switch,throw,try,var,while,with,yield,enum,await,implements,package,protected,static,interface,private,public",improperKeywordsRE=new RegExp("^("+improperKeywords.replace(/,/g,"\\b|")+"\\b)"),wsRE=/\s/g,newlineRE=/\n/g,saveRE=/[{,]\s*[\w$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|new |typeof |void /g,restoreRE=/"(\d+)"/g,pathTestRE=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/,identRE=/[^\w$.](?:[A-Za-z_$][\w$]*)/g,literalValueRE=/^(?:true|false|null|undefined|Infinity|NaN)$/,saved=[];function save(e,r){const t=saved.length;return saved[t]=r?e.replace(newlineRE,"\\n"):e,'"'+t+'"'}function rewrite(e){const r=e.charAt(0);let t=e.slice(1);return allowedKeywordsRE.test(t)?e:r+"this."+(t=t.indexOf('"')>-1?t.replace(restoreRE,restore):t)}function restore(e,r){return saved[r]}function compileGetter(e){improperKeywordsRE.test(e)&&console.warn("### App Toolkit ### 不要在表达式中使用保留关键字: "+e),saved.length=0;let r=e.replace(saveRE,save).replace(wsRE,"");return(r=(" "+r).replace(identRE,rewrite).replace(restoreRE,restore)).trim()}function parseExpression(e){e=e.trim();if(/^\/.+\/[gimy]*$/.test(e))return e;if(/^`.+`$/.test(e)){return parseExpression(transformSync(e,{plugins:[babelPlugin]}).code)}return isSimplePath(e)&&e.indexOf("[")<0?"this."+e:compileGetter(e)}function isSimplePath(e){return pathTestRE.test(e)&&!literalValueRE.test(e)&&"Math."!==e.slice(0,5)}module.exports={parseExpression:parseExpression};
//# sourceMappingURL=expression.js.map