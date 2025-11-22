export const metadata = {
    title: "1Light World",
    description: "Raising mental heath awareness for Beauty Pageant",
}

export default function RootLayout({children}) {
    return (
        <html suppressHydrationWarning={true} lang="en">
        <head>
            {/* responsive meta */}
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=5"
            />

            {/* favicon */}
            {/* theme meta */}
            <meta name="theme-name" content="andromeda-light-nextjs"/>

            {/* google font css */}
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
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
        {children}
        </body>
        </html>
    )
}
