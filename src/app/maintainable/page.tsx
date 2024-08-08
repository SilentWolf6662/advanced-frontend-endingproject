'use client'

import { useEffect, useState } from "react";

import Image from "next/image";
import Navbar from "@/components/nav";
import { getSubpageDataById } from "@/data/fetch";
import { colorLast3Words } from "@/lib/utils";

export default function Whatwedo(params: any) {
    const [subpageData, setSubpageData] = useState<any | null>(null);
    const subpageId = params.searchParams.id
    useEffect(() => {
        (async () => {
            const data = await getSubpageDataById(subpageId);
            console.log(data);
            setSubpageData(data);
            console.log(data.subpage[0].description.split('\n'))
        })()
    }, [])
    return (
        <main className="flex flex-col min-h-screen items-center justify-between p-24 bg-[#c0ddef]">
            <div className="flex flex-col w-full h-full gap-1 items-center -mt-10">
                <Navbar className="ml-36" />
                {subpageData &&
                    <div className="flex gap-9 -mt-3 w-full h-full justify-center">
                        <div id="linkCard" className="w-1/6 h-full">
                            <Image src={subpageData.subpage[0].imagesrc} alt="" width={220} height={516} />
                        </div>
                        <div className="flex flex-col h-[516px] w-50">
                            <div>
                                <h1 className="text-5xl font-semibold text-black tracking-tighter">
                                    {subpageData.subpage[0].title.split(' ').map((word: string, index: number) => {
                                        return <span key={index} className={colorLast3Words(subpageData.subpage[0].title, index, "#153f57")}>{word} </span>
                                    })}
                                </h1>
                                <p className="text-xl font-medium tracking-tighter">
                                    {subpageData.subpage[0].description.split('\n').map((line: string, index: number) => {
                                        return <span key={`description-line-${index}`}><br />{line}</span>
                                    })}
                                </p>
                            </div>
                            <div className="bg-black text-white text-3xl font-bold text-center tracking-tighter w-[11.5rem] self-end mt-14">
                                {subpageData.subpage[0].cornertext}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </main>
    );
}
