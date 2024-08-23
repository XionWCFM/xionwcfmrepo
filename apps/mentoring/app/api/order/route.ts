import { NextRequest, NextResponse } from "next/server";
import { orderRepository } from "remote/order-repository";
import { OrderType } from "~/entities/order/model/order.model";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    const result = await orderRepository.getOrders();
    return NextResponse.json(result);
  }

  try {
    const result = await orderRepository.getOrderById(id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData: Partial<Omit<OrderType, "id">> = await request.json();

    if (!orderData.customerId) {
      throw new Error("Missing customerId parameter");
    }
    const result = await orderRepository.createOrder({
      customerId: orderData.customerId,
      beverages: orderData.beverages ?? [],
      createdAt: new Date().toISOString(),
      updatedAt: null,
      status: orderData.status ?? "preparing",
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  try {
    const orderData: Partial<OrderType> = await request.json();
    await orderRepository.updateOrder(id, orderData);
    return NextResponse.json({ message: "Order updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
