export async function onRequest(context) {
  const { env } = context;
  const client_id = env.GITHUB_CLIENT_ID;
  const redirect_uri = encodeURIComponent(`https://naturmanvisuals.pages.dev/api/callback`);
  const state = crypto.randomUUID(); 
  
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=repo&state=${state}`;
  
  return Response.redirect(githubAuthUrl, 302);
}