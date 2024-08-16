import { NextRequest, NextResponse } from "next/server";
import { baristaRepository } from "remote/barista-repository";
import { BaristaType } from "~/entities/barista/model/barista.model";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const phone = searchParams.get("phone");

  try {
    let result: BaristaType | undefined = undefined;

    if (id) {
      result = await baristaRepository.getBaristaById(id);
    }
    if (phone) {
      result = await baristaRepository.getCustomerByPhoneNumber(phone);
    }

    if (!result) {
      throw new Error("Barista not found");
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const baristaData: Omit<BaristaType, "id"> = await request.json();
    const result = await baristaRepository.createBarista(baristaData);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
