'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _mon = require('../resources/data/mon.en');

var _mon2 = _interopRequireDefault(_mon);

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

var monWithNum = _lodash2.default.mapValues(_mon2.default, function (v, k, o) {
  return _lodash2.default.merge(v, { 'Num': k });
});
var monByGroup = _lodash2.default.groupBy(_lodash2.default.values(monWithNum), "EvolutionGroup");

var PogoSidebarMon = (_class = function (_Component) {
  _inherits(PogoSidebarMon, _Component);

  function PogoSidebarMon() {
    _classCallCheck(this, PogoSidebarMon);

    return _possibleConstructorReturn(this, (PogoSidebarMon.__proto__ || Object.getPrototypeOf(PogoSidebarMon)).apply(this, arguments));
  }

  _createClass(PogoSidebarMon, [{
    key: 'handleMonClick',
    value: function handleMonClick() {
      this.props.onMonClick(parseInt(this.props.mon['Num']));
    }
  }, {
    key: 'render',
    value: function render() {
      var m = this.props.mon;

      return _react2.default.createElement(
        'div',
        { className: 'PogoSidebar__mon',
          onClick: this.handleMonClick },
        _react2.default.createElement(
          'div',
          { className: 'PogoSidebar__mon--name' },
          m['Name']
        ),
        _react2.default.createElement(
          'div',
          { className: 'PogoSidebar__mon--image' },
          _react2.default.createElement('img', { src: "/src/resources/icons/" + m['Num'] + ".png" })
        ),
        _react2.default.createElement(
          'div',
          { className: "PogoSidebar__type-icon " + "PogoSidebar__type-" + _lodash2.default.lowerCase(m['Type1']) },
          m['Type1']
        ),
        _react2.default.createElement(
          'div',
          { className: "PogoSidebar__type-icon " + "PogoSidebar__type-" + _lodash2.default.lowerCase(m['Type2']) },
          m['Type2']
        )
      );
    }
  }]);

  return PogoSidebarMon;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, 'handleMonClick', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMonClick'), _class.prototype)), _class);

var PogoSidebar = function (_Component2) {
  _inherits(PogoSidebar, _Component2);

  function PogoSidebar() {
    _classCallCheck(this, PogoSidebar);

    return _possibleConstructorReturn(this, (PogoSidebar.__proto__ || Object.getPrototypeOf(PogoSidebar)).apply(this, arguments));
  }

  _createClass(PogoSidebar, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'PogoSidebar' },
        _lodash2.default.values(_lodash2.default.mapValues(monByGroup, function (monGroup) {
          return _react2.default.createElement(
            'div',
            { className: 'PogoSidebar__group' },
            _lodash2.default.map(monGroup, function (m) {
              return _react2.default.createElement(PogoSidebarMon, { mon: m, onMonClick: _this3.props.onMonClick });
            })
          );
        }))
      );
    }
  }]);

  return PogoSidebar;
}(_react.Component);

