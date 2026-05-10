import { Shield, Brain, Hash, Type } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
    <motion.div
        className="glass-card"
        style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Icon size={18} color={color} />
            <span style={{ fontSize: '0.9rem' }}>{label}</span>
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
            {value}
        </div>
    </motion.div>
);

const AnalysisGrid = ({ analysis }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            margin: '2rem 0'
        }}>
            <StatCard
                icon={Hash}
                label="Length"
                value={`${analysis.length} chars`}
                color="#6366f1"
                delay={0.1}
            />
            <StatCard
                icon={Brain}
                label="Entropy"
                value={`${analysis.entropy.toFixed(1)} bits`}
                color="#0ea5e9"
                delay={0.2}
            />
            <StatCard
                icon={Type}
                label="Charset Size"
                value={analysis.charset_size}
                color="#10b981"
                delay={0.3}
            />
            <StatCard
                icon={Shield}
                label="Crack Time"
                value={analysis.crack_time}
                color="#f59e0b"
                delay={0.4}
            />
        </div>
    );
};

export default AnalysisGrid;
