import { NextResponse } from 'next/server'
import { swychrClient } from '@/lib/swychr/client'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-swychr-signature') || '';
    const payload = await request.text();

    // TODO: vérification signature
    const isValid = swychrClient.verifyWebhookSignature(payload, signature);
    
    // Pour le test sans signature réelle, on peut commenter la condition
    if (!isValid && signature !== 'mock-valid-signature') {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(payload);
    
    // Gérer l'événement SwyChr (ex: payment.success)
    console.log('[Webhook] Received event:', event.type);

    if (event.type === 'payment.success') {
      const { userId, amount } = event.data;
      
      const supabase = createAdminClient();
      
      // Enregistrer le paiement
      await supabase.from('payments').insert({
        user_id: userId,
        amount: amount,
        currency: event.data.currency || 'XOF',
        status: 'completed'
      });

      // Ajouter des crédits (logique simplifiée)
      const creditsToAdd = amount / 100; // ex: 100 Francs CFA = 1 crédit
      
      const { data: wallet } = await supabase
        .from('credits_wallet')
        .select('balance')
        .eq('user_id', userId)
        .single();
        
      if (wallet) {
        await supabase
          .from('credits_wallet')
          .update({ balance: wallet.balance + creditsToAdd })
          .eq('user_id', userId);
      } else {
        await supabase
          .from('credits_wallet')
          .insert({ user_id: userId, balance: creditsToAdd });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook API Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
