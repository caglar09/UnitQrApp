import { audit_constant } from "../constant";

const initial_state = {
    categories: [],
    isAuditStarting: false,
    isAuditStarted: false,
    isAuditFinishing: false,
    isAuditFinished: false,
    isLoading: false,
    audit: {}
}

export const audit_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case audit_constant.AUDIT_CONFIG_REQUEST:
            return { ...state, isLoading: true };
        case audit_constant.AUDIT_CONFIG_SUCCESS:
            let cats = [];
            action.categories.forEach(element => {
                let obj = {
                    id: element.key,
                    value: element.value,
                    selected: false
                }
                cats.push(obj)
            });

            return { ...state, isLoading: false, categories:cats };
        case audit_constant.AUDIT_CONFIG_FAILURE:
            return { ...state, isLoading: false, categories: {} };

        case audit_constant.AUDIT_START_REQUEST:
            return { ...state, isAuditStarting: true };
        case audit_constant.AUDIT_START_SUCCESS:
            return { ...state, isAuditStarting: false, isAuditStarted: true };
        case audit_constant.AUDIT_START_FAILURE:
            return { ...state, isAuditStarting: false, isAuditStarted: false };

        case audit_constant.AUDIT_FINISH_REQUEST:
            return { ...state, isAuditFinishing: true };
        case audit_constant.AUDIT_FINISH_SUCCESS:
            return { ...state, isAuditFinishing: false, isAuditFinished: true };
        case audit_constant.AUDIT_FINISH_FAILURE:
            return { ...state, isAuditFinishing: false, isAuditFinished: false };

        case audit_constant.AUDIT_ACTIVE_REQUEST:
            return { ...state, isLoading: true };
        case audit_constant.AUDIT_ACTIVE_SUCCESS:
            return { ...state, isLoading: false, audit: action.audit };
        case audit_constant.AUDIT_ACTIVE_FAILURE:
            return { ...state, isLoading: false, audit: {} };
        default:
            return { ...state }
    }
}