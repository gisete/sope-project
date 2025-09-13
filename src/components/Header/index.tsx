import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenuClient } from "./MobileMenuClient";
import { getGlobal } from "@/lib/payload";

type NavItem = { label: string; link: string; id?: string };

export async function Header() {
	// Direct database access
	const mainMenu = await getGlobal("main-menu");
	const navItems = mainMenu?.navItems || [];

	return (
		<header className="py-4 lg:py-6 relative z-30">
			<div className="container mx-auto px-6 flex justify-between items-center">
				<Link href="/" className="flex-shrink-0">
					<Logo />
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden lg:flex items-center space-x-8">
					{navItems &&
						navItems.map((item: NavItem) => (
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
