import { Poppins } from 'next/font/google';
const font = Poppins({
	subsets: ['latin'],
	weight: ['600'],
});

interface HeaderProps {
	label: string;
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className=" w-full flex-col items-center flex gap-y-4 justify-center">
			{/** this is website logo */}
			{/**<BsChatSquareQuote className="size-10 hover:text-primary cursor-pointer transition-colors duration-500 ease-in-out" /> */}

			<p className=" text-muted-foreground">{label} </p>
		</div>
	);
};
