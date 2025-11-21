import config from "@config/config.json";
import theme from "@config/theme.json";
import Footer from "@partials/Footer";
import Header from "@partials/Header";
import Providers from "@partials/Providers";
import "../styles/style.scss";

import NextTopLoader from "nextjs-toploader";

export const metadata = {
    title: "1Light Cambodia",
    description: "Raising mental heath awareness for Beauty Pageant",
}

export default function RootLayout({children}) {
    const pf = theme.fonts.font_family.primary;

    return (
        <html suppressHydrationWarning={true} lang="en">
        <head>
            {/* responsive meta */}
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=5"
            />

            {/* favicon */}
            <link rel="shortcut icon" href={config.site.favicon}/>
            {/* theme meta */}
            <meta name="theme-name" content="andromeda-light-nextjs"/>

            {/* google font css */}
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link
                href={`https://fonts.googleapis.com/css2?family=${pf}&display=swap`}
                rel="stylesheet"
            />

            {/* theme meta */}
            <meta name="theme-name" content="andromeda-light-nextjs"/>
            <meta name="msapplication-TileColor" content="#000000"/>
            <meta
                name="theme-color"
                media="(prefers-color-scheme: light)"
                content="#fff"
            />
            <meta
                name="theme-color"
                media="(prefers-color-scheme: dark)"
                content="#000"
            />
            <title>{metadata.title}</title>
        </head>
        <body suppressHydrationWarning={true}>
        <NextTopLoader color="#7458b1" showSpinner={false}/>
        <Header/>
        <Providers>{children}</Providers>
        <Footer/>
        </body>
        </html>
    )
}
