import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../common/Header.jsx';
import Journey from './Journey.jsx';
import DepartDate from './DepartDate.jsx';

import CitySelector from '../common/CitySelector';

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
} from './actions';

function App(props) {
  const {
    from,
    to,
    dispatch,
    cityData,
    isCitySelectorVisible,
    isLoadingCityData,
    departDate,
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector,
      },
      dispatch
    );
  }, []);

  const CitySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector,
        fetchCityData,
        onSelect: setSelectedCity,
      },
      dispatch
    );
  }, []);

  return (
    <div>
      <Header title="火车票" onBack={onBack} />
      <Journey from={from} to={to} {...cbs} />
      <DepartDate time={departDate} />
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...CitySelectorCbs}
      />
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(App);
