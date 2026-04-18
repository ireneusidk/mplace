import "./ClL9a_Zs.js";
import {
  p as b,
  f as c,
  t as f,
  b as A,
  c as m,
  d as v,
  s as y,
  r as _,
} from "./iK5FT0Sa.js";
import { i as h } from "./6Mc7KQD2.js";
import { d as w, a as r, s as x } from "./Cw1VVyw7.js";
import { p as E, r as T } from "./ClBgBzqC.js";
(function () {
  try {
    var e =
      typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : typeof globalThis < "u"
        ? globalThis
        : typeof self < "u"
        ? self
        : {};
    e.SENTRY_RELEASE = { id: "0fdca126ca32380ac4e95a0011d2b66881dfb9e6" };
  } catch {}
})();
try {
  (function () {
    var e =
        typeof window < "u"
          ? window
          : typeof global < "u"
          ? global
          : typeof globalThis < "u"
          ? globalThis
          : typeof self < "u"
          ? self
          : {},
      t = new e.Error().stack;
    t &&
      ((e._sentryDebugIds = e._sentryDebugIds || {}),
      (e._sentryDebugIds[t] = "5060eff3-df12-495e-bdd2-4e362ec484ae"),
      (e._sentryDebugIdIdentifier =
        "sentry-dbid-5060eff3-df12-495e-bdd2-4e362ec484ae"));
  })();
} catch {}
const S =
  "data:image/png;image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAYUExURfiyd/ndO/9/J/aqCeRcGujUX9ukYwAAAJE7zrAAAAAIdFJOU/////////8A3oO9WQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIDUuMS4xMhMBR3QAAAC4ZVhJZklJKgAIAAAABQAaAQUAAQAAAEoAAAAbAQUAAQAAAFIAAAAoAQMAAQAAAAIAAAAxAQIAEQAAAFoAAABphwQAAQAAAGwAAAAAAAAAYAAAAAEAAABgAAAAAQAAAFBhaW50Lk5FVCA1LjEuMTIAAAMAAJAHAAQAAAAwMjMwAaADAAEAAAABAAAABaAEAAEAAACWAAAAAAAAAAIAAQACAAQAAABSOTgAAgAHAAQAAAAwMTAwAAAAANmnmpXJtwtfAAAAcUlEQVQoU2XNCQ6AMAhEUSha7n9j50NbYyTa5YUplr/aZO6+zrW5jxDFiE3cLhlLk8SDa/2buoVvFJHZdIWJTDtJQAzd1UCbxIsqRErDXmIgIquJpmd4qYhiYteCom4i0iXCJMegbPlQ5pxznQ69lfkAuNwF+ua6tQoAAAAASUVORK5CYII=";
var B = c("<span>mplace</span>"),
  L = c('<div><img alt=""/> <!></div>');
function z(e, t) {
  b(t, !0);
  let a = E(t, "size", 3, "default"),
    p = T(t, ["$$slots", "$$events", "$$legacy", "hasText", "size"]);
  var s = L();
  w(s, () => ({ ...p, class: `flex items-center gap-1.5 ${t.class ?? ""}` }));
  var l = v(s);
  let o;
  var g = y(l, 2);
  {
    var u = (i) => {
      var d = B();
      let n;
      f(
        () =>
          (n = r(d, 1, "text-base-content font-pixel", null, n, {
            "text-4xl": a() === "default",
            "text-5xl": a() === "lg" || a() === "medium",
          }))
      ),
        A(i, d);
    };
    h(g, (i) => {
      t.hasText && i(u);
    });
  }
  _(s),
    f(() => {
      (o = r(l, 1, "pixelated", null, o, {
        "size-10": a() === "default",
        "size-16": a() === "medium",
        "size-20": a() === "lg",
      })),
        x(l, "src", S);
    }),
    A(e, s),
    m();
}
export { z as L };
