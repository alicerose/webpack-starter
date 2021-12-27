import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../constants/api';

/**
 * AXIOSをどうにかする基底クラス
 */

const apiInstance: AxiosInstance = axios.create({
  ...API_CONFIG,
});

/**
 * Request Interceptors
 * リクエスト前に介入する処理を記述
 */
apiInstance.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    console.log('[API] request', request);
    return request;
  },
  (error) => {
    console.error('[API] request error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptors
 * レスポンス時に介入する処理を記述
 */
apiInstance.interceptors.response.use(
  (response) => {
    console.log('[API] response:', response);
    return response.data;
  },
  (error) => {
    console.error('[API] request error:', error);
    return Promise.reject(error);
  }
);

export default abstract class {
  private readonly host: string;

  /**
   * コンストラクタ
   * @param host
   */
  protected constructor(host: string) {
    this.host = host;
  }

  /**
   * リクエストハンドラ
   * @param method
   * @param host
   * @param params
   * @private
   */
  private request(
    method: 'post' | 'get' | 'put' | 'patch' | 'delete',
    host: string,
    params: { params: null | Record<string, unknown> }
  ) {
    return apiInstance[method](this.host + host, params);
  }

  /**
   * GETメソッド
   * @param endpoint
   * @param params
   */
  _get(endpoint: string, params: null | Record<string, unknown>) {
    return this.request('get', endpoint, { params: params });
  }

  /**
   * POSTメソッド
   * @param endpoint
   * @param params
   */
  _post(endpoint: string, params: { params: null | Record<string, unknown> }) {
    return this.request('post', endpoint, params);
  }

  /**
   * PUTメソッド
   * @param endpoint
   * @param params
   */
  _put(endpoint: string, params: { params: null | Record<string, unknown> }) {
    return this.request('put', endpoint, params);
  }

  /**
   * PATCHメソッド
   * @param endpoint
   * @param params
   */
  _patch(endpoint: string, params: { params: null | Record<string, unknown> }) {
    return this.request('patch', endpoint, params);
  }

  /**
   * DELETEメソッド
   * @param endpoint
   * @param params
   */
  _delete(endpoint: string, params: { params: null | Record<string, unknown> }) {
    return this.request('delete', endpoint, params);
  }
}
