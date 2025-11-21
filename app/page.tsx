import config from "@config/config.json";
import Cta from "@components/Cta";
import SeoMeta from "@layouts/SeoMeta";
import HomeHero from "@partials/HomeHero";
import HomeBlogs from "@partials/HomeBlogs";
import {getListPage} from "@lib/contentParser";
import HomeValue from "@partials/HomeValue";
import HomeDonation from "@partials/HomeDonation";

const HomePage = async () => {
    const homePage = await getListPage("content/_index.md");
    const {frontmatter} = homePage;
    const {hero, value, blog, donation, call_to_action} = frontmatter;
    const {title} = config.site;

    return (
        <div className="w-full overflow-hidden">
            <SeoMeta title={title}/>

            {/* Hero */}
            <HomeHero hero={hero}/>

            {/* Value/Trust */}
            <HomeValue value={value}/>

            {/* Blogs */}
            <HomeBlogs blog={blog}/>

            {/* Donation */}
            <HomeDonation donation={donation}/>

            {/* Cta */}
            <Cta cta={call_to_action}/>
        </div>
    )
}

export default HomePage