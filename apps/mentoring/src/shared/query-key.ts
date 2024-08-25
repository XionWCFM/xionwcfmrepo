export const QUERY_KEY = {
  BEVERAGE: {
    ALL: () => ["beverage"],
  },
  ORDER: {
    ALL: () => ["order"],
    ID: (id: string) => ["order", id],
    IS_COMPLETED: (id: string) => ["order", "is-completed", id],
    IS_READY: (id: string) => ["order", "is-ready", id],
  },
  BARISTA: {
    ALL: () => ["barista"],
    PHONE: (phone: string) => ["barista", phone],
  },
  CUSTOMER: {
    ALL: () => ["customer"],
    PHONE: (phone: string) => ["customer", phone],
  },
};
