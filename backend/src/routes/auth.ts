import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  res.json({
    ok: true,
    msg: "login",
  });
});

router.post("/register", (req, res) => {
  res.json({
    ok: true,
    msg: "register",
  });
});

router.get("/renew", (req, res) => {
  res.json({
    ok: true,
    msg: "renew",
  });
});

export default router;
