"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var TestWeaveRequest = /** @class */ (function () {
    /**
     * The constructor of the class. Should never be called directly, since this
     * is a static class.
     * @param instance an AxiosInstance object.
     */
    function TestWeaveRequest(instance) {
        this.request = instance;
    }
    /**
     * Returns a TestWeave instance
     * @param config the ApiConfig on the top of with the TestWeaveRequest must be created.
     * @returns a TestWeaveRequest instance.
     */
    TestWeaveRequest.init = function (config) {
        var instance = axios_1.default.create({
            baseURL: config.protocol + "://" + config.host + ":" + config.port,
            timeout: config.timeout,
            maxContentLength: 1024 * 1024 * 512,
            headers: {
                'X-Network': 'arweave.testnet',
            }
        });
        // console.log(instance);
        return new TestWeaveRequest(instance);
    };
    /**
     * Returns the axios instance of this TestWeave request;
     * @returns the axios instance instance on the top of which the TestWeaveRequest instance was created.
     * @throws Error if the Axios Instance instance was not assigned
     */
    TestWeaveRequest.prototype.getRequest = function () {
        if (this.request) {
            return this.request;
        }
        throw new Error('You must init TestWeaveRequest with a non null AxiosInstance instance before calling getRequest()');
    };
    return TestWeaveRequest;
}());
exports.default = TestWeaveRequest;
//# sourceMappingURL=class.testweave-request.js.map