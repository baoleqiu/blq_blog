import { ref as w, computed as p, watch as T, onMounted as q, onBeforeUnmount as ue, watchEffect as ee, onUnmounted as se, defineComponent as ce, useTemplateRef as te, shallowRef as de, createElementBlock as j, openBlock as _, Fragment as ve, createBlock as ne, createCommentVNode as O, createElementVNode as Q, Teleport as oe, normalizeStyle as ie, unref as ae, mergeProps as me, toHandlers as pe, toDisplayString as fe } from "vue";
function H(t, o, e) {
  return t.addEventListener(o, e, { passive: !0 }), () => t.removeEventListener(o, e);
}
function le(t, o) {
  const e = o[0] - t[0], i = o[1] - t[1];
  return Math.hypot(e, i);
}
function he(t) {
  let o = 0;
  if (t) {
    let i = t;
    for (; i && i !== document.body; ) {
      const l = window.getComputedStyle(i).zIndex;
      if (l !== "auto" && l !== "") {
        const s = Number.parseInt(l, 10);
        Number.isNaN(s) || (o = Math.max(o, s));
      }
      i = i.parentElement;
    }
  }
  const e = document.querySelectorAll("*");
  for (const i of e) {
    const l = window.getComputedStyle(i).zIndex;
    if (l !== "auto" && l !== "") {
      const s = Number.parseInt(l, 10);
      Number.isNaN(s) || (o = Math.max(o, s));
    }
  }
  return Math.max(o + 1, 9999);
}
function we(t) {
  if (!t)
    return !1;
  let o = t;
  for (; o && o !== document.body; ) {
    const e = window.getComputedStyle(o), i = o.classList;
    if (e.position === "fixed" || i.contains("el-dialog") || i.contains("ant-modal") || i.contains("modal") || i.contains("dialog") || o.hasAttribute("role") && (o.getAttribute("role") === "dialog" || o.getAttribute("role") === "modal"))
      return !0;
    o = o.parentElement;
  }
  return !1;
}
function V(t) {
  typeof t > "u" || typeof t.preventDefault != "function" || t.preventDefault();
}
function ge(t, o) {
  Object.assign(t.style, o);
}
function ye(t) {
  const { imgRef: o, props: e } = t, i = w(e.previewZIndex), l = w(!1), s = p(() => e.autoZIndex ? i.value : e.previewZIndex), v = () => {
    if (!(!e.autoZIndex || !o.value))
      if (l.value = we(o.value), l.value) {
        const b = he(o.value);
        i.value = Math.max(b, e.previewZIndex);
      } else
        i.value = e.previewZIndex;
  };
  return T(o, () => {
    v();
  }, { immediate: !0 }), T(() => [e.autoZIndex, e.previewZIndex], () => {
    v();
  }), {
    finalZIndex: s,
    isInModal: l,
    updateZIndex: v
  };
}
function be(t, o = {}) {
  const e = w(null);
  let i = [], l = null, s = null, v = 0;
  const b = () => {
    if (!t.value)
      return;
    const m = t.value.getBoundingClientRect();
    e.value = m, o.onChange?.(m);
  }, d = () => {
    v && cancelAnimationFrame(v), v = requestAnimationFrame(b);
  }, x = (m) => {
    const r = getComputedStyle(m), y = r.overflowX, I = r.overflowY, Z = r.overflow, f = (z) => z === "auto" || z === "scroll" || z === "overlay";
    return f(y) || f(I) || f(Z);
  }, c = (m) => {
    const r = [];
    if (!m)
      return r;
    let y = m.parentElement;
    for (; y; )
      x(y) && r.push(y), y = y.parentElement;
    return r.push(window), r;
  }, g = () => {
    for (const m of i) m();
    i = [], l?.disconnect(), l = null, s?.disconnect(), s = null, v && (cancelAnimationFrame(v), v = 0);
  }, E = () => {
    if (g(), !t.value)
      return;
    const m = c(t.value);
    for (const r of m)
      i.push(H(r, "scroll", d));
    if (i.push(H(window, "resize", d)), window.visualViewport) {
      const r = window.visualViewport;
      i.push(H(r, "resize", d)), i.push(H(r, "scroll", d));
    }
    if (l = new ResizeObserver(d), l.observe(t.value), s = new ResizeObserver(d), s.observe(document.documentElement), t.value.tagName === "IMG") {
      const r = t.value;
      r.complete || i.push(H(r, "load", b));
    }
    b();
  };
  return q(E), ue(g), T(t, E), {
    rect: e
  };
}
function xe(t) {
  const { handleWheel: o, handleTouchStart: e, handleKeyDown: i } = t;
  function l(s) {
    if (!(typeof window > "u"))
      switch (s) {
        case "on":
          window.addEventListener("wheel", V, { passive: !1 }), window.addEventListener("touchmove", V, { passive: !1 }), window.addEventListener("wheel", o), window.addEventListener("touchstart", e), window.addEventListener("keydown", i);
          break;
        case "off":
          window.removeEventListener("wheel", V), window.removeEventListener("touchmove", V), window.removeEventListener("wheel", o), window.removeEventListener("touchstart", e), window.removeEventListener("keydown", i);
          break;
      }
  }
  return {
    toggleEventListener: l
  };
}
function Ee(t, o) {
  const { zoomStep: e, zoomMax: i, zoomMin: l, dblClickZoomTo: s, zoomFactorRad: v } = o, b = w(!1), d = w(0), x = w(0), c = w(1);
  let g = 0, E = 0, m = 0, r = 0, y = 0;
  ee(() => {
    t.value && (t.value.style.cursor = b.value ? "grabbing" : "grab");
  });
  const I = p(() => {
    const a = `calc(-50% + ${d.value}px)`, u = `calc(-50% + ${x.value}px)`;
    return `translate(${a}, ${u}) scale(${c.value})`;
  }), Z = () => {
    t.value && ge(t.value, { transform: I.value });
  }, f = (a, u, h) => {
    if (!t.value)
      return;
    const k = c.value, n = Math.max(l, Math.min(i, a));
    if (n === k)
      return;
    const S = t.value.getBoundingClientRect(), M = S.left + S.width / 2, Y = S.top + S.height / 2, A = n / k, J = (u - M) * (1 - A), re = (h - Y) * (1 - A);
    d.value += J, x.value += re, c.value = n, Z();
  }, z = ({
    delta: a = 0,
    setTo: u,
    clientX: h,
    clientY: k
  }) => {
    if (!t.value)
      return;
    const n = c.value, S = u !== void 0 ? u : n + a, M = t.value.getBoundingClientRect(), Y = M.left + M.width / 2, A = M.top + M.height / 2;
    f(S, h ?? Y, k ?? A);
  };
  let C, B = !1;
  const U = 150, R = (a) => {
    clearTimeout(C), C = setTimeout(() => {
      B = !1;
    }, U), (Math.abs(a.deltaY) % 1 !== 0 || Math.abs(a.deltaY) < 30) && (B = !0);
    const u = B ? a.deltaY < 0 ? e * v / 10 : -e * v / 10 : a.deltaY < 0 ? e * v : -e * v;
    z({ delta: u, clientX: a.clientX, clientY: a.clientY });
  }, X = () => {
    const a = c.value > 1 ? 1 : s;
    if (a === 1) {
      c.value = 1, Z();
      return;
    }
    z({ setTo: a });
  }, N = (a) => {
    if (t.value) {
      if (a.touches.length === 2) {
        const [u, h] = [a.touches[0], a.touches[1]], k = le(
          [u.pageX, u.pageY],
          [h.pageX, h.pageY]
        ), n = (u.pageX + h.pageX) / 2, S = (u.pageY + h.pageY) / 2, M = k / g, Y = c.value * M;
        z({ setTo: Y, clientX: n, clientY: S }), g = k;
      } else if (a.touches.length === 1) {
        const u = a.touches[0], h = u.pageX - E, k = u.pageY - m;
        d.value = r + h, x.value = y + k, Z();
      }
    }
  }, P = () => {
    document.removeEventListener("touchmove", N), document.removeEventListener("touchend", P);
  }, W = (a) => {
    if (t.value) {
      if (a.touches.length === 2) {
        const [u, h] = [a.touches[0], a.touches[1]];
        g = le(
          [u.pageX, u.pageY],
          [h.pageX, h.pageY]
        );
      } else if (a.touches.length === 1) {
        const u = a.touches[0];
        E = u.pageX, m = u.pageY, r = d.value, y = x.value;
      }
      document.addEventListener("touchmove", N), document.addEventListener("touchend", P);
    }
  }, $ = (a) => {
    if (!t.value)
      return;
    const u = a.clientX - E, h = a.clientY - m;
    d.value = r + u, x.value = y + h, Z();
  }, D = () => {
    b.value = !1, document.removeEventListener("mousemove", $), document.removeEventListener("mouseup", D);
  }, K = (a) => {
    t.value && (b.value = !0, E = a.clientX, m = a.clientY, r = d.value, y = x.value, document.addEventListener("mousemove", $), document.addEventListener("mouseup", D));
  }, G = () => {
    d.value = 0, x.value = 0, c.value = 1;
  }, F = () => {
    document.removeEventListener("wheel", R), document.removeEventListener("touchstart", W), document.removeEventListener("touchmove", N), document.removeEventListener("touchend", P), document.removeEventListener("mousemove", $), document.removeEventListener("mouseup", D);
  };
  return se(F), {
    handleWheel: R,
    handleTouchStart: W,
    handleDblclick: X,
    handleMouseDown: K,
    initTransformer: G,
    cleanupListeners: F
  };
}
function Ie() {
  const t = w(typeof window < "u" ? window.innerWidth : 0), o = w(typeof window < "u" ? window.innerHeight : 0), e = w(typeof window < "u" ? window.scrollX : 0), i = w(typeof window < "u" ? window.scrollY : 0), l = () => {
    typeof window > "u" || (t.value = window.innerWidth, o.value = window.innerHeight);
  }, s = () => {
    typeof window > "u" || (e.value = window.scrollX || window.pageXOffset, i.value = window.scrollY || window.pageYOffset);
  };
  return q(() => {
    l(), s(), window.addEventListener("resize", l, { passive: !0 }), window.addEventListener("scroll", s, { passive: !0 });
  }), se(() => {
    typeof window > "u" || (window.removeEventListener("resize", l), window.removeEventListener("scroll", s));
  }), {
    width: t,
    height: o,
    scrollX: e,
    scrollY: i
  };
}
const L = {
  duration: 500,
  maskBgColor: "black",
  maskOpacity: 0.1,
  previewZIndex: 9999,
  autoZIndex: !0,
  previewMaxWidth: "80vw",
  previewMaxHeight: "80vh",
  zoomStep: 0.2,
  zoomMin: 0.2,
  zoomMax: 10,
  dblClickZoom: !0,
  dblClickZoomTo: 2,
  zoomFactorRad: 1
}, Le = {
  displaying: { type: Boolean, default: void 0 },
  applyingPreviewStyles: { type: Boolean, default: void 0 },
  isAnimating: { type: Boolean, default: void 0 },
  src: { type: String, required: !0 },
  alt: String,
  width: [String, Number],
  height: [String, Number],
  duration: { type: Number, default: L.duration },
  maskBgColor: { type: String, default: L.maskBgColor },
  maskOpacity: { type: Number, default: L.maskOpacity },
  previewZIndex: { type: Number, default: L.previewZIndex },
  autoZIndex: { type: Boolean, default: L.autoZIndex },
  previewMaxWidth: {
    type: [String, Number],
    default: L.previewMaxWidth
  },
  previewMaxHeight: {
    type: [String, Number],
    default: L.previewMaxHeight
  },
  zoomStep: { type: Number, default: L.zoomStep },
  zoomMin: { type: Number, default: L.zoomMin },
  zoomMax: { type: Number, default: L.zoomMax },
  dblClickZoom: { type: Boolean, default: L.dblClickZoom },
  dblClickZoomTo: {
    type: Number,
    default: L.dblClickZoomTo
  },
  zoomFactorRad: {
    type: Number,
    default: L.zoomFactorRad
  }
}, Se = {
  "update:displaying": (t) => !0,
  "update:applyingPreviewStyles": (t) => !0,
  "update:isAnimating": (t) => !0,
  displayChange: (t) => !0,
  previewStylesChange: (t) => !0,
  animatingChange: (t) => !0
}, ke = ["src"], Me = { style: { display: "flex", "flex-direction": "column", "align-items": "center", gap: "0.5rem" } }, Ze = ["src", "alt"], ze = {
  key: 0,
  style: { "font-size": "0.8rem", color: "#666" }
}, Ye = /* @__PURE__ */ ce({
  name: "HanaImgViewer",
  __name: "HanaImgViewer",
  props: Le,
  emits: Se,
  setup(t, { emit: o }) {
    const e = t, i = o, l = w(!1);
    q(() => l.value = !0);
    const s = te("imgRef"), v = te("previewerRef"), b = w(!1), d = w(!1), x = w(!1), c = p({
      get: () => e.displaying !== void 0 ? e.displaying : b.value,
      set: (n) => {
        e.displaying !== void 0 ? i("update:displaying", n) : b.value = n, i("displayChange", n);
      }
    }), g = p({
      get: () => e.applyingPreviewStyles !== void 0 ? e.applyingPreviewStyles : d.value,
      set: (n) => {
        e.applyingPreviewStyles !== void 0 ? i("update:applyingPreviewStyles", n) : d.value = n, i("previewStylesChange", n);
      }
    }), E = p({
      get: () => e.isAnimating !== void 0 ? e.isAnimating : x.value,
      set: (n) => {
        e.isAnimating !== void 0 ? i("update:isAnimating", n) : x.value = n, i("animatingChange", n);
      }
    });
    T(() => e.displaying, (n) => {
      n !== void 0 && n !== b.value && (b.value = n);
    }), T(() => e.applyingPreviewStyles, (n) => {
      n !== void 0 && n !== d.value && (d.value = n);
    }), T(() => e.isAnimating, (n) => {
      n !== void 0 && n !== x.value && (x.value = n);
    });
    function m() {
      E.value = !0, setTimeout(() => {
        E.value = !1;
      }, e.duration);
    }
    const r = p(() => ({
      width: (typeof e.width == "number" ? `${e.width}px` : e.width) ?? "fit-content",
      height: (typeof e.height == "number" ? `${e.height}px` : e.height) ?? "fit-content",
      visibility: c.value ? "hidden" : "visible"
    }));
    function y() {
      E.value || (m(), c.value ? (g.value = !1, setTimeout(() => {
        c.value = !1;
      }, e.duration)) : c.value = !0);
    }
    const I = de(null);
    q(() => I.value = Ee(v, e)), ue(() => I.value?.cleanupListeners());
    const Z = w({}), { rect: f } = be(s, {
      throttle: !0,
      throttleDelay: 100
    }), { finalZIndex: z } = ye({
      imgRef: s,
      props: e
    }), C = p(() => f.value ? f.value.width / f.value.height : 0), { width: B, height: U, scrollY: R } = Ie(), X = p(() => B.value / U.value), N = p(() => `${e.duration}ms`), P = p(
      () => f.value && C.value > X.value ? `${f.value.width}px` : "auto"
    ), W = p(
      () => f.value ? C.value > X.value ? "auto" : `${f.value.height}px` : "auto"
    ), $ = p(() => f.value ? `${f.value.top}px` : "0px"), D = p(() => f.value ? `${f.value.left}px` : "0px"), K = p(
      () => C.value > X.value ? `${e.previewMaxWidth}` : "auto"
    ), G = p(
      () => C.value > X.value ? "auto" : `${e.previewMaxHeight}`
    ), F = p(() => `calc(50vh + ${R.value}px)`);
    function a(n) {
      n.key === "Escape" && c.value && y();
    }
    const u = w({
      toggleEventListener: (n) => {
      }
    });
    ee(() => {
      I.value && (u.value = xe({
        handleWheel: I.value.handleWheel,
        handleTouchStart: I.value.handleTouchStart,
        handleKeyDown: a
      }));
    });
    const h = p(() => ({
      opacity: g.value ? e.maskOpacity : 0
    })), k = p(() => ({
      transition: E.value ? `all ${N.value}` : "none",
      width: g.value ? K.value : P.value,
      height: g.value ? G.value : W.value,
      top: g.value ? F.value : $.value,
      left: g.value ? "50%" : D.value,
      transform: g.value ? "translate(-50%, -50%)" : "none"
    }));
    return ee(() => {
      I.value?.initTransformer(), c.value ? (typeof document < "u" && (document.body.style.overflow = "hidden"), requestAnimationFrame(() => {
        g.value = !0;
      })) : typeof document < "u" && (document.body.style.overflow = "auto");
    }), T([c, E], ([n, S], [M, Y]) => {
      if (!I.value)
        return;
      const A = n && !S && M && Y && g.value, J = n && S && M && !Y;
      A && (Z.value = {
        dblclick: I.value.handleDblclick,
        mousedown: I.value.handleMouseDown
      }, u.value.toggleEventListener("on")), J && (u.value.toggleEventListener("off"), Z.value = {});
    }), (n, S) => (_(), j(ve, null, [
      l.value ? (_(), ne(oe, {
        key: 0,
        to: "body"
      }, [
        c.value ? (_(), j("div", {
          key: 0,
          style: ie({
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: n.maskBgColor,
            zIndex: ae(z) - 1,
            transition: `all ${N.value}`,
            opacity: h.value.opacity
          }),
          onClick: y
        }, null, 4)) : O("", !0)
      ])) : O("", !0),
      l.value ? (_(), ne(oe, {
        key: 1,
        to: "body"
      }, [
        c.value ? (_(), j("img", me({
          key: 0,
          ref_key: "previewerRef",
          ref: v,
          src: n.src,
          draggable: "false",
          style: {
            position: "absolute",
            objectFit: "cover",
            cursor: "grab",
            zIndex: ae(z),
            ...k.value
          }
        }, pe(Z.value, !0)), null, 16, ke)) : O("", !0)
      ])) : O("", !0),
      Q("div", Me, [
        Q("div", {
          style: ie(r.value)
        }, [
          Q("img", {
            ref_key: "imgRef",
            ref: s,
            src: n.src,
            alt: n.alt,
            style: { width: "100%", height: "100%", "object-fit": "cover", cursor: "pointer" },
            onClick: y
          }, null, 8, Ze)
        ], 4),
        n.alt ? (_(), j("span", ze, fe(n.alt), 1)) : O("", !0)
      ])
    ], 64));
  }
}), Ce = [Ye];
function Te(t) {
  Ce.forEach((o) => {
    t.component(o.name || "HanaImgViewer", o);
  });
}
const Ne = { install: Te };
export {
  Ye as HanaImgViewer,
  Ne as default,
  L as defaultImgViewerProps,
  Se as imgViewerEmitsObj,
  Le as imgViewerPropsObj
};
