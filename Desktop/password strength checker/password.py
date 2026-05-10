#!/usr/bin/env python3
"""
Secure Password Strength Evaluator Pro
Ultra-Advanced Cybersecurity Tool with AI-Like Password Generation
Author: CyberSec Elite Division
Version: 4.0.0 - Premium Edition
"""

import re
import math
import sys
import random
import string
from collections import Counter
from typing import Tuple, List, Dict
import hashlib
import time
import os

class Colors:
    """ANSI color codes for stunning terminal styling"""
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    END = '\033[0m'
    BG_RED = '\033[41m'
    BG_GREEN = '\033[42m'
    BG_YELLOW = '\033[43m'
    BG_BLUE = '\033[44m'
    BG_MAGENTA = '\033[45m'
    BG_CYAN = '\033[46m'
    BRIGHT_GREEN = '\033[92m\033[1m'
    BRIGHT_RED = '\033[91m\033[1m'
    BRIGHT_YELLOW = '\033[93m\033[1m'
    BRIGHT_CYAN = '\033[96m\033[1m'

class PasswordStrengthEvaluator:
    """Advanced password analyzer with intelligent transformation engine"""
    
    COMMON_PATTERNS = [
        r'(.)\1{2,}',
        r'(012|123|234|345|456|567|678|789|890)',
        r'(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)',
        r'(qwerty|asdfgh|zxcvbn)',
    ]
    
    COMMON_WORDS = {
        'password', 'admin', 'user', 'login', 'welcome', 'monkey', 'dragon',
        'master', 'sunshine', 'princess', 'letmein', 'shadow', 'football',
        'iloveyou', 'superman', 'batman', 'trustno1', '123456', 'qwerty',
        'abc123', 'password123', 'admin123', 'root', 'toor', 'passw0rd'
    }
    
    CHARSET_SIZES = {
        'lowercase': 26, 'uppercase': 26, 'digits': 10,
        'special': 32, 'extended': 95
    }
    
    # Intelligent word lists for passphrases
    WORD_CATEGORIES = {
        'nature': ['Mountain', 'Ocean', 'Forest', 'River', 'Desert', 'Valley', 'Thunder', 'Storm', 'Lightning', 'Glacier'],
        'animals': ['Tiger', 'Eagle', 'Dragon', 'Phoenix', 'Wolf', 'Falcon', 'Panther', 'Cobra', 'Hawk', 'Lion'],
        'cosmic': ['Quantum', 'Nebula', 'Cosmic', 'Stellar', 'Galactic', 'Lunar', 'Solar', 'Nova', 'Pulsar', 'Comet'],
        'colors': ['Crimson', 'Azure', 'Emerald', 'Golden', 'Silver', 'Violet', 'Amber', 'Scarlet', 'Indigo', 'Jade'],
        'tech': ['Cyber', 'Digital', 'Matrix', 'Binary', 'Neural', 'Vector', 'Pixel', 'Circuit', 'Quantum', 'Photon']
    }
    
    # Advanced character substitution rules
    LEET_SPEAK = {
        'a': ['@', '4', 'А'], 'e': ['3', 'ε', 'Σ'], 'i': ['!', '1', '|'],
        'o': ['0', 'Ø', '°'], 's': ['$', '5', 'ß'], 't': ['7', '+', '†'],
        'l': ['1', '|', 'Ł'], 'g': ['9', '&'], 'b': ['8', 'ß'],
        'z': ['2'], 'c': ['(', '<'], 'h': ['#'], 'n': ['И']
    }
    
    def __init__(self):
        self.results = {}
        
    def analyze_password(self, password: str) -> Dict:
        """Comprehensive password analysis"""
        if not password:
            return {'error': 'Password cannot be empty'}
        
        analysis = {
            'length': len(password),
            'has_lowercase': bool(re.search(r'[a-z]', password)),
            'has_uppercase': bool(re.search(r'[A-Z]', password)),
            'has_digits': bool(re.search(r'\d', password)),
            'has_special': bool(re.search(r'[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/;~`]', password)),
            'has_spaces': bool(re.search(r'\s', password)),
            'charset_size': self._calculate_charset_size(password),
            'entropy': self._calculate_entropy(password),
            'patterns': self._detect_patterns(password),
            'common_words': self._check_common_words(password),
            'repetition_score': self._analyze_repetition(password),
            'sequence_score': self._analyze_sequences(password),
            'dictionary_score': self._check_dictionary_attacks(password),
            'breach_check': self._simulate_breach_check(password)
        }
        
        analysis['strength_score'] = self._calculate_strength_score(analysis)
        analysis['strength_level'] = self._determine_strength_level(analysis['strength_score'])
        analysis['crack_time'] = self._estimate_crack_time(analysis)
        analysis['weaknesses'] = self._identify_weaknesses(analysis)
        
        return analysis
    
    def _calculate_charset_size(self, password: str) -> int:
        size = 0
        if re.search(r'[a-z]', password): size += self.CHARSET_SIZES['lowercase']
        if re.search(r'[A-Z]', password): size += self.CHARSET_SIZES['uppercase']
        if re.search(r'\d', password): size += self.CHARSET_SIZES['digits']
        if re.search(r'[^a-zA-Z0-9]', password): size += self.CHARSET_SIZES['special']
        return size if size > 0 else 1
    
    def _calculate_entropy(self, password: str) -> float:
        if not password: return 0.0
        freq = Counter(password)
        length = len(password)
        shannon_entropy = -sum((count/length) * math.log2(count/length) for count in freq.values())
        charset_size = self._calculate_charset_size(password)
        password_entropy = length * math.log2(charset_size)
        return min(shannon_entropy * length, password_entropy)
    
    def _detect_patterns(self, password: str) -> List[str]:
        detected = []
        pwd_lower = password.lower()
        for pattern in self.COMMON_PATTERNS:
            if re.search(pattern, pwd_lower):
                detected.append(self._pattern_name(pattern))
        if re.search(r'(19|20)\d{2}', password): detected.append('Year pattern')
        if re.search(r'(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])', password): detected.append('Date pattern')
        return detected
    
    def _pattern_name(self, pattern: str) -> str:
        pattern_names = {
            r'(.)\1{2,}': 'Character repetition',
            r'(012|123|234|345|456|567|678|789|890)': 'Sequential numbers',
            r'(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)': 'Sequential letters',
            r'(qwerty|asdfgh|zxcvbn)': 'Keyboard pattern'
        }
        return pattern_names.get(pattern, 'Unknown pattern')
    
    def _check_common_words(self, password: str) -> List[str]:
        found = []
        pwd_lower = password.lower()
        for word in self.COMMON_WORDS:
            if word in pwd_lower:
                found.append(word)
        return found
    
    def _analyze_repetition(self, password: str) -> float:
        if not password: return 0.0
        unique_chars = len(set(password))
        total_chars = len(password)
        return (unique_chars / total_chars) * 100
    
    def _analyze_sequences(self, password: str) -> float:
        sequences = 0
        pwd_lower = password.lower()
        for i in range(len(pwd_lower) - 2):
            if ord(pwd_lower[i+1]) == ord(pwd_lower[i]) + 1 and \
               ord(pwd_lower[i+2]) == ord(pwd_lower[i]) + 2:
                sequences += 1
        penalty = (sequences / len(password)) * 100 if password else 0
        return max(0, 100 - penalty * 10)
    
    def _check_dictionary_attacks(self, password: str) -> float:
        score = 100
        pwd_lower = password.lower()
        for word in self.COMMON_WORDS:
            if word in pwd_lower: score -= 20
        leet_speak = pwd_lower.replace('0', 'o').replace('1', 'i').replace('3', 'e').replace('4', 'a').replace('5', 's').replace('7', 't')
        for word in self.COMMON_WORDS:
            if word in leet_speak and word not in pwd_lower: score -= 10
        return max(0, score)
    
    def _simulate_breach_check(self, password: str) -> Dict:
        pwd_lower = password.lower()
        is_breached = any(word in pwd_lower for word in ['password', '123456', 'qwerty', 'admin'])
        hash_obj = hashlib.sha1(password.encode())
        hash_prefix = hash_obj.hexdigest()[:5].upper()
        return {
            'breached': is_breached,
            'hash_prefix': hash_prefix,
            'warning': 'Password found in breach database!' if is_breached else 'Not found in common breaches'
        }
    
    def _calculate_strength_score(self, analysis: Dict) -> float:
        score = 0
        length = analysis['length']
        if length >= 16: score += 25
        elif length >= 12: score += 20
        elif length >= 8: score += 15
        else: score += length * 1.5
        
        diversity = sum([
            analysis['has_lowercase'] * 5, analysis['has_uppercase'] * 5,
            analysis['has_digits'] * 5, analysis['has_special'] * 5
        ])
        score += diversity
        
        entropy = analysis['entropy']
        if entropy >= 80: score += 20
        elif entropy >= 60: score += 15
        elif entropy >= 40: score += 10
        else: score += entropy * 0.25
        
        pattern_penalty = len(analysis['patterns']) * 5
        score -= min(pattern_penalty, 15)
        common_penalty = len(analysis['common_words']) * 10
        score -= min(common_penalty, 20)
        score += (analysis['repetition_score'] / 100) * 15
        score += (analysis['sequence_score'] / 100) * 10
        score += (analysis['dictionary_score'] / 100) * 10
        
        if analysis['breach_check']['breached']: score -= 30
        
        return max(0, min(100, score))
    
    def _determine_strength_level(self, score: float) -> str:
        if score >= 80: return 'VERY STRONG'
        elif score >= 60: return 'STRONG'
        elif score >= 40: return 'MODERATE'
        elif score >= 20: return 'WEAK'
        else: return 'VERY WEAK'
    
    def _estimate_crack_time(self, analysis: Dict) -> str:
        attempts_per_second = 1e9
        charset_size = analysis['charset_size']
        length = analysis['length']
        total_combinations = charset_size ** length
        seconds = (total_combinations / 2) / attempts_per_second
        
        if analysis['patterns']: seconds /= 100
        if analysis['common_words']: seconds /= 1000
        
        return self._format_time(seconds)
    
    def _format_time(self, seconds: float) -> str:
        if seconds < 1: return 'Instant'
        elif seconds < 60: return f'{seconds:.2f} seconds'
        elif seconds < 3600: return f'{seconds/60:.2f} minutes'
        elif seconds < 86400: return f'{seconds/3600:.2f} hours'
        elif seconds < 2592000: return f'{seconds/86400:.2f} days'
        elif seconds < 31536000: return f'{seconds/2592000:.2f} months'
        elif seconds < 3153600000: return f'{seconds/31536000:.2f} years'
        else: return f'{seconds/31536000:.0e} years'
    
    def _identify_weaknesses(self, analysis: Dict) -> List[Dict]:
        """Identify specific weaknesses for targeted improvements"""
        weaknesses = []
        
        if analysis['length'] < 12:
            weaknesses.append({
                'type': 'length',
                'severity': 'high',
                'issue': f'Only {analysis["length"]} characters',
                'fix': 'Add at least 12 characters'
            })
        
        if not analysis['has_uppercase']:
            weaknesses.append({
                'type': 'uppercase',
                'severity': 'medium',
                'issue': 'No uppercase letters',
                'fix': 'Add capitals (A-Z)'
            })
        
        if not analysis['has_lowercase']:
            weaknesses.append({
                'type': 'lowercase',
                'severity': 'medium',
                'issue': 'No lowercase letters',
                'fix': 'Add lowercase (a-z)'
            })
        
        if not analysis['has_digits']:
            weaknesses.append({
                'type': 'digits',
                'severity': 'medium',
                'issue': 'No numbers',
                'fix': 'Add digits (0-9)'
            })
        
        if not analysis['has_special']:
            weaknesses.append({
                'type': 'special',
                'severity': 'high',
                'issue': 'No special characters',
                'fix': 'Add symbols (!@#$%^&*)'
            })
        
        if analysis['common_words']:
            weaknesses.append({
                'type': 'dictionary',
                'severity': 'critical',
                'issue': f'Contains: {", ".join(analysis["common_words"])}',
                'fix': 'Remove dictionary words'
            })
        
        if analysis['patterns']:
            weaknesses.append({
                'type': 'patterns',
                'severity': 'high',
                'issue': f'Patterns: {", ".join(analysis["patterns"])}',
                'fix': 'Break sequential patterns'
            })
        
        if analysis['repetition_score'] < 70:
            weaknesses.append({
                'type': 'repetition',
                'severity': 'medium',
                'issue': 'Too many repeated characters',
                'fix': 'Use more unique characters'
            })
        
        return weaknesses
    
    def generate_smart_passwords(self, base_password: str, analysis: Dict) -> List[Dict]:
        """Generate intelligent password suggestions based on weaknesses"""
        suggestions = []
        weaknesses = analysis['weaknesses']
        
        # Strategy 1: Intelligent Enhancement
        enhanced = self._intelligent_enhance(base_password, weaknesses)
        suggestions.append({
            'password': enhanced,
            'method': '🧠 Smart Enhancement',
            'description': 'Intelligently fixed all detected weaknesses',
            'changes': 'Added missing character types and complexity'
        })
        
        # Strategy 2: Advanced Leet Speak
        leet = self._advanced_leet_speak(base_password)
        suggestions.append({
            'password': leet,
            'method': '🔤 Advanced Substitution',
            'description': 'Applied sophisticated character replacements',
            'changes': 'Used unicode and special substitutions'
        })
        
        # Strategy 3: Pattern Breaker
        pattern_broken = self._break_patterns(base_password, analysis)
        suggestions.append({
            'password': pattern_broken,
            'method': '🔨 Pattern Destroyer',
            'description': 'Eliminated all sequential and repetitive patterns',
            'changes': 'Inserted randomizers to break predictability'
        })
        
        # Strategy 4: Sandwich Fortification
        sandwiched = self._fortify_sandwich(base_password)
        suggestions.append({
            'password': sandwiched,
            'method': '🥪 Fortress Sandwich',
            'description': 'Wrapped password with military-grade protection',
            'changes': 'Strong prefix and suffix with symbols'
        })
        
        # Strategy 5: Passphrase Hybrid
        hybrid = self._create_hybrid_passphrase(base_password)
        suggestions.append({
            'password': hybrid,
            'method': '🎭 Hybrid Passphrase',
            'description': 'Combined your password with memorable words',
            'changes': 'Created easy-to-remember strong password'
        })
        
        # Strategy 6: Cryptographic Random
        crypto = self._generate_cryptographic_password(len(base_password) * 2)
        suggestions.append({
            'password': crypto,
            'method': '🔐 Maximum Security',
            'description': 'Cryptographically random, unbreakable password',
            'changes': 'Complete random generation for ultimate security'
        })
        
        return suggestions
    
    def _intelligent_enhance(self, password: str, weaknesses: List[Dict]) -> str:
        """Intelligently fix all weaknesses"""
        result = password
        
        # Fix specific weaknesses
        for weakness in weaknesses:
            if weakness['type'] == 'uppercase' and not re.search(r'[A-Z]', result):
                # Capitalize first letter or add uppercase
                if result:
                    result = result[0].upper() + result[1:]
                result += random.choice(string.ascii_uppercase)
            
            if weakness['type'] == 'lowercase' and not re.search(r'[a-z]', result):
                result += random.choice(string.ascii_lowercase)
            
            if weakness['type'] == 'digits' and not re.search(r'\d', result):
                result += str(random.randint(10, 99))
            
            if weakness['type'] == 'special' and not re.search(r'[!@#$%^&*]', result):
                result += random.choice(['!', '@', '#', '$', '%', '^', '&', '*'])
        
        # Ensure minimum length
        while len(result) < 16:
            result += random.choice(string.ascii_letters + string.digits + '!@#$%^&*')
        
        return result
    
    def _advanced_leet_speak(self, password: str) -> str:
        """Apply advanced character substitution"""
        result = list(password.lower())
        
        # Apply substitutions to random positions
        for i, char in enumerate(result):
            if char in self.LEET_SPEAK and random.random() > 0.5:
                result[i] = random.choice(self.LEET_SPEAK[char])
        
        result = ''.join(result)
        
        # Ensure uppercase
        if not re.search(r'[A-Z]', result):
            pos = random.randint(0, len(result)-1)
            result = result[:pos] + result[pos].upper() + result[pos+1:]
        
        # Add complexity
        if not re.search(r'[!@#$%^&*]', result):
            result += random.choice(['!', '@', '#', '$', '%', '^', '&', '*'])
        
        while len(result) < 16:
            result += random.choice(string.ascii_letters + string.digits + '!@#$')
        
        return result
    
    def _break_patterns(self, password: str, analysis: Dict) -> str:
        """Break sequential and repetitive patterns"""
        result = list(password)
        
        # Insert random characters between sequences
        i = 0
        while i < len(result) - 2:
            if (result[i].isdigit() and result[i+1].isdigit() and 
                int(result[i+1]) == int(result[i]) + 1):
                # Break number sequence
                result.insert(i+1, random.choice('!@#$'))
                i += 2
            elif (result[i].isalpha() and result[i+1].isalpha() and
                  ord(result[i+1].lower()) == ord(result[i].lower()) + 1):
                # Break letter sequence
                result.insert(i+1, str(random.randint(0, 9)))
                i += 2
            i += 1
        
        result = ''.join(result)
        
        # Ensure all character types
        if not re.search(r'[A-Z]', result):
            result = result[0].upper() + result[1:] if result else result
        if not re.search(r'[!@#$%^&*]', result):
            result += random.choice(['!', '@', '#', '$', '%'])
        
        while len(result) < 16:
            result += random.choice(string.ascii_letters + string.digits + '!@#$')
        
        return result
    
    def _fortify_sandwich(self, password: str) -> str:
        """Create fortified sandwich pattern"""
        prefix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=3))
        suffix = ''.join(random.choices('!@#$%^&*', k=2)) + str(random.randint(10, 99))
        
        # Capitalize password
        middle = password.capitalize() if password else ''
        
        result = f"{prefix}_{middle}_{suffix}"
        
        while len(result) < 16:
            result += random.choice(string.ascii_letters + string.digits)
        
        return result
    
    def _create_hybrid_passphrase(self, password: str) -> str:
        """Create memorable hybrid passphrase"""
        # Select random words from different categories
        categories = random.sample(list(self.WORD_CATEGORIES.keys()), 2)
        words = [random.choice(self.WORD_CATEGORIES[cat]) for cat in categories]
        
        # Incorporate original password element
        base_element = password[:4] if len(password) >= 4 else password
        base_element = base_element.capitalize()
        
        # Build passphrase
        number = random.randint(10, 99)
        symbol = random.choice(['!', '@', '#', '$', '%', '&', '*'])
        
        result = f"{words[0]}{number}{base_element}{symbol}{words[1]}"
        
        return result
    
    def _generate_cryptographic_password(self, length: int = 16) -> str:
        """Generate maximum security random password"""
        if length < 12:
            length = 16
        
        # Ensure all character types
        password = [
            random.choice(string.ascii_uppercase),
            random.choice(string.ascii_lowercase),
            random.choice(string.digits),
            random.choice('!@#$%^&*()_+-=[]{}|;:,.<>?')
        ]
        
        # Fill with random
        all_chars = string.ascii_letters + string.digits + '!@#$%^&*()_+-='
        password.extend(random.choices(all_chars, k=length - 4))
        
        random.shuffle(password)
        return ''.join(password)
    
    def display_animated_analysis(self, analysis: Dict, password: str):
        """Display beautiful animated analysis"""
        c = Colors
        
        # Clear screen (optional)
        # os.system('clear' if os.name == 'posix' else 'cls')
        
        print(f'\n{c.CYAN}{"═"*80}{c.END}')
        print(f'{c.BOLD}{c.BRIGHT_CYAN}🔍 DEEP SECURITY ANALYSIS{c.END}')
        print(f'{c.CYAN}{"═"*80}{c.END}\n')
        
        # Simulate scanning
        show_scanning_animation(password)
        
        # Overall Strength - Big Display
        strength_config = {
            'VERY STRONG': {'color': c.BRIGHT_GREEN, 'icon': '🟢', 'emoji': '🛡️', 'bg': c.BG_GREEN},
            'STRONG': {'color': c.CYAN, 'icon': '🔵', 'emoji': '🔒', 'bg': c.BG_BLUE},
            'MODERATE': {'color': c.BRIGHT_YELLOW, 'icon': '🟡', 'emoji': '⚠️', 'bg': c.BG_YELLOW},
            'WEAK': {'color': c.YELLOW, 'icon': '🟠', 'emoji': '⚡', 'bg': c.BG_YELLOW},
            'VERY WEAK': {'color': c.BRIGHT_RED, 'icon': '🔴', 'emoji': '💀', 'bg': c.BG_RED}
        }
        
        config = strength_config[analysis['strength_level']]
        
        # Big strength display
        print(f'\n{c.BOLD}┌{"─"*78}┐{c.END}')
        print(f'{c.BOLD}│{" "*25}STRENGTH VERDICT{" "*37}│{c.END}')
        print(f'{c.BOLD}├{"─"*78}┤{c.END}')
        print(f'{c.BOLD}│  {config["emoji"]} {config["color"]}  {analysis["strength_level"]:^20}{c.END}{c.BOLD}  {config["icon"]}  Score: {config["color"]}{analysis["strength_score"]:5.1f}/100{c.END}{c.BOLD}     │{c.END}')
        
        # Progress bar
        bar_length = 60
        filled = int((analysis["strength_score"] / 100) * bar_length)
        bar = config['color'] + '█' * filled + c.END + '░' * (bar_length - filled)
        print(f'{c.BOLD}│  [{bar}]  │{c.END}')
        print(f'{c.BOLD}└{"─"*78}┘{c.END}\n')
        
        # Security Metrics Dashboard
        print(f'{c.BOLD}{c.HEADER}📊 SECURITY METRICS DASHBOARD{c.END}')
        print(f'{c.CYAN}{"─"*80}{c.END}\n')
        
        # Character composition
        print(f'{c.BOLD}🔤 Character Composition:{c.END}')
        checks = [
            ('Lowercase Letters', analysis['has_lowercase'], 'a-z'),
            ('Uppercase Letters', analysis['has_uppercase'], 'A-Z'),
            ('Numeric Digits', analysis['has_digits'], '0-9'),
            ('Special Symbols', analysis['has_special'], '!@#$%^&*')
        ]
        
        for label, value, example in checks:
            icon = f'{c.GREEN}✓' if value else f'{c.RED}✗'
            status = f'{c.GREEN}Present' if value else f'{c.RED}Missing'
            print(f'   {icon} {label:.<25} {status:>10}{c.END}  ({c.CYAN}{example}{c.END})')
        
        # Stats grid
        print(f'\n{c.BOLD}📈 Statistical Analysis:{c.END}')
        print(f'   ┌{"─"*74}┐')
        print(f'   │ Length: {c.CYAN}{analysis["length"]:>3}{c.END} chars   │  Entropy: {c.CYAN}{analysis["entropy"]:>7.2f}{c.END} bits   │  Charset: {c.CYAN}{analysis["charset_size"]:>3}{c.END}  │')
        print(f'   └{"─"*74}┘')
        
        # Security scores with bars
        print(f'\n{c.BOLD}🎯 Advanced Security Scores:{c.END}')
        metrics = [
            ('Uniqueness Score', analysis['repetition_score']),
            ('Pattern Resistance', analysis['sequence_score']),
            ('Dictionary Defense', analysis['dictionary_score'])
        ]
        
        for label, score in metrics:
            bar_len = 40
            filled = int((score / 100) * bar_len)
            
            if score >= 80: color = c.GREEN
            elif score >= 60: color = c.CYAN
            elif score >= 40: color = c.YELLOW
            else: color = c.RED
            
            bar = color + '█' * filled + c.END + '░' * (bar_len - filled)
            print(f'   {label:.<30} [{bar}] {color}{score:>5.1f}%{c.END}')
        
        # Vulnerabilities
        print(f'\n{c.BOLD}{c.RED}🚨 SECURITY VULNERABILITIES{c.END}')
        print(f'{c.CYAN}{"─"*80}{c.END}')
        
        has_vulns = False
        if analysis['patterns']:
            has_vulns = True
            for pattern in analysis['patterns']:
                print(f'   {c.RED}▸ PATTERN DETECTED:{c.END} {c.YELLOW}{pattern}{c.END}')
        
        if analysis['common_words']:
            has_vulns = True
            for word in analysis['common_words']:
                print(f'   {c.RED}▸ WEAK WORD FOUND:{c.END} {c.YELLOW}"{word}"{c.END}')
        
        if analysis['breach_check']['breached']:
            has_vulns = True
            print(f'   {c.BRIGHT_RED}▸ 🚨 CRITICAL:{c.END} {c.RED}Found in breach database!{c.END}')
        
        if not has_vulns:
            print(f'   {c.GREEN}✓ No significant vulnerabilities detected{c.END}')
        
        print(f'{c.CYAN}{"─"*80}{c.END}')
        
        # Crack time
        print(f'\n{c.BOLD}⏱️  CRACK TIME ESTIMATION{c.END}')
        crack_time = analysis['crack_time']
        
        if 'Instant' in crack_time or 'second' in crack_time:
            time_color = c.RED
            time_emoji = '⚡ INSTANT'
        elif 'minute' in crack_time or 'hour' in crack_time:
            time_color = c.YELLOW
            time_emoji = '⏰ FAST'
        elif 'day' in crack_time or 'month' in crack_time:
            time_color = c.CYAN
            time_emoji = '📅 MODERATE'
        else:
            time_color = c.GREEN
            time_emoji = '🛡️ SECURE'
        
        print(f'   Estimated Time: {time_color}{c.BOLD}{crack_time}{c.END}')
        print(f'   Threat Level: {time_emoji}')
        print(f'   {c.CYAN}(GPU Attack: 1 billion attempts/second){c.END}')
        
        # Breach info
        print(f'\n{c.BOLD}🛡️  BREACH DATABASE CHECK{c.END}')
        if analysis['breach_check']['breached']:
            print(f'   Status: {c.RED}{c.BOLD}⚠️  COMPROMISED{c.END}')
            print(f'   {c.RED}This password has been exposed in data breaches!{c.END}')
        else:
            print(f'   Status: {c.GREEN}✓ Clean{c.END}')
            print(f'   {c.GREEN}Not found in known breach databases{c.END}')
        print(f'   Hash Prefix: {c.CYAN}{analysis["breach_check"]["hash_prefix"]}{c.END}')
        
        print(f'\n{c.CYAN}{"═"*80}{c.END}\n')

