# Express JS with TypeScript Prisma MySQL

1. mkdir project_folder
2. cd project_folder
3. npm init -y

After initialize a package.json file , The newly created file might look something like the following code:

```
{
  "name": "Project Name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js", // Entry Point change it from  js to .ts
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Engr. Mahmud Ibrahim",
  "license": "ISC"
}

```

### dependencies

```
pnpm install express jsonwebtoken bcrypt prisma @prisma/client cors dotenv nodemon
```

### dev dependencies

```
pnpm install  -D typescript ts-node @types/express @types/cors @types/bcrypt @types/jsonwebtoken @types/node
```

### Generating tsconfig.json

```
npx tsc --init
```

### add nodemon.json

```
{
    "watch": ["src"],
    "ext": "js,ts",
    "exec": "npx ts-node ./src/index.ts"
}
```

and the in the package.json add these lines

```
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "npx nodemon"
  },
```

now in the /src folder add index.ts and the following code

```
import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

```

finally run the server

```
pnpm run dev

> ty-express@1.0.0 dev C:\Users\ib\Projects\ty-express
> npx nodemon

[nodemon] 3.1.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src\**\*
[nodemon] watching extensions: js,ts
[nodemon] starting `npx ts-node ./src/index.ts`
Server is Fire at http://localhost:8000

```

Build with love and passion.
