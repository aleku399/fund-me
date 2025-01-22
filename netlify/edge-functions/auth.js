export default async function handler(req) {
    const cookies = new URL(req.url).searchParams.get("token");
  
    if (!cookies) {
      return Response.redirect(new URL("/login", req.url));
    }
  
    return new Response(null, { status: 200 });
  }
  