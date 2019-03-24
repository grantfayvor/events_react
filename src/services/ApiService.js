import Axios from 'axios';

/**
 * 
 * @typedef {Object} OptionsInterface
 * @property {String} url
 * @property {String} method
 * @property {String} baseURL,
 * @property {AxiosTransformer[]} transformRequest
 * @property {AxiosTransformer[]} transformResponse
 * @property {Object} headers
 * @property {Object} params
 * @property {GenericCallback} paramsSerializer
 * @property {Object} data
 * @property {Number} timeout
 * @property {Boolean} withCredentials
 * @property {GenericCallback} adapter
 * @property {Object} auth
 * @property {String} auth.username
 * @property {String} auth.password
 * @property {String} responseType
 * @property {String} xsrfCookieName
 * @property {String} xsrfHeaderName
 * @property {GenericCallback} onUploadProgress
 * @property {GenericCallback} onDownloadProgress
 * @property {Number} maxContentLength
 * @property {GenericCallback} validateStatus
 * @property {Number} maxRedirects
 * @property {String=} socketPath
 * @property {Object} httpAgent
 * @property {Object} httpsAgent
 * @property {Object} proxy
 * @property {String} proxy.host
 * @property {Number} proxy.port
 * @property {Object} proxy.auth
 * @property {String} proxy.auth.username
 * @property {String} proxy.auth.password
 * @property {Object} proxy.cancelToken
 */

/**
 * 
 * @callback AxiosTransformer
 * @param {Object} data
 * @param {Object=} headers
 */

/**
 * 
 * @typedef {Object} AxiosResponse
 * @property {Object} data
 * @property {Number} status
 * @property {String} statusText
 * @property {Object} headers
 * @property {Object} config
 * @property {Object} request
 */

/**
 * 
 * @callback GenericCallback
 * @param {Object=} param1 
 */

/**
 * 
 * @callback RequestCallback
 * @param {AxiosResponse} response 
 */
export default class ApiService {

    /**
     * 
     * @param {OptionsInterface} options 
     * @param {RequestCallback} callback 
     */
    makeRequest(url, options, callback) {
        Axios(url, options)
            .then(callback);
    }

    /**
     * 
     * @param {String} url 
     * @param {Object} [config] 
     * @param {RequestCallback} callback 
     */
    static get(url, config, callback) {
        confirmArguments(arguments, 3, () => {
            callback = config;
            config = undefined;
        });
        Axios.get(url, config)
            .then(callback);
    }

    /**
     * 
     * @param {String} url 
     * @param {Object} data 
     * @param {Object} [config] 
     * @param {RequestCallback} callback 
     */
    static post(url, data, config, callback) {
        confirmArguments(arguments, 4, () => {
            callback = config;
            config = undefined;
        });
        Axios.post(url, data, config)
            .then(callback);
    }

    /**
     * 
     * @param {String} url 
     * @param {Object} data 
     * @param {Object} [config] 
     * @param {RequestCallback} callback 
     */
    static put(url, data, config, callback) {
        confirmArguments(arguments, 4, () => {
            callback = config;
            config = undefined;
        });
        Axios.put(url, data, config)
            .then(callback);
    }

    /**
     * 
     * @param {String} url 
     * @param {Object} [config] 
     * @param {RequestCallback} callback 
     */
    static delete(url, config, callback) {
        confirmArguments(arguments, 3, () => {
            callback = config;
            config = undefined;
        });
        Axios.delete(url, config)
            .then(callback);
    }
}

/**
 * 
 * @param {Object} args 
 * @param {Number} expectedNoOfArgs 
 * @param {GenericCallback} cb 
 */
function confirmArguments(args, expectedNoOfArgs, cb) {
    if (args.length < expectedNoOfArgs) {
        cb();
    }
}