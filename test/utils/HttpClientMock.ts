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

    public injectMockCalls(
        service: SensorThingsService,
        callbacks: {
            targetUrl: string,
            method: 'get' | 'post' | 'patch' | 'delete',
            callback: Function
        }[]
    ) {
        const getCallbacks = callbacks.filter((callback) => callback.method === 'get');
        const postCallbacks = callbacks.filter((callback) => callback.method === 'post');
        const patchCallbacks = callbacks.filter((callback) => callback.method === 'patch');
        const deleteCallbacks = callbacks.filter((callback) => callback.method === 'delete');

        if (getCallbacks.length !== 0) {
            service.httpClient.get = async (
                url: string,
                _config?: AxiosRequestConfig
            ): Promise<any> => {
                return new Promise<any>(async (resolve, reject) => {
                    this._setUrlAsCalled(url);
                    const matchingCallbacks = getCallbacks.filter(callback => callback.targetUrl === url);
                    if (matchingCallbacks.length === 1) {
                        try {
                            resolve(await matchingCallbacks[0].callback());
                        } catch (err) {
                            reject(err);
                        }
                    }
                });
            };
        }

        if (postCallbacks.length !== 0) {
            service.httpClient.post = async (
                url: string,
                _data?: any,
                _config?: AxiosRequestConfig
            ): Promise<any> => {
                this._setUrlAsCalled(url);
                const matchingCallbacks = postCallbacks.filter(callback => callback.targetUrl === url);
                if (matchingCallbacks.length === 1) {
                    return matchingCallbacks[0].callback(_data);
                }
            };
        }

        if (patchCallbacks.length !== 0) {
            service.httpClient.patch = async (
                url: string,
                _data?: any,
                _config?: AxiosRequestConfig
            ): Promise<any> => {
                this._setUrlAsCalled(url);
                const matchingCallbacks = patchCallbacks.filter(callback => callback.targetUrl === url);
                if (matchingCallbacks.length === 1) {
                    return matchingCallbacks[0].callback(_data);
                }
            };
        }

        if (deleteCallbacks.length !== 0) {
            service.httpClient.delete = async (
                url: string,
                _data?: any,
                _config?: AxiosRequestConfig
            ): Promise<any> => {
                this._setUrlAsCalled(url);
                const matchingCallbacks = deleteCallbacks.filter(callback => callback.targetUrl === url);
                if (matchingCallbacks.length === 1) {
                    return matchingCallbacks[0].callback(_data);
                }
            };
        }
    }

    /**
     * Checks if a given URL has been invoked.
     */
    public urlHasBeenCalled(url: string): boolean {
        return this._calledUrls[url] !== undefined && this._calledUrls[url] > 0;
    }
}