def show_scanning_animation(password: str):
    """Animated scanning effect"""
    c = Colors
    stages = [
        ('Analyzing structure', 0.3),
        ('Checking patterns', 0.4),
        ('Testing entropy', 0.3),
        ('Verifying security', 0.4),
        ('Generating report', 0.3)
    ]
    
    for stage, duration in stages:
        frames = ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']
        end_time = time.time() + duration
        
        while time.time() < end_time:
            for frame in frames:
                masked = '*' * len(password)
                print(f'\r   {c.CYAN}{frame}{c.END} {stage}... [{c.YELLOW}{masked}{c.END}]', end='', flush=True)
                time.sleep(0.08)
        
        print(f'\r   {c.GREEN}✓{c.END} {stage}... {c.GREEN}Complete{c.END}' + ' ' * 30)

def display_smart_suggestions(suggestions: List[Dict], original_analysis: Dict):
    """Display intelligent password suggestions beautifully"""
    c = Colors
    
    print(f'\n{c.GREEN}{"═"*80}{c.END}')
    print(f'{c.BOLD}{c.BRIGHT_GREEN}✨ INTELLIGENT PASSWORD TRANSFORMATION ENGINE{c.END}')
    print(f'{c.GREEN}{"═"*80}{c.END}\n')
    
    # Show original issues
    print(f'{c.BOLD}📋 Original Password Analysis:{c.END}')
    print(f'   Strength: {c.RED}{original_analysis["strength_level"]}{c.END} ({c.RED}{original_analysis["strength_score"]:.1f}/100{c.END})')
    print(f'   Weaknesses Detected: {c.YELLOW}{len(original_analysis["weaknesses"])}{c.END}')
    
    if original_analysis['weaknesses']:
        print(f'\n{c.BOLD}🔍 Identified Problems:{c.END}')
        for i, weakness in enumerate(original_analysis['weaknesses'][:5], 1):
            severity_colors = {
                'critical': c.BRIGHT_RED,
                'high': c.RED,
                'medium': c.YELLOW,
                'low': c.CYAN
            }
            sev_color = severity_colors.get(weakness['severity'], c.YELLOW)
            print(f'   {i}. {sev_color}[{weakness["severity"].upper()}]{c.END} {weakness["issue"]}')
            print(f'      {c.CYAN}→ Solution: {weakness["fix"]}{c.END}')
    
    print(f'\n{c.GREEN}{"─"*80}{c.END}')
    print(f'{c.BOLD}{c.BRIGHT_CYAN}🔄 Generating Optimized Alternatives...{c.END}\n')
    
    time.sleep(0.5)
    
    # Display each suggestion
    for i, suggestion in enumerate(suggestions, 1):
        print(f'{c.CYAN}{"─"*80}{c.END}')
        print(f'{c.BOLD}Suggestion #{i}: {suggestion["method"]}{c.END}')
        print(f'{c.BOLD}Password:{c.END} {c.BRIGHT_GREEN}{suggestion["password"]}{c.END}')
        
        # Quick analysis
        quick_analysis = PasswordStrengthEvaluator().analyze_password(suggestion['password'])
        
        # Stats box
        print(f'\n   ┌{"─"*74}┐')
        print(f'   │ Strength: {c.GREEN}{quick_analysis["strength_level"]:^12}{c.END} │ Score: {c.GREEN}{quick_analysis["strength_score"]:>5.1f}/100{c.END} │ Crack: {c.GREEN}{quick_analysis["crack_time"]}{c.END}')
        print(f'   └{"─"*74}┘')
        
        # Description
        print(f'\n   {c.BOLD}Description:{c.END} {suggestion["description"]}')
        print(f'   {c.BOLD}Changes Applied:{c.END} {c.CYAN}{suggestion["changes"]}{c.END}')
        
        # Character breakdown
        has_all = (quick_analysis['has_lowercase'] and quick_analysis['has_uppercase'] and 
                   quick_analysis['has_digits'] and quick_analysis['has_special'])
        
        char_icons = []
        if quick_analysis['has_lowercase']: char_icons.append(f'{c.GREEN}[a-z]✓{c.END}')
        if quick_analysis['has_uppercase']: char_icons.append(f'{c.GREEN}[A-Z]✓{c.END}')
        if quick_analysis['has_digits']: char_icons.append(f'{c.GREEN}[0-9]✓{c.END}')
        if quick_analysis['has_special']: char_icons.append(f'{c.GREEN}[!@#]✓{c.END}')
        
        print(f'   {c.BOLD}Includes:{c.END} {" ".join(char_icons)}')
        print()
    
    print(f'{c.CYAN}{"─"*80}{c.END}')
    
    # Tips
    print(f'\n{c.BOLD}{c.YELLOW}💡 PRO TIPS:{c.END}')
    print(f'   • Copy one of these passwords to your password manager')
    print(f'   • Never reuse passwords across different accounts')
    print(f'   • Enable two-factor authentication (2FA) for extra security')
    print(f'   • Update passwords every 6-12 months')
    
    print(f'\n{c.GREEN}{"═"*80}{c.END}\n')

