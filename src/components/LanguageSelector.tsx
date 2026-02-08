import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

export function LanguageSelector() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="language-selector" ref={dropdownRef}>
            <button
                className="language-selector__button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Select language"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <span className="language-selector__flag">{currentLanguage.flag}</span>
                <span className="language-selector__name">{currentLanguage.code.toUpperCase()}</span>
                <i className={`fas fa-chevron-down language-selector__icon ${isOpen ? 'open' : ''}`} aria-hidden="true"></i>
            </button>

            {isOpen && (
                <ul className="language-selector__dropdown" role="listbox">
                    {languages.map((lang) => (
                        <li
                            key={lang.code}
                            className={`language-selector__option ${lang.code === i18n.language ? 'active' : ''}`}
                            onClick={() => changeLanguage(lang.code)}
                            role="option"
                            aria-selected={lang.code === i18n.language}
                        >
                            <span className="language-selector__flag">{lang.flag}</span>
                            <span className="language-selector__name">{lang.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}