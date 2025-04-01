import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    href,
    variant = 'primary',
    size = 'medium',
    onClick,
    className = '',
}) => {
    const buttonClasses = `button button--${variant} button--${size} ${className}`;

    if (href) {
        return (
            <Link href={href} className={buttonClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={buttonClasses}>
            {children}
        </button>
    );
}; 