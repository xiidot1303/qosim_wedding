// Wraps a route handler so failures reach the client as JSON instead of an empty 500.
export const withErrors =
  (handler) =>
  async (...args) => {
    try {
      return await handler(...args);
    } catch (e) {
      console.error(e);
      return Response.json({ error: e.message || 'Server xatosi' }, { status: 500 });
    }
  };
