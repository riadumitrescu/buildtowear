import React from 'react';
import Link from 'next/link';
import { Button } from './Button';

export const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__content">
                <Link href="/" className="header__logo">
                    Wear My Work
                </Link>
                
                <nav className="header__nav">
                    <Link href="/founders" className="header__link">
                        For Founders
                    </Link>
                    <Link href="/gallery" className="header__link">
                        Gallery
                    </Link>
                    <Link href="/about" className="header__link">
                        About
                    </Link>
                    <Button href="/apply" variant="primary">
                        Apply Now
                    </Button>
                </nav>
            </div>
        </header>
    );
}; 