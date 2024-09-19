import * as qs from "qs";

type DefaultQuery = Record<string, any>;
type DefaultPathname = Array<[string, any]>;
export type DefaultRouterType = {
  query?: DefaultQuery;
  pathname?: DefaultPathname;
  catchAll?: string;
};
type TupleArrayToRecord<T extends Array<[string, any]>> = {
  [K in T[number][0]]: Extract<T[number], [K, any]>[1];
};
type ExtractPathnameValue<T extends DefaultPathname> = {
  [K in keyof T]: T[K] extends [any, infer V] ? V : never;
};

type RoutesString = `/${string}`;
export type RoutesQueryAndPath<T extends DefaultRouterType = DefaultRouterType> = {
  query: T["query"] extends DefaultQuery ? T["query"] : DefaultQuery;
  pathname: T["pathname"] extends DefaultPathname ? TupleArrayToRecord<T["pathname"]> : Record<string, any>;
  pathnameValue: T["pathname"] extends DefaultPathname ? ExtractPathnameValue<T["pathname"]> : string[];
  pathnameTuple: T["pathname"] extends DefaultPathname ? T["pathname"] : DefaultPathname;
  pathnameCatchAll: T["catchAll"] extends string ? Record<T["catchAll"], string[]> : Record<string, string[]>;
  arg: {
    query?: T["query"] extends DefaultQuery ? Partial<T["query"]> : DefaultQuery;
    pathname?: T["pathname"] extends DefaultPathname ? ExtractPathnameValue<T["pathname"]> : string[];
  };
};

export const parseSearchParams = <T extends Record<string, unknown>>(param?: string): T => {
  return qs.parse(param ? param.replace(/^\?/, "") : "") as T;
};

export const stringifyPathname = (str?: string[]) => {
  return str?.join("/") ?? "";
};

export const stringifySearchParams = (query: DefaultQuery, newQuery?: DefaultQuery) => {
  const querystring = qs.stringify(Object.assign(query, newQuery ?? {}));
  const questionMark = querystring.length > 0 ? "?" : "";
  return `${questionMark}${querystring}`;
};

export const createInternalPath = <
  E extends Pick<RoutesQueryAndPath, "pathnameValue" | "query">,
  T extends RoutesString = RoutesString,
>(
  basePath: T,
  option?: { query?: E["query"]; pathname?: E["pathnameValue"] },
) => {
  const path = stringifyPathname(option?.pathname);
  const query = stringifySearchParams(option?.query ?? {});
  const slash = basePath === ("/" as T) || path.length === 0 ? "" : "/";
  return `${basePath}${slash}${path}${query}`;
};

export const createRoutes = <T extends DefaultRouterType = DefaultRouterType>(basePath: RoutesString) => ({
  path: (arg?: RoutesQueryAndPath<T>["arg"]) => createInternalPath(basePath, arg),
  getSearchParams: (param: keyof T["query"]) => param,
});


