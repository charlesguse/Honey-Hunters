var h = void 0, i = !0, k = null, m = !1;
function aa(a) {
  return function() {
    return this[a]
  }
}
var q, ba = ba || {}, r = this;
function ca(a) {
  for(var a = a.split("."), b = r, c;c = a.shift();) {
    if(b[c] != k) {
      b = b[c]
    }else {
      return k
    }
  }
  return b
}
function da() {
}
function ea(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if("[object Window]" == c) {
        return"object"
      }
      if("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
}
function s(a) {
  return a !== h
}
function t(a) {
  return"array" == ea(a)
}
function fa(a) {
  var b = ea(a);
  return"array" == b || "object" == b && "number" == typeof a.length
}
function u(a) {
  return"string" == typeof a
}
function ga(a) {
  return"number" == typeof a
}
function ha(a) {
  return"function" == ea(a)
}
function ia(a) {
  var b = typeof a;
  return"object" == b && a != k || "function" == b
}
function v(a) {
  return a[ja] || (a[ja] = ++ka)
}
var ja = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36), ka = 0;
function la(a, b, c) {
  return a.call.apply(a.bind, arguments)
}
function ma(a, b, c) {
  if(!a) {
    throw Error();
  }
  if(2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c)
    }
  }
  return function() {
    return a.apply(b, arguments)
  }
}
function w(a, b, c) {
  w = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? la : ma;
  return w.apply(k, arguments)
}
function na(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, c);
    return a.apply(this, b)
  }
}
var oa = Date.now || function() {
  return+new Date
};
function z(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.Ma = b.prototype;
  a.prototype = new c
}
;var pa = {}, qa, ra, sa;
function A(a, b) {
  this.x = s(a) ? a : 0;
  this.y = s(b) ? b : 0
}
A.prototype.d = function() {
  return new A(this.x, this.y)
};
A.prototype.toString = function() {
  return"(" + this.x + ", " + this.y + ")"
};
function ta(a, b, c, d) {
  this.top = a;
  this.right = b;
  this.bottom = c;
  this.left = d
}
ta.prototype.d = function() {
  return new ta(this.top, this.right, this.bottom, this.left)
};
ta.prototype.toString = function() {
  return"(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
};
ta.prototype.contains = function(a) {
  return!this || !a ? m : a instanceof ta ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom
};
ta.prototype.expand = function(a, b, c, d) {
  ia(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += b, this.bottom += c, this.left -= d);
  return this
};
function B(a, b) {
  this.width = a;
  this.height = b
}
q = B.prototype;
q.d = function() {
  return new B(this.width, this.height)
};
q.toString = function() {
  return"(" + this.width + " x " + this.height + ")"
};
function ua(a) {
  return a.width * a.height
}
q.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
};
q.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
q.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
q.scale = function(a) {
  this.width *= a;
  this.height *= a;
  return this
};
ta.prototype.size = function() {
  return new B(this.right - this.left, this.bottom - this.top)
};
function va() {
}
va.prototype.A = da;
function C(a) {
  return a.Lc ? a.Lc : a
}
function wa(a, b) {
  xa(b, a);
  b.Lc = C(a);
  return b
}
;var D = new va;
D.xa = function() {
};
D.Ed = function() {
  var a = this.Ha, b = this.xb(), c = this.Z || 1, d = c / a, e;
  if(this.a) {
    this.kb && this.kb.contains(b) && (e = ua(this.kb.size()) / ua(b.size())) && 1.6 > e && 0.5 < e ? b = this.kb : 1 != this.we && 0 != this.c.length && (this instanceof E || b.expand(12, 12, 12, 12));
    this.kb = b;
    var f = b.size();
    e = f.d().scale(c).ceil();
    if(this.a.width != e.width || this.a.height != e.height) {
      this.a.width = e.width, this.a.height = e.height, this.Bb = 1
    }
    var g = this.G.d();
    this.j[ya] && (g = this.j[ya]);
    0 != e.width ? g.scale(f.width * d / e.width) : g.scale(1 / a);
    a = F(this);
    this.Nb = (a.left - b.left) * c;
    this.Ob = (a.top - b.top) * c;
    b = this.f().d();
    a = this.Ea();
    b.width *= a.x;
    b.height *= a.y;
    b = b.scale(c);
    c = this.v.d();
    this.j[H] && (c = this.j[H]);
    c.x *= d;
    c.y *= d;
    c.x -= b.width + this.Nb;
    c.y -= b.height + this.Ob;
    za(this.a, 100 * ((this.Nb + b.width) / e.width), 100 * ((this.Ob + b.height) / e.height), i);
    !this.R[H] && !this.R[ya] && !this.R[Aa] && (d = -(this.F %= 360), s(this.j[Aa]) && (d = -this.j[Aa]), Ba(this.a, Ca(new Da, 0.1).translate(c.x, c.y).scale(g.x, g.y).rotate(d)));
    this.Bb && (d = this.a.getContext("2d"), c = this.Z || 1, d.clearRect(0, 0, e.width, e.height), d.save(), d.translate(this.Nb, this.Ob), d.scale(c, c), e = this.f(), g = this.Ea(), d.translate(e.width * g.x, e.height * g.y), this.l.Xc.call(this, d), d.restore(), this.Bb = 0)
  }
};
D.update = function() {
};
D.Xc = function(a) {
  if(this.n && (this.h != this.ca && (this.ca && I.rd.call(this), this.h && I.Gc.call(this)), !this.ra && !this.qb && !(0 == this.u || 1 == this.hc))) {
    1 != this.u && (a.globalAlpha *= this.u);
    if(this.h) {
      I.Nc.call(this.h);
      var b = this.ca, c = this.G;
      a.save();
      a.save();
      a.translate(b.jd.x, b.jd.y);
      a.rotate(-b.kd);
      this.bb && a.rotate((this.F %= 360) * Math.PI / 180);
      a.beginPath();
      a.moveTo(0, 0);
      a.lineTo(b.mc / c.x, 0);
      a.lineTo(b.mc / c.x, b.lc / c.y);
      a.lineTo(0, b.lc / c.y);
      a.closePath();
      a.restore();
      a.clip()
    }
    b = new A(0, 0);
    this.l.A.call(this, a);
    for(var d = 0, e;e = this.c[d];d++) {
      var f = Ea(e, b).d(), g = e.F %= 360, c = e.G;
      a.save();
      a.translate(f.x, f.y);
      a.scale(c.x, c.y);
      0 != g && a.rotate(-g * Math.PI / 180);
      this.l.Xc.call(e, a);
      a.restore()
    }
    1 != this.u && (a.globalAlpha /= this.u);
    this.ca && a.restore()
  }
};
function Fa(a) {
  this.stack = Error().stack || "";
  a && (this.message = "" + a)
}
z(Fa, Error);
Fa.prototype.name = "CustomError";
function Ga(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = ("" + arguments[c]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, d)
  }
  return a
}
function Ha(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
}
function Ia(a) {
  if(!Ja.test(a)) {
    return a
  }
  -1 != a.indexOf("&") && (a = a.replace(Ka, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(La, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(Ma, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(Na, "&quot;"));
  return a
}
var Ka = /&/g, La = /</g, Ma = />/g, Na = /\"/g, Ja = /[&<>\"]/;
function Oa(a, b) {
  b.unshift(a);
  Fa.call(this, Ga.apply(k, b));
  b.shift()
}
z(Oa, Fa);
Oa.prototype.name = "AssertionError";
function Pa(a, b) {
  throw new Oa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
}
;var J = Array.prototype, Qa = J.indexOf ? function(a, b, c) {
  return J.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = c == k ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(u(a)) {
    return!u(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
}, Ra = J.forEach ? function(a, b, c) {
  J.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = u(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in e && b.call(c, e[f], f, a)
  }
}, Sa = J.filter ? function(a, b, c) {
  return J.filter.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = [], f = 0, g = u(a) ? a.split("") : a, j = 0;j < d;j++) {
    if(j in g) {
      var l = g[j];
      b.call(c, l, j, a) && (e[f++] = l)
    }
  }
  return e
}, Ta = J.map ? function(a, b, c) {
  return J.map.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = Array(d), f = u(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && (e[g] = b.call(c, f[g], g, a))
  }
  return e
};
function Ua(a, b) {
  0 <= Qa(a, b) || a.push(b)
}
function Va(a, b) {
  var c = Qa(a, b);
  0 <= c && J.splice.call(a, c, 1)
}
function Wa(a) {
  return J.concat.apply(J, arguments)
}
function Xa(a) {
  if(t(a)) {
    return Wa(a)
  }
  for(var b = [], c = 0, d = a.length;c < d;c++) {
    b[c] = a[c]
  }
  return b
}
function Ya(a) {
  return t(a) ? Wa(a) : Xa(a)
}
function Za(a, b, c, d) {
  J.splice.apply(a, $a(arguments, 1))
}
function $a(a, b, c) {
  return 2 >= arguments.length ? J.slice.call(a, b) : J.slice.call(a, b, c)
}
;function K(a, b) {
  this.x = a;
  this.y = b
}
z(K, A);
K.prototype.d = function() {
  return new K(this.x, this.y)
};
K.prototype.scale = function(a) {
  this.x *= a;
  this.y *= a;
  return this
};
K.prototype.rotate = function(a) {
  var b = Math.cos(a), a = Math.sin(a), c = this.y * b + this.x * a;
  this.x = this.x * b - this.y * a;
  this.y = c;
  return this
};
var ab, bb, cb, db, eb;
function fb() {
  return r.navigator ? r.navigator.userAgent : k
}
eb = db = cb = bb = ab = m;
var gb;
if(gb = fb()) {
  var hb = r.navigator;
  ab = 0 == gb.indexOf("Opera");
  bb = !ab && -1 != gb.indexOf("MSIE");
  db = (cb = !ab && -1 != gb.indexOf("WebKit")) && -1 != gb.indexOf("Mobile");
  eb = !ab && !cb && "Gecko" == hb.product
}
var ib = ab, L = bb, M = eb, N = cb, jb = db, kb = r.navigator, lb = -1 != (kb && kb.platform || "").indexOf("Win"), mb;
a: {
  var nb = "", ob;
  if(ib && r.opera) {
    var pb = r.opera.version, nb = "function" == typeof pb ? pb() : pb
  }else {
    if(M ? ob = /rv\:([^\);]+)(\)|;)/ : L ? ob = /MSIE\s+([^\);]+)(\)|;)/ : N && (ob = /WebKit\/(\S+)/), ob) {
      var qb = ob.exec(fb()), nb = qb ? qb[1] : ""
    }
  }
  if(L) {
    var rb, sb = r.document;
    rb = sb ? sb.documentMode : h;
    if(rb > parseFloat(nb)) {
      mb = "" + rb;
      break a
    }
  }
  mb = nb
}
var tb = {};
function O(a) {
  var b;
  if(!(b = tb[a])) {
    b = 0;
    for(var c = Ha("" + mb).split("."), d = Ha("" + a).split("."), e = Math.max(c.length, d.length), f = 0;0 == b && f < e;f++) {
      var g = c[f] || "", j = d[f] || "", l = RegExp("(\\d*)(\\D*)", "g"), o = RegExp("(\\d*)(\\D*)", "g");
      do {
        var n = l.exec(g) || ["", "", ""], p = o.exec(j) || ["", "", ""];
        if(0 == n[0].length && 0 == p[0].length) {
          break
        }
        b = ((0 == n[1].length ? 0 : parseInt(n[1], 10)) < (0 == p[1].length ? 0 : parseInt(p[1], 10)) ? -1 : (0 == n[1].length ? 0 : parseInt(n[1], 10)) > (0 == p[1].length ? 0 : parseInt(p[1], 10)) ? 1 : 0) || ((0 == n[2].length) < (0 == p[2].length) ? -1 : (0 == n[2].length) > (0 == p[2].length) ? 1 : 0) || (n[2] < p[2] ? -1 : n[2] > p[2] ? 1 : 0)
      }while(0 == b)
    }
    b = tb[a] = 0 <= b
  }
  return b
}
var ub = {};
function vb(a) {
  return ub[a] || (ub[a] = L && !!document.documentMode && document.documentMode >= a)
}
;function wb() {
}
var xb = 0;
q = wb.prototype;
q.key = 0;
q.Ja = m;
q.Oc = m;
q.sb = function(a, b, c, d, e, f) {
  if(ha(a)) {
    this.ed = i
  }else {
    if(a && a.handleEvent && ha(a.handleEvent)) {
      this.ed = m
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.$a = a;
  this.qd = b;
  this.src = c;
  this.type = d;
  this.capture = !!e;
  this.bc = f;
  this.Oc = m;
  this.key = ++xb;
  this.Ja = m
};
q.handleEvent = function(a) {
  return this.ed ? this.$a.call(this.bc || this.src, a) : this.$a.handleEvent.call(this.$a, a)
};
function yb(a, b) {
  for(var c in a) {
    b.call(h, a[c], c, a)
  }
}
function zb(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
}
function Ab(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
}
var Bb = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
function xa(a, b) {
  for(var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for(c in d) {
      a[c] = d[c]
    }
    for(var f = 0;f < Bb.length;f++) {
      c = Bb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
}
;!L || vb(9);
var Cb = !L || vb(9), Db = L && !O("8");
!N || O("528");
M && O("1.9b") || L && O("8") || ib && O("9.5") || N && O("528");
M && !O("8") || L && O("9");
function Eb() {
}
Eb.prototype.Wc = m;
Eb.prototype.Va = function() {
  this.Wc || (this.Wc = i, this.Y())
};
Eb.prototype.Y = function() {
  this.Dd && Fb.apply(k, this.Dd)
};
function Fb(a) {
  for(var b = 0, c = arguments.length;b < c;++b) {
    var d = arguments[b];
    fa(d) ? Fb.apply(k, d) : d && "function" == typeof d.Va && d.Va()
  }
}
;function Gb(a, b) {
  this.type = a;
  this.currentTarget = this.target = b
}
z(Gb, Eb);
q = Gb.prototype;
q.Y = function() {
  delete this.type;
  delete this.target;
  delete this.currentTarget
};
q.ga = m;
q.eb = i;
q.stopPropagation = function() {
  this.ga = i
};
q.preventDefault = function() {
  this.eb = m
};
function Hb(a) {
  Hb[" "](a);
  return a
}
Hb[" "] = da;
function Ib(a, b) {
  a && this.sb(a, b)
}
z(Ib, Gb);
q = Ib.prototype;
q.target = k;
q.relatedTarget = k;
q.offsetX = 0;
q.offsetY = 0;
q.clientX = 0;
q.clientY = 0;
q.screenX = 0;
q.screenY = 0;
q.button = 0;
q.keyCode = 0;
q.charCode = 0;
q.ctrlKey = m;
q.altKey = m;
q.shiftKey = m;
q.metaKey = m;
q.ea = k;
q.sb = function(a, b) {
  var c = this.type = a.type;
  Gb.call(this, c);
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var d = a.relatedTarget;
  if(d) {
    if(M) {
      var e;
      a: {
        try {
          Hb(d.nodeName);
          e = i;
          break a
        }catch(f) {
        }
        e = m
      }
      e || (d = k)
    }
  }else {
    "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement)
  }
  this.relatedTarget = d;
  this.offsetX = N || a.offsetX !== h ? a.offsetX : a.layerX;
  this.offsetY = N || a.offsetY !== h ? a.offsetY : a.layerY;
  this.clientX = a.clientX !== h ? a.clientX : a.pageX;
  this.clientY = a.clientY !== h ? a.clientY : a.pageY;
  this.screenX = a.screenX || 0;
  this.screenY = a.screenY || 0;
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.state = a.state;
  this.ea = a;
  delete this.eb;
  delete this.ga
};
q.stopPropagation = function() {
  Ib.Ma.stopPropagation.call(this);
  this.ea.stopPropagation ? this.ea.stopPropagation() : this.ea.cancelBubble = i
};
q.preventDefault = function() {
  Ib.Ma.preventDefault.call(this);
  var a = this.ea;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = m, Db) {
      try {
        if(a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1
        }
      }catch(b) {
      }
    }
  }
};
q.Y = function() {
  Ib.Ma.Y.call(this);
  this.relatedTarget = this.currentTarget = this.target = this.ea = k
};
var Jb = {}, P = {}, Kb = {}, Lb = {};
function R(a, b, c, d, e) {
  if(b) {
    if(t(b)) {
      for(var f = 0;f < b.length;f++) {
        R(a, b[f], c, d, e)
      }
      return k
    }
    var d = !!d, g = P;
    b in g || (g[b] = {q:0, O:0});
    g = g[b];
    d in g || (g[d] = {q:0, O:0}, g.q++);
    var g = g[d], j = v(a), l;
    g.O++;
    if(g[j]) {
      l = g[j];
      for(f = 0;f < l.length;f++) {
        if(g = l[f], g.$a == c && g.bc == e) {
          if(g.Ja) {
            break
          }
          return l[f].key
        }
      }
    }else {
      l = g[j] = [], g.q++
    }
    f = Mb();
    f.src = a;
    g = new wb;
    g.sb(c, f, a, b, d, e);
    c = g.key;
    f.key = c;
    l.push(g);
    Jb[c] = g;
    Kb[j] || (Kb[j] = []);
    Kb[j].push(g);
    a.addEventListener ? (a == r || !a.Qb) && a.addEventListener(b, f, d) : a.attachEvent(b in Lb ? Lb[b] : Lb[b] = "on" + b, f);
    return c
  }
  throw Error("Invalid event type");
}
function Mb() {
  var a = Nb, b = Cb ? function(c) {
    return a.call(b.src, b.key, c)
  } : function(c) {
    c = a.call(b.src, b.key, c);
    if(!c) {
      return c
    }
  };
  return b
}
function Ob(a, b, c, d, e) {
  if(t(b)) {
    for(var f = 0;f < b.length;f++) {
      Ob(a, b[f], c, d, e)
    }
  }else {
    d = !!d;
    a: {
      f = P;
      if(b in f && (f = f[b], d in f && (f = f[d], a = v(a), f[a]))) {
        a = f[a];
        break a
      }
      a = k
    }
    if(a) {
      for(f = 0;f < a.length;f++) {
        if(a[f].$a == c && a[f].capture == d && a[f].bc == e) {
          Pb(a[f].key);
          break
        }
      }
    }
  }
}
function Pb(a) {
  if(Jb[a]) {
    var b = Jb[a];
    if(!b.Ja) {
      var c = b.src, d = b.type, e = b.qd, f = b.capture;
      c.removeEventListener ? (c == r || !c.Qb) && c.removeEventListener(d, e, f) : c.detachEvent && c.detachEvent(d in Lb ? Lb[d] : Lb[d] = "on" + d, e);
      c = v(c);
      e = P[d][f][c];
      if(Kb[c]) {
        var g = Kb[c];
        Va(g, b);
        0 == g.length && delete Kb[c]
      }
      b.Ja = i;
      e.md = i;
      Qb(d, f, c, e);
      delete Jb[a]
    }
  }
}
function Qb(a, b, c, d) {
  if(!d.wb && d.md) {
    for(var e = 0, f = 0;e < d.length;e++) {
      d[e].Ja ? d[e].qd.src = k : (e != f && (d[f] = d[e]), f++)
    }
    d.length = f;
    d.md = m;
    0 == f && (delete P[a][b][c], P[a][b].q--, 0 == P[a][b].q && (delete P[a][b], P[a].q--), 0 == P[a].q && delete P[a])
  }
}
function Rb(a) {
  var b, c = 0, d = b == k;
  b = !!b;
  if(a == k) {
    yb(Kb, function(a) {
      for(var e = a.length - 1;0 <= e;e--) {
        var f = a[e];
        if(d || b == f.capture) {
          Pb(f.key), c++
        }
      }
    })
  }else {
    if(a = v(a), Kb[a]) {
      for(var a = Kb[a], e = a.length - 1;0 <= e;e--) {
        var f = a[e];
        if(d || b == f.capture) {
          Pb(f.key), c++
        }
      }
    }
  }
}
function Sb(a, b, c, d, e) {
  var f = 1, b = v(b);
  if(a[b]) {
    a.O--;
    a = a[b];
    a.wb ? a.wb++ : a.wb = 1;
    try {
      for(var g = a.length, j = 0;j < g;j++) {
        var l = a[j];
        l && !l.Ja && (f &= Tb(l, e) !== m)
      }
    }finally {
      a.wb--, Qb(c, d, b, a)
    }
  }
  return Boolean(f)
}
function Tb(a, b) {
  var c = a.handleEvent(b);
  a.Oc && Pb(a.key);
  return c
}
function Nb(a, b) {
  if(!Jb[a]) {
    return i
  }
  var c = Jb[a], d = c.type, e = P;
  if(!(d in e)) {
    return i
  }
  var e = e[d], f, g;
  if(!Cb) {
    f = b || ca("window.event");
    var j = i in e, l = m in e;
    if(j) {
      if(0 > f.keyCode || f.returnValue != h) {
        return i
      }
      a: {
        var o = m;
        if(0 == f.keyCode) {
          try {
            f.keyCode = -1;
            break a
          }catch(n) {
            o = i
          }
        }
        if(o || f.returnValue == h) {
          f.returnValue = i
        }
      }
    }
    o = new Ib;
    o.sb(f, this);
    f = i;
    try {
      if(j) {
        for(var p = [], Q = o.currentTarget;Q;Q = Q.parentNode) {
          p.push(Q)
        }
        g = e[i];
        g.O = g.q;
        for(var G = p.length - 1;!o.ga && 0 <= G && g.O;G--) {
          o.currentTarget = p[G], f &= Sb(g, p[G], d, i, o)
        }
        if(l) {
          g = e[m];
          g.O = g.q;
          for(G = 0;!o.ga && G < p.length && g.O;G++) {
            o.currentTarget = p[G], f &= Sb(g, p[G], d, m, o)
          }
        }
      }else {
        f = Tb(c, o)
      }
    }finally {
      p && (p.length = 0), o.Va()
    }
    return f
  }
  d = new Ib(b, this);
  try {
    f = Tb(c, d)
  }finally {
    d.Va()
  }
  return f
}
;function Ub() {
}
z(Ub, Eb);
q = Ub.prototype;
q.Qb = i;
q.rc = k;
q.addEventListener = function(a, b, c, d) {
  R(this, a, b, c, d)
};
q.removeEventListener = function(a, b, c, d) {
  Ob(this, a, b, c, d)
};
q.dispatchEvent = function(a) {
  var b = a.type || a, c = P;
  if(b in c) {
    if(u(a)) {
      a = new Gb(a, this)
    }else {
      if(a instanceof Gb) {
        a.target = a.target || this
      }else {
        var d = a, a = new Gb(b, this);
        xa(a, d)
      }
    }
    var d = 1, e, c = c[b], b = i in c, f;
    if(b) {
      e = [];
      for(f = this;f;f = f.rc) {
        e.push(f)
      }
      f = c[i];
      f.O = f.q;
      for(var g = e.length - 1;!a.ga && 0 <= g && f.O;g--) {
        a.currentTarget = e[g], d &= Sb(f, e[g], a.type, i, a) && a.eb != m
      }
    }
    if(m in c) {
      if(f = c[m], f.O = f.q, b) {
        for(g = 0;!a.ga && g < e.length && f.O;g++) {
          a.currentTarget = e[g], d &= Sb(f, e[g], a.type, m, a) && a.eb != m
        }
      }else {
        for(e = this;!a.ga && e && f.O;e = e.rc) {
          a.currentTarget = e, d &= Sb(f, e, a.type, m, a) && a.eb != m
        }
      }
    }
    a = Boolean(d)
  }else {
    a = i
  }
  return a
};
q.Y = function() {
  Ub.Ma.Y.call(this);
  Rb(this);
  this.rc = k
};
var Vb, Wb, Xb, Yb, Zb, $b = fb();
Wb = (Vb = N && jb && /(ipod|iphone|ipad)/i.test($b)) && ha(Object.freeze);
Xb = N && jb && /(android)/i.test($b);
Yb = N && /playbook/i.test($b);
Zb = s(document.ontouchmove);
var ac;
function bc(a, b) {
  var c;
  c = a.className;
  c = u(c) && c.match(/\S+/g) || [];
  for(var d = $a(arguments, 1), e = c.length + d.length, f = c, g = 0;g < d.length;g++) {
    0 <= Qa(f, d[g]) || f.push(d[g])
  }
  a.className = c.join(" ");
  return c.length == e
}
;var cc = !L || vb(9);
!M && !L || L && vb(9) || M && O("1.9.1");
L && O("9");
function dc(a) {
  return a ? new ec(fc(a)) : ac || (ac = new ec)
}
function gc(a, b) {
  var c = b && "*" != b ? b.toUpperCase() : "";
  return a.querySelectorAll && a.querySelector && (!N || hc(document) || O("528")) && c ? a.querySelectorAll(c + "") : a.getElementsByTagName(c || "*")
}
function ic(a, b) {
  yb(b, function(b, d) {
    "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in jc ? a.setAttribute(jc[d], b) : 0 == d.lastIndexOf("aria-", 0) ? a.setAttribute(d, b) : a[d] = b
  })
}
var jc = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", rowspan:"rowSpan", valign:"vAlign", height:"height", width:"width", usemap:"useMap", frameborder:"frameBorder", maxlength:"maxLength", type:"type"};
function kc(a) {
  var b = a.document;
  if(N && !O("500") && !jb) {
    "undefined" == typeof a.innerHeight && (a = window);
    var b = a.innerHeight, c = a.document.documentElement.scrollHeight;
    a == a.top && c < b && (b -= 15);
    return new B(a.innerWidth, b)
  }
  a = hc(b) ? b.documentElement : b.body;
  return new B(a.clientWidth, a.clientHeight)
}
function lc(a, b, c) {
  return mc(document, arguments)
}
function mc(a, b) {
  var c = b[0], d = b[1];
  if(!cc && d && (d.name || d.type)) {
    c = ["<", c];
    d.name && c.push(' name="', Ia(d.name), '"');
    if(d.type) {
      c.push(' type="', Ia(d.type), '"');
      var e = {};
      xa(e, d);
      d = e;
      delete d.type
    }
    c.push(">");
    c = c.join("")
  }
  c = a.createElement(c);
  d && (u(d) ? c.className = d : t(d) ? bc.apply(k, [c].concat(d)) : ic(c, d));
  2 < b.length && nc(a, c, b, 2);
  return c
}
function nc(a, b, c, d) {
  function e(c) {
    c && b.appendChild(u(c) ? a.createTextNode(c) : c)
  }
  for(;d < c.length;d++) {
    var f = c[d];
    fa(f) && !(ia(f) && 0 < f.nodeType) ? Ra(oc(f) ? Xa(f) : f, e) : e(f)
  }
}
function hc(a) {
  return"CSS1Compat" == a.compatMode
}
function pc(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b)
}
function qc(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
}
function rc(a) {
  a && a.parentNode && a.parentNode.removeChild(a)
}
function sc(a, b) {
  if(a.contains && 1 == b.nodeType) {
    return a == b || a.contains(b)
  }
  if("undefined" != typeof a.compareDocumentPosition) {
    return a == b || Boolean(a.compareDocumentPosition(b) & 16)
  }
  for(;b && a != b;) {
    b = b.parentNode
  }
  return b == a
}
function fc(a) {
  return 9 == a.nodeType ? a : a.ownerDocument || a.document
}
function tc(a, b) {
  if("textContent" in a) {
    a.textContent = b
  }else {
    if(a.firstChild && 3 == a.firstChild.nodeType) {
      for(;a.lastChild != a.firstChild;) {
        a.removeChild(a.lastChild)
      }
      a.firstChild.data = b
    }else {
      for(var c;c = a.firstChild;) {
        a.removeChild(c)
      }
      a.appendChild(fc(a).createTextNode(b))
    }
  }
}
function oc(a) {
  if(a && "number" == typeof a.length) {
    if(ia(a)) {
      return"function" == typeof a.item || "string" == typeof a.item
    }
    if(ha(a)) {
      return"function" == typeof a.item
    }
  }
  return m
}
function ec(a) {
  this.da = a || r.document || document
}
q = ec.prototype;
q.Tc = function(a, b, c) {
  return mc(this.da, arguments)
};
q.createElement = function(a) {
  return this.da.createElement(a)
};
q.createTextNode = function(a) {
  return this.da.createTextNode(a)
};
q.appendChild = function(a, b) {
  a.appendChild(b)
};
q.append = function(a, b) {
  nc(fc(a), a, arguments, 1)
};
q.contains = sc;
function uc(a, b) {
  var c;
  a: {
    c = fc(a);
    if(c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, k))) {
      c = c[b] || c.getPropertyValue(b);
      break a
    }
    c = ""
  }
  return c || (a.currentStyle ? a.currentStyle[b] : k) || a.style && a.style[b]
}
function vc(a) {
  var b = a.getBoundingClientRect();
  L && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
  return b
}
function wc(a) {
  if(L && !vb(8)) {
    return a.offsetParent
  }
  for(var b = fc(a), c = uc(a, "position"), d = "fixed" == c || "absolute" == c, a = a.parentNode;a && a != b;a = a.parentNode) {
    if(c = uc(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) {
      return a
    }
  }
  return k
}
function xc(a, b, c) {
  if(b instanceof B) {
    c = b.height, b = b.width
  }else {
    if(c == h) {
      throw Error("missing height argument");
    }
  }
  a.style.width = yc(b);
  a.style.height = yc(c)
}
function yc(a) {
  "number" == typeof a && (a = Math.round(a) + "px");
  return a
}
function zc(a) {
  if("none" != uc(a, "display")) {
    return Ac(a)
  }
  var b = a.style, c = b.display, d = b.visibility, e = b.position;
  b.visibility = "hidden";
  b.position = "absolute";
  b.display = "inline";
  a = Ac(a);
  b.display = c;
  b.position = e;
  b.visibility = d;
  return a
}
function Ac(a) {
  var b = a.offsetWidth, c = a.offsetHeight, d = N && !b && !c;
  return(!s(b) || d) && a.getBoundingClientRect ? (a = vc(a), new B(a.right - a.left, a.bottom - a.top)) : new B(b, c)
}
function Bc(a) {
  var b = dc(h), c = k;
  if(L) {
    c = b.da.createStyleSheet(), Cc(c, a)
  }else {
    var d = gc(b.da, "head")[0];
    d || (c = gc(b.da, "body")[0], d = b.Tc("head"), c.parentNode.insertBefore(d, c));
    c = b.Tc("style");
    Cc(c, a);
    b.appendChild(d, c)
  }
  return c
}
function Cc(a, b) {
  L ? a.cssText = b : a[N ? "innerText" : "innerHTML"] = b
}
;var Dc, Ec, Fc, Gc, Hc, Ic, Jc;
(function() {
  var a = N ? "Webkit" : M ? "Moz" : ib ? "O" : L ? "ms" : "", b = lc("div").style;
  Dc = "-" + a.toLowerCase() + "-transform";
  Ec = function(a) {
    return b[a] !== h ? a : m
  };
  Fc = function(b) {
    var d = b.charAt(0).toLowerCase() + b.substr(1), e = a + b;
    return Ec(b) ? b : Ec(d) ? d : Ec(e) ? e : h
  }
})();
var Kc = function() {
  var a = Fc("BorderRadius");
  return function(b, c, d, e) {
    e = e ? "%" : "px";
    d = s(d) ? d : c;
    c = (t(c) ? c.join(e + " ") : c) + e + "/" + ((t(d) ? d.join(e + " ") : d) + e);
    c != b.Bd && (b.style[a] = b.Bd = c)
  }
}();
function Da(a) {
  this.Ib = [];
  this.Ga = 1;
  this.re && Ca(this, a)
}
Da.prototype.scale = function(a, b) {
  this.Ib.push("scale(" + a + "," + b + ")");
  return this
};
Da.prototype.rotate = function(a, b) {
  0 != a && this.Ib.push("rotate(" + a + (b ? b : "deg") + ")");
  return this
};
Da.prototype.translate = function(a, b, c) {
  var d = 1 / this.Ga, e = "translate";
  if(Vb || Yb) {
    e += "3d"
  }
  e += "(" + a * d + "px," + b * d + "px";
  if(Vb || Yb) {
    e += "," + (c ? c : 0) * d + "px"
  }
  this.Ib.push(e + ")");
  return this
};
function Ca(a, b) {
  if(1 != a.Ga) {
    var c = 1 / a.Ga;
    a.scale(c, c);
    a.Ga = 1
  }
  1 != b && (a.scale(b, b), a.Ga = b);
  return a
}
Da.prototype.toString = function() {
  1 != this.Ga && Ca(this, 1);
  return this.Ib.join(" ")
};
var Ba = function() {
  var a = Fc("Transform");
  return function(b, c) {
    var d = c.toString();
    d != b.he && (b.style[a] = b.he = d);
    qa = 1
  }
}(), za = function() {
  var a = Fc("TransformOrigin");
  return function(b, c, d, e) {
    e = e ? "%" : "px";
    c = c + e + " " + d + e;
    c != b.ie && (b.style[a] = b.ie = c)
  }
}();
(function() {
  function a(a, b) {
    if(!a.length) {
      return a
    }
    for(var e = a.split("),"), f = 0;f < e.length - 1;f++) {
      e[f] += ")"
    }
    e = Sa(e, function(a) {
      return-1 == a.indexOf(b)
    });
    return e.join(",")
  }
  var b = Fc("Transition");
  Gc = !!b && !ib;
  Hc = function(c, d, e, f) {
    if(b) {
      var g = a(c.style[b], d);
      g.length && (g += ", ");
      g += d + " " + e + "s cubic-bezier(" + f[1] + "," + f[2] + "," + f[3] + "," + f[4] + ")";
      c.style[b] = g
    }
  };
  Ic = function(c, d) {
    b && c && (c.style[b] = a(c.style[b], d))
  };
  Jc = function(a, b, e) {
    if(a.je != b || a.Ld != e) {
      a.je = b, a.Ld = e, xc(a, b, e)
    }
  }
})();
var I = new va;
I.xa = function() {
  for(var a = 0, b, c = 0;b = this.c[c];c++) {
    b = b instanceof S ? b.w : b, b == this.a.childNodes[a] ? a++ : (sc(this.M, b) && rc(b), I.zd(this.M, b, a++))
  }
};
I.Fd = function() {
  var a = this.f(), b = this.Ha, c = this.v, d = this.Z || 1;
  this.j[H] && (c = this.j[H]);
  var e = Math.round(a.width * d), f = Math.round(a.height * d), g = this.G.d();
  this.j[ya] && (g = this.j[ya].d());
  0 != e ? g.scale(a.width / (e * b / d)) : g.scale(1 / b);
  Jc(this.a, e, f);
  za(this.a, 100 * this.Ra.x, 100 * this.Ra.y, i);
  e = this.Ra.x * a.width * d;
  f = this.Ra.y * a.height * d;
  a = c.x * d / b - e;
  b = c.y * d / b - f;
  c = this.K ? this.K.Jb : 0;
  (0 != e - c || 0 != f - c) && this.a == this.M && this.c.length && I.Sd.call(this);
  this.a != this.M && !this.R[H] && !this.R[ya] && !this.R[Aa] && Ba(this.M, (new Da).translate(e - c, f - c));
  this.h != this.ca && (this.ca && I.rd.call(this), this.h && I.Gc.call(this));
  c = Ca(new Da, 0.1);
  this.h && (I.Nc.call(this.h), Ca(Ca(c, 0.1).translate(-this.h.Qd - e, -this.h.Rd - f).rotate(this.h.kd, "rad").translate(e, f), 1));
  e = -(this.F %= 360);
  s(this.j[Aa]) && (e = -this.j[Aa]);
  c.translate(a, b).scale(g.x, g.y).rotate(e);
  !this.R[H] && !this.R[ya] && !this.R[Aa] && Ba(this.a, c)
};
I.update = function() {
  if(this.a) {
    I.Fd.call(this);
    if(!this.R[Lc]) {
      var a = this.u;
      s(this.j[Lc]) && (a = this.j[Lc]);
      if(this.m & Mc) {
        var b = this.a.style;
        "opacity" in b ? b.opacity = a : "MozOpacity" in b ? b.MozOpacity = a : "filter" in b && (b.filter = "" === a ? "" : "alpha(opacity=" + 100 * a + ")")
      }
    }
    this.m & Nc && (this.a.style.display = this.qb ? "none" : "block");
    this.ra || this.l.A.call(this, this.a)
  }
};
I.Nc = function() {
  if(s(this.zc) && this.zc.n) {
    var a = this.zc, b = F(this), c = new A(b.left, b.top), d = new A(b.right, b.top), e = new A(b.right, b.bottom), b = a.getParent(), c = !this.n ? c : b.$(this.ab(c)), d = !this.n ? d : b.$(this.ab(d)), e = !this.n ? e : b.$(this.ab(e)), b = Math.atan2(c.y - d.y, d.x - c.x), f = d.x - c.x, g = c.y - d.y, j = e.x - d.x, l = e.y - d.y, d = Math.cos(b), e = Math.sin(b);
    this.mc = Math.round(Math.sqrt(f * f + g * g));
    this.lc = Math.round(Math.sqrt(j * j + l * l));
    C(a.l) == I && (f = a.w, xc(f, this.mc, this.lc), Ba(f, Ca(new Da, 0.1).translate(c.x, c.y).rotate(-b, "rad")));
    C(this.l) == I && (this.a.style.display = "none");
    this.jd = Oc(a, c.d());
    this.Qd = d * c.x - e * c.y;
    this.Rd = d * c.y + e * c.x;
    this.kd = b
  }
};
I.zd = function(a, b, c) {
  c == h || a.childNodes.length <= c ? a.appendChild(b) : a.insertBefore(b, a.childNodes[c])
};
I.Sd = function() {
  this.M = lc("div");
  for(var a = document.createDocumentFragment(), b;b = this.a.firstChild;) {
    this.a.removeChild(b), a.appendChild(b)
  }
  this.M.appendChild(a);
  this.a.appendChild(this.M)
};
I.rd = function() {
  if(this.a != this.w) {
    if(C(this.l) == I) {
      rc(this.a);
      var a = this.w, b = a.parentNode;
      b && b.replaceChild(this.a, a);
      this.w = this.a
    }
    this.ca.hc = 0;
    this.ca = k
  }
};
I.Gc = function() {
  if(C(this.l) == I) {
    this.w = lc("div");
    this.w.style.cssText = "position:absolute;overflow:hidden;";
    za(this.w, 0, 0);
    var a = this.a, b = a.parentNode;
    b && b.replaceChild(this.w, a);
    this.w.appendChild(this.a)
  }
  this.h.hc = 1;
  this.h.zc = this;
  this.ca = this.h;
  T(this.h, Pc)
};
var Qc;
(Qc = "ScriptEngine" in r && "JScript" == r.ScriptEngine()) && (r.ScriptEngineMajorVersion(), r.ScriptEngineMinorVersion(), r.ScriptEngineBuildVersion());
function Rc(a, b) {
  this.L = Qc ? [] : "";
  a != k && this.append.apply(this, arguments)
}
Rc.prototype.set = function(a) {
  this.clear();
  this.append(a)
};
Qc ? (Rc.prototype.Pb = 0, Rc.prototype.append = function(a, b, c) {
  b == k ? this.L[this.Pb++] = a : (this.L.push.apply(this.L, arguments), this.Pb = this.L.length);
  return this
}) : Rc.prototype.append = function(a, b, c) {
  this.L += a;
  if(b != k) {
    for(var d = 1;d < arguments.length;d++) {
      this.L += arguments[d]
    }
  }
  return this
};
Rc.prototype.clear = function() {
  Qc ? this.Pb = this.L.length = 0 : this.L = ""
};
Rc.prototype.toString = function() {
  if(Qc) {
    var a = this.L.join("");
    this.clear();
    a && this.append(a);
    return a
  }
  return this.L
};
L && O(8);
(function() {
  var a = [[], []], b = [[], []];
  ra = function(c, d, e) {
    Ua((e ? b : a)[d || 0], c)
  };
  sa = function() {
    for(var c, d = 0;2 > d;d++) {
      for(;a[d].length;) {
        c = a[d][0], c.update(d), c.m = 0, c == a[d][0] && a[d].shift()
      }
      a[d] = []
    }
    b = [[], []]
  }
})();
var Pc = 1, Mc = 16, Nc = 32, H = 1, ya = 2, Aa = 4, Lc = 5, Sc;
var Tc = new Rc;
Tc.append(".", "lime-director", " {position:absolute; -webkit-transform-origin: 0 0; -moz-transform-origin: 0 0; -o-transform-origin: 0 0; image-rendering:  optimizeSpeed; overflow: hidden;}.", "lime-director", " div, .", "lime-director", " img, .", "lime-director", " canvas {-webkit-transform-origin: 0 0; -moz-transform-origin: 0 0; -o-transform-origin: 0 0; position: absolute; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; -moz-user-select: none; -webkit-user-select: none; -webkit-user-drag: none;}.", 
"lime-scene", " {position:absolute; width:100%; height:100%; left: 0px; top: 0px; overflow: hidden; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box;}.", "lime-fps", " {float: left; background: #333; color: #fff; position: absolute; top:0px; left: 0px; padding:2px 4px;}div.", "lime-layer", " {position: absolute; left: 0px; top: 0px; width:0px; height:0px; border: none !important;}.", "lime-cover", " {position: absolute; left: 0px; top: 0px;}.", "lime-button", " {cursor: pointer;}");
Sc = Tc.toString();
Bc(Sc);
function S() {
  this.c = [];
  this.e = k;
  this.wa = {};
  this.j = {};
  this.R = {};
  this.Ac = {};
  this.n = m;
  this.vc = this.Tb = k;
  this.B = {};
  this.vd(1);
  this.b(0, 0);
  this.o(0, 0);
  this.Ha = 1;
  this.xc(0.5, 0.5);
  this.F = 0;
  this.j[Aa] || T(this, Pc);
  this.Kc = 0;
  T(this, 7);
  this.u = 1;
  Uc(this);
  Vc(this, C(this.ha[0]));
  T(this, 64)
}
z(S, Ub);
q = S.prototype;
q.ha = [I, D];
function Vc(a, b) {
  if(!a.l || C(a.l) != b) {
    for(var c = -1, d = 0;d < a.ha.length;d++) {
      if(C(a.ha[d]) == b) {
        c = d;
        break
      }
    }
    if(-1 != c) {
      a.l = a.ha[d];
      T(a, 64);
      for(d = 0;c = a.c[d];d++) {
        Vc(c, b)
      }
    }
  }
}
q.bb = function() {
  return!(this.e && C(this.e.l) == D)
};
function Wc(a) {
  return a.bb() ? (a.bb() ? Xc(a) : Yc(a), a) : a.e ? Wc(a.e) : k
}
function Zc(a) {
  if(!a.e || a instanceof E) {
    return[]
  }
  var b = a.e.c.indexOf(a), a = Zc(a.e);
  a.push(b);
  return a
}
function $c(a, b) {
  if(a == b) {
    return 0
  }
  for(var c = Zc(a), d = Zc(b), e = 0;;) {
    if(c.length <= e) {
      return 1
    }
    if(d.length <= e) {
      return-1
    }
    if(c[e] == d[e]) {
      e++
    }else {
      return c[e] > d[e] ? -1 : 1
    }
  }
}
q.Qb = m;
function T(a, b, c, d) {
  b && !a.m && ra(a, c, d);
  a.m |= b;
  if(64 == b) {
    for(c = 0;d = a.c[c];c++) {
      d instanceof S && T(d, 64)
    }
  }
  if(!s(a.m) || !b) {
    a.m = 0
  }
  b && a.ra && T(a.ra, -1);
  return a
}
q.vd = function(a, b) {
  this.G = 1 == arguments.length && ga(a) ? new K(a, a) : 2 == arguments.length ? new K(arguments[0], arguments[1]) : a;
  this.j[ya] || T(this, 2)
};
q.b = function(a, b) {
  this.v = 2 == arguments.length ? new A(arguments[0], arguments[1]) : a;
  return this.j[H] ? this : T(this, Pc)
};
function Uc(a) {
  if(k != a.h) {
    if(a.h) {
      var b = a.h;
      delete b.Sb;
      ad(b, b.getParent());
      delete a.h.ra
    }
    a.h = k;
    a.h && (bd(a.h), a.h.ra = a);
    T(a, 4)
  }
}
q.Ea = aa("Ra");
q.xc = function(a, b) {
  this.Ra = 2 == arguments.length ? new K(arguments[0], arguments[1]) : a;
  T(this, Pc)
};
function cd(a, b) {
  a.qb = b;
  T(a, Nc);
  a.Jc = 0
}
q.f = aa("p");
q.o = function(a, b) {
  var c = this.p, d, e;
  d = 2 == arguments.length ? new B(arguments[0], arguments[1]) : a;
  var f = this.Ea();
  if(c && this.c.length) {
    for(var g = 0;g < this.c.length;g++) {
      var j = this.c[g];
      if(j.Id) {
        var l = j.Kc;
        if(0 != l) {
          var o = dd(j);
          e = c.width;
          var n = o.left + f.x * c.width, p = o.right - o.left, Q = e - o.right - f.x * c.width;
          l & 1 && (e -= n);
          l & 2 && (e -= p);
          l & 4 && (e -= Q);
          e != c.width && (e = (d.width - e) / (c.width - e), l & 1 && (n *= e), l & 2 && (p *= e));
          e = c.height;
          var Q = o.top + f.y * c.height, G = o.bottom - o.top, o = e - o.bottom - f.y * c.height;
          l & 8 && (e -= Q);
          l & 16 && (e -= G);
          l & 32 && (e -= o);
          e != c.height && (e = (d.height - e) / (c.height - e), l & 8 && (Q *= e), l & 16 && (G *= e));
          l = j.Ea();
          j.o(p, G);
          j.b(n + l.x * p - f.x * d.width, Q + l.y * G - f.y * d.height)
        }
      }
    }
  }
  this.p = d;
  return T(this, 2)
};
function ed(a) {
  a.Z || fd(a);
  return a.Z
}
function fd(a) {
  var b = s(a.Z) ? a.Z : a.Ha;
  a.e && a.e.Z && (b = a.Ha * a.e.Z);
  if(b != a.Z) {
    a.Z = b;
    for(var b = 0, c;c = a.c[b];b++) {
      c instanceof S && fd(c)
    }
    T(a, 2)
  }
}
q.Id = aa("Kc");
q.$ = function(a) {
  return!this.n ? a : Oc(this, this.getParent().$(a))
};
function Oc(a, b) {
  if(!a.getParent()) {
    return k
  }
  b.x -= a.v.x;
  b.y -= a.v.y;
  b.x /= a.G.x;
  b.y /= a.G.y;
  if(0 != a.F) {
    var c = b.d(), d = a.F * Math.PI / 180, e = Math.cos(d), d = Math.sin(d);
    b.x = e * c.x - d * c.y;
    b.y = e * c.y + d * c.x
  }
  return b
}
q.ab = function(a) {
  return!this.n ? a : this.getParent().ab(Ea(this, a))
};
function Ea(a, b) {
  if(!a.getParent()) {
    return b
  }
  var c = b.d();
  if(0 != a.F) {
    var d = -a.F * Math.PI / 180, e = Math.cos(d), d = Math.sin(d);
    c.x = e * b.x - d * b.y;
    c.y = e * b.y + d * b.x
  }
  c.x *= a.G.x;
  c.y *= a.G.y;
  c.x += a.v.x;
  c.y += a.v.y;
  return c
}
function gd(a, b) {
  a.u = b;
  var c = a.qb;
  0 == a.u && !c ? (cd(a, i), a.Jc = 1) : 0 != a.u && c && a.Jc && cd(a, m);
  if(s(a.j[Lc])) {
    return a
  }
  T(a, Mc);
  return a
}
function Xc(a) {
  function b() {
    this.a = this.w = this.M = lc(c);
    this.Wa && bc(this.a, this.Wa);
    this.m |= -1
  }
  var c = C(a.l) == D ? "canvas" : "div";
  if(a.a) {
    if(a.a.tagName.toLowerCase() != c) {
      var d = a.w;
      b.call(a);
      d.parentNode && d.parentNode.replaceChild(a.w, d)
    }
  }else {
    b.call(a)
  }
}
function Yc(a) {
  a.w && (rc(a.w), delete a.a, delete a.w, delete a.M)
}
q.xa = function() {
  this.m &= -65;
  this.bb() ? Xc(this) : Yc(this);
  if(this.e && this.e.m & 64) {
    this.e.xa()
  }else {
    if(this.bb()) {
      for(var a = 0, b;b = this.c[a];a++) {
        b instanceof S && b.xa()
      }
      this.l.xa.call(this)
    }
  }
};
q.update = function(a) {
  var b, c, a = a || 0;
  v(this);
  this.m & 64 && this.xa();
  var d = C(this.l) == I || a;
  if(d) {
    for(var e in this.Ac) {
      delete this.j[e], delete this.R[e], b = parseInt(e, 10) == Lc ? "opacity" : Dc, Ic(this.a, b), this.a != this.M && Ic(this.ne, b)
    }
    b = 0;
    for(e in this.wa) {
      c = this.wa[e], c[3] || (c[3] = 1, e == H && this.Yd != this.v && (T(this, Pc, 0, i), b = 1), e == ya && this.ae != this.G && (T(this, 2, 0, i), b = 1), e == Lc && this.Wd != this.u && (T(this, Mc, 0, i), b = 1), e == Aa && this.$d != this.F && (T(this, 128, 0, i), b = 1))
    }
    if(!b) {
      for(e in this.wa) {
        c = this.wa[e];
        b = parseInt(e, 10) == Lc ? "opacity" : Dc;
        if(C(this.l) == I || "opacity" != b) {
          this.j[e] = c[0], Hc(this.a, b, c[1], c[2]), this.a != this.M && b == Dc && Hc(this.M, b, c[1], c[2])
        }
        delete this.wa[e]
      }
    }
    this.Yd = this.v;
    this.ae = this.G;
    this.Wd = this.u;
    this.$d = this.F;
    this.Ac = {}
  }
  a ? this.l.Ed.call(this) : (C(this.l) == D && (c = Wc(this), c.Bb = 1, c == this && this.m == Pc && !this.h && (c.Bb = 0), ra(Wc(this), 1)), this.l.update.call(this));
  if(d) {
    for(e in this.j) {
      this.j[e] && (this.R[e] = i)
    }
  }
  if(this.la) {
    for(e = 0;e < this.la.length;e++) {
      T(this.la[e], 7)
    }
  }
  T(this, 0, a)
};
q.getParent = function() {
  return this.e ? this.e : k
};
q.appendChild = function(a, b) {
  a instanceof S && a.getParent() ? a.getParent().removeChild(a) : a.parentNode && rc(a);
  a.e = this;
  b == h ? this.c.push(a) : Za(this.c, b, 0, a);
  C(this.l) != I && Vc(a, C(this.l));
  a instanceof S && (fd(a), this.n && hd(a));
  return T(this, 64)
};
q.removeChild = function(a) {
  a = this.c.indexOf(a);
  if(0 <= a && this.c.length > a) {
    var b = 0 <= a && this.c.length > a ? this.c[a] : k;
    b.ra && Uc(b.ra);
    b instanceof S ? (this.n && id(b), Yc(b), b.e = k) : rc(b);
    this.c.splice(a, 1);
    a = T(this, 64)
  }else {
    a = this
  }
  return a
};
q.addEventListener = function(a) {
  Zb && "mouse" == a.substring(0, 5) || (s(this.B[a]) || (this.B[a] = [0, 0]), this.n && 0 == this.B[a][0] && (this.B[a][0] = 1, this.I().Ba.Cb(this, a)), this.B[a][1]++)
};
q.removeEventListener = function(a) {
  Zb && "mouse" == a.substring(0, 5) || (this.n && 1 == this.B[a][1] && (this.B[a][0] = 0, this.I().Ba.cb(this, a)), this.B[a][1]--, this.B[a][1] || delete this.B[a])
};
q.I = function() {
  return!this.n ? k : this.Tb
};
q.ob = function() {
  return!this.n ? k : this.vc
};
function id(a) {
  var b;
  a.Sb || ad(a, a.getParent());
  for(var c = 0;b = a.c[c];c++) {
    b instanceof S && id(b)
  }
  for(var d in a.B) {
    a.B[d][0] = 0;
    if(!a.I()) {
      debugger
    }
    a.I().Ba.cb(a, d)
  }
  jd(a.I().Ba, a);
  a.n = m;
  a.Tb = k;
  a.vc = k
}
function hd(a) {
  a.n = i;
  a.Tb = a.e.I();
  a.vc = a.e.ob();
  for(var b = 0, c;c = a.c[b];b++) {
    c instanceof S && hd(c)
  }
  for(var d in a.B) {
    a.B[d][0] = 1, a.I().Ba.Cb(a, d)
  }
  a.Sb && bd(a);
  jd(a.I().Ba, a)
}
function bd(a) {
  a.Sb = i;
  a.n && kd(a, a.getParent())
}
function kd(a, b) {
  b.la || (b.la = []);
  Ua(b.la, a);
  !b && !(b.getParent() instanceof E) && kd(a, b.getParent())
}
function ad(a, b) {
  b && b.la && (Va(b.la, a), ad(a, b.getParent()))
}
function F(a) {
  var b = a.f(), a = a.Ea();
  return new ta(-b.height * a.y, b.width * (1 - a.x), b.height * (1 - a.y), -b.width * a.x)
}
function dd(a, b) {
  var c = b || F(a), d = new A(c.left, c.top), e = new A(c.right, c.top), f = new A(c.left, c.bottom), c = new A(c.right, c.bottom), d = Ea(a, d), e = Ea(a, e), f = Ea(a, f), c = Ea(a, c);
  return new ta(Math.floor(Math.min(d.y, e.y, f.y, c.y)), Math.ceil(Math.max(d.x, e.x, f.x, c.x)), Math.ceil(Math.max(d.y, e.y, f.y, c.y)), Math.floor(Math.min(d.x, e.x, f.x, c.x)))
}
q.xb = function() {
  var a = F(this);
  a.left == a.right && this.c.length && (a = dd(this.c[0], this.c[0].xb()));
  for(var b = 0, c;c = this.c[b];b++) {
    if(1 != c.hc) {
      var d = a;
      c = dd(c, c.xb());
      d.left = Math.min(d.left, c.left);
      d.top = Math.min(d.top, c.top);
      d.right = Math.max(d.right, c.right);
      d.bottom = Math.max(d.bottom, c.bottom)
    }
  }
  return a
};
q.Aa = function(a) {
  this.Ac[a] = 1
};
q.U = function(a) {
  var b = this.$(a.sa);
  return F(this).contains(b) ? (a.position = b, i) : m
};
function ld(a, b) {
  Ua(b.Gb, a);
  b.play()
}
;function md() {
  S.call(this);
  this.Wa = "lime-layer"
}
z(md, S);
md.prototype.U = function(a) {
  for(var b = 0, c;c = this.c[b];b++) {
    if(c.U(a)) {
      return a.position = this.$(a.sa), i
    }
  }
  return m
};
var U = new function() {
  this.Q = [];
  this.s = m;
  this.dd = 0;
  this.Vb = 1E3 / 30;
  this.qa = 0
};
function nd(a, b) {
  this.X = this.ld = a;
  this.jc = s(b) ? b : -1;
  this.fa = []
}
nd.prototype.La = function(a) {
  if(this.fa.length) {
    if(this.X > a) {
      this.X -= a
    }else {
      var b = this.ld + a - this.X;
      this.X = this.ld - (a - this.X);
      0 > this.X && (this.X = 0);
      for(var c, a = this.fa.length;0 <= --a;) {
        (c = this.fa[a]) && c[0] && ha(c[1]) && c[1].call(c[2], b)
      }
      -1 != this.jc && (this.jc--, 0 == this.jc && U.Bc(c[1], c[2]))
    }
  }
};
U.Q.push(new nd(0));
U.Ec = r.mozRequestAnimationFrame || r.webkitRequestAnimationFrame;
U.oe = aa("Vb");
U.ue = function(a) {
  this.Vb = a;
  this.s && (U.Uc(), U.Fc())
};
U.wc = function(a, b, c) {
  c = s(c) ? c : this.Q[0];
  Ua(c.fa, [1, a, b]);
  Ua(this.Q, c);
  this.s || U.Fc()
};
U.Bc = function(a, b) {
  for(var c = this.Q.length;0 <= --c;) {
    for(var d = this.Q[c], e = d.fa, f, g = e.length;0 <= --g;) {
      f = e[g], f[1] == a && f[2] == b && Va(e, f)
    }
    0 == e.length && 0 != c && Va(this.Q, d)
  }
  1 == this.Q.length && 0 == this.Q[0].fa.length && U.Uc()
};
U.Fc = function() {
  this.s || (this.qa = oa(), U.Ec ? r.mozRequestAnimationFrame ? (r.mozRequestAnimationFrame(), this.Mc = w(U.Ad, this), r.addEventListener("MozBeforePaint", this.Mc, m)) : (this.Mb = w(U.yd, this), r.webkitRequestAnimationFrame(this.Mb)) : this.dd = setInterval(w(U.fe, this), U.Vb), this.s = i)
};
U.Uc = function() {
  this.s && (U.Ec ? r.mozRequestAnimationFrame ? r.removeEventListener("MozBeforePaint", this.Mc, m) : r.webkitCancelRequestAnimationFrame(this.Mb) : clearInterval(this.dd), this.s = m)
};
U.yd = function(a) {
  a || (a = oa());
  U.Ub(a - this.qa);
  this.qa = a;
  r.webkitRequestAnimationFrame(this.Mb)
};
U.Ad = function(a) {
  U.Ub(a.timeStamp - this.qa);
  this.qa = a.timeStamp;
  r.mozRequestAnimationFrame()
};
U.fe = function() {
  var a = oa(), b = a - this.qa;
  0 > b && (b = 1);
  U.Ub(b);
  this.qa = a
};
U.Ub = function(a) {
  for(var b = this.Q.length;0 <= --b;) {
    this.Q[b].La(a)
  }
  1 == qa && /Firefox\/4./.test(fb()) && !pa.le && (U.nd ? (document.body.style.MozTransform = "", U.nd = 0) : (document.body.style.MozTransform = "scale(1,1)", U.nd = 1), qa = 0)
};
U.Cd = function(a) {
  for(var b, c, d, e, f = this.Q.length;0 <= --f;) {
    b = this.Q[f];
    for(e = b.fa.length;0 <= --e;) {
      d = b.fa[e], c = d[2], ha(c.I) && (c = c.I(), c == a && (d[0] = i))
    }
  }
};
U.me = function(a, b, c) {
  U.td(a, b, c, 1)
};
U.td = function(a, b, c, d) {
  U.wc(a, b, new nd(c, d))
};
var od;
function pd() {
  this.Gb = [];
  this.gc = [];
  this.Fb = {};
  this.ba = 1;
  this.Wb = qd;
  this.Ka = 0
}
z(pd, Ub);
q = pd.prototype;
q.scope = "";
q.hb = function(a) {
  this.ba = a;
  return this
};
q.play = function() {
  this.tc = 0;
  this.$c = this.Ka = 1;
  U.wc(this.La, this);
  this.dispatchEvent({type:"start"})
};
q.stop = function() {
  if(0 != this.Ka) {
    var a = this.gc;
    if(rd(this) && this.Aa) {
      for(var b = a.length;0 <= --b;) {
        this.Aa(a[b])
      }
    }
    this.gc = [];
    this.Fb = {};
    this.Ka = 0;
    U.Bc(this.La, this);
    this.dispatchEvent({type:"stop"})
  }
};
q.nc = function() {
  return{}
};
function sd(a, b) {
  var c = v(b);
  s(a.Fb[c]) || (td.Cb(a, b), a.Ka = 1, Ua(a.gc, b), a.yc && !a.wd && a.mb && a.mb(), a.Fb[c] = a.nc(b));
  return a.Fb[c]
}
q.I = function() {
  return this.Gb[0] ? this.Gb[0].I() : k
};
q.La = function(a) {
  this.yc && !this.wd && this.mb && this.mb();
  this.$c && (delete this.$c, a = 1);
  this.tc += a;
  var b = this.tc / (1E3 * this.ba);
  if(isNaN(b) || 1 <= b) {
    b = 1
  }
  a = this.Gb;
  b = this.Wb[0](b);
  isNaN(b) && (b = 1);
  for(var c = a.length;0 <= --c;) {
    this.update(b, a[c])
  }
  1 == b && this.stop()
};
function rd(a) {
  return 0 < a.ba && Gc && a.Xd && !Xb && !M
}
function ud(a) {
  a.Xd = s(h) ? h : i;
  return a
}
var td = new function() {
  this.aa = {}
};
td.Cb = function(a, b) {
  if(a.scope.length) {
    var c = v(b);
    s(this.aa[c]) || (this.aa[c] = {});
    s(this.aa[c][a.scope]) && this.aa[c][a.scope].stop();
    this.aa[c][a.scope] = a
  }
};
td.xe = function(a) {
  a = v(a);
  if(s(this.aa[a])) {
    for(var b in this.aa[a]) {
      this.aa[a][b].stop(), delete this.aa[a][b]
    }
  }
};
(function() {
  function a(a) {
    var e, f, g, p;
    for(g = a, f = 0;8 > f;f++) {
      p = ((b * g + c) * g + d) * g - a;
      if(5.0E-5 > (0 <= p ? p : 0 - p)) {
        return g
      }
      e = (3 * b * g + 2 * c) * g + d;
      if(1.0E-6 > (0 <= e ? e : 0 - e)) {
        break
      }
      g -= p / e
    }
    e = 0;
    f = 1;
    g = a;
    if(g < e) {
      return e
    }
    if(g > f) {
      return f
    }
    for(;e < f;) {
      p = ((b * g + c) * g + d) * g;
      if(5.0E-5 > (0 <= p - a ? p - a : 0 - (p - a))) {
        break
      }
      a > p ? e = g : f = g;
      g = 0.5 * (f - e) + e
    }
    return g
  }
  var b = 0, c = 0, d = 0, e = 0, f = 0, g = 0;
  od = function(j, l, o, n) {
    return[function(p) {
      d = 3 * j;
      c = 3 * (o - j) - d;
      b = 1 - d - c;
      g = 3 * l;
      f = 3 * (n - l) - g;
      e = 1 - g - f;
      return((e * a(p) + f) * a(p) + g) * a(p)
    }, j, l, o, n]
  }
})();
var qd = od(0.42, 0, 0.58, 1);
var vd = {aliceblue:"#f0f8ff", antiquewhite:"#faebd7", aqua:"#00ffff", aquamarine:"#7fffd4", azure:"#f0ffff", beige:"#f5f5dc", bisque:"#ffe4c4", black:"#000000", blanchedalmond:"#ffebcd", blue:"#0000ff", blueviolet:"#8a2be2", brown:"#a52a2a", burlywood:"#deb887", cadetblue:"#5f9ea0", chartreuse:"#7fff00", chocolate:"#d2691e", coral:"#ff7f50", cornflowerblue:"#6495ed", cornsilk:"#fff8dc", crimson:"#dc143c", cyan:"#00ffff", darkblue:"#00008b", darkcyan:"#008b8b", darkgoldenrod:"#b8860b", darkgray:"#a9a9a9", 
darkgreen:"#006400", darkgrey:"#a9a9a9", darkkhaki:"#bdb76b", darkmagenta:"#8b008b", darkolivegreen:"#556b2f", darkorange:"#ff8c00", darkorchid:"#9932cc", darkred:"#8b0000", darksalmon:"#e9967a", darkseagreen:"#8fbc8f", darkslateblue:"#483d8b", darkslategray:"#2f4f4f", darkslategrey:"#2f4f4f", darkturquoise:"#00ced1", darkviolet:"#9400d3", deeppink:"#ff1493", deepskyblue:"#00bfff", dimgray:"#696969", dimgrey:"#696969", dodgerblue:"#1e90ff", firebrick:"#b22222", floralwhite:"#fffaf0", forestgreen:"#228b22", 
fuchsia:"#ff00ff", gainsboro:"#dcdcdc", ghostwhite:"#f8f8ff", gold:"#ffd700", goldenrod:"#daa520", gray:"#808080", green:"#008000", greenyellow:"#adff2f", grey:"#808080", honeydew:"#f0fff0", hotpink:"#ff69b4", indianred:"#cd5c5c", indigo:"#4b0082", ivory:"#fffff0", khaki:"#f0e68c", lavender:"#e6e6fa", lavenderblush:"#fff0f5", lawngreen:"#7cfc00", lemonchiffon:"#fffacd", lightblue:"#add8e6", lightcoral:"#f08080", lightcyan:"#e0ffff", lightgoldenrodyellow:"#fafad2", lightgray:"#d3d3d3", lightgreen:"#90ee90", 
lightgrey:"#d3d3d3", lightpink:"#ffb6c1", lightsalmon:"#ffa07a", lightseagreen:"#20b2aa", lightskyblue:"#87cefa", lightslategray:"#778899", lightslategrey:"#778899", lightsteelblue:"#b0c4de", lightyellow:"#ffffe0", lime:"#00ff00", limegreen:"#32cd32", linen:"#faf0e6", magenta:"#ff00ff", maroon:"#800000", mediumaquamarine:"#66cdaa", mediumblue:"#0000cd", mediumorchid:"#ba55d3", mediumpurple:"#9370d8", mediumseagreen:"#3cb371", mediumslateblue:"#7b68ee", mediumspringgreen:"#00fa9a", mediumturquoise:"#48d1cc", 
mediumvioletred:"#c71585", midnightblue:"#191970", mintcream:"#f5fffa", mistyrose:"#ffe4e1", moccasin:"#ffe4b5", navajowhite:"#ffdead", navy:"#000080", oldlace:"#fdf5e6", olive:"#808000", olivedrab:"#6b8e23", orange:"#ffa500", orangered:"#ff4500", orchid:"#da70d6", palegoldenrod:"#eee8aa", palegreen:"#98fb98", paleturquoise:"#afeeee", palevioletred:"#d87093", papayawhip:"#ffefd5", peachpuff:"#ffdab9", peru:"#cd853f", pink:"#ffc0cb", plum:"#dda0dd", powderblue:"#b0e0e6", purple:"#800080", red:"#ff0000", 
rosybrown:"#bc8f8f", royalblue:"#4169e1", saddlebrown:"#8b4513", salmon:"#fa8072", sandybrown:"#f4a460", seagreen:"#2e8b57", seashell:"#fff5ee", sienna:"#a0522d", silver:"#c0c0c0", skyblue:"#87ceeb", slateblue:"#6a5acd", slategray:"#708090", slategrey:"#708090", snow:"#fffafa", springgreen:"#00ff7f", steelblue:"#4682b4", tan:"#d2b48c", teal:"#008080", thistle:"#d8bfd8", tomato:"#ff6347", turquoise:"#40e0d0", violet:"#ee82ee", wheat:"#f5deb3", white:"#ffffff", whitesmoke:"#f5f5f5", yellow:"#ffff00", 
yellowgreen:"#9acd32"};
function wd(a) {
  var b = {}, a = "" + a, c = "#" == a.charAt(0) ? a : "#" + a;
  if(xd.test(c)) {
    return b.cc = yd(c), b.type = "hex", b
  }
  a: {
    var d = a.match(zd);
    if(d) {
      var c = Number(d[1]), e = Number(d[2]), d = Number(d[3]);
      if(0 <= c && 255 >= c && 0 <= e && 255 >= e && 0 <= d && 255 >= d) {
        c = [c, e, d];
        break a
      }
    }
    c = []
  }
  if(c.length) {
    e = c[0];
    a = c[1];
    c = c[2];
    e = Number(e);
    a = Number(a);
    c = Number(c);
    if(isNaN(e) || 0 > e || 255 < e || isNaN(a) || 0 > a || 255 < a || isNaN(c) || 0 > c || 255 < c) {
      throw Error('"(' + e + "," + a + "," + c + '") is not a valid RGB color');
    }
    e = Ad(e.toString(16));
    a = Ad(a.toString(16));
    c = Ad(c.toString(16));
    b.cc = "#" + e + a + c;
    b.type = "rgb";
    return b
  }
  if(vd && (c = vd[a.toLowerCase()])) {
    return b.cc = c, b.type = "named", b
  }
  throw Error(a + " is not a valid color string");
}
var Bd = /#(.)(.)(.)/;
function yd(a) {
  if(!xd.test(a)) {
    throw Error("'" + a + "' is not a valid hex color");
  }
  4 == a.length && (a = a.replace(Bd, "#$1$1$2$2$3$3"));
  return a.toLowerCase()
}
function Cd(a, b, c) {
  0 > c ? c += 1 : 1 < c && (c -= 1);
  return 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + 6 * (b - a) * (2 / 3 - c) : a
}
var xd = /^#(?:[0-9a-f]{3}){1,2}$/i, zd = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
function Ad(a) {
  return 1 == a.length ? "0" + a : a
}
;function Dd() {
}
z(Dd, Ub);
Dd.prototype.fc = da;
function Ed(a) {
  if(a[0] instanceof Dd) {
    return a[0]
  }
  t(a) || (a = Ya(arguments));
  return 2 < a.length ? new Fd(a) : u(a[0]) && ("rgb(" == a[0].substring(0, 4) || "rgba(" == a[0].substring(0, 5) || "#" == a[0].substring(0, 1)) ? new Fd(a[0]) : new Gd(a[0])
}
Dd.prototype.gb = da;
Dd.prototype.fb = da;
function Fd(a) {
  this.ka = 1;
  this.Db(a)
}
z(Fd, Dd);
q = Fd.prototype;
q.id = "color";
function Hd(a, b) {
  return Id(a, 2, b)
}
function Id(a, b, c) {
  var c = c || 0.1, d, e = k;
  if(ga(a.Ia) && ga(a.Da) && ga(a.za)) {
    e = [a.Ia, a.Da, a.za, a.ka]
  }else {
    if(u(a.W)) {
      var f = wd(a.W);
      "named" != f.type && (e = f.cc, e = yd(e), e = [parseInt(e.substr(1, 2), 16), parseInt(e.substr(3, 2), 16), parseInt(e.substr(5, 2), 16)]);
      e.push(1)
    }
  }
  d = e;
  if(!d) {
    return a
  }
  d.pop();
  e = d[0] / 255;
  f = d[1] / 255;
  d = d[2] / 255;
  var g = Math.max(e, f, d), j = Math.min(e, f, d), l = 0, o = 0, n = 0.5 * (g + j);
  g != j && (g == e ? l = 60 * (f - d) / (g - j) : g == f ? l = 60 * (d - e) / (g - j) + 120 : g == d && (l = 60 * (e - f) / (g - j) + 240), o = 0 < n && 0.5 >= n ? (g - j) / (2 * n) : (g - j) / (2 - 2 * n));
  d = [Math.round(l + 360) % 360, o, n];
  d[b] += c;
  1 < d[b] && (d[b] = 1);
  b = d[1];
  c = d[2];
  g = f = e = 0;
  d = d[0] / 360;
  0 == b ? e = f = g = 255 * c : (j = g = 0, j = 0.5 > c ? c * (1 + b) : c + b - b * c, g = 2 * c - j, e = 255 * Cd(g, j, d + 1 / 3), f = 255 * Cd(g, j, d), g = 255 * Cd(g, j, d - 1 / 3));
  d = [Math.round(e), Math.round(f), Math.round(g)];
  d.push(a.ka);
  return a.Db(d)
}
q.Db = function(a) {
  var b = a;
  if(u(a)) {
    return this.W = a, this
  }
  2 < arguments.length && (b = arguments);
  3 <= b.length && (this.Ia = b[0], this.Da = b[1], this.za = b[2]);
  4 == b.length && (this.ka = b[3]);
  this.W = 1 == this.ka ? "rgb(" + this.Ia + "," + this.Da + "," + this.za + ")" : "rgba(" + this.Ia + "," + this.Da + "," + this.za + "," + this.ka + ")";
  return this
};
q.gb = function(a) {
  a.style.background = this.W
};
q.fb = function(a) {
  a.fillStyle = this.W
};
q.d = function() {
  var a = new Fd("");
  a.Ia = this.Ia;
  a.Da = this.Da;
  a.za = this.za;
  a.ka = this.ka;
  a.W = this.W;
  return a
};
function Gd(a) {
  a && ha(a.data) && (a = a.data());
  u(a) ? (this.T = a, 50 < this.T.length && (this.T = this.T.substr(-50)), Jd[this.T] ? this.C = Jd[this.T] : (this.C = new Image, this.C.src = a)) : (this.T = a.src, 50 < this.T.length && (this.T = this.T.substr(-50)), this.C = Jd[this.T] ? Jd[this.T] : a);
  Kd(this) || R(this.C, "load", this.Md, m, this);
  Jd[this.T] = this.C
}
z(Gd, Dd);
var Jd = {};
q = Gd.prototype;
q.id = "image";
q.fc = function(a) {
  var b = a.f(), c = this;
  !b.width && !b.height && (Kd(this) ? a.o(this.C.width, this.C.height) : R(this, "load", function() {
    var a = this.f();
    !a.width && !a.height && this.o(c.C.width, c.C.height)
  }, m, a));
  Kd(this) || R(this, "load", function() {
    T(a, 4)
  }, m, this)
};
q.Md = function(a) {
  this.dispatchEvent(a)
};
function Kd(a) {
  return a.C && a.C.width && a.C.height
}
q.o = function(a, b, c) {
  ga(a) && (a = new B(a, b), b = c || m);
  this.p = a;
  this.de = b;
  return this
};
function Ld(a, b) {
  var c = b.f().d();
  a.p && (a.de ? (c.width *= a.p.width, c.height *= a.p.height) : c = a.p);
  var d = new A(0, 0);
  a.qc && (a.qe ? (d.x = c.width * a.qc.x, d.y = c.height * a.qc.y) : d = a.qc);
  return[c, d]
}
q.gb = function(a, b) {
  a.style.background = "url(" + this.C.src + ")";
  var c = Ld(this, b), d = c[0], c = c[1], e = ed(b);
  a.style[Fc("BackgroundSize")] = d.width * e + "px " + d.height * e + "px";
  d = b.K ? b.K.Jb : 0;
  a.style.backgroundPosition = c.x * e - d + "px " + (c.y * e - d) + "px";
  this.te && (a.style.imageRendering = "optimizeQuality")
};
q.fb = function(a, b) {
  var c = b.f(), d = F(b);
  if(c.width && c.height) {
    try {
      var e = this.C, f = Ld(this, b), g = f[0], j = f[1], l = a.createPattern(e, "repeat"), o = g.width / e.width, n = g.height / e.height;
      a.save();
      a.translate(d.left + j.x, d.top + j.y);
      a.scale(o, n);
      a.fillStyle = l;
      a.fillRect(-j.x / o, -j.y / n, c.width / o, c.height / n);
      a.restore()
    }catch(p) {
    }
  }
};
D.r = {};
I.r = {};
function V() {
  S.call(this);
  this.K = this.Ca = k
}
z(V, S);
V.prototype.id = "sprite";
V.prototype.ha = [wa(I, I.r), wa(D, D.r)];
V.prototype.H = function(a, b, c, d) {
  this.Ca = Ed(Ya(arguments));
  this.Ca.fc(this);
  T(this, 4);
  return this
};
I.r.A = function(a) {
  this.Ca === k || this.Ca.gb(a, this);
  this.K === k ? a.style.border = "none" : this.K.gb(a, this)
};
D.r.A = function(a) {
  var b = this.f(), c = this.Ca, d = this.K;
  if(c || d) {
    var e = F(this);
    c && (c.fb(a, this), "image" != c.id && "frame" != c.id && a.fillRect(e.left, e.top, b.width, b.height));
    if(d && (d.fb(a, this), "sprite" == this.id || "label" == this.id)) {
      c = d.Jb / 2, a.strokeRect(e.left + c, e.top + c, b.width - 2 * c, b.height - 2 * c)
    }
  }
};
D.Dc = {};
function Md(a) {
  V.call(this);
  this.be.apply(this, arguments)
}
z(Md, V);
q = Md.prototype;
q.id = "polygon";
q.ha = [wa(D.r, D.Dc)];
q.be = function(a) {
  this.i = [];
  this.Hc.apply(this, arguments);
  return this
};
q.Hc = function(a) {
  a = Ya(arguments);
  if(a.length) {
    if(a[0] instanceof A) {
      Ra(a, function(a) {
        Nd(this, a)
      }, this)
    }else {
      for(var b = 1;b < a.length;b += 2) {
        Nd(this, new A(a[b - 1], a[b]))
      }
    }
    return this
  }
};
function Nd(a, b) {
  a.i.length ? (a.yb = Math.min(b.x, a.yb), a.zb = Math.min(b.y, a.zb), a.oc = Math.max(b.x, a.oc), a.pc = Math.max(b.y, a.pc)) : (a.yb = a.oc = b.x, a.zb = a.pc = b.y);
  a.i.push(b)
}
q.f = function() {
  return new B(this.oc - this.yb, this.pc - this.zb)
};
q.Ea = function() {
  var a = this.f();
  return new K(-this.yb / a.width, -this.zb / a.height)
};
q.U = function(a) {
  var b = this.i, c = b.length, a = this.$(a.sa), d = m;
  if(2 < c) {
    var e, f;
    for(e = 0, f = c - 1;e < c;f = e++) {
      b[e].y > a.y != b[f].y > a.y && a.x < (b[f].x - b[e].x) * (a.y - b[e].y) / (b[f].y - b[e].y) + b[e].x && (d = !d)
    }
  }
  return d
};
D.Dc.A = function(a) {
  this.f();
  var b = this.Ca, c = this.i;
  if(2 < c.length) {
    a.save();
    a.beginPath();
    a.moveTo(c[0].x, c[0].y);
    for(var d = 1;d < c.length;d++) {
      a.lineTo(c[d].x, c[d].y)
    }
    a.closePath();
    b && (a.fillStyle = b.W);
    a.clip();
    D.r.A.call(this, a);
    this.K && (a.lineWidth *= 2, a.stroke());
    a.restore()
  }
};
var Od, Pd = m, W = m, Qd = m, Rd = m, Sd = m, Td = m, Ud = m, X = m, Vd = m, Wd = m;
function Xd() {
  E.call(this);
  var a = 260 + 260 * Math.cos(30 * (Math.PI / 180)), a = (Yd - a) / 2;
  Pd = (new md).b(a, Zd / 10);
  Ud = Array(13);
  Vd = Array(13);
  Wd = Array(13);
  for(x = 0;13 > x;x++) {
    Ud[x] = Array(13);
    Vd[x] = Array(13);
    Wd[x] = Array(13);
    for(y = 0;13 > y;y++) {
      Vd[x][y] = -2, Wd[x][y] = -2, a = $d(), Ud[x][y] = a, Pd.appendChild(a)
    }
  }
  this.appendChild(Pd);
  W = (new md).b(2.5 * Yd / 10, 6.3 * Zd / 10);
  a = gd(ae((new be).o(400, 110), 5).H("#808080").b(120, 50), 0.5);
  W.appendChild(a);
  a = ae((new be).o(120, 60), 10).H("#87CEFA").b(0, 60);
  W.appendChild(a);
  a = ae((new be).o(120, 60), 10).H("#CD5C5C").b(120, 60);
  W.appendChild(a);
  a = ae((new be).o(120, 60), 10).H("#FFD700").b(240, 60);
  W.appendChild(a);
  this.appendChild(W);
  ld(Pd, new ce(1));
  ld(W, new ce(1));
  de();
  U.td(de, this, 2E3)
}
z(Xd, E);
function de() {
  ee(fe + "/Status/" + ge + "/" + he, function(a) {
    X = ie(a.target);
    if(X.GameStatus) {
      Vd = X.Board;
      for(x = 0;13 > x;x++) {
        for(y = 0;13 > y;y++) {
          Vd[x][y] != Wd[x][y] && (Pd.removeChild(Ud[x][y]), Ud[x][y] = $d(), Pd.appendChild(Ud[x][y]), 0 < Vd[x][y] && Pd.appendChild(je()), Wd[x][y] = Vd[x][y])
        }
      }
      W.removeChild(Td);
      Td = X.GameStart ? X.GameOver ? X.Winner ? ke((new Y).z("You win!").b(0, 0), "bold") : (new Y).z("Opponent won").b(32, 0) : X.Turn ? ke((new Y).z("Your turn").b(0, 0), "bold") : (new Y).z("Opponent's turn").b(32, 0) : (new Y).z("Waiting for second player").b(72, 0);
      le(Td, 26).o(1E3, 0);
      W.appendChild(Td);
      a = X.PlayerScore;
      W.removeChild(Qd);
      Qd = le((new Y).z("You: " + a), 18).b(0, 60);
      W.appendChild(Qd);
      var b = X.OpponentScore;
      W.removeChild(Rd);
      Rd = le((new Y).z("Opponent: " + b), 18).b(120, 60);
      W.appendChild(Rd);
      a = X.TotalHoney - a - b;
      W.removeChild(Sd);
      Sd = le((new Y).z("Honey: " + a), 18).b(240, 60);
      W.appendChild(Sd)
    }
    X.Gameover && U.Bc(de)
  })
}
function me(a, b) {
  var c = 20 * Math.cos(30 * (Math.PI / 180)), d = b * (c + 20) + c;
  1 == a % 2 && (d -= c);
  return new A(2 * a * c, d)
}
function ne(a, b) {
  var c;
  c = 20 * Math.sin(60 * (Math.PI / 180));
  c = (new Md).Hc(0, c, 10, 0, 30, 0, 40, c, 30, 2 * c, 10, 2 * c);
  hexPosition = me(a, b);
  c.b(hexPosition);
  return c
}
function oe(a, b) {
  var c = ne(a, b);
  c.H("#BDB76B");
  R(c, ["mousedown", "touchstart"], function(d) {
    X == h || !X.GameStatus || !X.Turn || X.GameOver || (c.H("#00FF00"), d.ia("mousemove", function(a) {
      c.U(a) ? c.H("#00FF00") : c.H("#BDB76B")
    }), d.ia("touchmove", function(a) {
      c.U(a) || c.H("#BDB76B")
    }), d.ia(["mouseup", "touchend"], function(d) {
      c.U(d) && pe(a, b)
    }))
  });
  return c
}
function pe(a, b) {
  ee(fe + "/Move/" + ge + "/" + he + "/" + a + "/" + b, function() {
    de()
  })
}
function je() {
  var a = Vd[x][y], b = x, c = y, a = le(qe((new Y).z(a), "#FFFFFF"), 18), d = a.f();
  console.log(d);
  b = me(b, c);
  c = 20 * Math.cos(30 * (Math.PI / 180)) + 10;
  b.x += c - d.width;
  b.y += c - d.height / 2;
  a.b(b);
  return a
}
function $d() {
  var a = x, b = y, c = m;
  switch(Vd[x][y]) {
    case -2:
      c = oe(a, b);
      break;
    case -1:
      a = ne(a, b);
      a.H("#FFD700");
      c = a;
      break;
    default:
      a = ne(a, b), a.H("#808080"), c = a
  }
  return c
}
;function ce(a) {
  pd.call(this);
  this.u = a
}
z(ce, pd);
ce.prototype.scope = "fade";
ce.prototype.nc = function(a) {
  var b = a.u;
  rd(this) && (a.wa[Lc] = [this.u, this.ba, this.Wb, 0], T(a, Mc));
  return{ee:b, X:this.u - b}
};
ce.prototype.update = function(a, b) {
  if(0 != this.Ka) {
    var c = sd(this, b);
    gd(b, c.ee + c.X * a)
  }
};
ce.prototype.Aa = function(a) {
  rd(this) && (a.Aa(Lc), T(a, Mc))
};
function E() {
  S.call(this);
  this.xc(0, 0);
  this.Wa = "lime-scene";
  Xc(this)
}
z(E, S);
E.prototype.ob = function() {
  return this
};
E.prototype.xb = function() {
  return F(this)
};
function re(a, b) {
  md.call(this);
  this.Wa = "lime-button";
  s(a) && (this.S = a, this.appendChild(this.S), this.jb = -1, se(this, te));
  s(b) && ue(this, b);
  var c = this;
  R(this, ["mousedown", "touchstart", "touchmove"], function(a) {
    se(c, ve);
    a.ia("mousemove", function(a) {
      c.U(a) ? se(c, ve) : se(c, te)
    });
    a.ia("touchmove", function(a) {
      c.U(a) || (se(c, te), a.cb())
    });
    a.ia(["mouseup", "touchend"], function(a) {
      c.U(a) && c.dispatchEvent({type:we});
      se(this, te)
    })
  })
}
z(re, md);
var te = 0, ve = 1, we = "click";
function ue(a, b) {
  a.na = b;
  a.appendChild(b);
  a.jb = -1;
  se(a, te)
}
function se(a, b) {
  if(b != a.jb) {
    a.jb == te && b == ve && a.dispatchEvent({type:"down"});
    a.jb == ve && b == te && a.dispatchEvent({type:"up"});
    var c = a.S;
    s(a.na) && (ve == b ? c = a.na : cd(a.na, i));
    c != a.S && cd(a.S, i);
    cd(c, m);
    a.jb = b
  }
}
;D.Pa = {};
I.Pa = {};
function be() {
  V.call(this);
  ae(this, 5)
}
z(be, V);
be.prototype.id = "roundedrect";
be.prototype.ha = [wa(I.r, I.Pa), wa(D.r, D.Pa)];
function ae(a, b) {
  a.uc = b;
  return a
}
I.Pa.A = function(a) {
  this.f();
  I.r.A.call(this, a);
  Kc(a, [this.uc * this.Ha, this.uc * this.Ha])
};
D.Pa.A = function(a) {
  this.f();
  var b = F(this), c = this.uc, d = b.left, e = b.top, f = b.right - b.left, b = b.bottom - b.top;
  a.save();
  a.beginPath();
  a.moveTo(d + c, e);
  a.lineTo(d + f - c, e);
  a.quadraticCurveTo(d + f, e, d + f, e + c);
  a.lineTo(d + f, e + b - c);
  a.quadraticCurveTo(d + f, e + b, d + f - c, e + b);
  a.lineTo(d + c, e + b);
  a.quadraticCurveTo(d, e + b, d, e + b - c);
  a.lineTo(d, e + c);
  a.quadraticCurveTo(d, e, d + c, e);
  a.closePath();
  a.clip();
  D.r.A.call(this, a);
  this.K && (a.lineWidth *= 2, a.stroke());
  a.restore()
};
D.Oa = {};
I.Oa = {};
function Y(a) {
  V.call(this);
  this.z(a);
  xe(this, ye);
  le(this, 14);
  qe(this, "#000");
  ze(this);
  ke(this, "400");
  a = [0, 0, 0, 0];
  s(h) && (a[1] = a[3] = h);
  s(h) && (a[2] = h);
  s(h) && (a[3] = h);
  this.D = a;
  T(this, 8);
  this.Pd = m;
  this.hd = 1.15;
  this.ce(k);
  this.H(255, 255, 255, 0)
}
z(Y, V);
Y.prototype.id = "label";
var ye = "Arial";
Y.prototype.ha = [wa(I.r, I.Oa), wa(D.r, D.Oa)];
(function() {
  var a;
  Y.prototype.measureText = function() {
    s(a) || (a = document.createElement("canvas").getContext("2d"));
    var b = Ae(this) * this.oa;
    a.font = this.oa + "px " + this.Yb;
    var c = a.measureText(this.ua), c = N ? c.width : c.width + 1;
    Wb && (c += 1);
    var d = this.K ? this.K.Jb : 0;
    return new B(this.D[1] + this.D[3] + c + 2 * d, this.D[0] + this.D[2] + b + 2 * d)
  }
})();
q = Y.prototype;
q.f = function() {
  var a = S.prototype.f.call(this);
  return!a || !a.width && !a.height ? this.measureText() : a
};
q.z = function(a) {
  this.ua = a + "";
  T(this, 4);
  delete this.Cc;
  return this
};
function ke(a, b) {
  a.bd = b;
  T(a, 8);
  return a
}
function xe(a, b) {
  a.Yb = b;
  T(a, 8);
  return a
}
function le(a, b) {
  a.oa = b;
  T(a, 8);
  return a
}
function qe(a, b) {
  a.ad = b;
  T(a, 8);
  return a
}
function Ae(a) {
  var b = Math.abs(a.P.y) + 2 * a.V;
  return a.Pd ? (a.hd + b) / a.oa : a.hd + b / a.oa
}
function ze(a) {
  a.Ic = "center";
  T(a, 8);
  return a
}
q.ce = function(a, b, c, d) {
  1 == arguments.length && a === k ? (this.ib = "#ccc", this.V = 0, this.Eb(0, 0)) : 2 == arguments.length ? (this.ib = a, this.V = b, this.Eb(new K(0, 0))) : 3 == arguments.length ? (this.ib = a, this.V = b, this.Eb(c)) : (this.ib = a, this.V = b, this.Eb(c, d));
  T(this, 8)
};
q.Eb = function(a, b) {
  this.P = 2 == arguments.length ? new K(arguments[0], arguments[1]) : a;
  T(this, 8)
};
q.update = function() {
  this.m & 4 && delete this.fd;
  S.prototype.update.apply(this, arguments)
};
I.Oa.A = function(a) {
  I.r.A.call(this, a);
  var b = a.style;
  this.m & 4 && tc(a, this.ua);
  this.m & 8 && (b.lineHeight = Ae(this), b.padding = Ta(this.D, function(a) {
    return a * ed(this)
  }, this).join("px ") + "px", b.color = this.ad, b.fontFamily = this.Yb, b.fontSize = this.oa * ed(this) + "px", b.fontWeight = this.bd, b.textAlign = this.Ic, b.textShadow = this.V || this.P.x || this.P.y ? this.ib + " " + this.P.x + "px " + this.P.y + "px " + this.V + "px" : "")
};
D.Oa.A = function(a) {
  D.r.A.call(this, a);
  var b = F(this), c = -b.left - this.D[3] + b.right - this.D[1] + Math.abs(this.P.x) + Math.abs(2 * this.V), d = 0;
  if(!this.Cc) {
    var d = [], e = this.ua.length, f = this.ua.match(M ? /[\s\.]+/g : /[\s-\.]+/g), g = 0;
    if(f) {
      for(var j = 0;j < f.length;j++) {
        var l = f[j], l = this.ua.indexOf(l, g) + l.length;
        d.push(this.ua.substring(g, l));
        g = l
      }
    }
    g != e && d.push(this.ua.substring(g, e));
    this.Cc = d;
    d = 1
  }
  f = this.K ? this.K.Jb : 0;
  a.save();
  e = this.Ic;
  "left" == e ? a.translate(b.left + this.D[3] + f, b.top + this.D[0] + f) : "right" == e ? a.translate(b.right - this.D[1] - f, b.top + this.D[0] + f) : "center" == e && a.translate(0.5 * (b.left + this.D[3] + b.right - this.D[1]), b.top + this.D[0] + f);
  b = Ae(this);
  a.fillStyle = this.ad;
  a.font = this.bd + " " + this.oa + "px/" + b + " " + this.Yb;
  a.textAlign = e;
  a.textBaseline = "top";
  if(this.V || this.P.x || this.P.y) {
    a.shadowColor = this.ib, a.shadowOffsetX = this.P.x, a.shadowOffsetY = this.P.y, a.shadowBlur = this.V
  }
  if(d || c != this.fd) {
    d = [];
    e = "";
    f = this.Cc;
    for(j = 0;j < f.length;j++) {
      "" == e ? e = f[j] : (g = a.measureText(Ha(e + f[j])), g.width > c ? (d.push(Ha(e)), e = f[j]) : e += f[j])
    }
    d.push(e);
    this.kc = d;
    this.fd = c
  }
  if(this.kc) {
    c = b * this.oa;
    b = (s(this.V) ? Math.abs(this.V) : 0) + (s(this.P) ? Math.abs(this.P.y) / 2 : 0);
    c = N ? Math.floor(c) : Math.round(c);
    for(d = 0;d < this.kc.length;d++) {
      a.fillText(this.kc[d], 0, c * d + b - 0.5)
    }
  }
  a.restore()
};
function Be() {
  this.Sa = [];
  Ce(this)
}
z(Be, Dd);
q = Be.prototype;
q.id = "lineargradient";
q.fc = function(a) {
  (ib || L) && Vc(a, D)
};
function Ce(a) {
  a.i = [0, 0, 0, 1];
  return a
}
q.addColorStop = function(a, b) {
  var c = Ya(arguments);
  c.shift();
  this.Sa.push([a, Ed(c)]);
  return this
};
q.Gd = function(a) {
  return N ? "color-stop(" + a[0] + ", " + a[1].W + ")" : a[1].W + " " + 100 * a[0] * this.Zd + "%"
};
q.gb = function(a, b) {
  var c, d = F(b);
  c = d.right - d.left;
  var e = d.bottom - d.top;
  if(!N) {
    var f = (this.i[2] - this.i[0]) * c, g = (this.i[1] - this.i[3]) * e, j = d.left + c * this.i[0], l = d.top + e * this.i[1], o = Math.atan2(g, f), n = -g / f;
    Infinity == n && (n = Math.pow(10, 10));
    d = 0 < o && o < Math.PI / 2 ? [d.right, d.top] : 0 < o ? [d.left, d.top] : o > -Math.PI / 2 ? [d.right, d.bottom] : [d.left, d.bottom];
    d = (d[1] + 1 / n * d[0] - l + n * j) / (n + 1 / n);
    n = n * d + l - j * n;
    d -= j;
    n -= l;
    this.Zd = Math.sqrt((f * f + g * g) / (d * d + n * n))
  }
  f = Ta(this.Sa, this.Gd, this);
  c = N ? "-webkit-gradient(linear," + 100 * this.i[0] + "% " + 100 * this.i[1] + "%," + 100 * this.i[2] + "% " + 100 * this.i[3] + "%," + f.join(",") + ")" : "linear-gradient(" + 100 * this.i[0] + "% " + 100 * this.i[1] + "% " + Math.atan2((this.i[1] - this.i[3]) * e, (this.i[2] - this.i[0]) * c) + "rad," + f.join(",") + ")";
  M && (c = "-moz-" + c);
  a.style.background = c
};
q.fb = function(a, b) {
  for(var c = this.i, d = F(b), e = d.right - d.left, f = d.bottom - d.top, c = a.createLinearGradient(d.left + e * c[0], d.top + f * c[1], d.left + e * c[2], d.top + f * c[3]), d = 0;d < this.Sa.length;d++) {
    c.addColorStop(this.Sa[d][0], this.Sa[d][1].W)
  }
  a.fillStyle = c
};
function De(a) {
  re.call(this, Ee(a), Ee(a));
  this.borderWidth = 2;
  this.z(a);
  this.Db("#62be00")
}
z(De, re);
function Ee(a) {
  var b = new be;
  b.tb = new be;
  b.label = le(qe(xe(ze(new Y(a)), '"Trebuchet MS"'), "#010101"), 17);
  b.appendChild(b.tb);
  b.tb.appendChild(b.label);
  return b
}
De.prototype.Db = function(a) {
  a = Ed(a);
  Ra([this.S, this.na], function(b) {
    var c;
    b == this.na ? (c = a.d(), c = Id(c, 1, -0.2)) : c = a;
    b.H(c);
    var d = Ce(new Be);
    d.addColorStop(0, Hd(c.d(), 0.13));
    d.addColorStop(0.5, Hd(c.d(), 0.05));
    d.addColorStop(0.52, c);
    d.addColorStop(1, c);
    b.tb.H(d)
  }, this);
  return this
};
De.prototype.z = function(a) {
  this.S.label.z(a);
  this.na.label.z(a);
  return this
};
De.prototype.o = function(a, b) {
  if(this.S) {
    this.S.o.apply(this.S, arguments);
    var c = this.S.f();
    Ra([this.S, this.na], function(a) {
      a.o(c);
      var b = c.d();
      b.width -= this.borderWidth;
      b.height -= this.borderWidth;
      a.tb.o(b)
    }, this)
  }
  return this
};
De.prototype.f = function() {
  return this.S.f()
};
function Fe(a, b) {
  pd.call(this);
  this.Ta = 2 == arguments.length ? new A(arguments[0], arguments[1]) : a
}
z(Fe, pd);
q = Fe.prototype;
q.scope = "move";
q.nc = function(a) {
  rd(this) && (a.wa[H] = [new A(a.v.x + this.Ta.x, a.v.y + this.Ta.y), this.ba, this.Wb, 0], T(a, Pc));
  return{xd:a.v}
};
q.mb = function() {
  if(this.yc) {
    var a = this.Ta, b = new A(0, 0), c = a.x - b.x, a = a.y - b.y;
    this.hb(this.yc * Math.sqrt(c * c + a * a) / 100);
    this.wd = 1
  }
};
q.update = function(a, b) {
  if(0 != this.Ka) {
    var c = sd(this, b);
    b.b(c.xd.x + this.Ta.x * a, c.xd.y + this.Ta.y * a)
  }
};
q.Aa = function(a) {
  rd(this) && (a.Aa(H), T(a, Pc))
};
var Ge = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
var He = r.window;
function Ie(a) {
  if("function" == typeof a.pb) {
    return a.pb()
  }
  if(u(a)) {
    return a.split("")
  }
  if(fa(a)) {
    for(var b = [], c = a.length, d = 0;d < c;d++) {
      b.push(a[d])
    }
    return b
  }
  return zb(a)
}
function Je(a, b, c) {
  if("function" == typeof a.forEach) {
    a.forEach(b, c)
  }else {
    if(fa(a) || u(a)) {
      Ra(a, b, c)
    }else {
      var d;
      if("function" == typeof a.ac) {
        d = a.ac()
      }else {
        if("function" != typeof a.pb) {
          if(fa(a) || u(a)) {
            d = [];
            for(var e = a.length, f = 0;f < e;f++) {
              d.push(f)
            }
          }else {
            d = Ab(a)
          }
        }else {
          d = h
        }
      }
      for(var e = Ie(a), f = e.length, g = 0;g < f;g++) {
        b.call(c, e[g], d && d[g], a)
      }
    }
  }
}
;function Ke(a, b) {
  this.Fa = {};
  this.t = [];
  var c = arguments.length;
  if(1 < c) {
    if(c % 2) {
      throw Error("Uneven number of arguments");
    }
    for(var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1])
    }
  }else {
    if(a) {
      a instanceof Ke ? (c = a.ac(), d = a.pb()) : (c = Ab(a), d = zb(a));
      for(var e = 0;e < c.length;e++) {
        this.set(c[e], d[e])
      }
    }
  }
}
q = Ke.prototype;
q.q = 0;
q.pb = function() {
  Le(this);
  for(var a = [], b = 0;b < this.t.length;b++) {
    a.push(this.Fa[this.t[b]])
  }
  return a
};
q.ac = function() {
  Le(this);
  return this.t.concat()
};
q.clear = function() {
  this.Fa = {};
  this.q = this.t.length = 0
};
function Le(a) {
  if(a.q != a.t.length) {
    for(var b = 0, c = 0;b < a.t.length;) {
      var d = a.t[b];
      Object.prototype.hasOwnProperty.call(a.Fa, d) && (a.t[c++] = d);
      b++
    }
    a.t.length = c
  }
  if(a.q != a.t.length) {
    for(var e = {}, c = b = 0;b < a.t.length;) {
      d = a.t[b], Object.prototype.hasOwnProperty.call(e, d) || (a.t[c++] = d, e[d] = 1), b++
    }
    a.t.length = c
  }
}
q.set = function(a, b) {
  Object.prototype.hasOwnProperty.call(this.Fa, a) || (this.q++, this.t.push(a));
  this.Fa[a] = b
};
q.d = function() {
  return new Ke(this)
};
function Me(a) {
  a = "" + a;
  if(/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) {
    try {
      return eval("(" + a + ")")
    }catch(b) {
    }
  }
  throw Error("Invalid JSON string: " + a);
}
;function Ne() {
}
Ne.prototype.lb = k;
var Oe;
function Pe() {
}
z(Pe, Ne);
function Qe(a) {
  return(a = Re(a)) ? new ActiveXObject(a) : new XMLHttpRequest
}
function Se(a) {
  var b = {};
  Re(a) && (b[0] = i, b[1] = i);
  return b
}
Pe.prototype.dc = k;
function Re(a) {
  if(!a.dc && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for(var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0;c < b.length;c++) {
      var d = b[c];
      try {
        return new ActiveXObject(d), a.dc = d
      }catch(e) {
      }
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
  }
  return a.dc
}
Oe = new Pe;
function Te(a) {
  return Ue(a || arguments.callee.caller, [])
}
function Ue(a, b) {
  var c = [];
  if(0 <= Qa(b, a)) {
    c.push("[...circular reference...]")
  }else {
    if(a && 50 > b.length) {
      c.push(Ve(a) + "(");
      for(var d = a.arguments, e = 0;e < d.length;e++) {
        0 < e && c.push(", ");
        var f;
        f = d[e];
        switch(typeof f) {
          case "object":
            f = f ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            f = "" + f;
            break;
          case "boolean":
            f = f ? "true" : "false";
            break;
          case "function":
            f = (f = Ve(f)) ? f : "[fn]";
            break;
          default:
            f = typeof f
        }
        40 < f.length && (f = f.substr(0, 40) + "...");
        c.push(f)
      }
      b.push(a);
      c.push(")\n");
      try {
        c.push(Ue(a.caller, b))
      }catch(g) {
        c.push("[exception trying to get caller]\n")
      }
    }else {
      a ? c.push("[...long stack...]") : c.push("[end]")
    }
  }
  return c.join("")
}
function Ve(a) {
  if(We[a]) {
    return We[a]
  }
  a = "" + a;
  if(!We[a]) {
    var b = /function ([^\(]+)/.exec(a);
    We[a] = b ? b[1] : "[Anonymous]"
  }
  return We[a]
}
var We = {};
function Xe(a, b, c, d, e) {
  this.reset(a, b, c, d, e)
}
Xe.prototype.Zc = k;
Xe.prototype.Yc = k;
var Ye = 0;
Xe.prototype.reset = function(a, b, c, d, e) {
  "number" == typeof e || Ye++;
  d || oa();
  this.Za = a;
  this.Td = b;
  delete this.Zc;
  delete this.Yc
};
Xe.prototype.ud = function(a) {
  this.Za = a
};
function Z(a) {
  this.Ud = a
}
Z.prototype.e = k;
Z.prototype.Za = k;
Z.prototype.c = k;
Z.prototype.cd = k;
function Ze(a, b) {
  this.name = a;
  this.value = b
}
Ze.prototype.toString = aa("name");
var $e = new Ze("SEVERE", 1E3), af = new Ze("WARNING", 900), bf = new Ze("CONFIG", 700), cf = new Ze("FINE", 500);
Z.prototype.getParent = aa("e");
Z.prototype.ud = function(a) {
  this.Za = a
};
function df(a) {
  if(a.Za) {
    return a.Za
  }
  if(a.e) {
    return df(a.e)
  }
  Pa("Root logger has no level set.");
  return k
}
Z.prototype.log = function(a, b, c) {
  if(a.value >= df(this).value) {
    a = this.Jd(a, b, c);
    b = "log:" + a.Td;
    r.console && (r.console.timeStamp ? r.console.timeStamp(b) : r.console.markTimeline && r.console.markTimeline(b));
    r.msWriteProfilerMark && r.msWriteProfilerMark(b);
    for(b = this;b;) {
      var c = b, d = a;
      if(c.cd) {
        for(var e = 0, f = h;f = c.cd[e];e++) {
          f(d)
        }
      }
      b = b.getParent()
    }
  }
};
Z.prototype.Jd = function(a, b, c) {
  var d = new Xe(a, "" + b, this.Ud);
  if(c) {
    d.Zc = c;
    var e;
    var f = arguments.callee.caller;
    try {
      var g;
      var j = ca("window.location.href");
      if(u(c)) {
        g = {message:c, name:"Unknown error", lineNumber:"Not available", fileName:j, stack:"Not available"}
      }else {
        var l, o, n = m;
        try {
          l = c.lineNumber || c.pe || "Not available"
        }catch(p) {
          l = "Not available", n = i
        }
        try {
          o = c.fileName || c.filename || c.sourceURL || j
        }catch(Q) {
          o = "Not available", n = i
        }
        g = n || !c.lineNumber || !c.fileName || !c.stack ? {message:c.message, name:c.name, lineNumber:l, fileName:o, stack:c.stack || "Not available"} : c
      }
      e = "Message: " + Ia(g.message) + '\nUrl: <a href="view-source:' + g.fileName + '" target="_new">' + g.fileName + "</a>\nLine: " + g.lineNumber + "\n\nBrowser stack:\n" + Ia(g.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + Ia(Te(f) + "-> ")
    }catch(G) {
      e = "Exception trying to expose exception! You win, we lose. " + G
    }
    d.Yc = e
  }
  return d
};
function $(a, b) {
  a.log(cf, b, h)
}
var ef = {}, ff = k;
function gf(a) {
  ff || (ff = new Z(""), ef[""] = ff, ff.ud(bf));
  var b;
  if(!(b = ef[a])) {
    b = new Z(a);
    var c = a.lastIndexOf("."), d = a.substr(c + 1), c = gf(a.substr(0, c));
    c.c || (c.c = {});
    c.c[d] = b;
    b.e = c;
    ef[a] = b
  }
  return b
}
;function hf(a) {
  this.headers = new Ke;
  this.Na = a || k
}
z(hf, Ub);
hf.prototype.N = gf("goog.net.XhrIo");
var jf = /^https?$/i, kf = [];
function ee(a, b) {
  var c = new hf;
  kf.push(c);
  b && R(c, "complete", b);
  R(c, "ready", na(lf, c));
  c.send(a, h, h, h)
}
function lf(a) {
  a.Va();
  Va(kf, a)
}
q = hf.prototype;
q.s = m;
q.g = k;
q.Lb = k;
q.ic = "";
q.gd = "";
q.Ya = "";
q.Xb = m;
q.rb = m;
q.ec = m;
q.pa = m;
q.Hb = 0;
q.va = k;
q.sd = "";
q.ke = m;
q.send = function(a, b, c, d) {
  if(this.g) {
    throw Error("[goog.net.XhrIo] Object is active with another request");
  }
  b = b ? b.toUpperCase() : "GET";
  this.ic = a;
  this.Ya = "";
  this.gd = b;
  this.Xb = m;
  this.s = i;
  this.g = this.Na ? Qe(this.Na) : Qe(Oe);
  this.Lb = this.Na ? this.Na.lb || (this.Na.lb = Se(this.Na)) : Oe.lb || (Oe.lb = Se(Oe));
  this.g.onreadystatechange = w(this.od, this);
  try {
    $(this.N, mf(this, "Opening Xhr")), this.ec = i, this.g.open(b, a, i), this.ec = m
  }catch(e) {
    $(this.N, mf(this, "Error opening Xhr: " + e.message));
    nf(this, e);
    return
  }
  var a = c || "", f = this.headers.d();
  d && Je(d, function(a, b) {
    f.set(b, a)
  });
  "POST" == b && !Object.prototype.hasOwnProperty.call(f.Fa, "Content-Type") && f.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  Je(f, function(a, b) {
    this.g.setRequestHeader(b, a)
  }, this);
  this.sd && (this.g.responseType = this.sd);
  "withCredentials" in this.g && (this.g.withCredentials = this.ke);
  try {
    this.va && (He.clearTimeout(this.va), this.va = k), 0 < this.Hb && ($(this.N, mf(this, "Will abort after " + this.Hb + "ms if incomplete")), this.va = He.setTimeout(w(this.ge, this), this.Hb)), $(this.N, mf(this, "Sending request")), this.rb = i, this.g.send(a), this.rb = m
  }catch(g) {
    $(this.N, mf(this, "Send error: " + g.message)), nf(this, g)
  }
};
q.ge = function() {
  "undefined" != typeof ba && this.g && (this.Ya = "Timed out after " + this.Hb + "ms, aborting", $(this.N, mf(this, this.Ya)), this.dispatchEvent("timeout"), this.abort(8))
};
function nf(a, b) {
  a.s = m;
  a.g && (a.pa = i, a.g.abort(), a.pa = m);
  a.Ya = b;
  of(a);
  pf(a)
}
function of(a) {
  a.Xb || (a.Xb = i, a.dispatchEvent("complete"), a.dispatchEvent("error"))
}
q.abort = function() {
  this.g && this.s && ($(this.N, mf(this, "Aborting")), this.s = m, this.pa = i, this.g.abort(), this.pa = m, this.dispatchEvent("complete"), this.dispatchEvent("abort"), pf(this))
};
q.Y = function() {
  this.g && (this.s && (this.s = m, this.pa = i, this.g.abort(), this.pa = m), pf(this, i));
  hf.Ma.Y.call(this)
};
q.od = function() {
  !this.ec && !this.rb && !this.pa ? this.Vd() : qf(this)
};
q.Vd = function() {
  qf(this)
};
function qf(a) {
  if(a.s && "undefined" != typeof ba) {
    if(a.Lb[1] && 4 == rf(a) && 2 == sf(a)) {
      $(a.N, mf(a, "Local request error detected and ignored"))
    }else {
      if(a.rb && 4 == rf(a)) {
        He.setTimeout(w(a.od, a), 0)
      }else {
        if(a.dispatchEvent("readystatechange"), 4 == rf(a)) {
          $(a.N, mf(a, "Request complete"));
          a.s = m;
          var b = sf(a), c;
          a: {
            switch(b) {
              case 200:
              ;
              case 201:
              ;
              case 202:
              ;
              case 204:
              ;
              case 304:
              ;
              case 1223:
                c = i;
                break a;
              default:
                c = m
            }
          }
          if(!c) {
            if(b = 0 === b) {
              b = ("" + a.ic).match(Ge)[1] || k, !b && self.location && (b = self.location.protocol, b = b.substr(0, b.length - 1)), b = !jf.test(b ? b.toLowerCase() : "")
            }
            c = b
          }
          if(c) {
            a.dispatchEvent("complete"), a.dispatchEvent("success")
          }else {
            var d;
            try {
              d = 2 < rf(a) ? a.g.statusText : ""
            }catch(e) {
              $(a.N, "Can not get status: " + e.message), d = ""
            }
            a.Ya = d + " [" + sf(a) + "]";
            of(a)
          }
          pf(a)
        }
      }
    }
  }
}
function pf(a, b) {
  if(a.g) {
    var c = a.g, d = a.Lb[0] ? da : k;
    a.g = k;
    a.Lb = k;
    a.va && (He.clearTimeout(a.va), a.va = k);
    b || a.dispatchEvent("ready");
    try {
      c.onreadystatechange = d
    }catch(e) {
      a.N.log($e, "Problem encountered resetting onreadystatechange: " + e.message, h)
    }
  }
}
function rf(a) {
  return a.g ? a.g.readyState : 0
}
function sf(a) {
  try {
    return 2 < rf(a) ? a.g.status : -1
  }catch(b) {
    return a.N.log(af, "Can not get status: " + b.message, h), -1
  }
}
function ie(a) {
  if(a.g) {
    return Me(a.g.responseText)
  }
}
function mf(a, b) {
  return b + " [" + a.gd + " " + a.ic + " " + sf(a) + "]"
}
;function tf() {
  E.call(this);
  this.a.style.cssText = "background:rgba(255,255,255,.8)"
}
z(tf, E);
function uf(a) {
  this.Ua = a;
  this.identifier = 0
}
uf.prototype.ia = function(a, b, c) {
  for(var a = t(a) ? a : [a], d = 0;d < a.length;d++) {
    this.Ua.ia(this, a[d], b)
  }
  c && this.event.stopPropagation()
};
uf.prototype.cb = function(a) {
  var b = s(a), c = t(a) ? a : [a];
  if(a = this.Ua.ja[this.identifier]) {
    var d = this, a = Sa(a, function(a) {
      return!s(d.ta) || a[0] == d.ta && (!b || 0 <= Qa(c, a[1])) ? (Ob(a[0], a[1], a[2]), m) : i
    });
    a.length ? this.Ua.ja[this.identifier] = a : delete this.Ua.ja[this.identifier]
  }
};
uf.prototype.d = function() {
  var a = new uf(this.Ua);
  xa(a, this);
  return a
};
function vf(a) {
  this.ma = a;
  this.J = {};
  this.ja = {}
}
vf.prototype.Cb = function(a, b) {
  s(this.J[b]) ? 0 <= Qa(this.J[b], a) || (this.J[b].push(a), this.J[b].sort($c)) : (this.J[b] = [a], R("touch" == b.substring(0, 5) && a != this.ma ? document : "key" == b.substring(0, 3) ? window : this.ma.a.parentNode, b, this, m, this))
};
vf.prototype.cb = function(a, b) {
  s(this.J[b]) && (Va(this.J[b], a), this.J[b].length || (Ob(this.ma.a.parentNode, b, this, m, this), delete this.J[b]))
};
function jd(a, b) {
  for(var c in a.J) {
    var d = a.J[c];
    0 <= Qa(d, b) && d.sort($c)
  }
}
vf.prototype.ia = function(a, b, c) {
  var d = a.identifier;
  s(this.ja[d]) || (this.ja[d] = []);
  this.ja[d].push([a.ta, b, c]);
  R(a.ta, b, da)
};
vf.prototype.handleEvent = function(a) {
  if(s(this.J[a.type])) {
    for(var b = this.J[a.type].slice(), c = m, d = 0, e = 0;!e;) {
      var f = new uf(this);
      f.type = a.type;
      f.event = a;
      if("touch" == a.type.substring(0, 5)) {
        var g = a.ea.changedTouches[d];
        f.sa = new A(g.pageX, g.pageY);
        f.identifier = g.identifier;
        d++;
        d >= a.ea.changedTouches.length && (e = 1)
      }else {
        f.sa = new A(a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, a.clientY + document.body.scrollTop + document.documentElement.scrollTop), e = 1
      }
      if(s(this.ja[f.identifier])) {
        for(var g = this.ja[f.identifier], j = 0;j < g.length;j++) {
          if(g[j][1] == a.type || t(g[j][1]) && 0 <= Qa(g[j][1], a.type)) {
            var l = g[j][0];
            f.ta = l;
            f.position = l.$(f.sa);
            g[j][2].call(l, f);
            c = i
          }
        }
        if("touchend" == a.type || "touchcancel" == a.type || "mouseup" == a.type || "keyup" == a.type) {
          delete f.ta, f.cb()
        }
      }else {
        for(j = 0;j < b.length;j++) {
          if(l = b[j], !((this.ma.k.length ? this.ma.k[this.ma.k.length - 1] : k) != l.ob() && l != this.ma) && !l.qb && l.n) {
            if(f.ta = l, l.U(f) || "key" == a.type.substring(0, 3)) {
              if(f.ta = l, l.dispatchEvent(f), c = i, f.event.ga) {
                break
              }
            }
          }
        }
      }
    }
    c && a.preventDefault()
  }
};
function wf(a) {
  this.ya = a || window;
  this.vb = R(this.ya, "resize", this.Kd, m, this);
  this.p = kc(this.ya || window);
  if(N && lb || ib && this.ya.self != this.ya.top) {
    this.Kb = window.setInterval(w(this.Pc, this), xf)
  }
}
z(wf, Ub);
var xf = 500;
q = wf.prototype;
q.vb = k;
q.ya = k;
q.p = k;
q.Kb = k;
q.f = function() {
  return this.p ? this.p.d() : k
};
q.Y = function() {
  wf.Ma.Y.call(this);
  this.vb && (Pb(this.vb), this.vb = k);
  this.Kb && (window.clearInterval(this.Kb), this.Kb = k);
  this.p = this.ya = k
};
q.Kd = function() {
  this.Pc()
};
q.Pc = function() {
  var a = kc(this.ya || window);
  if(!(a == this.p || (!a || !this.p ? 0 : a.width == this.p.width && a.height == this.p.height))) {
    this.p = a, this.dispatchEvent("resize")
  }
};
function yf(a, b) {
  this.ba = 1;
  this.Ab = a;
  this.Xa = b
}
z(yf, Ub);
yf.prototype.hb = function(a) {
  this.ba = a;
  return this
};
yf.prototype.start = function() {
  this.Xa.b(new A(0, 0));
  cd(this.Xa, m);
  this.finish()
};
yf.prototype.finish = function() {
  this.dispatchEvent(new Gb("end"))
};
function zf(a, b, c) {
  S.call(this);
  this.n = i;
  this.xc(0, 0);
  this.k = [];
  this.Sc = [];
  this.Wa = "lime-director";
  Xc(this);
  a.appendChild(this.a);
  N && jb && (this.Rc = document.createElement("div"), bc(this.Rc, "lime-cover-below"), pc(this.Rc, this.a), this.Qc = document.createElement("div"), bc(this.Qc, "lime-cover-above"), qc(this.Qc, this.a));
  "absolute" != a.style.position && (a.style.position = "relative");
  a.style.overflow = "hidden";
  if(a == document.body) {
    Bc("html,body{margin:0;padding:0;height:100%;}");
    var d = document.createElement("meta");
    d.name = "viewport";
    var e = "width=device-width,initial-scale=1.0,minimum-scale=1,maximum-scale=1.0,user-scalable=no";
    /android/i.test(navigator.userAgent) && (e += ",target-densityDpi=device-dpi");
    d.content = e;
    document.getElementsByTagName("head").item(0).appendChild(d);
    if(jb && !r.navigator.ve) {
      var f = this;
      setTimeout(function() {
        window.scrollTo(0, 0);
        f.ub()
      }, 100)
    }
  }
  var g, a = zc(a);
  this.o(new B(g = b || a.width || 400, c || a.height * g / a.width || 400));
  this.Vc || (this.Qa = this.$b = 0, this.Zb = lc("div"), bc(this.Zb, "lime-fps"), this.a.parentNode.appendChild(this.Zb));
  this.Vc = i;
  this.Nd = m;
  U.Cd(this);
  this.Nd ? (this.sc = new (this.se || tf), Af(this, this.sc)) : this.sc && (this.k.length && (id(this.k[this.k.length - 1]), this.k[this.k.length - 1].e = k, rc(this.k[this.k.length - 1].a), this.k.pop()), delete this.sc);
  b = new wf;
  R(b, "resize", this.ub, m, this);
  R(r, "orientationchange", this.ub, m, this);
  U.wc(this.La, this);
  this.Ba = new vf(this);
  R(this, ["touchmove", "touchstart"], function(a) {
    a.event.preventDefault()
  }, m, this);
  R(this, ["mouseup", "touchend", "mouseout", "touchcancel"], function() {
  }, m);
  this.ub();
  R(r, "keyup", this.Od, m, this)
}
z(zf, S);
q = zf.prototype;
q.I = function() {
  return this
};
q.ob = function() {
  return k
};
q.La = function(a) {
  this.Vc && (this.$b++, this.Qa += a, 100 < this.Qa && (this.Hd = 1E3 * this.$b / this.Qa, tc(this.Zb, this.Hd.toFixed(2)), this.Qa = this.$b = 0));
  sa()
};
function Bf(a) {
  var b = Od, c = Cf;
  a.o(b.f().d());
  var c = c || yf, d = k;
  b.k.length && (d = b.k[b.k.length - 1]);
  for(var e = [], f = b.k.length;0 <= --f;) {
    id(b.k[f]), e.push(b.k[f].a), b.k[f].e = k
  }
  b.k.length = 0;
  b.k.push(a);
  a.a.style.display = "none";
  b.a.appendChild(a.a);
  a.e = b;
  hd(a);
  a = new c(d, a);
  R(a, "end", function() {
    for(var a = e.length;0 <= --a;) {
      rc(e[a])
    }
  }, m, b);
  s(h) && a.hb(h);
  a.start()
}
q.xa = function() {
  this.m &= -65
};
function Af(a, b) {
  b.o(a.f().d());
  a.k.push(b);
  a.a.appendChild(b.a);
  b.e = a;
  hd(b)
}
q.$ = function(a) {
  a = a.d();
  a.x -= this.nb.x + this.v.x;
  a.y -= this.nb.y + this.v.y;
  a.x /= this.G.x;
  a.y /= this.G.y;
  return a
};
q.ab = function(a) {
  a = a.d();
  a.x *= this.G.x;
  a.y *= this.G.y;
  a.x += this.nb.x + this.v.x;
  a.y += this.nb.y + this.v.y;
  return a
};
q.update = function() {
  S.prototype.update.call(this);
  for(var a = this.Sc.length;0 <= --a;) {
    this.Sc[a].update()
  }
};
q.ub = function() {
  var a = zc(this.a.parentNode);
  this.a.parentNode == document.body && (window.scrollTo(0, 0), ga(window.innerHeight) && (a.height = window.innerHeight));
  var b;
  b = this.f().d();
  b = b.scale(b.width / b.height > a.width / a.height ? a.width / b.width : a.height / b.height);
  this.vd(b.width / this.f().width);
  a.width / a.height < b.width / b.height ? this.b(0, (a.height - b.height) / 2) : this.b((a.width - b.width) / 2, 0);
  var c = this.a.parentNode, d, e = fc(c), f = uc(c, "position"), g = M && e.getBoxObjectFor && !c.getBoundingClientRect && "absolute" == f && (d = e.getBoxObjectFor(c)) && (0 > d.screenX || 0 > d.screenY);
  b = new A(0, 0);
  var j;
  d = e ? 9 == e.nodeType ? e : fc(e) : document;
  if(j = L) {
    if(j = !vb(9)) {
      j = dc(d), j = !hc(j.da)
    }
  }
  j = j ? d.body : d.documentElement;
  if(c != j) {
    if(c.getBoundingClientRect) {
      d = vc(c), e = dc(e).da, c = !N && hc(e) ? e.documentElement : e.body, e = e.parentWindow || e.defaultView, c = new A(e.pageXOffset || c.scrollLeft, e.pageYOffset || c.scrollTop), b.x = d.left + c.x, b.y = d.top + c.y
    }else {
      if(e.getBoxObjectFor && !g) {
        d = e.getBoxObjectFor(c), c = e.getBoxObjectFor(j), b.x = d.screenX - c.screenX, b.y = d.screenY - c.screenY
      }else {
        d = c;
        do {
          b.x += d.offsetLeft;
          b.y += d.offsetTop;
          d != c && (b.x += d.clientLeft || 0, b.y += d.clientTop || 0);
          if(N && "fixed" == uc(d, "position")) {
            b.x += e.body.scrollLeft;
            b.y += e.body.scrollTop;
            break
          }
          d = d.offsetParent
        }while(d && d != c);
        if(ib || N && "absolute" == f) {
          b.y -= e.body.offsetTop
        }
        for(d = c;(d = wc(d)) && d != e.body && d != j;) {
          if(b.x -= d.scrollLeft, !ib || "TR" != d.tagName) {
            b.y -= d.scrollTop
          }
        }
      }
    }
  }
  this.nb = b;
  jb && this.a.parentNode == document.body && (this.pd && (b = this.pd, rc(b.ownerNode || b.owningElement || b)), this.pd = Bc("html{height:" + (a.height + 120) + "px;overflow:hidden;}"))
};
q.Od = function(a) {
  if(a.altKey && "d" == String.fromCharCode(a.keyCode).toLowerCase()) {
    if(this.Rb) {
      var b = this.Rb;
      rc(b.ownerNode || b.owningElement || b);
      this.Rb = k
    }else {
      this.Rb = Bc(".lime-scene div,.lime-scene img,.lime-scene canvas{border: 1px solid #c00;}")
    }
    a.stopPropagation();
    a.preventDefault()
  }
};
q.U = function(a) {
  a && a.sa && (a.position = this.$(a.sa));
  return i
};
function Cf(a, b) {
  yf.call(this, a, b)
}
z(Cf, yf);
Cf.prototype.start = function() {
  gd(this.Xa, 0);
  cd(this.Xa, m);
  var a = ud((new ce(0)).hb(this.ba));
  R(a, "stop", function() {
    this.Ab && gd(this.Ab, 1)
  }, m, this);
  this.Ab && ld(this.Ab, a);
  a = (new ce(1)).hb(this.ba);
  ld(this.Xa, a);
  R(a, "stop", this.finish, m, this)
};
var fe = "http://nonegames.appspot.com/HH", Yd = 640, Zd = 960, ge = m, he = m;
function Df() {
  var a = new E, b = (new md).b(39 * Yd / 100, 0), c = (new md).b(0, 430);
  b.appendChild(c);
  var d = ud(new Fe(-Yd, 0)), e = ud(new Fe(Yd, 0)), f = Ef("Play Quick Match").b(0, 200);
  R(f, "click", function() {
    Ff()
  });
  c.appendChild(f);
  f = Ef("Play with a friend").b(0, 320);
  R(f, "click", function() {
    ld(c, d)
  });
  c.appendChild(f);
  f = Ef("Help").b(0, 440);
  c.appendChild(f);
  var g = (new md).b(Yd, 0);
  c.appendChild(g);
  f = le(qe((new Y).z("Play with a friend"), "#000"), 24).b(0, 140);
  g.appendChild(f);
  f = Ef("Host").b(0, 200);
  R(f, "click", function() {
    ge = prompt("Enter game to host.");
    Gf()
  });
  g.appendChild(f);
  f = Ef("Join").b(0, 320);
  R(f, "click", function() {
    ge = prompt("Enter game to join.");
    Hf()
  });
  g.appendChild(f);
  f = Ef("Back").b(0, 440);
  R(f, "click", function() {
    ld(c, e)
  });
  g.appendChild(f);
  a.appendChild(b);
  Bf(a)
}
function Gf() {
  ee(fe + "/SetupHex/" + ge, function(a) {
    a = ie(a.target);
    a.Setup ? (he = a.PlayerId, Ff()) : alert("something failed")
  })
}
function Hf() {
  ee(fe + "/SetupHex/" + ge, function(a) {
    a = ie(a.target);
    a.Setup ? (he = a.PlayerId, Ff()) : alert("something failed")
  })
}
function Ff() {
  var a = new Xd;
  Bf(a)
}
function Ef(a) {
  return(new De(a)).o(300, 90)
}
function If() {
  Od = new zf(document.body, Yd, Zd);
  Df()
}
var Jf = ["honeyhunters", "start"], Kf = r;
!(Jf[0] in Kf) && Kf.execScript && Kf.execScript("var " + Jf[0]);
for(var Lf;Jf.length && (Lf = Jf.shift());) {
  !Jf.length && s(If) ? Kf[Lf] = If : Kf = Kf[Lf] ? Kf[Lf] : Kf[Lf] = {}
}
;
