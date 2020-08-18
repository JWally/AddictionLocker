var Hogan={};!function(e){function t(e,t,r){var a;return t&&"object"==typeof t&&(void 0!==t[e]?a=t[e]:r&&t.get&&"function"==typeof t.get&&(a=t.get(e))),a}function r(e){return String(null===e||void 0===e?"":e)}e.Template=function(e,t,r,a){e=e||{},this.r=e.code||this.r,this.c=r,this.options=a||{},this.text=t||"",this.partials=e.partials||{},this.subs=e.subs||{},this.buf=""},e.Template.prototype={r:function(){return""},v:function(e){return e=r(e),d.test(e)?e.replace(a,"&amp;").replace(n,"&lt;").replace(i,"&gt;").replace(s,"&#39;").replace(o,"&quot;"):e},t:r,render:function(e,t,r){return this.ri([e],t||{},r)},ri:function(e,t,r){return this.r(e,t,r)},ep:function(e,t){var r=this.partials[e],a=t[r.name];if(r.instance&&r.base==a)return r.instance;if("string"==typeof a){if(!this.c)throw new Error("No compiler available.");a=this.c.compile(a,this.options)}if(!a)return null;if(this.partials[e].base=a,r.subs){for(key in t.stackText||(t.stackText={}),r.subs)t.stackText[key]||(t.stackText[key]=void 0!==this.activeSub&&t.stackText[this.activeSub]?t.stackText[this.activeSub]:this.text);a=function(e,t,r,a,n,i){function s(){}function o(){}s.prototype=e,o.prototype=e.subs;var d,c=new s;for(d in c.subs=new o,c.subsText={},c.buf="",a=a||{},c.stackSubs=a,c.subsText=i,t)a[d]||(a[d]=t[d]);for(d in a)c.subs[d]=a[d];for(d in n=n||{},c.stackPartials=n,r)n[d]||(n[d]=r[d]);for(d in n)c.partials[d]=n[d];return c}(a,r.subs,r.partials,this.stackSubs,this.stackPartials,t.stackText)}return this.partials[e].instance=a,a},rp:function(e,t,r,a){var n=this.ep(e,r);return n?n.ri(t,r,a):""},rs:function(e,t,r){var a=e[e.length-1];if(c(a))for(var n=0;n<a.length;n++)e.push(a[n]),r(e,t,this),e.pop();else r(e,t,this)},s:function(e,t,r,a,n,i,s){var o;return(!c(e)||0!==e.length)&&("function"==typeof e&&(e=this.ms(e,t,r,a,n,i,s)),o=!!e,!a&&o&&t&&t.push("object"==typeof e?e:t[t.length-1]),o)},d:function(e,r,a,n){var i,s=e.split("."),o=this.f(s[0],r,a,n),d=this.options.modelGet,l=null;if("."===e&&c(r[r.length-2]))o=r[r.length-1];else for(var u=1;u<s.length;u++)void 0!==(i=t(s[u],o,d))?(l=o,o=i):o="";return!(n&&!o)&&(n||"function"!=typeof o||(r.push(l),o=this.mv(o,r,a),r.pop()),o)},f:function(e,r,a,n){for(var i=!1,s=!1,o=this.options.modelGet,d=r.length-1;d>=0;d--)if(void 0!==(i=t(e,r[d],o))){s=!0;break}return s?(n||"function"!=typeof i||(i=this.mv(i,r,a)),i):!n&&""},ls:function(e,t,a,n,i){var s=this.options.delimiters;return this.options.delimiters=i,this.b(this.ct(r(e.call(t,n)),t,a)),this.options.delimiters=s,!1},ct:function(e,t,r){if(this.options.disableLambda)throw new Error("Lambda features disabled.");return this.c.compile(e,this.options).render(t,r)},b:function(e){this.buf+=e},fl:function(){var e=this.buf;return this.buf="",e},ms:function(e,t,r,a,n,i,s){var o,d=t[t.length-1],c=e.call(d);return"function"==typeof c?!!a||(o=this.activeSub&&this.subsText&&this.subsText[this.activeSub]?this.subsText[this.activeSub]:this.text,this.ls(c,d,r,o.substring(n,i),s)):c},mv:function(e,t,a){var n=t[t.length-1],i=e.call(n);return"function"==typeof i?this.ct(r(i.call(n)),n,a):i},sub:function(e,t,r,a){var n=this.subs[e];n&&(this.activeSub=e,n(t,r,this,a),this.activeSub=!1)}};var a=/&/g,n=/</g,i=/>/g,s=/\'/g,o=/\"/g,d=/[&<>\"\']/,c=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}}("undefined"!=typeof exports?exports:Hogan),function(e){function t(e){"}"===e.n.substr(e.n.length-1)&&(e.n=e.n.substring(0,e.n.length-1))}function r(e){return e.trim?e.trim():e.replace(/^\s*|\s*$/g,"")}function a(e,t,r){if(t.charAt(r)!=e.charAt(0))return!1;for(var a=1,n=e.length;n>a;a++)if(t.charAt(r+a)!=e.charAt(a))return!1;return!0}function n(t,r,a,o){var d,c=[],l=null,u=null;for(d=a[a.length-1];t.length>0;){if(u=t.shift(),d&&"<"==d.tag&&!(u.tag in y))throw new Error("Illegal content in < super tag.");if(e.tags[u.tag]<=e.tags.$||i(u,o))a.push(u),u.nodes=n(t,u.tag,a,o);else{if("/"==u.tag){if(0===a.length)throw new Error("Closing tag without opener: /"+u.n);if(l=a.pop(),u.n!=l.n&&!s(u.n,l.n,o))throw new Error("Nesting error: "+l.n+" vs. "+u.n);return l.end=u.i,c}"\n"==u.tag&&(u.last=0==t.length||"\n"==t[0].tag)}c.push(u)}if(a.length>0)throw new Error("missing closing tag: "+a.pop().n);return c}function i(e,t){for(var r=0,a=t.length;a>r;r++)if(t[r].o==e.n)return e.tag="#",!0}function s(e,t,r){for(var a=0,n=r.length;n>a;a++)if(r[a].c==e&&r[a].o==t)return!0}function o(e){var t=[];for(var r in e.partials)t.push('"'+d(r)+'":{name:"'+d(e.partials[r].name)+'", '+o(e.partials[r])+"}");return"partials: {"+t.join(",")+"}, subs: "+function(e){var t=[];for(var r in e)t.push('"'+d(r)+'": function(c,p,t,i) {'+e[r]+"}");return"{ "+t.join(",")+" }"}(e.subs)}function d(e){return e.replace(v,"\\\\").replace(h,'\\"').replace(f,"\\n").replace(m,"\\r").replace(g,"\\u2028").replace(_,"\\u2029")}function c(e){return~e.indexOf(".")?"d":"f"}function l(e,t){var r="<"+(t.prefix||"")+e.n+w++;return t.partials[r]={name:e.n,partials:{}},t.code+='t.b(t.rp("'+d(r)+'",c,p,"'+(e.indent||"")+'"));',r}function u(e,t){t.code+="t.b(t.t(t."+c(e.n)+'("'+d(e.n)+'",c,p,0)));'}function b(e){return"t.b("+e+");"}var p=/\S/,h=/\"/g,f=/\n/g,m=/\r/g,v=/\\/g,g=/\u2028/,_=/\u2029/;e.tags={"#":1,"^":2,"<":3,$:4,"/":5,"!":6,">":7,"=":8,_v:9,"{":10,"&":11,_t:12},e.scan=function(n,i){function s(){f.length>0&&(m.push({tag:"_t",text:new String(f)}),f="")}function o(){for(var t=!0,r=_;r<m.length;r++)if(!(t=e.tags[m[r].tag]<e.tags._v||"_t"==m[r].tag&&null===m[r].text.match(p)))return!1;return t}function d(e,t){if(s(),e&&o())for(var r,a=_;a<m.length;a++)m[a].text&&((r=m[a+1])&&">"==r.tag&&(r.indent=m[a].text.toString()),m.splice(a,1));else t||m.push({tag:"\n"});v=!1,_=m.length}function c(e,t){var a="="+w,n=e.indexOf(a,t),i=r(e.substring(e.indexOf("=",t)+1,n)).split(" ");return y=i[0],w=i[i.length-1],n+a.length-1}var l=n.length,u=0,b=null,h=null,f="",m=[],v=!1,g=0,_=0,y="{{",w="}}";for(i&&(i=i.split(" "),y=i[0],w=i[1]),g=0;l>g;g++)0==u?a(y,n,g)?(--g,s(),u=1):"\n"==n.charAt(g)?d(v):f+=n.charAt(g):1==u?(g+=y.length-1,"="==(b=(h=e.tags[n.charAt(g+1)])?n.charAt(g+1):"_v")?(g=c(n,g),u=0):(h&&g++,u=2),v=g):a(w,n,g)?(m.push({tag:b,n:r(f),otag:y,ctag:w,i:"/"==b?v-y.length:g+w.length}),f="",g+=w.length-1,u=0,"{"==b&&("}}"==w?g++:t(m[m.length-1]))):f+=n.charAt(g);return d(v,!0),m};var y={_t:!0,"\n":!0,$:!0,"/":!0};e.stringify=function(t){return"{code: function (c,p,i) { "+e.wrapMain(t.code)+" },"+o(t)+"}"};var w=0;e.generate=function(t,r,a){w=0;var n={code:"",subs:{},partials:{}};return e.walk(t,n),a.asString?this.stringify(n,r,a):this.makeTemplate(n,r,a)},e.wrapMain=function(e){return'var t=this;t.b(i=i||"");'+e+"return t.fl();"},e.template=e.Template,e.makeTemplate=function(e,t,r){var a=this.makePartials(e);return a.code=new Function("c","p","i",this.wrapMain(e.code)),new this.template(a,t,this,r)},e.makePartials=function(e){var t,r={subs:{},partials:e.partials,name:e.name};for(t in r.partials)r.partials[t]=this.makePartials(r.partials[t]);for(t in e.subs)r.subs[t]=new Function("c","p","t","i",e.subs[t]);return r},e.codegen={"#":function(t,r){r.code+="if(t.s(t."+c(t.n)+'("'+d(t.n)+'",c,p,1),c,p,0,'+t.i+","+t.end+',"'+t.otag+" "+t.ctag+'")){t.rs(c,p,function(c,p,t){',e.walk(t.nodes,r),r.code+="});c.pop();}"},"^":function(t,r){r.code+="if(!t.s(t."+c(t.n)+'("'+d(t.n)+'",c,p,1),c,p,1,0,0,"")){',e.walk(t.nodes,r),r.code+="};"},">":l,"<":function(t,r){var a={partials:{},code:"",subs:{},inPartial:!0};e.walk(t.nodes,a);var n=r.partials[l(t,r)];n.subs=a.subs,n.partials=a.partials},$:function(t,r){var a={subs:{},code:"",partials:r.partials,prefix:t.n};e.walk(t.nodes,a),r.subs[t.n]=a.code,r.inPartial||(r.code+='t.sub("'+d(t.n)+'",c,p,i);')},"\n":function(e,t){t.code+=b('"\\n"'+(e.last?"":" + i"))},_v:function(e,t){t.code+="t.b(t.v(t."+c(e.n)+'("'+d(e.n)+'",c,p,0)));'},_t:function(e,t){t.code+=b('"'+d(e.text)+'"')},"{":u,"&":u},e.walk=function(t,r){for(var a,n=0,i=t.length;i>n;n++)(a=e.codegen[t[n].tag])&&a(t[n],r);return r},e.parse=function(e,t,r){return n(e,0,[],(r=r||{}).sectionTags||[])},e.cache={},e.cacheKey=function(e,t){return[e,!!t.asString,!!t.disableLambda,t.delimiters,!!t.modelGet].join("||")},e.compile=function(t,r){r=r||{};var a=e.cacheKey(t,r),n=this.cache[a];if(n){var i=n.partials;for(var s in i)delete i[s].instance;return n}return n=this.generate(this.parse(this.scan(t,r.delimiters),t,r),t,r),this.cache[a]=n}}("undefined"!=typeof exports?exports:Hogan);var templates={};templates["find/decrypted"]=new Hogan.Template({code:function(e,t,r){var a=this;return a.b(r=r||""),a.b("<div>\r"),a.b("\n"+r),a.b("    <hr />\r"),a.b("\n"+r),a.b('    <p class="lead">Password: <code>'),a.b(a.v(a.d("data.decrypted",e,t,0))),a.b("</code></p>\r"),a.b("\n"+r),a.b('    <p class="lead">You Paid: '),a.b(a.v(a.d("data.price",e,t,0))),a.b("</p>\r"),a.b("\n"+r),a.s(a.d("data.expiration",e,t,1),e,t,0,162,240,"{{ }}")&&(a.rs(e,t,function(e,t,a){a.b('        <p class="lead">Password Expires On: '),a.b(a.v(a.d("data.expiration",e,t,0))),a.b("</p>\r"),a.b("\n"+r)}),e.pop()),a.b("</div>\r"),a.b("\n"+r),a.b('<form id="unlock" class="form-group">\r'),a.b("\n"+r),a.b("    </hr>\r"),a.b("\n"+r),a.b("    <label \r"),a.b("\n"+r),a.b('        style="color: hsla(0,0%,10%,.7);     font-size: 13px;    font-weight: 500;" \r'),a.b("\n"+r),a.b('        for="lookup"\r'),a.b("\n"+r),a.b("    >Key To Unlock Your Password</label>\r"),a.b("\n"+r),a.b("    <input \r"),a.b("\n"+r),a.b('        placeholder="LOOKUP KEY" \r'),a.b("\n"+r),a.b('        id="lookup" \r'),a.b("\n"+r),a.b('        name="lookup"\r'),a.b("\n"+r),a.b('        class="sq-input real"></input>\r'),a.b("\n"+r),a.b('    <button id="btnSearchRecord" data-role="form" data-attr="submit" class="btn button-credit-card">SEARCH</button>\r'),a.b("\n"+r),a.b("</form>"),a.fl()},partials:{},subs:{}}),templates["find/empty"]=new Hogan.Template({code:function(e,t,r){var a=this;return a.b(r=r||""),a.b('<form id="unlock" class="form-group">\r'),a.b("\n"+r),a.b("    <hr />\r"),a.b("\n"+r),a.b('    <label for="lookup" style="color: hsla(0,0%,10%,.7);     font-size: 13px;    font-weight: 500;" >Key To Unlock Your Password</label>\r'),a.b("\n"+r),a.b('    <input placeholder="LOOKUP KEY" name="lookup" id="lookup" class="sq-input real"></input>\r'),a.b("\n"+r),a.b('    <button id="btnSearchRecord" data-role="form" data-attr="submit" class="btn button-credit-card">SEARCH</button>\r'),a.b("\n"+r),a.b("</form>"),a.fl()},partials:{},subs:{}}),templates["find/encrypted"]=new Hogan.Template({code:function(e,t,r){var a=this;return a.b(r=r||""),a.b('<div style="word-break: break-word">\r'),a.b("\n"+r),a.b("    <hr />\r"),a.b("\n"+r),a.b("\r"),a.b("\n"+r),a.b('    <p class="lead"><code>'),a.b(a.v(a.d("data.id",e,t,0))),a.b("</code></p>\r"),a.b("\n"+r),a.b('    <p class="lead">This is the password you\'re unlocking. The price to unlock it is: <b>$'),a.b(a.v(a.d("data.price",e,t,0))),a.b("</b>. The proceeds benefit <b>"),a.b(a.v(a.d("data.cause",e,t,0))),a.b(".</b>"),a.s(a.d("data.expiration",e,t,1),e,t,0,275,353,"{{ }}")&&(a.rs(e,t,function(e,t,r){r.b("The lock expires on <b>"),r.b(r.v(r.d("data.expiration",e,t,0))),r.b("</b> at which point you owe nothing.")}),e.pop()),a.b("</p>\r"),a.b("\n"+r),a.b("\r"),a.b("\n"+r),a.b("    <hr />\r"),a.b("\n"+r),a.b("</div>\r"),a.b("\n"+r),a.b("\r"),a.b("\n"+r),a.b('<div class="form-container" id="unlock_square">\r'),a.b("\n"+r),a.b('    <div class="form-group">\r'),a.b("\n"+r),a.b('        <label style="color: hsla(0,0%,10%,.7);     font-size: 13px;    font-weight: 500;" >CARD INFORMATION</label>\r'),a.b("\n"+r),a.b('        <div id="sq-card-number-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" data-role="square" data-squareattr="cardNumber" data-placeholder="Card Number" ></div>\r'),a.b("\n"+r),a.b('        <span data-flag-for="sq-card-number-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" class="light-hidden"></span>\r'),a.b("\n"+r),a.b("    </div>\r"),a.b("\n"+r),a.b('    <div class="form-container">\r'),a.b("\n"+r),a.b('        <div class="form-group  col-md-6 col-sm-6 col-xs-6" style="padding-left: 0px; padding-right: 0px;">\r'),a.b("\n"+r),a.b('            <div id="sq-expiration-date-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" data-role="square" data-squareattr="cvv" data-placeholder="CVV" class="third" ></div>\r'),a.b("\n"+r),a.b('            <span data-flag-for="sq-expiration-date-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" class="light-hidden"></span>\r'),a.b("\n"+r),a.b("        </div>\r"),a.b("\n"+r),a.b('        <div class="form-group  col-md-6 col-sm-6 col-xs-6" style="padding-left: 0px; padding-right: 0px;">\r'),a.b("\n"+r),a.b('            <div id="sq-cvv-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" data-role="square" data-squareattr="expirationDate" data-placeholder="MM/YY" class="third" ></div>\r'),a.b("\n"+r),a.b('            <span data-flag-for="sq-cvv-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" class="light-hidden"></span>\r'),a.b("\n"+r),a.b("        </div>\r"),a.b("\n"+r),a.b("    </div>\r"),a.b("\n"+r),a.b('    <div class="form-group">\r'),a.b("\n"+r),a.b('        <div id="sq-postal-code-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" data-role="square" data-squareattr="postalCode" data-placeholder="Postal Code" class="third"></div>\r'),a.b("\n"+r),a.b('        <span data-flag-for="sq-postal-code-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" class="light-hidden"></span>\r'),a.b("\n"+r),a.b("    </div>\r"),a.b("\n"+r),a.b('    <button id="btnUnLockRecord-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" data-role="form" data-attr="submit" class="btn button-credit-card">Pay $'),a.b(a.v(a.d("data.price",e,t,0))),a.b("</button>\r"),a.b("\n"+r),a.b("</div> \x3c!-- end #form-container --\x3e"),a.fl()},partials:{},subs:{}}),templates["find/error"]=new Hogan.Template({code:function(e,t,r){var a=this;return a.b(r=r||""),a.b('<div style="border-color: #a94442;" class="alert alert-danger" role="alert">\r'),a.b("\n"+r),a.b('  <a href="#" class="alert-link">'),a.b(a.v(a.f("message",e,t,0))),a.b("</a>\r"),a.b("\n"+r),a.b("</div>\r"),a.b("\n"+r),a.b('<form id="unlock" class="form-group">\r'),a.b("\n"+r),a.b('    <label for="lookup" style="color: hsla(0,0%,10%,.7);     font-size: 13px;    font-weight: 500;" >Key To Unlock Your Password</label>\r'),a.b("\n"+r),a.b('    <input name="lookup" placeholder="LOOKUP KEY" id="lookup" class="sq-input real"></input>\r'),a.b("\n"+r),a.b('    <button id="btnSearchRecord" data-role="form" data-attr="submit" class="btn button-credit-card">SEARCH</button>\r'),a.b("\n"+r),a.b("</form>"),a.fl()},partials:{},subs:{}}),templates["lock/pay-fail"]=new Hogan.Template({code:function(e,t,r){var a=this;return a.b(r=r||""),a.b("\x3c!-- Modal --\x3e\r"),a.b("\n"+r),a.b("\r"),a.b("\n"+r),a.b('  <div class="modal-dialog '),a.s(a.f("large",e,t,1),e,t,0,55,63,"{{ }}")&&(a.rs(e,t,function(e,t,r){r.b("modal-lg")}),e.pop()),a.b('" role="document">\r'),a.b("\n"+r),a.b('    <div class="modal-content">\r'),a.b("\n"+r),a.b("      \x3c!-- HEADER --\x3e\r"),a.b("\n"+r),a.b('      <div class="modal-header">\r'),a.b("\n"+r),a.b('        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\r'),a.b("\n"+r),a.b('        <h4 class="modal-title" id="myModalLabel">'),a.b(a.v(a.f("title",e,t,0))),a.b("</h4>\r"),a.b("\n"+r),a.b("      </div>\r"),a.b("\n"+r),a.b('      <div class="modal-body" id="modal_body">'),a.b(a.t(a.f("body",e,t,0))),a.b("</div>\r"),a.b("\n"+r),a.b("    </div>\r"),a.b("\n"+r),a.b("  </div>"),a.fl()},partials:{},subs:{}}),templates["lock/pay-success"]=new Hogan.Template({code:function(e,t,r){var a=this;return a.b(r=r||""),a.b("\r"),a.b("\n"+r),a.b('<div style="margin-top: 20px; margin-bottom: 20px; word-wrap: break-word">\r'),a.b("\n"+r),a.b('    <div class="col-md-12">\r'),a.b("\n"+r),a.b("        <hr></hr>\r"),a.b("\n"+r),a.b('        <p class="lead"><a href="./#q='),a.b(a.v(a.f("key",e,t,0))),a.b('"><code>'),a.b(a.v(a.f("key",e,t,0))),a.b("</code></a></p>\r"),a.b("\n"+r),a.b('        <p class="lead">1.) Bookmark this page. The URL has your unique key</p>\r'),a.b("\n"+r),a.b('        <p class="lead">2.) Whenever you need this password back; go to that bookmark.</p>\r'),a.b("\n"+r),a.b('        <p class="lead">3.) Do *NOT* Share this link with anyone. Whoever has it (and pays money) can see your password.</p>\r'),a.b("\n"+r),a.b('        <p class="lead">Optional.) If you don\'t want to bookmark it, you can just search for it with the key above:</p>\r'),a.b("\n"+r),a.b("        <hr></hr>\r"),a.b("\n"+r),a.b("    </div>\r"),a.b("\n"+r),a.b("</div>"),a.fl()},partials:{},subs:{}}),templates.modal=new Hogan.Template({code:function(e,t,r){var a=this;return a.b(r=r||""),a.b("\x3c!-- Modal --\x3e\r"),a.b("\n"+r),a.b("\r"),a.b("\n"+r),a.b('  <div class="modal-dialog '),a.s(a.f("large",e,t,1),e,t,0,55,63,"{{ }}")&&(a.rs(e,t,function(e,t,r){r.b("modal-lg")}),e.pop()),a.b('" role="document">\r'),a.b("\n"+r),a.b('    <div class="modal-content">\r'),a.b("\n"+r),a.b("      \x3c!-- HEADER --\x3e\r"),a.b("\n"+r),a.b('      <div class="modal-header">\r'),a.b("\n"+r),a.b('        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\r'),a.b("\n"+r),a.b('        <h4 class="modal-title" id="myModalLabel">'),a.b(a.v(a.f("title",e,t,0))),a.b("</h4>\r"),a.b("\n"+r),a.b("      </div>\r"),a.b("\n"+r),a.b('      <div class="modal-body" id="modal_body">'),a.b(a.t(a.f("body",e,t,0))),a.b("</div>\r"),a.b("\n"+r),a.b("    </div>\r"),a.b("\n"+r),a.b("  </div>"),a.fl()},partials:{},subs:{}}),templates["unlock/decrypted"]=new Hogan.Template({code:function(e,t,r){var a=this;return a.b(r=r||""),a.b("<div>\r"),a.b("\n"+r),a.b('    <p class="lead">Password: <code>'),a.b(a.v(a.d("data.decrypted",e,t,0))),a.b("</code></p>\r"),a.b("\n"+r),a.b('    <p class="lead">You Paid: '),a.b(a.v(a.d("data.price",e,t,0))),a.b("</p>\r"),a.b("\n"+r),a.s(a.d("data.expiration",e,t,1),e,t,0,150,228,"{{ }}")&&(a.rs(e,t,function(e,t,a){a.b('        <p class="lead">Password Expires On: '),a.b(a.v(a.d("data.expiration",e,t,0))),a.b("</p>\r"),a.b("\n"+r)}),e.pop()),a.b("</div>"),a.fl()},partials:{},subs:{}}),templates["unlock/encrypted"]=new Hogan.Template({code:function(e,t,r){var a=this;return a.b(r=r||""),a.b('<div style="word-break: break-word">\r'),a.b("\n"+r),a.b("    <hr />\r"),a.b("\n"+r),a.b("\r"),a.b("\n"+r),a.b('    <p class="lead">The password you\'re unlocking is <code>'),a.b(a.v(a.d("data.id",e,t,0))),a.b("</code>. </p>\r"),a.b("\n"+r),a.b('    <p class="lead">The price to unlock it is: <b>$'),a.b(a.v(a.d("data.price",e,t,0))),a.b("</b>. The proceeds benefit <b>"),a.b(a.v(a.d("data.cause",e,t,0))),a.b(".</b></p>\r"),a.b("\n"+r),a.b('    <p class="lead">'),a.s(a.d("data.expiration",e,t,1),e,t,0,297,368,"{{ }}")&&(a.rs(e,t,function(e,t,r){r.b("The lock expires on "),r.b(r.v(r.d("data.expiration",e,t,0))),r.b(" at which point you owe nothing.")}),e.pop()),a.b("</p>\r"),a.b("\n"+r),a.b("\r"),a.b("\n"+r),a.b("    <hr />\r"),a.b("\n"+r),a.b("</div>\r"),a.b("\n"+r),a.b("\r"),a.b("\n"+r),a.b('<div class="form-container" id="unlock_square">\r'),a.b("\n"+r),a.b('    <div class="form-group">\r'),a.b("\n"+r),a.b('        <label style="color: hsla(0,0%,10%,.7);     font-size: 13px;    font-weight: 500;" >CARD INFORMATION</label>\r'),a.b("\n"+r),a.b('        <div id="sq-card-number-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" data-role="square" data-squareattr="cardNumber" data-placeholder="Card Number" ></div>\r'),a.b("\n"+r),a.b('        <span data-flag-for="sq-card-number-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" class="light-hidden"></span>\r'),a.b("\n"+r),a.b("    </div>\r"),a.b("\n"+r),a.b('    <div class="form-container">\r'),a.b("\n"+r),a.b('        <div class="form-group  col-md-6 col-sm-6 col-xs-6" style="padding-left: 0px; padding-right: 0px;">\r'),a.b("\n"+r),a.b('            <div id="sq-expiration-date-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" data-role="square" data-squareattr="cvv" data-placeholder="CVV" class="third" ></div>\r'),a.b("\n"+r),a.b('            <span data-flag-for="sq-expiration-date-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" class="light-hidden"></span>\r'),a.b("\n"+r),a.b("        </div>\r"),a.b("\n"+r),a.b('        <div class="form-group  col-md-6 col-sm-6 col-xs-6" style="padding-left: 0px; padding-right: 0px;">\r'),a.b("\n"+r),a.b('            <div id="sq-cvv-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" data-role="square" data-squareattr="expirationDate" data-placeholder="MM/YY" class="third" ></div>\r'),a.b("\n"+r),a.b('            <span data-flag-for="sq-cvv-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" class="light-hidden"></span>\r'),a.b("\n"+r),a.b("        </div>\r"),a.b("\n"+r),a.b("    </div>\r"),a.b("\n"+r),a.b('    <div class="form-group">\r'),a.b("\n"+r),a.b('        <div id="sq-postal-code-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" data-role="square" data-squareattr="postalCode" data-placeholder="Postal Code" class="third"></div>\r'),a.b("\n"+r),a.b('        <span data-flag-for="sq-postal-code-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" class="light-hidden"></span>\r'),a.b("\n"+r),a.b("    </div>\r"),a.b("\n"+r),a.b('    <button id="btnUnLockRecord-'),a.b(a.v(a.d("data.id",e,t,0))),a.b('" data-role="form" data-attr="submit" class="btn button-credit-card">Pay $'),a.b(a.v(a.d("data.price",e,t,0))),a.b("</button>\r"),a.b("\n"+r),a.b("</div> \x3c!-- end #form-container --\x3e"),a.fl()},partials:{},subs:{}});class SimpleEvents{addEventListener(e,t){this.radio||(this.radio=document.createDocumentFragment()),this.radio.addEventListener(e,t)}__broadcast(e,t){this.radio||(this.radio=document.createDocumentFragment());let r=new Event(e,{name:e,info:t});this.radio.dispatchEvent(r)}}class AllForms extends SimpleEvents{constructor(){super();this.LockSection=document.querySelector("#form-1"),this.UnLockSection=document.querySelector("#form-2"),this.buttons={btnLockForm:document.getElementById("btnLockForm"),btnUnLockForm:document.getElementById("btnUnLockForm")};let e=!1;window.location.hash.length>0?(e=window.location.hash,this.__showUnLock()):this.__showLock(),this.LockForm=new LockForm,this.UnLockForm=new UnLockForm(e),this.__registerEvents()}__showLock(){this.buttons.btnLockForm.classList.add("active"),this.buttons.btnUnLockForm.classList.remove("active"),this.LockSection.classList.remove("hide-small"),this.UnLockSection.classList.add("hide-small")}__showUnLock(){this.buttons.btnUnLockForm.classList.add("active"),this.buttons.btnLockForm.classList.remove("active"),this.LockSection.classList.add("hide-small"),this.UnLockSection.classList.remove("hide-small")}__registerEvents(){let e=this;this.buttons.btnLockForm.onclick=function(){e.__showLock()},this.buttons.btnUnLockForm.onclick=function(){e.__showUnLock()},window.addEventListener("hashchange",function(){e.UnLockForm.renderLockStatus(window.location.hash)},!1)}}class LockForm extends SimpleEvents{constructor(){super();let e=this;this.ui={},this.ui.user=new SimpleForm(document.getElementById("lock")),this.ui.square=new SquareForm(document.getElementById("lock_square")),this.ui.btnCreateRecord=document.getElementById("btnCreateRecord"),this.API=new ApiBridge,this.ui.btnCreateRecord.onclick=function(t){e.__createRecord()}}__createRecord(){this.ui.btnCreateRecord.disabled=!0;let e=this;this.ui.user.validate()?this.ui.square.requestCardNonce().then(t=>e.API.createRecord(e.ui.square.nonce,e.ui.user.fields.message.value,e.ui.user.fields.price.value,e.ui.user.fields.expiration.value,e.ui.user.fields.cause.value)).catch(t=>(e.ui.btnCreateRecord.disabled=!1,Promise.reject(t))).then(t=>(console.log("SUCCESS",t),document.location.hash=`q=${t.key}`,document.querySelector("#lock_results").innerHTML=templates["lock/pay-success"].render(t),e.ui.btnCreateRecord.disabled=!1,e.ui.square.destroy(),e.ui.user.empty(),e.ui.square.build(),document.getElementById("form-1").scrollIntoView(),!0)).catch(t=>(console.log("FAIL - CARD ERROR",t),e.ui.btnCreateRecord.disabled=!1,Array.from(t.data.response.text.errors).forEach(function(t){e.ui.square.payError(t.code)}),!1)):e.ui.btnCreateRecord.disabled=!1}}class UnLockForm extends SimpleEvents{constructor(e){super();this.hash=e,this.ui={user:new SimpleForm(document.getElementById("outer-unlock")),searchTarget:document.getElementById("unlock_results")},this.API=new ApiBridge,e?this.renderLockStatus(e):this.renderLockStatus(!1)}renderLockStatus(e){let t=this;e?(this.hash=e,this.API.findRecord(e).then(e=>{e.data.decrypted?t.ui.searchTarget.innerHTML=templates["find/decrypted"].render(e):(t.ui.searchTarget.innerHTML=templates["find/encrypted"].render(e),t.ui.square=new SquareForm(document.querySelector("#unlock_square")),t.ui.square.id=e.data.id,t.ui.square.price=e.data.price,t.ui.btnUnLockRecord=document.getElementById(`btnUnLockRecord-${e.data.id}`),t.ui.btnUnLockRecord.onclick=function(e){t.__payOffRecord(e,this)})}).catch(e=>{console.log(e),t.ui.searchTarget.innerHTML=templates["find/error"].render(e),t.ui.user=new SimpleForm(document.getElementById("unlock")),t.ui.btnSearchRecord=document.getElementById("btnSearchRecord"),t.ui.btnSearchRecord.onclick=function(e){e.preventDefault(),t.renderLockStatus(t.ui.user.fields.lookup.value)}})):(t.ui.searchTarget.innerHTML=templates["find/empty"].render(),t.ui.user=new SimpleForm(document.getElementById("unlock")),t.ui.btnSearchRecord=document.getElementById("btnSearchRecord"),t.ui.btnSearchRecord.onclick=function(e){e.preventDefault(),t.renderLockStatus(t.ui.user.fields.lookup.value)})}__payOffRecord(e,t){t.disabled=!0;let r=this;this.ui.square.requestCardNonce().then(e=>{let t=r.ui.square.id,a=r.ui.square.price,n=r.ui.square.nonce;return r.API.updateRecord(t,n,a)}).catch(e=>(t.disabled=!1,Promise.reject(e))).then(e=>{r.hash||(r.hash=r.ui.user.fields.lookup.value);let a=r.hash.match(/[A-Za-z0-9\=]+$/)[0];EzCrypto.decrypt(e.data.key,a,e.data.message).then(a=>{console.log(e,a),e.data.decrypted=a,t.disabled=!1,r.ui.square.destroy(),r.ui.searchTarget.innerHTML=templates["find/decrypted"].render(e),document.getElementById("form-2").scrollIntoView()})}).catch(e=>(console.log("FAIL - CARD ERROR",e),Array.from(e.data.response.text.errors).forEach(function(e){r.ui.square.payError(e.code)}),t.disabled=!1,!1))}}window.envVariables={dev:{applicationId:"sandbox-sq0idb-ql9ntpIplhCuwt96Ccw3rQ",apiUrl:"https://dev-api.addictionlocker.com/"},prod:{applicationId:"sq0idp-H8L5TdNIi-WtNYq0CTp2ew",apiUrl:"https://api.addictionlocker.com/"}};class ApiBridge extends SimpleEvents{constructor(){super(),this._private_={}}createRecord(e,t,r,a,n){let i,s=this;return EzCrypto.encrypt(t).then(t=>(i=t.lookup+"-"+t.nonce,delete t.nonce,t.nonce=e,t.price=r,t.expiration=a,t.cause=n,t)).catch(e=>Promise.reject(e)).then(e=>s.__sendToServer("POST","create",e)).then(e=>Promise.resolve({key:i,data:e})).catch(e=>Promise.reject(e))}updateRecord(e,t,r){let a={nonce:t,price:r};return this.__sendToServer("POST",`update/${e}`,a).then(e=>Promise.resolve(e)).catch(e=>Promise.reject(e))}findRecord(e){let t=e.match(/[A-Za-z0-9]+\-.*/)[0].split("-"),r=t[0],a=t[1];return this.__sendToServer("GET",`find/${r}`,{}).then(e=>e.data.key?EzCrypto.decrypt(e.data.key,a,e.data.message).then(t=>(e.data.decrypted=t,Promise.resolve(e))):Promise.resolve(e)).catch(e=>Promise.reject(e))}__sendToServer(e,t,r){let a={method:e,headers:{accept:"application/json","content-type":"application/json"},body:JSON.stringify(r)};return"GET"==e&&delete a.body,fetch(window.envVariables[window.env].apiUrl+t,a).then(e=>e.ok?e.json():e.json().then(e=>Promise.reject(e))).catch(e=>Promise.reject(e))}}class EzCrypto{static encrypt(e){let t=this,r={};return window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt"]).then(t=>(r.key=t,e=(new TextEncoder).encode(e),r.nonce=window.crypto.getRandomValues(new Uint8Array(12)),window.crypto.subtle.encrypt({name:"AES-GCM",iv:r.nonce},t,e))).then(e=>(r.message=e,window.crypto.subtle.exportKey("raw",r.key))).then(e=>(r.nonce=btoa(JSON.stringify(Object.values(r.nonce))),r.key=btoa(JSON.stringify(Object.values(new Uint8Array(e)))),r.message=btoa(JSON.stringify(Object.values(new Uint8Array(r.message)))),t.randomHash())).then(e=>(r.lookup=e,r))}static decrypt(e,t,r){return t=new Uint8Array(JSON.parse(atob(t))).buffer,r=new Uint8Array(JSON.parse(atob(r))).buffer,e=new Uint8Array(JSON.parse(atob(e))).buffer,window.crypto.subtle.importKey("raw",e,"AES-GCM",!0,["encrypt","decrypt"]).then(e=>window.crypto.subtle.decrypt({name:"AES-GCM",iv:t},e,r)).then(e=>(new TextDecoder).decode(e))}static randomHash(){const e=window.crypto.getRandomValues(new Uint32Array(10)).join(),t=(new TextEncoder).encode(e);return crypto.subtle.digest("SHA-256",t).then(e=>{return Array.from(new Uint8Array(e)).map(e=>e.toString(16).padStart(2,"0")).join("")})}}class SimpleField extends SimpleEvents{constructor(e){super(),this._private_={};let t=this;switch(this._private_.el=e,this._private_.flag_el=e.parentElement.querySelector(`[data-flag-for='${e.id}']`),e.onblur=function(){t.validate()},e.type){case"date":this.__setDateMinAndMax()}}validate(){return this._private_.el.classList.add("dirty"),!!this._private_.el.checkValidity()||(this.flag=this._private_.el.validationMessage,!1)}get flag(){return this._private_.flag_el?this._private_.flag_el.innerText:null}set flag(e){return!!this._private_.flag_el&&(this._private_.flag_el.innerText=e,!0)}get value(){return this._private_.el.value}set value(e){this._private_.el.value=e}get id(){return this._private_.el.id}empty(){this._private_.el.classList.remove("dirty"),this._private_.el.value=""}__setDateMinAndMax(){let e=this._private_.el;if(e.min)if("today"===e.min){var t=new Date,r=new Date(t.getTime()-6e4*t.getTimezoneOffset()).toISOString().split("T")[0];e.min=r}else/^[0-9]+$/.test(e.min)&&(t=new Date,r=new Date(864e5*parseFloat(e.min)+t.getTime()-6e4*t.getTimezoneOffset()).toISOString().split("T")[0],e.min=r);/^[0-9]+$/.test(e.max)&&(t=new Date,r=new Date(864e5*parseFloat(e.max)+t.getTime()-6e4*t.getTimezoneOffset()).toISOString().split("T")[0],e.max=r)}}class SimpleForm extends SimpleEvents{constructor(e){super(),this._private_={},this._private_.fields={},this._private_.field_array=[];let t=Array.from(e.elements);for(let e=0;e<t.length;e++)this._private_.fields[t[e].id]=new SimpleField(t[e]),this._private_.field_array.push(this._private_.fields[t[e].id])}get fields(){return this._private_.fields}get values(){return this._private_.field_array.map(function(e){return{id:e.id,value:e.value}})}validate(){let e=!0;for(let t=0;t<this._private_.field_array.length;t++){this._private_.field_array[t].validate()||(e=!1)}return e}empty(){for(let e=0;e<this._private_.field_array.length;e++){this._private_.field_array[e].empty()}}}class SquareForm extends SimpleEvents{constructor(e){super(),this._private_={},this._private_.el=e,this._private_.formData={},this._private_.formObject=null,this._private_.fieldFlags={},this._private_.nonceData=!1,this.__buildFormData()}get nonce(){return!!this._private_.nonceData.nonce&&this._private_.nonceData.nonce}get id(){return!!this._private_.id&&this._private_.id}set id(e){this._private_.id=e}get price(){return!!this._private_.price&&this._private_.price}set price(e){this._private_.price=e}destroy(){if(this._private_.formObject.destroy)return this._private_.formObject.destroy();throw new Error("Method does not exist...")}requestCardNonce(){let e=this;return e._private_.nonceData=!1,new Promise((t,r)=>{if(e._private_.formObject){e._private_.formObject.requestCardNonce();let a=0,n=setInterval(function(){let i=e._private_.nonceData;if(i)return i.errors?(i.errors.forEach(t=>{e.setFlag(t.field,t.message)}),clearInterval(n),void r(i)):(clearInterval(n),void t(i));a>6&&(e.__broadcast("error",{error:!0,message:"Timeout"}),clearInterval(n))},100)}else r({errors:"Form Object not Loaded..."})})}setFlag(e,t){this._private_.fieldFlags[e].innerText=t,this._private_.fieldFlags[e].parentNode.querySelector("iframe").classList.add("sq-input--error")}clearFlag(e){this._private_.fieldFlags[e].innerText="",this._private_.fieldFlags[e].parentNode.querySelector("iframe").classList.remove("sq-input--error")}build(){this.__buildFormData()}__buildFormData(){let e={},t={},r={},a=this;e.applicationId=window.envVariables[window.env].applicationId,e.inputClass="sq-input",e.autoBuild=!1,e.inputStyles=[{fontSize:"16px",lineHeight:"24px",padding:"16px",placeholderColor:"#a0a0a0",backgroundColor:"transparent"}],e.callbacks={cardNonceResponseReceived:function(e,t,r){a._private_.nonceData={errors:e,nonce:t,cardData:r}},inputEventReceived:function(e){"focusClassAdded"==e.eventType&&a.clearFlag(e.field)}},Array.from(this._private_.el.querySelectorAll("[data-role='square']")).forEach(function(r){e[r.dataset.squareattr]={elementId:r.id,placeholder:r.dataset.placeholder},t[r.dataset.squareattr]=r.parentElement.querySelector(`[data-flag-for='${r.id}']`)});try{r=new SqPaymentForm(e)}catch(e){return console.error("Error Creating Form Object",e),this.__broadcast("error",{notes:"Build Form -> New SqPaymentForm",data:e}),!1}try{r.build()}catch(e){return console.error("Error Building Form Object",e),this.__broadcast("error",{notes:"Build Form -> formObject.build",data:e}),!1}return this._private_.formData=e,this._private_.fieldFlags=t,this._private_.formObject=r,!0}payError(e){let t={BAD_EXPIRATION:{descr:"The card expiration date is missing or incorrectly formatted.",el:"expirationDate"},INVALID_ACCOUNT:{descr:"The card issuer was not able to locate the account on record.",el:""},CARDHOLDER_INSUFFICIENT_PERMISSIONS:{descr:"The card issuer has declined the transaction due to restrictions on where the card can be used. For example, a Gift Card is limited to a single seller.",el:""},INSUFFICIENT_PERMISSIONS:{descr:"The Square account does not have the permissions to accept this payment. For example, Square might limit which sellers are allowed to receive Gift Card payments.",el:""},INSUFFICIENT_FUNDS:{descr:"The payment source has insufficient funds to cover the payment.",el:""},INVALID_LOCATION:{descr:"The Square account cannot take payments in the specified region. A Square account can take payments only in the region where the account was created.",el:""},TRANSACTION_LIMIT:{descr:"The card issuer has determined the payment amount is too high or too low. The API returns the error code mostly for credit cards (for example, the card reached the credit limit). However, sometimes the issuer bank can indicate the error for debit or prepaid cards (for example, the card has insufficient funds).",el:""},CARD_EXPIRED:{descr:"The card issuer declined the request because the card is expired.",el:"expirationDate"},CVV_FAILURE:{descr:"The card issuer declined the request because the CVV value is invalid.",el:"cvv"},ADDRESS_VERIFICATION_FAILURE:{descr:"The card issuer declined the request because the postal code is invalid.",el:"postalCode"},TEMPORARY_ERROR:{descr:"A temporary internal error occurred. You can safely retry your call using the same idempotency key.",el:""},VOICE_FAILURE:{descr:"The card issuer declined the request because the issuer requires voice authorization from the cardholder.",el:""},PAN_FAILURE:{descr:"The specified card number is invalid. For example, it is an incorrect length or is incorrectly formatted.",el:""},EXPIRATION_FAILURE:{descr:"The card expiration date is invalid or indicates that the card is expired.",el:"expirationDate"},CARD_NOT_SUPPORTED:{descr:"The card is not supported in the geographic region.",el:""},INVALID_PIN:{descr:"The card issuer declined the request because the PIN is invalid.",el:""},INVALID_POSTAL_CODE:{descr:"The postal code is incorrectly formatted.",el:"postalCode"},CHIP_INSERTION_REQUIRED:{descr:"The card issuer requires reading the card using a chip reader.",el:""},ALLOWABLE_PIN_TRIES_EXCEEDED:{descr:"The card has exhausted its available pin entry retries set by the card issuer. Typically this requires the card holder to resolve the issue by contacting the card issuer.",el:""},MANUALLY_ENTERED_PAYMENT_NOT_SUPPORTED:{descr:"The card must be swiped, tapped, or dipped. Payments attempted by manually entering the card number are declined.",el:""},PAYMENT_LIMIT_EXCEEDED:{descr:"Square declined the request because the payment amount exceeded the processing limit for this seller.",el:""},GENERIC_DECLINE:{descr:"An unexpected error occurred.",el:""},INVALID_FEES:{descr:"The app_fee_money on a payment is too high.",el:""},CARD_DECLINED_VERIFICATION_REQUIRED:{descr:"This payment requires verification. For more information, see SCA Overview.",el:""},INVALID_EXPIRATION:{descr:"Expiration date is invalid",el:"expirationDate"}};if(t[e]){let r=t[e];""==r.el&&(r.el="cardNumber"),this.setFlag(r.el,r.descr)}}}
//# sourceMappingURL=output.big.js.map