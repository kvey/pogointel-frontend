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
  instancePositions: { size: 4, '0': 'x', '1': 'y', '2': 'unused', '3': 'num' },
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
        urls: ['/src/resources/icons/tile_151x1.png']
      }).then(function (textures) {
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
      if (!oldProps.data.equals(newProps.data)) {
        this.updateAttributes(this.props);
        console.log("updated");
      }
    }
  }, {
    key: 'getModel',
    value: function getModel(gl) {
      var attributeManager = this.state.attributeManager;


      return new _luma.Model({
        isInstanced: true,
        program: new _luma.Program(gl, {
          vs: '#define SHADER_NAME pogo-mapicon-layer-vertex\n\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n\nconst float TILE_SIZE_1540259130 = 512.0;\nconst float PI = 3.1415926536;\nconst float WORLD_SCALE_1540259130 = TILE_SIZE_1540259130 / (PI * 2.0);\n\n// non-linear projection: lnglats => zoom 0 tile [0-512, 0-512] * scale\nvec2 mercatorProject(vec2 lnglat, float zoomScale) {\n  float scale = WORLD_SCALE_1540259130 * zoomScale;\n  return vec2(\n  \tscale * (radians(lnglat.x) + PI),\n  \tscale * (PI - log(tan(PI * 0.25 + radians(lnglat.y) * 0.5)))\n  );\n}\n\nuniform float mercatorScale;\n\nattribute vec3 positions;\nattribute vec2 tex_coords;\nattribute vec4 instancePositions;\nattribute vec3 instanceColors;\nattribute vec3 instancePickingColors;\n\nuniform float opacity;\nuniform float radius;\n\nuniform mat4 worldMatrix;\nuniform mat4 projectionMatrix;\n\nvarying vec4 vColor;\nvarying vec2 vTextureCoord1;\n\nvoid main(void) {\n  vColor = vec4(instanceColors / 255.0, 1.);\n\n  vec2 pos = mercatorProject(instancePositions.xy, mercatorScale);\n  vec3 p = vec3(pos, instancePositions.z) + (positions * 18.0);\n  vec3 pz = vec3(p.xy, p.z + 1.0);\n\n  gl_Position = projectionMatrix * vec4(pz, 1.0);\n\n  vTextureCoord1 = vec2(tex_coords.x + (instancePositions.w - 1.0) * (1.0/151.0), tex_coords.y);\n}\n',
          fs: '#define SHADER_NAME pogo-mapicon-layer-fragment\n\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n\nvarying vec2 vTextureCoord1;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void) {\n  //gl_FragColor = vec4(1., 1., 0., 1.);\n  //gl_FragColor = vColor;\n\n  gl_FragColor = texture2D(uSampler, vTextureCoord1);\n\n  //gl_FragColor = vec4(texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).rgb, 1.0); \n\n}\n',
          id: 'pogo-mapicon'
        }),
        geometry: new _luma.Geometry({
          positions: new Float32Array([1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0, -1.0, 1.0, 0.0]),
          tex_coords: {
            size: 2,
            value: new Float32Array([0.0, 0.0, 0.0, 1.0, 1.0 / 151, 1.0, 1.0 / 151, 0.0]) },
          indices: new Uint16Array([0, 1, 2, 2, 3, 0])
        }),
        uniforms: {
          uSampler: makeTextureFromSolidColor(gl, [1.0, 0.3, 0.3, 1.0])
        }
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
          value[i + 3] = point.position.num;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvcG9nby1tYXBpY29uLWxheWVyL3BvZ28tbWFwaWNvbi1sYXllci5qcyJdLCJuYW1lcyI6WyJnbHNsaWZ5IiwicmVxdWlyZSIsIkFUVFJJQlVURVMiLCJpbnN0YW5jZVBvc2l0aW9ucyIsInNpemUiLCJpbnN0YW5jZUNvbG9ycyIsIm1ha2VUZXh0dXJlRnJvbVNvbGlkQ29sb3IiLCJnbCIsInIiLCJnIiwiYiIsImEiLCJwaXhlbHMiLCJVaW50OEFycmF5Iiwid2lkdGgiLCJoZWlnaHQiLCJmb3JtYXQiLCJSR0JBIiwibWFnRmlsdGVyIiwiTkVBUkVTVCIsIm1pbkZpbHRlciIsIlBvZ29NYXBJY29uTGF5ZXIiLCJwcm9wcyIsInN0YXRlIiwiYXR0cmlidXRlTWFuYWdlciIsInNldFN0YXRlIiwibW9kZWwiLCJnZXRNb2RlbCIsInVybHMiLCJ0aGVuIiwidGV4dHVyZXMiLCJzZXRVbmlmb3JtcyIsInVTYW1wbGVyIiwiYmluZCIsImFkZEluc3RhbmNlZCIsInVwZGF0ZSIsImNhbGN1bGF0ZUluc3RhbmNlUG9zaXRpb25zIiwiY2FsY3VsYXRlSW5zdGFuY2VDb2xvcnMiLCJvbGRQcm9wcyIsIm5ld1Byb3BzIiwiZGF0YSIsImVxdWFscyIsInVwZGF0ZUF0dHJpYnV0ZXMiLCJjb25zb2xlIiwibG9nIiwiaXNJbnN0YW5jZWQiLCJwcm9ncmFtIiwidnMiLCJmcyIsImlkIiwiZ2VvbWV0cnkiLCJwb3NpdGlvbnMiLCJGbG9hdDMyQXJyYXkiLCJ0ZXhfY29vcmRzIiwidmFsdWUiLCJpbmRpY2VzIiwiVWludDE2QXJyYXkiLCJ1bmlmb3JtcyIsImF0dHJpYnV0ZSIsImkiLCJwb2ludCIsInBvc2l0aW9uIiwieCIsInkiLCJ6IiwibnVtIiwiY29sb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7QUFDQSxJQUFNQSxVQUFVQyxRQUFRLFNBQVIsQ0FBaEI7O0FBRUEsSUFBTUMsYUFBYTtBQUNqQkMscUJBQW1CLEVBQUNDLE1BQU0sQ0FBUCxFQUFVLEtBQUssR0FBZixFQUFvQixLQUFLLEdBQXpCLEVBQThCLEtBQUssUUFBbkMsRUFBNkMsS0FBSyxLQUFsRCxFQURGO0FBRWpCQyxrQkFBZ0IsRUFBQ0QsTUFBTSxDQUFQLEVBQVUsS0FBSyxLQUFmLEVBQXNCLEtBQUssT0FBM0IsRUFBb0MsS0FBSyxNQUF6QztBQUZDLENBQW5COztBQUtBLFNBQVNFLHlCQUFULENBQW1DQyxFQUFuQyxRQUFxRTtBQUFBOztBQUFBO0FBQUEsTUFBN0JDLENBQTZCLDBCQUF6QixDQUF5QjtBQUFBO0FBQUEsTUFBdEJDLENBQXNCLDJCQUFsQixDQUFrQjtBQUFBO0FBQUEsTUFBZkMsQ0FBZSwyQkFBWCxDQUFXO0FBQUE7QUFBQSxNQUFSQyxDQUFRLDJCQUFKLENBQUk7O0FBQ25FLFNBQU8sb0JBQWNKLEVBQWQsRUFBa0I7QUFDdkJLLFlBQVEsSUFBSUMsVUFBSixDQUFlLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUFmLENBRGU7QUFFdkJDLFdBQU8sQ0FGZ0I7QUFHdkJDLFlBQVEsQ0FIZTtBQUl2QkMsWUFBUVQsR0FBR1UsSUFKWTtBQUt2QkMsZUFBV1gsR0FBR1ksT0FMUztBQU12QkMsZUFBV2IsR0FBR1k7QUFOUyxHQUFsQixDQUFQO0FBUUQ7O0FBSUQ7O0lBQ3FCRSxnQjs7Ozs7d0JBRUs7QUFDdEIsYUFBT25CLFVBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7QUFRQSw0QkFBWW9CLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwrSEFDWEEsS0FEVztBQUVsQjs7OztzQ0FFaUI7QUFBQSxVQUNUZixFQURTLEdBQ0gsS0FBS2dCLEtBREYsQ0FDVGhCLEVBRFM7QUFBQSxVQUVUaUIsZ0JBRlMsR0FFVyxLQUFLRCxLQUZoQixDQUVUQyxnQkFGUzs7O0FBSWhCLFdBQUtDLFFBQUwsQ0FBYztBQUNaQyxlQUFPLEtBQUtDLFFBQUwsQ0FBY3BCLEVBQWQ7QUFESyxPQUFkOztBQUtELDhCQUFhQSxFQUFiLEVBQWlCO0FBQ2ZxQixjQUFNLENBQUMscUNBQUQ7QUFEUyxPQUFqQixFQUVHQyxJQUZILENBRVEsVUFBU0MsUUFBVCxFQUFrQjtBQUN4QixhQUFLQyxXQUFMLENBQWlCLEVBQUNDLFVBQVVGLFNBQVMsQ0FBVCxDQUFYLEVBQWpCO0FBQ0QsT0FGTyxDQUVORyxJQUZNLENBRUQsSUFGQyxDQUZSOztBQU1DVCx1QkFBaUJVLFlBQWpCLENBQThCaEMsVUFBOUIsRUFBMEM7QUFDeENDLDJCQUFtQixFQUFDZ0MsUUFBUSxLQUFLQywwQkFBZCxFQURxQjtBQUV4Qy9CLHdCQUFnQixFQUFDOEIsUUFBUSxLQUFLRSx1QkFBZDtBQUZ3QixPQUExQztBQUlEOzs7cUNBR2dCQyxRLEVBQVVDLFEsRUFBVTtBQUNuQywySUFBdUJELFFBQXZCLEVBQWlDQyxRQUFqQztBQUNBLFVBQUcsQ0FBQ0QsU0FBU0UsSUFBVCxDQUFjQyxNQUFkLENBQXFCRixTQUFTQyxJQUE5QixDQUFKLEVBQXlDO0FBQ3ZDLGFBQUtFLGdCQUFMLENBQXNCLEtBQUtwQixLQUEzQjtBQUNBcUIsZ0JBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0Q7QUFDRjs7OzZCQUVRckMsRSxFQUFJO0FBQUEsVUFDSmlCLGdCQURJLEdBQ2dCLEtBQUtELEtBRHJCLENBQ0pDLGdCQURJOzs7QUFLWCxhQUFPLGdCQUFVO0FBQ2ZxQixxQkFBYSxJQURFO0FBRWZDLGlCQUFTLGtCQUFZdkMsRUFBWixFQUFnQjtBQUN2QndDLGkwQ0FEdUI7QUFFdkJDLHFkQUZ1QjtBQUd2QkMsY0FBSTtBQUhtQixTQUFoQixDQUZNO0FBT2ZDLGtCQUFVLG1CQUFhO0FBQ3JCQyxxQkFBWSxJQUFJQyxZQUFKLENBQ1YsQ0FDRSxHQURGLEVBQ08sR0FEUCxFQUNZLEdBRFosRUFFRSxHQUZGLEVBRU8sQ0FBQyxHQUZSLEVBRWEsR0FGYixFQUdFLENBQUMsR0FISCxFQUdRLENBQUMsR0FIVCxFQUdjLEdBSGQsRUFJRSxDQUFDLEdBSkgsRUFJUSxHQUpSLEVBSWEsR0FKYixDQURVLENBRFM7QUFRckJDLHNCQUFZO0FBQ1ZqRCxrQkFBTSxDQURJO0FBRVZrRCxtQkFBTyxJQUFJRixZQUFKLENBQWlCLENBQ3RCLEdBRHNCLEVBQ2pCLEdBRGlCLEVBRXRCLEdBRnNCLEVBRWpCLEdBRmlCLEVBR3RCLE1BQUksR0FIa0IsRUFHYixHQUhhLEVBSXRCLE1BQUksR0FKa0IsRUFJYixHQUphLENBQWpCLENBRkcsRUFSUztBQWdCckJHLG1CQUFTLElBQUlDLFdBQUosQ0FBZ0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFoQjtBQWhCWSxTQUFiLENBUEs7QUF5QmZDLGtCQUFVO0FBQ1J6QixvQkFBVTFCLDBCQUEwQkMsRUFBMUIsRUFBOEIsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsQ0FBOUI7QUFERjtBQXpCSyxPQUFWLENBQVA7QUE2QkQ7OzsrQ0FHMEJtRCxTLEVBQVc7QUFBQSxVQUM3QmxCLElBRDZCLEdBQ3JCLEtBQUtsQixLQURnQixDQUM3QmtCLElBRDZCO0FBQUEsVUFFN0JjLEtBRjZCLEdBRWRJLFNBRmMsQ0FFN0JKLEtBRjZCO0FBQUEsVUFFdEJsRCxJQUZzQixHQUVkc0QsU0FGYyxDQUV0QnRELElBRnNCOztBQUdwQyxVQUFJdUQsSUFBSSxDQUFSO0FBSG9DO0FBQUE7QUFBQTs7QUFBQTtBQUlwQyw2QkFBb0JuQixJQUFwQiw4SEFBMEI7QUFBQSxjQUFmb0IsS0FBZTs7QUFDeEJOLGdCQUFNSyxJQUFJLENBQVYsSUFBZUMsTUFBTUMsUUFBTixDQUFlQyxDQUE5QjtBQUNBUixnQkFBTUssSUFBSSxDQUFWLElBQWVDLE1BQU1DLFFBQU4sQ0FBZUUsQ0FBOUI7QUFDQVQsZ0JBQU1LLElBQUksQ0FBVixJQUFlQyxNQUFNQyxRQUFOLENBQWVHLENBQTlCO0FBQ0FWLGdCQUFNSyxJQUFJLENBQVYsSUFBZUMsTUFBTUMsUUFBTixDQUFlSSxHQUE5QjtBQUNBTixlQUFLdkQsSUFBTDtBQUNEO0FBVm1DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXckM7Ozs0Q0FFdUJzRCxTLEVBQVc7QUFBQSxVQUMxQmxCLElBRDBCLEdBQ2xCLEtBQUtsQixLQURhLENBQzFCa0IsSUFEMEI7QUFBQSxVQUUxQmMsS0FGMEIsR0FFWEksU0FGVyxDQUUxQkosS0FGMEI7QUFBQSxVQUVuQmxELElBRm1CLEdBRVhzRCxTQUZXLENBRW5CdEQsSUFGbUI7O0FBR2pDLFVBQUl1RCxJQUFJLENBQVI7QUFIaUM7QUFBQTtBQUFBOztBQUFBO0FBSWpDLDhCQUFvQm5CLElBQXBCLG1JQUEwQjtBQUFBLGNBQWZvQixLQUFlOztBQUN4Qk4sZ0JBQU1LLElBQUksQ0FBVixJQUFlQyxNQUFNTSxLQUFOLENBQVksQ0FBWixDQUFmO0FBQ0FaLGdCQUFNSyxJQUFJLENBQVYsSUFBZUMsTUFBTU0sS0FBTixDQUFZLENBQVosQ0FBZjtBQUNBWixnQkFBTUssSUFBSSxDQUFWLElBQWVDLE1BQU1NLEtBQU4sQ0FBWSxDQUFaLENBQWY7QUFDQVAsZUFBS3ZELElBQUw7QUFDRDtBQVRnQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVWxDOzs7Ozs7a0JBNUdrQmlCLGdCIiwiZmlsZSI6InBvZ28tbWFwaWNvbi1sYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGF5ZXJ9IGZyb20gJ2RlY2suZ2wnO1xuaW1wb3J0IHtNb2RlbCwgUHJvZ3JhbSwgR2VvbWV0cnksIGxvYWRUZXh0dXJlcywgVGV4dHVyZTJEfSBmcm9tICdsdW1hLmdsJztcbmNvbnN0IGdsc2xpZnkgPSByZXF1aXJlKCdnbHNsaWZ5Jyk7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSB7XG4gIGluc3RhbmNlUG9zaXRpb25zOiB7c2l6ZTogNCwgJzAnOiAneCcsICcxJzogJ3knLCAnMic6ICd1bnVzZWQnLCAnMyc6ICdudW0nfSxcbiAgaW5zdGFuY2VDb2xvcnM6IHtzaXplOiAzLCAnMCc6ICdyZWQnLCAnMSc6ICdncmVlbicsICcyJzogJ2JsdWUnfVxufTtcblxuZnVuY3Rpb24gbWFrZVRleHR1cmVGcm9tU29saWRDb2xvcihnbCwgW3IgPSAxLCBnID0gMCwgYiA9IDAsIGEgPSAxXSkge1xuICByZXR1cm4gbmV3IFRleHR1cmUyRChnbCwge1xuICAgIHBpeGVsczogbmV3IFVpbnQ4QXJyYXkoWzEsIDAsIDAsIDFdKSxcbiAgICB3aWR0aDogMSxcbiAgICBoZWlnaHQ6IDEsXG4gICAgZm9ybWF0OiBnbC5SR0JBLFxuICAgIG1hZ0ZpbHRlcjogZ2wuTkVBUkVTVCxcbiAgICBtaW5GaWx0ZXI6IGdsLk5FQVJFU1RcbiAgfSk7XG59XG5cblxuXG4vL2NvbnNvbGUubG9nKCBBcnJheS5mcm9tKEFycmF5KDE1MCkua2V5cygpKS5tYXAoKHYpID0+ICcvc3JjL3Jlc291cmNlcy9pY29ucy8nICsgdiArICcucG5nJykgKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9nb01hcEljb25MYXllciBleHRlbmRzIExheWVyIHtcblxuICBzdGF0aWMgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIEFUVFJJQlVURVM7XG4gIH1cblxuICAvKlxuICAgKiBAY2xhc3NkZXNjXG4gICAqIFNjYXR0ZXJwbG90TGF5ZXJcbiAgICpcbiAgICogQGNsYXNzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wc1xuICAgKiBAcGFyYW0ge251bWJlcn0gcHJvcHMucmFkaXVzIC0gcG9pbnQgcmFkaXVzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIGluaXRpYWxpemVTdGF0ZSgpIHtcbiAgICBjb25zdCB7Z2x9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7YXR0cmlidXRlTWFuYWdlcn0gPSB0aGlzLnN0YXRlO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb2RlbDogdGhpcy5nZXRNb2RlbChnbClcbiAgICB9KTtcblxuXG4gICBsb2FkVGV4dHVyZXMoZ2wsIHtcbiAgICAgdXJsczogWycvc3JjL3Jlc291cmNlcy9pY29ucy90aWxlXzE1MXgxLnBuZyddXG4gICB9KS50aGVuKGZ1bmN0aW9uKHRleHR1cmVzKXtcbiAgICAgdGhpcy5zZXRVbmlmb3Jtcyh7dVNhbXBsZXI6IHRleHR1cmVzWzBdfSk7XG4gICB9LmJpbmQodGhpcykpO1xuXG4gICAgYXR0cmlidXRlTWFuYWdlci5hZGRJbnN0YW5jZWQoQVRUUklCVVRFUywge1xuICAgICAgaW5zdGFuY2VQb3NpdGlvbnM6IHt1cGRhdGU6IHRoaXMuY2FsY3VsYXRlSW5zdGFuY2VQb3NpdGlvbnN9LFxuICAgICAgaW5zdGFuY2VDb2xvcnM6IHt1cGRhdGU6IHRoaXMuY2FsY3VsYXRlSW5zdGFuY2VDb2xvcnN9XG4gICAgfSk7XG4gIH1cblxuXG4gIHdpbGxSZWNlaXZlUHJvcHMob2xkUHJvcHMsIG5ld1Byb3BzKSB7XG4gICAgc3VwZXIud2lsbFJlY2VpdmVQcm9wcyhvbGRQcm9wcywgbmV3UHJvcHMpO1xuICAgIGlmKCFvbGRQcm9wcy5kYXRhLmVxdWFscyhuZXdQcm9wcy5kYXRhKSkge1xuICAgICAgdGhpcy51cGRhdGVBdHRyaWJ1dGVzKHRoaXMucHJvcHMpXG4gICAgICBjb25zb2xlLmxvZyhcInVwZGF0ZWRcIik7XG4gICAgfVxuICB9XG5cbiAgZ2V0TW9kZWwoZ2wpIHtcbiAgICBjb25zdCB7YXR0cmlidXRlTWFuYWdlcn0gPSB0aGlzLnN0YXRlO1xuXG5cblxuICAgIHJldHVybiBuZXcgTW9kZWwoe1xuICAgICAgaXNJbnN0YW5jZWQ6IHRydWUsXG4gICAgICBwcm9ncmFtOiBuZXcgUHJvZ3JhbShnbCwge1xuICAgICAgICB2czogZ2xzbGlmeSgnLi9wb2dvLW1hcGljb24tbGF5ZXItdmVydGV4Lmdsc2wnKSxcbiAgICAgICAgZnM6IGdsc2xpZnkoJy4vcG9nby1tYXBpY29uLWxheWVyLWZyYWdtZW50Lmdsc2wnKSxcbiAgICAgICAgaWQ6ICdwb2dvLW1hcGljb24nXG4gICAgICB9KSxcbiAgICAgIGdlb21ldHJ5OiBuZXcgR2VvbWV0cnkoe1xuICAgICAgICBwb3NpdGlvbnM6ICBuZXcgRmxvYXQzMkFycmF5KFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIDEuMCwgMS4wLCAwLjAsXG4gICAgICAgICAgICAxLjAsIC0xLjAsIDAuMCxcbiAgICAgICAgICAgIC0xLjAsIC0xLjAsIDAuMCxcbiAgICAgICAgICAgIC0xLjAsIDEuMCwgMC4wLFxuICAgICAgICAgIF0pLFxuICAgICAgICB0ZXhfY29vcmRzOiB7XG4gICAgICAgICAgc2l6ZTogMixcbiAgICAgICAgICB2YWx1ZTogbmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAgICAgICAwLjAsIDAuMCxcbiAgICAgICAgICAgIDAuMCwgMS4wLFxuICAgICAgICAgICAgMS4wLzE1MSwgMS4wLFxuICAgICAgICAgICAgMS4wLzE1MSwgMC4wXG4gICAgICAgICAgXSl9LFxuICAgICAgICBpbmRpY2VzOiBuZXcgVWludDE2QXJyYXkoWzAsIDEsIDIsIDIsIDMsIDBdKVxuICAgICAgfSksXG4gICAgICB1bmlmb3Jtczoge1xuICAgICAgICB1U2FtcGxlcjogbWFrZVRleHR1cmVGcm9tU29saWRDb2xvcihnbCwgWzEuMCwgMC4zLCAwLjMsIDEuMF0pXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cblxuICBjYWxjdWxhdGVJbnN0YW5jZVBvc2l0aW9ucyhhdHRyaWJ1dGUpIHtcbiAgICBjb25zdCB7ZGF0YX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHt2YWx1ZSwgc2l6ZX0gPSBhdHRyaWJ1dGU7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoY29uc3QgcG9pbnQgb2YgZGF0YSkge1xuICAgICAgdmFsdWVbaSArIDBdID0gcG9pbnQucG9zaXRpb24ueDtcbiAgICAgIHZhbHVlW2kgKyAxXSA9IHBvaW50LnBvc2l0aW9uLnk7XG4gICAgICB2YWx1ZVtpICsgMl0gPSBwb2ludC5wb3NpdGlvbi56O1xuICAgICAgdmFsdWVbaSArIDNdID0gcG9pbnQucG9zaXRpb24ubnVtO1xuICAgICAgaSArPSBzaXplO1xuICAgIH1cbiAgfVxuXG4gIGNhbGN1bGF0ZUluc3RhbmNlQ29sb3JzKGF0dHJpYnV0ZSkge1xuICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge3ZhbHVlLCBzaXplfSA9IGF0dHJpYnV0ZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yIChjb25zdCBwb2ludCBvZiBkYXRhKSB7XG4gICAgICB2YWx1ZVtpICsgMF0gPSBwb2ludC5jb2xvclswXTtcbiAgICAgIHZhbHVlW2kgKyAxXSA9IHBvaW50LmNvbG9yWzFdO1xuICAgICAgdmFsdWVbaSArIDJdID0gcG9pbnQuY29sb3JbMl07XG4gICAgICBpICs9IHNpemU7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==