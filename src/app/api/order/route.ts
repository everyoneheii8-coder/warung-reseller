import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mysql';
import { snap } from '@/lib/midtrans';

export async function POST(req: NextRequest) {

  try {

    const body = await req.json();

    const {
      buyerName,
      buyerWhatsapp,
      buyerEmail,
      productName,
      variantName,
      variantId,
      sellingPrice
    } = body;

    const invoiceId =
      'INV-' + Date.now();

    // simpan order
    const [result]: any = await db.execute(
      `
      INSERT INTO orders (
        invoice_id,
        buyer_name,
        buyer_whatsapp,
        buyer_email,
        product_name,
        variant_name,
        variant_id,
        selling_price,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        invoiceId,
        buyerName,
        buyerWhatsapp,
        buyerEmail,
        productName,
        variantName,
        variantId,
        sellingPrice,
        'pending_payment'
      ]
    );

    // create midtrans transaction
    const transaction =
      await snap.createTransaction({

        transaction_details: {
          order_id: invoiceId,
          gross_amount: sellingPrice
        },

        customer_details: {
          first_name: buyerName,
          email: buyerEmail,
          phone: buyerWhatsapp
        },

        enabled_payments: [
          'qris'
        ]
      });

    // simpan snap token
    await db.execute(
      `
      UPDATE orders
      SET snap_token = ?
      WHERE id = ?
      `,
      [
        transaction.token,
        result.insertId
      ]
    );

    return NextResponse.json({
      success: true,

      orderId: result.insertId,

      snapToken:
        transaction.token,

      redirectUrl:
        transaction.redirect_url
    });

  } catch (err: any) {

    console.error(err);

    return NextResponse.json({
      success: false,
      message: err.message
    });
  }
}