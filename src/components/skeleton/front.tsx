import { Skeleton } from "@/components/skeleton";

export default function SkeletonFront() {
    return (
        <div className="flex gap-9">
            <Skeleton className="w-[220px] h-[516px] rounded-xl" />
            <Skeleton className="w-[220px] h-[516px] rounded-xl" />
            <Skeleton className="w-[220px] h-[516px] rounded-xl" />
        </div>
    );
}