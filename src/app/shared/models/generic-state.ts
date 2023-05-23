export type GenericStoreStatus = 'pending' | 'loading' | 'success' | 'error'

// Abastraction of state
export interface GenericState<T> {
    data: T | null;
    status: GenericStoreStatus;
    error: string | null
}