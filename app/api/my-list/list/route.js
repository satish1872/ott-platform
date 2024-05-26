import { NextResponse } from "next/server";
import supabase from "../../../supabaseClient";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("user_lists")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .range(offset, offset + limit - 1);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data, count });
}
