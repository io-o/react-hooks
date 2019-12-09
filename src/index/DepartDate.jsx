import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { h0 } from '../common/fp';
import './DepartDate.css';
import PropTypes from 'prop-types';

// 由于 需要从外部获取数据，不是全部从props获取，
// 所以不能使用memo优化

export default function DepartDate(props) {
  const { time, onClick } = props;

  //去除时分秒
  const h0Depart = h0(time);
  const departDate = new Date(h0Depart);
  //  使用useMemo 优化
  const departDateString = useMemo(() => {
    return dayjs(time).format('YYYY-MM-DD');
  }, [h0Depart]);

  const isToday = h0Depart === h0();

  // 获取周几
  const weekString =
    '周' +
    ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()] +
    (isToday ? '(今天)' : '');

  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" name="date" value={departDateString} />
      {departDateString}
      <span className="depart-week">{weekString}</span>
    </div>
  );
}

DepartDate.propTypes = {
  time: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
