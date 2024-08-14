'use client';

import { useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { colorLastWords } from '@/lib/utils';
import { getAllData } from '@/data/fetch';
import { usePathname } from 'next/navigation';


const GetInTouchMobilePage: React.FC<GetInTouchMobilePageProps> = ({ data, openContactModal }) => {
    const [navData, setNavData] = useState<NavItem[] | null>(null);
    const currentPath = usePathname();

    useEffect(() => {
        (async () => {
            const data = await getAllData();
            setNavData(data.front);
        })();
    }, []);

    const openMobileContactModal = (contact: Contact) => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        openContactModal(contact);
    };

    const navItems = useMemo(() => {
        return navData?.map((item) => (
            <Link
                href={{ pathname: `/${item.nou_subpagelink.nou_subpage.link}`, query: { id: item.nou_subpagelink.nou_subpage.id } }}
                key={item.id}
                className={`${currentPath === `/${item.nou_subpagelink.nou_subpage.link}` ? '-mt-4' : ''}`}
            >
                {currentPath === `/${item.nou_subpagelink.nou_subpage.link}` && (
                    <Image src={item.nou_subpagelink.nou_subpage.activenavimgsrc} alt="ActivatedBar" width={50} height={50} />
                )}
                <Image src={item.nou_subpagelink.nou_subpage.navimgsrc} alt="NavBox" width={50} height={50} />
            </Link>
        ));
    }, [navData, currentPath]);

    return (
        <div className="w-screen flex flex-col items-center p-4">
            {/* Header */}
            <div className="w-full flex justify-between items-start">
                {/* Back Button */}
                <Link href={'/'} className="flex flex-col items-center mt-2">
                    <Image
                        src="https://urugkonudzsrjlbvamip.supabase.co/storage/v1/object/sign/nuo_storage_bucket/back.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJudW9fc3RvcmFnZV9idWNrZXQvYmFjay5wbmciLCJpYXQiOjE3MjM0NTU0MzYsImV4cCI6MTc1NDk5MTQzNn0.Ep-1JrbNP_JUXVZk6CYO9315DF2lGSRSjuNi9aCaRZc&t=2024-08-12T09%3A37%3A16.868Z"
                        alt="Back"
                        width={50}
                        height={50}
                    />
                    <span className="sr-only">Back</span>
                </Link>

                {/* Logo and Navigation Dots */}
                <div className="flex items-center space-x-1 ml-2">{navItems}</div>
            </div>

            {/* Main Content */}
            {data && (
                <div className="w-full mt-4">
                    {/* Image and Text Section */}
                    <Image src={data.mobileimagesrc} alt={data.link} width={400} height={400} />

                    {/* Description Section */}
                    <div className="mt-6 p-4 text-black">
                        <h1 className="text-3xl font-bold">
                            {data.title.split(' ').map((word, index) => (
                                <span key={index} className={colorLastWords(data.title, 3, index, '#be7a40')}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>
                        <p className="mt-4 text-sm font-medium text-black tracking-tighter">
                            {data.description.split('\n').map((line, index) => (
                                <span key={`description-line-${index}`}>
                                    <br />
                                    {line}
                                </span>
                            ))}
                        </p>
                    </div>
                    <div className="flex justify-center text-black items-center gap-2 ml-2 mt-2">
                        {data.nou_contacts?.length > 0 &&
                            data.nou_contacts
                                .sort((a, b) => a.id - b.id)
                                .map((contact) => (
                                    <button
                                        key={`contact-${contact.id}`}
                                        onClick={() => openMobileContactModal(contact)}
                                        className="flex flex-col justify-center items-center"
                                    >
                                        <Image src={contact.imagesrc} alt="" width={150} height={150} />
                                        <h2 className="text-base font-semibold tracking-tighter">{contact.name}</h2>
                                    </button>
                                ))}
                    </div>
                </div>
            )}

            {/* Footer Logo */}
            <div className="my-auto w-full flex justify-end">
                {data && <Image src={data.mobilefooter} alt="Footer Logo" width={50} height={50} />}
            </div>
        </div>
    );
};

export default GetInTouchMobilePage;