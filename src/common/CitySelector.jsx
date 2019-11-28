import React from 'react';
// 函数增加class
import classnames from 'classnames';
export default function CitySelector(props) {
  const { show, cityData, isLoading } = props;

  return (
    <div className={classnames('city-selector', { hidden: !show })}>111</div>
  );
}
