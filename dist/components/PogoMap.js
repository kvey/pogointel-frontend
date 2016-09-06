'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;
//import ScatterplotOverlay from 'react-map-gl/src/overlays/scatterplot.react';


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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var PROP_TYPES = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired
};

var PogoMap = (_class = function (_Component) {
  _inherits(PogoMap, _Component);

  function PogoMap(props) {
    _classCallCheck(this, PogoMap);

    var _this = _possibleConstructorReturn(this, (PogoMap.__proto__ || Object.getPrototypeOf(PogoMap)).call(this, props));

    _this.state = {
      viewport: _extends({
        width: props.width,
        height: props.height,
        latitude: props.latitude,
        longitude: props.longitude,
        zoom: 11,
        //bearing: 180,
        //pitch: 60,
        startDragLngLat: null,
        isDragging: false
      }, props.viewport)
      //mapStyle: buildStyle({stroke: '#FF00FF', fill: 'green'})
    };
    return _this;
  }

  _createClass(PogoMap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var locations = nextProps.locations;


      var points = locations.map(function (l) {
        return { color: [88, 9, 124],
          //radius: 0.5,
          position: { 'x': Number(l.get('lng')),
            'y': Number(l.get('lat')),
            'z': 0
          } };
      });

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

      if (!this.props.locations) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        _reactMapGl2.default,
        _extends({}, viewport, {
          onChangeViewport: this._onChangeViewport,
          onClickFeatures: this._onClickFeatures
        }),
        _react2.default.createElement(_deck.DeckGLOverlay, _extends({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1BvZ29NYXAuanN4Il0sIm5hbWVzIjpbIlBST1BfVFlQRVMiLCJ3aWR0aCIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJoZWlnaHQiLCJQb2dvTWFwIiwicHJvcHMiLCJzdGF0ZSIsInZpZXdwb3J0IiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJ6b29tIiwic3RhcnREcmFnTG5nTGF0IiwiaXNEcmFnZ2luZyIsIm5leHRQcm9wcyIsImxvY2F0aW9ucyIsInBvaW50cyIsIm1hcCIsImwiLCJjb2xvciIsInBvc2l0aW9uIiwiTnVtYmVyIiwiZ2V0Iiwic2V0U3RhdGUiLCJvcHQiLCJvbkNoYW5nZVZpZXdwb3J0IiwiT2JqZWN0IiwiYXNzaWduIiwiZmVhdHVyZXMiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJkYXRhIiwiX29uQ2hhbmdlVmlld3BvcnQiLCJfb25DbGlja0ZlYXR1cmVzIiwiX3JlbmRlclNjYXR0ZXJwbG90TGF5ZXIiLCJwcm9wVHlwZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU9BOzs7QUFQQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7QUFFQTs7OztBQUVBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTUEsYUFBYTtBQUNqQkMsU0FBTyxpQkFBVUMsTUFBVixDQUFpQkMsVUFEUDtBQUVqQkMsVUFBUSxpQkFBVUYsTUFBVixDQUFpQkM7QUFGUixDQUFuQjs7SUFNcUJFLE87OztBQUVuQixtQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGtIQUNYQSxLQURXOztBQUVqQixVQUFLQyxLQUFMLEdBQWE7QUFDWEM7QUFDRVAsZUFBT0ssTUFBTUwsS0FEZjtBQUVFRyxnQkFBUUUsTUFBTUYsTUFGaEI7QUFHRUssa0JBQVVILE1BQU1HLFFBSGxCO0FBSUVDLG1CQUFXSixNQUFNSSxTQUpuQjtBQUtFQyxjQUFNLEVBTFI7QUFNRTtBQUNBO0FBQ0FDLHlCQUFpQixJQVJuQjtBQVNFQyxvQkFBWTtBQVRkLFNBVUtQLE1BQU1FLFFBVlg7QUFZQTtBQWJXLEtBQWI7QUFGaUI7QUFpQmxCOzs7OzhDQUV5Qk0sUyxFQUFVO0FBQUEsVUFDNUJDLFNBRDRCLEdBQ2ZELFNBRGUsQ0FDNUJDLFNBRDRCOzs7QUFHbkMsVUFBTUMsU0FBU0QsVUFBVUUsR0FBVixDQUFjLFVBQVNDLENBQVQsRUFBVztBQUN0QyxlQUFPLEVBQUNDLE9BQU8sQ0FBQyxFQUFELEVBQUssQ0FBTCxFQUFRLEdBQVIsQ0FBUjtBQUNDO0FBQ0FDLG9CQUFVLEVBQUMsS0FBS0MsT0FBUUgsRUFBRUksR0FBRixDQUFNLEtBQU4sQ0FBUixDQUFOO0FBQ0MsaUJBQUtELE9BQVFILEVBQUVJLEdBQUYsQ0FBTSxLQUFOLENBQVIsQ0FETjtBQUVDLGlCQUFLO0FBRk4sV0FGWCxFQUFQO0FBTUQsT0FQYyxDQUFmOztBQVVDLFdBQUtDLFFBQUwsQ0FBYztBQUNaUCxnQkFBUUE7QUFESSxPQUFkO0FBR0Q7OztzQ0FHaUJRLEcsRUFBSztBQUNyQixVQUFJLEtBQUtsQixLQUFMLENBQVdtQixnQkFBZixFQUFpQztBQUMvQixlQUFPLEtBQUtuQixLQUFMLENBQVdtQixnQkFBWCxDQUE0QkQsR0FBNUIsQ0FBUDtBQUNEO0FBQ0QsV0FBS0QsUUFBTCxDQUFjO0FBQ1pmLGtCQUFVa0IsT0FBT0MsTUFBUCxDQUFjLEtBQUtwQixLQUFMLENBQVdDLFFBQXpCLEVBQW1DZ0IsR0FBbkM7QUFERSxPQUFkO0FBR0Q7OztxQ0FHZ0JJLFEsRUFBVTtBQUN6Qix1QkFBT0MsT0FBUCxDQUFlQyxHQUFmLENBQW1CRixRQUFuQjtBQUNEOzs7OENBRXdCO0FBQUEsbUJBQ0csS0FBS3JCLEtBRFI7QUFBQSxVQUNqQkMsUUFEaUIsVUFDakJBLFFBRGlCO0FBQUEsVUFDUFEsTUFETyxVQUNQQSxNQURPOzs7QUFHeEIsYUFBTywrQkFBcUI7QUFDMUJmLGVBQU9PLFNBQVNQLEtBRFU7QUFFMUJHLGdCQUFRSSxTQUFTSixNQUZTO0FBRzFCSyxrQkFBVUQsU0FBU0MsUUFITztBQUkxQkMsbUJBQVdGLFNBQVNFLFNBSk07QUFLMUJDLGNBQU1ILFNBQVNHLElBTFc7QUFNMUJvQixZQUFJLGtCQU5zQjtBQU8xQkMsY0FBTWhCO0FBUG9CLE9BQXJCLENBQVA7QUFZRDs7OzZCQUVTO0FBQ1AsVUFBTVIsd0JBRUQsS0FBS0QsS0FBTCxDQUFXQyxRQUZWLEVBR0QsS0FBS0YsS0FISixDQUFOOztBQU1BLFVBQUksQ0FBQyxLQUFLQSxLQUFMLENBQVdTLFNBQWhCLEVBQTJCO0FBQ3pCLGVBQU8sMENBQVA7QUFDRDs7QUFFRCxhQUNFO0FBQUE7QUFBQSxxQkFDT1AsUUFEUDtBQUVFLDRCQUFtQixLQUFLeUIsaUJBRjFCO0FBR0UsMkJBQWtCLEtBQUtDO0FBSHpCO0FBTUM7QUFDRSxjQUFHO0FBREwsV0FFTzFCLFFBRlA7QUFHRSxvQkFBVUEsUUFIWjtBQUlFLGtCQUFRLENBQ04sS0FBSzJCLHVCQUFMLEVBRE07QUFKVjtBQU5ELE9BREY7QUFrQkQ7Ozs7O2tCQXBHa0I5QixPOzs7QUF1R3JCQSxRQUFRK0IsU0FBUixHQUFvQnBDLFVBQXBCIiwiZmlsZSI6IlBvZ29NYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmltcG9ydCBkb2N1bWVudCBmcm9tICdnbG9iYWwvZG9jdW1lbnQnO1xuaW1wb3J0IHdpbmRvdyBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlcywgQ29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBJbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBNYXBHTCBmcm9tICdyZWFjdC1tYXAtZ2wnO1xuLy9pbXBvcnQgU2NhdHRlcnBsb3RPdmVybGF5IGZyb20gJ3JlYWN0LW1hcC1nbC9zcmMvb3ZlcmxheXMvc2NhdHRlcnBsb3QucmVhY3QnO1xuaW1wb3J0IHtEZWNrR0xPdmVybGF5LCBTY2F0dGVycGxvdExheWVyfSBmcm9tICdkZWNrLmdsJ1xuaW1wb3J0IGFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJztcbmltcG9ydCByYXN0ZXJUaWxlU3R5bGUgZnJvbSAncmFzdGVyLXRpbGUtc3R5bGUnO1xuXG5cbmltcG9ydCBQb2dvTWFwSWNvbkxheWVyIGZyb20gJy4uL2xheWVycy9wb2dvLW1hcGljb24tbGF5ZXInXG5cbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCByZWdlblJ1bnRpbWUgZnJvbSAncmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lJ1xuXG5pbXBvcnQgYXV0b2JpbmQgZnJvbSAnYXV0b2JpbmQtZGVjb3JhdG9yJztcblxuXG5jb25zdCBQUk9QX1RZUEVTID0ge1xuICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2dvTWFwIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmlld3BvcnQ6IHtcbiAgICAgICAgd2lkdGg6IHByb3BzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHByb3BzLmhlaWdodCxcbiAgICAgICAgbGF0aXR1ZGU6IHByb3BzLmxhdGl0dWRlLFxuICAgICAgICBsb25naXR1ZGU6IHByb3BzLmxvbmdpdHVkZSxcbiAgICAgICAgem9vbTogMTEsXG4gICAgICAgIC8vYmVhcmluZzogMTgwLFxuICAgICAgICAvL3BpdGNoOiA2MCxcbiAgICAgICAgc3RhcnREcmFnTG5nTGF0OiBudWxsLFxuICAgICAgICBpc0RyYWdnaW5nOiBmYWxzZSxcbiAgICAgICAgLi4ucHJvcHMudmlld3BvcnRcbiAgICAgIH1cbiAgICAgIC8vbWFwU3R5bGU6IGJ1aWxkU3R5bGUoe3N0cm9rZTogJyNGRjAwRkYnLCBmaWxsOiAnZ3JlZW4nfSlcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgY29uc3Qge2xvY2F0aW9uc30gPSBuZXh0UHJvcHM7XG5cbiAgIGNvbnN0IHBvaW50cyA9IGxvY2F0aW9ucy5tYXAoZnVuY3Rpb24obCl7XG4gICAgIHJldHVybiB7Y29sb3I6IFs4OCwgOSwgMTI0XSxcbiAgICAgICAgICAgICAvL3JhZGl1czogMC41LFxuICAgICAgICAgICAgIHBvc2l0aW9uOiB7J3gnOiBOdW1iZXIoIGwuZ2V0KCdsbmcnKSApLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3knOiBOdW1iZXIoIGwuZ2V0KCdsYXQnKSApLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3onOiAwXG4gICAgICAgICAgICAgfX07XG4gICB9KTtcblxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwb2ludHM6IHBvaW50c1xuICAgIH0pXG4gIH1cblxuICBAYXV0b2JpbmRcbiAgX29uQ2hhbmdlVmlld3BvcnQob3B0KSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2VWaWV3cG9ydCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2VWaWV3cG9ydChvcHQpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHZpZXdwb3J0OiBPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUudmlld3BvcnQsIG9wdClcbiAgICB9KTtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBfb25DbGlja0ZlYXR1cmVzKGZlYXR1cmVzKSB7XG4gICAgd2luZG93LmNvbnNvbGUubG9nKGZlYXR1cmVzKTtcbiAgfVxuXG4gX3JlbmRlclNjYXR0ZXJwbG90TGF5ZXIoKSB7XG4gICBjb25zdCB7dmlld3BvcnQsIHBvaW50c30gPSB0aGlzLnN0YXRlXG5cbiAgIHJldHVybiBuZXcgUG9nb01hcEljb25MYXllcih7XG4gICAgIHdpZHRoOiB2aWV3cG9ydC53aWR0aCxcbiAgICAgaGVpZ2h0OiB2aWV3cG9ydC5oZWlnaHQsXG4gICAgIGxhdGl0dWRlOiB2aWV3cG9ydC5sYXRpdHVkZSxcbiAgICAgbG9uZ2l0dWRlOiB2aWV3cG9ydC5sb25naXR1ZGUsXG4gICAgIHpvb206IHZpZXdwb3J0Lnpvb20sXG4gICAgIGlkOiAnc2NhdHRlcnBsb3RMYXllcicsXG4gICAgIGRhdGE6IHBvaW50cyxcbiAgICAgLy9pc1BpY2thYmxlOiB0cnVlLFxuICAgICAvL29uSG92ZXI6IHRoaXMuX2hhbmRsZVNjYXR0ZXJwbG90SG92ZXJlZCxcbiAgICAgLy9vbkNsaWNrOiB0aGlzLl9oYW5kbGVTY2F0dGVycGxvdENsaWNrZWRcbiAgIH0pO1xuIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgdmlld3BvcnQgPSB7XG4gICAgICAvLyBtYXBTdHlsZTogdGhpcy5zdGF0ZS5tYXBTdHlsZSxcbiAgICAgIC4uLnRoaXMuc3RhdGUudmlld3BvcnQsXG4gICAgICAuLi50aGlzLnByb3BzXG4gICAgfTtcblxuICAgIGlmICghdGhpcy5wcm9wcy5sb2NhdGlvbnMpIHtcbiAgICAgIHJldHVybiA8ZGl2Lz47XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxNYXBHTFxuICAgICAgICB7IC4uLnZpZXdwb3J0IH1cbiAgICAgICAgb25DaGFuZ2VWaWV3cG9ydD17IHRoaXMuX29uQ2hhbmdlVmlld3BvcnQgfVxuICAgICAgICBvbkNsaWNrRmVhdHVyZXM9eyB0aGlzLl9vbkNsaWNrRmVhdHVyZXMgfVxuICAgICAgPlxuXG4gICAgICAgPERlY2tHTE92ZXJsYXlcbiAgICAgICAgIGlkPVwiZGVja2dsLW92ZXJsYXlcIlxuICAgICAgICAgeyAuLi52aWV3cG9ydH1cbiAgICAgICAgIG1hcFN0YXRlPXt2aWV3cG9ydH1cbiAgICAgICAgIGxheWVycz17W1xuICAgICAgICAgICB0aGlzLl9yZW5kZXJTY2F0dGVycGxvdExheWVyKClcbiAgICAgICAgIF19XG4gICAgICAgLz5cblxuICAgICAgPC9NYXBHTD5cbiAgICApO1xuICB9XG59XG5cblBvZ29NYXAucHJvcFR5cGVzID0gUFJPUF9UWVBFUztcbiJdfQ==