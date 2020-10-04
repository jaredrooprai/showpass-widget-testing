type queryData = {
  [key: string]: string;
};
export const encodeQueryData = (data: queryData): String => {
  const ret = [];
  for (let d in data) ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
};
