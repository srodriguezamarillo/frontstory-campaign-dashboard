import { useEffect, useMemo, useState } from 'react';
import CampaignForm from './components/CampaignForm';
import CampaignTable from './components/CampaignTable';
import { type Campaign, loadCampaigns, saveCampaigns, hasSaved } from './lib/storage';

type SortKey = 'name' | 'start' | 'end' | 'profit';
type SortDir = 'asc' | 'desc';

// Small seed to improve first-run UX; localStorage overrides it on load
const seed: Campaign[] = [
    {
        id: '1',
        name: 'US Viral Listicles Q1',
        start: '2025-01-05',
        end: '2025-01-20',
        clicks: 1200,
        cost: 500,
        revenue: 950,
    },
    {
        id: '2',
        name: 'Trending Health Quiz',
        start: '2025-01-01',
        end: '2025-01-07',
        clicks: 800,
        cost: 300,
        revenue: 280,
    },
];

export default function App() {
    // Source of truth lives here; children are dumb/presentational
    const [items, setItems] = useState<Campaign[]>(() => {
        const saved = loadCampaigns();
        return hasSaved() && saved ? saved : seed;
    });

    const [sortKey, setSortKey] = useState<SortKey>('name');
    const [sortDir, setSortDir] = useState<SortDir>('asc');

    // Persist on any mutation; localStorage is enough for this exercise
    useEffect(() => {
        saveCampaigns(items);
    }, [items]);

    function addCampaign(c: Campaign) {
        setItems(prev => [c, ...prev]);
    }
    function delCampaign(id: string) {
        setItems(prev => prev.filter(x => x.id !== id));
    }

    function onSort(k: SortKey) {
        if (k === sortKey) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
        else {
            setSortKey(k);
            setSortDir('asc');
        }
    }

    // Derived, stable view of data; avoids re-sorting on each render
    const sorted = useMemo(() => {
        const by = (a: Campaign, b: Campaign) => {
            const mult = sortDir === 'asc' ? 1 : -1;
            if (sortKey === 'profit') {
                const pa = a.revenue - a.cost,
                    pb = b.revenue - b.cost;
                return (pa - pb) * mult;
            }
            const va = (a as any)[sortKey],
                vb = (b as any)[sortKey];
            return (va > vb ? 1 : va < vb ? -1 : 0) * mult;
        };
        return [...items].sort(by);
    }, [items, sortKey, sortDir]);

    return (
        <main style={styles.wrap}>
            <h1>Campaign Cost & Revenue Report</h1>
            <CampaignForm onAdd={addCampaign} />
            <CampaignTable
                data={sorted}
                onDelete={delCampaign}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={onSort}
            />
        </main>
    );
}

const styles: Record<string, React.CSSProperties> = {
    wrap: {
        maxWidth: 980,
        margin: '24px auto',
        padding: 16,
        fontFamily: 'system-ui, sans-serif',
    },
};
