
import { connect } from 'react-redux';
import Greeting from './greeting';
import * as sessionActions from '../../actions/session_actions';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ( {
  logout: () => dispatch(sessionActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);