"use client";
import { useLocalStorage } from "@xionwcfm/hooks";
import { CustomerType } from "~/entities/customer/model/customer.model";
import { STORAGE_KEY } from "~/shared/storage-key";

export type CustomerSignUpStateType = Omit<CustomerType, "id"> & { id: null | string };

const defaultValue = {
  name: "",
  phone: "",
  id: null,
};

export const useCustomerSignUpStorage = () => {
  return useLocalStorage<CustomerSignUpStateType>({
    key: STORAGE_KEY.CUSTOMER_SIGN_UP,
    defaultValue: defaultValue,
  });
};
