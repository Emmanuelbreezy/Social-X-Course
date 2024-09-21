import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Not authenticated", status: "error" },
        { status: 401 }
      );
    }
    const requestBody = await request.json();

    //const { body } = await postSchema.parseAsync(requestBody);
    return NextResponse.json(
      {
        data: {},
        message: "Upload Image successfully",
        status: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to upload image",
        status: "error",
      },
      { status: 400 }
    );
  }
}
