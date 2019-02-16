function ajax(opt) {
    var def = {
            type: 'get',
            async: true,
            dataType: "json",
            success: null,
            error: null
        },
        settings = Object.assign({}, def, opt),
        xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onload = function() {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            settings.success && settings.success(settings.dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText)
        } else {
            settings.error && settings.error(xhr.status);
        }
    }
    xhr.open(settings.type, settings.url, settings.async);
    xhr.send()
}