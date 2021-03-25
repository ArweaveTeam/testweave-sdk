import { ApiConfig } from 'arweave/node/lib/api';
import { AxiosInstance } from 'axios';
export default interface ITestWeaveRequest {
    getRequest(config: ApiConfig): AxiosInstance;
}
