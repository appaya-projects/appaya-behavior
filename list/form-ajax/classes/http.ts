/**
 * @module FormAjaxBehavior
 */

type HttpSettings = {
    form: HTMLFormElement;
    headers?: { [key: string]: string };
    [key: string]: any;
}

export class Http {

    public static post(url: string, _settings: HttpSettings): Promise<XMLHttpRequest> {
        return this.request('POST', url, _settings);
    }

    private static request(requestType: 'GET' | 'POST' | 'PUT' | 'UPDATE', url: string, _settings: HttpSettings): Promise<XMLHttpRequest> {
        const http_request: XMLHttpRequest = new XMLHttpRequest(),
            settings = _settings,
            data = this.getData(settings),
            enctype = settings.form.getAttribute('enctype') ? settings.form.getAttribute('enctype') : 'application/x-www-form-urlencoded';;

        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }

        let promise = new Promise((resolve: (req: XMLHttpRequest) => any, reject) => {
            http_request.onreadystatechange = () => {
                if (http_request.readyState == 4) {
                    if (http_request.status >= 200 && http_request.status < 300) {
                        resolve(http_request);
                    } else {
                        reject(http_request);
                    }

                }
            };
        });
        http_request.open(requestType,
            url,
            true, settings.user, settings.password);

        if (settings.headers) {
            for (let header in settings.headers) {
                http_request.setRequestHeader(header, settings.headers[header]);
            }
        }
        
        if(enctype) {
            http_request.setRequestHeader('Content-Type', enctype);
        }

        http_request.send(data);

        return promise;
    }

    public static getData(settings: HttpSettings) {
        let data: { [key: string]: string } = {},
            enctype = settings.form.getAttribute('enctype') ? settings.form.getAttribute('enctype') : 'application/x-www-form-urlencoded';
        const inputs = settings.form.elements;

        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i] as HTMLInputElement;
            if (input.type == 'submit') continue;

            data[input.name] = input.value;
        }


        let parsedData: string = '';
        for (let d in data) {
            parsedData += d + '=' + data[d] + '&';
        }

        if (parsedData.length > 1) {
            parsedData = parsedData.substring(0, parsedData.length - 1);
        }

        if (enctype == 'application/json') {
            return JSON.stringify(data);
        } else if (enctype == 'application/x-www-form-urlencoded') {
            return parsedData;
        } else {
            return new FormData(settings.form);
        }

    }

}