exports.default = PogoSidebar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1BvZ29TaWRlYmFyLmpzeCJdLCJuYW1lcyI6WyJtb25XaXRoTnVtIiwibWFwVmFsdWVzIiwidiIsImsiLCJvIiwibWVyZ2UiLCJtb25CeUdyb3VwIiwiZ3JvdXBCeSIsInZhbHVlcyIsIlBvZ29TaWRlYmFyTW9uIiwicHJvcHMiLCJvbk1vbkNsaWNrIiwicGFyc2VJbnQiLCJtb24iLCJtIiwiaGFuZGxlTW9uQ2xpY2siLCJsb3dlckNhc2UiLCJQb2dvU2lkZWJhciIsIm1vbkdyb3VwIiwibWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhLGlCQUFFQyxTQUFGLGdCQUFpQixVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBT0MsQ0FBUDtBQUFBLFNBQWEsaUJBQUVDLEtBQUYsQ0FBUUgsQ0FBUixFQUFXLEVBQUMsT0FBT0MsQ0FBUixFQUFYLENBQWI7QUFBQSxDQUFqQixDQUFuQjtBQUNBLElBQU1HLGFBQWEsaUJBQUVDLE9BQUYsQ0FBVSxpQkFBRUMsTUFBRixDQUFTUixVQUFULENBQVYsRUFBZ0MsZ0JBQWhDLENBQW5COztJQUVNUyxjOzs7Ozs7Ozs7OztxQ0FFc0I7QUFDeEIsV0FBS0MsS0FBTCxDQUFXQyxVQUFYLENBQXNCQyxTQUFVLEtBQUtGLEtBQUwsQ0FBV0csR0FBWCxDQUFlLEtBQWYsQ0FBVixDQUF0QjtBQUNEOzs7NkJBRU87QUFDTixVQUFNQyxJQUFJLEtBQUtKLEtBQUwsQ0FBV0csR0FBckI7O0FBRUEsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGtCQUFmO0FBQ0UsbUJBQVMsS0FBS0UsY0FEaEI7QUFFRTtBQUFBO0FBQUEsWUFBSyxXQUFVLHdCQUFmO0FBQ0dELFlBQUUsTUFBRjtBQURILFNBRkY7QUFLRTtBQUFBO0FBQUEsWUFBSyxXQUFVLHlCQUFmO0FBQ0UsaURBQUssS0FBSywwQkFBd0JBLEVBQUUsS0FBRixDQUF4QixHQUFpQyxNQUEzQztBQURGLFNBTEY7QUFRRTtBQUFBO0FBQUEsWUFBSyxXQUFXLDRCQUNBLG9CQURBLEdBQ3FCLGlCQUFFRSxTQUFGLENBQVlGLEVBQUUsT0FBRixDQUFaLENBRHJDO0FBRUdBLFlBQUUsT0FBRjtBQUZILFNBUkY7QUFZRTtBQUFBO0FBQUEsWUFBSyxXQUFXLDRCQUNBLG9CQURBLEdBQ3FCLGlCQUFFRSxTQUFGLENBQVlGLEVBQUUsT0FBRixDQUFaLENBRHJDO0FBRUdBLFlBQUUsT0FBRjtBQUZIO0FBWkYsT0FERjtBQW1CRDs7Ozs7O0lBS2tCRyxXOzs7Ozs7Ozs7Ozs2QkFFVjtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxhQUFmO0FBQ0cseUJBQUVULE1BQUYsQ0FBUyxpQkFBRVAsU0FBRixDQUFZSyxVQUFaLEVBQXdCLFVBQUNZLFFBQUQ7QUFBQSxpQkFDaEM7QUFBQTtBQUFBLGNBQUssV0FBVSxvQkFBZjtBQUNHLDZCQUFFQyxHQUFGLENBQU1ELFFBQU4sRUFBZ0IsVUFBQ0osQ0FBRDtBQUFBLHFCQUNmLDhCQUFDLGNBQUQsSUFBZ0IsS0FBS0EsQ0FBckIsRUFBd0IsWUFBWSxPQUFLSixLQUFMLENBQVdDLFVBQS9DLEdBRGU7QUFBQSxhQUFoQjtBQURILFdBRGdDO0FBQUEsU0FBeEIsQ0FBVDtBQURILE9BREY7QUFXRDs7Ozs7O2tCQWRrQk0sVyIsImZpbGUiOiJQb2dvU2lkZWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlcywgQ29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBJbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBhdXRvYmluZCBmcm9tICdhdXRvYmluZC1kZWNvcmF0b3InO1xuXG5pbXBvcnQgbW9uIGZyb20gJy4uL3Jlc291cmNlcy9kYXRhL21vbi5lbic7XG5cbmNvbnN0IG1vbldpdGhOdW0gPSBfLm1hcFZhbHVlcyhtb24sICh2LCBrLCBvKSA9PiBfLm1lcmdlKHYsIHsnTnVtJzoga30pKVxuY29uc3QgbW9uQnlHcm91cCA9IF8uZ3JvdXBCeShfLnZhbHVlcyhtb25XaXRoTnVtKSwgXCJFdm9sdXRpb25Hcm91cFwiKTtcblxuY2xhc3MgUG9nb1NpZGViYXJNb24gZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIEBhdXRvYmluZCBoYW5kbGVNb25DbGljaygpe1xuICAgIHRoaXMucHJvcHMub25Nb25DbGljayhwYXJzZUludCggdGhpcy5wcm9wcy5tb25bJ051bSddICkpO1xuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgY29uc3QgbSA9IHRoaXMucHJvcHMubW9uO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUG9nb1NpZGViYXJfX21vblwiXG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTW9uQ2xpY2t9ID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQb2dvU2lkZWJhcl9fbW9uLS1uYW1lXCI+XG4gICAgICAgICAge21bJ05hbWUnXX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUG9nb1NpZGViYXJfX21vbi0taW1hZ2VcIj5cbiAgICAgICAgICA8aW1nIHNyYz17XCIvc3JjL3Jlc291cmNlcy9pY29ucy9cIittWydOdW0nXStcIi5wbmdcIn0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiUG9nb1NpZGViYXJfX3R5cGUtaWNvbiBcIitcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUG9nb1NpZGViYXJfX3R5cGUtXCIrXy5sb3dlckNhc2UobVsnVHlwZTEnXSl9PlxuICAgICAgICAgIHttWydUeXBlMSddfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiUG9nb1NpZGViYXJfX3R5cGUtaWNvbiBcIitcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUG9nb1NpZGViYXJfX3R5cGUtXCIrXy5sb3dlckNhc2UobVsnVHlwZTInXSl9PlxuICAgICAgICAgIHttWydUeXBlMiddfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9nb1NpZGViYXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJQb2dvU2lkZWJhclwiPlxuICAgICAgICB7Xy52YWx1ZXMoXy5tYXBWYWx1ZXMobW9uQnlHcm91cCwgKG1vbkdyb3VwKSA9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUG9nb1NpZGViYXJfX2dyb3VwXCI+XG4gICAgICAgICAgICB7Xy5tYXAobW9uR3JvdXAsIChtKSA9PlxuICAgICAgICAgICAgICA8UG9nb1NpZGViYXJNb24gbW9uPXttfSBvbk1vbkNsaWNrPXt0aGlzLnByb3BzLm9uTW9uQ2xpY2t9Lz5cbiAgICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=