(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{184:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(1),a=n(43),s=n(28),o=n(48),l=new(function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r.d(t,e),t.prototype.login=function(e){return r.b(this,void 0,Promise,function(){var t,n,i,a,s;return r.e(this,function(r){switch(r.label){case 0:return[4,this.get("login",e)];case 1:switch(typeof(t=r.sent())){default:return[2];case"string":return[2,Object(o.c)(t)];case"object":return n=t.token,i=Object(o.c)(n),a=t.nick,s=t.icon,a&&(i.nick=a),s&&(i.icon=s),[2,i]}return[2]}})})},t.prototype.register=function(e){return r.b(this,void 0,Promise,function(){return r.e(this,function(t){switch(t.label){case 0:return[4,this.post("register",e)];case 1:return[2,t.sent()]}})})},t}(s.a))("tv/user/",void 0),c=(n(115),function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r.d(t,e),t.prototype.failed=function(){},t.prototype.login=function(){var e=this,t=this.props,n=t.user,i=t.pwd;l.login({user:n,pwd:i,guest:a.nav.guest}).then(function(t){return r.b(e,void 0,void 0,function(){return r.e(this,function(e){switch(e.label){case 0:return void 0===t?(this.failed(),[2]):[4,a.nav.logined(t)];case 1:return e.sent(),[2]}})})})},t.prototype.render=function(){var e=this,t=this.props,n=t.user;t.pwd;return i.createElement(a.Page,{header:!1},i.createElement("div",{className:"container w-max-30c"},i.createElement("form",{className:"my-5"},i.createElement("div",{className:"py-5"},"\u7528\u6237 ",i.createElement("strong",{className:"text-primary"},n," ")," \u6ce8\u518c\u6210\u529f\uff01"),i.createElement("button",{className:"btn btn-success btn-block",onClick:function(){return e.login()}},"\u76f4\u63a5\u767b\u5f55"))))},t}(i.Component)),u={_:{a:"d"}},m={_:{a:"d"}},p=n(116),d=[{name:"user",type:"string",required:!0,maxLength:100},{name:"pwd",type:"string",required:!0,maxLength:100},{name:"rePwd",type:"string",required:!0,maxLength:100},{name:"register",type:"submit"}],h=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.res=Object(a.resLang)(m),t.uiSchema={items:{user:{placeholder:"\u7528\u6237\u540d",label:"\u7528\u6237\u540d"},pwd:{widget:"password",placeholder:"\u5bc6\u7801",label:"\u5bc6\u7801"},rePwd:{widget:"password",placeholder:"\u91cd\u590d\u5bc6\u7801",label:"\u91cd\u590d\u5bc6\u7801"},register:{widget:"button",className:"btn btn-primary btn-block mt-3",label:"\u6ce8\u518c\u65b0\u7528\u6237"}}},t}return r.d(t,e),t.prototype.onSubmit=function(e,t){return r.b(this,void 0,Promise,function(){var e,n,s,o,u,m,p,d;return r.e(this,function(r){switch(r.label){case 0:return e=t.form.data,n=e.user,s=e.pwd,o=e.rePwd,u=e.country,m=e.mobile,p=e.email,s!==o?(t.setValue("pwd",""),t.setValue("rePwd",""),[2,"\u5bc6\u7801\u4e0d\u5bf9\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u5bc6\u7801\uff01"]):[4,l.register({nick:void 0,user:n,pwd:s,country:void 0,mobile:void 0,email:void 0})];case 1:switch(r.sent()){default:throw"unknown return";case 0:return a.nav.clear(),a.nav.show(i.createElement(c,{user:n,pwd:s})),[2];case 1:d="\u7528\u6237\u540d "+n;break;case 2:d="\u624b\u673a\u53f7 +"+u+" "+m;break;case 3:d="\u7535\u5b50\u90ae\u4ef6 "+p}return[2,d+" \u5df2\u7ecf\u88ab\u6ce8\u518c\u8fc7\u4e86"]}})})},t.prototype.click=function(){a.nav.replace(i.createElement(v,null))},t.prototype.render=function(){return i.createElement(a.Page,{header:"\u6ce8\u518c"},i.createElement("div",{style:{maxWidth:"25em",margin:"3em auto",padding:"0 3em"}},i.createElement("div",{className:"container",style:{display:"flex",position:"relative"}},i.createElement("img",{className:"App-logo",src:p,style:{height:"60px",position:"absolute"}}),i.createElement("span",{style:{flex:1,fontSize:"x-large",alignSelf:"center",textAlign:"center",margin:"10px"}},"\u540c\u82b1")),i.createElement("div",{style:{height:"20px"}}),i.createElement(a.Form,{schema:d,uiSchema:this.uiSchema,onButtonClick:this.onSubmit,requiredFlag:!1})))},t}(i.Component),g=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r.d(t,e),t.prototype.render=function(){return i.createElement(a.Page,{header:"\u5fd8\u8bb0\u5bc6\u7801"},"\u6b63\u5728\u8bbe\u8ba1\u4e2d...")},t}(i.Component),b=n(116),f=[{name:"username",type:"string",required:!0,maxLength:100},{name:"password",type:"string",required:!0,maxLength:100},{name:"login",type:"submit"}],w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.res=Object(a.resLang)(u),t.uiSchema={items:{username:{placeholder:"\u7528\u6237\u540d",label:"\u7528\u6237"},password:{widget:"password",placeholder:"\u5bc6\u7801",label:"\u5bc6\u7801"},login:{widget:"button",className:"btn btn-primary btn-block mt-3",label:"\u767b\u5f55"}}},t.onSubmit=function(e,n){return r.b(t,void 0,Promise,function(){var e,t,i,s;return r.e(this,function(r){switch(r.label){case 0:return e=n.form.data,t=e.username,void 0===(i=e.password)?[2,"something wrong, pwd is undefined"]:[4,l.login({user:t,pwd:i,guest:a.nav.guest})];case 1:return void 0===(s=r.sent())?[2,"\u7528\u6237\u540d\u6216\u5bc6\u7801\u9519\uff01"]:(console.log("onLoginSubmit: user=%s pwd:%s",s.name,s.token),[4,a.nav.logined(s)]);case 2:return r.sent(),[2]}})})},t}return r.d(t,e),t.prototype.click=function(){a.nav.replace(i.createElement(h,null))},t.prototype.render=function(){var e=i.createElement("div",{className:"text-center"},i.createElement("button",{className:"btn btn-link",color:"link",style:{margin:"0px auto"},onClick:function(){return a.nav.push(i.createElement(h,null))}},"\u5982\u679c\u6ca1\u6709\u8d26\u53f7\uff0c\u8bf7\u6ce8\u518c")),t=!1,n="\u540c\u82b1";return!0===this.props.withBack&&(t="\u767b\u5f55",n="\u767b\u5f55\u7528\u6237"),i.createElement(a.Page,{header:t,footer:e},i.createElement("div",{style:{maxWidth:"25em",margin:"3em auto",padding:"0 3em"}},i.createElement("div",{className:"container",style:{display:"flex",position:"relative"}},i.createElement("img",{className:"App-logo",src:b,style:{height:"60px",position:"absolute"}}),i.createElement("span",{style:{flex:1,fontSize:"x-large",alignSelf:"center",textAlign:"center",margin:"10px"}},n)),i.createElement("div",{style:{height:"20px"}}),i.createElement(a.Form,{schema:f,uiSchema:this.uiSchema,onButtonClick:this.onSubmit,requiredFlag:!1}),i.createElement("button",{className:"btn btn-link btn-block",onClick:function(){return a.nav.push(i.createElement(g,null))}},"\u5fd8\u8bb0\u5bc6\u7801")))},t}(i.Component),v=t.default=w}}]);
//# sourceMappingURL=1.31807ffa.chunk.js.map