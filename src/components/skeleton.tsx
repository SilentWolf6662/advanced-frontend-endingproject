import { cn } from "@/lib/utils";

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-gray-900/10", className)}
            {...props}
        />
    );
};

export { Skeleton };