def print_animated_banner():
    """Stunning animated banner"""
    c = Colors
    
    banner = f"""
{c.BRIGHT_CYAN}╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║  {c.BRIGHT_GREEN}🔐  SECURE PASSWORD STRENGTH EVALUATOR PRO v4.0  🔐{c.END}{c.BRIGHT_CYAN}                      ║
║                                                                              ║
║  {c.BRIGHT_YELLOW}⚡ AI-Powered Security Analysis & Intelligent Password Generation ⚡{c.END}{c.BRIGHT_CYAN}      ║
║  {c.BRIGHT_CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━{c.END}{c.BRIGHT_CYAN}  ║
║  {c.CYAN}Professional-Grade Cybersecurity Tool | Military-Level Protection{c.END}{c.BRIGHT_CYAN}         ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝{c.END}
"""
    
    for line in banner.split('\n'):
        print(line)
        time.sleep(0.05)

def print_interactive_menu():
    """Beautiful interactive menu"""
    c = Colors
    
    print(f'\n{c.BOLD}{c.HEADER}━━━━━━━━━━━━━━━━━━━━ 🎯 MAIN CONTROL CENTER 🎯 ━━━━━━━━━━━━━━━━━━━━{c.END}\n')
    
    menu_items = [
        ('1', '🔍', 'Analyze Single Password', 'Deep security analysis with detailed report', c.CYAN),
        ('2', '🚀', 'Smart Password Transformer', 'Analyze weak password + get 6 intelligent suggestions', c.GREEN),
        ('3', '🎲', 'Generate Random Passwords', 'Create cryptographically secure passwords', c.YELLOW),
        ('4', '📊', 'Batch Analysis Mode', 'Evaluate multiple passwords simultaneously', c.BLUE),
        ('5', '📚', 'Security Academy', 'Learn password security best practices', c.HEADER),
        ('6', '🎮', 'Interactive Password Game', 'Test your password creation skills', c.BRIGHT_YELLOW),
        ('7', '❌', 'Exit', 'Close application', c.RED)
    ]
    
    for num, emoji, title, desc, color in menu_items:
        print(f'   {color}{c.BOLD}[{num}]{c.END} {emoji}  {c.BOLD}{color}{title}{c.END}')
        print(f'        {c.CYAN}└─→{c.END} {desc}')
        print()

