import { SignJWT, importPKCS8 } from "jose";
import { Product } from "../types";

async function getAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY!.trim().replace(/\\n/g, "\n");

  const privateKey = await importPKCS8(rawKey, "RS256");

  const now = Math.floor(Date.now() / 1000);

  const jwt = await new SignJWT({
    scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
  })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt(now)
    .setIssuer(email)
    .setAudience("https://oauth2.googleapis.com/token")
    .setExpirationTime(now + 3600)
    .sign(privateKey);

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

function optimizeImageUrl(url: string): string {
  if (url.includes("res.cloudinary.com") && url.includes("/upload/") && !url.includes("/video/upload/")) {
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_1200/");
  }
  return url;
}

export async function getProducts(): Promise<Product[]> {
  const token = await getAccessToken();
  const range = encodeURIComponent("A2:I");

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEETS_ID}/values/${range}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  const rows: string[][] = data.values ?? [];

  return rows
    .filter((row) => row[8]?.toUpperCase() === "TRUE")
    .map((row, index) => ({
      id: Number(row[0]) || index + 1,
      name: row[1],
      description: row[2],
      detailDescription: row[3] || undefined,
      price: Number(row[4]),
      category: row[5] as Product["category"],
      images: row[6].split(",").map((url) => optimizeImageUrl(url.trim())).filter(Boolean),
      sizes: row[7] ? row[7].split(",").map((s) => s.trim()).filter(Boolean) : undefined,
    }));
}
