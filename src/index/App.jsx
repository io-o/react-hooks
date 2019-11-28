import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../common/Header.jsx';
import Journey from './Journey.jsx';

import CitySelector from '../common/CitySelector';

import { exchangeFromTo, showCitySelector } from './actions';

function App(props) {
  const {
    from,
    to,
    dispatch,
    cityData,
    isCitySelectorVisible,
    isLoadingCityData,
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

  return (
    <div>
      <Header title="火车票" onBack={onBack} />
      <Journey from={from} to={to} {...cbs} />
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
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
