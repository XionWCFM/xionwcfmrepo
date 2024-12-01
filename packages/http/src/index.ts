import ky, { KyInstance, Options, HTTPError } from "ky";

function isKyInstance(instance: any): instance is KyInstance {
  return instance && typeof instance.get === "function" && typeof instance.post === "function";
}

export const isHttpError = (error: unknown): error is HTTPError => {
  return error instanceof HTTPError;
};

export const createInstance = (options?: Options) => ky.create(options);

export const createHttp = (instance?: KyInstance | Options) => {
  const kyInstance = isKyInstance(instance) ? instance : createInstance(instance);

  const http = {
    get: async function get<Response = unknown>(url: string, options?: Options): Promise<Response> {
      const response = await kyInstance.get(`${url}`, options);
      return response.json();
    },
    post: async function post<Request = any, Response = unknown>(
      url: string,
      payload?: Request,
      options?: Options,
    ): Promise<Response> {
      const response = await kyInstance.post(`${url}`, { json: payload, ...options });
      return response.json();
    },
    put: async function put<Request = any, Response = unknown>(
      url: string,
      payload?: Request,
      options?: Options,
    ): Promise<Response> {
      const response = await kyInstance.put(`${url}`, { json: payload, ...options });

      return response.json();
    },
    delete: async function kydelete<Response = unknown>(url: string, options: Options): Promise<Response> {
      const response = await kyInstance.delete(`${url}`, options);

      return response.json();
    },
    patch: async function patch<Request = any, Response = unknown>(
      url: string,
      payload?: Request,
      options?: Options,
    ): Promise<Response> {
      const response = await kyInstance.patch(`${url}`, { json: payload, ...options });

      return response.json();
    },
  };
  return http;
};

export type HttpInstance = ReturnType<typeof createHttp>;

export const http = createHttp();
