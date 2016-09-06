'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

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

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _exampleCities = require('example-cities');

var _exampleCities2 = _interopRequireDefault(_exampleCities);

var _rasterTileStyle = require('raster-tile-style');

var _rasterTileStyle2 = _interopRequireDefault(_rasterTileStyle);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _PogoMap = require('./components/PogoMap.jsx');

var _PogoMap2 = _interopRequireDefault(_PogoMap);

var _PogoSidebar = require('./components/PogoSidebar.jsx');

var _PogoSidebar2 = _interopRequireDefault(_PogoSidebar);

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

var tileSource = '//maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
var mapStyle = _immutable2.default.fromJS((0, _rasterTileStyle2.default)([tileSource]));

var App = (_class = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _window2.default.addEventListener('resize', _this._onWindowResize);
    _this.state = { width: _window2.default.innerWidth };
    _d2.default.csv("./src/resources/data/sample.csv", function (data) {
      return _this.setState({ data: _immutable2.default.fromJS(_lodash2.default.map(data, function (d) {
          return {
            lat: parseFloat(d.lat),
            lng: parseFloat(d.lng),
            num: d.num };
        })) });
    });
    return _this;
  }

  _createClass(App, [{
    key: '_onWindowResize',
    value: function _onWindowResize() {
      this.setState({ width: _window2.default.innerWidth });
    }
  }, {
    key: 'render',
    value: function render() {
      var common = {
        width: _window2.default.innerWidth,
        height: _window2.default.innerHeight,
        viewport: {
          latitude: 37.7,
          longitude: -122.4,
          zoom: 11
        },
        mapStyle: mapStyle
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_PogoMap2.default, _extends({
          width: this.state.width - 30,
          height: this.state.height,
          locations: this.state.data
        }, common)),
        _react2.default.createElement(_PogoSidebar2.default, null)
      );
    }
  }]);

  return App;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, '_onWindowResize', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onWindowResize'), _class.prototype)), _class);
exports.default = App;


var ss = _document2.default.createElement("link");
ss.type = "text/css";
ss.rel = "stylesheet";
ss.href = "src/style.css";
_document2.default.getElementsByTagName("head")[0].appendChild(ss);

