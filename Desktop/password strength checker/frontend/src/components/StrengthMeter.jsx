import { motion } from 'framer-motion';

const StrengthMeter = ({ score, level }) => {
    const getColor = (s) => {
        if (s >= 80) return 'var(--success)';
        if (s >= 60) return 'var(--accent-primary)';
        if (s >= 40) return 'var(--warning)';
        return 'var(--danger)';
    };

    const color = getColor(score);

    return (
        <div className="strength-container" style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Security Level</span>
                <span style={{ color: color, fontWeight: 'bold' }}>{level} ({score.toFixed(1)}%)</span>
            </div>
            <div className="strength-meter">
                <motion.div
                    className="strength-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%`, backgroundColor: color }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
        </div>
    );
};

export default StrengthMeter;
