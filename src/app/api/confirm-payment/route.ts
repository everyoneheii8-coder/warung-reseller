import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mysql';
import { createOrder } from '@/lib/warungrebahan';

export async function POST(req: NextRequest) {
  try {
    const { orderId, adminKey } = await req.json();

    // Proteksi admin
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized'
        },
        {
          status: 401
        }
      );
    }

    // Cari order di MySQL
    const [rows]: any = await db.execute(
      `
      SELECT * FROM orders
      WHERE id = ?
      LIMIT 1
      `,
      [orderId]
    );

    if (!rows.length) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order tidak ditemukan'
        },
        {
          status: 404
        }
      );
    }

    const order = rows[0];

    // Order ke Warung Rebahan
    const wrResult = await createOrder(
      order.variant_id,
      1
    );

    if (!wrResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Gagal order ke supplier'
        },
        {
          status: 500
        }
      );
    }

    // Update status order
    await db.execute(
      `
      UPDATE orders
      SET status = ?, wr_order_id = ?
      WHERE id = ?
      `,
      [
        'processing',
        wrResult.data.order_id,
        orderId
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Pembayaran dikonfirmasi'
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