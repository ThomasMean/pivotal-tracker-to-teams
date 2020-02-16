import express from "express";

import { PivotalActivity } from "../entities/pivotal-activity";

const router = express.Router();

router.post('/send', async (req, res) => {
    const body: PivotalActivity = req.body;

    // tslint:disable-next-line
    console.log(body.highlight);
    res.send(body);
})

export default router;
