import Image from "next/image";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";

// Define a type for our homepage data for better TypeScript support
interface HomepageData {
	hero: {
		title: string;
		subtitle: string;
		button: {
			text: string;
			link: string;
		};
		image: {
			url: string;
			alt: string;
		};
	};
	ctaBanner: {
		title: string;
		text: string;
		buttons: Array<{
			text: string;
			link: string;
			style: "fill" | "outline";
		}>;
	};
	activitiesSection: {
		title: string;
		text: string;
		image: {
			url: string;
			alt: string;
		};
		button: {
			text: string;
			link: string;
		};
	};
}

// Fetch data from the Payload 'homepage' global
async function getHomepageData(): Promise<HomepageData | null> {
	try {
		// Use environment variable with fallback
		const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000";

		const res = await fetch(`${baseUrl}/api/globals/homepage`, {
			cache: "no-store",
			// Add timeout for better error handling
			signal: AbortSignal.timeout(10000), // 10 second timeout
		});

		if (!res.ok) {
			console.warn(`Failed to fetch homepage data: ${res.status} ${res.statusText}`);
			return null;
		}

		const data = await res.json();

		// Validate required data structure
		if (!data || !data.hero || !data.ctaBanner) {
			console.warn("Invalid homepage data structure:", data);
			return null;
		}

		// Transform the data to include full image URLs
		const transformedData = {
			...data,
			hero: {
				...data.hero,
				image: {
					...data.hero.image,
					url: `${baseUrl}${data.hero.image.url}`,
				},
			},
			activitiesSection: data.activitiesSection
				? {
						...data.activitiesSection,
						activities:
							data.activitiesSection.activities?.map((activity: any) => ({
								...activity,
								image: {
									...activity.image,
									url: `${baseUrl}${activity.image.url}`,
								},
							})) || [],
				  }
				: null,
		};

		return transformedData;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching homepage data:", error.message);
		} else {
			console.error("Unknown error fetching homepage data:", error);
		}
		return null;
	}
}

export default async function Home() {
	const homepage = await getHomepageData();

	if (!homepage) {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<p>Could not load homepage data.</p>
			</main>
		);
	}

	const { hero, ctaBanner, activitiesSection } = homepage;

	return (
		<main>
			{/* Hero Section */}
			<section className="container mx-auto px-6 py-16">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Left Column: Text Content */}
					<div className="flex flex-col items-start text-left max-w-lg">
						<h1 className="text-5xl lg:text-6xl font-serif mb-6 text-[#A15B43] leading-tight">{hero.title}</h1>
						<p className="text-lg mb-8 text-[#6B4E37] leading-relaxed">{hero.subtitle}</p>
						<Link href={hero.button.link}>
							<span className="inline-block border-2 border-[#A15B43] text-[#A15B43] px-8 py-3 font-medium hover:bg-[#A15B43] hover:text-white transition-all duration-200">
								{hero.button.text}
							</span>
						</Link>
					</div>

					{/* Right Column: Image */}
					<div className="relative h-96 lg:h-[600px] rounded-lg overflow-hidden">
						<Image src={hero.image.url} alt={hero.image.alt} fill className="object-cover" priority />
					</div>
				</div>
			</section>

			{/* CTA Banner */}
			<CtaBanner {...ctaBanner} />

			{/* Activities Section */}
			<section className="container mx-auto px-6 py-16">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
					{/* Left Column: Single Activities Image */}
					<div className="relative aspect-square rounded-lg overflow-hidden">
						<Image src={activitiesSection.image.url} alt={activitiesSection.image.alt} fill className="object-cover" />
					</div>

					{/* Right Column: Text Content */}
					<div className="flex flex-col justify-center">
						<h2 className="text-3xl lg:text-4xl font-serif mb-6 text-brand-warm">{activitiesSection.title}</h2>
						<p className="text-base lg:text-lg mb-8 text-brand-dark leading-relaxed">{activitiesSection.text}</p>
						<Link href={activitiesSection.button.link}>
							<span className="inline-block border border-brand-accent text-brand-accent px-6 py-3 text-sm font-medium hover:bg-brand-accent hover:text-white transition-all duration-200">
								{activitiesSection.button.text}
							</span>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
