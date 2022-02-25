export enum Failures {
  Unspecified,
}

export interface Failure {
  failureType: Failures;
  message: string;
}

export type Result<T> = T | Failure;

export function isFailure(result: Result<any>): result is Failure {
  return !!result.failureType;
}

export function createFailure(failure: Failures, message: string): Failure {
  return {failureType: failure, message};
}
