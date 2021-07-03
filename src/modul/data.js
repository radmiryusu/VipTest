module.exports=  async function FetchMethods(url) {
  const response = await fetch(url);
  return response.ok ? await response.json() : "";
};