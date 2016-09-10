'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _desc, _value, _class;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactMapGl = require('react-map-gl');

var _reactMapGl2 = _interopRequireDefault(_reactMapGl);

var _deck = require('deck.gl');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _rasterTileStyle = require('raster-tile-style');

var _rasterTileStyle2 = _interopRequireDefault(_rasterTileStyle);

var _pogoMapiconLayer = require('../layers/pogo-mapicon-layer');

var _pogoMapiconLayer2 = _interopRequireDefault(_pogoMapiconLayer);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _runtime = require('regenerator-runtime/runtime');

var _runtime2 = _interopRequireDefault(_runtime);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import ScatterplotOverlay from 'react-map-gl/src/overlays/scatterplot.react';


var PROP_TYPES = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired
};

var DeckGLWithDeconstructor = function (_DeckGLOverlay) {
  _inherits(DeckGLWithDeconstructor, _DeckGLOverlay);

  function DeckGLWithDeconstructor() {
    _classCallCheck(this, DeckGLWithDeconstructor);

    return _possibleConstructorReturn(this, (DeckGLWithDeconstructor.__proto__ || Object.getPrototypeOf(DeckGLWithDeconstructor)).apply(this, arguments));
  }

  _createClass(DeckGLWithDeconstructor, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log("UNMOUNTING");
      this.state.gl.getExtension('WEBGL_lose_context').loseContext();
    }
  }]);

  return DeckGLWithDeconstructor;
}(_deck.DeckGLOverlay);

var PogoMap = (_class = function (_Component) {
  _inherits(PogoMap, _Component);

  function PogoMap(props) {
    _classCallCheck(this, PogoMap);

    var _this2 = _possibleConstructorReturn(this, (PogoMap.__proto__ || Object.getPrototypeOf(PogoMap)).call(this, props));

    _this2.state = {
      viewport: _extends({
        width: props.width,
        height: props.height,
        latitude: props.latitude,
        longitude: props.longitude,
        zoom: 3,
        //bearing: 180,
        //pitch: 60,
        startDragLngLat: null,
        isDragging: false
      }, props.viewport)
      //mapStyle: buildStyle({stroke: '#FF00FF', fill: 'green'})
    };
    return _this2;
  }

  _createClass(PogoMap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var locations = nextProps.locations;


      var points = _immutable2.default.fromJS(locations.map(function (l) {
        return { color: [88, 9, 124],
          //radius: 0.5,
          position: { 'x': Number(l.get('lng')),
            'y': Number(l.get('lat')),
            'z': 0,
            'num': Number(l.get('num'))

          } };
      }));

      this.setState({
        points: points
      });
    }
  }, {
    key: '_onChangeViewport',
    value: function _onChangeViewport(opt) {
      if (this.props.onChangeViewport) {
        return this.props.onChangeViewport(opt);
      }
      this.setState({
        viewport: Object.assign(this.state.viewport, opt)
      });
    }
  }, {
    key: '_onClickFeatures',
    value: function _onClickFeatures(features) {
      _window2.default.console.log(features);
    }
  }, {
    key: '_renderScatterplotLayer',
    value: function _renderScatterplotLayer() {
      var _state = this.state;
      var viewport = _state.viewport;
      var points = _state.points;


      return new _pogoMapiconLayer2.default({
        width: viewport.width,
        height: viewport.height,
        latitude: viewport.latitude,
        longitude: viewport.longitude,
        zoom: viewport.zoom,
        id: 'scatterplotLayer',
        data: points
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var viewport = _extends({}, this.state.viewport, this.props);

      if (!this.state.points) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        _reactMapGl2.default,
        _extends({}, viewport, {
          onChangeViewport: this._onChangeViewport,
          onClickFeatures: this._onClickFeatures
        }),
        _react2.default.createElement(DeckGLWithDeconstructor, _extends({
          key: this.state.points.size,
          id: 'deckgl-overlay'
        }, viewport, {
          mapState: viewport,
          layers: [this._renderScatterplotLayer()]
        }))
      );
    }
  }]);

  return PogoMap;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, '_onChangeViewport', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onChangeViewport'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onClickFeatures', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onClickFeatures'), _class.prototype)), _class);
exports.default = PogoMap;


