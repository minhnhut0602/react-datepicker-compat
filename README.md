# React Date Picker

A simple and reusable datepicker component for React ([Demo](https://sleepy-plains-7516.herokuapp.com/))

This is a fork of the original react-datepicker. The differences are as follows:

- Supports React 0.12
- Fixed the following issue: Changing locale doesn't work 
- Added a new node server.js to serve the example folder
- Removed hardcoded weekdays
- Added Proptypes
- Made it work with IE9-IE11

![](https://cloud.githubusercontent.com/assets/1412392/5339491/c40de124-7ee1-11e4-9f07-9276e2545f27.png)

## Configuration

- Change date format by passing a different date format in the props: `dateFormat: "YYYY/MM/DD"`
- Add placeholder text: `placeholderText: 'Click to select a date'` (Defaults to the selected date when no placeholder text is added)
- Give users a predefined date range: `minDate: moment()` & `maxDate: moment().add(5, 'days')` (this gives users the ability to select a date between today and 5 days in the future)
- Set date format for calendar: `dateFormatCalendar: "YYYY/MM/DD"`

## Installation

- Install with npm: `npm install react-datepicker-compat --save`

## Local Development

- Install Bower `npm install -g bower`
- Install Bower Packages `bower install`
- Install packages `npm install`
- Run `grunt watch` in order to watch for local changes and run tests/build the code.
- Start a node webserver:
	- `$ node example/server.js`
- Visit `localhost:8000` to access the example.

To run tests, simply run `npm test`.

## License

Copyright (c) 2014 HackerOne Inc. and individual contributors. Licensed under MIT license, see [LICENSE](LICENSE) for the full license.
Changes in this fork (c) 2015 Sven A Robbestad. Licensed under MIT license
