import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getAllSubpageData } from "@/data/fetch";
import useMobileDetect from "@/hooks/device";
import { usePathname } from "next/navigation";

const Navbar = ({ className }: NavProps) => {
	const [state, setState] = useState<{
		subpageData: SubpageData[] | null;
		isMobile: boolean;
	}>({
		subpageData: null,
		isMobile: false,
	});

	const currentPath = usePathname();
	const device = useMobileDetect();

	useEffect(() => {
		const fetchData = async () => {
			console.log('UseEffect Navbar');
			try {
				const data = await getAllSubpageData();
				setState((prevState) => ({
					...prevState,
					subpageData: data.subpage,
					isMobile: device.isMobile(),
				}));
			} catch (error) {
				console.error("Error fetching subpage data:", error);
			}
		};

		fetchData();
	}, []);

	const renderLink = (subpage: SubpageData) => (
		<Link key={subpage.id} href={{ pathname: `/${subpage.link}`, query: { id: subpage.id } }} className="flex flex-col items-center">
			<div className={`h-16 w-16 rounded-md bg-[${subpage.linkcolor}] flex items-center justify-center`}>
				<Image src={subpage.navimgsrc} alt={subpage.link} width={50} height={50} />
				<span className="sr-only">{subpage.link}</span>
			</div>
			{currentPath === `/${subpage.link}` && (
				<div className={`h-16 w-16 rounded-md bg-[${subpage.linkcolor}] flex items-center justify-center -mt-5`}>
					<Image src={subpage.activenavimgsrc} alt={subpage.link} width={50} height={50} />
				</div>
			)}
		</Link>
	);

	return (
		<div className={cn(`${currentPath !== '/' ? 'w-[80%] -ml-10' : 'w-full'} flex ${state.isMobile ? '' : 'justify-between'}`, className)}>
			{state.subpageData && state.subpageData.length > 0 && (
				<div className="flex space-x-4">
					{currentPath !== '/' && (
						<Link href={'/'} className="flex flex-col items-center mt-2">
							<Image src="https://urugkonudzsrjlbvamip.supabase.co/storage/v1/object/sign/nuo_storage_bucket/back.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJudW9fc3RvcmFnZV9idWNrZXQvYmFjay5wbmciLCJpYXQiOjE3MjM0NTU0MzYsImV4cCI6MTc1NDk5MTQzNn0.Ep-1JrbNP_JUXVZk6CYO9315DF2lGSRSjuNi9aCaRZc&t=2024-08-12T09%3A37%3A16.868Z" alt="Back" width={50} height={50} />
							<span className="sr-only">Back</span>
						</Link>
					)}
					{!state.isMobile && state.subpageData.sort((a, b) => a.id - b.id).map(renderLink)}
				</div>
			)}
			{currentPath === '/' && (
				<Link href={'/'} className="flex items-start w-36 h-auto">
					<Image src={`https://urugkonudzsrjlbvamip.supabase.co/storage/v1/object/sign/nuo_storage_bucket/logo-final.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJudW9fc3RvcmFnZV9idWNrZXQvbG9nby1maW5hbC5wbmciLCJpYXQiOjE3MjMxODc3MzMsImV4cCI6MTc1NDcyMzczM30.8MIVsmPR6weWt2SFKUEV0qwZfpaSYq84fH6L_KviT_A&t=2024-08-09T07%3A15%3A33.954Z`} alt="logo" width={150} height={150} />
				</Link>
			)}
		</div>
	);
};

export default Navbar;