var reactContainer = _document2.default.createElement('div');
_document2.default.body.style.margin = '0';
_document2.default.body.appendChild(reactContainer);
_reactDom2.default.render(_react2.default.createElement(App, null), reactContainer);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOlsidGlsZVNvdXJjZSIsIm1hcFN0eWxlIiwiZnJvbUpTIiwiQXBwIiwicHJvcHMiLCJhZGRFdmVudExpc3RlbmVyIiwiX29uV2luZG93UmVzaXplIiwic3RhdGUiLCJ3aWR0aCIsImlubmVyV2lkdGgiLCJjc3YiLCJkYXRhIiwic2V0U3RhdGUiLCJtYXAiLCJkIiwibGF0IiwicGFyc2VGbG9hdCIsImxuZyIsIm51bSIsImNvbW1vbiIsImhlaWdodCIsImlubmVySGVpZ2h0Iiwidmlld3BvcnQiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInpvb20iLCJzcyIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwicmVsIiwiaHJlZiIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXBwZW5kQ2hpbGQiLCJyZWFjdENvbnRhaW5lciIsImJvZHkiLCJzdHlsZSIsIm1hcmdpbiIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsYUFBYSwrQ0FBakI7QUFDQSxJQUFJQyxXQUFXLG9CQUFVQyxNQUFWLENBQWlCLCtCQUFnQixDQUFDRixVQUFELENBQWhCLENBQWpCLENBQWY7O0lBSXFCRyxHOzs7QUFFbkIsZUFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDBHQUNYQSxLQURXOztBQUVqQixxQkFBT0MsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsTUFBS0MsZUFBdkM7QUFDQSxVQUFLQyxLQUFMLEdBQWEsRUFBQ0MsT0FBTyxpQkFBT0MsVUFBZixFQUFiO0FBQ0EsZ0JBQUdDLEdBQUgsQ0FBTyxpQ0FBUCxFQUEwQyxVQUFDQyxJQUFEO0FBQUEsYUFDeEMsTUFBS0MsUUFBTCxDQUFjLEVBQUNELE1BQU0sb0JBQVVULE1BQVYsQ0FBa0IsaUJBQUVXLEdBQUYsQ0FBTUYsSUFBTixFQUFZLFVBQVNHLENBQVQsRUFBWTtBQUM3RCxpQkFBTztBQUNMQyxpQkFBS0MsV0FBV0YsRUFBRUMsR0FBYixDQURBO0FBRUxFLGlCQUFLRCxXQUFXRixFQUFFRyxHQUFiLENBRkE7QUFHTEMsaUJBQUtKLEVBQUVJLEdBSEYsRUFBUDtBQUdjLFNBSnVCLENBQWxCLENBQVAsRUFBZCxDQUR3QztBQUFBLEtBQTFDO0FBSmlCO0FBVWxCOzs7O3NDQUUyQjtBQUMxQixXQUFLTixRQUFMLENBQWMsRUFBQ0osT0FBTyxpQkFBT0MsVUFBZixFQUFkO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQU1VLFNBQVM7QUFDYlgsZUFBTyxpQkFBT0MsVUFERDtBQUViVyxnQkFBUSxpQkFBT0MsV0FGRjtBQUdiQyxrQkFBVTtBQUNSQyxvQkFBVSxJQURGO0FBRVJDLHFCQUFXLENBQUMsS0FGSjtBQUdSQyxnQkFBTTtBQUhFLFNBSEc7QUFRYnhCLGtCQUFVQTtBQVJHLE9BQWY7O0FBV0EsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUNFLGlCQUFRLEtBQUtNLEtBQUwsQ0FBV0MsS0FBWCxHQUFtQixFQUQ3QjtBQUVFLGtCQUFTLEtBQUtELEtBQUwsQ0FBV2EsTUFGdEI7QUFHRSxxQkFBWSxLQUFLYixLQUFMLENBQVdJO0FBSHpCLFdBSU9RLE1BSlAsRUFERjtBQU1FO0FBTkYsT0FERjtBQVVEOzs7OztrQkF4Q2tCaEIsRzs7O0FBNENyQixJQUFJdUIsS0FBSyxtQkFBU0MsYUFBVCxDQUF1QixNQUF2QixDQUFUO0FBQ0FELEdBQUdFLElBQUgsR0FBVSxVQUFWO0FBQ0FGLEdBQUdHLEdBQUgsR0FBUyxZQUFUO0FBQ0FILEdBQUdJLElBQUgsR0FBVSxlQUFWO0FBQ0EsbUJBQVNDLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLEVBQXlDQyxXQUF6QyxDQUFxRE4sRUFBckQ7O0FBRUEsSUFBSU8saUJBQWlCLG1CQUFTTixhQUFULENBQXVCLEtBQXZCLENBQXJCO0FBQ0EsbUJBQVNPLElBQVQsQ0FBY0MsS0FBZCxDQUFvQkMsTUFBcEIsR0FBNkIsR0FBN0I7QUFDQSxtQkFBU0YsSUFBVCxDQUFjRixXQUFkLENBQTBCQyxjQUExQjtBQUNBLG1CQUFTSSxNQUFULENBQWdCLDhCQUFDLEdBQUQsT0FBaEIsRUFBd0JKLGNBQXhCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3VtZW50IGZyb20gJ2dsb2JhbC9kb2N1bWVudCc7XG5pbXBvcnQgd2luZG93IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzLCBDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IE1hcEdMIGZyb20gJ3JlYWN0LW1hcC1nbCc7XG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xuaW1wb3J0IGxvY2F0aW9ucyBmcm9tICdleGFtcGxlLWNpdGllcyc7XG5pbXBvcnQgcmFzdGVyVGlsZVN0eWxlIGZyb20gJ3Jhc3Rlci10aWxlLXN0eWxlJztcblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IGQzIGZyb20gJ2QzJ1xuXG5pbXBvcnQgYXV0b2JpbmQgZnJvbSAnYXV0b2JpbmQtZGVjb3JhdG9yJztcblxuaW1wb3J0IFBvZ29NYXAgZnJvbSAnLi9jb21wb25lbnRzL1BvZ29NYXAuanN4JztcbmltcG9ydCBQb2dvU2lkZWJhciBmcm9tICcuL2NvbXBvbmVudHMvUG9nb1NpZGViYXIuanN4JztcblxudmFyIHRpbGVTb3VyY2UgPSAnLy9tYXBzLndpa2ltZWRpYS5vcmcvb3NtLWludGwve3p9L3t4fS97eX0ucG5nJztcbnZhciBtYXBTdHlsZSA9IEltbXV0YWJsZS5mcm9tSlMocmFzdGVyVGlsZVN0eWxlKFt0aWxlU291cmNlXSkpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fb25XaW5kb3dSZXNpemUpO1xuICAgIHRoaXMuc3RhdGUgPSB7d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRofTtcbiAgICBkMy5jc3YoXCIuL3NyYy9yZXNvdXJjZXMvZGF0YS9zYW1wbGUuY3N2XCIsIChkYXRhKSA9PlxuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogSW1tdXRhYmxlLmZyb21KUyggXy5tYXAoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGxhdDogcGFyc2VGbG9hdChkLmxhdCksXG4gICAgICAgICAgbG5nOiBwYXJzZUZsb2F0KGQubG5nKSxcbiAgICAgICAgICBudW06IGQubnVtfX0pICl9KSk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uV2luZG93UmVzaXplKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3dpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbW1vbiA9IHtcbiAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgdmlld3BvcnQ6IHtcbiAgICAgICAgbGF0aXR1ZGU6IDM3LjcsXG4gICAgICAgIGxvbmdpdHVkZTogLTEyMi40LFxuICAgICAgICB6b29tOiAxMVxuICAgICAgfSxcbiAgICAgIG1hcFN0eWxlOiBtYXBTdHlsZSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxQb2dvTWFwXG4gICAgICAgICAgd2lkdGg9eyB0aGlzLnN0YXRlLndpZHRoIC0gMzAgfVxuICAgICAgICAgIGhlaWdodD17IHRoaXMuc3RhdGUuaGVpZ2h0IH1cbiAgICAgICAgICBsb2NhdGlvbnM9eyB0aGlzLnN0YXRlLmRhdGEgfVxuICAgICAgICAgIHsgLi4uY29tbW9uIH0gLz5cbiAgICAgICAgPFBvZ29TaWRlYmFyIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblxudmFyIHNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5zcy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuc3MucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5zcy5ocmVmID0gXCJzcmMvc3R5bGUuY3NzXCI7XG5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3MpO1xuXG52YXIgcmVhY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmRvY3VtZW50LmJvZHkuc3R5bGUubWFyZ2luID0gJzAnO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZWFjdENvbnRhaW5lcik7XG5SZWFjdERPTS5yZW5kZXIoPEFwcC8+LCByZWFjdENvbnRhaW5lcik7XG4iXX0=