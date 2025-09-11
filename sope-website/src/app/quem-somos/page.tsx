import Image from "next/image";

// Types for the Quem Somos page data
interface QuemSomosData {
	hero: {
		title: string;
		description: string;
		image: {
			url: string;
			alt: string;
		};
	};
	oSopeSection: {
		title: string;
		text: string;
	};
	principiosSection: {
		title: string;
		content: Array<{
			type: "text" | "image";
			text?: string;
			image?: {
				url: string;
				alt: string;
			};
			imagePosition?: "left" | "right" | "center";
		}>;
	};
	pretendemoSection: {
		title: string;
		layout: "text-left" | "image-left";
		bulletPoints: Array<{
			text: string;
		}>;
		image?: {
			url: string;
			alt: string;
		};
	};
	equipaSection: {
		title: string;
		teamMembers: Array<{
			name: string;
			title: string;
			description: string;
			image: {
				url: string;
				alt: string;
			};
		}>;
	};
}

// Fetch data from Payload CMS
async function getQuemSomosData(): Promise<QuemSomosData | null> {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000";

		const res = await fetch(`${baseUrl}/api/globals/quem-somos`, {
			cache: "no-store",
			signal: AbortSignal.timeout(10000),
		});

		if (!res.ok) {
			console.warn(`Failed to fetch quem-somos data: ${res.status} ${res.statusText}`);
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
			principiosSection: {
				...data.principiosSection,
				content:
					data.principiosSection.content?.map(
						(item: { type: string; text?: string; image?: { url: string; alt: string } }) => ({
							...item,
							image: item.image
								? {
										...item.image,
										url: `${baseUrl}${item.image.url}`,
								  }
								: undefined,
						})
					) || [],
			},
			pretendemoSection: {
				...data.pretendemoSection,
				image: data.pretendemoSection.image
					? {
							...data.pretendemoSection.image,
							url: `${baseUrl}${data.pretendemoSection.image.url}`,
					  }
					: undefined,
			},
			equipaSection: {
				...data.equipaSection,
				teamMembers:
					data.equipaSection.teamMembers?.map(
						(member: { name: string; title: string; description: string; image: { url: string; alt: string } }) => ({
							...member,
							image: {
								...member.image,
								url: `${baseUrl}${member.image.url}`,
							},
						})
					) || [],
			},
		};

		return transformedData;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching quem-somos data:", error.message);
		} else {
			console.error("Unknown error fetching quem-somos data:", error);
		}
		return null;
	}
}

export default async function QuemSomosPage() {
	const pageData = await getQuemSomosData();

	if (!pageData) {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<p>Could not load page data.</p>
			</main>
		);
	}

	const { hero, oSopeSection, principiosSection, pretendemoSection, equipaSection } = pageData;

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
							<div className="space-y-4 mb-8">
								{hero.description.split("\n").map((line, index) => (
									<p key={index} className="text-base lg:text-lg text-brand-dark">
										{line}
									</p>
								))}
							</div>
						</div>
					</div>

					{/* Right Column: Image */}
					<div className="relative min-h-[400px] lg:min-h-[70vh]">
						<Image src={hero.image.url} alt={hero.image.alt} fill className="object-cover" priority />
					</div>
				</div>
			</section>

			{/* O Sopé Section - Brown Background */}
			<section className="bg-brand-warm py-16 lg:py-20">
				<div className="container mx-auto px-6 text-center max-w-4xl">
					<h2 className="text-3xl lg:text-4xl font-serif mb-8 text-white">{oSopeSection.title}</h2>
					<div className="space-y-6 text-white">
						{oSopeSection.text.split("\n\n").map((paragraph, index) => (
							<p key={index} className="text-base lg:text-lg leading-relaxed">
								{paragraph}
							</p>
						))}
					</div>
				</div>
			</section>

			{/* Nossos Princípios Section */}
			<section className="py-16 lg:py-20">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl lg:text-4xl font-serif mb-12 text-brand-warm text-center">
						{principiosSection.title}
					</h2>

					{/* Process content to find text and image blocks */}
					{(() => {
						const textBlocks = principiosSection.content.filter((block) => block.type === "text");
						const imageBlock = principiosSection.content.find((block) => block.type === "image");

						return (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
								{/* Left Side: Image */}
								<div className="flex justify-center lg:justify-end">
									{imageBlock && imageBlock.image && (
										<div className="relative w-80 h-80 rounded-lg overflow-hidden">
											<Image src={imageBlock.image.url} alt={imageBlock.image.alt} fill className="object-cover" />
										</div>
									)}
								</div>

								{/* Right Side: Text */}
								<div className="space-y-6">
									{textBlocks.map((textBlock, index) => (
										<p key={index} className="text-base lg:text-lg text-brand-dark leading-relaxed">
											{textBlock.text}
										</p>
									))}
								</div>
							</div>
						);
					})()}
				</div>
			</section>

			{/* O Que Pretendemos Section */}
			<section className="py-16 lg:py-20">
				<div className="container mx-auto px-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
						{/* Left Side: Text Content */}
						<div>
							<h2 className="text-3xl lg:text-4xl font-serif mb-8 text-brand-warm">{pretendemoSection.title}</h2>
							<ul className="space-y-4">
								{pretendemoSection.bulletPoints.map((point, index) => (
									<li key={index} className="flex items-start space-x-3">
										<span className="flex-shrink-0 w-2 h-2 bg-brand-warm rounded-full mt-3"></span>
										<span className="text-base lg:text-lg text-brand-dark leading-relaxed">{point.text}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Right Side: Image */}
						<div className="flex justify-center lg:justify-start">
							{pretendemoSection.image && (
								<div className="relative w-80 h-80 rounded-lg overflow-hidden">
									<Image
										src={pretendemoSection.image.url}
										alt={pretendemoSection.image.alt}
										fill
										className="object-cover"
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* A Nossa Equipa Section */}
			<section className="py-16 lg:py-20">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl lg:text-4xl font-serif mb-12 text-brand-warm text-center">{equipaSection.title}</h2>

					{/* Centered Team Members */}
					<div className="flex flex-wrap justify-center gap-16 max-w-4xl mx-auto">
						{equipaSection.teamMembers.map((member, index) => (
							<div key={index} className="text-center max-w-sm">
								{/* Team Member Photo */}
								<div className="relative w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden">
									<Image src={member.image.url} alt={member.image.alt} fill className="object-cover" />
								</div>

								{/* Team Member Info */}
								<h3 className="text-xl font-serif font-medium mb-2 text-brand-dark">{member.name}</h3>
								<p className="text-base font-medium mb-4 text-brand-warm">{member.title}</p>
								<p className="text-sm text-brand-dark leading-relaxed">{member.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
