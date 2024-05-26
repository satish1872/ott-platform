import { NextResponse } from "next/server";
import supabase from "../../../supabaseClient";

export async function DELETE(request) {
  const { userId, contentId, contentType } = await request.json();

  const { data, error } = await supabase
    .from("user_lists")
    .delete()
    .eq("user_id", userId)
    .eq("content_id", contentId)
    .eq("content_type", contentType);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}
