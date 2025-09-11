import Link from "next/link";

export async function Footer() {
	return (
		<footer className="bg-brand-warm text-white py-12">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
					{/* Left Column - Contact Info */}
					<div className="space-y-2 text-sm">
						<div className="flex items-start space-x-2">
							<svg className="w-4 h-4 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
									clipRule="evenodd"
								/>
							</svg>
							<div>
								<div>Est. da Charneca, Benedita</div>
								<div>2475-024</div>
							</div>
						</div>
					</div>

					{/* Right Column - Navigation Links */}
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div className="space-y-2">
								<Link href="/quem-somos" className="block hover:text-brand-accent transition-colors">
									Quem Somos
								</Link>
								<Link href="/forest-school" className="block hover:text-brand-accent transition-colors">
									Forest School
								</Link>
								<Link href="/atividades" className="block hover:text-brand-accent transition-colors">
									Atividades
								</Link>
							</div>
							<div className="space-y-2">
								<Link href="/inscricoes" className="block hover:text-brand-accent transition-colors">
									Inscrições
								</Link>
								<Link href="/contactos" className="block hover:text-brand-accent transition-colors">
									Contactos
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Section - Contact Details */}
				<div className="mt-8 pt-6 border-t border-white border-opacity-20">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 text-sm">
						<div className="space-y-1">
							<div className="flex items-center space-x-2">
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
								</svg>
								<span>+351 950 270 856</span>
							</div>
							<div className="flex items-center space-x-2">
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
									<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
								</svg>
								<a href="mailto:sope.silvere@gmail.com" className="hover:text-brand-accent transition-colors">
									sope.silvere@gmail.com
								</a>
							</div>
						</div>

						{/* Privacy Policy Link */}
						<div className="flex items-center space-x-4 text-sm">
							<Link href="/privacy-policy" className="hover:text-brand-accent transition-colors">
								Política de Privacidade
							</Link>
							<span className="text-white text-opacity-60">© {new Date().getFullYear()} Sópé Forest School</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
