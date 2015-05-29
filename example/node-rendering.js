require('babel/register');

var React = require('react');
var moment = require('moment');
var DatePicker = require('../dist/react-datepicker-compat.js');

var Example = React.createClass({
  getInitialState: function () {
    return {date: moment()};
  },
  onChange: function () {},
  render: function () {
    return React.createElement(
      DatePicker,
      {
        locale: 'nb',
        selected: this.state.date,
        onChange: this.handleChange
      }
    );
  }
});

var html = React.renderToString(React.createElement(Example));
console.log(html);
