(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{132:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(1),a=n(15),o=n(43),c=(n(98),{_:{a:"d"}}),s={_:{a:"d"}},u=n(99);function l(){return a.nav.loginTop(i.createElement("div",{className:"d-flex align-items-center"},i.createElement("img",{className:"App-logo h-3c position-absolute",src:u}),i.createElement("div",{className:"h3 flex-fill text-center"},i.createElement("span",{className:"text-primary mr-3"},"\u540c"),i.createElement("span",{className:"text-danger"},"\u82b1"))))}var m=[{type:"mobile",caption:"\u624b\u673a\u53f7",regex:a.mobileRegex},{type:"email",caption:"\u90ae\u7bb1",regex:a.emailRegex}];function h(e){return m.find(function(t){return!0===t.regex.test(e)})}var p=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.accountPageCaption="\u8d26\u53f7\u5bc6\u7801",t.accountLabel="\u6ce8\u518c\u8d26\u53f7",t.accountSubmitCaption="\u6ce8\u518c\u65b0\u8d26\u53f7",t.passwordPageCaption="\u8d26\u53f7\u5bc6\u7801",t.passwordSubmitCaption="\u6ce8\u518c\u65b0\u8d26\u53f7",t.successText="\u6ce8\u518c\u6210\u529f",t}return r.d(t,e),t.prototype.internalStart=function(){return r.b(this,void 0,void 0,function(){return r.e(this,function(e){return this.openVPage(b),[2]})})},t.prototype.toVerify=function(e){this.account=e,this.openVPage(f)},t.prototype.toPassword=function(){this.openVPage(g)},t.prototype.toSuccess=function(){this.openVPage(v)},t.prototype.login=function(){var e=this;o.a.login({user:this.account,pwd:this.password,guest:a.nav.guest}).then(function(t){return r.b(e,void 0,void 0,function(){return r.e(this,function(e){switch(e.label){case 0:return void 0===t?(alert("something wrong!"),[2]):[4,a.nav.logined(t)];case 1:return e.sent(),[2]}})})})},t.prototype.regReturn=function(e){var t;switch(e){default:throw"unknown return";case 0:return;case 1:t="\u7528\u6237\u540d "+this.account;break;case 2:t="\u624b\u673a\u53f7 +"+this.account;break;case 3:t="\u90ae\u7bb1 "+this.account}return t+" \u5df2\u7ecf\u88ab\u6ce8\u518c\u8fc7\u4e86"},t.prototype.checkAccount=function(){return r.b(this,void 0,Promise,function(){var e,t;return r.e(this,function(n){switch(n.label){case 0:return[4,o.a.isExists(this.account)];case 1:return e=n.sent(),void 0!==(t=this.accountError(e))?[2,t]:[4,o.a.setVerify(this.account,this.type)];case 2:return e=n.sent(),this.toVerify(this.account),[2]}})})},t.prototype.accountError=function(e){if(e>0)return"\u5df2\u7ecf\u88ab\u6ce8\u518c\u4f7f\u7528\u4e86"},t.prototype.execute=function(){return r.b(this,void 0,void 0,function(){var e,t;return r.e(this,function(n){switch(n.label){case 0:switch(e={nick:void 0,user:this.account,pwd:this.password,country:void 0,mobile:void 0,email:void 0,verify:this.verify},this.type){case"mobile":e.mobile=this.account;break;case"email":e.email=this.account}return[4,o.a.register(e)];case 1:return 0===(t=n.sent())?(a.nav.clear(),this.toSuccess(),[2]):[2,this.regReturn(t)]}})})},t}(a.Controller),d=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.accountPageCaption="\u5bc6\u7801\u627e\u56de",t.accountLabel="\u8d26\u53f7",t.accountSubmitCaption="\u6ce8\u518c\u65b0\u8d26\u53f7",t.passwordPageCaption="\u91cd\u7f6e\u5bc6\u7801",t.passwordSubmitCaption="\u63d0\u4ea4",t.successText="\u6210\u529f\u4fee\u6539\u5bc6\u7801",t}return r.d(t,e),t.prototype.execute=function(){return r.b(this,void 0,void 0,function(){return r.e(this,function(e){switch(e.label){case 0:return[4,o.a.resetPassword(this.account,this.password,this.verify,this.type)];case 1:return e.sent(),a.nav.clear(),this.toSuccess(),[2,void 0]}})})},t.prototype.accountError=function(e){if(0===e)return"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8d26\u53f7"},t}(p),b=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.schema=[{name:"user",type:"string",required:!0,maxLength:100},{name:"verify",type:"submit"}],t.res=Object(a.resLang)(s),t.page=function(){return i.createElement(a.Page,{header:t.controller.accountPageCaption},i.createElement("div",{className:"w-max-20c my-5 py-5",style:{marginLeft:"auto",marginRight:"auto"}},l(),i.createElement("div",{className:"h-3c"}),i.createElement(a.Form,{schema:t.schema,uiSchema:t.uiSchema,onButtonClick:t.onSubmit,onEnter:t.onEnter,requiredFlag:!1})))},t.onSubmit=function(e,n){return r.b(t,void 0,Promise,function(){var e,t,i,a,o;return r.e(this,function(r){switch(r.label){case 0:return n.clearContextErrors(),e="user",t=n.getValue(e),void 0===(i=h(t))?(n.setError(e,"\u5fc5\u987b\u662f\u624b\u673a\u53f7\u6216\u90ae\u7bb1"),[2]):"mobile"!==(a=i.type)||11===t.length&&"1"===t[0]?(this.controller.account=t,this.controller.type=a,[4,this.controller.checkAccount()]):(n.setError(e,"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7"),[2]);case 1:return void 0!==(o=r.sent())&&n.setError(e,o),[2]}})})},t.onEnter=function(e,n){return r.b(t,void 0,Promise,function(){return r.e(this,function(t){switch(t.label){case 0:return"user"!==e?[3,2]:[4,this.onSubmit("verify",n)];case 1:return[2,t.sent()];case 2:return[2]}})})},t}return r.d(t,e),t.prototype.open=function(){return r.b(this,void 0,void 0,function(){return r.e(this,function(e){return this.uiSchema={items:{user:{widget:"text",label:this.controller.accountLabel,placeholder:"\u624b\u673a\u53f7\u6216\u90ae\u7bb1"},verify:{widget:"button",className:"btn btn-primary btn-block mt-3",label:"\u53d1\u9001\u9a8c\u8bc1\u7801"}}},this.openPage(this.page),[2]})})},t}(a.VPage),f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.schema=[{name:"verify",type:"number",required:!0,maxLength:6},{name:"submit",type:"submit"}],t.onVerifyChanged=function(e,t,n){e.setDisabled("submit",!t||6!=t.length)},t.uiSchema={items:{verify:{widget:"text",label:"\u9a8c\u8bc1\u7801",placeholder:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",onChanged:t.onVerifyChanged},submit:{widget:"button",className:"btn btn-primary btn-block mt-3",label:"\u4e0b\u4e00\u6b65 >",disabled:!0}}},t.onSubmit=function(e,n){return r.b(t,void 0,Promise,function(){var e;return r.e(this,function(t){switch(t.label){case 0:return e=this.controller.verify=n.getValue("verify"),[4,o.a.checkVerify(this.controller.account,e)];case 1:return 0===t.sent()?(n.setError("verify","\u9a8c\u8bc1\u7801\u9519\u8bef"),[2]):(this.controller.toPassword(),[2])}})})},t.onEnter=function(e,n){return r.b(t,void 0,Promise,function(){return r.e(this,function(t){switch(t.label){case 0:return"verify"!==e?[3,2]:[4,this.onSubmit("submit",n)];case 1:return[2,t.sent()];case 2:return[2]}})})},t.page=function(){var e,n;switch(t.controller.type){case"mobile":e="\u624b\u673a\u53f7";break;case"email":e="\u90ae\u7bb1",n=i.createElement(i.Fragment,null,i.createElement("span",{className:"text-danger"},"\u6ce8\u610f"),": \u6709\u53ef\u80fd\u8bef\u4e3a\u5783\u573e\u90ae\u4ef6\uff0c\u8bf7\u68c0\u67e5",i.createElement("br",null))}return i.createElement(a.Page,{header:"\u9a8c\u8bc1\u7801"},i.createElement("div",{className:"w-max-20c my-5 py-5",style:{marginLeft:"auto",marginRight:"auto"}},"\u9a8c\u8bc1\u7801\u5df2\u7ecf\u53d1\u9001\u5230",e,i.createElement("br",null),i.createElement("div",{className:"py-2 px-3 my-2 text-primary bg-light"},i.createElement("b",null,t.controller.account)),n,i.createElement("div",{className:"h-1c"}),i.createElement(a.Form,{schema:t.schema,uiSchema:t.uiSchema,onButtonClick:t.onSubmit,onEnter:t.onEnter,requiredFlag:!1})))},t}return r.d(t,e),t.prototype.open=function(){return r.b(this,void 0,void 0,function(){return r.e(this,function(e){return this.openPage(this.page),[2]})})},t}(a.VPage),g=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.schema=[{name:"pwd",type:"string",required:!0,maxLength:100},{name:"rePwd",type:"string",required:!0,maxLength:100},{name:"submit",type:"submit"}],t.onSubmit=function(e,n){return r.b(t,void 0,Promise,function(){var e,t,i;return r.e(this,function(r){switch(r.label){case 0:return e=n.form.data,t=e.pwd,i=e.rePwd,t&&t===i?(this.controller.password=t,[4,this.controller.execute()]):(n.setValue("pwd",""),n.setValue("rePwd",""),[2,"\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u5bc6\u7801\uff01"]);case 1:return[2,r.sent()]}})})},t.onEnter=function(e,n){return r.b(t,void 0,Promise,function(){return r.e(this,function(t){switch(t.label){case 0:return"rePwd"!==e?[3,2]:[4,this.onSubmit("submit",n)];case 1:return[2,t.sent()];case 2:return[2]}})})},t.page=function(){return i.createElement(a.Page,{header:t.controller.passwordPageCaption},i.createElement("div",{className:"w-max-20c my-5 py-5",style:{marginLeft:"auto",marginRight:"auto"}},"\u6ce8\u518c\u8d26\u53f7",i.createElement("br",null),i.createElement("div",{className:"py-2 px-3 my-2 text-primary bg-light"},i.createElement("b",null,t.controller.account)),i.createElement("div",{className:"h-1c"}),i.createElement(a.Form,{schema:t.schema,uiSchema:t.uiSchema,onButtonClick:t.onSubmit,onEnter:t.onEnter,requiredFlag:!1})))},t}return r.d(t,e),t.prototype.open=function(){return r.b(this,void 0,void 0,function(){return r.e(this,function(e){return this.uiSchema={items:{pwd:{widget:"password",placeholder:"\u5bc6\u7801",label:"\u5bc6\u7801"},rePwd:{widget:"password",placeholder:"\u91cd\u590d\u5bc6\u7801",label:"\u91cd\u590d\u5bc6\u7801"},submit:{widget:"button",className:"btn btn-primary btn-block mt-3",label:this.controller.passwordSubmitCaption}}},this.openPage(this.page),[2]})})},t}(a.VPage),v=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.page=function(){var e=t.controller,n=e.account,r=e.successText;return i.createElement(a.Page,{header:!1},i.createElement("div",{className:"container w-max-30c"},i.createElement("form",{className:"my-5"},i.createElement("div",{className:"py-5"},"\u8d26\u53f7 ",i.createElement("strong",{className:"text-primary"},n," ")," ",r,"\uff01"),i.createElement("button",{className:"btn btn-success btn-block",onClick:function(){return t.controller.login()}},"\u76f4\u63a5\u767b\u5f55"))))},t}return r.d(t,e),t.prototype.open=function(){return r.b(this,void 0,void 0,function(){return r.e(this,function(e){return this.openPage(this.page),[2]})})},t}(a.VPage),y=[{name:"username",type:"string",required:!0,maxLength:100},{name:"password",type:"string",required:!0,maxLength:100},{name:"login",type:"submit"}],w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.res=Object(a.resLang)(c),t.uiSchema={items:{username:{placeholder:"\u624b\u673a/\u90ae\u7bb1/\u7528\u6237\u540d",label:"\u767b\u5f55\u8d26\u53f7"},password:{widget:"password",placeholder:"\u5bc6\u7801",label:"\u5bc6\u7801"},login:{widget:"button",className:"btn btn-primary btn-block mt-3",label:"\u767b\u5f55"}}},t.onSubmit=function(e,n){return r.b(t,void 0,Promise,function(){var e,t,i,c,s;return r.e(this,function(r){switch(r.label){case 0:return e=n.form.data,t=e.username,void 0===(i=e.password)?[2,"something wrong, pwd is undefined"]:[4,o.a.login({user:t,pwd:i,guest:a.nav.guest})];case 1:return void 0===(c=r.sent())?(s=h(t),[2,(void 0!==s?s.caption:"\u7528\u6237\u540d")+"\u6216\u5bc6\u7801\u9519\uff01"]):(console.log("onLoginSubmit: user=%s pwd:%s",c.name,c.token),[4,a.nav.logined(c,this.props.callback)]);case 2:return r.sent(),[2]}})})},t.onEnter=function(e,n){return r.b(t,void 0,Promise,function(){return r.e(this,function(t){switch(t.label){case 0:return"password"!==e?[3,2]:[4,this.onSubmit("login",n)];case 1:return[2,t.sent()];case 2:return[2]}})})},t.clickReg=function(){new p(void 0).start()},t.clickForget=function(){new d(void 0).start()},t}return r.d(t,e),t.prototype.render=function(){var e=this,t=i.createElement("div",{className:"text-center"},i.createElement("button",{className:"btn btn-link",color:"link",style:{margin:"0px auto"},onClick:this.clickReg},"\u6ce8\u518c\u8d26\u53f7")),n=!1;return!0===this.props.withBack&&(n="\u767b\u5f55"),i.createElement(a.Page,{header:n,footer:t},i.createElement("div",{className:"d-flex h-100 flex-column justify-content-center align-items-center"},i.createElement("div",{className:"flex-fill"}),i.createElement("div",{className:"w-20c"},l(),i.createElement("div",{className:"h-2c"}),i.createElement(a.Form,{schema:y,uiSchema:this.uiSchema,onButtonClick:this.onSubmit,onEnter:this.onEnter,requiredFlag:!1}),i.createElement("button",{className:"btn btn-link btn-block",onClick:function(){return e.clickForget()}},"\u5fd8\u8bb0\u5bc6\u7801")),i.createElement("div",{className:"flex-fill"}),i.createElement("div",{className:"flex-fill"})))},t}(i.Component);t.default=w}}]);
//# sourceMappingURL=1.c27697e4.chunk.js.map