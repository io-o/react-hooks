import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from './Header';
import './DateSelector.css';

function Month(props) {
  const { startingTimeInMonth, onSelect } = props;

  const startDay = new Date(startingTimeInMonth);
  const currentDay = new Date(startingTimeInMonth);

  let days = [];

  while (currentDay.getMonth() === startDay.getMonth()) {
    days.push(currentDay.getTime());
    currentDay.setDate(currentDay.getDate() + 1);
  }
  // 补齐月初 这个月1号是周三的话 补齐周一周二
  days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
    .fill(null)
    .concat(days);

  // 补齐月底 这个月最后一天是周五的话 补齐周六周天
  const lastDay = new Date(days[days.length - 1]);
  days = days.concat(
    new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
  );

  const weeks = [];
  for (let row = 0; row < days.length; ++row) {
    const week = days.slice(row * 7, (row + 1) * 7);
    weeks.push(week);
  }

  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>
              {startDay.getFullYear()}年 {startDay.getMonth() + 1}月
            </h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="date-table-weeks">
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th className="weekend">周六</th>
          <th className="weekend">周日</th>
        </tr>
      </tbody>
    </table>
  );
}

Month.propTypes = {
  startingTimeInMonth: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default function DateSelecotr(props) {
  const { show, onSelect, onBack } = props;

  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setDate(1);

  // 设置当前月份
  const monthSequence = [now.getTime()];
  // 设置下一个月
  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());
  // 设置下下个月
  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());

  return (
    <div className={classNames('date-selector', { hidden: !show })}>
      <Header title="日期选择" onBack={onBack}></Header>
      <div className="date-selector-tables">
        {monthSequence.map(month => {
          return (
            <Month
              onSelect={onSelect}
              key={month}
              startingTimeInMonth={month}
            />
          );
        })}
      </div>
    </div>
  );
}

DateSelecotr.propTypes = {
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
