interface Item {
    id: string;
    name: string;
}

const fetchJson = async <T,>(
    url: string,
    options?: RequestInit & { signal?: AbortSignal }
): Promise<T | void> => {
    const res = await fetch(url, options);
    if (!res.ok) {
        const errorText = await res.text(); 
        throw new Error(`Request failed: ${res.status} - ${errorText || res.statusText}`);
    }

   
    if (res.status === 204) {
        return; 
    }

    return res.json() as Promise<T>;
};

export { type Item, fetchJson }; 