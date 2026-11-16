export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Nessun codice fornito da GitHub", { status: 400 });
  }

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code: code,
    }),
  });

  const data = await response.json();
  
  if (data.error) {
    return new Response(`Errore di GitHub: ${data.error_description}`, { status: 400 });
  }

  const token = data.access_token;

  const html = `
    <!DOCTYPE html>
    <html>
      <body>
        <script>
          const token = "${token}";
          const provider = "github";
          const message = "authorization:github:success:" + JSON.stringify({ token: token, provider: provider });
          window.opener.postMessage(message, "*");
          window.close();
        </script>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}