PogoMap.propTypes = PROP_TYPES;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1BvZ29NYXAuanN4Il0sIm5hbWVzIjpbIlBST1BfVFlQRVMiLCJ3aWR0aCIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJoZWlnaHQiLCJEZWNrR0xXaXRoRGVjb25zdHJ1Y3RvciIsImNvbnNvbGUiLCJsb2ciLCJzdGF0ZSIsImdsIiwiZ2V0RXh0ZW5zaW9uIiwibG9zZUNvbnRleHQiLCJQb2dvTWFwIiwicHJvcHMiLCJ2aWV3cG9ydCIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiem9vbSIsInN0YXJ0RHJhZ0xuZ0xhdCIsImlzRHJhZ2dpbmciLCJuZXh0UHJvcHMiLCJsb2NhdGlvbnMiLCJwb2ludHMiLCJmcm9tSlMiLCJtYXAiLCJsIiwiY29sb3IiLCJwb3NpdGlvbiIsIk51bWJlciIsImdldCIsInNldFN0YXRlIiwib3B0Iiwib25DaGFuZ2VWaWV3cG9ydCIsIk9iamVjdCIsImFzc2lnbiIsImZlYXR1cmVzIiwiaWQiLCJkYXRhIiwiX29uQ2hhbmdlVmlld3BvcnQiLCJfb25DbGlja0ZlYXR1cmVzIiwic2l6ZSIsIl9yZW5kZXJTY2F0dGVycGxvdExheWVyIiwicHJvcFR5cGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBRUE7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWkE7OztBQWVBLElBQU1BLGFBQWE7QUFDakJDLFNBQU8saUJBQVVDLE1BQVYsQ0FBaUJDLFVBRFA7QUFFakJDLFVBQVEsaUJBQVVGLE1BQVYsQ0FBaUJDO0FBRlIsQ0FBbkI7O0lBS01FLHVCOzs7Ozs7Ozs7OzsyQ0FDa0I7QUFDcEJDLGNBQVFDLEdBQVIsQ0FBWSxZQUFaO0FBQ0EsV0FBS0MsS0FBTCxDQUFXQyxFQUFYLENBQWND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IjoiUG9nb01hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJ2dsb2JhbC9kb2N1bWVudCc7XG5pbXBvcnQgd2luZG93IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzLCBDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IE1hcEdMIGZyb20gJ3JlYWN0LW1hcC1nbCc7XG4vL2ltcG9ydCBTY2F0dGVycGxvdE92ZXJsYXkgZnJvbSAncmVhY3QtbWFwLWdsL3NyYy9vdmVybGF5cy9zY2F0dGVycGxvdC5yZWFjdCc7XG5pbXBvcnQge0RlY2tHTE92ZXJsYXksIFNjYXR0ZXJwbG90TGF5ZXJ9IGZyb20gJ2RlY2suZ2wnXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xuaW1wb3J0IHJhc3RlclRpbGVTdHlsZSBmcm9tICdyYXN0ZXItdGlsZS1zdHlsZSc7XG5cblxuaW1wb3J0IFBvZ29NYXBJY29uTGF5ZXIgZnJvbSAnLi4vbGF5ZXJzL3BvZ28tbWFwaWNvbi1sYXllcidcblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHJlZ2VuUnVudGltZSBmcm9tICdyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUnXG5cbmltcG9ydCBhdXRvYmluZCBmcm9tICdhdXRvYmluZC1kZWNvcmF0b3InO1xuXG5cbmNvbnN0IFBST1BfVFlQRVMgPSB7XG4gIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuXG5jbGFzcyBEZWNrR0xXaXRoRGVjb25zdHJ1Y3RvciBleHRlbmRzIERlY2tHTE92ZXJsYXkge1xuICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgIGNvbnNvbGUubG9nKFwiVU5NT1VOVElOR1wiKTtcbiAgICB0aGlzLnN0YXRlLmdsLmdldEV4dGVuc2lvbignV0VCR0xfbG9zZV9jb250ZXh0JykubG9zZUNvbnRleHQoKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvZ29NYXAgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aWV3cG9ydDoge1xuICAgICAgICB3aWR0aDogcHJvcHMud2lkdGgsXG4gICAgICAgIGhlaWdodDogcHJvcHMuaGVpZ2h0LFxuICAgICAgICBsYXRpdHVkZTogcHJvcHMubGF0aXR1ZGUsXG4gICAgICAgIGxvbmdpdHVkZTogcHJvcHMubG9uZ2l0dWRlLFxuICAgICAgICB6b29tOiAzLFxuICAgICAgICAvL2JlYXJpbmc6IDE4MCxcbiAgICAgICAgLy9waXRjaDogNjAsXG4gICAgICAgIHN0YXJ0RHJhZ0xuZ0xhdDogbnVsbCxcbiAgICAgICAgaXNEcmFnZ2luZzogZmFsc2UsXG4gICAgICAgIC4uLnByb3BzLnZpZXdwb3J0XG4gICAgICB9XG4gICAgICAvL21hcFN0eWxlOiBidWlsZFN0eWxlKHtzdHJva2U6ICcjRkYwMEZGJywgZmlsbDogJ2dyZWVuJ30pXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgIGNvbnN0IHtsb2NhdGlvbnN9ID0gbmV4dFByb3BzO1xuXG4gICBjb25zdCBwb2ludHMgPSBJbW11dGFibGUuZnJvbUpTKGxvY2F0aW9ucy5tYXAoZnVuY3Rpb24obCl7XG4gICAgIHJldHVybiB7Y29sb3I6IFs4OCwgOSwgMTI0XSxcbiAgICAgICAgICAgICAvL3JhZGl1czogMC41LFxuICAgICAgICAgICAgIHBvc2l0aW9uOiB7J3gnOiBOdW1iZXIoIGwuZ2V0KCdsbmcnKSApLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3knOiBOdW1iZXIoIGwuZ2V0KCdsYXQnKSApLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3onOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ251bSc6IE51bWJlciggbC5nZXQoJ251bScpIClcblxuICAgICAgICAgICAgIH19O1xuICAgfSkpO1xuXG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBvaW50czogcG9pbnRzXG4gICAgfSlcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBfb25DaGFuZ2VWaWV3cG9ydChvcHQpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZVZpZXdwb3J0KSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNoYW5nZVZpZXdwb3J0KG9wdCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdmlld3BvcnQ6IE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZS52aWV3cG9ydCwgb3B0KVxuICAgIH0pO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIF9vbkNsaWNrRmVhdHVyZXMoZmVhdHVyZXMpIHtcbiAgICB3aW5kb3cuY29uc29sZS5sb2coZmVhdHVyZXMpO1xuICB9XG5cbiBfcmVuZGVyU2NhdHRlcnBsb3RMYXllcigpIHtcbiAgIGNvbnN0IHt2aWV3cG9ydCwgcG9pbnRzfSA9IHRoaXMuc3RhdGVcblxuICAgcmV0dXJuIG5ldyBQb2dvTWFwSWNvbkxheWVyKHtcbiAgICAgd2lkdGg6IHZpZXdwb3J0LndpZHRoLFxuICAgICBoZWlnaHQ6IHZpZXdwb3J0LmhlaWdodCxcbiAgICAgbGF0aXR1ZGU6IHZpZXdwb3J0LmxhdGl0dWRlLFxuICAgICBsb25naXR1ZGU6IHZpZXdwb3J0LmxvbmdpdHVkZSxcbiAgICAgem9vbTogdmlld3BvcnQuem9vbSxcbiAgICAgaWQ6ICdzY2F0dGVycGxvdExheWVyJyxcbiAgICAgZGF0YTogcG9pbnRzLFxuICAgICAvL2lzUGlja2FibGU6IHRydWUsXG4gICAgIC8vb25Ib3ZlcjogdGhpcy5faGFuZGxlU2NhdHRlcnBsb3RIb3ZlcmVkLFxuICAgICAvL29uQ2xpY2s6IHRoaXMuX2hhbmRsZVNjYXR0ZXJwbG90Q2xpY2tlZFxuICAgfSk7XG4gfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB2aWV3cG9ydCA9IHtcbiAgICAgIC8vIG1hcFN0eWxlOiB0aGlzLnN0YXRlLm1hcFN0eWxlLFxuICAgICAgLi4udGhpcy5zdGF0ZS52aWV3cG9ydCxcbiAgICAgIC4uLnRoaXMucHJvcHNcbiAgICB9O1xuXG4gICAgaWYgKCF0aGlzLnN0YXRlLnBvaW50cykge1xuICAgICAgcmV0dXJuIDxkaXYvPjtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE1hcEdMXG4gICAgICAgIHsgLi4udmlld3BvcnQgfVxuICAgICAgICBvbkNoYW5nZVZpZXdwb3J0PXsgdGhpcy5fb25DaGFuZ2VWaWV3cG9ydCB9XG4gICAgICAgIG9uQ2xpY2tGZWF0dXJlcz17IHRoaXMuX29uQ2xpY2tGZWF0dXJlcyB9XG4gICAgICA+XG5cbiAgICAgICA8RGVja0dMV2l0aERlY29uc3RydWN0b3JcbiAgICAgICAgIGtleT17dGhpcy5zdGF0ZS5wb2ludHMuc2l6ZX1cbiAgICAgICAgIGlkPVwiZGVja2dsLW92ZXJsYXlcIlxuICAgICAgICAgeyAuLi52aWV3cG9ydH1cbiAgICAgICAgIG1hcFN0YXRlPXt2aWV3cG9ydH1cbiAgICAgICAgIGxheWVycz17W1xuICAgICAgICAgICB0aGlzLl9yZW5kZXJTY2F0dGVycGxvdExheWVyKClcbiAgICAgICAgIF19XG4gICAgICAgLz5cblxuICAgICAgPC9NYXBHTD5cbiAgICApO1xuICB9XG59XG5cblBvZ29NYXAucHJvcFR5cGVzID0gUFJPUF9UWVBFUztcbiJdfQ==