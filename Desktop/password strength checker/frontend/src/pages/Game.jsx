import { useState, useEffect } from 'react';
import axios from 'axios';
import { Gamepad2, Trophy, Timer, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Game = () => {
    const [gameState, setGameState] = useState('start'); // start, playing, won
    const [password, setPassword] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        let interval;
        if (gameState === 'playing' && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && gameState === 'playing') {
            setGameState('finished');
        }
        return () => clearInterval(interval);
    }, [gameState, timeLeft]);

    const handleCheck = async () => {
        if (!password) return;

        try {
            const res = await axios.post('http://localhost:5000/api/analyze', { password });
            const strength = res.data.strength_score;

            if (strength >= 80) {
                setScore(prev => prev + 100 + Math.floor(strength));
                setFeedback('EXCELLENT_MATCH! +100pts');
                setPassword('');
            } else if (strength >= 60) {
                setScore(prev => prev + 50);
                setFeedback('ACCEPTABLE. +50pts');
                setPassword('');
            } else {
                setFeedback('INSUFFICIENT_ENTROPY');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setTimeLeft(60);
        setPassword('');
        setFeedback('');
    };

    return (
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'inline-flex', padding: '1rem', border: '1px solid #ff33cc', borderRadius: '0.5rem', marginBottom: '1rem', boxShadow: '0 0 10px rgba(255, 51, 204, 0.2)' }}>
                    <Gamepad2 size={32} color="#ff33cc" />
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', fontFamily: 'monospace' }}>PASSWORD_BLITZ</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Generate high-entropy strings within the time limit.</p>
            </motion.div>

            <div className="glass-card" style={{ padding: '3rem', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {gameState === 'start' && (
                    <>
                        <Trophy size={64} color="var(--accent-primary)" style={{ marginBottom: '2rem' }} />
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'monospace' }}>INITIATE_TRAINING?</h2>
                        <button className="btn" onClick={startGame} style={{ fontSize: '1.25rem', padding: '1rem 3rem' }}>START_SESSION</button>
                    </>
                )}

                {gameState === 'playing' && (
                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Trophy color="var(--warning)" /> {score} PTS
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: timeLeft < 10 ? 'var(--danger)' : 'var(--text-primary)' }}>
                                <Timer /> {timeLeft}s
                            </div>
                        </div>

                        <input
                            className="glass-input"
                            style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                            placeholder="INPUT_PASSWORD..."
                            autoFocus
                        />
                        <p style={{ height: '30px', color: feedback.includes('EXCELLENT') ? 'var(--success)' : feedback.includes('ACCEPTABLE') ? 'var(--accent-primary)' : 'var(--danger)', fontWeight: 'bold', fontFamily: 'monospace' }}>{feedback}</p>
                    </div>
                )}

                {gameState === 'finished' && (
                    <>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--danger)', fontFamily: 'monospace' }}>SESSION_TERMINATED</h2>
                        <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', fontFamily: 'monospace' }}>FINAL_SCORE: <strong style={{ color: 'var(--accent-primary)' }}>{score}</strong></p>
                        <button className="btn" onClick={startGame} style={{ marginBottom: '1rem' }}>
                            <RefreshCcw size={18} /> RESTART
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Game;
