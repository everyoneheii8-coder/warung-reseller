import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/mysql';

export async function POST(req: NextRequest) {
  try {
    const signature =
      req.headers.get('x-rebahan-signature') || '';

    const body = await req.text();

    // Validasi signature
    const secret = process.env.WEBHOOK_SECRET!;

    const expected = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (signature !== expected) {
      return NextResponse.json(
        {
          error: 'Invalid signature'
        },
        {
          status: 401
        }
      );
    }

    const payload = JSON.parse(body);

    const { event, data } = payload;

    // ORDER SELESAI
    if (event === 'order.completed') {

      // Update order
      await db.execute(
        `
        UPDATE orders
        SET status = ?
        WHERE wr_order_id = ?
        `,
        [
          'completed',
          data.order_id
        ]
      );

      // Ambil data order
      const [rows]: any = await db.execute(
        `
        SELECT * FROM orders
        WHERE wr_order_id = ?
        LIMIT 1
        `,
        [data.order_id]
      );

      if (rows.length) {
        const order = rows[0];

        // Kirim WhatsApp
        await sendWhatsApp(
          order.buyer_whatsapp,
          order.buyer_name,
          order.product_name,
          data.account_details || []
        );
      }
    }

    // ORDER GAGAL
    if (event === 'order.failed') {

      await db.execute(
        `
        UPDATE orders
        SET status = ?
        WHERE wr_order_id = ?
        `,
        [
          'failed',
          data.order_id
        ]
      );
    }

    return NextResponse.json({
      success: true
    });

  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: err.message
      },
      {
        status: 500
      }
    );
  }
}

async function sendWhatsApp(
  phone: string,
  name: string,
  product: string,
  accountDetails: any[]
) {

  const details = accountDetails
    ?.map((a: any) =>
      Object.entries(a)
        .map(([k, v]) => `*${k}:* ${v}`)
        .join('\n')
    )
    .join('\n---\n');

  const message =
`Halo ${name}! 👋

Pesanan kamu sudah selesai ✅

*${product}*

${details}

Terima kasih sudah order 🙏`;

  await fetch('https://api.fonnte.com/send', {
    method: 'POST',

    headers: {
      Authorization: process.env.FONNTE_TOKEN || '',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      target: phone,
      message
    })
  });
}