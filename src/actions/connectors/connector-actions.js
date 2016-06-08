import * as actionTypes from '../../constants/action-types';
import { setFetching, setError } from '../page-actions'
import {
  createConnector,
  updateAndGenerateKey,
} from '../../helpers/connector-creator';

function connectorGeneratedSuccess({ key, uuid }) {
  return {
    type: actionTypes.CONNECTOR_GENERATED_SUCCESS,
    key,
    uuid,
  }
}

export function createConnectorAction({ connector, pkg }) {
  return (dispatch) => {
    dispatch(setFetching(true))
    createConnector({ connector, pkg }, (error, response) => {
      dispatch(setFetching(false))
      if (error) {
        dispatch(setError(error))
        return
      }
      dispatch(connectorGeneratedSuccess(response))
    })
  }
}

export function generateConnectorAction({ uuid, connector, pkg }) {
  return (dispatch) => {
    dispatch(setFetching(true))
    updateAndGenerateKey({ uuid, connector, pkg }, (error, response) => {
      dispatch(setFetching(false))
      if (error) {
        dispatch(setError(error))
        return
      }
      dispatch(connectorGeneratedSuccess(response))
    })
  }
}