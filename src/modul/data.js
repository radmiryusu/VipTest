module.exports = async function FetchMethods(url) {
  const headers = {
    Authorization: "token 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",
  };
  const response = await fetch(url, {
    method: "GET",
    headers:headers
  });
  return response.ok ? await response.json() : "";
};
