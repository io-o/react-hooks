import React, { memo } from 'react';
import './Submit.css';

// 没有props传递 可以使用memo优化
export default memo(function Submit(params) {
  return (
    <div className="submit">
      <button type="submit" className="submit-button">
        搜索
      </button>
    </div>
  );
});
