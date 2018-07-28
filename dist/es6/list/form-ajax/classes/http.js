export class Http {
    static post(url, _settings) {
        return this.request('POST', url, _settings);
    }
    static request(requestType, url, _settings) {
        const http_request = new XMLHttpRequest(), settings = _settings, data = this.getData(settings), enctype = settings.form.getAttribute('enctype') ? settings.form.getAttribute('enctype') : 'application/x-www-form-urlencoded';
        ;
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
        let promise = new Promise((resolve, reject) => {
            http_request.onreadystatechange = () => {
                if (http_request.readyState == 4) {
                    if (http_request.status >= 200 && http_request.status < 300) {
                        resolve(http_request);
                    }
                    else {
                        reject(http_request);
                    }
                }
            };
        });
        http_request.open(requestType, url, true, settings.user, settings.password);
        if (settings.headers) {
            for (let header in settings.headers) {
                http_request.setRequestHeader(header, settings.headers[header]);
            }
        }
        if (enctype) {
            http_request.setRequestHeader('Content-Type', enctype);
        }
        http_request.send(data);
        return promise;
    }
    static getData(settings) {
        let data = {}, enctype = settings.form.getAttribute('enctype') ? settings.form.getAttribute('enctype') : 'application/x-www-form-urlencoded';
        const inputs = settings.form.elements;
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            if (input.type == 'submit')
                continue;
            data[input.name] = input.value;
        }
        let parsedData = '';
        for (let d in data) {
            parsedData += d + '=' + data[d] + '&';
        }
        if (parsedData.length > 1) {
            parsedData = parsedData.substring(0, parsedData.length - 1);
        }
        if (enctype == 'application/json') {
            return JSON.stringify(data);
        }
        else if (enctype == 'application/x-www-form-urlencoded') {
            return parsedData;
        }
        else {
            return new FormData(settings.form);
        }
    }
}
//# sourceMappingURL=http.js.map