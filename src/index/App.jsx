import React from 'react'
import { connect } from 'react-redux'

import Header from '../common/Header.jsx'

function App(props) {
  return (
    <div>
      <Header/>
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return {}
  },
  function mapDispatchToProps(dispatch) {
    return {}
  }
)(App)