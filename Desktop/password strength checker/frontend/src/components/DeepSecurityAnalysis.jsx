import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, AlertTriangle, Check, X, Clock, Database, Globe } from 'lucide-react';

const DeepSecurityAnalysis = ({ analysis }) => {
    const [steps, setSteps] = useState({
        structure: false,
        patterns: false,
        entropy: false,
        security: false,
        report: false
    });

    useEffect(() => {
        if (!analysis) return;

        // Reset steps
        setSteps({ structure: false, patterns: false, entropy: false, security: false, report: false });

        const sequence = async () => {
            await new Promise(r => setTimeout(r, 400));
            setSteps(prev => ({ ...prev, structure: true }));
            await new Promise(r => setTimeout(r, 400));
            setSteps(prev => ({ ...prev, patterns: true }));
            await new Promise(r => setTimeout(r, 400));
            setSteps(prev => ({ ...prev, entropy: true }));
            await new Promise(r => setTimeout(r, 400));
            setSteps(prev => ({ ...prev, security: true }));
            await new Promise(r => setTimeout(r, 600));
            setSteps(prev => ({ ...prev, report: true }));
        };

        sequence();
    }, [analysis]);

    if (!analysis) return null;

    return (
        <div className="glass-card" style={{ fontFamily: 'monospace', padding: '2.5rem', background: '#0f172a', color: '#33ff33', border: '1px solid #33ff33' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid #333', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                <Terminal size={32} />
                <span style={{ fontWeight: 'bold', fontSize: '1.8rem', letterSpacing: '1px' }}>DEEP SECURITY ANALYSIS MODE</span>
            </div>

            <div style={{ marginBottom: '3rem', fontSize: '1.2rem' }}>
                <AnalysisStep label="Analyzing structure..." completed={steps.structure} />
                <AnalysisStep label="Checking patterns..." completed={steps.patterns} />
                <AnalysisStep label="Testing entropy..." completed={steps.entropy} />
                <AnalysisStep label="Verifying security..." completed={steps.security} />
                <AnalysisStep label="Generating report..." completed={steps.report} />
            </div>

            {steps.report && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* Verdict Box */}
                    <div style={{ border: '2px solid #33ff33', padding: '2rem', marginBottom: '3rem', textAlign: 'center', background: 'rgba(51, 255, 51, 0.05)' }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>STRENGTH VERDICT</div>
                        <div style={{ fontSize: '4rem', fontWeight: '800', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', lineHeight: 1 }}>
                            {getVerdictIcon(analysis.strength_level)}
                            {analysis.strength_level}
                        </div>
                        <div style={{ fontSize: '2rem', marginTop: '1rem', fontWeight: 'bold' }}>
                            Score: {analysis.strength_score.toFixed(1)}/100
                        </div>
                        <div style={{ width: '100%', height: '16px', background: '#1e293b', marginTop: '2rem', borderRadius: '8px', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${analysis.strength_score}%` }}
                                style={{ height: '100%', background: getScoreColor(analysis.strength_score) }}
                            />
                        </div>
                    </div>

                    {/* Dashboard */}
                    <h3 style={{ borderBottom: '1px dashed #33ff33', paddingBottom: '1rem', marginBottom: '2rem', fontSize: '2rem' }}>
                        📊 SECURITY METRICS DASHBOARD
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                        {/* Composition */}
                        <div>
                            <div style={{ marginBottom: '1rem', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>🔤 Character Composition:</div>
                            <div style={{ fontSize: '1.25rem' }}>
                                <CompositionItem label="Lowercase Letters" present={analysis.composition.lowercase} details="(a-z)" />
                                <CompositionItem label="Uppercase Letters" present={analysis.composition.uppercase} details="(A-Z)" />
                                <CompositionItem label="Numeric Digits" present={analysis.composition.digits} details="(0-9)" />
                                <CompositionItem label="Special Symbols" present={analysis.composition.special} details="(!@#$)" />
                            </div>
                        </div>

                        {/* Stats */}
                        <div>
                            <div style={{ marginBottom: '1rem', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>📈 Statistical Analysis:</div>
                            <div style={{ border: '1px solid #333', padding: '1.5rem', display: 'grid', gap: '1rem', fontSize: '1.25rem', background: 'rgba(0,0,0,0.3)' }}>
                                <div>Length: <span style={{ color: '#fff', fontWeight: 'bold' }}>{analysis.length} chars</span></div>
                                <div>Entropy: <span style={{ color: '#fff', fontWeight: 'bold' }}>{analysis.entropy} bits</span></div>
                                <div>Charset: <span style={{ color: '#fff', fontWeight: 'bold' }}>{analysis.charset_size}</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Advanced Scores */}
                    <div style={{ marginBottom: '3rem' }}>
                        <div style={{ marginBottom: '1.5rem', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>🎯 Advanced Security Scores:</div>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <ProgressBar label="Uniqueness Score" value={analysis.score_metrics.uniqueness} />
                            <ProgressBar label="Pattern Resistance" value={analysis.score_metrics.pattern_resistance} />
                            <ProgressBar label="Dictionary Defense" value={analysis.score_metrics.dictionary_defense} />
                        </div>
                    </div>

                    {/* Vulnerabilities */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h4 style={{ borderBottom: '1px dashed #33ff33', paddingBottom: '1rem', marginBottom: '1.5rem', color: '#ef4444', fontSize: '1.8rem' }}>
                            🚨 SECURITY VULNERABILITIES
                        </h4>
                        <div style={{ fontSize: '1.25rem', lineHeight: 1.8 }}>
                            {analysis.weaknesses.length === 0 ? (
                                <div style={{ color: '#33ff33', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Check size={28} /> No critical vulnerabilities detected
                                </div>
                            ) : (
                                analysis.weaknesses.map((w, i) => (
                                    <div key={i} style={{ color: '#ef4444', marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                        <AlertTriangle size={24} style={{ flexShrink: 0, marginTop: '4px' }} />
                                        <span>{w.issue.toUpperCase()}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Crack Time & Breach */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                        <div style={{ background: 'rgba(51, 255, 51, 0.05)', padding: '1.5rem', borderRadius: '8px', border: '1px solid #33ff33' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                <Clock size={32} /> CRACK TIME ESTIMATION
                            </div>
                            <div style={{ paddingLeft: '0', color: '#fff', fontSize: '1.25rem' }}>
                                <div style={{ marginBottom: '0.5rem' }}>Time: <span style={{ color: '#33ff33', fontWeight: 'bold' }}>{analysis.crack_time_display}</span></div>
                                <div style={{ opacity: 0.8 }}>Scenario: GPU Attack (1B/sec)</div>
                            </div>
                        </div>

                        <div style={{ background: analysis.breach_check.breached ? 'rgba(239, 68, 68, 0.1)' : 'rgba(51, 255, 51, 0.05)', padding: '1.5rem', borderRadius: '8px', border: `1px solid ${analysis.breach_check.breached ? '#ef4444' : '#33ff33'}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                <Shield size={32} /> BREACH DATABASE CHECK
                            </div>
                            <div style={{ paddingLeft: '0', fontSize: '1.25rem' }}>
                                <div style={{ color: analysis.breach_check.breached ? '#ef4444' : '#33ff33', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                    Status: {analysis.breach_check.breached ? '⚠️ BREACHED' : '✓ CLEAN'}
                                </div>
                                <div style={{ opacity: 0.8 }}>
                                    Prefix: {analysis.breach_check.hash_prefix}***
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

const AnalysisStep = ({ label, completed }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', opacity: completed ? 1 : 0.5 }}>
        <span>{completed ? '✓' : '...'} {label}</span>
        <span>{completed ? 'Complete' : ''}</span>
    </div>
);

const CompositionItem = ({ label, present, details }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span>{present ? '✓' : '✗'} {label}</span>
        <span style={{ opacity: 0.5 }}>{present ? 'Present' : 'Missing'} {details}</span>
    </div>
);

const ProgressBar = ({ label, value }) => (
    <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <div style={{ width: '100%', height: '12px', background: '#1e293b', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ width: `${value}%`, height: '100%', background: '#33ff33' }} />
        </div>
    </div>
);

const getScoreColor = (score) => {
    if (score >= 80) return '#33ff33';
    if (score >= 60) return '#ffff33';
    if (score >= 40) return '#ffaa33';
    return '#ff3333';
};

const getVerdictIcon = (level) => {
    if (level.includes('VERY STRONG')) return '🛡️';
    if (level.includes('STRONG')) return '🔒';
    if (level.includes('MODERATE')) return '⚠️';
    return '💀';
};

export default DeepSecurityAnalysis;
