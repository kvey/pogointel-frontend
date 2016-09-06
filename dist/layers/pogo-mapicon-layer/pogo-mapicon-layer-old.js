'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deck = require('deck.gl');

var _luma = require('luma.gl');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var glslify = require('glslify');

var ATTRIBUTES = {
  instancePositions: { size: 3, '0': 'x', '1': 'y', '2': 'unused' },
  instanceColors: { size: 3, '0': 'red', '1': 'green', '2': 'blue' }
};

var PogoMapIconLayer = function (_Layer) {
  _inherits(PogoMapIconLayer, _Layer);

  _createClass(PogoMapIconLayer, null, [{
    key: 'attributes',
    get: function get() {
      return ATTRIBUTES;
    }

    /*
     * @classdesc
     * ScatterplotLayer
     *
     * @class
     * @param {object} props
     * @param {number} props.radius - point radius
     */

  }]);

  function PogoMapIconLayer(props) {
    _classCallCheck(this, PogoMapIconLayer);

    return _possibleConstructorReturn(this, (PogoMapIconLayer.__proto__ || Object.getPrototypeOf(PogoMapIconLayer)).call(this, props));
  }

  _createClass(PogoMapIconLayer, [{
    key: 'initializeState',
    value: function initializeState() {
      var gl = this.state.gl;
      var attributeManager = this.state.attributeManager;


      this.setState({
        model: this.getModel(gl)
      });

      attributeManager.addInstanced(ATTRIBUTES, {
        instancePositions: { update: this.calculateInstancePositions },
        instanceColors: { update: this.calculateInstanceColors }
      });
    }
  }, {
    key: 'didMount',
    value: function didMount() {
      this.updateUniforms();
    }
  }, {
    key: 'willReceiveProps',
    value: function willReceiveProps(oldProps, newProps) {
      _get(PogoMapIconLayer.prototype.__proto__ || Object.getPrototypeOf(PogoMapIconLayer.prototype), 'willReceiveProps', this).call(this, oldProps, newProps);
      this.updateUniforms();
    }
  }, {
    key: 'getModel',
    value: function getModel(gl) {
      var NUM_SEGMENTS = 16;
      var PI2 = Math.PI * 2;

      var positions = [];
      for (var i = 0; i < NUM_SEGMENTS; i++) {
        positions = [].concat(_toConsumableArray(positions), [Math.cos(PI2 * i / NUM_SEGMENTS), Math.sin(PI2 * i / NUM_SEGMENTS), 0]);
      }

      return new _luma.Model({
        program: new _luma.Program(gl, {
          vs: '#define GLSLIFY 1\n#define SHADER_NAME pogo-mapicon-layer-vertex\n\nhighp float random(vec2 co) {\n  highp float a = 12.9898;\n  highp float b = 78.233;\n  highp float c = 43758.5453;\n  highp float dt= dot(co.xy ,vec2(a,b));\n  highp float sn= mod(dt,3.14);\n  return fract(sin(sn) / c) - .5;\n}\n\nconst float TILE_SIZE_1604150559 = 512.0;\nconst float PI = 3.1415926536;\nconst float WORLD_SCALE_1604150559 = TILE_SIZE_1604150559 / (PI * 2.0);\n\n// non-linear projection: lnglats => zoom 0 tile [0-512, 0-512] * scale\nvec2 mercatorProject(vec2 lnglat, float zoomScale) {\n  float scale = WORLD_SCALE_1604150559 * zoomScale;\n  return vec2(\n  \tscale * (radians(lnglat.x) + PI),\n  \tscale * (PI - log(tan(PI * 0.25 + radians(lnglat.y) * 0.5)))\n  );\n}\n\nuniform float mercatorScale;\n\nattribute vec3 positions;\nattribute vec2 texCoords;\nattribute vec3 instancePositions;\nattribute vec3 instanceColors;\nattribute vec3 instancePickingColors;\n\nuniform float opacity;\n\nuniform mat4 worldMatrix;\nuniform mat4 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void) {\n vec2 pos = mercatorProject(instancePositions.xy, mercatorScale);\n // For some reason, need to add one to elevation to show up in untilted mode\n\n vec3 p = vec3(pos, instancePositions.z + 1.) + positions * 100.0;\n gl_Position = projectionMatrix * vec4(p, 1.0);\n gl_Position = projectionMatrix * vec4(positions * 100.0, 1.0)\n\n vColor = vec4(instanceColors / 255.0, 1.);\n vTextureCoord = texCoords;\n\n //\n // vec3 p = vec3(positions.xy, positions.z + 1.) * 100.0;\n // gl_Position = projectionMatrix * vec4(positions, 1.0);\n // vTexCoord = texCoords;\n // vColor = vec4(instanceColors / 255.0, 1.);\n //\n //\n}\n',
          fs: '#define SHADER_NAME pogo-mapicon-layer-fragment\n\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n\nvarying vec4 vColor;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void) {\n  //gl_FragColor = vec4(1., 0., 0., 1.);\n\n  gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n\n  //gl_FragColor = vec4(texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).rgb, 1.0); \n\n}\n',
          id: 'pogo-mapicon'
        }),
        geometry: new _luma.Geometry({
          drawMode: 'TRIANGLE_FAN',
          positions: new Float32Array(positions)
        }),
        isInstanced: true
      });
    }
  }, {
    key: 'updateUniforms',
    value: function updateUniforms() {
      this.calculateRadius();
      var radius = this.state.radius;

      this.setUniforms({
        radius: radius
      });
    }
  }, {
    key: 'calculateInstancePositions',
    value: function calculateInstancePositions(attribute) {
      var data = this.props.data;
      var value = attribute.value;
      var size = attribute.size;

      var i = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var point = _step.value;

          value[i + 0] = point.position.x;
          value[i + 1] = point.position.y;
          value[i + 2] = point.position.z;
          i += size;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'calculateInstanceColors',
    value: function calculateInstanceColors(attribute) {
      var data = this.props.data;
      var value = attribute.value;
      var size = attribute.size;

      var i = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var point = _step2.value;

          value[i + 0] = point.color[0];
          value[i + 1] = point.color[1];
          value[i + 2] = point.color[2];
          i += size;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'calculateRadius',
    value: function calculateRadius() {
      // use radius if specified
      if (this.props.radius) {
        this.state.radius = this.props.radius;
        return;
      }

      var pixel0 = this.project({ lon: -122, lat: 37.5 });
      var pixel1 = this.project({ lon: -122, lat: 37.5002 });

      var dx = pixel0.x - pixel1.x;
      var dy = pixel0.y - pixel1.y;

      this.state.radius = Math.max(Math.sqrt(dx * dx + dy * dy), 2.0);
    }
  }]);

  return PogoMapIconLayer;
}(_deck.Layer);

exports.default = PogoMapIconLayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvcG9nby1tYXBpY29uLWxheWVyL3BvZ28tbWFwaWNvbi1sYXllci1vbGQuanMiXSwibmFtZXMiOlsiZ2xzbGlmeSIsInJlcXVpcmUiLCJBVFRSSUJVVEVTIiwiaW5zdGFuY2VQb3NpdGlvbnMiLCJzaXplIiwiaW5zdGFuY2VDb2xvcnMiLCJQb2dvTWFwSWNvbkxheWVyIiwicHJvcHMiLCJnbCIsInN0YXRlIiwiYXR0cmlidXRlTWFuYWdlciIsInNldFN0YXRlIiwibW9kZWwiLCJnZXRNb2RlbCIsImFkZEluc3RhbmNlZCIsInVwZGF0ZSIsImNhbGN1bGF0ZUluc3RhbmNlUG9zaXRpb25zIiwiY2FsY3VsYXRlSW5zdGFuY2VDb2xvcnMiLCJ1cGRhdGVVbmlmb3JtcyIsIm9sZFByb3BzIiwibmV3UHJvcHMiLCJOVU1fU0VHTUVOVFMiLCJQSTIiLCJNYXRoIiwiUEkiLCJwb3NpdGlvbnMiLCJpIiwiY29zIiwic2luIiwicHJvZ3JhbSIsInZzIiwiZnMiLCJpZCIsImdlb21ldHJ5IiwiZHJhd01vZGUiLCJGbG9hdDMyQXJyYXkiLCJpc0luc3RhbmNlZCIsImNhbGN1bGF0ZVJhZGl1cyIsInJhZGl1cyIsInNldFVuaWZvcm1zIiwiYXR0cmlidXRlIiwiZGF0YSIsInZhbHVlIiwicG9pbnQiLCJwb3NpdGlvbiIsIngiLCJ5IiwieiIsImNvbG9yIiwicGl4ZWwwIiwicHJvamVjdCIsImxvbiIsImxhdCIsInBpeGVsMSIsImR4IiwiZHkiLCJtYXgiLCJzcXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7O0FBQ0EsSUFBTUEsVUFBVUMsUUFBUSxTQUFSLENBQWhCOztBQUVBLElBQU1DLGFBQWE7QUFDakJDLHFCQUFtQixFQUFDQyxNQUFNLENBQVAsRUFBVSxLQUFLLEdBQWYsRUFBb0IsS0FBSyxHQUF6QixFQUE4QixLQUFLLFFBQW5DLEVBREY7QUFFakJDLGtCQUFnQixFQUFDRCxNQUFNLENBQVAs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QVVILEtBQUtBLEVBQUwsR0FBVUMsS0FBS0EsRUFBekIsQ0FBVCxFQUF1QyxHQUF2QyxDQUFwQjtBQUNEOzs7Ozs7a0JBbkhrQmpELGdCIiwiZmlsZSI6InBvZ28tbWFwaWNvbi1sYXllci1vbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xheWVyfSBmcm9tICdkZWNrLmdsJztcbmltcG9ydCB7TW9kZWwsIFByb2dyYW0sIEdlb21ldHJ5fSBmcm9tICdsdW1hLmdsJztcbmNvbnN0IGdsc2xpZnkgPSByZXF1aXJlKCdnbHNsaWZ5Jyk7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSB7XG4gIGluc3RhbmNlUG9zaXRpb25zOiB7c2l6ZTogMywgJzAnOiAneCcsICcxJzogJ3knLCAnMic6ICd1bnVzZWQnfSxcbiAgaW5zdGFuY2VDb2xvcnM6IHtzaXplOiAzLCAnMCc6ICdyZWQnLCAnMSc6ICdncmVlbicsICcyJzogJ2JsdWUnfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9nb01hcEljb25MYXllciBleHRlbmRzIExheWVyIHtcblxuICBzdGF0aWMgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIEFUVFJJQlVURVM7XG4gIH1cblxuICAvKlxuICAgKiBAY2xhc3NkZXNjXG4gICAqIFNjYXR0ZXJwbG90TGF5ZXJcbiAgICpcbiAgICogQGNsYXNzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wc1xuICAgKiBAcGFyYW0ge251bWJlcn0gcHJvcHMucmFkaXVzIC0gcG9pbnQgcmFkaXVzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIGluaXRpYWxpemVTdGF0ZSgpIHtcbiAgICBjb25zdCB7Z2x9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7YXR0cmlidXRlTWFuYWdlcn0gPSB0aGlzLnN0YXRlO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb2RlbDogdGhpcy5nZXRNb2RlbChnbClcbiAgICB9KTtcblxuICAgIGF0dHJpYnV0ZU1hbmFnZXIuYWRkSW5zdGFuY2VkKEFUVFJJQlVURVMsIHtcbiAgICAgIGluc3RhbmNlUG9zaXRpb25zOiB7dXBkYXRlOiB0aGlzLmNhbGN1bGF0ZUluc3RhbmNlUG9zaXRpb25zfSxcbiAgICAgIGluc3RhbmNlQ29sb3JzOiB7dXBkYXRlOiB0aGlzLmNhbGN1bGF0ZUluc3RhbmNlQ29sb3JzfVxuICAgIH0pO1xuICB9XG5cbiAgZGlkTW91bnQoKSB7XG4gICAgdGhpcy51cGRhdGVVbmlmb3JtcygpO1xuICB9XG5cbiAgd2lsbFJlY2VpdmVQcm9wcyhvbGRQcm9wcywgbmV3UHJvcHMpIHtcbiAgICBzdXBlci53aWxsUmVjZWl2ZVByb3BzKG9sZFByb3BzLCBuZXdQcm9wcyk7XG4gICAgdGhpcy51cGRhdGVVbmlmb3JtcygpO1xuICB9XG5cbiAgZ2V0TW9kZWwoZ2wpIHtcbiAgICBjb25zdCBOVU1fU0VHTUVOVFMgPSAxNjtcbiAgICBjb25zdCBQSTIgPSBNYXRoLlBJICogMjtcblxuICAgIGxldCBwb3NpdGlvbnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5VTV9TRUdNRU5UUzsgaSsrKSB7XG4gICAgICBwb3NpdGlvbnMgPSBbXG4gICAgICAgIC4uLnBvc2l0aW9ucyxcbiAgICAgICAgTWF0aC5jb3MoUEkyICogaSAvIE5VTV9TRUdNRU5UUyksXG4gICAgICAgIE1hdGguc2luKFBJMiAqIGkgLyBOVU1fU0VHTUVOVFMpLFxuICAgICAgICAwXG4gICAgICBdO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgTW9kZWwoe1xuICAgICAgcHJvZ3JhbTogbmV3IFByb2dyYW0oZ2wsIHtcbiAgICAgICAgdnM6IGdsc2xpZnkoJy4vcG9nby1tYXBpY29uLWxheWVyLXZlcnRleC5nbHNsJyksXG4gICAgICAgIGZzOiBnbHNsaWZ5KCcuL3BvZ28tbWFwaWNvbi1sYXllci1mcmFnbWVudC5nbHNsJyksXG4gICAgICAgIGlkOiAncG9nby1tYXBpY29uJ1xuICAgICAgfSksXG4gICAgICBnZW9tZXRyeTogbmV3IEdlb21ldHJ5KHtcbiAgICAgICAgZHJhd01vZGU6ICdUUklBTkdMRV9GQU4nLFxuICAgICAgICBwb3NpdGlvbnM6IG5ldyBGbG9hdDMyQXJyYXkocG9zaXRpb25zKVxuICAgICAgfSksXG4gICAgICBpc0luc3RhbmNlZDogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlVW5pZm9ybXMoKSB7XG4gICAgdGhpcy5jYWxjdWxhdGVSYWRpdXMoKTtcbiAgICBjb25zdCB7cmFkaXVzfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZXRVbmlmb3Jtcyh7XG4gICAgICByYWRpdXNcbiAgICB9KTtcbiAgfVxuXG4gIGNhbGN1bGF0ZUluc3RhbmNlUG9zaXRpb25zKGF0dHJpYnV0ZSkge1xuICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge3ZhbHVlLCBzaXplfSA9IGF0dHJpYnV0ZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yIChjb25zdCBwb2ludCBvZiBkYXRhKSB7XG4gICAgICB2YWx1ZVtpICsgMF0gPSBwb2ludC5wb3NpdGlvbi54O1xuICAgICAgdmFsdWVbaSArIDFdID0gcG9pbnQucG9zaXRpb24ueTtcbiAgICAgIHZhbHVlW2kgKyAyXSA9IHBvaW50LnBvc2l0aW9uLno7XG4gICAgICBpICs9IHNpemU7XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsYXRlSW5zdGFuY2VDb2xvcnMoYXR0cmlidXRlKSB7XG4gICAgY29uc3Qge2RhdGF9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7dmFsdWUsIHNpemV9ID0gYXR0cmlidXRlO1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IHBvaW50IG9mIGRhdGEpIHtcbiAgICAgIHZhbHVlW2kgKyAwXSA9IHBvaW50LmNvbG9yWzBdO1xuICAgICAgdmFsdWVbaSArIDFdID0gcG9pbnQuY29sb3JbMV07XG4gICAgICB2YWx1ZVtpICsgMl0gPSBwb2ludC5jb2xvclsyXTtcbiAgICAgIGkgKz0gc2l6ZTtcbiAgICB9XG4gIH1cblxuICBjYWxjdWxhdGVSYWRpdXMoKSB7XG4gICAgLy8gdXNlIHJhZGl1cyBpZiBzcGVjaWZpZWRcbiAgICBpZiAodGhpcy5wcm9wcy5yYWRpdXMpIHtcbiAgICAgIHRoaXMuc3RhdGUucmFkaXVzID0gdGhpcy5wcm9wcy5yYWRpdXM7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGl4ZWwwID0gdGhpcy5wcm9qZWN0KHtsb246IC0xMjIsIGxhdDogMzcuNX0pO1xuICAgIGNvbnN0IHBpeGVsMSA9IHRoaXMucHJvamVjdCh7bG9uOiAtMTIyLCBsYXQ6IDM3LjUwMDJ9KTtcblxuICAgIGNvbnN0IGR4ID0gcGl4ZWwwLnggLSBwaXhlbDEueDtcbiAgICBjb25zdCBkeSA9IHBpeGVsMC55IC0gcGl4ZWwxLnk7XG5cbiAgICB0aGlzLnN0YXRlLnJhZGl1cyA9IE1hdGgubWF4KE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSksIDIuMCk7XG4gIH1cblxufVxuIl19