'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _deck = require('deck.gl');

var _luma = require('luma.gl');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var glslify = require('glslify');

var ATTRIBUTES = {
  instancePositions: { size: 3, '0': 'x', '1': 'y', '2': 'unused' },
  instanceColors: { size: 3, '0': 'red', '1': 'green', '2': 'blue' }
};

function makeTextureFromSolidColor(gl, _ref) {
  var _ref2 = _slicedToArray(_ref, 4);

  var _ref2$ = _ref2[0];
  var r = _ref2$ === undefined ? 1 : _ref2$;
  var _ref2$2 = _ref2[1];
  var g = _ref2$2 === undefined ? 0 : _ref2$2;
  var _ref2$3 = _ref2[2];
  var b = _ref2$3 === undefined ? 0 : _ref2$3;
  var _ref2$4 = _ref2[3];
  var a = _ref2$4 === undefined ? 1 : _ref2$4;

  return new _luma.Texture2D(gl, {
    pixels: new Uint8Array([1, 0, 0, 1]),
    width: 1,
    height: 1,
    format: gl.RGBA,
    magFilter: gl.NEAREST,
    minFilter: gl.NEAREST
  });
}

//console.log( Array.from(Array(150).keys()).map((v) => '/src/resources/icons/' + v + '.png') )

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

      (0, _luma.loadTextures)(gl, {
        //urls: Array.from(Array(1).keys()).map((v) => '/src/resources/icons/' + (v+1) + '.png.gif')
        urls: ['/src/resources/icons/10.png.gif']
        //urls: Array.from(Array(1).keys()).map((v) => '/src/resources/moon.gif')
      }).then(function (textures) {

        console.log(textures[0]);
        this.setUniforms({ uSampler: textures[0] });
      }.bind(this));

      attributeManager.addInstanced(ATTRIBUTES, {
        instancePositions: { update: this.calculateInstancePositions },
        instanceColors: { update: this.calculateInstanceColors }
      });
    }
  }, {
    key: 'willReceiveProps',
    value: function willReceiveProps(oldProps, newProps) {
      _get(PogoMapIconLayer.prototype.__proto__ || Object.getPrototypeOf(PogoMapIconLayer.prototype), 'willReceiveProps', this).call(this, oldProps, newProps);
    }
  }, {
    key: 'getModel',
    value: function getModel(gl) {

      return new _luma.Model({
        program: new _luma.Program(gl, {
          vs: '#define GLSLIFY 1\n#define SHADER_NAME pogo-mapicon-layer-vertex\n\nhighp float random(vec2 co) {\n  highp float a = 12.9898;\n  highp float b = 78.233;\n  highp float c = 43758.5453;\n  highp float dt= dot(co.xy ,vec2(a,b));\n  highp float sn= mod(dt,3.14);\n  return fract(sin(sn) / c) - .5;\n}\n\nconst float TILE_SIZE_1604150559 = 512.0;\nconst float PI = 3.1415926536;\nconst float WORLD_SCALE_1604150559 = TILE_SIZE_1604150559 / (PI * 2.0);\n\n// non-linear projection: lnglats => zoom 0 tile [0-512, 0-512] * scale\nvec2 mercatorProject(vec2 lnglat, float zoomScale) {\n  float scale = WORLD_SCALE_1604150559 * zoomScale;\n  return vec2(\n  \tscale * (radians(lnglat.x) + PI),\n  \tscale * (PI - log(tan(PI * 0.25 + radians(lnglat.y) * 0.5)))\n  );\n}\n\nuniform float mercatorScale;\n\nattribute vec3 positions;\nattribute vec2 texCoords;\nattribute vec3 instancePositions;\nattribute vec3 instanceColors;\nattribute vec3 instancePickingColors;\n\nuniform float opacity;\n\nuniform mat4 worldMatrix;\nuniform mat4 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void) {\n vec2 pos = mercatorProject(instancePositions.xy, mercatorScale);\n // For some reason, need to add one to elevation to show up in untilted mode\n\n vec3 p = vec3(pos, instancePositions.z + 1.) + positions * 100.0;\n gl_Position = projectionMatrix * vec4(p, 1.0);\n gl_Position = projectionMatrix * vec4(positions * 100.0, 1.0)\n\n vColor = vec4(instanceColors / 255.0, 1.);\n vTextureCoord = texCoords;\n\n //\n // vec3 p = vec3(positions.xy, positions.z + 1.) * 100.0;\n // gl_Position = projectionMatrix * vec4(positions, 1.0);\n // vTexCoord = texCoords;\n // vColor = vec4(instanceColors / 255.0, 1.);\n //\n //\n}\n',
          fs: '#define SHADER_NAME pogo-mapicon-layer-fragment\n\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n\nvarying vec4 vColor;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void) {\n  //gl_FragColor = vec4(1., 0., 0., 1.);\n\n  gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n\n  //gl_FragColor = vec4(texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).rgb, 1.0); \n\n}\n',
          id: 'pogo-mapicon'
        }),

        geometry: new _luma.Geometry({
          positions: new Float32Array([-1.0, -1.0, 1.0, -1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0]),

          texCoords: new Float32Array([0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0]),
          indices: new Uint16Array([0, 1, 3, 3, 2, 0])
        }),
        uniforms: {
          uSampler: makeTextureFromSolidColor(gl, [1.0, 0.3, 0.3, 1.0])
        },

        isInstanced: true
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
  }]);

  return PogoMapIconLayer;
}(_deck.Layer);

