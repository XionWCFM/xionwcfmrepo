import { type NextRequest, NextResponse } from "next/server";
import { getExperiments } from "~/shared/feature-flag/api";

export async function GET(_req: NextRequest) {
  const response = await getExperiments();
  return NextResponse.json(await response.json());
}
