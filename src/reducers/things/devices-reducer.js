import * as actionTypes from '../../constants/action-types'

const initialState = {
  error: null,
  fetching: false,
  items: []
}

export default function types(state=initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_MY_DEVICES_REQUEST:
      return { ...initialState, fetching: true }

    case actionTypes.FETCH_MY_DEVICES_FAILURE:
      return { ...initialState, error: action.error }

    case actionTypes.FETCH_MY_DEVICES_SUCCESS:
      return { ...state, items: action.devices, fetching: false, error: null }

    default:
      return state
  }
}
