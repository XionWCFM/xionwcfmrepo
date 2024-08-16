import { NextRequest, NextResponse } from "next/server";
import { customerRepository } from "remote/customer-repository";
import { CustomerType } from "~/entities/customer/model/customer.model";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const phone = searchParams.get("phone");

  try {
    const result = await fetchCustomer(id, phone);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}

async function fetchCustomer(id: string | null, phone: string | null): Promise<CustomerType> {
  if (id) {
    return customerRepository.getCustomerById(id);
  }
  if (phone) {
    return customerRepository.getCustomerByPhoneNumber(phone);
  }
  throw new Error("Missing id or phone parameter");
}

export async function POST(request: NextRequest) {
  try {
    const customerData: Omit<CustomerType, "id"> = await request.json();
    const result = await customerRepository.createBarista(customerData);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
