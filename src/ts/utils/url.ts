export const parseUrlParams = () => {
  const url = window.location.search;
  const searchParams = new URLSearchParams(url);
  const result = [...searchParams].reduce<Record<string, string[]>>((acc, [key, val]) => {
    acc[key] = val.split(',');
    return acc;
  }, {});
  return result;
};

export const setUrlParams = (params: { [s: string]: string[] } | string[]) => {
  const state = {};
  const title = '';
  const url = `${window.location.origin}${window.location.pathname}?`;
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    let value = val;
    if (Array.isArray(value)) {
      value = value.join(',');
    }
    searchParams.append(key, val);
  });
  const queryString = searchParams.toString();
  history.pushState(state, title, url + queryString);
};