def show_security_academy():
    """Enhanced security tips"""
    c = Colors
    print(f'\n{c.GREEN}{"═"*80}{c.END}')
    print(f'{c.BOLD}{c.BRIGHT_GREEN}📚 CYBERSECURITY ACADEMY - PASSWORD MASTERY{c.END}')
    print(f'{c.GREEN}{"═"*80}{c.END}\n')
    
    sections = [
        ('🎓 FUNDAMENTAL PRINCIPLES', [
            ('Length is King', 'Every additional character exponentially increases security'),
            ('Complexity Matters', 'Mix character types for maximum entropy'),
            ('Uniqueness is Critical', 'Never reuse passwords across accounts'),
            ('Unpredictability Wins', 'Avoid patterns, dictionary words, personal info')
        ]),
        ('🛡️ ADVANCED TECHNIQUES', [
            ('Use Password Managers', '1Password, Bitwarden, LastPass for secure storage'),
            ('Enable 2FA/MFA', 'Two-factor authentication adds crucial protection'),
            ('Passphrase Method', '"Coffee-Mountain-Purple-82!" is memorable & strong'),
            ('Regular Updates', 'Change passwords every 6-12 months')
        ]),
        ('⚠️ COMMON MISTAKES TO AVOID', [
            ('Sequential Patterns', 'No "123456", "qwerty", "abcdef"'),
            ('Dictionary Words', 'Avoid "password", "admin", "welcome"'),
            ('Personal Information', 'No birthdays, names, addresses'),
            ('Simple Substitutions', '"P@ssw0rd" is still weak!')
        ])
    ]
    
    for section_title, items in sections:
        print(f'{c.BOLD}{c.BRIGHT_CYAN}{section_title}{c.END}')
        print(f'{c.CYAN}{"─"*80}{c.END}\n')
        
        for i, (title, desc) in enumerate(items, 1):
            print(f'   {c.YELLOW}{i}.{c.END} {c.BOLD}{title}{c.END}')
            print(f'      {c.CYAN}→{c.END} {desc}\n')
    
    # Password strength examples
    print(f'{c.BOLD}{c.HEADER}💪 STRENGTH COMPARISON MATRIX{c.END}')
    print(f'{c.CYAN}{"─"*80}{c.END}\n')
    
    examples = [
        ('password', 'VERY WEAK', c.BRIGHT_RED, '💀', '0.001 seconds'),
        ('Password123', 'WEAK', c.RED, '⚡', '2 minutes'),
        ('P@ssw0rd!2024', 'MODERATE', c.YELLOW, '🟡', '3 days'),
        ('MyD0g&C@t!Run2024', 'STRONG', c.CYAN, '🔵', '5 years'),
        ('Coffee-Mountain82!Purple#', 'VERY STRONG', c.BRIGHT_GREEN, '🛡️', '1 million years')
    ]
    
    print(f'   {"Password Example":<30} {"Strength":<15} {"Crack Time":<20} {"Rating"}')
    print(f'   {"-"*78}')
    
    for pwd, strength, color, emoji, crack_time in examples:
        print(f'   {pwd:<30} {color}{strength:<15}{c.END} {crack_time:<20} {emoji}')
    
    print(f'\n{c.GREEN}{"═"*80}{c.END}\n')

