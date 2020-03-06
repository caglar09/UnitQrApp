import { combineReducers } from 'redux'
import { alert_reducer } from './alert.reducer'
import { user_reducer } from './user.reducer'
import {audit_reducer} from './audit.reducer'
export default combineReducers({
    alert: alert_reducer,
    user: user_reducer,
    audit:audit_reducer
})