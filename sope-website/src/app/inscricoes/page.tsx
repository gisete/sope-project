import Image from "next/image";
import Link from "next/link";

// Types for the Inscrições page data
interface InscricoesData {
	hero: {
		title: string;
		description?: string;
		image: {
			url: string;
			alt: string;
		};
	};
	programs: Array<{
		title: string;
		description: string;
		ageRange?: string;
		image: {
			url: string;
			alt: string;
		};
		imagePosition: "left" | "right";
		backgroundColor: "pink" | "gray" | "blue" | "green" | "white";
		buttons: {
			inscricaoButton: {
				text: string;
				link: string;
			};
			informacoesButton: {
				text: string;
				link: string;
			};
		};
	}>;
}

// Fetch data from Payload CMS
async function getInscricoesData(): Promise<InscricoesData | null> {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000";

		const res = await fetch(`${baseUrl}/api/globals/inscricoes`, {
			cache: "no-store",
			signal: AbortSignal.timeout(10000),
		});

		if (!res.ok) {
			console.warn(`Failed to fetch inscricoes data: ${res.status} ${res.statusText}`);
			return null;
		}

		const data = await res.json();

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
			programs:
				data.programs?.map((program: any) => ({
					...program,
					image: {
						...program.image,
						url: `${baseUrl}${program.image.url}`,
					},
				})) || [],
		};

		return transformedData;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching inscricoes data:", error.message);
		} else {
			console.error("Unknown error fetching inscricoes data:", error);
		}
		return null;
	}
}

// Helper function to get background color classes
function getBackgroundColor(color: string): string {
	switch (color) {
		case "pink":
			return "bg-pink-200";
		case "gray":
			return "bg-gray-100";
		case "blue":
			return "bg-blue-100";
		case "green":
			return "bg-green-100";
		case "white":
		default:
			return "bg-white";
	}
}

export default async function InscricoesPage() {
	const pageData = await getInscricoesData();

	if (!pageData) {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<p>Could not load page data.</p>
			</main>
		);
	}

	const { hero, programs } = pageData;

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

			{/* Programs Section */}
			<section className="py-16 lg:py-20">
				<div className="container mx-auto px-6 space-y-16">
					{programs.map((program, index) => (
						<div key={index} className={`rounded-2xl overflow-hidden ${getBackgroundColor(program.backgroundColor)}`}>
							<div
								className={`grid grid-cols-1 lg:grid-cols-2 min-h-[400px] ${
									program.imagePosition === "right" ? "lg:grid-flow-col-dense" : ""
								}`}
							>
								{/* Image Side */}
								<div
									className={`relative min-h-[300px] lg:min-h-[400px] ${
										program.imagePosition === "right" ? "lg:col-start-2" : ""
									}`}
								>
									<Image src={program.image.url} alt={program.image.alt} fill className="object-cover" />
								</div>

								{/* Content Side */}
								<div
									className={`flex flex-col justify-center p-8 lg:p-12 ${
										program.imagePosition === "right" ? "lg:col-start-1" : ""
									}`}
								>
									<div className="max-w-lg">
										<h2 className="text-2xl lg:text-3xl font-serif mb-4 text-brand-warm">{program.title}</h2>

										{program.ageRange && (
											<p className="text-base lg:text-lg mb-4 text-brand-dark font-medium">{program.ageRange}</p>
										)}

										<p className="text-base lg:text-lg mb-8 text-brand-dark leading-relaxed">{program.description}</p>

										{/* Action Buttons */}
										<div className="flex flex-col sm:flex-row gap-4">
											<Link href={program.buttons.inscricaoButton.link}>
												<span className="inline-block bg-brand-accent text-white px-6 py-3 text-sm font-medium hover:bg-opacity-90 transition-all duration-200 text-center min-w-[140px]">
													{program.buttons.inscricaoButton.text}
												</span>
											</Link>
											<Link href={program.buttons.informacoesButton.link}>
												<span className="inline-block border border-brand-dark text-brand-dark px-6 py-3 text-sm font-medium hover:bg-brand-dark hover:text-white transition-all duration-200 text-center min-w-[140px]">
													{program.buttons.informacoesButton.text}
												</span>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
