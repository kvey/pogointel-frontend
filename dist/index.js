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

      var allData = _immutable2.default.fromJS(_lodash2.default.map(data, function (d) {
        return {
          lat: parseFloat(d.lat),
          lng: parseFloat(d.lng),
          num: parseInt(d.num) };
      }));

      this.setState({ data: allData,
        filteredData: allData });
    }.bind(_this));
    return _this;
  }

  _createClass(App, [{
    key: '_onWindowResize',
    value: function _onWindowResize() {
      this.setState({ width: _window2.default.innerWidth });
    }
  }, {
    key: '_handleMonClick',
    value: function _handleMonClick(monNum) {
      this.setState({
        filteredData: this.state.data.filter(function (m) {
          return m.get('num') == monNum;
        })
      });
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
          zoom: 1
        },
        mapStyle: mapStyle
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_PogoMap2.default, _extends({
          width: this.state.width - 30,
          height: this.state.height,
          locations: this.state.filteredData
        }, common)),
        _react2.default.createElement(_PogoSidebar2.default, {
          onMonClick: this._handleMonClick
        })
      );
    }
  }]);

  return App;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, '_onWindowResize', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onWindowResize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_handleMonClick', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_handleMonClick'), _class.prototype)), _class);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOlsidGlsZVNvdXJjZSIsIm1hcFN0eWxlIiwiZnJvbUpTIiwiQXBwIiwicHJvcHMiLCJhZGRFdmVudExpc3RlbmVyIiwiX29uV2luZG93UmVzaXplIiwic3RhdGUiLCJ3aWR0aCIsImlubmVyV2lkdGgiLCJjc3YiLCJkYXRhIiwiYWxsRGF0YSIsIm1hcCIsImQiLCJsYXQiLCJwYXJzZUZsb2F0IiwibG5nIiwibnVtIiwicGFyc2VJbnQiLCJzZXRTdGF0ZSIsImZpbHRlcmVkRGF0YSIsImJpbmQiLCJtb25OdW0iLCJmaWx0ZXIiLCJtIiwiZ2V0IiwiY29tbW9uIiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJ2aWV3cG9ydCIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiem9vbSIsIl9oYW5kbGVNb25DbGljayIsInNzIiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJyZWwiLCJocmVmIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhcHBlbmRDaGlsZCIsInJlYWN0Q29udGFpbmVyIiwiYm9keSIsInN0eWxlIiwibWFyZ2luIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxhQUFhLCtDQUFqQjtBQUNBLElBQUlDLFdBQVcsb0JBQVVDLE1BQVYsQ0FBaUIsK0JBQWdCLENBQUNGLFVBQUQsQ0FBaEIsQ0FBakIsQ0FBZjs7SUFJcUJHLEc7OztBQUVuQixlQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMEdBQ1hBLEtBRFc7O0FBRWpCLHFCQUFPQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxNQUFLQyxlQUF2QztBQUNBLFVBQUtDLEtBQUwsR0FBYSxFQUFDQyxPQUFPLGlCQUFPQyxVQUFmLEVBQWI7QUFDQSxnQkFBR0MsR0FBSCxDQUFPLGlDQUFQLEVBQTBDLFVBQVNDLElBQVQsRUFBYzs7QUFFdEQsVUFBTUMsVUFBVSxvQkFBVVYsTUFBVixDQUFrQixpQkFBRVcsR0FBRixDQUFNRixJQUFOLEVBQVksVUFBU0csQ0FBVCxFQUFZO0FBQ3hELGVBQU87QUFDTEMsZUFBS0MsV0FBV0YsRUFBRUMsR0FBYixDQURBO0FBRUxFLGVBQUtELFdBQVdGLEVBQUVHLEdBQWIsQ0FGQTtBQUdMQyxlQUFLQyxTQUFTTCxFQUFFSSxHQUFYLENBSEEsRUFBUDtBQUd3QixPQUpRLENBQWxCLENBQWhCOztBQU1BLFdBQUtFLFFBQUwsQ0FBYyxFQUFDVCxNQUFNQyxPQUFQO0FBQ0NTLHNCQUFjVCxPQURmLEVBQWQ7QUFFRCxLQVZ5QyxDQVV4Q1UsSUFWd0MsT0FBMUM7QUFKaUI7QUFlbEI7Ozs7c0NBRTJCO0FBQzFCLFdBQUtGLFFBQUwsQ0FBYyxFQUFDWixPQUFPLGlCQUFPQyxVQUFmLEVBQWQ7QUFDRDs7O29DQUV5QmMsTSxFQUFRO0FBQ2hDLFdBQUtILFFBQUwsQ0FBYztBQUNaQyxzQkFBYyxLQUFLZCxLQUFMLENBQVdJLElBQVgsQ0FBZ0JhLE1BQWhCLENBQXVCLFVBQUNDLENBQUQ7QUFBQSxpQkFBT0EsRUFBRUMsR0FBRixDQUFNLEtBQU4sS0FBZ0JILE1BQXZCO0FBQUEsU0FBdkI7QUFERixPQUFkO0FBR0Q7Ozs2QkFFUTtBQUNQLFVBQU1JLFNBQVM7QUFDYm5CLGVBQU8saUJBQU9DLFVBREQ7QUFFYm1CLGdCQUFRLGlCQUFPQyxXQUZGO0FBR2JDLGtCQUFVO0FBQ1JDLG9CQUFVLElBREY7QUFFUkMscUJBQVcsQ0FBQyxLQUZKO0FBR1JDLGdCQUFNO0FBSEUsU0FIRztBQVFiaEMsa0JBQVVBO0FBUkcsT0FBZjs7QUFXQSxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQ0UsaUJBQVEsS0FBS00sS0FBTCxDQUFXQyxLQUFYLEdBQW1CLEVBRDdCO0FBRUUsa0JBQVMsS0FBS0QsS0FBTCxDQUFXcUIsTUFGdEI7QUFHRSxxQkFBWSxLQUFLckIsS0FBTCxDQUFXYztBQUh6QixXQUlPTSxNQUpQLEVBREY7QUFNRTtBQUNFLHNCQUFZLEtBQUtPO0FBRG5CO0FBTkYsT0FERjtBQVlEOzs7OztrQkFyRGtCL0IsRzs7O0FBeURyQixJQUFJZ0MsS0FBSyxtQkFBU0MsYUFBVCxDQUF1QixNQUF2QixDQUFUO0FBQ0FELEdBQUdFLElBQUgsR0FBVSxVQUFWO0FBQ0FGLEdBQUdHLEdBQUgsR0FBUyxZQUFUO0FBQ0FILEdBQUdJLElBQUgsR0FBVSxlQUFWO0FBQ0EsbUJBQVNDLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLEVBQXlDQyxXQUF6QyxDQUFxRE4sRUFBckQ7O0FBRUEsSUFBSU8saUJBQWlCLG1CQUFTTixhQUFULENBQXVCLEtBQXZCLENBQXJCO0FBQ0EsbUJBQVNPLElBQVQsQ0FBY0MsS0FBZCxDQUFvQkMsTUFBcEIsR0FBNkIsR0FBN0I7QUFDQSxtQkFBU0YsSUFBVCxDQUFjRixXQUFkLENBQTBCQyxjQUExQjtBQUNBLG1CQUFTSSxNQUFULENBQWdCLDhCQUFDLEdBQUQsT0FBaEIsRUFBd0JKLGNBQXhCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3VtZW50IGZyb20gJ2dsb2JhbC9kb2N1bWVudCc7XG5pbXBvcnQgd2luZG93IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzLCBDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IE1hcEdMIGZyb20gJ3JlYWN0LW1hcC1nbCc7XG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xuaW1wb3J0IGxvY2F0aW9ucyBmcm9tICdleGFtcGxlLWNpdGllcyc7XG5pbXBvcnQgcmFzdGVyVGlsZVN0eWxlIGZyb20gJ3Jhc3Rlci10aWxlLXN0eWxlJztcblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IGQzIGZyb20gJ2QzJ1xuXG5pbXBvcnQgYXV0b2JpbmQgZnJvbSAnYXV0b2JpbmQtZGVjb3JhdG9yJztcblxuaW1wb3J0IFBvZ29NYXAgZnJvbSAnLi9jb21wb25lbnRzL1BvZ29NYXAuanN4JztcbmltcG9ydCBQb2dvU2lkZWJhciBmcm9tICcuL2NvbXBvbmVudHMvUG9nb1NpZGViYXIuanN4JztcblxudmFyIHRpbGVTb3VyY2UgPSAnLy9tYXBzLndpa2ltZWRpYS5vcmcvb3NtLWludGwve3p9L3t4fS97eX0ucG5nJztcbnZhciBtYXBTdHlsZSA9IEltbXV0YWJsZS5mcm9tSlMocmFzdGVyVGlsZVN0eWxlKFt0aWxlU291cmNlXSkpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fb25XaW5kb3dSZXNpemUpO1xuICAgIHRoaXMuc3RhdGUgPSB7d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRofTtcbiAgICBkMy5jc3YoXCIuL3NyYy9yZXNvdXJjZXMvZGF0YS9zYW1wbGUuY3N2XCIsIGZ1bmN0aW9uKGRhdGEpe1xuXG4gICAgICBjb25zdCBhbGxEYXRhID0gSW1tdXRhYmxlLmZyb21KUyggXy5tYXAoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGxhdDogcGFyc2VGbG9hdChkLmxhdCksXG4gICAgICAgICAgbG5nOiBwYXJzZUZsb2F0KGQubG5nKSxcbiAgICAgICAgICBudW06IHBhcnNlSW50KGQubnVtKX19KSk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IGFsbERhdGEsXG4gICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZERhdGE6IGFsbERhdGF9KTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgQGF1dG9iaW5kIF9vbldpbmRvd1Jlc2l6ZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt3aWR0aDogd2luZG93LmlubmVyV2lkdGh9KTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfaGFuZGxlTW9uQ2xpY2sobW9uTnVtKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBmaWx0ZXJlZERhdGE6IHRoaXMuc3RhdGUuZGF0YS5maWx0ZXIoKG0pID0+IG0uZ2V0KCdudW0nKSA9PSBtb25OdW0gKVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbW1vbiA9IHtcbiAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgdmlld3BvcnQ6IHtcbiAgICAgICAgbGF0aXR1ZGU6IDM3LjcsXG4gICAgICAgIGxvbmdpdHVkZTogLTEyMi40LFxuICAgICAgICB6b29tOiAxXG4gICAgICB9LFxuICAgICAgbWFwU3R5bGU6IG1hcFN0eWxlLFxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFBvZ29NYXBcbiAgICAgICAgICB3aWR0aD17IHRoaXMuc3RhdGUud2lkdGggLSAzMCB9XG4gICAgICAgICAgaGVpZ2h0PXsgdGhpcy5zdGF0ZS5oZWlnaHQgfVxuICAgICAgICAgIGxvY2F0aW9ucz17IHRoaXMuc3RhdGUuZmlsdGVyZWREYXRhIH1cbiAgICAgICAgICB7IC4uLmNvbW1vbiB9IC8+XG4gICAgICAgIDxQb2dvU2lkZWJhclxuICAgICAgICAgIG9uTW9uQ2xpY2s9e3RoaXMuX2hhbmRsZU1vbkNsaWNrfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5cbnZhciBzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuc3MudHlwZSA9IFwidGV4dC9jc3NcIjtcbnNzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuc3MuaHJlZiA9IFwic3JjL3N0eWxlLmNzc1wiO1xuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHNzKTtcblxudmFyIHJlYWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5kb2N1bWVudC5ib2R5LnN0eWxlLm1hcmdpbiA9ICcwJztcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVhY3RDb250YWluZXIpO1xuUmVhY3RET00ucmVuZGVyKDxBcHAvPiwgcmVhY3RDb250YWluZXIpO1xuIl19