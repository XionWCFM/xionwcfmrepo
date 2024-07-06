export class InternalError extends Error {
  at: string | undefined;
  cause?: Error;

  constructor(message: string, at: string, cause?: Error) {
    super(message);
    this.at = at;
    this.cause = cause;
    this.name = "INTERNAL_ERROR";
  }
  static createErrorMessage(message: string, errorName: string, at: string) {
    const errorType = errorName.toUpperCase();
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}_${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
    return `[ ${errorType} ] - MESSAGE: ${message} AT: ${at} TIME: ${time}`;
  }
}

export class AssertError extends InternalError {
  constructor(message: string, at: string, cause?: Error) {
    const ERROR_NAME = "ASSERT_ERROR";
    const ERROR_MESSAGE = InternalError.createErrorMessage(message, ERROR_NAME, at);
    super(ERROR_MESSAGE, at, cause);
    this.name = ERROR_NAME;
  }
}

export class RepositoryError extends InternalError {
  constructor(message: string, at: string, cause?: Error) {
    const ERROR_NAME = "REPOSITORY_ERROR";
    const ERROR_MESSAGE = InternalError.createErrorMessage(message, ERROR_NAME, at);
    super(ERROR_MESSAGE, at, cause);
    this.name = ERROR_NAME;
  }
}

export class NetworkError extends InternalError {
  constructor(message: string, at: string, cause?: Error) {
    const ERROR_NAME = "NETWORK_ERROR";
    const ERROR_MESSAGE = InternalError.createErrorMessage(message, ERROR_NAME, at);
    super(ERROR_MESSAGE, at, cause);
    this.name = ERROR_NAME;
  }
}

export class InvalidDateError extends InternalError {
  constructor(message: string, at: string, cause?: Error) {
    const ERROR_NAME = "INVALID_DATE_ERROR";
    const ERROR_MESSAGE = InternalError.createErrorMessage(message, ERROR_NAME, at);
    super(ERROR_MESSAGE, at, cause);
    this.name = ERROR_NAME;
  }
}

export class ReactContextError extends InternalError {
  constructor(message: string, at: string, cause?: Error) {
    const ERROR_NAME = "REACT_CONTEXT_ERROR";
    const ERROR_MESSAGE = InternalError.createErrorMessage(message, ERROR_NAME, at);
    super(ERROR_MESSAGE, at, cause);
    this.name = ERROR_NAME;
  }
}

export type InternalErrorConstructor = new (message: string, at: string, cause?: Error) => InternalError;

type DefaultFunctionType = (...arg: any[]) => any;

const rethrowError = <T extends DefaultFunctionType>(
  func: T,
  message: string,
  at: string,
  InjectError: InternalErrorConstructor,
) => {
  return (...arg: Parameters<T>) => {
    try {
      return func(...arg) as ReturnType<T>;
    } catch (e) {
      if (isError(e)) {
        throw new InjectError(message, at, e);
      }
      throw new InjectError(message, at);
    }
  };
};

export const rethrowWith = {
  reactContextError: <T extends DefaultFunctionType>(func: T, message: string, at: string) => {
    return rethrowError(func, message, at, ReactContextError);
  },
  assertError: <T extends DefaultFunctionType>(func: T, message: string, at: string) => {
    return rethrowError(func, message, at, AssertError);
  },
  repoistoryError: <T extends DefaultFunctionType>(func: T, message: string, at: string) => {
    return rethrowError(func, message, at, RepositoryError);
  },
  networkError: <T extends DefaultFunctionType>(func: T, message: string, at: string) => {
    return rethrowError(func, message, at, NetworkError);
  },
  invalidDateError: <T extends DefaultFunctionType>(func: T, message: string, at: string) => {
    return rethrowError(func, message, at, InvalidDateError);
  },
};

export const isError = (e: unknown): e is Error => {
  return e instanceof Error;
};

export const isInternalError = (e: unknown): e is InternalError => {
  return e instanceof InternalError;
};
