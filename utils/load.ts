export function prepareLoading<T>(asyncFunction: () => Promise<T>, setLoading: (loading: boolean) => void) : Promise<T> {
  setLoading(true);
  return asyncFunction().finally(() => setLoading(false));
}