import AuditService from "../../service/audit.service";
import { audit_constant, alert_constant } from "../constant";
import { alert_Actions } from './alert.action'
export const auditActions = {
    getCategories,
    getActiveAudit: getActiveAudit,
    startAudit,
    finishAudit
}
function getCategories() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request())
            dispatch(alert_Actions.loading("Denetleme kategorileri getiriliyor."))
            AuditService.GetCategories().then((data) => {
                if (data.success) {
                    dispatch(success(data.result))
                    resolve(data)
                }
                else {
                    dispatch(failure());
                    reject(data)
                }
            }).catch((error) => {
                dispatch(failure());
                reject(error)
            })
        })
    }
    function request() { return { type: audit_constant.AUDIT_CONFIG_REQUEST } }
    function success(categories) { return { type: audit_constant.AUDIT_CONFIG_SUCCESS, categories: categories } }
    function failure() { return { type: audit_constant.AUDIT_CONFIG_FAILURE } }

}

function getActiveAudit() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());
            dispatch(alert_Actions.loading("Başlanmış denetlemeniz getiriliyor."))
            AuditService.GetActiveAudit().then((data) => {
                if (data.success) {
                    dispatch(success(data.result))
                    dispatch(alert_Actions.success(data.message ? data.message : "Başlanmış denetlemeniz listelendi."))
                    resolve(data)
                } else {
                    dispatch(failure());
                    dispatch(alert_Actions.failure(data.message ? data.message : "Başlanmış denetlemeniz yok. Yeni denetlemeye başlayabilirsiniz."))
                    reject(data)
                }
            }).catch((error) => {
                dispatch(failure());
                dispatch(alert_Actions.failure("Başlanmış denetlemeniz getirilirken hata oluştu."))
                reject(error)
            })
        })
    }
    function request() { return { type: audit_constant.AUDIT_ACTIVE_REQUEST } }
    function success(audit) { return { type: audit_constant.AUDIT_ACTIVE_SUCCESS, audit: audit } }
    function failure() { return { type: audit_constant.AUDIT_ACTIVE_FAILURE } }
}


function startAudit(model) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());
            dispatch(alert_Actions.loading("Denetlemeniz başlatılıyor. Lütfen Bekleyiniz"))
            AuditService.StartAudit(model).then((data) => {
                if (data.success) {
                    dispatch(success(data.result))
                    dispatch(alert_Actions.success(data.message ? data.message : "Denetlemeniz başladı."))
                    resolve(data);
                } else {
                    dispatch(failure());
                    dispatch(alert_Actions.failure(data.message ? data.message : "Denetlemeye başlanamadı. Yönetici ile iletişime geçiniz"))
                    reject(data)
                }
            }).catch((error) => {
                dispatch(failure());
                dispatch(alert_Actions.failure("Hata oluştu. lütfen yönetici ile iletişime geçiniz"))
                reject(error)
            })

        });
    }
    function request() { return { type: audit_constant.AUDIT_START_REQUEST } }
    function success() { return { type: audit_constant.AUDIT_START_SUCCESS } }
    function failure() { return { type: audit_constant.AUDIT_START_FAILURE } }
}

export function finishAudit(model) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());
            dispatch(alert_Actions.loading("Denetleme tamamlanıyor. Lütfen Bekleyiniz"))
            AuditService.FinishAudit(model).then((data) => {
                if (data.success) {
                    dispatch(success(data.result))
                    dispatch(alert_Actions.success(data.message ? data.message : "Denetleme tamamlandı. Yeni denetleme yapabilirsiniz."))
                    resolve(data);
                } else {
                    dispatch(failure());
                    dispatch(alert_Actions.failure(data.message ? data.message : "Denetleme tamamlanamadı. Lütfen tekrar deneyiniz. Gerekirse yönetici ile iletişime geçiniz"))
                    reject(data)
                }
            }).catch((error) => {
                dispatch(failure());
                dispatch(alert_Actions.failure("Hata oluştu. lütfen yönetici ile iletişime geçiniz"))
                reject(error)
            })

        });
    }
    function request() { return { type: audit_constant.AUDIT_FINISH_REQUEST } }
    function success() { return { type: audit_constant.AUDIT_FINISH_SUCCESS } }
    function failure() { return { type: audit_constant.AUDIT_FINISH_FAILURE } }
}