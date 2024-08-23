import { beverageRepository } from "remote/beverage-repository";
import { BeverageType } from "~/entities/beverage/model/beverage.model";

export async function GET(request: Request) {
  console.log("is work?");
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const result = await fetchBeverage(id);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 404 });
  }
}

async function fetchBeverage(id: string | null): Promise<BeverageType | BeverageType[]> {
  if (id) {
    return beverageRepository.getBeverageById(id);
  }
  return beverageRepository.getBeverages();
}
