'use client'

import { useEffect, useMemo, useState } from "react";

import FrontMobilePage from "@/components/sites/mobile/front";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/nav";
import SkeletonFront from "@/components/skeleton/front";
import { getAllData } from "@/data/fetch";
import useMobileDetect from "@/hooks/device";

export default function Home() {
	const [allData, setAllData] = useState<AllData | null>(null);
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const device = useMobileDetect();

	useEffect(() => {
		(async () => {
			const data = await getAllData();
			setAllData(data);
			setIsMobile(device.isMobile());
			console.log('UseEffect');
		})();
	}, []);

	const content = useMemo(() => {
		console.log('UseMemo');
		if (!allData) return <SkeletonFront />;
		if (isMobile) return <FrontMobilePage data={allData} />;
		return allData.front.map((data) => (
			<Link
				href={{
					pathname: `/${data.nou_subpagelink.link}`,
					query: { id: data.nou_subpagelink.id },
				}}
				className="w-full h-full"
				key={data.id}
			>
				<Image
					src={data.nou_subpagelink.imagesrc}
					alt=""
					width={220}
					height={516}
					className="w-auto h-auto"
				/>
			</Link>
		));
	}, [allData, isMobile]);

	return (
		<main className="flex flex-col min-h-screen items-center justify-between p-24 bg-gradient-to-b from-white to-[#b0d2e7]">
			<div className="flex flex-col h-full gap-1">
				<Navbar />
				<div className="flex gap-9 -mt-3">{content}</div>
				{!isMobile && (
					<div className="bg-black text-white font-bold text-center self-end px-3.5 mr-1 mt-1">
						And yet... more to come
					</div>
				)}
			</div>
		</main>
	);
}