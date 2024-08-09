import { Skeleton } from "@/components/skeleton";

export default function SkeletonPageGetintouch() {
    return (
        <div className="flex gap-9 -mt-3 w-full h-full justify-center">
            <div id="linkCard" className="w-1/6 h-full">
                <Skeleton className="w-[220px] h-[516px]" />
            </div>
            <div className="flex flex-col h-[516px] w-min">
                <div className="text-[#be7a40]">
                    <h1 className="text-5xl font-semibold text-black tracking-tighter">
                        <Skeleton className="w-full h-12 mb-2" />
                    </h1>
                    <div className="text-xl font-medium text-black tracking-tighter mt-5 ml-2">
                        <Skeleton className="w-full h-6 mb-2" />
                        <Skeleton className="w-full h-6 mb-2" />
                        <Skeleton className="w-full h-6 mb-2" />
                        <Skeleton className="w-full h-6 mb-2" />
                    </div>
                    <div className="flex justify-center text-black items-center gap-2 ml-2 mt-2">
                        <div>
                            <Skeleton className="w-[150px] h-[150px]" />
                            <Skeleton className="w-full h-6 mb-2" />
                        </div>
                        <div>
                            <Skeleton className="w-[150px] h-[150px]" />
                            <Skeleton className="w-full h-6 mb-2" />
                        </div>
                        <div>
                            <Skeleton className="w-[150px] h-[150px]" />
                            <Skeleton className="w-full h-6 mb-2" />
                        </div>
                    </div>
                </div>
                <div className="bg-black text-white text-3xl font-bold text-center tracking-tighter w-[11.5rem] self-end mt-14">
                    <Skeleton className="w-full h-12" />
                </div>
            </div>
        </div>
    );
}