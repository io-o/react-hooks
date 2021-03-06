import React, { useState, useMemo, useEffect, memo, useCallback } from 'react';
// 函数增加class
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './CitySelector.css';

// 函数组件 使用memo优化性能
const CityItem = memo(function CityItem(props) {
  const { name, onSelect } = props;

  return (
    <li className="city-li" onClick={_ => onSelect(name)}>
      {name}
    </li>
  );
});

CityItem.propTypes = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const CitySection = memo(function CitySection(props) {
  const { title, cities = [], onSelect } = props;

  return (
    <ul className="city-ul">
      <li className="city-li" key={title} data-cate={title}>
        {title}
      </li>
      {cities.map(city => {
        return (
          <CityItem key={city.name} name={city.name} onSelect={onSelect} />
        );
      })}
    </ul>
  );
});

CitySection.propTypes = {
  title: PropTypes.string.isRequired,
  cities: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
};

const AlphaIndex = memo(function AlphaIndex(props) {
  const { alpha, onClick } = props;

  return (
    <i className="city-index-item" onClick={_ => onClick(alpha)}>
      {alpha}
    </i>
  );
});

AlphaIndex.propTypes = {
  alpha: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

// 生成 26字母组成的数组
const alphabet = Array.from(new Array(26), (ele, index) => {
  return String.fromCharCode(65 + index);
});

const CityList = memo(function CityList(props) {
  const { sections, onSelect, toAlpha } = props;

  return (
    <div className="city-list">
      <div className="city-cate">
        {sections.map(section => {
          return (
            <CitySection
              key={section.title}
              title={section.title}
              cities={section.citys}
              onSelect={onSelect}
            />
          );
        })}
      </div>
      <div className="city-index">
        {alphabet.map(alpha => {
          return (
            <AlphaIndex
              onClick={toAlpha}
              key={alpha}
              alpha={alpha}
            ></AlphaIndex>
          );
        })}
      </div>
    </div>
  );
});
CityList.propTypes = {
  sections: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  toAlpha: PropTypes.func.isRequired,
};

export default function CitySelector(props) {
  const { show, cityData, isLoading, onBack, fetchCityData, onSelect } = props;

  const [searchKey, setSearchKey] = useState('');
  // 使用 useMemo 优化 性能 searchKey 不变的话 不会渲染
  const key = useMemo(() => searchKey.trim(), [searchKey]);

  useEffect(() => {
    if (!show || cityData || isLoading) {
      return;
    }
    fetchCityData();
  }, [show, cityData, isLoading]);

  const outputCitySections = () => {
    if (isLoading) {
      return <div>Loading</div>;
    }
    if (cityData) {
      return (
        <CityList
          sections={cityData.cityList}
          onSelect={onSelect}
          toAlpha={toAlpha}
        />
      );
    }
  };

  // 定位快捷字母 使用dom自定义属性 跳到指定位置
  const toAlpha = useCallback(alpha => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView();
  }, []);

  return (
    <div className={classnames('city-selector', { hidden: !show })}>
      <div className="city-search">
        <div className="search-back" onClick={_ => onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            ></polyline>
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey.trim()}
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            onChange={e => setSearchKey(e.target.value)}
          />
        </div>
        <i
          onClick={_ => setSearchKey('')}
          className={classnames('search-clean', {
            hidden: key.length === 0,
          })}
        >
          &#xf063;
        </i>
      </div>
      {outputCitySections()}
    </div>
  );
}

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};
