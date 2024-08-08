'use client'

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/nav";
import { getAllData } from "@/data/fetch";

export default function Home() {
	const [allData, setAllData] = useState<any | null>(null);

	useEffect(() => {
		(async () => {
			const data = await getAllData();
			console.log(data);
			setAllData(data);
		})()
	}, [])
	return (
		<main className="flex flex-col min-h-screen items-center justify-between p-24 bg-gradient-to-b from-white to-[#b0d2e7]">
			<div className="flex flex-col h-full gap-1">
				<Navbar />
				<div className="flex gap-9 -mt-3">
					{
						allData && allData.front && allData.front.map((data: any) => (
							<Link href={{pathname: `/${data.nou_subpagelink.nou_subpage.link}`, query: {id: data.nou_subpagelink.nou_subpage.id} }} id="linkCard" className="w-full h-full" key={data.id}>
								<Image src={data.nou_subpagelink.imagesrc} alt="" width={220} height={516} className="w-auto h-auto" />
							</Link>
						))
					}
				</div>
				<div className="bg-black text-white font-bold text-center self-end px-3.5 mr-1 mt-1">
					And yet... more to come
				</div>
			</div>
		</main>
	);
}
