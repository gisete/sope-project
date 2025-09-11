import Image from "next/image";
import Link from "next/link";

// Types for the Contactos page data
interface ContactosData {
	hero: {
		title: string;
		description?: string;
		image: {
			url: string;
			alt: string;
		};
	};
	contactInfo: {
		phone: string;
		email: string;
		address: {
			street: string;
			postalCode: string;
			description?: string;
		};
		socialMedia: {
			instagram?: string;
			facebook?: string;
		};
	};
	openingHours: {
		showSection?: boolean;
		title?: string;
		schedule?: Array<{
			day: string;
			hours: string;
			notes?: string;
		}>;
	};
}

// Fetch data from Payload CMS
async function getContactosData(): Promise<ContactosData | null> {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000";

		const res = await fetch(`${baseUrl}/api/globals/contactos`, {
			cache: "no-store",
			signal: AbortSignal.timeout(10000),
		});

		if (!res.ok) {
			console.warn(`Failed to fetch contactos data: ${res.status} ${res.statusText}`);
			return null;
		}

		const data = await res.json();

		// Validate required data structure
		if (!data || !data.hero || !data.contactInfo) {
			console.warn("Invalid contactos data structure:", data);
			return null;
		}

		// Transform image URLs
		const transformedData = {
			...data,
			hero: {
				...data.hero,
				image: {
					...data.hero.image,
					url: `${baseUrl}${data.hero.image.url}`,
				},
			},
		};

		return transformedData;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching contactos data:", error.message);
		} else {
			console.error("Unknown error fetching contactos data:", error);
		}
		return null;
	}
}

export default async function ContactosPage() {
	const pageData = await getContactosData();

	if (!pageData) {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<p>Could not load page data.</p>
			</main>
		);
	}

	const { hero, contactInfo, openingHours } = pageData;

	return (
		<main>
			{/* Hero Section */}
			<section className="bg-brand-light min-h-[70vh]">
				<div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
					{/* Left Column: Text Content */}
					<div className="flex flex-col justify-center px-6 lg:px-12 xl:px-16 py-16">
						<div className="max-w-md">
							<h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif mb-6 text-brand-warm leading-tight">
								{hero.title}
							</h1>
							{hero.description && (
								<div className="space-y-4 mb-8">
									{hero.description.split("\n").map((line, index) => (
										<p key={index} className="text-base lg:text-lg text-brand-dark">
											{line}
										</p>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Right Column: Image */}
					<div className="relative min-h-[400px] lg:min-h-[70vh]">
						<Image src={hero.image.url} alt={hero.image.alt} fill className="object-cover" priority />
					</div>
				</div>
			</section>

			{/* Contact Information Section */}
			<section className="py-16 lg:py-20">
				<div className="container mx-auto px-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
						{/* Left Column: Contact Information */}
						<div className="space-y-8">
							<div>
								<h2 className="text-3xl lg:text-4xl font-serif mb-8 text-brand-warm">Informações de Contacto</h2>

								<div className="space-y-6">
									{/* Address */}
									<div className="flex items-start space-x-4">
										<svg className="w-6 h-6 mt-1 text-brand-warm flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
												clipRule="evenodd"
											/>
										</svg>
										<div>
											<p className="font-medium text-brand-dark text-lg">{contactInfo.address.street}</p>
											<p className="text-brand-dark text-lg">{contactInfo.address.postalCode}</p>
											{contactInfo.address.description && (
												<p className="text-base text-gray-600 mt-2 leading-relaxed">
													{contactInfo.address.description}
												</p>
											)}
										</div>
									</div>

									{/* Phone */}
									<div className="flex items-center space-x-4">
										<svg className="w-6 h-6 text-brand-warm flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
											<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
										</svg>
										<a
											href={`tel:${contactInfo.phone}`}
											className="text-brand-dark hover:text-brand-warm transition-colors text-lg"
										>
											{contactInfo.phone}
										</a>
									</div>

									{/* Email */}
									<div className="flex items-center space-x-4">
										<svg className="w-6 h-6 text-brand-warm flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
											<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
											<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
										</svg>
										<a
											href={`mailto:${contactInfo.email}`}
											className="text-brand-dark hover:text-brand-warm transition-colors text-lg"
										>
											{contactInfo.email}
										</a>
									</div>

									{/* Social Media */}
									{(contactInfo.socialMedia?.instagram || contactInfo.socialMedia?.facebook) && (
										<div>
											<h3 className="text-xl font-serif mb-4 text-brand-warm">Siga-nos</h3>
											<div className="flex space-x-6">
												{contactInfo.socialMedia.instagram && (
													<Link
														href={contactInfo.socialMedia.instagram}
														className="text-brand-dark hover:text-brand-warm transition-colors text-lg"
													>
														Instagram
													</Link>
												)}
												{contactInfo.socialMedia.facebook && (
													<Link
														href={contactInfo.socialMedia.facebook}
														className="text-brand-dark hover:text-brand-warm transition-colors text-lg"
													>
														Facebook
													</Link>
												)}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Right Column: Opening Hours */}
						{openingHours?.showSection && openingHours.schedule && openingHours.schedule.length > 0 && (
							<div>
								<h2 className="text-3xl lg:text-4xl font-serif mb-8 text-brand-warm">
									{openingHours.title || "Horários"}
								</h2>
								<div className="space-y-4">
									{openingHours.schedule.map((item, index) => (
										<div
											key={index}
											className="flex justify-between items-start py-3 border-b border-gray-200 last:border-b-0"
										>
											<span className="font-medium text-brand-dark text-lg">{item.day}</span>
											<div className="text-right">
												<span className="text-brand-dark text-lg">{item.hours}</span>
												{item.notes && <p className="text-sm text-gray-600 mt-1">{item.notes}</p>}
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</section>
		</main>
	);
}
