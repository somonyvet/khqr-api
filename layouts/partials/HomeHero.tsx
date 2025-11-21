import {markdownify} from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const HomeHero = ({hero}) => {
    return (
        <section className="section pt-[140px]">
            <div className="container">
                <div className="row md:text-center">
                    <div className="mx-auto lg:col-10">
                        <h1 className="font-primary font-bold bg-gradient text-transparent bg-clip-text" data-aos="fade-right">{hero.title}</h1>
                        <p className="mt-4 text-base md:text-lg lg:text-xl" data-aos="fade-right" data-aos-delay={100}>{markdownify(hero.content)}</p>
                        <div className="mt-4 flex gap-2 md:gap-5 md:justify-center">
                            {hero.ctaButtons.map((btn: any, index: number) => (
                                <Link
                                    key={index}
                                    className={`btn ${btn.variant}`}
                                    href={btn.link}
                                    data-aos={index ? "fade-left" :"fade-right"} data-aos-delay={200}
                                >
                                    {btn.label}
                                </Link>
                            ))}
                        </div>
                        <Image
                            className="mx-auto mt-12"
                            src={hero.image}
                            width={750}
                            height={390}
                            style={{width: "auto", height: "auto"}}
                            alt="hero-image"
                            priority
                            data-aos="fade-right"
                            data-aos-delay={300}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
