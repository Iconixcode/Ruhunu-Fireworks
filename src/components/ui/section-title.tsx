type SectionTitleProps = {
	title: string;
	className?: string;
};

export default function SectionTitle({
	title,
	className = "",
}: SectionTitleProps) {
	return (
		<div className={className}>
			<p className="text-sm font-medium uppercase tracking-[0.35em] text-red-400/90">
				Highlight
			</p>
			<h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
				{title}
			</h2>
			<div className="mt-4 h-px w-24 bg-gradient-to-r from-red-500 via-orange-400 to-transparent" />
		</div>
	);
}
