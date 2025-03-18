/* eslint-disable @typescript-eslint/no-explicit-any */

interface RequestData {
  id: string;
  method: string;
  headers: any;
  query: any;
  body: any;
}

const sendWebhook = async (data: RequestData) => {
  try {
    const url = `http://localhost:${process.env.WEBSOCKET_SERVER_PORT}/api/webhook`
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
};

export default sendWebhook;