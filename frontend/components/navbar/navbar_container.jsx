
import { connect } from 'react-redux';
import NavBar from './navbar';
import * as sessionActions from '../../actions/session_actions';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ( {
  logout: () => dispatch(sessionActions.logout()),
  clearErrors: () => dispatch(sessionActions.clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);