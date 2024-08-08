import Image from "next/image";
import Navbar from "@/components/nav";

export default function Getintouch() {
	return (
		<main className="flex flex-col min-h-screen items-center justify-between p-24 bg-gradient-to-b from-white to-[#b0d2e7]">
			<div className="flex flex-col h-full gap-1">
				<Navbar />
				<div className="flex gap-9 -mt-3">
					<div id="linkCard" className="w-full h-full">
						<Image src="/front/front-what-we-do.png" alt="" width={220} height={516} />
					</div>
					<div id="linkCard" className="w-full h-full">
						<Image src="/front/front-maintainable.png" alt="" width={220} height={516} />
					</div>
					<div id="linkCard" className="w-full h-full">
						<Image src="/front/front-get-in-touch.png" alt="" width={220} height={516} />
					</div>
				</div>
				<div className="bg-black text-white font-bold text-center self-end px-3.5 mr-1 mt-1">
					And yet... more to come
				</div>
			</div>
		</main>
	);
}
