import {getListPage} from "@lib/contentParser";
import Donation from "@partials/Donation";

const DonationDescBlogs = [
    "Former Miss [Region] Maya L. shares her raw story of stage anxiety, performance pressure, and the simple techniques she used to cope and regain her peace backstage. Find support today.",
    "Many titleholders face unexpected sadness and loss of identity. Read this essential guide on navigating post-pageant depression, finding your new purpose, and making peace with the silence.",
    "A national contestant shares her vulnerability on toxic body image standards and online bullying. Learn practical self-care tips for building self-worth beyond the stage."
]

const DonationPage = async () => {
    const homePage = await getListPage("content/_index.md");
    const {frontmatter} = homePage;
    const {donation} = frontmatter;

    return (
        <section className="section pt-[140px]">
            <div className="container text-center">
                <div className="w-full md:w-3/4 mx-auto">
                    <h1 className="font-primary font-bold bg-gradient text-transparent bg-clip-text" data-aos="fade-right">{donation.title}</h1>
                    <p className="mt-4 text-base md:text-lg lg:text-xl" data-aos="fade-left" data-aos-delay={100}>{donation.description}</p>
                </div>
            </div>
            <Donation donationBlogs={DonationDescBlogs}/>
        </section>
    )
}

export default DonationPage