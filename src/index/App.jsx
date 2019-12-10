import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../common/Header.jsx';
import Journey from './Journey.jsx';
import DepartDate from './DepartDate.jsx';

import CitySelector from '../common/CitySelector';
import DateSeletor from '../common/DateSelector';

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
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
    isDateSelectorVisible,
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

  const departDateCbs = useMemo(() => {
    return bindActionCreators(
      {
        onClick: showDateSelector,
      },
      dispatch
    );
  }, []);

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideDateSelector,
      },
      dispatch
    );
  }, []);

  return (
    <div>
      <Header title="火车票" onBack={onBack} />
      <Journey from={from} to={to} {...cbs} />
      <DepartDate time={departDate} {...departDateCbs} />
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...CitySelectorCbs}
      />
      <DateSeletor
        show={isDateSelectorVisible}
        {...dateSelectorCbs}
      ></DateSeletor>
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
