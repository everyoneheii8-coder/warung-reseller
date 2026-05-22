import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/warungrebahan';

export async function GET() {

  const products = await getProducts();

  return NextResponse.json({
    success: true,
    data: products
  });
}