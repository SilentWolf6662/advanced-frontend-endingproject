'use client'

import { DescriptionWithLineBreaks, TitleWithColoredWords } from "@/components/utilitiesComponent";
import { useEffect, useState } from "react";

import Image from "next/image";
import Navbar from "@/components/nav";
import SkeletonSubpage from "@/components/skeleton/subpage";
import WhatWeDoMobilePage from "@/components/sites/mobile/whatwedo";
import { getSubpageDataById } from "@/data/fetch";
import useMobileDetect from "@/hooks/device";

const DesktopView = ({ subpageData }: { subpageData: any }) => (
    <div className="flex flex-col w-full h-full gap-1 items-center -mt-10">
        <Navbar className="ml-36" />
        <div className="flex gap-9 -mt-3 w-full h-full justify-center">
            <div id="linkCard" className="w-1/6 h-full">
                <Image src={subpageData?.subpage[0]?.imagesrc} alt="" width={220} height={516} />
            </div>
            <div className="flex flex-col h-[516px] w-50">
                <div className="text-[#153f57]">
                    <TitleWithColoredWords title={subpageData?.subpage[0]?.title} color="#153f57" amount={2} />
                    <DescriptionWithLineBreaks description={subpageData?.subpage[0]?.description} />
                </div>
                <div className="bg-black text-white text-3xl font-bold text-center tracking-tighter w-[11.5rem] self-end mt-14">
                    {subpageData?.subpage[0]?.cornertext}
                </div>
            </div>
        </div>
    </div>
);

export default function Whatwedo(params: any) {
    const [subpageData, setSubpageData] = useState<any | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const subpageId = params.searchParams.id;
    const device = useMobileDetect();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSubpageDataById(subpageId);
            setSubpageData(data);
            setIsMobile(device.isMobile());
        };
        if (subpageId) {
            fetchData();
        }
    }, [subpageId, device]);

    return (
        <main className="flex flex-col min-h-screen items-center justify-between p-24 bg-[#abcfe6]">
            {!isMobile ? (
                subpageData ? <DesktopView subpageData={subpageData} /> : <SkeletonSubpage />
            ) : (
                subpageData && <WhatWeDoMobilePage data={subpageData.subpage[0]} />
            )}
        </main>
    );
}