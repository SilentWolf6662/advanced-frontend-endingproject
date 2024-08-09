'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/nav";
import { colorLast3Words } from "@/lib/utils";
import { getSubpageDataById } from "@/data/fetch";
import Modal from "@/components/modal";
import { Skeleton } from "@/components/skeleton";
import SkeletonPageGetintouch from "@/components/skeleton/getintouch";

export default function Getintouch(params: any) {
    const [subpageData, setSubpageData] = useState<any | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalData, setModalData] = useState<any | null>(null);
    const subpageId = params.searchParams.id

    // Fetch subpage data on component mount
    useEffect(() => {
        (async () => {
            const data = await getSubpageDataById(subpageId);
            console.log(data);
            setSubpageData(data);
            setModalData(data?.subpage[0].nou_contacts[0])
        })()
    }, [])

    const closeFunction = () => {
        setShowModal(false)
    }

    const openContactModal = (contact: any) => {
        setModalData(contact)
        setShowModal(true)
    }

    return (
        <main className="flex flex-col items-center justify-between p-24 bg-[#feb372]">
            <div className="flex flex-col w-full h-full gap-1 items-center -mt-10">
                <Navbar className="ml-36" />
                {subpageData ?
                    <div className="flex gap-9 -mt-3 w-full h-full justify-center">
                        <div id="linkCard" className="w-1/6 h-full">
                            <Image src={subpageData.subpage[0].imagesrc} alt="" width={220} height={516} />
                        </div>
                        <div className="flex flex-col h-[516px] w-50">
                            <div className="text-[#be7a40]">
                                <h1 className="text-5xl font-semibold text-black tracking-tighter">
                                    {/* Apply color to the last 3 words of the title */}
                                    {subpageData.subpage[0].title.split(' ').map((word: string, index: number) => (
                                        <span key={index} className={colorLast3Words(subpageData.subpage[0].title, index, "#be7a40")}>
                                            {word}{' '}
                                        </span>
                                    ))}
                                </h1>
                                <p className="text-xl font-medium text-black tracking-tighter -mt-5 ml-2">
                                    {/* Split description by lines */}
                                    {subpageData.subpage[0].description.slice(0, 378).split('\n').map((line: string, index: number) => {
                                        return <span key={`description-line-${index}`}><br />{line}</span>
                                    })}
                                </p>
                                <div className="flex justify-center text-black items-center gap-2 ml-2 mt-2">
                                    {subpageData.subpage[0].nou_contacts && subpageData.subpage[0].nou_contacts.length > 0 ?
                                        subpageData.subpage[0].nou_contacts
                                            .sort((a: any, b: any) => a.id - b.id)
                                            .map((contact: any) => {
                                                return (
                                                    <button key={`contact-${contact.id}`} onClick={() => openContactModal(contact)} className="flex flex-col justify-center items-center">
                                                        <Image src={contact.imagesrc} alt="" width={150} height={150} />
                                                        <h2 className="text-base font-semibold tracking-tighter">{contact.name}</h2>
                                                    </button>
                                                )
                                            })
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <div className="bg-black text-white text-3xl font-bold text-center tracking-tighter w-[11.5rem] self-end mt-14">
                                {subpageData.subpage[0].cornertext}
                            </div>
                        </div>
                    </div>
                : <SkeletonPageGetintouch />}
            </div>
            {showModal && modalData && <Modal contactName={modalData.name} closeFunction={() => closeFunction()} />}
        </main>
    );
}