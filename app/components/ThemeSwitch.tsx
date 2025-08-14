'use client';

import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
	const [theme, setTheme] = useState<'light' | 'dark'>(() => {
		if (typeof window === 'undefined') return 'light';
		try {
			const stored = localStorage.getItem('theme');
			if (stored === 'dark' || stored === 'light') return stored as 'dark' | 'light';
			const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
			return document.documentElement.classList.contains('dark') || isSystemDark ? 'dark' : 'light';
		} catch {
			return 'light';
		}
	});

	// Apply to DOM and persist
	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark');
		try {
			localStorage.setItem('theme', theme);
		} catch {}
	}, [theme]);

	return (
		<div className="absolute top-4 right-4">
			<button
				type="button"
				role="switch"
				aria-checked={theme === 'dark'}
				aria-label="Toggle dark mode"
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						setTheme(theme === 'dark' ? 'light' : 'dark');
					}
				}}
				className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}
			>
				<span className={`inline-flex h-6 w-6 transform rounded-full bg-white shadow transition-transform items-center justify-center text-base ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}>
					{theme === 'dark' ? '🌙' : '☀️'}
				</span>
			</button>
		</div>
	);
}


