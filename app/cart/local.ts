export const saveToLocalStorage =<T> (key: string, value:T) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };
  
  export const loadFromLocalStorage = <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
  
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  };