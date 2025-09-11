"use client";

import { useState } from "react";
import Link from "next/link";

type NavItem = { label: string; link: string; id?: string };

export function MobileMenuClient({ navItems }: { navItems: NavItem[] | null }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);
	const closeMenu = () => setIsOpen(false);

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				onClick={toggleMenu}
				className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
				aria-label="Toggle menu"
			>
				<span
					className={`w-6 h-0.5 bg-brand-dark transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
				></span>
				<span className={`w-6 h-0.5 bg-brand-dark transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
				<span
					className={`w-6 h-0.5 bg-brand-dark transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
				></span>
			</button>

			{/* Mobile Menu Overlay */}
			{isOpen && <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu}></div>}

			{/* Mobile Menu Panel */}
			<div
				className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="flex flex-col h-full">
					{/* Close button */}
					<div className="flex justify-end p-6">
						<button onClick={closeMenu} className="w-8 h-8 flex items-center justify-center" aria-label="Close menu">
							<span className="sr-only">Close menu</span>
							<svg className="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					{/* Navigation Links */}
					<nav className="flex flex-col space-y-1 px-6">
						{navItems &&
							navItems.map((item) => (
								<Link key={item.id} href={item.link} onClick={closeMenu}>
									<span className="block py-4 text-lg font-medium text-brand-dark hover:text-brand-warm border-b border-brand-light transition-colors duration-200">
										{item.label}
									</span>
								</Link>
							))}
						<Link href="/instagram" onClick={closeMenu}>
							<span className="block py-4 text-lg font-medium text-brand-warm hover:text-brand-accent border-b border-brand-light transition-colors duration-200">
								Instagram
							</span>
						</Link>
					</nav>
				</div>
			</div>
		</>
	);
}
