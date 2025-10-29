export default {
  async fetch(request: Request) {
    return new Response(JSON.stringify({ message: "AI Runner API online ✅" }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
