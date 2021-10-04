import { SensorThingsService } from '../../src';
import { AxiosRequestConfig } from 'axios';

/**
 * Injects dependencies in service HTTP client.
 */
export class HttpClientMock {
    private readonly _calledUrls: { [url: string]: number };

    constructor() {
        this._calledUrls = {};
    }

    private _setUrlAsCalled(url: string): void {
        if (this._calledUrls[url] === undefined) this._calledUrls[url] = 0;
        this._calledUrls[url] += 1;
    }

    public injectMockCall(
        service: SensorThingsService,
        targetUrl: string,
        method: 'get' | 'post' | 'patch' | 'delete',
        callback: Function
    ) {
        switch (method) {
            case 'get':
                service.httpClient.get = async (
                    url: string,
                    _config?: AxiosRequestConfig
                ): Promise<any> => {
                    return new Promise<any>(async (resolve, reject) => {
                        this._setUrlAsCalled(url);
                        if (url === targetUrl) {
                            try {
                                resolve(await callback());
                            } catch (err) {
                                reject(err);
                            }
                        }
                    });
                };
                break;
            case 'post':
                service.httpClient.post = async (
                    url: string,
                    _data?: any,
                    _config?: AxiosRequestConfig
                ): Promise<any> => {
                    this._setUrlAsCalled(url);
                    if (url === targetUrl) return callback(_data);
                };
                break;
            case 'patch':
                service.httpClient.patch = async (
                    url: string,
                    _data?: any,
                    _config?: AxiosRequestConfig
                ): Promise<any> => {
                    this._setUrlAsCalled(url);
                    if (url === targetUrl) return callback(_data);
                };
                break;
            case 'delete':
                service.httpClient.delete = async (
                    url: string,
                    _data?: any,
                    _config?: AxiosRequestConfig
                ): Promise<any> => {
                    this._setUrlAsCalled(url);
                    if (url === targetUrl) return callback();
                };
                break;
        }
    }

    /**
     * Checks if a given URL has been invoked.
     */
    public urlHasBeenCalled(url: string): boolean {
        return this._calledUrls[url] !== undefined && this._calledUrls[url] > 0;
    }
}
