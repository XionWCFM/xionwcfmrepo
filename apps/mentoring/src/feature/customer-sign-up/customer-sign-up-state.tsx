import { builder } from "@xionwcfm/hooks";
import { CustomerType } from "~/entities/customer/model/customer.model";

type CustomerSignUpState = Omit<CustomerType, "id"> & { id: null | string };

export const [CustomerSignUpStateProvider, useCustomerSignUpState] = builder.context<CustomerSignUpState>({
  name: "",
  phone: "",
  id: null,
});

export const [CustomerSignUpDispatchProvider, useCustomerSignUpDispatch] =
  builder.context<(newValue: Partial<CustomerSignUpState>) => void>(null);
