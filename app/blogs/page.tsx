import {getListPage} from "@lib/contentParser";
import Blogs from "@partials/Blogs";
import {blogs} from "../../content/blogs/_index";
import config from "@config/config.json";
import SeoMeta from "@layouts/SeoMeta";

const {blog_folder} = config.settings;

const BlogPage = async () => {
    const postIndex = await getListPage(`content/${blog_folder}/_index.md`);
    const {frontmatter} = postIndex;
    const {title} = frontmatter;
    const titles = title.split(": ");

    return (
        <>
            <SeoMeta title={title}/>
            <section className="section pt-[140px]">
                <div className="container">
                    <h1 className="h1 text-center font-bold font-primary text-transparent bg-gradient bg-clip-text" data-aos="fade-right">{titles[0]}</h1>
                    <h2 className="h2 text-center font-bold font-primary" data-aos="fade-left" data-aos-delay={100}>{titles[1]}</h2>
                    <Blogs blogs={blogs}/>
                </div>
            </section>
        </>
    )
}

export default BlogPage