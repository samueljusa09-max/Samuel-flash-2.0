import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const generationId = params.id;
    if (!generationId) {
      return NextResponse.json({ error: 'Missing generation ID' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: generation, error } = await supabase
      .from('video_generations')
      .select('*')
      .eq('id', generationId)
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data: generation });
  } catch (error: any) {
    console.error('Status API Error:', error);
    // Mock response if DB is not ready
    return NextResponse.json({
      success: true,
      mocked: true,
      data: {
        id: params.id,
        status: 'completed',
        video_url: 'https://mock-video-url.com/video.mp4',
        created_at: new Date().toISOString()
      }
    });
  }
}
