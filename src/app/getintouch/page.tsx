'use client'

import { DescriptionWithLineBreaks, TitleWithColoredWords } from "@/components/utilitiesComponent";
import { useCallback, useEffect, useState } from "react";

import GetInTouchMobilePage from "@/components/sites/mobile/getintouch";
import Image from "next/image";
import Modal from "@/components/modal";
import Navbar from "@/components/nav";
import SkeletonPageGetintouch from "@/components/skeleton/getintouch";
import { getSubpageDataById } from "@/data/fetch";
import useMobileDetect from "@/hooks/device";

const DesktopView = ({ subpageData, openContactModal }: DesktopViewProps) => (
    <div className="flex flex-col w-full h-full gap-1 items-center -mt-10">
        <Navbar className="ml-36" />
        <div className="flex gap-9 -mt-3 w-full h-full justify-center">
            <div id="linkCard" className="w-1/6 h-full">
                <Image src={subpageData.subpage[0].imagesrc} alt="" width={220} height={516} />
            </div>
            <div className="flex flex-col h-[516px] w-50">
                <div className="text-[#be7a40]">
                    <TitleWithColoredWords title={subpageData.subpage[0].title} color="#be7a40" amount={3} />
                    <DescriptionWithLineBreaks className="-mt-5 ml-2" description={subpageData.subpage[0].description} />
                    <div className="flex justify-center text-black items-center gap-2 ml-2 mt-2">
                        {subpageData.subpage[0].nou_contacts?.length > 0 && subpageData.subpage[0].nou_contacts
                            .sort((a, b) => a.id - b.id)
                            .map(contact => (
                                <button key={`contact-${contact.id}`} onClick={() => openContactModal(contact)} className="flex flex-col justify-center items-center">
                                    <Image src={contact.imagesrc} alt="" width={150} height={150} />
                                    <h2 className="text-base font-semibold tracking-tighter">{contact.name}</h2>
                                </button>
                            ))}
                    </div>
                </div>
                <div className="bg-black text-white text-3xl font-bold text-center tracking-tighter w-[11.5rem] self-end mt-14">
                    {subpageData.subpage[0].cornertext}
                </div>
            </div>
        </div>
    </div>
);

export default function Getintouch({ searchParams }: { searchParams: { id: string } }) {
    const [subpageData, setSubpageData] = useState<SubpageData | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<any | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const subpageId = searchParams.id;
    const device = useMobileDetect();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSubpageDataById(subpageId);
            setSubpageData(data);
            setModalData(data?.subpage[0]?.nou_contacts[0]);
            setIsMobile(device.isMobile());
        };
        if (subpageId) {
            fetchData();
        }
    }, [subpageId]);

    const closeFunction = useCallback(() => {
        setShowModal(false);
    }, []);

    const openContactModal = useCallback((contact: any) => {
        setModalData(contact);
        setShowModal(true);
    }, []);

    if (!subpageData) {
        return (
            <main className="flex flex-col min-h-screen items-center justify-between p-24 bg-[#feb372]">
                <Navbar className="ml-36" />
                <SkeletonPageGetintouch />
            </main>
        );
    }

    return (
        <main className="flex flex-col min-h-screen items-center justify-between p-24 bg-[#feb372]">
            {!isMobile ? (
                <DesktopView subpageData={subpageData} openContactModal={openContactModal} />
            ) : (
                <GetInTouchMobilePage data={subpageData.subpage[0]} openContactModal={openContactModal} />
            )}
            {showModal && modalData && <Modal contactName={modalData.name} closeModal={closeFunction} />}
        </main>
    );
}