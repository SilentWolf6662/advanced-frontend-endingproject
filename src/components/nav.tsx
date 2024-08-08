import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = React.HTMLAttributes<HTMLDivElement>;


const Navbar = ({ className }: Props) => {
	return (
		<div className={cn("w-[80%]", className)}>
			<Link href={'/'} className="flex items-start w-36 h-auto">
				<Image src="/logo/logo-final.png" alt="logo" width={150} height={150} />
			</Link>
		</div>
	);
}

export default Navbar;
