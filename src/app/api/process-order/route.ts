import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/mysql';

import {
  createOrder
} from '@/lib/warungrebahan';

export async function POST(
  req: NextRequest
) {

  try {

    const body =
      await req.json();

    const { orderId } =
      body;

    // ambil order dari database
    const [rows]: any =
      await db.execute(
        `
        SELECT *
        FROM orders
        WHERE id = ?
        `,
        [orderId]
      );

    if (!rows.length) {

      return NextResponse.json({
        success: false,
        message:
          'Order tidak ditemukan'
      });
    }

    const order =
      rows[0];
    if (
  order.status ===
  'processed'
) {

  return NextResponse.json({
    success: false,
    message:
      'Order sudah diproses'
  });
}
    // order otomatis ke WR
    const result =
      await createOrder(
        order.variant_id,
        1
      );

    // update status
    await db.execute(
      `
      UPDATE orders
      SET status = ?
      WHERE id = ?
      `,
      [
        'processed',
        orderId
      ]
    );

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (err: any) {

    console.error(
      'PROCESS ORDER ERROR:',
      err
    );

    return NextResponse.json({
      success: false,
      message:
        err.message
    });
  }
}