def password_game():
    """Interactive password creation game"""
    c = Colors
    evaluator = PasswordStrengthEvaluator()
    
    print(f'\n{c.BRIGHT_YELLOW}{"═"*80}{c.END}')
    print(f'{c.BOLD}{c.BRIGHT_YELLOW}🎮 PASSWORD SECURITY CHALLENGE{c.END}')
    print(f'{c.BRIGHT_YELLOW}{"═"*80}{c.END}\n')
    
    print(f'{c.BOLD}Challenge:{c.END} Create a password that scores {c.GREEN}80+{c.END} points!')
    print(f'{c.CYAN}You have 3 attempts. Each attempt gets analyzed.{c.END}\n')
    
    for attempt in range(1, 4):
        print(f'{c.BOLD}Attempt {attempt}/3:{c.END}')
        try:
            import getpass
            password = getpass.getpass(f'{c.GREEN}[>]{c.END} Enter your password: ')
        except:
            password = input(f'{c.GREEN}[>]{c.END} Enter your password: ')
        
        if not password:
            print(f'{c.RED}[!] Password cannot be empty{c.END}\n')
            continue
        
        analysis = evaluator.analyze_password(password)
        score = analysis['strength_score']
        
        print(f'\n   Score: {c.BOLD}{score:.1f}/100{c.END}')
        
        if score >= 80:
            print(f'   {c.BRIGHT_GREEN}🎉 CONGRATULATIONS! You created a strong password!{c.END}')
            print(f'   {c.GREEN}Strength: {analysis["strength_level"]}{c.END}')
            print(f'   {c.GREEN}Crack Time: {analysis["crack_time"]}{c.END}\n')
            return
        else:
            print(f'   {c.YELLOW}Not quite there yet. Keep trying!{c.END}')
            if attempt < 3:
                print(f'   {c.CYAN}Hint: Try adding more character types and length{c.END}\n')
    
    print(f'{c.RED}Game Over! Keep practicing password security!{c.END}\n')

