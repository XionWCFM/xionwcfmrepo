export const getAllQueryString = (searchParams: URLSearchParams) => {
  const query: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });
  return query;
};
