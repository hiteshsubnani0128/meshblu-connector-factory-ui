import request from 'superagent';
import { CONNECTOR_SERVICE_URI } from '../constants/config'

export function connectorDetails({ connector }, callback) {
  request.get(`${CONNECTOR_SERVICE_URI}/${connector}`)
    .end((error, response) => {
      if (error) {
        callback(error)
        return
      }
      if (!response.ok) {
        callback(new Error('Unable to get Connector Details'))
        return
      }
      callback()
    });
}
