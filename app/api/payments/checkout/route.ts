import { NextResponse } from 'next/server'
import { swychrClient } from '@/lib/swychr/client'

export async function POST(request: Request) {
  try {
    const { amount, currency = 'XOF', userId } = await request.json();

    if (!amount || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: appel API SwyChr
    const checkout = await swychrClient.createCheckoutSession(amount, currency, userId);

    return NextResponse.json({
      success: true,
      checkoutUrl: checkout.checkoutUrl
    });
  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
