import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, Github, Terminal } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Analyze', path: '/analyze' },
        { name: 'Transform', path: '/transform' },
        { name: 'Generate', path: '/generate' },
        { name: 'Audit', path: '/batch' }, // Renamed from Batch
        { name: 'Academy', path: '/academy' },
        { name: 'Game', path: '/game' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <header style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                background: 'rgba(5, 5, 5, 0.8)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid var(--border-dim)'
            }}>
                <div className="container" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                        <div style={{
                            border: '1px solid var(--accent-primary)',
                            padding: '0.4rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 10px rgba(51, 255, 51, 0.2)'
                        }}>
                            <Terminal size={20} color="var(--accent-primary)" />
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '1px' }}>
                            PASS<span style={{ color: 'var(--accent-primary)' }}>_PRO</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav style={{ display: 'none', gap: '1.5rem' }} className="desktop-nav">
                        <style>{`
                @media (min-width: 1024px) {
                  .desktop-nav { display: flex !important; }
                  .mobile-menu-btn { display: none !important; }
                }
              `}</style>
                        {navLinks.slice(0, 5).map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    textDecoration: 'none',
                                    color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                    fontWeight: location.pathname === link.path ? '700' : '500',
                                    transition: 'color 0.2s',
                                    textTransform: 'uppercase',
                                    fontSize: '0.9rem',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                {location.pathname === link.path && '> '}{link.name}
                            </Link>
                        ))}
                    </nav>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                            <Github size={20} />
                        </a>
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-primary)' }}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'fixed',
                            top: '73px',
                            left: 0,
                            right: 0,
                            background: '#050505',
                            borderBottom: '1px solid var(--border-color)',
                            padding: '1rem',
                            zIndex: 49,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            boxShadow: 'var(--shadow-lg)'
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    textDecoration: 'none',
                                    color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                    fontWeight: '600',
                                    padding: '0.75rem',
                                    border: location.pathname === link.path ? '1px solid var(--accent-primary)' : '1px solid transparent',
                                    background: location.pathname === link.path ? 'rgba(51, 255, 51, 0.1)' : 'transparent',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {location.pathname === link.path && '> '}{link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <main style={{ flex: 1, position: 'relative' }}>
                {children}
            </main>

            <footer style={{
                borderTop: '1px solid var(--border-dim)',
                padding: '2rem 0',
                marginTop: '4rem',
                background: '#0a0f12'
            }}>
                <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <p style={{ fontFamily: 'monospace' }}>
                        <span style={{ color: 'var(--accent-primary)' }}>root@passpro:~$</span> echo "© 2026 Secure Password Pro"
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
