import { useNavigate } from 'react-router-dom';
import { Search, Zap, Shuffle, Layers, BookOpen, Gamepad2, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: Search,
        title: 'Deep Analysis',
        desc: 'Advanced security auditing with breach detection.',
        path: '/analyze',
        color: 'var(--accent-primary)'
    },
    {
        icon: Zap,
        title: 'Smart Transformer',
        desc: 'Turn weak phrases into military-grade fortresses.',
        path: '/transform',
        color: '#ffff33' // Warning Yellow
    },
    {
        icon: Shuffle,
        title: 'Crypto Generator',
        desc: 'Generate maximum entropy cryptographic keys.',
        path: '/generate',
        color: '#33ff33' // Neon Green
    },
    {
        icon: Layers,
        title: 'Batch Audit',
        desc: 'Process multiple credentials simultaneously.',
        path: '/batch',
        color: '#ff3333' // Danger Red
    },
    {
        icon: BookOpen,
        title: 'Security Codex',
        desc: 'Access the knowledge base of digital defense.',
        path: '/academy',
        color: '#33ccff' // Neon Blue
    },
    {
        icon: Gamepad2,
        title: 'Hacker Training',
        desc: 'Test your skills in the password blitz arena.',
        path: '/game',
        color: '#ff33cc' // Neon Pink
    }
];

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div style={{ textAlign: 'center', margin: '4rem 0' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        display: 'inline-block',
                        padding: '1rem',
                        border: '1px solid var(--accent-primary)',
                        marginBottom: '1rem',
                        boxShadow: 'var(--shadow-glow)'
                    }}
                >
                    <Terminal size={48} color="var(--accent-primary)" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.1, fontFamily: 'monospace' }}
                >
                    SYSTEM <span className="text-gradient">SECURED</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem' }}
                >
                    Advanced tools to analyze, strengthen, and generate military-grade credentials.
                    Initialize your defense protocols.
                </motion.p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '2rem',
                paddingBottom: '4rem'
            }}>
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        className="glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                        onClick={() => navigate(feature.path)}
                        style={{
                            padding: '2rem',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            borderColor: feature.color + '40' // Add transparency to border
                        }}
                        whileHover={{ borderColor: feature.color, boxShadow: `0 0 15px ${feature.color}40` }}
                    >
                        <div style={{
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.5rem',
                            border: `1px solid ${feature.color}`,
                            boxShadow: `0 0 10px ${feature.color}20`
                        }}>
                            <feature.icon size={24} color={feature.color} />
                        </div>

                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: feature.color }}>{feature.title}</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>

                        <div style={{ marginTop: 'auto', paddingTop: '1rem', color: feature.color, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            [ EXECUTE ]
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Home;
