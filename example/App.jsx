var React = require('react');
var DatePicker = require('../src/datepicker');
var moment = require('moment');

var exampleComponent = React.createClass({
  displayName: 'exampleComponent',

  getInitialState: function() {
    return {
      start_date: moment(),
      end_date: moment(),
      new_date: null,
      bound_date: null,
      example5Selected: null
    };
  },

  handleStartDateChange: function(date) {
    this.setState({
      start_date: date
    });
  },

  handleEndDateChange: function(date) {
    this.setState({
      end_date: date
    });
  },

  handleNewDateChange: function(date) {
    this.setState({
      new_date: date
    });
  },

  handleBoundDateChange: function(date) {
    this.setState({
      bound_date: date
    });
  },

  handleExample5Change: function(date) {
    this.setState({
      example5Selected: date
    });
  },

  render: function() {
    return <div>
      <DatePicker
        locale="hu"
        key="example1"
        selected={this.state.start_date}
        onChange={this.handleStartDateChange}
      />
      <DatePicker
        key="example2"
        dateFormat="YYYY/MM/DD"
        locale="nb"
        selected={this.state.end_date}
        onChange={this.handleEndDateChange}
      />
      <DatePicker
        key="example3"
        locale="fr"
        selected={this.state.new_date}
        onChange={this.handleNewDateChange}
        placeholderText="(fr) Click to select a date"
      />
      <DatePicker
        key="example4"
        locale="fi"
        selected={this.state.bound_date}
        onChange={this.handleBoundDateChange}
        minDate={moment()}
        maxDate={moment().add(5, 'days')}
        placeholderText="(fi) Pick a date between today and 15 days in the future"
      />
      <DatePicker
        key="example5"
        locale="nn"
        selected={this.state.example5Selected}
        onChange={this.handleExample5Change}
        weekStart="0"
        placeholderText="(nn) I start on Sunday!"
      />
    </div>;
  }
});


module.exports = exampleComponent;
