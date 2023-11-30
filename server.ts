import express, { Response } from "express";
import ViteExpress from "vite-express";
import cookieParser from "cookie-parser";
import { nanoid } from "nanoid";
import { WebSocketServer } from "ws";

const PORT = 3000;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface UserI {
  id: string;
  name: string;
  password: string;
  sessionToken: string;
}

interface MessageI {
  id: number;
  uid: string;
  name: string;
  message: string;
}

const users = new Map<string, UserI>();
const channel = {
  members: new Set<string>(),
  messages: new Array<MessageI>(),
};
console.log(channel);

interface LoginCredentials {
  password: string;
  email: string;
}

interface ProfileInfo extends LoginCredentials {
  name: string;
}

const wss = new WebSocketServer({ noServer: true });
wss.on("connection", (socket, req) => {
  const { email } = parseCookies(req.headers.cookie || "");

  const user = users.get(email)!;

  const { name, id } = user;
  const members = channel.members;
  members?.add(email);
  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({ type: "join", info: `User ${name} Joined`, id, name })
    );
  });

  socket.on("message", (rawData) => {
    const jsonMessage = JSON.parse(rawData.toString());
    const messages = channel.messages;
    const message = {
      id: Date.now(),
      uid: id,
      message: jsonMessage.message as string,
      name,
    };
    messages.push(message);

    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ type: "message", message }));
    });
  });

  socket.on("close", () => {
    members?.delete(email);
    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({ type: "left", info: `User ${name} Left`, id, name })
      );
    });
  });
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is listening on port", PORT);
});
server.on("upgrade", (request, socket, _) => {
  const { token, email } = parseCookies(request.headers.cookie || "");

  if (!email || !token) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }
  const user = users.get(email);
  if (user && user.sessionToken != token) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }

  wss.handleUpgrade(request, socket, _, (socket) => {
    wss.emit("connection", socket, request);
  });
});

app.get("/", function (req, res, next) {
  const { token, email } = req.cookies;
  if (!token || !email) {
    res.redirect("/login");
    return;
  }

  const user = users.get(email);
  if (user && user.sessionToken == token) next();
  else {
    unsetAuthCookies(res);
    res.redirect("/login");
  }
});

app.get("/api/get_members", function (_, res) {
  const members: Record<string, string> = {};
  channel.members.forEach((email) => {
    const { name, id } = users.get(email)!;
    members[id] = name;
  });

  console.log(members);
  res.send(JSON.stringify(members));
});

app.get("/api/get_messages", function (_, res) {
  res.send(JSON.stringify(channel.messages));
});

app.post("/api/signup", function (req, res) {
  console.log(req.body);
  const { name, email, password } = req.body as ProfileInfo;

  if (
    !name ||
    !email ||
    !password ||
    name.trim() == "" ||
    email.trim() == "" ||
    password.trim() == ""
  ) {
    res.send(
      JSON.stringify({ code: 300, message: "Please fill all the values" })
    );
    return;
  }

  if (users.has(email)) {
    res.send(JSON.stringify({ code: 300, message: "Email already exists" }));
    return;
  }

  const sessionToken = nanoid();
  const id = nanoid();

  users.set(email, { id, name, password, sessionToken });

  setAuthCookies(res, id, name, email, sessionToken);

  res.send(
    JSON.stringify({
      code: 200,
      message: "Account created successfully",
      id,
      name,
    })
  );
});

app.post("/api/login", function (req, res) {
  const { email, password } = req.body as LoginCredentials;

  if (!email || !password) {
    res.send({ code: 300, message: "Please fill all the values" });
    return;
  }

  const user = users.get(email);
  if (user && user.password == password) {
    const sessionToken = nanoid();
    const { name, id } = user;
    users.set(email, { ...user, sessionToken });

    setAuthCookies(res, id, user.name, email, sessionToken);

    // Sends the success message
    res.send({
      code: 200,
      message: "Logged in successfully",
      sessionToken,
      name,
      id,
    });
    return;
  }

  res.send({ code: 403, message: "Incorrect Credentials" });
});

function unsetAuthCookies(res: Response) {
  const expires = new Date(Date.now() - 9999999);
  res.cookie("token", "", { expires });
  res.cookie("id", "", { expires });
  res.cookie("email", "", { expires });
  res.cookie("name", "", { expires });
}

function setAuthCookies(
  res: Response,
  id: string,
  name: string,
  email: string,
  sessionToken: string
) {
  const maxAge = 1000 * 60 * 60 * 24;
  res.cookie("token", sessionToken, {
    maxAge,
    httpOnly: true,
  });
  res.cookie("id", id, {
    maxAge,
    httpOnly: false,
  });
  res.cookie("email", email, {
    maxAge,
    httpOnly: true,
  });
  res.cookie("name", name, {
    maxAge,
    httpOnly: false,
  });
}

ViteExpress.bind(app, server);

type Cookie = Record<string, string>;

function parseCookies(cookieString: string) {
  const cookies: Cookie = {};
  cookieString.split(";").forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookies[key.trim()] = value ? decodeURIComponent(value.trim()) : "";
  });
  return cookies;
}
