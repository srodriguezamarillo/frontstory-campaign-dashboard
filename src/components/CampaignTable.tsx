import type { Campaign } from '../lib/storage';

type SortKey = 'name' | 'start' | 'end' | 'profit';
type Props = {
    data: Campaign[];
    onDelete: (id: string) => void;
    sortKey: SortKey;
    sortDir: 'asc' | 'desc';
    onSort: (k: SortKey) => void;
};

export default function CampaignTable({
    data,
    onDelete,
    sortKey,
    sortDir,
    onSort,
}: Props) {
    // Clickable, accessible table headers with current sort indicator
    function header(label: string, key: SortKey) {
        const active =
            sortKey === key ? ` (${sortDir === 'asc' ? '↑' : '↓'})` : '';
        return (
            <th style={{ cursor: 'pointer' }} onClick={() => onSort(key)}>
                {label}
                {active}
            </th>
        );
    }

    return (
        <table style={styles.table}>
            <thead>
                <tr>
                    {header('Name', 'name')}
                    {header('Start', 'start')}
                    {header('End', 'end')}
                    <th>Clicks</th>
                    <th>Cost</th>
                    <th>Revenue</th>
                    {header('Profit', 'profit')}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map(c => {
                    const profit = c.revenue - c.cost;
                    return (
                        <tr key={c.id}>
                            <td>{c.name}</td>
                            <td>{c.start}</td>
                            <td>{c.end}</td>
                            <td>{c.clicks}</td>
                            <td>${c.cost.toFixed(2)}</td>
                            <td>${c.revenue.toFixed(2)}</td>
                            <td
                                style={{
                                    fontWeight: 600,
                                    color: profit >= 0 ? 'green' : 'crimson',
                                }}
                            >
                                ${profit.toFixed(2)}
                            </td>
                            <td>
                                <button onClick={() => onDelete(c.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

const styles: Record<string, React.CSSProperties> = {
    table: { width: '100%', borderCollapse: 'collapse' },
};
