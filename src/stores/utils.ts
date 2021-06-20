export function getIdFromResourceURI(resourceURI: string): string {
  const splitResourceURI = resourceURI.split("/");
  return splitResourceURI[splitResourceURI.length - 1];
}

export function replaceHttpWithHttps(str: string): string {
  const splitStr = str.split("://");
  splitStr[0] = "https";
  return splitStr.join("://");
}
