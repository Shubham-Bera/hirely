import express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import JobPortalController from "./src/controllers/jobPortal.controller.js";
import UserController from "./src/controllers/user.controller.js";
import { auth } from "./src/middleware/auth.middleware.js";
import session from "express-session";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("src","public")));
app.set("view engine","ejs");
app.set("views",path.resolve("src","views"));
app.use(expressEjsLayouts);
app.use((req, res, next) => {
    res.locals.showSearchBar = false; // default value
    next();
  });
app.use(session({
  secret:'secretKey',
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false},
}));


app.get("/login", UserController.renderLogin);
app.post("/login", UserController.login);
app.get("/logout", UserController.logout);

app.get("/register", UserController.renderRegister);
app.post("/register", UserController.validate(), UserController.register);

app.get("/",JobPortalController.renderHomePage);
app.get("/jobs",JobPortalController.renderJobs);
app.get("/jobs/:id",auth, JobPortalController.renderJobDesc);
app.get("/postJobs",JobPortalController.renderPostJob);
export default app; 