// Tiny typed localStorage adapter for Campaigns.
// - Key is versioned to allow future migrations.
// - Parsing is defensive: any failure returns an empty list.

export type Campaign = {
    id: string; // uuid
    name: string;
    start: string; // ISO date (YYYY-MM-DD)
    end: string; // ISO date (YYYY-MM-DD)
    clicks: number;
    cost: number;
    revenue: number;
};

const KEY = 'fs_campaigns_v1';
const INIT = 'fs_campaigns_initialized_v1';

export function loadCampaigns(): Campaign[] {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? (JSON.parse(raw) as Campaign[]) : [];
    } catch {
        // Corrupted data or JSON parse error → start clean
        return [];
    }
}

export function saveCampaigns(data: Campaign[]) {
    // Single write; caller is responsible for debouncing if needed
    localStorage.setItem(KEY, JSON.stringify(data));
    localStorage.setItem(INIT, '1');
}

export function hasSaved(): boolean {
    return localStorage.getItem(INIT) !== null;
}
