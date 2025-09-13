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
		<section className="bg-brand-light py-16 lg:py-20">
			<div className="container mx-auto px-6 text-center max-w-4xl">
				<h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif mb-6 text-brand-warm">{title}</h2>
				<p className="text-base lg:text-lg mb-10 text-brand-dark leading-relaxed max-w-2xl mx-auto">{text}</p>
				<div className="flex flex-col sm:flex-row justify-center items-center gap-4">
					{buttons.map((button, index) => {
						// Choose the style based on the 'style' field from the CMS
						const buttonStyle =
							button.style === "fill"
								? "bg-brand-accent text-white hover:bg-opacity-90"
								: "border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white";

						return (
							<Link key={index} href={button.link}>
								<span
									className={`inline-block px-6 py-3 text-sm font-medium transition-all duration-200 ${buttonStyle}`}
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
