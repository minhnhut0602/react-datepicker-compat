var React = require('react');
var DateUtil = require('./util/date');
var cloneFunction = require('clone');

var DateInput = React.createClass({

  propTypes:{
    name: React.PropTypes.string,
    placeholderText: React.PropTypes.string,
    id: React.PropTypes.string.isRequired,
    locale: React.PropTypes.string,
    moment: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      dateFormat: 'YYYY-MM-DD'
    };
  },

  getInitialState: function() {
    var moment = cloneFunction(this.props.moment);
    moment.locale(nextProps.locale);
    return {
      value: this.safeDateFormat(this.props.date),
      moment: moment
    };
  },

  componentDidMount: function() {
    this.toggleFocus(this.props.focus);
  },

  componentWillReceiveProps: function(nextProps) {
    this.toggleFocus(nextProps.focus);
    this.setState({
      value: this.safeDateFormat(nextProps.date)
   });
  
  },

  toggleFocus: function(focus) {
    if (focus) {
      if('findDOMNode' in React){
      React.findDOMNode(this.refs.input).focus();
      } else {
        this.refs.input.getDOMNode().focus();
      }
    } else {
      if('findDOMNode' in React){
      React.findDOMNode(this.refs.input).blur();
      } else {
        this.refs.input.getDOMNode().blur();
      }

    }
  },

  handleChange: function(event) {
    var date = this.state.moment(event.target.value, this.props.dateFormat, true);

    this.setState({
      value: event.target.value
    });

    if (date.isValid()) {
      this.props.setSelected(new DateUtil(date));
    } else if (event.target.value === '') {
      this.props.clearSelected();
    }
  },

  safeDateFormat: function(date) {
    return !! date ? date.format(this.props.dateFormat) : null;
  },

  handleKeyDown: function(event) {
    switch(event.key) {
    case "Enter":
      event.preventDefault();
      this.props.handleEnter();
      break;
    }
  },

  handleClick: function(event) {
    this.props.handleClick(event);
  },

  render: function() {
    return <input
      ref="input"
      type="text"
      name={this.props.name}
      id={this.props.id}
      value={this.state.value}
      onClick={this.handleClick}
      onKeyDown={this.handleKeyDown}
      onFocus={this.props.onFocus}
      onChange={this.handleChange}
      className="datepicker__input"
      placeholder={this.props.placeholderText} />;
  }
});

module.exports = DateInput;
