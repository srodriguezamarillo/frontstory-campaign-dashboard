import { useState } from 'react';
import type { Campaign } from '../lib/storage';

type Props = {
    onAdd: (c: Campaign) => void;
};

export default function CampaignForm({ onAdd }: Props) {
    const [name, setName] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [clicks, setClicks] = useState<number | ''>('');
    const [cost, setCost] = useState<number | ''>('');
    const [revenue, setRevenue] = useState<number | ''>('');

    // Minimal synchronous validation; UX kept intentionally simple for the exercise
    const canSubmit =
        name.trim() &&
        start &&
        end &&
        clicks !== '' &&
        cost !== '' &&
        revenue !== '';

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!canSubmit) return;

        // Server would assign IDs in real life; here we use crypto for uniqueness
        const c: Campaign = {
            id: crypto.randomUUID(),
            name: name.trim(),
            start,
            end,
            clicks: Number(clicks),
            cost: Number(cost),
            revenue: Number(revenue),
        };
        onAdd(c);

        // Reset controlled inputs after a successful submit
        setName('');
        setStart('');
        setEnd('');
        setClicks('');
        setCost('');
        setRevenue('');
    }

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="date"
                value={start}
                onChange={e => setStart(e.target.value)}
            />
            <input
                type="date"
                value={end}
                onChange={e => setEnd(e.target.value)}
            />
            <input
                type="number"
                placeholder="Clicks"
                value={clicks}
                onChange={e =>
                    setClicks(
                        e.target.value === '' ? '' : Number(e.target.value)
                    )
                }
            />
            <input
                type="number"
                placeholder="Cost"
                value={cost}
                onChange={e =>
                    setCost(e.target.value === '' ? '' : Number(e.target.value))
                }
            />
            <input
                type="number"
                placeholder="Revenue"
                value={revenue}
                onChange={e =>
                    setRevenue(
                        e.target.value === '' ? '' : Number(e.target.value)
                    )
                }
            />
            <button disabled={!canSubmit}>Add</button>
        </form>
    );
}

const styles: Record<string, React.CSSProperties> = {
    // Grid keeps inputs aligned without pulling a CSS framework
    form: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7,1fr)',
        gap: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
};
