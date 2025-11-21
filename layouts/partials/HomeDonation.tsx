import Image from "next/image";

const HomeDonation = ({donation}) => {
    return <div className="relative">
        <div className="absolute w-[100px] h-[100px] bg-gradient left-40 top-20 rounded-3xl -z-[1]"></div>
        <div className="absolute w-[50px] h-[50px] bg-gradient right-40 bottom-40 rounded-2xl -z-[1]"></div>
        <div className="section bg-white/50 backdrop-blur-lg z-[1]">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:items-center">
                    <div className="text-center md:text-start order-2 md:order-1" data-aos="fade-left">
                        <h1 className="inline-block font-primary font-bold bg-gradient text-transparent bg-clip-text">{donation.title}</h1>
                        <p className="my-4 text-base md:text-lg lg:text-xl">{donation.description}</p>
                        <button className="btn btn-primary rounded-full">Donate Now</button>
                    </div>
                    <div className="text-center relative inline-block w-2/3 aspect-square order-1 md:order-2" data-aos="zoom-in">
                        <Image
                            src="https://images.gofundme.com/Wi85XKIjoTCNQ2VPs5wxKg7aiww=/720x480/https://d2g8igdw686xgo.cloudfront.net/69245745_1668079603293287_r.jpeg"
                            alt="donation-img" width={300} height={300}
                            className="w-full h-auto object-cover rounded-2xl cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:-translate-y-2 hover:z-[1] aspect-square relative left-1/2 bottom-1/2"/>
                        <Image
                            src="https://images.gofundme.com/ZCXv1RT3f4PdUqy9U3Oz2yAEUCA=/1200x900/https://d2g8igdw686xgo.cloudfront.net/31005524_1530556289357796_r.jpg"
                            alt="donation-img" width={300} height={300}
                            className="absolute left-0 top-0 w-full h-auto object-cover rounded-2xl cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:-translate-y-2 hover:z-[1] aspect-square"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default HomeDonation