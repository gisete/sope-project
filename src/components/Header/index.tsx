import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenuClient } from "./MobileMenuClient";

type NavItem = { label: string; link: string; id?: string };

async function getMainMenu(): Promise<NavItem[] | null> {
	try {
		// Use environment variable with fallback
		const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000";

		const res = await fetch(`${baseUrl}/api/globals/main-menu`, {
			cache: "no-store",
			// Add timeout and better error handling
			signal: AbortSignal.timeout(10000), // 10 second timeout
		});

		if (!res.ok) {
			console.warn(`Failed to fetch main menu: ${res.status} ${res.statusText}`);
			return null;
		}

		const data = await res.json();

		// Validate the response structure
		if (!data || !Array.isArray(data.navItems)) {
			console.warn("Invalid main menu data structure:", data);
			return null;
		}

		return data.navItems;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching main menu:", error.message);
		} else {
			console.error("Unknown error fetching main menu:", error);
		}
		return null;
	}
}

export async function Header() {
	const navItems = await getMainMenu();

	return (
		<header className="py-4 lg:py-6 relative z-30">
			<div className="container mx-auto px-6 flex justify-between items-center">
				<Link href="/" className="flex-shrink-0">
					<Logo />
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden lg:flex items-center space-x-8">
					{navItems &&
						navItems.map((item) => (
							<Link key={item.id} href={item.link}>
								<span className="text-base font-medium text-brand-dark hover:text-brand-warm transition-colors duration-200">
									{item.label}
								</span>
							</Link>
						))}
					<Link href="/instagram" className="ml-2">
						<span className="text-base font-medium text-brand-warm hover:text-brand-accent transition-colors duration-200">
							📷
						</span>
					</Link>
				</nav>

				{/* Mobile Menu Component */}
				<MobileMenuClient navItems={navItems} />
			</div>
		</header>
	);
}
