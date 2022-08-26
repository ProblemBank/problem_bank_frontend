import baseAxios from '../../configs/axios';
// import createFormData from '../../utils/jsonToFromDate';
import { serialize } from 'object-to-formdata';

const putApi = async (url, body) => (await baseAxios.put(url, body)).data;

const postApi = async (url, body) => (await baseAxios.post(url, body)).data;

const patchApi = async (url, body) => (await baseAxios.patch(url, body)).data;

const patchFormDataApi = async (url, body) =>
  (
    await baseAxios.patch(url, serialize(body), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;

const postFormDataApi = async (url, body) =>
  (
    await baseAxios.post(url, serialize(body), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;

const getApi = async (url) => (await baseAxios.get(url)).data;

const deleteApi = async (url, body) => (await baseAxios.delete(url, body)).data;

export const Apis = {
  PUT: putApi,
  POST: postApi,
  PATCH: patchApi,
  POST_FORM_DATA: postFormDataApi,
  GET: getApi,
  DELETE: deleteApi,
};
