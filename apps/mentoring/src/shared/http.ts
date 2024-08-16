import ky from "ky";

export const http = {
  get: function get<Response = unknown>(url: string): Promise<Response> {
    return ky.get(url).then((response) => response.json());
  },
  post: function post<Request = any, Response = unknown>(url: string, payload?: Request): Promise<Response> {
    return ky.post(url, { json: payload }).then((response) => response.json());
  },
  put: function post<Request = any, Response = unknown>(url: string, payload?: Request): Promise<Response> {
    return ky.put(url, { json: payload }).then((response) => response.json());
  },
};
