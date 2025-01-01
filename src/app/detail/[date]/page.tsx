import { IPodProps } from "@/app/page";
import Image from "next/image";

async function getPodData(date: string) {
    const data: IPodProps = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&date=${date}`).then(res => res.json());
    return data;
}

const DetailPage = async ({ params }: { params: Promise<{ date: string }> }) => {
    const { date } = await params;
    const data = await getPodData(date);
    return (
        <div>
            <Image
                width={200}
                height={200}
                src={data.url}
                alt="12"
                priority
            />
        </div>
    )
}

export default DetailPage;