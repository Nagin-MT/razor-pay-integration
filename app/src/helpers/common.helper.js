import pusherJs from "pusher-js";

export const PUSHER = new pusherJs(process.env.REACT_APP_PUSHER_API_KEY, {
  cluster: "ap2",
});
