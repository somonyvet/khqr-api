import {markdownify} from "@lib/utils/textConverter";

const HomeValue = ({value}) => {
    return <div className="relative">
        <div className="absolute w-[100px] h-[100px] bg-gradient left-40 top-20 -z-[1] animate-pulse"></div>
        <div className="absolute w-[100px] h-[100px] bg-gradient right-40 bottom-40 rounded-full -z-[1] animate-pulse"></div>
        <div className="section bg-white/50 backdrop-blur-lg z-[1]">
            <div className="container">
                <div className="row text-center">
                    <div className="mx-auto lg:col-10" data-aos="fade-left">
                        <h1 className="text-black">You Are Not Alone. <span
                            className="font-primary font-bold bg-gradient text-transparent bg-clip-text">{value.title}</span>
                        </h1>
                        <p className="mt-4 text-base md:text-lg lg:text-xl" data-aos="fade-left" data-aos-delay={100}>{markdownify(value.subTitle)}</p>
                    </div>
                    <div className="my-20 grid grid-cols-1 md:grid-cols-2 gap-10">
                        {value.actions.map((action: any, index: number) => (
                            <div key={index} className="md:text-start" data-aos={index ? "fade-left" : "fade-right"} data-aos-delay={200}>
                                <h3>{action.heading}</h3>
                                <p className="my-4">{action.body}</p>
                                <button className="btn btn-primary rounded-full">{action.cta}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default HomeValue;
