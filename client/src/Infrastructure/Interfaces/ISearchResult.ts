export interface ISearchResult<T> {
    // Data: T[];
    // Total: number;
    items: T[];
    total_count: number;
}
