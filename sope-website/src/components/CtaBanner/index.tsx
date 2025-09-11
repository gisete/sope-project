"use client";

import Link from "next/link";

// Define the shape of a single button
type Button = {
	text: string;
	link: string;
	style: "fill" | "outline";
};

// Define the props that our CtaBanner component will accept
type CtaBannerProps = {
	title: string;
	text: string;
	buttons: Button[];
};

export function CtaBanner({ title, text, buttons }: CtaBannerProps) {
	return (
		<section className="bg-[#f4ebe0] py-16">
			<div className="container mx-auto text-center">
				<h2 className="text-4xl font-serif mb-4">{title}</h2>
				<p className="max-w-2xl mx-auto mb-8">{text}</p>
				<div className="flex justify-center items-center space-x-4">
					{buttons.map((button, index) => {
						// Choose the style based on the 'style' field from the CMS
						const buttonStyle =
							button.style === "fill"
								? "bg-[#DAA520] text-white" // Mustard fill
								: "border border-[#DAA520] text-[#DAA520]"; // Mustard outline

						return (
							<Link key={index} href={button.link}>
								<span
									className={`inline-block px-8 py-3 font-sans font-semibold transition-colors ${buttonStyle} hover:bg-[#c8961e] hover:text-white`}
								>
									{button.text}
								</span>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
