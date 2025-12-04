import { NextRequest } from 'next/server';
import { parseStringPromise } from 'xml2js';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query');
  const apiKey = process.env.NEXT_PUBLIC_ALADIN_TTB_KEY;

  try {
    const response = await fetch(
      `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${apiKey}&Query=${query}&QueryType=Title&MaxResults=100&start=1&SearchTarget=Book&output=xml`,
    );
    const xml = await response.text();
    const data = await parseStringPromise(xml, {
      explicitArray: false,
      explicitRoot: false,
      mergeAttrs: true,
    });

    if (response.ok) {
      const item = data.item;
      const items = Array.isArray(item) ? item : item ? [item] : [];
      return new Response(JSON.stringify(items), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ message: 'Fetch error' }), {
        status: response.status,
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Internal Server Error',
        error: (error as Error).message,
      }),
      { status: 500 },
    );
  }
}
