import { NextResponse } from 'next/server'
import { swychrClient } from '@/lib/swychr/client'

export async function POST(request: Request) {
  try {
    const { packageId, userId } = await request.json();

    if (!packageId || !userId) {
      return NextResponse.json({ error: 'Missing packageId or userId' }, { status: 400 });
    }

    // Définir les packages
    const packages: Record<string, { amount: number, credits: number }> = {
      'pack_10': { amount: 1000, credits: 10 },
      'pack_50': { amount: 4500, credits: 50 },
      'pack_100': { amount: 8000, credits: 100 }
    };

    const selectedPackage = packages[packageId];
    if (!selectedPackage) {
      return NextResponse.json({ error: 'Invalid package' }, { status: 400 });
    }

    // TODO: Appel API SwyChr pour initier le paiement
    const checkout = await swychrClient.createCheckoutSession(selectedPackage.amount, 'XOF', userId);

    return NextResponse.json({
      success: true,
      checkoutUrl: checkout.checkoutUrl,
      expectedCredits: selectedPackage.credits
    });
  } catch (error: any) {
    console.error('Purchase API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
