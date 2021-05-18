// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"blotter/rollingDistortMaterial.js":[function(require,module,exports) {
(function (Blotter) {
  Blotter.RollingDistortMaterial = function () {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.RollingDistortMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.RollingDistortMaterial.prototype, function () {
    function _mainImageSrc() {
      var mainImageSrc = [Blotter.Assets.Shaders.PI, Blotter.Assets.Shaders.LineMath, Blotter.Assets.Shaders.Noise, "// Fix a floating point number to two decimal places", "float toFixedTwo(float f) {", "    return float(int(f * 100.0)) / 100.0;", "}", "// Via: http://www.iquilezles.org/www/articles/functions/functions.htm", "float impulse(float k, float x) {", "    float h = k * x;", "    return h * exp(1.0 - h);", "}", "vec2 waveOffset(vec2 fragCoord, float sineDistortSpread, float sineDistortCycleCount, float sineDistortAmplitude, float noiseDistortVolatility, float noiseDistortAmplitude, vec2 distortPosition, float deg, float speed) {", "    // Setup", "    // -------------------------------", "    deg = toFixedTwo(deg);", "    float centerDistance = 0.5;", "    vec2 centerUv = vec2(centerDistance);", "    vec2 centerCoord = uResolution.xy * centerUv;", "    float changeOverTime = uGlobalTime * speed;", "    float slope = normalizedSlope(slopeForDegrees(deg), uResolution.xy);", "    float perpendicularDeg = mod(deg + 90.0, 360.0); // Offset angle by 90.0, but keep it from exceeding 360.0", "    float perpendicularSlope = normalizedSlope(slopeForDegrees(perpendicularDeg), uResolution.xy);", "    // Find intersects for line with edges of viewport", "    // -------------------------------", "    vec2 edgeIntersectA = vec2(0.0);", "    vec2 edgeIntersectB = vec2(0.0);", "    intersectsOnRectForLine(edgeIntersectA, edgeIntersectB, vec2(0.0), uResolution.xy, centerCoord, slope);", "    float crossSectionLength = distance(edgeIntersectA, edgeIntersectB);", "    // Find the threshold for degrees at which our intersectsOnRectForLine function would flip", "    //   intersects A and B because of the order in which it finds them. This is the angle at which", "    //   the y coordinate for the hypotenuse of a right triangle whose oposite adjacent edge runs from", "    //   vec2(0.0, centerCoord.y) to centerCoord and whose opposite edge runs from vec2(0.0, centerCoord.y) to", "    //   vec2(0.0, uResolution.y) exceeeds uResolution.y", "    float thresholdDegA = atan(centerCoord.y / centerCoord.x) * (180.0 / PI);", "    float thresholdDegB = mod(thresholdDegA + 180.0, 360.0);", "    vec2 edgeIntersect = vec2(0.0);", "    if (deg < thresholdDegA || deg > thresholdDegB) {", "        edgeIntersect = edgeIntersectA;", "    } else {", "        edgeIntersect = edgeIntersectB;", "    }", "    vec2 perpendicularIntersectA = vec2(0.0);", "    vec2 perpendicularIntersectB = vec2(0.0);", "    intersectsOnRectForLine(perpendicularIntersectA, perpendicularIntersectB, vec2(0.0), uResolution.xy, centerCoord, perpendicularSlope); ", "    float perpendicularLength = distance(perpendicularIntersectA, perpendicularIntersectA);", "    vec2 coordLineIntersect = vec2(0.0);", "    lineLineIntersection(coordLineIntersect, centerCoord, slope, fragCoord, perpendicularSlope);", "    // Define placement for distortion ", "    // -------------------------------", "    vec2 distortPositionIntersect = vec2(0.0);", "    lineLineIntersection(distortPositionIntersect, distortPosition * uResolution.xy, perpendicularSlope, edgeIntersect, slope);", "    float distortDistanceFromEdge = (distance(edgeIntersect, distortPositionIntersect) / crossSectionLength);// + sineDistortSpread;", "    float uvDistanceFromDistort = distance(edgeIntersect, coordLineIntersect) / crossSectionLength;", "    float noiseDistortVarianceAdjuster = uvDistanceFromDistort + changeOverTime;", "    uvDistanceFromDistort += -centerDistance + distortDistanceFromEdge + changeOverTime;", "    uvDistanceFromDistort = mod(uvDistanceFromDistort, 1.0); // For sine, keep distance between 0.0 and 1.0", "    // Define sine distortion ", "    // -------------------------------", "    float minThreshold = centerDistance - sineDistortSpread;", "    float maxThreshold = centerDistance + sineDistortSpread;", "    uvDistanceFromDistort = clamp(((uvDistanceFromDistort - minThreshold)/(maxThreshold - minThreshold)), 0.0, 1.0);", "    if (sineDistortSpread < 0.5) {", "        // Add smoother decay to sin distort when it isnt taking up the full viewport.", "        uvDistanceFromDistort = impulse(uvDistanceFromDistort, uvDistanceFromDistort);", "    }", "    float sineDistortion = sin(uvDistanceFromDistort * PI * sineDistortCycleCount) * sineDistortAmplitude;", "    // Define noise distortion ", "    // -------------------------------", "    float noiseDistortion = noise(noiseDistortVolatility * noiseDistortVarianceAdjuster) * noiseDistortAmplitude;", "    if (noiseDistortVolatility > 0.0) {", "        noiseDistortion -= noiseDistortAmplitude / 2.0; // Adjust primary distort so that it distorts in two directions.", "    }", "    noiseDistortion *= (sineDistortion > 0.0 ? 1.0 : -1.0); // Adjust primary distort to account for sin variance.", "    // Combine distortions to find UV offsets ", "    // -------------------------------", "    vec2 kV = offsetsForCoordAtDistanceOnSlope(sineDistortion + noiseDistortion, perpendicularSlope);", "    if (deg <= 0.0 || deg >= 180.0) {", "        kV *= -1.0;", "    }", "    return kV;", "}", "void mainImage( out vec4 mainImage, in vec2 fragCoord )", "{", "    // Setup", "    // -------------------------------", "    vec2 uv = fragCoord.xy / uResolution.xy;", "    // Minor hacks to ensure our waves start horizontal and animating in a downward direction by default.", "    uRotation = mod(uRotation + 270.0, 360.0);", "    uDistortPosition.y = 1.0 - uDistortPosition.y;", "    // Distortion", "    // -------------------------------", "    vec2 offset = waveOffset(fragCoord, uSineDistortSpread, uSineDistortCycleCount, uSineDistortAmplitude, uNoiseDistortVolatility, uNoiseDistortAmplitude, uDistortPosition, uRotation, uSpeed);", "    mainImage = textTexture(uv + offset);", "}"].join("\n");
      return mainImageSrc;
    }

    return {
      constructor: Blotter.RollingDistortMaterial,
      init: function init() {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
          uSineDistortSpread: {
            type: "1f",
            value: 0.05
          },
          uSineDistortCycleCount: {
            type: "1f",
            value: 2.0
          },
          uSineDistortAmplitude: {
            type: "1f",
            value: 0.25
          },
          uNoiseDistortVolatility: {
            type: "1f",
            value: 20.0
          },
          uNoiseDistortAmplitude: {
            type: "1f",
            value: 0.01
          },
          uDistortPosition: {
            type: "2f",
            value: [0.5, 0.5]
          },
          uRotation: {
            type: "1f",
            value: 170.0
          },
          uSpeed: {
            type: "1f",
            value: 0.08
          }
        };
      }
    };
  }());
})(this.Blotter);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58583" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","blotter/rollingDistortMaterial.js"], null)
//# sourceMappingURL=/rollingDistortMaterial.b80b465f.js.map