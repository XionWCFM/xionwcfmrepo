import { Pubsub } from "@xionwcfm/pubsub";
export const createLogger = <EventName extends string, EventProperty extends DynamicObject = DynamicObject>(
  option?: CreateLoggerParams,
) => {
  const eventType = option?.pubsubEventName ?? ("xionwcfm_logger_logging_event_publish" as const);
  type EventType = typeof eventType;
  type EventParam = { eventName: EventName; eventProperty: EventProperty };
  const pubsub = option?.pubsub ?? new Pubsub<EventType>();

  const subscribe = (handler: (event: EventParam) => void) => {
    return pubsub.subscribe(eventType, handler);
  };

  const unsubscribe = (handler: (event: EventParam) => void) => {
    return pubsub.unsubscribe(eventType, handler);
  };
  const track = async (eventName: EventName, property?: EventProperty) => {
    const event: EventParam = { eventName, eventProperty: (property ?? {}) as EventProperty };
    return pubsub.publish<EventParam>(eventType, event);
  };

  return { track, unsubscribe, subscribe };
};

//external Type
export type LoggerReturnStructure = {
  subscribe: (...args: any[]) => void;
  unsubscribe: (...args: any[]) => void;
  track: (...args: any[]) => Promise<void>;
};
export type GetCallbackHandlerParam<T extends (...args: any[]) => any> = Parameters<T>[0] extends (
  ...args: any[]
) => any
  ? (callback: Parameters<Parameters<T>["0"]>["0"]) => void
  : never;

// internal Type
type CreateLoggerParams = {
  pubsub?: Pubsub;
  pubsubEventName?: string;
};

type DynamicObject = Record<string, unknown>;
