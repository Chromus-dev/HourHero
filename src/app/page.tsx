import Link from 'next/link';

export default function Home() {
	return (
		<div className="flex flex-col justify-center items-center m-4">
			<h1 className="text-3xl my-3">HourHero</h1>

			<p className="my-3">
				<Link href="login" className="mx-2 underline">
					Sign In
				</Link>
			</p>
		</div>
	);
}
