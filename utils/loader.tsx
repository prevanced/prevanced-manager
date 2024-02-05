async function withLoading<T>(setLoading: (loading: boolean) => void, func: () => Promise<T>): Promise<T> {
    setLoading(true);
    try {
        return await func();
    } finally {
        setLoading(false);
    }
}