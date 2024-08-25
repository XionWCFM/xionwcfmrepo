import ky from "ky";

const URL = "http://localhost:3000";
export const http = {
  get: function get<Response = unknown>(url: string): Promise<Response> {
    return ky.get(`${URL}${url}`).then((response) => response.json());
  },
  post: function post<Request = any, Response = unknown>(url: string, payload?: Request): Promise<Response> {
    return ky.post(`${URL}${url}`, { json: payload }).then((response) => response.json());
  },
  put: function post<Request = any, Response = unknown>(url: string, payload?: Request): Promise<Response> {
    return ky.put(`${URL}${url}`, { json: payload }).then((response) => response.json());
  },
};
