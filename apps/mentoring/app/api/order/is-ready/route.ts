import { NextRequest, NextResponse } from "next/server";
import { orderRepository } from "remote/order-repository";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  try {
    const result = await orderRepository.getOrderById(id);
    return NextResponse.json(result.status === "ready");
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}
