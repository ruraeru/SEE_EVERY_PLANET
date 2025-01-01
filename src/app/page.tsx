import Image from "next/image";

interface IPodProps {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

async function getPodData() {
  const data: IPodProps = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`).then(res => res.json());
  return data;
}

export const Home = async () => {
  const data = await getPodData();
  console.log(data)
  return (
    <div className="w-screen h-screen">
      <input type="date" />
      <div>
        <div className="relative w-[1000px] h-[1000px]">
          <Image
            fill
            sizes="(max-width: 500px),(max-height: 500px)"
            style={{
              objectFit: "contain"
            }}
            src={data.hdurl}
            alt={data.title}
            priority
          />
        </div>
        <div>
          <h1>{data.title}</h1>
          <p>{data.explanation}</p>
        </div>
      </div>
    </div>
  )
}

export default Home;