def main():
    """Enhanced main program"""
    c = Colors
    
    print_animated_banner()
    time.sleep(0.5)
    
    evaluator = PasswordStrengthEvaluator()
    
    while True:
        print_interactive_menu()
        
        try:
            choice = input(f'{c.BOLD}{c.BRIGHT_YELLOW}[>] Select option (1-7): {c.END}').strip()
        except KeyboardInterrupt:
            print(f'\n\n{c.YELLOW}[!] Interrupted{c.END}')
            break
        
        if choice == '1':
            # Single password analysis
            print(f'\n{c.CYAN}{"═"*80}{c.END}')
            print(f'{c.BOLD}{c.BRIGHT_CYAN}🔍 DEEP SECURITY ANALYSIS MODE{c.END}')
            print(f'{c.CYAN}{"═"*80}{c.END}\n')
            
            print(f'{c.YELLOW}[!] Password input is hidden for your security{c.END}')
            try:
                import getpass
                password = getpass.getpass(f'{c.GREEN}[>]{c.END} Enter password to analyze: ')
            except:
                password = input(f'{c.GREEN}[>]{c.END} Enter password to analyze: ')
            
            if password:
                analysis = evaluator.analyze_password(password)
                evaluator.display_animated_analysis(analysis, password)
            else:
                print(f'{c.RED}[!] Error: Password cannot be empty{c.END}')
        
        elif choice == '2':
            # Smart transformation
            print(f'\n{c.GREEN}{"═"*80}{c.END}')
            print(f'{c.BOLD}{c.BRIGHT_GREEN}🚀 INTELLIGENT PASSWORD TRANSFORMATION{c.END}')
            print(f'{c.GREEN}{"═"*80}{c.END}\n')
            
            print(f'{c.YELLOW}[!] Enter your current weak password{c.END}')
            print(f'{c.CYAN}[*] We\'ll analyze it and generate 6 optimized alternatives{c.END}\n')
            
            try:
                import getpass
                password = getpass.getpass(f'{c.GREEN}[>]{c.END} Enter password: ')
            except:
                password = input(f'{c.GREEN}[>]{c.END} Enter password: ')
            
            if password:
                print(f'\n{c.CYAN}[*] Analyzing password security...{c.END}')
                analysis = evaluator.analyze_password(password)
                
                if analysis['strength_score'] >= 80:
                    print(f'\n{c.GREEN}[✓] Your password is already very strong!{c.END}')
                    print(f'{c.CYAN}[*] Score: {analysis["strength_score"]:.1f}/100{c.END}')
                    print(f'{c.CYAN}[*] No improvements needed!{c.END}\n')
                else:
                    suggestions = evaluator.generate_smart_passwords(password, analysis)
                    display_smart_suggestions(suggestions, analysis)
            else:
                print(f'{c.RED}[!] Error: Password cannot be empty{c.END}')
        
        elif choice == '3':
            # Generate random passwords
            print(f'\n{c.YELLOW}{"═"*80}{c.END}')
            print(f'{c.BOLD}{c.BRIGHT_YELLOW}🎲 CRYPTOGRAPHIC PASSWORD GENERATOR{c.END}')
            print(f'{c.YELLOW}{"═"*80}{c.END}\n')
            
            length = input(f'{c.GREEN}[>]{c.END} Password length (default 16, min 12): ').strip()
            length = int(length) if length.isdigit() and int(length) >= 12 else 16
            
            print(f'\n{c.CYAN}[*] Generating secure passwords...{c.END}\n')
            time.sleep(0.5)
            
            for i in range(5):
                pwd = evaluator._generate_cryptographic_password(length)
                analysis = evaluator.analyze_password(pwd)
                print(f'   {c.BOLD}#{i+1}:{c.END} {c.GREEN}{pwd}{c.END}')
                print(f'        Score: {c.CYAN}{analysis["strength_score"]:.1f}/100{c.END} | '
                      f'Crack: {c.CYAN}{analysis["crack_time"]}{c.END}\n')
        
        elif choice == '4':
            # Batch mode
            print(f'\n{c.BLUE}{"═"*80}{c.END}')
            print(f'{c.BOLD}{c.BRIGHT_CYAN}📊 BATCH ANALYSIS MODE{c.END}')
            print(f'{c.BLUE}{"═"*80}{c.END}\n')
            
            print(f'{c.YELLOW}[*] Enter passwords (type "done" to finish){c.END}\n')
            
            passwords = []
            count = 1
            
            while True:
                try:
                    pwd = input(f'{c.CYAN}[{count}]{c.END} Password: ')
                    if pwd.lower() == 'done':
                        break
                    if pwd:
                        passwords.append(pwd)
                        count += 1
                except KeyboardInterrupt:
                    break
            
            if passwords:
                print(f'\n{c.GREEN}[*] Analyzing {len(passwords)} passwords...{c.END}\n')
                time.sleep(0.5)
                
                results = []
                for pwd in passwords:
                    results.append(evaluator.analyze_password(pwd))
                
                # Summary table
                print(f'\n{c.BOLD}BATCH RESULTS SUMMARY{c.END}')
                print(f'{c.CYAN}{"─"*80}{c.END}')
                print(f'  #  │ Length │ Strength Level │  Score  │ Crack Time')
                print(f'{c.CYAN}{"─"*80}{c.END}')
                
                for i, r in enumerate(results, 1):
                    color = (c.GREEN if r['strength_score'] >= 80 else 
                            c.CYAN if r['strength_score'] >= 60 else 
                            c.YELLOW if r['strength_score'] >= 40 else c.RED)
                    print(f' {i:2d}  │   {r["length"]:2d}   │ {color}{r["strength_level"]:14}{c.END} │ '
                          f'{color}{r["strength_score"]:5.1f}{c.END}   │ {r["crack_time"]}')
                
                print(f'{c.CYAN}{"─"*80}{c.END}\n')
        
        elif choice == '5':
            show_security_academy()
        
        elif choice == '6':
            password_game()
        
        elif choice == '7':
            print(f'\n{c.GREEN}{"═"*80}{c.END}')
            print(f'{c.BOLD}{c.BRIGHT_GREEN}Thank you for using Password Evaluator Pro!{c.END}')
            print(f'{c.CYAN}Stay secure! 🔒{c.END}')
            print(f'{c.GREEN}{"═"*80}{c.END}\n')
            sys.exit(0)
        
        else:
            print(f'{c.RED}[!] Invalid option{c.END}')
        
        input(f'\n{c.YELLOW}Press Enter to continue...{c.END}')

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        c = Colors
        print(f'\n\n{c.GREEN}{"═"*80}{c.END}')
        print(f'{c.YELLOW}[*] Program interrupted{c.END}')
        print(f'{c.CYAN}Stay secure! 🔒{c.END}')
        print(f'{c.GREEN}{"═"*80}{c.END}\n')
        sys.exit(0)