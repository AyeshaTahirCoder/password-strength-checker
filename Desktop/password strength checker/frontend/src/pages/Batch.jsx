import { useState } from 'react';
import axios from 'axios';
import { Layers, Download, Play, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Batch = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleBatchAnalyze = async () => {
        if (!input.trim()) return;
        setLoading(true);
        const passwords = input.split('\n').filter(p => p.trim());

        try {
            const promises = passwords.map(pwd =>
                axios.post('http://localhost:5000/api/analyze', { password: pwd })
                    .then(res => ({ password: pwd, ...res.data }))
                    .catch(err => ({ password: pwd, error: true }))
            );

            const data = await Promise.all(promises);
            setResults(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const downloadCSV = () => {
        const headers = "Password,Strength Score,Strength Level,Crack Time,Entropy\n";
        const rows = results.map(r =>
            `"${r.password}",${r.strength_score},${r.strength_level},"${r.crack_time}",${r.entropy}`
        ).join("\n");

        const blob = new Blob([headers + rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'password_analysis.csv';
        a.click();
    };

    return (
        <div className="container" style={{ maxWidth: '1000px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'inline-flex', padding: '1rem', border: '1px solid var(--danger)', borderRadius: '0.5rem', marginBottom: '1rem', boxShadow: '0 0 10px rgba(255, 51, 51, 0.2)' }}>
                    <Layers size={32} color="var(--danger)" />
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', fontFamily: 'monospace' }}>BATCH_AUDIT_MODE</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Multi-target credential evaluation protocol.</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem', color: 'var(--accent-primary)', fontFamily: 'monospace' }}>[ INPUT_STREAM ]</label>
                    <textarea
                        className="glass-input"
                        style={{ height: '300px', resize: 'vertical', fontFamily: 'monospace', borderRadius: '4px' }}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="admin&#10;password123&#10;CorrectHorseBatteryStaple"
                    />
                    <button className="btn" style={{ marginTop: '1rem', width: '100%' }} onClick={handleBatchAnalyze} disabled={loading}>
                        {loading ? 'ANALYZING...' : <><Play size={18} /> INITIATE_SCAN</>}
                    </button>
                </div>

                <div className="glass-card" style={{ padding: '2rem', maxHeight: '500px', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontWeight: '700', fontFamily: 'monospace' }}>SCAN_RESULTS ({results.length})</h3>
                        {results.length > 0 && (
                            <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={downloadCSV}>
                                <Download size={16} /> EXPORT_CSV
                            </button>
                        )}
                    </div>

                    {results.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '4rem', fontFamily: 'monospace' }}>
                            Awaiting Input Stream...
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {results.map((res, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    style={{
                                        padding: '1rem',
                                        background: 'rgba(0,0,0,0.5)',
                                        border: '1px solid var(--border-dim)',
                                        borderLeft: `4px solid ${res.strength_score >= 80 ? 'var(--success)' :
                                            res.strength_score >= 60 ? 'var(--accent-primary)' :
                                                res.strength_score >= 40 ? 'var(--warning)' : 'var(--danger)'
                                            }`,
                                        fontFamily: 'monospace'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{res.password}</span>
                                        <span style={{
                                            color: res.strength_score >= 80 ? 'var(--success)' :
                                                res.strength_score >= 60 ? 'var(--accent-primary)' :
                                                    res.strength_score >= 40 ? 'var(--warning)' : 'var(--danger)',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase'
                                        }}>
                                            {res.strength_level}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        Score: {res.strength_score?.toFixed(1)} • Time: {res.crack_time}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Batch;
