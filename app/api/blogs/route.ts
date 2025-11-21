import {NextRequest, NextResponse} from "next/server";
import {collection, getDocs} from "@firebase/firestore";
import {db} from "@lib/firebase";

export async function GET(request: NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        const size = parseInt(searchParams.get("size") || "10", 10);
        const blogCollection = collection(<any>db, "blogs");
        const blogSnapshot = await getDocs(blogCollection);
        const blogList = blogSnapshot.docs;
        const data = blogList.map((blog) => ({_id: blog.id, ...blog.data()}));
        const paging = blogList.length === 0 ? null : {
            size,
            page: 1,
            total: blogList.length,
            totalPages: Math.trunc(blogList.length / size)
        }

        return new NextResponse(JSON.stringify({
            data,
            paging
        }), {
            status: 200
        });
    } catch (err) {
        console.log(JSON.stringify(err));
        const error = {
            code: 500,
            message: err?.raw?.message ?? "Internal server error"
        }
        return new NextResponse(JSON.stringify(error), {
            status: 500
        });
    }
}