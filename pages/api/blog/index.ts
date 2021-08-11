import axios from "axios";
import * as http from "http";

interface Response extends http.ServerResponse {
  json: (arg0: any) => void;
}

export default async function handler(
  req: http.IncomingMessage,
  res: Response
) {
  const resp = await axios(`http://localhost:8080/users/blog`);
  res.json(resp.data);
}
