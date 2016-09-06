'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mon = require('../resources/data/mon.en');

var _mon2 = _interopRequireDefault(_mon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var monWithNum = _lodash2.default.mapValues(_mon2.default, function (v, k, o) {
  return _lodash2.default.merge(v, { 'Num': k });
});
var monByGroup = _lodash2.default.groupBy(_lodash2.default.values(monWithNum), "EvolutionGroup");

var PogoSidebar = function (_Component) {
  _inherits(PogoSidebar, _Component);

  function PogoSidebar() {
    _classCallCheck(this, PogoSidebar);

    return _possibleConstructorReturn(this, (PogoSidebar.__proto__ || Object.getPrototypeOf(PogoSidebar)).apply(this, arguments));
  }

  _createClass(PogoSidebar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'PogoSidebar' },
        _lodash2.default.values(_lodash2.default.mapValues(monByGroup, function (monGroup) {
          return _react2.default.createElement(
            'div',
            { className: 'PogoSidebar__group' },
            _lodash2.default.map(monGroup, function (m) {
              return _react2.default.createElement(
                'div',
                { className: 'PogoSidebar__mon' },
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
            })
          );
        }))
      );
    }
  }]);

  return PogoSidebar;
}(_react.Component);

exports.default = PogoSidebar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1BvZ29TaWRlYmFyLmpzeCJdLCJuYW1lcyI6WyJtb25XaXRoTnVtIiwibWFwVmFsdWVzIiwidiIsImsiLCJvIiwibWVyZ2UiLCJtb25CeUdyb3VwIiwiZ3JvdXBCeSIsInZhbHVlcyIsIlBvZ29TaWRlYmFyIiwibW9uR3JvdXAiLCJtYXAiLCJtIiwibG93ZXJDYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhLGlCQUFFQyxTQUFGLGdCQUFpQixVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBT0MsQ0FBUDtBQUFBLFNBQWEsaUJBQUVDLEtBQUYsQ0FBUUgsQ0FBUixFQUFXLEVBQUMsT0FBT0MsQ0FBUixFQUFYLENBQWI7QUFBQSxDQUFqQixDQUFuQjtBQUNBLElBQU1HLGFBQWEsaUJBQUVDLE9BQUYsQ0FBVSxpQkFBRUMsTUFBRixDQUFTUixVQUFULENBQVYsRUFBZ0MsZ0JBQWhDLENBQW5COztJQUdxQlMsVzs7Ozs7Ozs7Ozs7NkJBQ1Y7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUNHLHlCQUFFRCxNQUFGLENBQVMsaUJBQUVQLFNBQUYsQ0FBWUssVUFBWixFQUF3QixVQUFDSSxRQUFEO0FBQUEsaUJBQ2hDO0FBQUE7QUFBQSxjQUFLLFdBQVUsb0JBQWY7QUFDRyw2QkFBRUMsR0FBRixDQUFNRCxRQUFOLEVBQWdCLFVBQUNFLENBQUQ7QUFBQSxxQkFDZjtBQUFBO0FBQUEsa0JBQUssV0FBVSxrQkFBZjtBQUNFO0FBQUE7QUFBQSxvQkFBSyxXQUFVLHdCQUFmO0FBQ0dBLG9CQUFFLE1BQUY7QUFESCxpQkFERjtBQUlFO0FBQUE7QUFBQSxvQkFBSyxXQUFVLHlCQUFmO0FBQ0UseURBQUssS0FBSywwQkFBd0JBLEVBQUUsS0FBRixDQUF4QixHQUFpQyxNQUEzQztBQURGLGlCQUpGO0FBT0U7QUFBQTtBQUFBLG9CQUFLLFdBQVcsNEJBQ0Esb0JBREEsR0FDcUIsaUJBQUVDLFNBQUYsQ0FBWUQsRUFBRSxPQUFGLENBQVosQ0FEckM7QUFFR0Esb0JBQUUsT0FBRjtBQUZILGlCQVBGO0FBV0U7QUFBQTtBQUFBLG9CQUFLLFdBQVcsNEJBQ0Esb0JBREEsR0FDcUIsaUJBQUVDLFNBQUYsQ0FBWUQsRUFBRSxPQUFGLENBQVosQ0FEckM7QUFFR0Esb0JBQUUsT0FBRjtBQUZIO0FBWEYsZUFEZTtBQUFBLGFBQWhCO0FBREgsV0FEZ0M7QUFBQSxTQUF4QixDQUFUO0FBREgsT0FERjtBQTBCRDs7Ozs7O2tCQTVCa0JILFciLCJmaWxlIjoiUG9nb1NpZGViYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXMsIENvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmltcG9ydCBtb24gZnJvbSAnLi4vcmVzb3VyY2VzL2RhdGEvbW9uLmVuJztcblxuY29uc3QgbW9uV2l0aE51bSA9IF8ubWFwVmFsdWVzKG1vbiwgKHYsIGssIG8pID0+IF8ubWVyZ2UodiwgeydOdW0nOiBrfSkpXG5jb25zdCBtb25CeUdyb3VwID0gXy5ncm91cEJ5KF8udmFsdWVzKG1vbldpdGhOdW0pLCBcIkV2b2x1dGlvbkdyb3VwXCIpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvZ29TaWRlYmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlBvZ29TaWRlYmFyXCI+XG4gICAgICAgIHtfLnZhbHVlcyhfLm1hcFZhbHVlcyhtb25CeUdyb3VwLCAobW9uR3JvdXApID0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQb2dvU2lkZWJhcl9fZ3JvdXBcIj5cbiAgICAgICAgICAgIHtfLm1hcChtb25Hcm91cCwgKG0pID0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUG9nb1NpZGViYXJfX21vblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUG9nb1NpZGViYXJfX21vbi0tbmFtZVwiPlxuICAgICAgICAgICAgICAgICAge21bJ05hbWUnXX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlBvZ29TaWRlYmFyX19tb24tLWltYWdlXCI+XG4gICAgICAgICAgICAgICAgICA8aW1nIHNyYz17XCIvc3JjL3Jlc291cmNlcy9pY29ucy9cIittWydOdW0nXStcIi5wbmdcIn0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIlBvZ29TaWRlYmFyX190eXBlLWljb24gXCIrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUG9nb1NpZGViYXJfX3R5cGUtXCIrXy5sb3dlckNhc2UobVsnVHlwZTEnXSl9PlxuICAgICAgICAgICAgICAgICAge21bJ1R5cGUxJ119XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiUG9nb1NpZGViYXJfX3R5cGUtaWNvbiBcIitcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQb2dvU2lkZWJhcl9fdHlwZS1cIitfLmxvd2VyQ2FzZShtWydUeXBlMiddKX0+XG4gICAgICAgICAgICAgICAgICB7bVsnVHlwZTInXX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19