exports.default = PogoMapIconLayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvcG9nby1tYXBpY29uLWxheWVyL3BvZ28tbWFwaWNvbi1sYXllci5qcyJdLCJuYW1lcyI6WyJnbHNsaWZ5IiwicmVxdWlyZSIsIkFUVFJJQlVURVMiLCJpbnN0YW5jZVBvc2l0aW9ucyIsInNpemUiLCJpbnN0YW5jZUNvbG9ycyIsIm1ha2VUZXh0dXJlRnJvbVNvbGlkQ29sb3IiLCJnbCIsInIiLCJnIiwiYiIsImEiLCJwaXhlbHMiLCJVaW50OEFycmF5Iiwid2lkdGgiLCJoZWlnaHQiLCJmb3JtYXQiLCJSR0JBIiwibWFnRmlsdGVyIiwiTkVBUkVTVCIsIm1pbkZpbHRlciIsIlBvZ29NYXBJY29uTGF5ZXIiLCJwcm9wcyIsInN0YXRlIiwiYXR0cmlidXRlTWFuYWdlciIsInNldFN0YXRlIiwibW9kZWwiLCJnZXRNb2RlbCIsInVybHMiLCJ0aGVuIiwidGV4dHVyZXMiLCJjb25zb2xlIiwibG9nIiwic2V0VW5pZm9ybXMiLCJ1U2FtcGxlciIsImJpbmQiLCJhZGRJbnN0YW5jZWQiLCJ1cGRhdGUiLCJjYWxjdWxhdGVJbnN0YW5jZVBvc2l0aW9ucyIsImNhbGN1bGF0ZUluc3RhbmNlQ29sb3JzIiwib2xkUHJvcHMiLCJuZXdQcm9wcyIsInByb2dyYW0iLCJ2cyIsImZzIiwiaWQiLCJnZW9tZXRyeSIsInBvc2l0aW9ucyIsIkZsb2F0MzJBcnJheSIsInRleENvb3JkcyIsImluZGljZXMiLCJVaW50MTZBcnJheSIsInVuaWZvcm1zIiwiaXNJbnN0YW5jZWQiLCJhdHRyaWJ1dGUiLCJkYXRhIiwidmFsdWUiLCJpIiwicG9pbnQiLCJwb3NpdGlvbiIsIngiLCJ5IiwieiIsImNvbG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0FBQ0EsSUFBTUEsVUFBVUMsUUFBUSxTQUFSLENBQWhCOztBQUVBLElBQU1DLGFBQWE7QUFDakJDLHFCQUFtQixFQUFDQyxNQUFNLENBQVAsRUFBVSxLQUFLLEdB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QkYsSUFBcEIsbUlBQTBCO0FBQUEsY0FBZkcsS0FBZTs7QUFDeEJGLGdCQUFNQyxJQUFJLENBQVYsSUFBZUMsTUFBTUssS0FBTixDQUFZLENBQVosQ0FBZjtBQUNBUCxnQkFBTUMsSUFBSSxDQUFWLElBQWVDLE1BQU1LLEtBQU4sQ0FBWSxDQUFaLENBQWY7QUFDQVAsZ0JBQU1DLElBQUksQ0FBVixJQUFlQyxNQUFNSyxLQUFOLENBQVksQ0FBWixDQUFmO0FBQ0FOLGVBQUtyRCxJQUFMO0FBQ0Q7QUFUZ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVsQzs7Ozs7O2tCQXhHa0JpQixnQiIsImZpbGUiOiJwb2dvLW1hcGljb24tbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xheWVyfSBmcm9tICdkZWNrLmdsJztcbmltcG9ydCB7TW9kZWwsIFByb2dyYW0sIEdlb21ldHJ5LCBsb2FkVGV4dHVyZXMsIFRleHR1cmUyRH0gZnJvbSAnbHVtYS5nbCc7XG5jb25zdCBnbHNsaWZ5ID0gcmVxdWlyZSgnZ2xzbGlmeScpO1xuXG5jb25zdCBBVFRSSUJVVEVTID0ge1xuICBpbnN0YW5jZVBvc2l0aW9uczoge3NpemU6IDMsICcwJzogJ3gnLCAnMSc6ICd5JywgJzInOiAndW51c2VkJ30sXG4gIGluc3RhbmNlQ29sb3JzOiB7c2l6ZTogMywgJzAnOiAncmVkJywgJzEnOiAnZ3JlZW4nLCAnMic6ICdibHVlJ31cbn07XG5cbmZ1bmN0aW9uIG1ha2VUZXh0dXJlRnJvbVNvbGlkQ29sb3IoZ2wsIFtyID0gMSwgZyA9IDAsIGIgPSAwLCBhID0gMV0pIHtcbiAgcmV0dXJuIG5ldyBUZXh0dXJlMkQoZ2wsIHtcbiAgICBwaXhlbHM6IG5ldyBVaW50OEFycmF5KFsxLCAwLCAwLCAxXSksXG4gICAgd2lkdGg6IDEsXG4gICAgaGVpZ2h0OiAxLFxuICAgIGZvcm1hdDogZ2wuUkdCQSxcbiAgICBtYWdGaWx0ZXI6IGdsLk5FQVJFU1QsXG4gICAgbWluRmlsdGVyOiBnbC5ORUFSRVNUXG4gIH0pO1xufVxuXG5cblxuLy9jb25zb2xlLmxvZyggQXJyYXkuZnJvbShBcnJheSgxNTApLmtleXMoKSkubWFwKCh2KSA9PiAnL3NyYy9yZXNvdXJjZXMvaWNvbnMvJyArIHYgKyAnLnBuZycpIClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvZ29NYXBJY29uTGF5ZXIgZXh0ZW5kcyBMYXllciB7XG5cbiAgc3RhdGljIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBBVFRSSUJVVEVTO1xuICB9XG5cbiAgLypcbiAgICogQGNsYXNzZGVzY1xuICAgKiBTY2F0dGVycGxvdExheWVyXG4gICAqXG4gICAqIEBjbGFzc1xuICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcHNcbiAgICogQHBhcmFtIHtudW1iZXJ9IHByb3BzLnJhZGl1cyAtIHBvaW50IHJhZGl1c1xuICAgKi9cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBpbml0aWFsaXplU3RhdGUoKSB7XG4gICAgY29uc3Qge2dsfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge2F0dHJpYnV0ZU1hbmFnZXJ9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbW9kZWw6IHRoaXMuZ2V0TW9kZWwoZ2wpXG4gICAgfSk7XG5cblxuICAgbG9hZFRleHR1cmVzKGdsLCB7XG4gICAgIC8vdXJsczogQXJyYXkuZnJvbShBcnJheSgxKS5rZXlzKCkpLm1hcCgodikgPT4gJy9zcmMvcmVzb3VyY2VzL2ljb25zLycgKyAodisxKSArICcucG5nLmdpZicpXG4gICAgIHVybHM6IFsnL3NyYy9yZXNvdXJjZXMvaWNvbnMvMTAucG5nLmdpZiddXG4gICAgIC8vdXJsczogQXJyYXkuZnJvbShBcnJheSgxKS5rZXlzKCkpLm1hcCgodikgPT4gJy9zcmMvcmVzb3VyY2VzL21vb24uZ2lmJylcbiAgIH0pLnRoZW4oZnVuY3Rpb24odGV4dHVyZXMpe1xuXG4gICAgIGNvbnNvbGUubG9nKHRleHR1cmVzWzBdKTtcbiAgICAgdGhpcy5zZXRVbmlmb3Jtcyh7dVNhbXBsZXI6IHRleHR1cmVzWzBdfSk7XG5cbiAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICBhdHRyaWJ1dGVNYW5hZ2VyLmFkZEluc3RhbmNlZChBVFRSSUJVVEVTLCB7XG4gICAgICBpbnN0YW5jZVBvc2l0aW9uczoge3VwZGF0ZTogdGhpcy5jYWxjdWxhdGVJbnN0YW5jZVBvc2l0aW9uc30sXG4gICAgICBpbnN0YW5jZUNvbG9yczoge3VwZGF0ZTogdGhpcy5jYWxjdWxhdGVJbnN0YW5jZUNvbG9yc31cbiAgICB9KTtcbiAgfVxuXG4gIHdpbGxSZWNlaXZlUHJvcHMob2xkUHJvcHMsIG5ld1Byb3BzKSB7XG4gICAgc3VwZXIud2lsbFJlY2VpdmVQcm9wcyhvbGRQcm9wcywgbmV3UHJvcHMpO1xuICB9XG5cbiAgZ2V0TW9kZWwoZ2wpIHtcblxuICAgIHJldHVybiBuZXcgTW9kZWwoe1xuICAgICAgcHJvZ3JhbTogbmV3IFByb2dyYW0oZ2wsIHtcbiAgICAgICAgdnM6IGdsc2xpZnkoJy4vcG9nby1tYXBpY29uLWxheWVyLXZlcnRleC5nbHNsJyksXG4gICAgICAgIGZzOiBnbHNsaWZ5KCcuL3BvZ28tbWFwaWNvbi1sYXllci1mcmFnbWVudC5nbHNsJyksXG4gICAgICAgIGlkOiAncG9nby1tYXBpY29uJ1xuICAgICAgfSksXG5cbiAgICAgIGdlb21ldHJ5OiBuZXcgR2VvbWV0cnkoe1xuICAgICAgICBwb3NpdGlvbnM6ICBuZXcgRmxvYXQzMkFycmF5KFxuICAgICAgICAgIFstMS4wLCAtMS4wLCAxLjAsXG4gICAgICAgICAgIC0xLjAsIDEuMCwgMS4wLFxuICAgICAgICAgICAxLjAsIC0xLjAsIDEuMCxcbiAgICAgICAgICAgMS4wLCAxLjAsIDEuMFxuICAgICAgICAgIF0pLFxuXG4gICAgICAgIHRleENvb3JkczogbmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAgICAgMC4wLCAwLjAsXG4gICAgICAgICAgMC4wLCAxLjAsXG4gICAgICAgICAgMS4wLCAxLjAsXG4gICAgICAgICAgMS4wLCAwLjBcbiAgICAgICAgXSksXG4gICAgICAgIGluZGljZXM6IG5ldyBVaW50MTZBcnJheShbMCwgMSwgMywgMywgMiwgMF0pXG4gICAgICB9KSxcbiAgICAgIHVuaWZvcm1zOiB7XG4gICAgICAgIHVTYW1wbGVyOiBtYWtlVGV4dHVyZUZyb21Tb2xpZENvbG9yKGdsLCBbMS4wLCAwLjMsIDAuMywgMS4wXSlcbiAgICAgIH0sXG5cbiAgICAgIGlzSW5zdGFuY2VkOiB0cnVlXG4gICAgfSk7XG5cbiAgfVxuXG4gIGNhbGN1bGF0ZUluc3RhbmNlUG9zaXRpb25zKGF0dHJpYnV0ZSkge1xuICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge3ZhbHVlLCBzaXplfSA9IGF0dHJpYnV0ZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yIChjb25zdCBwb2ludCBvZiBkYXRhKSB7XG4gICAgICB2YWx1ZVtpICsgMF0gPSBwb2ludC5wb3NpdGlvbi54O1xuICAgICAgdmFsdWVbaSArIDFdID0gcG9pbnQucG9zaXRpb24ueTtcbiAgICAgIHZhbHVlW2kgKyAyXSA9IHBvaW50LnBvc2l0aW9uLno7XG4gICAgICBpICs9IHNpemU7XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsYXRlSW5zdGFuY2VDb2xvcnMoYXR0cmlidXRlKSB7XG4gICAgY29uc3Qge2RhdGF9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7dmFsdWUsIHNpemV9ID0gYXR0cmlidXRlO1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IHBvaW50IG9mIGRhdGEpIHtcbiAgICAgIHZhbHVlW2kgKyAwXSA9IHBvaW50LmNvbG9yWzBdO1xuICAgICAgdmFsdWVbaSArIDFdID0gcG9pbnQuY29sb3JbMV07XG4gICAgICB2YWx1ZVtpICsgMl0gPSBwb2ludC5jb2xvclsyXTtcbiAgICAgIGkgKz0gc2l6ZTtcbiAgICB9XG4gIH1cblxufVxuIl19