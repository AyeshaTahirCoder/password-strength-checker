import { useState, useEffect } from 'react';
import axios from 'axios';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import DeepSecurityAnalysis from '../components/DeepSecurityAnalysis';
import Suggestions from '../components/Suggestions';

const Analyze = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (password) {
                analyzePassword(password);
            } else {
                setAnalysis(null);
                setSuggestions([]);
            }
        }, 800); // Increased debounce slightly for the deep analysis feel
        return () => clearTimeout(timer);
    }, [password]);

    const analyzePassword = async (pwd) => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/analyze', { password: pwd });
            setAnalysis(res.data);

            if (res.data.strength_score < 80) {
                const suggRes = await axios.post('http://localhost:5000/api/generate', { password: pwd });
                setSuggestions(suggRes.data);
            } else {
                setSuggestions([]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Deep Security Analysis</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Advanced terminal-grade password auditing system</p>
            </motion.div>

            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <div style={{ position: 'relative' }}>
                    <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type={showPassword ? "text" : "password"}
                        className="glass-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="[!] Enter password to analyze..."
                        style={{ paddingLeft: '3rem', paddingRight: '3rem', fontFamily: 'monospace' }}
                        autoFocus
                    />
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer'
                        }}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {analysis && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <DeepSecurityAnalysis analysis={analysis} />

                        {suggestions.length > 0 && (
                            <div style={{ marginTop: '3rem' }}>
                                <Suggestions suggestions={suggestions} />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Analyze;
