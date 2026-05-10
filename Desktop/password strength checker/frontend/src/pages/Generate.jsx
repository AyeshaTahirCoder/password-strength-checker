import { useState, useEffect } from 'react';
import axios from 'axios';
import { Shuffle, RefreshCw, Copy, Check, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import StrengthMeter from '../components/StrengthMeter';

const Generate = () => {
    const [password, setPassword] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const generatePassword = async () => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/generate', { password: '' });
            if (res.data && res.data.length > 0) {
                const newPwd = res.data[res.data.length - 1].password;
                setPassword(newPwd);

                const anaRes = await axios.post('http://localhost:5000/api/analyze', { password: newPwd });
                setAnalysis(anaRes.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setCopied(false);
        }
    };

    useEffect(() => {
        generatePassword();
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'inline-flex', padding: '1rem', border: '1px solid var(--accent-primary)', borderRadius: '0.5rem', marginBottom: '1rem', boxShadow: '0 0 10px rgba(51, 255, 51, 0.2)' }}>
                    <Shuffle size={32} color="var(--accent-primary)" />
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', fontFamily: 'monospace' }}>CRYPTO_GENERATOR</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Initialize high-entropy string generation protocol.</p>
            </motion.div>

            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <div style={{
                    fontSize: '2.5rem',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    marginBottom: '2rem',
                    wordBreak: 'break-all',
                    color: 'var(--text-success)',
                    textShadow: '0 0 10px rgba(51, 255, 51, 0.4)'
                }}>
                    {loading ? <span style={{ opacity: 0.5 }}>INITIALIZING...</span> : password}
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                    <button className="btn" onClick={generatePassword} disabled={loading}>
                        <RefreshCw size={20} className={loading ? 'spin' : ''} /> {loading ? 'GENERATING' : 'REROLL'}
                    </button>
                    <button className="btn btn-secondary" onClick={copyToClipboard}>
                        {copied ? <Check size={20} color="var(--success)" /> : <Copy size={20} />}
                        {copied ? 'COPIED' : 'COPY'}
                    </button>
                </div>

                {analysis && (
                    <div style={{ textAlign: 'left', background: '#000', padding: '1.5rem', borderRadius: '4px', border: '1px solid var(--border-dim)' }}>
                        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <Terminal size={14} /> ANALYSIS_RESULT:
                        </div>
                        <StrengthMeter score={analysis.strength_score} level={analysis.strength_level} />
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                            <span>Entropy: <strong style={{ color: 'var(--accent-primary)' }}>{analysis.entropy.toFixed(1)} bits</strong></span>
                            <span>Crack_Time: <strong style={{ color: 'var(--accent-primary)' }}>{analysis.crack_time}</strong></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Generate;
