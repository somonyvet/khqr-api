import {FC, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";

interface Props {
    id: string;
    thumbnail: string;
    title: string;
    content?: string;
    date: string;
    onClick?: () => void;
    view?: "horizontal" | "vertical";
    animationDelay?: number;
}

const BlogCard: FC<Props> = ({id, thumbnail, title, content, date, onClick, view = "vertical", animationDelay = 0}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            if (!loading) {
                if (onClick)
                    onClick();
                else
                    router.push(`/blogs/${id}`);
            }
        }, 1000)
    }

    return <div className={`w-full flex flex-col ${view === "horizontal" && "md:flex-row"} shadow ${loading ? "cursor-progress" : "cursor-pointer group hover:shadow-lg"}`} onClick={handleClick} data-aos="fade-up" data-aos-delay={animationDelay}>
        <div className={`relative overflow-hidden aspect-[4/2.5] ${view === "horizontal" ? "w-full md:w-[200%]" : "w-full"}`}>
            {loading && <>
                <div className="absolute bg-stone-50/50 w-full h-full left-0 top-0 z-[1]"></div>
                <div className="absolute w-[12%] aspect-square z-[2] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#FFFFFF"></stop><stop offset=".3" stopColor="#FFFFFF" stop-opacity=".9"></stop><stop offset=".6" stopColor="#FFFFFF" stop-opacity=".6"></stop><stop offset=".8" stopColor="#FFFFFF" stop-opacity=".3"></stop><stop offset="1" stopColor="#FFFFFF" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#FFFFFF" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
                </div>
            </>}
            <Image src={thumbnail} alt="blog-thumbnail" fill className="object-cover transition-all duration-150 group-hover:scale-105 w-full"/>
        </div>
        <div className="py-3 px-4 space-y-2">
            <h5 className={`overflow-hidden line-clamp-1 sm:line-clamp-2 ${view === "vertical" && "text-lg md:text-xl"}`}>{title}</h5>
            {content && <div dangerouslySetInnerHTML={{__html: content}} className="text-dark overflow-hidden line-clamp-2 md:line-clamp-3"></div>}
            <p className="text-sm overflow-hidden line-clamp-1">{date}</p>
            <Link href={`/blogs/${id}`} className="cta-link">
                Read more
                <Image
                    className="ml-1 group-hover:ml-3"
                    src="/images/arrow-right.svg"
                    width={18}
                    height={18}
                    alt="arrow"
                    priority
                />
            </Link>
        </div>
    </div>
}

export default BlogCard