import { Copy, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Suggestions = ({ suggestions }) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Could add toast here
    };

    return (
        <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Wand2 color="var(--accent-primary)" />
                <h2 style={{ fontSize: '1.5rem' }}>Smart Enhancements</h2>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {suggestions.map((item, index) => (
                    <motion.div
                        key={index}
                        className="glass-card"
                        style={{
                            padding: '1.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderLeft: '4px solid var(--accent-primary)'
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                    >
                        <div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', marginBottom: '0.25rem', fontWeight: '600' }}>
                                {item.method}
                            </div>
                            <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                {item.password}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                {item.description}
                            </div>
                        </div>

                        <button
                            className="btn btn-secondary"
                            onClick={() => copyToClipboard(item.password)}
                            style={{ padding: '0.75rem' }}
                            title="Copy to clipboard"
                        >
                            <Copy size={20} />
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Suggestions;
