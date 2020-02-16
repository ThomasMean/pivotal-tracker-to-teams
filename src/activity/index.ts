import express from "express";

import { PivotalActivity } from "../entities/pivotal-activity";

const router = express.Router();

router.post('/send', async (req, res) => {
    const body: PivotalActivity = req.body;

    const message = `${body.performed_by.name} ${body.highlight} ${body.primary_resources[0].kind} ${body.primary_resources[0].name}`;
    const linkMessage = `This ${body.primary_resources[0].kind} can be found here: ${body.primary_resources[0].url}`;



    // tslint:disable-next-line
    console.log(message);


    // tslint:disable-next-line
    console.log(linkMessage);
    res.send(body);
})

export default router;
