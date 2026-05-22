const BASE_URL = process.env.WR_BASE_URL!;
const API_KEY = process.env.WR_API_KEY!;
const MARKUP = parseFloat(
  process.env.MARKUP_PERCENTAGE || '0.3'
);

export async function getProducts() {
  try {

    const res = await fetch(
      `${BASE_URL}/products`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          api_key: API_KEY
        }),
        cache: 'no-store'
      }
    );

    const data = await res.json();

    console.log(
      'FULL WR RESPONSE:',
      JSON.stringify(data, null, 2)
    );

    if (!data.success) {
      throw new Error(
        data.message || 'Gagal ambil produk'
      );
    }

    const products =
        data.data ||
        data.products ||
        [];

      return products.map((product: any) => ({
      ...product,

      variants: product.variants.map((variant: any) => ({
        ...variant,

        original_price: variant.price,

        price:
          Math.ceil(
            variant.price *
            (1 + MARKUP) /
            1000
          ) * 1000
      }))
    }));

  } catch (err) {

    console.error(
      'WARUNG REBAHAN ERROR:',
      err
    );

    return [];
  }
}

export async function createOrder(
  variantId: string,
  quantity: number
) {

  try {

    const res = await fetch(
      `${BASE_URL}/order`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          api_key: API_KEY,
          variant_id: variantId,
          quantity
        })
      }
    );

    return await res.json();

  } catch (err) {

    console.error(
      'CREATE ORDER ERROR:',
      err
    );

    return {
      success: false
    };
  }
}