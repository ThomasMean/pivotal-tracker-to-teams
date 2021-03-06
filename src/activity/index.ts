import express from "express";
import axios from "axios";
import { PivotalActivity } from "../entities/pivotal-activity";

const router = express.Router();

const teamsUrl = process.env.TEAMS_URL;

router.post('/send', async (req, res) => {

    if (teamsUrl) {

        const body: PivotalActivity = req.body;
        const event = body.highlight;

        if (event === "moved and scheduled") {
            const json = movedAndScheduledJson(body);
            axios.post(teamsUrl, json);
        }

        else if (event === "estimated") {
            const json = estimatedJson(body);
            axios.post(teamsUrl, json);
        }
        res.send("Success");
    }
    else {
        res.send("Failed");
    }
})

const movedAndScheduledJson = (body: PivotalActivity) => {
    return {
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "summary": `A Story has been moved to the backlog by ${body.performed_by.name}`,
        "themeColor": "0078D7",
        "title": "Story moved to the backlog",
        "sections": [
            {
                "activityTitle": `${body.primary_resources[0].name} has been moved to the backlog and is ready for development.`,
                "facts": [
                    {
                        "name": "Story Name:",
                        "value": body.primary_resources[0].name
                    },
                    {
                        "name": "Story ID:",
                        "value": body.primary_resources[0].id
                    }
                ],
                "text": "This is now ready for development!"
            }
        ],
        "potentialAction": [
            {
                "@type": "OpenUri",
                "name": "View Story",
                "targets": [
                    {
                        "os": "default",
                        "uri": body.primary_resources[0].url
                    }
                ]
            }
        ]
    };
};

const estimatedJson = (body: PivotalActivity) => {
    return {
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "summary": `A Story has been Estimated by ${body.performed_by.name}`,
        "themeColor": "0078D7",
        "title": "Story Estimated",
        "sections": [
            {
                "activityTitle": `${body.primary_resources[0].name} has been estimated. ${body.message}.`,
                "facts": [
                    {
                        "name": "Story Name:",
                        "value": body.primary_resources[0].name
                    },
                    {
                        "name": "Story ID:",
                        "value": body.primary_resources[0].id
                    }
                ],
                "text": `${body.performed_by.name} ${body.highlight} ${body.primary_resources[0].kind} ${body.primary_resources[0].name}`
            }
        ],
        "potentialAction": [
            {
                "@type": "OpenUri",
                "name": "View Story",
                "targets": [
                    {
                        "os": "default",
                        "uri": body.primary_resources[0].url
                    }
                ]
            }
        ]
    };
};

export default router;
