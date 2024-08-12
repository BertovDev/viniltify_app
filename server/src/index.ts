import { Hono } from "hono";
import generateRandomString from "./utils";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = new Hono();
const port: number = 3001;

const spotify_client_id: string | undefined = Bun.env
  .SPOTIFY_CLIENT_ID as string;
const spotify_client_secret: string | undefined = Bun.env
  .SPOTIFY_CLIENT_SECRET as string;
let access_token = "";

app.get("/", (c) => {
  if (spotify_client_id === undefined) return c.text("undefined");
  return c.text("Home " + access_token);
});

app.get("/auth/login", (c) => {
  let scope =
    "streaming \
               user-read-email \
               user-read-private \
               playlist-modify-public \
               user-read-playback-state \
               user-modify-playback-state";

  let state = generateRandomString(16);

  let auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: "http://localhost:3001/auth/callback",
    state: state,
  });

  return c.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
});

app.get("/auth/callback", async (c) => {
  const code = c.req.query("code") as string;

  if (!code) {
    return c.json({ error: "Authorization code is missing" }, 400);
  }

  const authOptions: RequestInit = {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${spotify_client_id}:${spotify_client_secret}`).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: "http://localhost:3001/auth/callback",
      grant_type: "authorization_code",
    }),
  };

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    authOptions
  );

  if (response.ok) {
    const body = await response.json();
    access_token = body.access_token;
    // console.log(access_token);

    return c.redirect("http://localhost:3000/");
  }

  return c.text("callback");
});

app.get("/auth/token", (c) => {
  console.log("Fowardin " + access_token);
  return c.json({
    access_token: access_token,
  });
});

export default {
  port: port,
  fetch: app.fetch,
};
