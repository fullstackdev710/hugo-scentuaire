(() => {
  var Ce = !1,
    Me = !1,
    R = [];

  function Pr(e) {
    $r(e);
  }

  function $r(e) {
    R.includes(e) || R.push(e), Ir();
  }

  function _t(e) {
    let t = R.indexOf(e);
    t !== -1 && R.splice(t, 1);
  }

  function Ir() {
    !Me && !Ce && ((Ce = !0), queueMicrotask(Lr));
  }

  function Lr() {
    (Ce = !1), (Me = !0);
    for (let e = 0; e < R.length; e++) R[e]();
    (R.length = 0), (Me = !1);
  }
  var k,
    G,
    se,
    ht,
    Te = !0;

  function Nr(e) {
    (Te = !1), e(), (Te = !0);
  }

  function jr(e) {
    (k = e.reactive),
      (se = e.release),
      (G = (t) =>
        e.effect(t, {
          scheduler: (r) => {
            Te ? Pr(r) : r();
          },
        })),
      (ht = e.raw);
  }

  function st(e) {
    G = e;
  }

  function Fr(e) {
    let t = () => {};
    return [
      (n) => {
        let i = G(n);
        return (
          e._x_effects ||
            ((e._x_effects = new Set()),
            (e._x_runEffects = () => {
              e._x_effects.forEach((o) => o());
            })),
          e._x_effects.add(i),
          (t = () => {
            i !== void 0 && (e._x_effects.delete(i), se(i));
          }),
          i
        );
      },
      () => {
        t();
      },
    ];
  }
  var gt = [],
    vt = [],
    yt = [];

  function Kr(e) {
    yt.push(e);
  }

  function xt(e, t) {
    typeof t == "function"
      ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t))
      : ((t = e), vt.push(t));
  }

  function Dr(e) {
    gt.push(e);
  }

  function mt(e, t, r) {
    e._x_attributeCleanups || (e._x_attributeCleanups = {}),
      e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
      e._x_attributeCleanups[t].push(r);
  }

  function bt(e, t) {
    !e._x_attributeCleanups ||
      Object.entries(e._x_attributeCleanups).forEach(([r, n]) => {
        (t === void 0 || t.includes(r)) &&
          (n.forEach((i) => i()), delete e._x_attributeCleanups[r]);
      });
  }
  var qe = new MutationObserver(Ue),
    ze = !1;

  function wt() {
    qe.observe(document, {
      subtree: !0,
      childList: !0,
      attributes: !0,
      attributeOldValue: !0,
    }),
      (ze = !0);
  }

  function Et() {
    kr(), qe.disconnect(), (ze = !1);
  }
  var W = [],
    Ee = !1;

  function kr() {
    (W = W.concat(qe.takeRecords())),
      W.length &&
        !Ee &&
        ((Ee = !0),
        queueMicrotask(() => {
          Br(), (Ee = !1);
        }));
  }

  function Br() {
    Ue(W), (W.length = 0);
  }

  function y(e) {
    if (!ze) return e();
    Et();
    let t = e();
    return wt(), t;
  }
  var We = !1,
    ie = [];

  function Hr() {
    We = !0;
  }

  function qr() {
    (We = !1), Ue(ie), (ie = []);
  }

  function Ue(e) {
    if (We) {
      ie = ie.concat(e);
      return;
    }
    let t = [],
      r = [],
      n = new Map(),
      i = new Map();
    for (let o = 0; o < e.length; o++)
      if (
        !e[o].target._x_ignoreMutationObserver &&
        (e[o].type === "childList" &&
          (e[o].addedNodes.forEach((a) => a.nodeType === 1 && t.push(a)),
          e[o].removedNodes.forEach((a) => a.nodeType === 1 && r.push(a))),
        e[o].type === "attributes")
      ) {
        let a = e[o].target,
          s = e[o].attributeName,
          u = e[o].oldValue,
          c = () => {
            n.has(a) || n.set(a, []),
              n.get(a).push({
                name: s,
                value: a.getAttribute(s),
              });
          },
          l = () => {
            i.has(a) || i.set(a, []), i.get(a).push(s);
          };
        a.hasAttribute(s) && u === null
          ? c()
          : a.hasAttribute(s)
          ? (l(), c())
          : l();
      }
    i.forEach((o, a) => {
      bt(a, o);
    }),
      n.forEach((o, a) => {
        gt.forEach((s) => s(a, o));
      });
    for (let o of r)
      if (!t.includes(o) && (vt.forEach((a) => a(o)), o._x_cleanups))
        for (; o._x_cleanups.length; ) o._x_cleanups.pop()();
    t.forEach((o) => {
      (o._x_ignoreSelf = !0), (o._x_ignore = !0);
    });
    for (let o of t)
      r.includes(o) ||
        !o.isConnected ||
        (delete o._x_ignoreSelf,
        delete o._x_ignore,
        yt.forEach((a) => a(o)),
        (o._x_ignore = !0),
        (o._x_ignoreSelf = !0));
    t.forEach((o) => {
      delete o._x_ignoreSelf, delete o._x_ignore;
    }),
      (t = null),
      (r = null),
      (n = null),
      (i = null);
  }

  function At(e) {
    return X(F(e));
  }

  function J(e, t, r) {
    return (
      (e._x_dataStack = [t, ...F(r || e)]),
      () => {
        e._x_dataStack = e._x_dataStack.filter((n) => n !== t);
      }
    );
  }

  function ut(e, t) {
    let r = e._x_dataStack[0];
    Object.entries(t).forEach(([n, i]) => {
      r[n] = i;
    });
  }

  function F(e) {
    return e._x_dataStack
      ? e._x_dataStack
      : typeof ShadowRoot == "function" && e instanceof ShadowRoot
      ? F(e.host)
      : e.parentNode
      ? F(e.parentNode)
      : [];
  }

  function X(e) {
    let t = new Proxy(
      {},
      {
        ownKeys: () => Array.from(new Set(e.flatMap((r) => Object.keys(r)))),
        has: (r, n) => e.some((i) => i.hasOwnProperty(n)),
        get: (r, n) =>
          (e.find((i) => {
            if (i.hasOwnProperty(n)) {
              let o = Object.getOwnPropertyDescriptor(i, n);
              if (
                (o.get && o.get._x_alreadyBound) ||
                (o.set && o.set._x_alreadyBound)
              )
                return !0;
              if ((o.get || o.set) && o.enumerable) {
                let a = o.get,
                  s = o.set,
                  u = o;
                (a = a && a.bind(t)),
                  (s = s && s.bind(t)),
                  a && (a._x_alreadyBound = !0),
                  s && (s._x_alreadyBound = !0),
                  Object.defineProperty(i, n, {
                    ...u,
                    get: a,
                    set: s,
                  });
              }
              return !0;
            }
            return !1;
          }) || {})[n],
        set: (r, n, i) => {
          let o = e.find((a) => a.hasOwnProperty(n));
          return o ? (o[n] = i) : (e[e.length - 1][n] = i), !0;
        },
      }
    );
    return t;
  }

  function St(e) {
    let t = (n) => typeof n == "object" && !Array.isArray(n) && n !== null,
      r = (n, i = "") => {
        Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(
          ([o, { value: a, enumerable: s }]) => {
            if (s === !1 || a === void 0) return;
            let u = i === "" ? o : `${i}.${o}`;
            typeof a == "object" && a !== null && a._x_interceptor
              ? (n[o] = a.initialize(e, u, o))
              : t(a) && a !== n && !(a instanceof Element) && r(a, u);
          }
        );
      };
    return r(e);
  }

  function Ot(e, t = () => {}) {
    let r = {
      initialValue: void 0,
      _x_interceptor: !0,
      initialize(n, i, o) {
        return e(
          this.initialValue,
          () => zr(n, i),
          (a) => Re(n, i, a),
          i,
          o
        );
      },
    };
    return (
      t(r),
      (n) => {
        if (typeof n == "object" && n !== null && n._x_interceptor) {
          let i = r.initialize.bind(r);
          r.initialize = (o, a, s) => {
            let u = n.initialize(o, a, s);
            return (r.initialValue = u), i(o, a, s);
          };
        } else r.initialValue = n;
        return r;
      }
    );
  }

  function zr(e, t) {
    return t.split(".").reduce((r, n) => r[n], e);
  }

  function Re(e, t, r) {
    if ((typeof t == "string" && (t = t.split(".")), t.length === 1))
      e[t[0]] = r;
    else {
      if (t.length === 0) throw error;
      return e[t[0]] || (e[t[0]] = {}), Re(e[t[0]], t.slice(1), r);
    }
  }
  var Ct = {};

  function E(e, t) {
    Ct[e] = t;
  }

  function Pe(e, t) {
    return (
      Object.entries(Ct).forEach(([r, n]) => {
        Object.defineProperty(e, `$${r}`, {
          get() {
            let [i, o] = $t(t);
            return (
              (i = {
                interceptor: Ot,
                ...i,
              }),
              xt(t, o),
              n(t, i)
            );
          },
          enumerable: !1,
        });
      }),
      {
        obj: e,
        cleanup: () => {
          t = null;
        },
      }
    );
  }

  function Wr(e, t, r, ...n) {
    try {
      return r(...n);
    } catch (i) {
      Y(i, e, t);
    }
  }

  function Y(e, t, r = void 0) {
    Object.assign(e, {
      el: t,
      expression: r,
    }),
      console.warn(
        `Alpine Expression Error: ${e.message}

${
  r
    ? 'Expression: "' +
      r +
      `"

`
    : ""
}`,
        t
      ),
      setTimeout(() => {
        throw e;
      }, 0);
  }
  var ne = !0;

  function Ur(e) {
    let t = ne;
    (ne = !1), e(), (ne = t);
  }

  function j(e, t, r = {}) {
    let n;
    return m(e, t)((i) => (n = i), r), n;
  }

  function m(...e) {
    return Mt(...e);
  }
  var Mt = Tt;

  function Vr(e) {
    Mt = e;
  }

  function Tt(e, t) {
    let r = {},
      n = Pe(r, e).cleanup;
    mt(e, "evaluator", n);
    let i = [r, ...F(e)];
    if (typeof t == "function") return Yr(i, t);
    let o = Jr(i, t, e);
    return Wr.bind(null, e, t, o);
  }

  function Yr(e, t) {
    return (r = () => {}, { scope: n = {}, params: i = [] } = {}) => {
      let o = t.apply(X([n, ...e]), i);
      oe(r, o);
    };
  }
  var Ae = {};

  function Gr(e, t) {
    if (Ae[e]) return Ae[e];
    let r = Object.getPrototypeOf(async function () {}).constructor,
      n =
        /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e)
          ? `(() => { ${e} })()`
          : e,
      o = (() => {
        try {
          return new r(
            ["__self", "scope"],
            `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`
          );
        } catch (a) {
          return Y(a, t, e), Promise.resolve();
        }
      })();
    return (Ae[e] = o), o;
  }

  function Jr(e, t, r) {
    let n = Gr(t, r);
    return (i = () => {}, { scope: o = {}, params: a = [] } = {}) => {
      (n.result = void 0), (n.finished = !1);
      let s = X([o, ...e]);
      if (typeof n == "function") {
        let u = n(n, s).catch((c) => Y(c, r, t));
        n.finished
          ? (oe(i, n.result, s, a, r), (n.result = void 0))
          : u
              .then((c) => {
                oe(i, c, s, a, r);
              })
              .catch((c) => Y(c, r, t))
              .finally(() => (n.result = void 0));
      }
    };
  }

  function oe(e, t, r, n, i) {
    if (ne && typeof t == "function") {
      let o = t.apply(r, n);
      o instanceof Promise
        ? o.then((a) => oe(e, a, r, n)).catch((a) => Y(a, i, t))
        : e(o);
    } else e(t);
  }
  var Ve = "x-";

  function B(e = "") {
    return Ve + e;
  }

  function Xr(e) {
    Ve = e;
  }
  var Rt = {};

  function g(e, t) {
    Rt[e] = t;
  }

  function Ye(e, t, r) {
    let n = {};
    return Array.from(t)
      .map(Nt((o, a) => (n[o] = a)))
      .filter(Ft)
      .map(tn(n, r))
      .sort(rn)
      .map((o) => en(e, o));
  }

  function Zr(e) {
    return Array.from(e)
      .map(Nt())
      .filter((t) => !Ft(t));
  }
  var $e = !1,
    z = new Map(),
    Pt = Symbol();

  function Qr(e) {
    $e = !0;
    let t = Symbol();
    (Pt = t), z.set(t, []);
    let r = () => {
        for (; z.get(t).length; ) z.get(t).shift()();
        z.delete(t);
      },
      n = () => {
        ($e = !1), r();
      };
    e(r), n();
  }

  function $t(e) {
    let t = [],
      r = (s) => t.push(s),
      [n, i] = Fr(e);
    return (
      t.push(i),
      [
        {
          Alpine: Z,
          effect: n,
          cleanup: r,
          evaluateLater: m.bind(m, e),
          evaluate: j.bind(j, e),
        },
        () => t.forEach((s) => s()),
      ]
    );
  }

  function en(e, t) {
    let r = () => {},
      n = Rt[t.type] || r,
      [i, o] = $t(e);
    mt(e, t.original, o);
    let a = () => {
      e._x_ignore ||
        e._x_ignoreSelf ||
        (n.inline && n.inline(e, t, i),
        (n = n.bind(n, e, t, i)),
        $e ? z.get(Pt).push(n) : n());
    };
    return (a.runCleanups = o), a;
  }
  var It =
      (e, t) =>
      ({ name: r, value: n }) => (
        r.startsWith(e) && (r = r.replace(e, t)),
        {
          name: r,
          value: n,
        }
      ),
    Lt = (e) => e;

  function Nt(e = () => {}) {
    return ({ name: t, value: r }) => {
      let { name: n, value: i } = jt.reduce((o, a) => a(o), {
        name: t,
        value: r,
      });
      return (
        n !== t && e(n, t),
        {
          name: n,
          value: i,
        }
      );
    };
  }
  var jt = [];

  function Ge(e) {
    jt.push(e);
  }

  function Ft({ name: e }) {
    return Kt().test(e);
  }
  var Kt = () => new RegExp(`^${Ve}([^:^.]+)\\b`);

  function tn(e, t) {
    return ({ name: r, value: n }) => {
      let i = r.match(Kt()),
        o = r.match(/:([a-zA-Z0-9\-:]+)/),
        a = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
        s = t || e[r] || r;
      return {
        type: i ? i[1] : null,
        value: o ? o[1] : null,
        modifiers: a.map((u) => u.replace(".", "")),
        expression: n,
        original: s,
      };
    };
  }
  var Ie = "DEFAULT",
    te = [
      "ignore",
      "ref",
      "data",
      "id",
      "bind",
      "init",
      "for",
      "mask",
      "model",
      "modelable",
      "transition",
      "show",
      "if",
      Ie,
      "teleport",
      "element",
    ];

  function rn(e, t) {
    let r = te.indexOf(e.type) === -1 ? Ie : e.type,
      n = te.indexOf(t.type) === -1 ? Ie : t.type;
    return te.indexOf(r) - te.indexOf(n);
  }

  function U(e, t, r = {}) {
    e.dispatchEvent(
      new CustomEvent(t, {
        detail: r,
        bubbles: !0,
        composed: !0,
        cancelable: !0,
      })
    );
  }
  var Le = [],
    Je = !1;

  function Dt(e = () => {}) {
    return (
      queueMicrotask(() => {
        Je ||
          setTimeout(() => {
            Ne();
          });
      }),
      new Promise((t) => {
        Le.push(() => {
          e(), t();
        });
      })
    );
  }

  function Ne() {
    for (Je = !1; Le.length; ) Le.shift()();
  }

  function nn() {
    Je = !0;
  }

  function I(e, t) {
    if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
      Array.from(e.children).forEach((i) => I(i, t));
      return;
    }
    let r = !1;
    if ((t(e, () => (r = !0)), r)) return;
    let n = e.firstElementChild;
    for (; n; ) I(n, t, !1), (n = n.nextElementSibling);
  }

  function K(e, ...t) {
    console.warn(`Alpine Warning: ${e}`, ...t);
  }

  function on() {
    document.body ||
      K(
        "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
      ),
      U(document, "alpine:init"),
      U(document, "alpine:initializing"),
      wt(),
      Kr((t) => C(t, I)),
      xt((t) => Wt(t)),
      Dr((t, r) => {
        Ye(t, r).forEach((n) => n());
      });
    let e = (t) => !ue(t.parentElement, !0);
    Array.from(document.querySelectorAll(Ht()))
      .filter(e)
      .forEach((t) => {
        C(t);
      }),
      U(document, "alpine:initialized");
  }
  var Xe = [],
    kt = [];

  function Bt() {
    return Xe.map((e) => e());
  }

  function Ht() {
    return Xe.concat(kt).map((e) => e());
  }

  function qt(e) {
    Xe.push(e);
  }

  function zt(e) {
    kt.push(e);
  }

  function ue(e, t = !1) {
    return ce(e, (r) => {
      if ((t ? Ht() : Bt()).some((i) => r.matches(i))) return !0;
    });
  }

  function ce(e, t) {
    if (!!e) {
      if (t(e)) return e;
      if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement))
        return ce(e.parentElement, t);
    }
  }

  function an(e) {
    return Bt().some((t) => e.matches(t));
  }

  function C(e, t = I) {
    Qr(() => {
      t(e, (r, n) => {
        Ye(r, r.attributes).forEach((i) => i()), r._x_ignore && n();
      });
    });
  }

  function Wt(e) {
    I(e, (t) => bt(t));
  }

  function Ze(e, t) {
    return Array.isArray(t)
      ? ct(e, t.join(" "))
      : typeof t == "object" && t !== null
      ? sn(e, t)
      : typeof t == "function"
      ? Ze(e, t())
      : ct(e, t);
  }

  function ct(e, t) {
    let r = (o) => o.split(" ").filter(Boolean),
      n = (o) =>
        o
          .split(" ")
          .filter((a) => !e.classList.contains(a))
          .filter(Boolean),
      i = (o) => (
        e.classList.add(...o),
        () => {
          e.classList.remove(...o);
        }
      );
    return (t = t === !0 ? (t = "") : t || ""), i(n(t));
  }

  function sn(e, t) {
    let r = (s) => s.split(" ").filter(Boolean),
      n = Object.entries(t)
        .flatMap(([s, u]) => (u ? r(s) : !1))
        .filter(Boolean),
      i = Object.entries(t)
        .flatMap(([s, u]) => (u ? !1 : r(s)))
        .filter(Boolean),
      o = [],
      a = [];
    return (
      i.forEach((s) => {
        e.classList.contains(s) && (e.classList.remove(s), a.push(s));
      }),
      n.forEach((s) => {
        e.classList.contains(s) || (e.classList.add(s), o.push(s));
      }),
      () => {
        a.forEach((s) => e.classList.add(s)),
          o.forEach((s) => e.classList.remove(s));
      }
    );
  }

  function le(e, t) {
    return typeof t == "object" && t !== null ? un(e, t) : cn(e, t);
  }

  function un(e, t) {
    let r = {};
    return (
      Object.entries(t).forEach(([n, i]) => {
        (r[n] = e.style[n]),
          n.startsWith("--") || (n = ln(n)),
          e.style.setProperty(n, i);
      }),
      setTimeout(() => {
        e.style.length === 0 && e.removeAttribute("style");
      }),
      () => {
        le(e, r);
      }
    );
  }

  function cn(e, t) {
    let r = e.getAttribute("style", t);
    return (
      e.setAttribute("style", t),
      () => {
        e.setAttribute("style", r || "");
      }
    );
  }

  function ln(e) {
    return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }

  function je(e, t = () => {}) {
    let r = !1;
    return function () {
      r ? t.apply(this, arguments) : ((r = !0), e.apply(this, arguments));
    };
  }
  g(
    "transition",
    (e, { value: t, modifiers: r, expression: n }, { evaluate: i }) => {
      typeof n == "function" && (n = i(n)), n ? fn(e, n, t) : dn(e, r, t);
    }
  );

  function fn(e, t, r) {
    Ut(e, Ze, ""),
      {
        enter: (i) => {
          e._x_transition.enter.during = i;
        },
        "enter-start": (i) => {
          e._x_transition.enter.start = i;
        },
        "enter-end": (i) => {
          e._x_transition.enter.end = i;
        },
        leave: (i) => {
          e._x_transition.leave.during = i;
        },
        "leave-start": (i) => {
          e._x_transition.leave.start = i;
        },
        "leave-end": (i) => {
          e._x_transition.leave.end = i;
        },
      }[r](t);
  }

  function dn(e, t, r) {
    Ut(e, le);
    let n = !t.includes("in") && !t.includes("out") && !r,
      i = n || t.includes("in") || ["enter"].includes(r),
      o = n || t.includes("out") || ["leave"].includes(r);
    t.includes("in") && !n && (t = t.filter((p, v) => v < t.indexOf("out"))),
      t.includes("out") && !n && (t = t.filter((p, v) => v > t.indexOf("out")));
    let a = !t.includes("opacity") && !t.includes("scale"),
      s = a || t.includes("opacity"),
      u = a || t.includes("scale"),
      c = s ? 0 : 1,
      l = u ? H(t, "scale", 95) / 100 : 1,
      d = H(t, "delay", 0),
      h = H(t, "origin", "center"),
      S = "opacity, transform",
      L = H(t, "duration", 150) / 1e3,
      Q = H(t, "duration", 75) / 1e3,
      f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
    i &&
      ((e._x_transition.enter.during = {
        transformOrigin: h,
        transitionDelay: d,
        transitionProperty: S,
        transitionDuration: `${L}s`,
        transitionTimingFunction: f,
      }),
      (e._x_transition.enter.start = {
        opacity: c,
        transform: `scale(${l})`,
      }),
      (e._x_transition.enter.end = {
        opacity: 1,
        transform: "scale(1)",
      })),
      o &&
        ((e._x_transition.leave.during = {
          transformOrigin: h,
          transitionDelay: d,
          transitionProperty: S,
          transitionDuration: `${Q}s`,
          transitionTimingFunction: f,
        }),
        (e._x_transition.leave.start = {
          opacity: 1,
          transform: "scale(1)",
        }),
        (e._x_transition.leave.end = {
          opacity: c,
          transform: `scale(${l})`,
        }));
  }

  function Ut(e, t, r = {}) {
    e._x_transition ||
      (e._x_transition = {
        enter: {
          during: r,
          start: r,
          end: r,
        },
        leave: {
          during: r,
          start: r,
          end: r,
        },
        in(n = () => {}, i = () => {}) {
          Fe(
            e,
            t,
            {
              during: this.enter.during,
              start: this.enter.start,
              end: this.enter.end,
            },
            n,
            i
          );
        },
        out(n = () => {}, i = () => {}) {
          Fe(
            e,
            t,
            {
              during: this.leave.during,
              start: this.leave.start,
              end: this.leave.end,
            },
            n,
            i
          );
        },
      });
  }
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
    e,
    t,
    r,
    n
  ) {
    let i = () => {
      document.visibilityState === "visible"
        ? requestAnimationFrame(r)
        : setTimeout(r);
    };
    if (t) {
      e._x_transition && (e._x_transition.enter || e._x_transition.leave)
        ? e._x_transition.enter &&
          (Object.entries(e._x_transition.enter.during).length ||
            Object.entries(e._x_transition.enter.start).length ||
            Object.entries(e._x_transition.enter.end).length)
          ? e._x_transition.in(r)
          : i()
        : e._x_transition
        ? e._x_transition.in(r)
        : i();
      return;
    }
    (e._x_hidePromise = e._x_transition
      ? new Promise((o, a) => {
          e._x_transition.out(
            () => {},
            () => o(n)
          ),
            e._x_transitioning.beforeCancel(() =>
              a({
                isFromCancelledTransition: !0,
              })
            );
        })
      : Promise.resolve(n)),
      queueMicrotask(() => {
        let o = Vt(e);
        o
          ? (o._x_hideChildren || (o._x_hideChildren = []),
            o._x_hideChildren.push(e))
          : queueMicrotask(() => {
              let a = (s) => {
                let u = Promise.all([
                  s._x_hidePromise,
                  ...(s._x_hideChildren || []).map(a),
                ]).then(([c]) => c());
                return delete s._x_hidePromise, delete s._x_hideChildren, u;
              };
              a(e).catch((s) => {
                if (!s.isFromCancelledTransition) throw s;
              });
            });
      });
  };

  function Vt(e) {
    let t = e.parentNode;
    if (!!t) return t._x_hidePromise ? t : Vt(t);
  }

  function Fe(
    e,
    t,
    { during: r, start: n, end: i } = {},
    o = () => {},
    a = () => {}
  ) {
    if (
      (e._x_transitioning && e._x_transitioning.cancel(),
      Object.keys(r).length === 0 &&
        Object.keys(n).length === 0 &&
        Object.keys(i).length === 0)
    ) {
      o(), a();
      return;
    }
    let s, u, c;
    pn(e, {
      start() {
        s = t(e, n);
      },
      during() {
        u = t(e, r);
      },
      before: o,
      end() {
        s(), (c = t(e, i));
      },
      after: a,
      cleanup() {
        u(), c();
      },
    });
  }

  function pn(e, t) {
    let r,
      n,
      i,
      o = je(() => {
        y(() => {
          (r = !0),
            n || t.before(),
            i || (t.end(), Ne()),
            t.after(),
            e.isConnected && t.cleanup(),
            delete e._x_transitioning;
        });
      });
    (e._x_transitioning = {
      beforeCancels: [],
      beforeCancel(a) {
        this.beforeCancels.push(a);
      },
      cancel: je(function () {
        for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
        o();
      }),
      finish: o,
    }),
      y(() => {
        t.start(), t.during();
      }),
      nn(),
      requestAnimationFrame(() => {
        if (r) return;
        let a =
            Number(
              getComputedStyle(e)
                .transitionDuration.replace(/,.*/, "")
                .replace("s", "")
            ) * 1e3,
          s =
            Number(
              getComputedStyle(e)
                .transitionDelay.replace(/,.*/, "")
                .replace("s", "")
            ) * 1e3;
        a === 0 &&
          (a =
            Number(getComputedStyle(e).animationDuration.replace("s", "")) *
            1e3),
          y(() => {
            t.before();
          }),
          (n = !0),
          requestAnimationFrame(() => {
            r ||
              (y(() => {
                t.end();
              }),
              Ne(),
              setTimeout(e._x_transitioning.finish, a + s),
              (i = !0));
          });
      });
  }

  function H(e, t, r) {
    if (e.indexOf(t) === -1) return r;
    let n = e[e.indexOf(t) + 1];
    if (!n || (t === "scale" && isNaN(n))) return r;
    if (t === "duration") {
      let i = n.match(/([0-9]+)ms/);
      if (i) return i[1];
    }
    return t === "origin" &&
      ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2])
      ? [n, e[e.indexOf(t) + 2]].join(" ")
      : n;
  }
  var Ke = !1;

  function fe(e, t = () => {}) {
    return (...r) => (Ke ? t(...r) : e(...r));
  }

  function _n(e, t) {
    t._x_dataStack || (t._x_dataStack = e._x_dataStack),
      (Ke = !0),
      gn(() => {
        hn(t);
      }),
      (Ke = !1);
  }

  function hn(e) {
    let t = !1;
    C(e, (n, i) => {
      I(n, (o, a) => {
        if (t && an(o)) return a();
        (t = !0), i(o, a);
      });
    });
  }

  function gn(e) {
    let t = G;
    st((r, n) => {
      let i = t(r);
      return se(i), () => {};
    }),
      e(),
      st(t);
  }

  function Yt(e, t, r, n = []) {
    switch (
      (e._x_bindings || (e._x_bindings = k({})),
      (e._x_bindings[t] = r),
      (t = n.includes("camel") ? En(t) : t),
      t)
    ) {
      case "value":
        vn(e, r);
        break;
      case "style":
        xn(e, r);
        break;
      case "class":
        yn(e, r);
        break;
      default:
        mn(e, t, r);
        break;
    }
  }

  function vn(e, t) {
    if (e.type === "radio")
      e.attributes.value === void 0 && (e.value = t),
        window.fromModel && (e.checked = lt(e.value, t));
    else if (e.type === "checkbox")
      Number.isInteger(t)
        ? (e.value = t)
        : !Number.isInteger(t) &&
          !Array.isArray(t) &&
          typeof t != "boolean" &&
          ![null, void 0].includes(t)
        ? (e.value = String(t))
        : Array.isArray(t)
        ? (e.checked = t.some((r) => lt(r, e.value)))
        : (e.checked = !!t);
    else if (e.tagName === "SELECT") wn(e, t);
    else {
      if (e.value === t) return;
      e.value = t;
    }
  }

  function yn(e, t) {
    e._x_undoAddedClasses && e._x_undoAddedClasses(),
      (e._x_undoAddedClasses = Ze(e, t));
  }

  function xn(e, t) {
    e._x_undoAddedStyles && e._x_undoAddedStyles(),
      (e._x_undoAddedStyles = le(e, t));
  }

  function mn(e, t, r) {
    [null, void 0, !1].includes(r) && An(t)
      ? e.removeAttribute(t)
      : (Gt(t) && (r = t), bn(e, t, r));
  }

  function bn(e, t, r) {
    e.getAttribute(t) != r && e.setAttribute(t, r);
  }

  function wn(e, t) {
    let r = [].concat(t).map((n) => n + "");
    Array.from(e.options).forEach((n) => {
      n.selected = r.includes(n.value);
    });
  }

  function En(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
  }

  function lt(e, t) {
    return e == t;
  }

  function Gt(e) {
    return [
      "disabled",
      "checked",
      "required",
      "readonly",
      "hidden",
      "open",
      "selected",
      "autofocus",
      "itemscope",
      "multiple",
      "novalidate",
      "allowfullscreen",
      "allowpaymentrequest",
      "formnovalidate",
      "autoplay",
      "controls",
      "loop",
      "muted",
      "playsinline",
      "default",
      "ismap",
      "reversed",
      "async",
      "defer",
      "nomodule",
    ].includes(e);
  }

  function An(e) {
    return ![
      "aria-pressed",
      "aria-checked",
      "aria-expanded",
      "aria-selected",
    ].includes(e);
  }

  function Sn(e, t, r) {
    if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
    let n = e.getAttribute(t);
    return n === null
      ? typeof r == "function"
        ? r()
        : r
      : Gt(t)
      ? !![t, "true"].includes(n)
      : n === ""
      ? !0
      : n;
  }

  function Jt(e, t) {
    var r;
    return function () {
      var n = this,
        i = arguments,
        o = function () {
          (r = null), e.apply(n, i);
        };
      clearTimeout(r), (r = setTimeout(o, t));
    };
  }

  function Xt(e, t) {
    let r;
    return function () {
      let n = this,
        i = arguments;
      r || (e.apply(n, i), (r = !0), setTimeout(() => (r = !1), t));
    };
  }

  function On(e) {
    e(Z);
  }
  var T = {},
    ft = !1;

  function Cn(e, t) {
    if ((ft || ((T = k(T)), (ft = !0)), t === void 0)) return T[e];
    (T[e] = t),
      typeof t == "object" &&
        t !== null &&
        t.hasOwnProperty("init") &&
        typeof t.init == "function" &&
        T[e].init(),
      St(T[e]);
  }

  function Mn() {
    return T;
  }
  var Zt = {};

  function Tn(e, t) {
    Zt[e] = typeof t != "function" ? () => t : t;
  }

  function Rn(e) {
    return (
      Object.entries(Zt).forEach(([t, r]) => {
        Object.defineProperty(e, t, {
          get() {
            return (...n) => r(...n);
          },
        });
      }),
      e
    );
  }
  var Qt = {};

  function Pn(e, t) {
    Qt[e] = t;
  }

  function $n(e, t) {
    return (
      Object.entries(Qt).forEach(([r, n]) => {
        Object.defineProperty(e, r, {
          get() {
            return (...i) => n.bind(t)(...i);
          },
          enumerable: !1,
        });
      }),
      e
    );
  }
  var In = {
      get reactive() {
        return k;
      },
      get release() {
        return se;
      },
      get effect() {
        return G;
      },
      get raw() {
        return ht;
      },
      version: "3.10.2",
      flushAndStopDeferringMutations: qr,
      dontAutoEvaluateFunctions: Ur,
      disableEffectScheduling: Nr,
      stopObservingMutations: Et,
      destroyTree: Wt,
      setReactivityEngine: jr,
      closestDataStack: F,
      skipDuringClone: fe,
      addRootSelector: qt,
      addInitSelector: zt,
      addScopeToNode: J,
      deferMutations: Hr,
      mapAttributes: Ge,
      evaluateLater: m,
      setEvaluator: Vr,
      mergeProxies: X,
      findClosest: ce,
      closestRoot: ue,
      interceptor: Ot,
      transition: Fe,
      setStyles: le,
      mutateDom: y,
      directive: g,
      throttle: Xt,
      debounce: Jt,
      evaluate: j,
      initTree: C,
      nextTick: Dt,
      prefixed: B,
      prefix: Xr,
      plugin: On,
      magic: E,
      store: Cn,
      start: on,
      clone: _n,
      bound: Sn,
      $data: At,
      data: Pn,
      bind: Tn,
    },
    Z = In;

  function er(e, t) {
    let r = Object.create(null),
      n = e.split(",");
    for (let i = 0; i < n.length; i++) r[n[i]] = !0;
    return t ? (i) => !!r[i.toLowerCase()] : (i) => !!r[i];
  }
  var Ln =
      "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    Pi = er(
      Ln +
        ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"
    ),
    Nn = Object.freeze({}),
    $i = Object.freeze([]),
    tr = Object.assign,
    jn = Object.prototype.hasOwnProperty,
    de = (e, t) => jn.call(e, t),
    P = Array.isArray,
    V = (e) => rr(e) === "[object Map]",
    Fn = (e) => typeof e == "string",
    Qe = (e) => typeof e == "symbol",
    pe = (e) => e !== null && typeof e == "object",
    Kn = Object.prototype.toString,
    rr = (e) => Kn.call(e),
    nr = (e) => rr(e).slice(8, -1),
    et = (e) =>
      Fn(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    _e = (e) => {
      let t = Object.create(null);
      return (r) => t[r] || (t[r] = e(r));
    },
    Dn = /-(\w)/g,
    Ii = _e((e) => e.replace(Dn, (t, r) => (r ? r.toUpperCase() : ""))),
    kn = /\B([A-Z])/g,
    Li = _e((e) => e.replace(kn, "-$1").toLowerCase()),
    ir = _e((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    Ni = _e((e) => (e ? `on${ir(e)}` : "")),
    or = (e, t) => e !== t && (e === e || t === t),
    De = new WeakMap(),
    q = [],
    A,
    $ = Symbol("iterate"),
    ke = Symbol("Map key iterate");

  function Bn(e) {
    return e && e._isEffect === !0;
  }

  function Hn(e, t = Nn) {
    Bn(e) && (e = e.raw);
    let r = Wn(e, t);
    return t.lazy || r(), r;
  }

  function qn(e) {
    e.active &&
      (ar(e), e.options.onStop && e.options.onStop(), (e.active = !1));
  }
  var zn = 0;

  function Wn(e, t) {
    let r = function () {
      if (!r.active) return e();
      if (!q.includes(r)) {
        ar(r);
        try {
          return Vn(), q.push(r), (A = r), e();
        } finally {
          q.pop(), sr(), (A = q[q.length - 1]);
        }
      }
    };
    return (
      (r.id = zn++),
      (r.allowRecurse = !!t.allowRecurse),
      (r._isEffect = !0),
      (r.active = !0),
      (r.raw = e),
      (r.deps = []),
      (r.options = t),
      r
    );
  }

  function ar(e) {
    let { deps: t } = e;
    if (t.length) {
      for (let r = 0; r < t.length; r++) t[r].delete(e);
      t.length = 0;
    }
  }
  var D = !0,
    tt = [];

  function Un() {
    tt.push(D), (D = !1);
  }

  function Vn() {
    tt.push(D), (D = !0);
  }

  function sr() {
    let e = tt.pop();
    D = e === void 0 ? !0 : e;
  }

  function w(e, t, r) {
    if (!D || A === void 0) return;
    let n = De.get(e);
    n || De.set(e, (n = new Map()));
    let i = n.get(r);
    i || n.set(r, (i = new Set())),
      i.has(A) ||
        (i.add(A),
        A.deps.push(i),
        A.options.onTrack &&
          A.options.onTrack({
            effect: A,
            target: e,
            type: t,
            key: r,
          }));
  }

  function M(e, t, r, n, i, o) {
    let a = De.get(e);
    if (!a) return;
    let s = new Set(),
      u = (l) => {
        l &&
          l.forEach((d) => {
            (d !== A || d.allowRecurse) && s.add(d);
          });
      };
    if (t === "clear") a.forEach(u);
    else if (r === "length" && P(e))
      a.forEach((l, d) => {
        (d === "length" || d >= n) && u(l);
      });
    else
      switch ((r !== void 0 && u(a.get(r)), t)) {
        case "add":
          P(e)
            ? et(r) && u(a.get("length"))
            : (u(a.get($)), V(e) && u(a.get(ke)));
          break;
        case "delete":
          P(e) || (u(a.get($)), V(e) && u(a.get(ke)));
          break;
        case "set":
          V(e) && u(a.get($));
          break;
      }
    let c = (l) => {
      l.options.onTrigger &&
        l.options.onTrigger({
          effect: l,
          target: e,
          key: r,
          type: t,
          newValue: n,
          oldValue: i,
          oldTarget: o,
        }),
        l.options.scheduler ? l.options.scheduler(l) : l();
    };
    s.forEach(c);
  }
  var Yn = er("__proto__,__v_isRef,__isVue"),
    ur = new Set(
      Object.getOwnPropertyNames(Symbol)
        .map((e) => Symbol[e])
        .filter(Qe)
    ),
    Gn = he(),
    Jn = he(!1, !0),
    Xn = he(!0),
    Zn = he(!0, !0),
    ae = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    let t = Array.prototype[e];
    ae[e] = function (...r) {
      let n = _(this);
      for (let o = 0, a = this.length; o < a; o++) w(n, "get", o + "");
      let i = t.apply(n, r);
      return i === -1 || i === !1 ? t.apply(n, r.map(_)) : i;
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    let t = Array.prototype[e];
    ae[e] = function (...r) {
      Un();
      let n = t.apply(this, r);
      return sr(), n;
    };
  });

  function he(e = !1, t = !1) {
    return function (n, i, o) {
      if (i === "__v_isReactive") return !e;
      if (i === "__v_isReadonly") return e;
      if (i === "__v_raw" && o === (e ? (t ? ui : wr) : t ? si : br).get(n))
        return n;
      let a = P(n);
      if (!e && a && de(ae, i)) return Reflect.get(ae, i, o);
      let s = Reflect.get(n, i, o);
      return (Qe(i) ? ur.has(i) : Yn(i)) || (e || w(n, "get", i), t)
        ? s
        : Be(s)
        ? !a || !et(i)
          ? s.value
          : s
        : pe(s)
        ? e
          ? Er(s)
          : ot(s)
        : s;
    };
  }
  var Qn = cr(),
    ei = cr(!0);

  function cr(e = !1) {
    return function (r, n, i, o) {
      let a = r[n];
      if (!e && ((i = _(i)), (a = _(a)), !P(r) && Be(a) && !Be(i)))
        return (a.value = i), !0;
      let s = P(r) && et(n) ? Number(n) < r.length : de(r, n),
        u = Reflect.set(r, n, i, o);
      return (
        r === _(o) &&
          (s ? or(i, a) && M(r, "set", n, i, a) : M(r, "add", n, i)),
        u
      );
    };
  }

  function ti(e, t) {
    let r = de(e, t),
      n = e[t],
      i = Reflect.deleteProperty(e, t);
    return i && r && M(e, "delete", t, void 0, n), i;
  }

  function ri(e, t) {
    let r = Reflect.has(e, t);
    return (!Qe(t) || !ur.has(t)) && w(e, "has", t), r;
  }

  function ni(e) {
    return w(e, "iterate", P(e) ? "length" : $), Reflect.ownKeys(e);
  }
  var lr = {
      get: Gn,
      set: Qn,
      deleteProperty: ti,
      has: ri,
      ownKeys: ni,
    },
    fr = {
      get: Xn,
      set(e, t) {
        return (
          console.warn(
            `Set operation on key "${String(t)}" failed: target is readonly.`,
            e
          ),
          !0
        );
      },
      deleteProperty(e, t) {
        return (
          console.warn(
            `Delete operation on key "${String(
              t
            )}" failed: target is readonly.`,
            e
          ),
          !0
        );
      },
    },
    ji = tr({}, lr, {
      get: Jn,
      set: ei,
    }),
    Fi = tr({}, fr, {
      get: Zn,
    }),
    rt = (e) => (pe(e) ? ot(e) : e),
    nt = (e) => (pe(e) ? Er(e) : e),
    it = (e) => e,
    ge = (e) => Reflect.getPrototypeOf(e);

  function ve(e, t, r = !1, n = !1) {
    e = e.__v_raw;
    let i = _(e),
      o = _(t);
    t !== o && !r && w(i, "get", t), !r && w(i, "get", o);
    let { has: a } = ge(i),
      s = n ? it : r ? nt : rt;
    if (a.call(i, t)) return s(e.get(t));
    if (a.call(i, o)) return s(e.get(o));
    e !== i && e.get(t);
  }

  function ye(e, t = !1) {
    let r = this.__v_raw,
      n = _(r),
      i = _(e);
    return (
      e !== i && !t && w(n, "has", e),
      !t && w(n, "has", i),
      e === i ? r.has(e) : r.has(e) || r.has(i)
    );
  }

  function xe(e, t = !1) {
    return (
      (e = e.__v_raw), !t && w(_(e), "iterate", $), Reflect.get(e, "size", e)
    );
  }

  function dr(e) {
    e = _(e);
    let t = _(this);
    return ge(t).has.call(t, e) || (t.add(e), M(t, "add", e, e)), this;
  }

  function pr(e, t) {
    t = _(t);
    let r = _(this),
      { has: n, get: i } = ge(r),
      o = n.call(r, e);
    o ? mr(r, n, e) : ((e = _(e)), (o = n.call(r, e)));
    let a = i.call(r, e);
    return (
      r.set(e, t),
      o ? or(t, a) && M(r, "set", e, t, a) : M(r, "add", e, t),
      this
    );
  }

  function _r(e) {
    let t = _(this),
      { has: r, get: n } = ge(t),
      i = r.call(t, e);
    i ? mr(t, r, e) : ((e = _(e)), (i = r.call(t, e)));
    let o = n ? n.call(t, e) : void 0,
      a = t.delete(e);
    return i && M(t, "delete", e, void 0, o), a;
  }

  function hr() {
    let e = _(this),
      t = e.size !== 0,
      r = V(e) ? new Map(e) : new Set(e),
      n = e.clear();
    return t && M(e, "clear", void 0, void 0, r), n;
  }

  function me(e, t) {
    return function (n, i) {
      let o = this,
        a = o.__v_raw,
        s = _(a),
        u = t ? it : e ? nt : rt;
      return (
        !e && w(s, "iterate", $), a.forEach((c, l) => n.call(i, u(c), u(l), o))
      );
    };
  }

  function re(e, t, r) {
    return function (...n) {
      let i = this.__v_raw,
        o = _(i),
        a = V(o),
        s = e === "entries" || (e === Symbol.iterator && a),
        u = e === "keys" && a,
        c = i[e](...n),
        l = r ? it : t ? nt : rt;
      return (
        !t && w(o, "iterate", u ? ke : $),
        {
          next() {
            let { value: d, done: h } = c.next();
            return h
              ? {
                  value: d,
                  done: h,
                }
              : {
                  value: s ? [l(d[0]), l(d[1])] : l(d),
                  done: h,
                };
          },
          [Symbol.iterator]() {
            return this;
          },
        }
      );
    };
  }

  function O(e) {
    return function (...t) {
      {
        let r = t[0] ? `on key "${t[0]}" ` : "";
        console.warn(
          `${ir(e)} operation ${r}failed: target is readonly.`,
          _(this)
        );
      }
      return e === "delete" ? !1 : this;
    };
  }
  var gr = {
      get(e) {
        return ve(this, e);
      },
      get size() {
        return xe(this);
      },
      has: ye,
      add: dr,
      set: pr,
      delete: _r,
      clear: hr,
      forEach: me(!1, !1),
    },
    vr = {
      get(e) {
        return ve(this, e, !1, !0);
      },
      get size() {
        return xe(this);
      },
      has: ye,
      add: dr,
      set: pr,
      delete: _r,
      clear: hr,
      forEach: me(!1, !0),
    },
    yr = {
      get(e) {
        return ve(this, e, !0);
      },
      get size() {
        return xe(this, !0);
      },
      has(e) {
        return ye.call(this, e, !0);
      },
      add: O("add"),
      set: O("set"),
      delete: O("delete"),
      clear: O("clear"),
      forEach: me(!0, !1),
    },
    xr = {
      get(e) {
        return ve(this, e, !0, !0);
      },
      get size() {
        return xe(this, !0);
      },
      has(e) {
        return ye.call(this, e, !0);
      },
      add: O("add"),
      set: O("set"),
      delete: O("delete"),
      clear: O("clear"),
      forEach: me(!0, !0),
    },
    ii = ["keys", "values", "entries", Symbol.iterator];
  ii.forEach((e) => {
    (gr[e] = re(e, !1, !1)),
      (yr[e] = re(e, !0, !1)),
      (vr[e] = re(e, !1, !0)),
      (xr[e] = re(e, !0, !0));
  });

  function be(e, t) {
    let r = t ? (e ? xr : vr) : e ? yr : gr;
    return (n, i, o) =>
      i === "__v_isReactive"
        ? !e
        : i === "__v_isReadonly"
        ? e
        : i === "__v_raw"
        ? n
        : Reflect.get(de(r, i) && i in n ? r : n, i, o);
  }
  var oi = {
      get: be(!1, !1),
    },
    Ki = {
      get: be(!1, !0),
    },
    ai = {
      get: be(!0, !1),
    },
    Di = {
      get: be(!0, !0),
    };

  function mr(e, t, r) {
    let n = _(r);
    if (n !== r && t.call(e, n)) {
      let i = nr(e);
      console.warn(
        `Reactive ${i} contains both the raw and reactive versions of the same object${
          i === "Map" ? " as keys" : ""
        }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
      );
    }
  }
  var br = new WeakMap(),
    si = new WeakMap(),
    wr = new WeakMap(),
    ui = new WeakMap();

  function ci(e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }

  function li(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : ci(nr(e));
  }

  function ot(e) {
    return e && e.__v_isReadonly ? e : Ar(e, !1, lr, oi, br);
  }

  function Er(e) {
    return Ar(e, !0, fr, ai, wr);
  }

  function Ar(e, t, r, n, i) {
    if (!pe(e))
      return console.warn(`value cannot be made reactive: ${String(e)}`), e;
    if (e.__v_raw && !(t && e.__v_isReactive)) return e;
    let o = i.get(e);
    if (o) return o;
    let a = li(e);
    if (a === 0) return e;
    let s = new Proxy(e, a === 2 ? n : r);
    return i.set(e, s), s;
  }

  function _(e) {
    return (e && _(e.__v_raw)) || e;
  }

  function Be(e) {
    return Boolean(e && e.__v_isRef === !0);
  }
  E("nextTick", () => Dt);
  E("dispatch", (e) => U.bind(U, e));
  E("watch", (e, { evaluateLater: t, effect: r }) => (n, i) => {
    let o = t(n),
      a = !0,
      s,
      u = r(() =>
        o((c) => {
          JSON.stringify(c),
            a
              ? (s = c)
              : queueMicrotask(() => {
                  i(c, s), (s = c);
                }),
            (a = !1);
        })
      );
    e._x_effects.delete(u);
  });
  E("store", Mn);
  E("data", (e) => At(e));
  E("root", (e) => ue(e));
  E(
    "refs",
    (e) => (e._x_refs_proxy || (e._x_refs_proxy = X(fi(e))), e._x_refs_proxy)
  );

  function fi(e) {
    let t = [],
      r = e;
    for (; r; ) r._x_refs && t.push(r._x_refs), (r = r.parentNode);
    return t;
  }
  var Se = {};

  function Sr(e) {
    return Se[e] || (Se[e] = 0), ++Se[e];
  }

  function di(e, t) {
    return ce(e, (r) => {
      if (r._x_ids && r._x_ids[t]) return !0;
    });
  }

  function pi(e, t) {
    e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Sr(t));
  }
  E("id", (e) => (t, r = null) => {
    let n = di(e, t),
      i = n ? n._x_ids[t] : Sr(t);
    return r ? `${t}-${i}-${r}` : `${t}-${i}`;
  });
  E("el", (e) => e);
  Or("Focus", "focus", "focus");
  Or("Persist", "persist", "persist");

  function Or(e, t, r) {
    E(t, (n) =>
      K(
        `You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`,
        n
      )
    );
  }
  g("modelable", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
    let i = n(t),
      o = () => {
        let c;
        return i((l) => (c = l)), c;
      },
      a = n(`${t} = __placeholder`),
      s = (c) =>
        a(() => {}, {
          scope: {
            __placeholder: c,
          },
        }),
      u = o();
    s(u),
      queueMicrotask(() => {
        if (!e._x_model) return;
        e._x_removeModelListeners.default();
        let c = e._x_model.get,
          l = e._x_model.set;
        r(() => s(c())), r(() => l(o()));
      });
  });
  g("teleport", (e, { expression: t }, { cleanup: r }) => {
    e.tagName.toLowerCase() !== "template" &&
      K("x-teleport can only be used on a <template> tag", e);
    let n = document.querySelector(t);
    n || K(`Cannot find x-teleport element for selector: "${t}"`);
    let i = e.content.cloneNode(!0).firstElementChild;
    (e._x_teleport = i),
      (i._x_teleportBack = e),
      e._x_forwardEvents &&
        e._x_forwardEvents.forEach((o) => {
          i.addEventListener(o, (a) => {
            a.stopPropagation(), e.dispatchEvent(new a.constructor(a.type, a));
          });
        }),
      J(i, {}, e),
      y(() => {
        n.appendChild(i), C(i), (i._x_ignore = !0);
      }),
      r(() => i.remove());
  });
  var Cr = () => {};
  Cr.inline = (e, { modifiers: t }, { cleanup: r }) => {
    t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
      r(() => {
        t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
      });
  };
  g("ignore", Cr);
  g("effect", (e, { expression: t }, { effect: r }) => r(m(e, t)));

  function Mr(e, t, r, n) {
    let i = e,
      o = (u) => n(u),
      a = {},
      s = (u, c) => (l) => c(u, l);
    if (
      (r.includes("dot") && (t = _i(t)),
      r.includes("camel") && (t = hi(t)),
      r.includes("passive") && (a.passive = !0),
      r.includes("capture") && (a.capture = !0),
      r.includes("window") && (i = window),
      r.includes("document") && (i = document),
      r.includes("prevent") &&
        (o = s(o, (u, c) => {
          c.preventDefault(), u(c);
        })),
      r.includes("stop") &&
        (o = s(o, (u, c) => {
          c.stopPropagation(), u(c);
        })),
      r.includes("self") &&
        (o = s(o, (u, c) => {
          c.target === e && u(c);
        })),
      (r.includes("away") || r.includes("outside")) &&
        ((i = document),
        (o = s(o, (u, c) => {
          e.contains(c.target) ||
            (c.target.isConnected !== !1 &&
              ((e.offsetWidth < 1 && e.offsetHeight < 1) ||
                (e._x_isShown !== !1 && u(c))));
        }))),
      r.includes("once") &&
        (o = s(o, (u, c) => {
          u(c), i.removeEventListener(t, o, a);
        })),
      (o = s(o, (u, c) => {
        (vi(t) && yi(c, r)) || u(c);
      })),
      r.includes("debounce"))
    ) {
      let u = r[r.indexOf("debounce") + 1] || "invalid-wait",
        c = He(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
      o = Jt(o, c);
    }
    if (r.includes("throttle")) {
      let u = r[r.indexOf("throttle") + 1] || "invalid-wait",
        c = He(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
      o = Xt(o, c);
    }
    return (
      i.addEventListener(t, o, a),
      () => {
        i.removeEventListener(t, o, a);
      }
    );
  }

  function _i(e) {
    return e.replace(/-/g, ".");
  }

  function hi(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
  }

  function He(e) {
    return !Array.isArray(e) && !isNaN(e);
  }

  function gi(e) {
    return e
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[_\s]/, "-")
      .toLowerCase();
  }

  function vi(e) {
    return ["keydown", "keyup"].includes(e);
  }

  function yi(e, t) {
    let r = t.filter(
      (o) => !["window", "document", "prevent", "stop", "once"].includes(o)
    );
    if (r.includes("debounce")) {
      let o = r.indexOf("debounce");
      r.splice(o, He((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (r.length === 0 || (r.length === 1 && dt(e.key).includes(r[0])))
      return !1;
    let i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) =>
      r.includes(o)
    );
    return (
      (r = r.filter((o) => !i.includes(o))),
      !(
        i.length > 0 &&
        i.filter(
          (a) => ((a === "cmd" || a === "super") && (a = "meta"), e[`${a}Key`])
        ).length === i.length &&
        dt(e.key).includes(r[0])
      )
    );
  }

  function dt(e) {
    if (!e) return [];
    e = gi(e);
    let t = {
      ctrl: "control",
      slash: "/",
      space: "-",
      spacebar: "-",
      cmd: "meta",
      esc: "escape",
      up: "arrow-up",
      down: "arrow-down",
      left: "arrow-left",
      right: "arrow-right",
      period: ".",
      equal: "=",
    };
    return (
      (t[e] = e),
      Object.keys(t)
        .map((r) => {
          if (t[r] === e) return r;
        })
        .filter((r) => r)
    );
  }
  g(
    "model",
    (e, { modifiers: t, expression: r }, { effect: n, cleanup: i }) => {
      let o = m(e, r),
        a = `${r} = rightSideOfExpression($event, ${r})`,
        s = m(e, a);
      var u =
        e.tagName.toLowerCase() === "select" ||
        ["checkbox", "radio"].includes(e.type) ||
        t.includes("lazy")
          ? "change"
          : "input";
      let c = xi(e, t, r),
        l = Mr(e, u, t, (h) => {
          s(() => {}, {
            scope: {
              $event: h,
              rightSideOfExpression: c,
            },
          });
        });
      e._x_removeModelListeners || (e._x_removeModelListeners = {}),
        (e._x_removeModelListeners.default = l),
        i(() => e._x_removeModelListeners.default());
      let d = m(e, `${r} = __placeholder`);
      (e._x_model = {
        get() {
          let h;
          return o((S) => (h = S)), h;
        },
        set(h) {
          d(() => {}, {
            scope: {
              __placeholder: h,
            },
          });
        },
      }),
        (e._x_forceModelUpdate = () => {
          o((h) => {
            h === void 0 && r.match(/\./) && (h = ""),
              (window.fromModel = !0),
              y(() => Yt(e, "value", h)),
              delete window.fromModel;
          });
        }),
        n(() => {
          (t.includes("unintrusive") && document.activeElement.isSameNode(e)) ||
            e._x_forceModelUpdate();
        });
    }
  );

  function xi(e, t, r) {
    return (
      e.type === "radio" &&
        y(() => {
          e.hasAttribute("name") || e.setAttribute("name", r);
        }),
      (n, i) =>
        y(() => {
          if (n instanceof CustomEvent && n.detail !== void 0)
            return n.detail || n.target.value;
          if (e.type === "checkbox")
            if (Array.isArray(i)) {
              let o = t.includes("number")
                ? Oe(n.target.value)
                : n.target.value;
              return n.target.checked
                ? i.concat([o])
                : i.filter((a) => !mi(a, o));
            } else return n.target.checked;
          else {
            if (e.tagName.toLowerCase() === "select" && e.multiple)
              return t.includes("number")
                ? Array.from(n.target.selectedOptions).map((o) => {
                    let a = o.value || o.text;
                    return Oe(a);
                  })
                : Array.from(n.target.selectedOptions).map(
                    (o) => o.value || o.text
                  );
            {
              let o = n.target.value;
              return t.includes("number")
                ? Oe(o)
                : t.includes("trim")
                ? o.trim()
                : o;
            }
          }
        })
    );
  }

  function Oe(e) {
    let t = e ? parseFloat(e) : null;
    return bi(t) ? t : e;
  }

  function mi(e, t) {
    return e == t;
  }

  function bi(e) {
    return !Array.isArray(e) && !isNaN(e);
  }
  g("cloak", (e) =>
    queueMicrotask(() => y(() => e.removeAttribute(B("cloak"))))
  );
  zt(() => `[${B("init")}]`);
  g(
    "init",
    fe((e, { expression: t }, { evaluate: r }) =>
      typeof t == "string" ? !!t.trim() && r(t, {}, !1) : r(t, {}, !1)
    )
  );
  g("text", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
    let i = n(t);
    r(() => {
      i((o) => {
        y(() => {
          e.textContent = o;
        });
      });
    });
  });
  g("html", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
    let i = n(t);
    r(() => {
      i((o) => {
        y(() => {
          (e.innerHTML = o),
            (e._x_ignoreSelf = !0),
            C(e),
            delete e._x_ignoreSelf;
        });
      });
    });
  });
  Ge(It(":", Lt(B("bind:"))));
  g(
    "bind",
    (
      e,
      { value: t, modifiers: r, expression: n, original: i },
      { effect: o }
    ) => {
      if (!t) return wi(e, n, i, o);
      if (t === "key") return Ei(e, n);
      let a = m(e, n);
      o(() =>
        a((s) => {
          s === void 0 && n.match(/\./) && (s = ""), y(() => Yt(e, t, s, r));
        })
      );
    }
  );

  function wi(e, t, r, n) {
    let i = {};
    Rn(i);
    let o = m(e, t),
      a = [];
    for (; a.length; ) a.pop()();
    o(
      (s) => {
        let u = Object.entries(s).map(([l, d]) => ({
            name: l,
            value: d,
          })),
          c = Zr(u);
        (u = u.map((l) =>
          c.find((d) => d.name === l.name)
            ? {
                name: `x-bind:${l.name}`,
                value: `"${l.value}"`,
              }
            : l
        )),
          Ye(e, u, r).map((l) => {
            a.push(l.runCleanups), l();
          });
      },
      {
        scope: i,
      }
    );
  }

  function Ei(e, t) {
    e._x_keyExpression = t;
  }
  qt(() => `[${B("data")}]`);
  g(
    "data",
    fe((e, { expression: t }, { cleanup: r }) => {
      t = t === "" ? "{}" : t;
      let n = {},
        i = Pe(n, e).cleanup,
        o = {};
      $n(o, n);
      let a = j(e, t, {
        scope: o,
      });
      a === void 0 && (a = {});
      let s = Pe(a, e).cleanup,
        u = k(a);
      St(u);
      let c = J(e, u);
      u.init && j(e, u.init),
        r(() => {
          c(), i(), s(), u.destroy && j(e, u.destroy), c();
        });
    })
  );
  g("show", (e, { modifiers: t, expression: r }, { effect: n }) => {
    let i = m(e, r);
    e._x_doHide ||
      (e._x_doHide = () => {
        y(() => (e.style.display = "none"));
      }),
      e._x_doShow ||
        (e._x_doShow = () => {
          y(() => {
            e.style.length === 1 && e.style.display === "none"
              ? e.removeAttribute("style")
              : e.style.removeProperty("display");
          });
        });
    let o = () => {
        e._x_doHide(), (e._x_isShown = !1);
      },
      a = () => {
        e._x_doShow(), (e._x_isShown = !0);
      },
      s = () => setTimeout(a),
      u = je(
        (d) => (d ? a() : o()),
        (d) => {
          typeof e._x_toggleAndCascadeWithTransitions == "function"
            ? e._x_toggleAndCascadeWithTransitions(e, d, a, o)
            : d
            ? s()
            : o();
        }
      ),
      c,
      l = !0;
    n(() =>
      i((d) => {
        (!l && d === c) ||
          (t.includes("immediate") && (d ? s() : o()), u(d), (c = d), (l = !1));
      })
    );
  });
  g("for", (e, { expression: t }, { effect: r, cleanup: n }) => {
    let i = Si(t),
      o = m(e, i.items),
      a = m(e, e._x_keyExpression || "index");
    (e._x_prevKeys = []),
      (e._x_lookup = {}),
      r(() => Ai(e, i, o, a)),
      n(() => {
        Object.values(e._x_lookup).forEach((s) => s.remove()),
          delete e._x_prevKeys,
          delete e._x_lookup;
      });
  });

  function Ai(e, t, r, n) {
    let i = (a) => typeof a == "object" && !Array.isArray(a),
      o = e;
    r((a) => {
      Oi(a) && a >= 0 && (a = Array.from(Array(a).keys(), (f) => f + 1)),
        a === void 0 && (a = []);
      let s = e._x_lookup,
        u = e._x_prevKeys,
        c = [],
        l = [];
      if (i(a))
        a = Object.entries(a).map(([f, p]) => {
          let v = pt(t, p, f, a);
          n((x) => l.push(x), {
            scope: {
              index: f,
              ...v,
            },
          }),
            c.push(v);
        });
      else
        for (let f = 0; f < a.length; f++) {
          let p = pt(t, a[f], f, a);
          n((v) => l.push(v), {
            scope: {
              index: f,
              ...p,
            },
          }),
            c.push(p);
        }
      let d = [],
        h = [],
        S = [],
        L = [];
      for (let f = 0; f < u.length; f++) {
        let p = u[f];
        l.indexOf(p) === -1 && S.push(p);
      }
      u = u.filter((f) => !S.includes(f));
      let Q = "template";
      for (let f = 0; f < l.length; f++) {
        let p = l[f],
          v = u.indexOf(p);
        if (v === -1) u.splice(f, 0, p), d.push([Q, f]);
        else if (v !== f) {
          let x = u.splice(f, 1)[0],
            b = u.splice(v - 1, 1)[0];
          u.splice(f, 0, b), u.splice(v, 0, x), h.push([x, b]);
        } else L.push(p);
        Q = p;
      }
      for (let f = 0; f < S.length; f++) {
        let p = S[f];
        s[p]._x_effects && s[p]._x_effects.forEach(_t),
          s[p].remove(),
          (s[p] = null),
          delete s[p];
      }
      for (let f = 0; f < h.length; f++) {
        let [p, v] = h[f],
          x = s[p],
          b = s[v],
          N = document.createElement("div");
        y(() => {
          b.after(N),
            x.after(b),
            b._x_currentIfEl && b.after(b._x_currentIfEl),
            N.before(x),
            x._x_currentIfEl && x.after(x._x_currentIfEl),
            N.remove();
        }),
          ut(b, c[l.indexOf(v)]);
      }
      for (let f = 0; f < d.length; f++) {
        let [p, v] = d[f],
          x = p === "template" ? o : s[p];
        x._x_currentIfEl && (x = x._x_currentIfEl);
        let b = c[v],
          N = l[v],
          ee = document.importNode(o.content, !0).firstElementChild;
        J(ee, k(b), o),
          y(() => {
            x.after(ee), C(ee);
          }),
          typeof N == "object" &&
            K(
              "x-for key cannot be an object, it must be a string or an integer",
              o
            ),
          (s[N] = ee);
      }
      for (let f = 0; f < L.length; f++) ut(s[L[f]], c[l.indexOf(L[f])]);
      o._x_prevKeys = l;
    });
  }

  function Si(e) {
    let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
      r = /^\s*\(|\)\s*$/g,
      n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
      i = e.match(n);
    if (!i) return;
    let o = {};
    o.items = i[2].trim();
    let a = i[1].replace(r, "").trim(),
      s = a.match(t);
    return (
      s
        ? ((o.item = a.replace(t, "").trim()),
          (o.index = s[1].trim()),
          s[2] && (o.collection = s[2].trim()))
        : (o.item = a),
      o
    );
  }

  function pt(e, t, r, n) {
    let i = {};
    return (
      /^\[.*\]$/.test(e.item) && Array.isArray(t)
        ? e.item
            .replace("[", "")
            .replace("]", "")
            .split(",")
            .map((a) => a.trim())
            .forEach((a, s) => {
              i[a] = t[s];
            })
        : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object"
        ? e.item
            .replace("{", "")
            .replace("}", "")
            .split(",")
            .map((a) => a.trim())
            .forEach((a) => {
              i[a] = t[a];
            })
        : (i[e.item] = t),
      e.index && (i[e.index] = r),
      e.collection && (i[e.collection] = n),
      i
    );
  }

  function Oi(e) {
    return !Array.isArray(e) && !isNaN(e);
  }

  function Tr() {}
  Tr.inline = (e, { expression: t }, { cleanup: r }) => {
    let n = ue(e);
    n._x_refs || (n._x_refs = {}),
      (n._x_refs[t] = e),
      r(() => delete n._x_refs[t]);
  };
  g("ref", Tr);
  g("if", (e, { expression: t }, { effect: r, cleanup: n }) => {
    let i = m(e, t),
      o = () => {
        if (e._x_currentIfEl) return e._x_currentIfEl;
        let s = e.content.cloneNode(!0).firstElementChild;
        return (
          J(s, {}, e),
          y(() => {
            e.after(s), C(s);
          }),
          (e._x_currentIfEl = s),
          (e._x_undoIf = () => {
            I(s, (u) => {
              u._x_effects && u._x_effects.forEach(_t);
            }),
              s.remove(),
              delete e._x_currentIfEl;
          }),
          s
        );
      },
      a = () => {
        !e._x_undoIf || (e._x_undoIf(), delete e._x_undoIf);
      };
    r(() =>
      i((s) => {
        s ? o() : a();
      })
    ),
      n(() => e._x_undoIf && e._x_undoIf());
  });
  g("id", (e, { expression: t }, { evaluate: r }) => {
    r(t).forEach((i) => pi(e, i));
  });
  Ge(It("@", Lt(B("on:"))));
  g(
    "on",
    fe((e, { value: t, modifiers: r, expression: n }, { cleanup: i }) => {
      let o = n ? m(e, n) : () => {};
      e.tagName.toLowerCase() === "template" &&
        (e._x_forwardEvents || (e._x_forwardEvents = []),
        e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
      let a = Mr(e, t, r, (s) => {
        o(() => {}, {
          scope: {
            $event: s,
          },
          params: [s],
        });
      });
      i(() => a());
    })
  );
  we("Collapse", "collapse", "collapse");
  we("Intersect", "intersect", "intersect");
  we("Focus", "trap", "focus");
  we("Mask", "mask", "mask");

  function we(e, t, r) {
    g(t, (n) =>
      K(
        `You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`,
        n
      )
    );
  }
  Z.setEvaluator(Tt);
  Z.setReactivityEngine({
    reactive: ot,
    effect: Hn,
    release: qn,
    raw: _,
  });
  var Ci = Z,
    at = Ci;
  var Rr = {
    api_key: "c5e765ed4c29c7e9aec5f19ad8c1667b",
    app_id: "04ALMXMGLU",
    index: "link4",
  };
  (function () {
    let e = Rr;
    at.data("searchController", () => Ri(e)), at.start();
  })();

  function Ri(e) {
    return {
      query: "",
      result: {
        hits: [],
      },
      init: function () {
        return this.$nextTick(() => {
          this.$watch("query", () => {
            this.search();
          });
        });
      },
      search: function () {
        var t = {
          requests: [
            {
              indexName: e.index,
              facets: ["genre"],
              params: `query=${encodeURIComponent(this.query)}`,
            },
          ],
        };
        let n = `${`https://${e.app_id}-dsn.algolia.net`}/1/indexes/*/queries`;
        fetch(n, {
          method: "POST",
          headers: {
            "X-Algolia-Application-Id": e.app_id,
            "X-Algolia-API-Key": e.api_key,
          },
          body: JSON.stringify(t),
        })
          .then((i) => i.json())
          .then((i) => {
            if (i.results) {
              this.result = i.results[0];
              let o = this.result.facets.genre;
              this.result.genre = o
                ? Object.keys(o).map((a) => ({
                    k: a,
                    v: o[a],
                  }))
                : [];
            }
          });
      },
    };
  }
})();
