import { connect } from 'react-redux';
import Filter from  '../components/Filter';

const makeAction = function (filter) {
    return {
        type: 'SWITCH_VIEW',
        filter: filter
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        active: state.filter == ownProps.filter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: ()=> {
            dispatch(makeAction(ownProps.filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);