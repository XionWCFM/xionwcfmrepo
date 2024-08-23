"use client";
import { wrap } from "@suspensive/react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Button, Paragraph, Stack } from "@xionwcfm/ui";
import { delay } from "@xionwcfm/utils/async";
import { groupBy } from "es-toolkit/array";
import { beveragesQueryOptions } from "~/entities/beverage/api/beverage.query";
import { BeverageType } from "~/entities/beverage/model/beverage.model";
import { fetchUpdateOrder } from "~/entities/order/api/order.api";
import { orderQueryOptions } from "~/entities/order/api/order.query";
import { OrderType } from "~/entities/order/model/order.model";
import { usePollingQuery } from "~/shared/use-polling-query";

export const BaristaPage = wrap.Suspense().on(function BaristaPage() {
  const { data: beverageList } = useSuspenseQuery(beveragesQueryOptions());
  const { mutateAsync: updateOrder } = useMutation({ mutationFn: fetchUpdateOrder });

  const { data: orderList = [] } = usePollingQuery(orderQueryOptions(), {
    interval: 5000,
    pollRetries: Number.POSITIVE_INFINITY,
  });

  const {
    preparing = [],
    orderReception = [],
    making = [],
    completed = [],
    ready = [],
  } = groupBy(orderList, (order) => order.status);

  const handleReceptionOrderClick = async (order: OrderType) => {
    await updateOrder({ ...order, status: "making" });
    await delay(5000);
    await updateOrder({ ...order, status: "ready" });
  };

  return (
    <Stack>
      <Paragraph>주문 중인 오더</Paragraph>
      {preparing.map((order) => (
        <OrderList key={order.id} order={order} beverageList={beverageList} />
      ))}
      <Paragraph>주문 완료된 오더</Paragraph>
      {orderReception.map((order) => (
        <OrderList key={order.id} order={order} beverageList={beverageList} onClick={handleReceptionOrderClick} />
      ))}
      <Paragraph>음료 제조 중인 오더</Paragraph>
      {making.map((order) => (
        <OrderList key={order.id} order={order} beverageList={beverageList} />
      ))}
      <Paragraph>음료 제조가 끝난 오더</Paragraph>
      {ready.map((order) => (
        <OrderList key={order.id} order={order} beverageList={beverageList} />
      ))}
      <Paragraph>완료된 오더</Paragraph>
      {completed.map((order) => (
        <OrderList key={order.id} order={order} beverageList={beverageList} />
      ))}
    </Stack>
  );
});

const OrderList = ({
  order,
  onClick,
  beverageList,
}: { order: OrderType; beverageList: BeverageType[]; onClick?: (order: OrderType) => void }) => {
  return (
    <Button onClick={() => onClick?.(order)}>
      <Stack>
        <Paragraph>주문자명 : {order.customerId}</Paragraph>
        <Paragraph>
          주문음료 :
          {order.beverages.map((beverage) => {
            const findBeverage = beverageList.find(({ id }) => beverage.beverageId === id);
            return (
              <span key={beverage.beverageId}>
                {findBeverage?.name} : {beverage.quantity}개 {(findBeverage?.price ?? 0) * beverage.quantity}원
              </span>
            );
          })}
        </Paragraph>
      </Stack>
    </Button>
  );
};
