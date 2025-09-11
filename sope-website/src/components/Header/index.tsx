import Link from "next/link";
import { Logo } from "./Logo";

type NavItem = { label: string; link: string; id?: string };
async function getMainMenu(): Promise<NavItem[] | null> {
	try {
		const res = await fetch("http://localhost:3000/api/globals/main-menu", { cache: "no-store" });
		if (!res.ok) return null;
		const data = await res.json();
		return data.navItems;
	} catch (error) {
		console.error("Error fetching main menu:", error);
		return null;
	}
}

export async function Header() {
	const navItems = await getMainMenu();

	return (
		<header className="py-6">
			<div className="container mx-auto px-6 flex justify-between items-center">
				<Link href="/">
					<Logo />
				</Link>
				<nav className="flex items-center space-x-6">
					{navItems &&
						navItems.map((item) => (
							<Link key={item.id} href={item.link}>
								<span className="text-md font-sans text-brand-dark hover:text-brand-accent transition-colors">
									{item.label}
								</span>
							</Link>
						))}
					<Link href="/instagram">
						<span className="text-md font-sans text-brand-dark">IG</span>
					</Link>
				</nav>
			</div>
		</header>
	);
}
