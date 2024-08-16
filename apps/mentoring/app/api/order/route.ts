export async function GET(request: Request) {
  return new Response(JSON.stringify({}), {
    headers: {
      "content-type": "application/json",
    },
  });
}
