import { useState } from 'react';
import axios from 'axios';
import { Zap, ArrowRight, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Suggestions from '../components/Suggestions';

const Transform = () => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleTransform = async () => {
        if (!input) return;
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/generate', { password: input });
            setSuggestions(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div style={{ display: 'inline-flex', padding: '1rem', border: '1px solid var(--warning)', borderRadius: '0.5rem', marginBottom: '1rem', boxShadow: '0 0 10px rgba(255, 255, 51, 0.2)' }}>
                    <Zap size={32} color="var(--warning)" />
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', fontFamily: 'monospace' }}>SMART_TRANSFORM</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Convert weak signals into fortified credentials.</p>
            </motion.div>

            <div className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <label style={{ fontWeight: '600', color: 'var(--accent-primary)', fontFamily: 'monospace' }}>[ INPUT_PHRASE ]</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        className="glass-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. 'ilovecoffee'"
                        onKeyDown={(e) => e.key === 'Enter' && handleTransform()}
                    />
                    <button className="btn" onClick={handleTransform} disabled={loading} style={{ minWidth: '160px' }}>
                        {loading ? 'PROCESSING...' : <><Wand2 size={18} /> ENHANCE</>}
                    </button>
                </div>
            </div>

            {suggestions.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '2rem' }}>
                    <Suggestions suggestions={suggestions} />
                </motion.div>
            )}
        </div>
    );
};

export default Transform;
