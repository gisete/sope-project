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
}

// Fetch data from the Payload 'homepage' global
async function getHomepageData(): Promise<HomepageData | null> {
	try {
		const res = await fetch("http://localhost:3000/api/globals/homepage", {
			cache: "no-store",
		});

		if (!res.ok) return null;

		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Error fetching homepage data:", error);
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

	const { hero, ctaBanner } = homepage;
	// Construct the full image URL
	const imageUrl = `http://localhost:3000${hero.image.url}`;

	return (
		<main className="container mx-auto px-6 py-12">
			<section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
				{/* Left Column: Text Content */}
				<div className="flex flex-col items-start text-left">
					<h1 className="text-5xl font-serif mb-4 text-[#3c2913]">{hero.title}</h1>
					<p className="text-lg mb-8 text-[#3c2913]">{hero.subtitle}</p>
					<Link href={hero.button.link}>
						<span className="inline-block border border-gray-400 text-gray-700 px-8 py-3 hover:bg-gray-100 transition-colors">
							{hero.button.text}
						</span>
					</Link>
				</div>

				{/* Right Column: Image */}
				<div className="relative h-96 md:h-[500px]">
					<Image src={imageUrl} alt={hero.image.alt} fill className="object-cover" />
				</div>
			</section>

			<CtaBanner {...ctaBanner} />
		</main>
	);
}
