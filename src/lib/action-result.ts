export type ActionResult<T = null> =
  | { success: true; data: T }
  | { success: false; errorMessage: string };
