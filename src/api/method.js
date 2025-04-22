import instance from './instance';

export async function get(url, params = {}) {
  return await instance.get(url, { params });
}

export async function post(url, body) {
  return instance.post(url, body);
}

export async function patch(url, body) {
  return instance.patch(url, body);
}

export async function remove(url, body) {
  return instance.delete(url, body);
}
