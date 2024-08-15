import Image from "next/image";
import Link from "next/link";

const Card = ({ item }: { item: FrontItem }) => (
    <Link
        key={item.id}
        href={{
            pathname: `/${item.nou_subpagelink.link}`,
            query: { id: item.nou_subpagelink.id }
        }}
        className="relative block h-48 rounded-lg overflow-hidden"
    >
        <Image
            src={`${item.nou_subpagelink.mobileimagesrc}`}
            alt={item.nou_subpagelink.link}
            className="w-full h-full object-center"
        />
        <span className="sr-only">{item.nou_subpagelink.link}</span>
    </Link>
);

export default function FrontMobilePage({ data }: FrontMobilePageProps) {
    return (
        <div className="min-h-screen w-screen flex flex-col items-center p-4">
            {/* Cards */}
            <div className="space-y-6 w-full">
                {data && data.front.map((item: FrontItem) => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
            <div className="bg-black text-white font-bold text-center self-end px-3.5 mr-1 mt-1">
                And yet... more to come
            </div>
        </div>
    );
}