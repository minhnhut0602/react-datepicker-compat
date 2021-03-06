var React = require('react');
var Day = require('./day');
var DateUtil = require('./util/date');
var cloneFunction = require('clone');

var Calendar = React.createClass({
  mixins: [require('react-onclickoutside')],

  propTypes:{
    weekStart: React.PropTypes.string,
    id: React.PropTypes.string,
    locale: React.PropTypes.string.isRequired,
    moment: React.PropTypes.func.isRequired
  },

  handleClickOutside: function() {
    this.props.hideCalendar();
  },

  getInitialState: function() {
    return {
      date: new DateUtil(this.props.selected).safeClone(this.props.moment())
    };
  },

  componentDidMount: function() {
    this.initializeMomentLocale();
  },


  componentWillReceiveProps: function(nextProps) {
    if(!this.state.moment){
      var newMoment = cloneFunction(nextProps.moment);
      newMoment.locale(nextProps.locale);

      this.setState({
        moment:newMoment,
        date: new DateUtil(this.props.selected).safeClone(newMoment())
      });
    }

    if (nextProps.selected === null) { return; }

    // When the selected date changed
    if (nextProps.selected !== this.props.selected) {
      this.setState({
        date: new DateUtil(nextProps.selected).clone()
      });
    }
  },

  initializeMomentLocale: function() {
    if(this.state.moment){
      var newMoment = this.state.moment;
      newMoment.locale(this.props.locale, {
        week: {
          dow: this.props.weekStart
        }
      });

      this.setState({
        moment:newMoment,
      });
    }
    else {
      var newMoment = cloneFunction(this.props.moment);
      newMoment.locale(this.props.locale);

      this.setState({
        moment:newMoment,
        date: new DateUtil(this.props.selected).safeClone(newMoment())
      });
    }
  },

  increaseMonth: function() {
    this.setState({
      date: this.state.date.addMonth()
    });
  },

  decreaseMonth: function() {
    this.setState({
      date: this.state.date.subtractMonth()
    });
  },

  weeks: function() {
    return this.state.date.mapWeeksInMonth(this.renderWeek);
  },

  handleDayClick: function(day) {
    this.props.onSelect(day);
  },

  renderWeek: function(weekStart, key) {
    if(! weekStart.weekInMonth(this.state.date)) {
      return;
    }

    return (
      <div key={key}>
        {this.days(weekStart)}
      </div>
    );
  },

  renderDay: function(day, key) {
    var minDate = new DateUtil(this.props.minDate).safeClone(),
        maxDate = new DateUtil(this.props.maxDate).safeClone(),
        disabled = day.isBefore(minDate) || day.isAfter(maxDate);

    return (
      <Day
        key={key}
        day={day}
        moment={this.state.moment}
        locale={this.props.locale}
        id={this.props.id}
        date={this.state.date}
        onClick={this.handleDayClick.bind(this, day)}
        selected={new DateUtil(this.props.selected)}
        disabled={disabled} />
    );
  },

  days: function(weekStart) {
    return weekStart.mapDaysInWeek(this.renderDay);
  },

  header: function() {
    return this.props.moment.weekdaysMin().map(function(day, key) {
      return <div className="datepicker__day" key={key}>{day}</div>;
    });
  },
  render: function() {
    return (
      <div className="datepicker">
        <div className="datepicker__triangle"></div>
        <div className="datepicker__header">
          <a className="datepicker__navigation datepicker__navigation--previous ts-icon-arrow-left"
              onClick={this.decreaseMonth}>
          </a>
          <span className="datepicker__current-month">
            {this.state.date.localeFormat(this.props.locale, this.props.dateFormat)}
          </span>
          <a className="datepicker__navigation datepicker__navigation--next ts-icon-arrow-right"
              onClick={this.increaseMonth}>
          </a>
          <div>
            {this.header()}
          </div>
        </div>
        <div className="datepicker__month">
          {this.weeks()}
        </div>
      </div>
    );
  }
});

module.exports = Calendar;
