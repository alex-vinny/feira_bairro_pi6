import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json(
        { success: false, error: "No image provided" },
        { status: 400 }
      );
    }

    const imgbbApiKey = process.env.IMGBB_API_KEY;

    if (!imgbbApiKey) {
      console.error("IMGBB_API_KEY not configured");
      return NextResponse.json(
        { success: false, error: "Image upload service not configured" },
        { status: 500 }
      );
    }

    // Upload to ImgBB
    const imgbbFormData = new FormData();
    imgbbFormData.append("image", image);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      {
        method: "POST",
        body: imgbbFormData,
      }
    );

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({
        success: true,
        url: data.data.url,
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Upload to ImgBB failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

