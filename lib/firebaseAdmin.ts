import admin from "firebase-admin";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: "light-cambodia",
            clientEmail: "firebase-adminsdk-fbsvc@light-cambodia.iam.gserviceaccount.com",
            privateKey: "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCOVxsl8obDXuME\\nTHksaKerkYqPQZVQ2WFwIUSj41IFET2r6JB06HLulo3bKu16bjBjIm01gd6zGHCX\\nUi7aISpak5crOYXAvtfEHTTonwp+/uJWJXU+qT5IxLGyPBRzht2ZVH22bfKXsWLc\\nmjw3UFnVQpSwZy4J1dHBDbueTaXxa8qR8eFdM/RaHMaWrGpuSSXx/Ot5R+krRpYS\\nxAV0mKmhA5KtOoO0UHGiuyEjyRY3/7FGtbCLPZi+g2Uycm+jb1XIY1Al0Sif5x8z\\nBOcr1ykwvSuFWKyMqKoJoajQM6pKz3v6exJ+24kmHoxGJNqNVspdSKxj5eth3eMc\\nj3h1gK73AgMBAAECggEAO7U4UyO3+g48hloZ3lIMO4DysYMeQmrdX67k3yaFClEg\\nIJOOvSugwopu+Qe51EiSjZMsYmyW4WOYHzG/K4sL/DC7EcuwWpjzY3Wo8wd73KfI\\ng8B0vRM7aETyEUT4gzmIjUAO986JG66yPL2KEt3mwPmL669sdX223heHozEJMgqY\\nG4j2V8xAuV5fsPyNZZuuumgh6AmH6PeAlj7uV/7OH9lgy9SlfPt3RtqK91KKoqu3\\nl//g2IQ4UowcyqXeDUycvqKmbEIjm+IJiRCgjXSpU9sRAVarauF9VC8EVxNtpP0s\\nfyPF5fzy48XKnu2957usBXAnxFNkk3WobHLOJ5WMUQKBgQDD89MQ1InY/lIpo4R7\\nYmkFeweQSwymdEeqvGCayD5Zy97RHqX3wr9rEdyZG8biacrMCuhZrZIdkcXWBl0V\\nFN3iVQzj2Uam71si0zjVLjSyOFtXvIhSQDyOGh+JFv2IY+hQ9fsywzbrhIfPgg6v\\nw8LdoSThN3ooWXONFjWQTAPoPwKBgQC59Xx3yDba4CJ4+UMyNp4Sm33B6RgW0nQU\\nV1VXLwKP/LTH6kqYkwe02VHC7otjoXL+4cI2dx1Z+qpAhiwWY/ff8acvyiDtQ2Sq\\nhQHG5Zt5LCKlTcQsuqakrZWeYIP3RGFDp5I38JV+dO5G8SwuvZs6TdOa24/pmIch\\nWFVITmdLSQKBgDkn6azDEeJFbFnQ5FfJALEkjbQ879etmynmAJelSOqQWNHOisKV\\n/5ePgjT2sTBhg1G47MUbp78QQhCHkqcPixj1jej3+2+96WtjCPTFoYFKhvo0d97l\\n9cPNQt2N4y3hVmYnGbpYzrAr3CFe4kHKbBCRbFx0/iC+1sGUdNM+GPWpAoGBAKMk\\nk4YiyL1NVfD7/c/XyuZYNAQjE1cyW1RdKinKvFzGP3QEQF2K4H/xCKIT1YYa5mBm\\nf5R4++8s0qC5FYSvP4/g2eQ7WJfPQEm5Vs3AMp4j8mFD0I/NUNW41EKWOjB8dTh9\\nkvIwx3ah70md3D1FayHDlZmOdrthbWv7qxY8crLBAoGBAJb+NZmC0Y2P5GO0IZEA\\nlSSIQ6qxUTTOdZx0sAY9woatSGT1elZbk/30jY83T+H0RZB3+LQYkUZ0YYeMy+U7\\nn7zlPHvSP+nbXLBenUUZ1Hwfe+0uo1jxVLpiZeRZyvJvk57XkUZBSc+EwJtroa5g\\nV4IHBs+ftCt3QyeLsfG2ObGx\\n-----END PRIVATE KEY-----\\n"?.replace(/\\n/g, "\n"),
        })
    })
}

export const adminDb = admin.firestore();