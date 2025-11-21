"use client";

import "swiper/swiper.min.css";
import {Swiper, SwiperSlide} from "swiper/react";
import Link from "next/link";
import {Autoplay, Pagination} from "swiper";
import Image from "next/image";

const HomeBlogs = ({blog}) => {
    return <div>
        <div className="text-center">
            <div className="coatainer mx-auto lg:col-10" data-aos="fade-right">
                <h1 className="font-primary font-bold bg-gradient text-transparent bg-clip-text">{blog.title}</h1>
            </div>
            {blog?.blogs.map((blog: any, index: number) => {
                const isOdd = index % 2 > 0;
                return (
                    <section
                        key={`blog-${index}`}
                        className={`section ${index === 0 && "pt-8"} ${isOdd && "bg-theme-light"}`}
                    >
                        <div className="container">
                            <div className="items-center gap-8 md:grid md:grid-cols-2">
                                {/* Carousel */}
                                <div className={`service-carousel ${!isOdd && "md:order-2"}`} data-aos="fade-right" data-aos-delay={(index + 1) * 100}>
                                    <Swiper
                                        modules={[Autoplay, Pagination]}
                                        pagination={
                                            blog.images.length > 1 ? {clickable: true} : false
                                        }
                                        autoplay={{
                                            delay: 5000,
                                            disableOnInteraction: false,
                                        }}
                                        init={blog?.images <= 1}
                                    >
                                        {/* Slides */}
                                        {blog?.images.map((slide: string, index: number) => (
                                            <SwiperSlide key={index}>
                                                <Image src={`${slide}`} alt="" width={600} height={500}/>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                {/* Content */}
                                <div
                                    data-aos="fade-left" data-aos-delay={(index + 1) * 100}
                                    className={`${isOdd ? 'text-start md:text-end' : 'text-start'} mt-5 md:mt-0 ${
                                        !isOdd && "md:order-1"
                                    }`}
                                >
                                    <h2 className="font-bold leading-[40px]">
                                        {blog.title[0]}
                                        <span
                                            className="text-transparent bg-gradient bg-clip-text"> {blog.title[1]}</span>
                                    </h2>
                                    <p className="mb-2 mt-4">{blog?.content}</p>
                                    {blog.button.enable && (
                                        <Link
                                            href={blog?.button.link}
                                            className="cta-link inline-flex items-center"
                                        >
                                            {blog?.button.label}
                                            <Image
                                                className="ml-1"
                                                src="/images/arrow-right.svg"
                                                width={18}
                                                height={18}
                                                alt="arrow"
                                                priority
                                            />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                )
            })}
        </div>
    </div>
}

export default HomeBlogs