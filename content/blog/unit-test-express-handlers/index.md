---
title: Unit test Express handlers
date: "2020-05-23T15:26:39.882Z"
description: "Epicly."
---
When I wanted to start testing my Express app I had so many questions; do I need an Express app? What should I test? What should I mock? Should I mock the database too? Why did my father leave me when I was 4?

There might not be a "correct" answer to the questions above, but I've found an approach that not only works but is also something that I find easy to wrap my head around.

Our goal is to test individual middleware functions (so called **handlers**) to make sure that they respond with the expected output for any given input.

You can find the full code on [express-unit-test](https://github.com/poeti8/express-unit-test) repo.

### Tooling.

We need a test runner to run our tests. I usually pick [Jest](https://jestjs.io), it's good enough for me and works nice with TypeScript. However, whatever you choose, it shouldn't really fundamentally change how you write your tests, the concept is the same.

After installing Jest, make sure to set its test environment to "node" in a configuration file called `jest.config.js`:

```javascript
/* jest.config.js */
module.exports = {
  testEnvironment: "node",
};
```

### Starting simple.

Here's a dead simple handler that simply responds with `pong` to any request:

```javascript
/* handlers.js */

const ping = (req, res) => res.status(200).send("pong");
```

What does this function need to run independently? The answer is a `req` object and a `res` object. So if we manage to implement our own request and response object we should be able to run the handler and inspect the result **without** an Express server.

```javascript
/* handlers.test.js */

describe("ping", () => {
  it("should respond with pong", async () => {
    // Create empty request and res options
    const req = {};
    const res = {};
    
    // Create variables to save status and body response
    let resStatus;
    let resBody;

    // Implement our own custom status and send methods
    res.status = status => {
      resStatus = status;
      return res;
    };
    res.send = body => {
      resBody = body;
      return res;
    };

    // Execure our handler with our request and response objects
    await handlers.ping(req, res);

    // Test if the reponse is what we expect
    expect(resStatus).toBe(200);
    expect(resBody).toBe("pong");
  });
});
```

The above test works, but it seems a bit hacky. What if we wanted to use another response method or wanted to access something from request? It'd be too much to try to mock everything by ourselves, so maybe there's somebody out there that has already done it for us? Well, yes! 

We can use [jest-express](https://github.com/jameswlane/jest-express), it's a helpful library that replicates the functionality of an Express server using Jest mock functions which would let us to test the behavior of our mocked functions using **built-in** Jest methods.

Another improvement we can go for is to use Jest's `beforeEach()` method to prepare our mocks before starting each test and avoid repeating ourselves by writing them every time.

```javascript
/* handlers.test.js */

describe("ping", () => {
  // Initialize variables here so we can access them everywhere
  let req;
  let res;

  // Create new mock req and res before each test
  beforeEach(() => {
    req = new Request();
    res = new Response();
  });

  it("should respond with ping", async () => {
    await handlers.ping(req, res);
    // Used Jest built-in methods since "status" and "send"
    // are now basically Jest mocked functions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("pong");
  });
});
```

### External call.

Let's step up a bit. We're gonna write an handler that is going to return the value of Bitcoin in USD but in order to get that value we're gonna call a **third-party** service:

```javascript
/* handlers.js */

const axios = require("axios");

const getPrice = async (req, res) => {
  try {
    // Directly calling an external service to get data
    const value = await axios("example.com/api/price").then(r => r.data);
    return res.status(200).send({ value });
  } catch (error) {
    return res.status(500).send({ message: "Couldn't get USD value." });
  }
};
```

Our handler is responsible to **directly** call a third-party service to get data, which is not good. How we get data is implementation details and the handler should be totally ignorant about it. 

We can create a function called `getPrice()` to call the API so now our handler needs to import the function as a dependency in order to use it and we would need to use Jest to mock the dependency. However, in the context of Express we can assign our custom functions to the **request object** so that function can be used across middleware functions.

By creating clients for external services and attaching them to the request object, we **avoid importing dependencies** into our handler and also it makes it a bit easier to mock our external calls.

This is how our handler looks like now:

```javascript
/* helpers.js */

// Our function to call third-party service
const getPriceInUSD = () =>
  axios.get("https://example.com/api/price").then(response => response.data);

// Our custom client to be used as middleware
const cryptoClient = async (req, res, next) => {
  // Attach our client to the req object
  // To be used later as req.crypto.getPriceInUSD
  req.crypto = {
    getPriceInUSD,
  };

  next();
};

/* handlers.js */

const getPrice = async (req, res) => {
  try {
    // Gets data using client methods
    const data = await req.crypto.getPriceInUSD();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ message: "Couldn't get USD value." });
  }
};

/* index.js */

// Use our middleware functions
app.get("/price", helpers.cryptoClient, handlers.getPrice);
```

Ok, great. We've moved the responsibility away from the handler, now it's time to test if everything works fine:

```javascript
/* handlers.test.js */

describe("getPrice", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = new Request();
    res = new Response();
    next = jest.fn();
    helpers.cryptoClient(req, res, next);
  });

  it("should get BTC price in USD", async () => {
    // Our mock data that we expect to receive from third-party call
    const mockData = { price: 7821, currency: "USD" };
    // Mock our external call and tell it to resolve with our mock data
    req.crypto.getPriceInUSD = jest.fn().mockResolvedValueOnce(mockData);
    // Run our handler
    await handlers.getPrice(req, res);
    // Make sure we have called our mocked function and got expected data 
    expect(req.crypto.getPriceInUSD).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockData);
  });

  it("should throw expected error when getging BTC price in USD", async () => {
    const mockData = { price: 7821, currency: "USD" };
    // Mock our external call and tell it to reject
    req.crypto.getPriceInUSD = jest.fn().mockRejectedValueOnce();
    // Run our handler
    await handlers.getPrice(req, res);
    // Expect handler to send an error with expected message
    expect(req.crypto.getPriceInUSD).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Couldn't get USD value.",
    });
  });
});
```

### Database.

We've seen how to test simple handlers and handlers that are dependent on third-party data. Now we're going to take a look on how to deal with databases. In our case we're going to use [mongoose](https://mongoosejs.com) to handle database operations.

Here's a simple user model that we're going to use:

```javascript
/* models.js */

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

exports.User = mongoose.model("user", UserSchema);
```

Now let's take a look at our new handler which its job is to create a new user based on given info.

```javascript
/* handlers.js */

const { User } = require("./models");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(200).send(user.toObject());
  } catch (error) {
    return res.status(500).send({ message: "Couldn't create user." });
  }
};
```

Here we can take the same approach as before and mock the mongoose (or any used ORM/ODM) package, but I personally prefer to use a dedicated **real database** to make sure data goes in and out well and as expected. 

We can create a **separate database** for our tests, or even better, we can use a package called [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) which is an in memory MongoDB server and since it stores the data in memory, it takes care of **clearing** the stored data and having a **fresh database** on each run, which makes it perfect for a test environment.

So let's install and prepare it for our tests:

```javascript
/* handlers.test.js */

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

describe("handlers", () => {
  let mongod;

  beforeAll(async () => {
    // Create an in memory MongoDB server and get its URI
    mongod = new MongoMemoryServer();
    const uri = await mongod.getUri();
    // Use our in memory database in mongoose
		await mongoose.connect(uri, { useNewUrlParser: true });
  });

  afterAll(async () => {
    // Disconnect and reset both mongoose and MongoDB server
    await mongoose.disconnect();
    await mongod.stop();
  });

  describe("createUser()", () => {
    // Writing tests here next...
	});
});
```

Now that things are ready, we can write actual tests for our `createUser()` handler:

```javascript
/* handlers.test.js */

// Code from previous section removed for readability here
describe("handlers", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = new Request();
    res = new Response();
    next = jest.fn();
  });

  describe("createUser()", () => {
    it("should create the user", async () => {
      // Mock request body with sample data
      req.body = {
        email: "john@example.com",
        firstName: "John",
        lastName: "Doe",
      };
      await handlers.createUser(req, res);
      // Get user from database
      const user = await User.findOne({ email: "john@example.com" });
      // Expect returned response body to match user in database
      expect(res.send).toHaveBeenCalledWith(user.toObject());
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should throw expected error", async () => {
      req.body = {
        email: "jane@example.com",
        firstName: "Jane",
        lastName: "Doe",
      };
      // "spy" on User.create() and mock it when it's called
      jest.spyOn(User, "create").mockRejectedValueOnce();
      await handlers.createUser(req, res);
      // Get user to make sure it was not created
      const user = await User.findOne({ email: "jane@example.com" });
      expect(user).toBeNull();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "Couldn't create user.",
      });
    });
  });
});
```

Look ma, I wrote unit tests and they passed !!1!

### Furthermore.

We're almost done here. My goal was to show you how to start simple with tests and add components to them one by one as handlers get more and more complex so you would just get the idea.

And although the concept stays the same, we make our life easier by using tools and helpers in our tests. For example, instead of hardcoding user data, we can use [faker.js](https://github.com/marak/Faker.js) to generate realistic fake data.

So at the end, even if you're like me and don't write tests, at least now you know how to do them and can feel good about yourself.

P.S. My dad left me when I was 4 to get me ice cream and came back 5 minutes later.
