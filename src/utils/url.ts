export function removeDoubleSlashes(url?: string) {
  return url?.replaceAll(/\/{2,}/g, '/')
}
