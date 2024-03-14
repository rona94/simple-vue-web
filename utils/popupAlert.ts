export default (alert:any, data:any) => {
    alert.status = data.status == "ok" || data.status == "success" ? "success" : data.status
    alert.message = data.message
    alert.visible = true

    setTimeout(() => {
        alert.visible = false
    }, 5000)

    setTimeout(() => {
        alert.status = ""
        alert.message = ""
    }, 10000)

    return alert
}