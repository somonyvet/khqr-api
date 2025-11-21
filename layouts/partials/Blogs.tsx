"use client";

import BlogCard from "@components/BlogCard";

const Blogs = ({blogs}) => {
    const firstBlog = blogs[0];
    const restBlogs = blogs.slice(1);

    return (
        <div className="section pt-[50px]">
            <BlogCard id={firstBlog._id} title={firstBlog.title} thumbnail={firstBlog.thumbnail} date={firstBlog.createdAt} view="horizontal" content={firstBlog.content} animationDelay={200}/>
            <div className="mt-[70px] grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-5">
                {restBlogs.map((blog: any, index: number) => (
                    <BlogCard key={index} id={blog._id} title={blog.title} thumbnail={blog.thumbnail} date={blog.createdAt} animationDelay={(index + 3) * 100}/>
                ))}
            </div>
        </div>
    )
}

export default Blogs