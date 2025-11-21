import Image from "next/image";
import {useEffect, useState} from "react";
import {IoCloseSharp, IoShareSocial} from "react-icons/io5";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

const BlogDetail = ({blog}) => {
    const [show, setShow] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const onViewImage = (index: number) => {
        setActiveIndex(index);
        setShow(true);
    }

    const onPrev = () => {
        if (activeIndex === 0)
            setActiveIndex(blog.images.length - 1);
        else
            setActiveIndex(activeIndex - 1);
    }

    const onNext = () => {
        if (activeIndex === blog.images.length - 1)
            setActiveIndex(0);
        else
            setActiveIndex(activeIndex + 1);
    }

    useEffect(() => {
        if (show)
            document.body.style.overflowY = "hidden";
        else
            document.body.style.overflowY = "auto";

        return () => {
            if (show)
                document.body.style.overflowY = "hidden";
            else
                document.body.style.overflowY = "auto";
        }
    }, [show]);

    return (
        <div className="container text-center">
            <h1 className="font-primary font-bold bg-gradient text-transparent bg-clip-text">{blog.title}</h1>
            <div className="my-10 flex gap-5 flex-wrap justify-center items-center">
                <p>{blog.createdAt}</p>
                <button className="btn btn-outline-primary flex gap-2 py-2 px-3 items-center justify-center group">
                    <IoShareSocial className="text-[#777] group-hover:text-white"/>
                    <span>Share</span>
                </button>
            </div>
            <div>
                <Image src={blog.thumbnail} alt="thumbnail" width={100} height={100}
                       className="w-full aspect-[2/1] object-cover"/>
                <div className="mt-3 flex gap-3 overflow-x-auto">
                    {blog.images.map((image: string, index: number) => (
                        <div key={index}
                             className="relative w-20 aspect-square rounded-lg overflow-hidden cursor-pointer group"
                             onClick={() => onViewImage(index)}>
                            <Image src={image} alt="thumbnail"
                                   className="object-cover transition-all duration-100 group-hover:scale-105" fill/>
                            <div
                                className="absolute w-full h-full bg-black/50 content-center text-center opacity-0 transition-all duration-100 group-hover:opacity-100">
                                <Image src="/icons/view.svg" alt="view" width={24} height={24} priority
                                       className="mx-auto"/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-5">
                <div className="text-start" dangerouslySetInnerHTML={{__html: blog.content}}></div>
            </div>
            <div
                className={`fixed top-0 left-0 bg-black/75 z-10 space-y-5 w-screen h-screen content-center ${!show && "hidden"}`}>
                <div className="hidden md:block">
                    <button
                        className="fixed top-1/2 -translate-y-1/2 left-3 p-0 w-[50px] h-[50px] bg-white rounded-full content-center transition-all duration-100 hover:opacity-75"
                        onClick={onPrev}>
                        <GrFormPrevious className="mx-auto w-auto h-2/3"/>
                    </button>
                    <button
                        className="fixed top-1/2 -translate-y-1/2 right-3 p-0 w-[50px] h-[50px] bg-white rounded-full content-center transition-all duration-100 hover:opacity-75"
                        onClick={onNext}>
                        <GrFormNext className="mx-auto w-auto h-2/3"/>
                    </button>
                </div>
                <div className="mx-auto max-w-[600px] w-full z-20 space-y-5 px-3">
                    <button className="block bg-stone-100 p-0 w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full ml-auto mr-0" onClick={() => setShow(false)}>
                        <IoCloseSharp className="mx-auto w-auto h-2/3"/>
                    </button>
                    <Image src={blog.images[activeIndex]} alt="img" width={100} height={100}
                           onClick={() => setShow(true)}
                           className="w-full h-auto" priority/>
                </div>
                <div className="flex gap-3 justify-center md:hidden">
                    <button
                        className="p-0 w-[40px] h-[40px] bg-white rounded-full content-center transition-all duration-100 hover:opacity-75"
                        onClick={onPrev}>
                        <GrFormPrevious className="mx-auto w-auto h-2/3"/>
                    </button>
                    <button
                        className="p-0 w-[40px] h-[40px] bg-white rounded-full content-center transition-all duration-100 hover:opacity-75"
                        onClick={onNext}>
                        <GrFormNext className="mx-auto w-auto h-2/3"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BlogDetail;
