import { deleteData, get, getNoAuth, post, postNoAuth, put } from "./axios";

interface IOptions {
  timeout?: number;
  headers?: Record<string, string>;
}

export const getDataAPI = (url: string, params?: any, options?: IOptions) => {
  return get({ url, params }, options || {});
};

export const getDataAPINoAuth = (
  url: string,
  params?: any,
  options?: IOptions
) => {
  return getNoAuth({ url, params }, options || {});
};

export const postDataAPI = (url: string, params?: any, options?: IOptions) => {
  return post({ url, params }, options || {});
};

export const postDataAPINoAuth = (
  url: string,
  params?: any,
  options?: IOptions
) => {
  return postNoAuth({ url, params }, options || {});
};

export const putDataAPI = (url: string, params?: any, options?: IOptions) => {
  return put({ url, params }, options || {});
};

export const deleteDataAPI = (
  url: string,
  params?: any,
  options?: IOptions
) => {
  return deleteData({ url, params }, options || {});
};
