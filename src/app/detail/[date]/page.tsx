import { IPodProps } from "@/config/types";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import Link from "next/link";

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
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="w-1/2 h-1/2 flex justify-center items-center">
                <Link href={data.hdurl}>
                    <Image
                        width={500}
                        height={500}
                        src={data.url}
                        alt="12"
                        priority
                    />
                </Link>
            </div >
            <div>
                <h1 className="text-3xl font-extrabold">{data.title}</h1>
                <p>{data.explanation}</p>
            </div>
        </div>
    )
}

export default DetailPage;