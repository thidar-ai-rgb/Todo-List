'use client';

import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
	// Start with a stable value on both server and client to avoid hydration mismatch
	const [theme, setTheme] = useState<'light' | 'dark'>('light');
	const [mounted, setMounted] = useState(false);

	// Resolve actual theme after mount
	useEffect(() => {
		let resolved: 'light' | 'dark' = 'light';
		try {
			const stored = localStorage.getItem('theme');
			if (stored === 'dark' || stored === 'light') {
				resolved = stored as 'dark' | 'light';
			} else {
				const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
				resolved = document.documentElement.classList.contains('dark') || isSystemDark ? 'dark' : 'light';
			}
		} catch {}
		setTheme(resolved);
		setMounted(true);
	}, []);

	// Apply to DOM and persist, but only after mount to avoid overwriting stored theme with the initial default
	useEffect(() => {
		if (!mounted) return;
		document.documentElement.classList.toggle('dark', theme === 'dark');
		try {
			localStorage.setItem('theme', theme);
		} catch {}
	}, [theme, mounted]);

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
					{mounted ? (theme === 'dark' ? '☀️' : '🌙') : null}
				</span>
			</button>
		</div>
	);
}


