import { type NextRequest, NextResponse } from "next/server";
import { getFeatureFlag } from "~/shared/feature-flag/api";

export async function GET(_req: NextRequest) {
  const response = await getFeatureFlag();
  return NextResponse.json(await response.json());
}
