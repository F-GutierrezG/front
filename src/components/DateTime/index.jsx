import React, { Component } from "react";
import CalendarContainer from "./CalendarContainer";

import moment from "moment";

class Datetime extends Component {
  constructor(props){
    super(props);
    this.viewModes = Object.freeze({
      YEARS: "years",
      MONTHS: "months",
      DAYS: "days",
      TIME: "time"
    });

    this.componentProps = {
      fromProps: [
        "value",
        "isValidDate",
        "renderDay",
        "renderMonth",
        "renderYear",
        "timeConstraints"
      ],
      fromState: ["viewDate", "selectedDate", "updateOn"],
      fromThis: [
        "setDate",
        "setTime",
        "showView",
        "addTime",
        "subtractTime",
        "updateSelectedDate",
        "localMoment",
        "handleClickOutside"
      ]
    };

    this.state = {
      viewDate: moment()
    };
  }

  getUpdateOn(formats) {
    if (formats.date.match(/[lLD]/)) {
      return this.viewModes.DAYS;
    } else if (formats.date.indexOf("M") !== -1) {
      return this.viewModes.MONTHS;
    } else if (formats.date.indexOf("Y") !== -1) {
      return this.viewModes.YEARS;
    }

    return this.viewModes.DAYS;
  }

  localMoment(date, format, props) {
    props = props || this.props;
    var momentFn = props.utc ? moment.utc : moment;
    var m = momentFn(date, format, props.strictParsing);
    if (props.locale) m.locale(props.locale);
    return m;
  }

  getFormats(props) {
    var formats = {
      date: props.dateFormat || "",
      time: props.timeFormat || ""
    };
    var locale = this.localMoment(props.date, null, props).localeData();

    if (formats.date === true) {
      formats.date = locale.longDateFormat("L");
    } else if (this.getUpdateOn(formats) !== this.viewModes.DAYS) {
      formats.time = "";
    }

    if (formats.time === true) {
      formats.time = locale.longDateFormat("LT");
    }

    formats.datetime =
      formats.date && formats.time
        ? formats.date + " " + formats.time
        : formats.date || formats.time;

    return formats;
  }

  getComponentProps() {
    var me = this,
      formats = this.getFormats(this.props),
      props = {
        ...this.props,
        dateFormat: formats.date,
        timeFormat: formats.time
      };

    this.componentProps.fromProps.forEach(function(name) {
      props[name] = me.props[name];
    });
    this.componentProps.fromState.forEach(function(name) {
      props[name] = me.state[name];
    });
    this.componentProps.fromThis.forEach(function(name) {
      props[name] = me[name];
    });

    return props;
  }

  subtractTime(amount, type, toSelected) {
    var me = this;
    return function() {
      me.props.onNavigateBack(amount, type);
      me.updateTime("subtract", amount, type, toSelected);
    };
  }

  showView(view) {
    var me = this;
    return function() {
      me.state.currentView !== view && me.props.onViewModeChange(view);
      me.setState({ currentView: view });
    };
  }

  addTime(amount, type, toSelected) {
    var me = this;
    return function() {
      me.props.onNavigateForward(amount, type);
      me.updateTime("add", amount, type, toSelected);
    };
  }

  render() {
    return (
      <div key="dt" className="rdtPicker">
        <CalendarContainer view="days" viewProps={this.getComponentProps()} />
      </div>
    );
  }
}

Datetime.defaultProps = {
  className: "",
  defaultValue: "",
  inputProps: {},
  input: true,
  onFocus: function() {},
  onBlur: function() {},
  onChange: function() {},
  onViewModeChange: function() {},
  onNavigateBack: function() {},
  onNavigateForward: function() {},
  timeFormat: true,
  timeConstraints: {},
  dateFormat: true,
  strictParsing: true,
  closeOnSelect: false,
  closeOnTab: true,
  utc: false
};

export default Datetime;
