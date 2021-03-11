import { ApiConfig } from 'arweave/node/lib/api';
import Axios, { AxiosInstance } from 'axios';
import ITestWeaveRequest from '../interfaces/interface.testweave-request';

export default class TestWeaveRequest implements ITestWeaveRequest {
  // the axios request instance
  private request: AxiosInstance;

  /**
   * The constructor of the class. Should never be called directly, since this
   * is a static class.
   * @param instance an AxiosInstance object.
   */
  private constructor(instance: AxiosInstance) {
    this.request = instance;
  }
  /**
   * Returns a TestWeave instance
   * @param config the ApiConfig on the top of with the TestWeaveRequest must be created.
   * @returns a TestWeaveRequest instance.
   */
  public static init(config: ApiConfig): TestWeaveRequest {
    const instance = Axios.create({
      baseURL: `${config.protocol}://${config.host}:${config.port}`,
      timeout: config.timeout,
      maxContentLength: 1024 * 1024 * 512,
      headers: {
        'X-Network': 'arweave.testnet',
      }
    });
    // console.log(instance);
    return new TestWeaveRequest(instance);
  }

  /**
   * Returns the axios instance of this TestWeave request;
   * @returns the axios instance instance on the top of which the TestWeaveRequest instance was created.
   * @throws Error if the Axios Instance instance was not assigned
   */
  public getRequest(): AxiosInstance {
    if (this.request) {
      return this.request;
    }
    throw new Error('You must init TestWeaveRequest with a non null AxiosInstance instance before calling getRequest()');
  }
}
