import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { h0 } from '../common/fp';
import './DepartDate.css';
export default function DepartDate(props) {
  const { time, onClick } = props;

  //去除时分秒
  const h0Depart = h0(time);

  //  使用useMemo 优化
  const departDateString = useMemo(() => {
    return dayjs(time).format('YYYY-MM-DD');
  }, [h0Depart]);

  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" name="date" value={departDateString} />
      {departDateString}
    </div>
  );
}
