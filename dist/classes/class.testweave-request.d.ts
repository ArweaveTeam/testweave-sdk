import { ApiConfig } from 'arweave/node/lib/api';
import { AxiosInstance } from 'axios';
import ITestWeaveRequest from '../interfaces/interface.testweave-request';
export default class TestWeaveRequest implements ITestWeaveRequest {
    private request;
    /**
     * The constructor of the class. Should never be called directly, since this
     * is a static class.
     * @param instance an AxiosInstance object.
     */
    private constructor();
    /**
     * Returns a TestWeave instance
     * @param config the ApiConfig on the top of with the TestWeaveRequest must be created.
     * @returns a TestWeaveRequest instance.
     */
    static init(config: ApiConfig): TestWeaveRequest;
    /**
     * Returns the axios instance of this TestWeave request;
     * @returns the axios instance instance on the top of which the TestWeaveRequest instance was created.
     * @throws Error if the Axios Instance instance was not assigned
     */
    getRequest(): AxiosInstance;
}
