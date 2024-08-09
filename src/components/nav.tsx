import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;


const Navbar = ({ className }: Props) => {
	return (
		<div className={cn("w-[80%]", className)}>
			<Link href={'/'} className="flex items-start w-36 h-auto">
				<Image src={`https://urugkonudzsrjlbvamip.supabase.co/storage/v1/object/sign/nuo_storage_bucket/logo-final.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJudW9fc3RvcmFnZV9idWNrZXQvbG9nby1maW5hbC5wbmciLCJpYXQiOjE3MjMxODc3MzMsImV4cCI6MTc1NDcyMzczM30.8MIVsmPR6weWt2SFKUEV0qwZfpaSYq84fH6L_KviT_A&t=2024-08-09T07%3A15%3A33.954Z`} alt="logo" width={150} height={150} />
			</Link>
		</div>
	);
}

export default Navbar;
