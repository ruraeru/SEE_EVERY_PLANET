import { CalenderInput } from "@/components/dateInput";
import { IPodProps } from "@/config/types";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import Link from "next/link";

async function getPodList() {
  const today = new Date().toLocaleDateString("ko-kr", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
    .replace(/\./g, '')
    .replace(/\s/g, '-');
  const data: IPodProps[] = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&start_date=2024-11-01&end_date=${today}`).then(res => res.json());
  return data;
}

const getCachedPodList = nextCache(getPodList, ["pod-list"], {
  tags: ["pod-list"],
});

const Home = async () => {
  const data = await getCachedPodList();
  return (
    <div className="w-screen h-screen">
      <CalenderInput />
      {data && (
        <div className="grid place-items-center grid-cols-2  
        sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {data.map((pod, index) => (
            <div key={index} className="w-[200px] h-[200px]">
              <Link href={`/detail/${pod.date}`}>
                <div className="relative w-full h-3/4 ">
                  {!pod.url.includes("youtube") ? (
                    <Image
                      fill
                      sizes="(max-width: 500px),(max-height: 500px)"
                      style={{
                        objectFit: "cover"
                      }}
                      src={pod.url}
                      alt={pod.title}
                    />
                  ) : (
                    <iframe width="100%" height="100%" src={pod.url} />
                  )}
                </div>
                <div>
                  <h1>{pod.date}</h1>
                  <p className="truncate">{pod.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home;