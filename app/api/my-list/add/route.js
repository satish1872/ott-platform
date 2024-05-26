import { NextResponse } from 'next/server';
import supabase from '../../../supabaseClient';

export async function POST(request) {
  const { userId, contentId, contentType } = await request.json();

  const { data, error } = await supabase
    .from('user_lists')
    .insert([{ user_id: userId, content_id: contentId, content_type: contentType }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}
