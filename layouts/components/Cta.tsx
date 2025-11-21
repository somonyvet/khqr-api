import {markdownify} from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

function Cta({cta}) {
    return (
        <section className="section px-4" data-aos="fade-up">
            <div className="section container rounded-xl shadow">
                <div className="row mx-auto items-center justify-center">
                    <div className="md:col-5 lg:col-4">
                        <Image
                            className="w-full"
                            src={cta?.image}
                            alt="call to action image"
                            width={325}
                            height={206}
                        />
                    </div>
                    <div className="mt-5 text-center md:col-6 lg:col-5 md:mt-0 md:text-left">
                        <h2>{cta?.title[0]}</h2>
                        <h3 className="text-transparent bg-gradient bg-clip-text">{cta?.title[1]}</h3>
                        <p className="my-4">{markdownify(cta?.content)}</p>
                        {cta.button.enable && (
                            <Link
                                className="btn btn-primary mt-1"
                                href={cta.button.link}
                                rel={cta.button.rel}
                            >
                                {cta.button.label}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cta