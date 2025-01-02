import { IPodProps } from "@/config/types";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getPodData(date: string) {
    const data: IPodProps = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&date=${date}`).then(res => res.json());
    return data;
}

const getCachedPodData = nextCache(getPodData, ["pod-data"], {
    tags: ["pod-data"]
})

const DetailPage = async ({ params }: { params: Promise<{ date: string }> }) => {
    const { date } = await params;
    const data = await getCachedPodData(date);
    const onClick = async () => {
        "use server"
        redirect("/");
    }
    return (
        <div className="relative">
            <form action={onClick}>
                <button className="text-2xl absolute top-5 left-5">&larr; back</button>
            </form>
            <div className="h-screen w-screen flex flex-col items-center justify-center p-24">
                <div className="flex justify-center items-center h-full">
                    <Link href={data.hdurl} className="relative w-full h-full aspect-square">
                        <Image
                            style={{
                                objectFit: "contain"
                            }}
                            fill
                            sizes='(max-width: 1000px) 50vw, 450px'
                            src={data.url}
                            alt="12"
                            priority
                        />
                    </Link>
                </div>
                <div className="w-full">
                    <h1 className="text-3xl font-extrabold text-center">{data.title}</h1>
                    <p className="truncate whitespace-normal line-clamp-5">{data.explanation}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailPage;