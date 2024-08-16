"use client";
import { builder, useLocalStorage } from "@xionwcfm/hooks";
import { PropsWithChildren } from "react";
import { CustomerType } from "~/entities/customer/model/customer.model";
import { STORAGE_KEY } from "~/shared/storage-key";

export type CustomerSignUpStateType = Omit<CustomerType, "id"> & { id: null | string };

const defaultValue = {
  name: "",
  phone: "",
  id: null,
};

const [CustomerSignUpStateProvider, useCustomerSignUpState] = builder.context<CustomerSignUpStateType>(null);

const [CustomerSignUpDispatchProvider, useCustomerSignUpDispatch] =
  builder.context<(newValue: Partial<CustomerSignUpStateType>) => void>(null);

const CustomerSignUpContext = ({ children }: PropsWithChildren) => {
  const [state, setState] = useCustomerSignUpStorage();
  const dispatch = (newValue: Partial<CustomerSignUpStateType>) => setState({ ...state, ...newValue });
  return (
    <CustomerSignUpDispatchProvider value={dispatch}>
      <CustomerSignUpStateProvider value={state}>{children}</CustomerSignUpStateProvider>
    </CustomerSignUpDispatchProvider>
  );
};

export const useCustomerSignUpStorage = () => {
  return useLocalStorage<CustomerSignUpStateType>({
    key: STORAGE_KEY.CUSTOMER_SIGN_UP,
    defaultValue: defaultValue,
  });
};

export { useCustomerSignUpDispatch, useCustomerSignUpState, CustomerSignUpContext };
