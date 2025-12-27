import { defineEventHandler, getQuery, sendProxy } from 'h3';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const destination = query.destination as string;

    if (!destination) {
        return { error: 'No destination provided' };
    }

    // Add headers to mimic browser
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Referer': 'https://www.google.com/',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
    };

    try {
        return await sendProxy(event, destination, {
            headers,
            sendStream: true,
            fetchOptions: {
                redirect: 'follow',
            },
        });
    } catch (error: any) {
        console.error('Proxy error:', error);
        event.node.res.statusCode = 500;
        return { error: 'Proxy failed', details: error.message };
    }
});
