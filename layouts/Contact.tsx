import {getListPage} from "@lib/contentParser";
import {markdownify} from "@lib/utils/textConverter";
import ContactForm from "@partials/ContactForm";

const Contact = async () => {
    const contactPage = await getListPage("content/contact.md");
    const {frontmatter: {info}} = contactPage;

    return <section className="section pt-[140px]">
        <div className="container text-center">
            <h1 className="font-primary font-bold" data-aos="fade-right">Connect with</h1>
            <h1 className="bg-gradient text-transparent bg-clip-text" data-aos="fade-left" data-aos-delay={100}>1Light Cambodia</h1>

            <div className="section row pb-0">
                <div className="content col-12 md:col-6 lg:col-5 md:text-start md:ps-5 md:order-2">
                    <h4 className="md:mt-0" data-aos="fade-left" data-aos-delay={200}>{info.title}</h4>
                    <p className="mt-4" data-aos="fade-left" data-aos-delay={300}>{info.description}</p>
                    <ul className="contact-list mt-5">
                        {info.contacts.map((contact: any, index: number) => (
                            <li key={index} data-aos="fade-left" data-aos-delay={(index + 4) * 100}>
                                {markdownify(contact, "strong", "text-dark")}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-12 md:col-6 lg:col-7 md:order-1">
                    <ContactForm/>
                </div>
            </div>
        </div>
    </section>
};

export default Contact;
