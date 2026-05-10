import { motion } from 'framer-motion';
import { BookOpen, Shield, Key, Lock, UserX, Smartphone, RefreshCw } from 'lucide-react';

const lessons = [
    {
        icon: Key,
        title: "Length is Strength",
        content: "The most important factor in password security is length. Each additional character exponentially increases the search space."
    },
    {
        icon: Shield,
        title: "Complexity Matters",
        content: "Mix uppercase, lowercase, numbers, and symbols. High entropy makes brute-force attacks statistically impossible."
    },
    {
        icon: UserX,
        title: "Avoid Personal Info",
        content: "Never use names, dates, or recognizable patterns. Social engineering is the easiest vector for attack."
    },
    {
        icon: RefreshCw,
        title: "Don't Recycle",
        content: "Credential stuffing attacks exploit reused passwords. Unique credentials for every service are mandatory."
    },
    {
        icon: Lock,
        title: "Use Managers",
        content: "Human memory is fallible. Use a cryptographically secure password manager to generate and store keys."
    },
    {
        icon: Smartphone,
        title: "Enable 2FA",
        content: "Two-Factor Authentication provides a critical fail-safe even if primary credentials are compromised."
    }
];

const Academy = () => {
    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div style={{ display: 'inline-flex', padding: '1rem', border: '1px solid #33ccff', borderRadius: '0.5rem', marginBottom: '1rem', boxShadow: '0 0 10px rgba(51, 204, 255, 0.2)' }}>
                    <BookOpen size={32} color="#33ccff" />
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', fontFamily: 'monospace' }}>SECURITY_CODEX</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Master the art of digital defense.</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {lessons.map((lesson, i) => (
                    <motion.div
                        key={i}
                        className="glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={{ padding: '2rem' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.5rem', border: '1px solid var(--accent-primary)', borderRadius: '4px' }}>
                                <lesson.icon size={20} color="var(--accent-primary)" />
                            </div>
                            <h3 style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{lesson.title}</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            {lesson.content}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Academy;
