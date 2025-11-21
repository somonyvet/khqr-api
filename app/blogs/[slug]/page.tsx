"use client";

import {blogs} from "../../../content/blogs/_index";
import BlogDetail from "@layouts/BlogDetail";

const BlogDetailPage = () => {
    return (
        <div className="section pt-[150px]">
            <BlogDetail blog={blogs[0]}/>
        </div>
    )
}

export default BlogDetailPage