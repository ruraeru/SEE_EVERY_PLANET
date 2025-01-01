import { CalenderInput } from "@/components/calender";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export interface IPodProps {
  copyright: string | undefined;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

async function getPodData() {
  const data: IPodProps = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&date=2024-01-01`).then(res => res.json());
  return data;
}

async function getPodList() {
  const data: IPodProps[] = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&start_date=2024-12-01&end_date=2025-01-01`).then(res => res.json());
  return data;
}

const getCachedPodList = nextCache(getPodList, ["pod-list"], {
  tags: ["pod-list"]
});

export const Home = async () => {
  // const data = await getPodData();
  const data = await getCachedPodList();
  // console.log(data);
  return (
    <div className="w-screen h-screen">
      <CalenderInput />
      {data && (
        <div className="flex flex-wrap gap-2 justify-center">
          {data.map((pod, index) => (
            <div key={index} className="w-[200px]">
              <div className="relative w-[200px] h-[200px]">
                <Link href={typeof pod.hdurl === "string" ? pod.hdurl : ""}>
                  {!pod.url.includes("youtube") && (
                    <Image
                      fill
                      sizes="(max-width: 500px),(max-height: 500px)"
                      style={{
                        objectFit: "cover"
                      }}
                      src={pod.url}
                      alt={pod.title}
                      priority
                    />
                  )}
                </Link>
              </div>
              <div>
                <h1>{pod.date}</h1>
                <p className="break-all">{pod.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* {data && (
        <div>
          <Link href={data.hdurl}>
            <div className="relative w-[200px] h-[200px]">
              <Image
                fill
                sizes="(max-width: 500px),(max-height: 500px)"
                style={{
                  objectFit: "contain"
                }}
                src={data.url}
                alt={data.title}
                priority
              />
            </div>
          </Link>
          <div>
            <h1>{data.title}</h1>
            <p>{data.explanation}</p>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default Home;