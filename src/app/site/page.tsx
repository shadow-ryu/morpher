import Image from "next/image";
import logo from "../../../public/pac-logo.png";
export default function Home() {
  return (
    <>
      <section className="h-full w-full mt-[70px] md:pt-44 md:mt-[-70px] relative flex items-center justify-center flex-col ">
        {/* grid */}

        <div className="absolute bottom-0 left-0 right-0 h-[20rem]  top-[-70px] md:top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
        <div className="my-[3rem] block md:hidden"></div>
        <p className=" text-center">Customizable social media</p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-3xl md:text-8xl font-bold text-center md:text-[300px]">
            Morphy
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-70px]">
          {/* <Image
            src={"/assets/preview.png"}
            alt="banner image"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          /> */}
        </div>
      </section>
    </>
  );
}
