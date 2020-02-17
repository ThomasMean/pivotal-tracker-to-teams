import express from "express";
import axios from "axios";
import { PivotalActivity } from "../entities/pivotal-activity";

const router = express.Router();

const teamsUrl = process.env.TEAMS_URL;

router.post('/send', async (req, res) => {

    if (teamsUrl) {

        const body: PivotalActivity = req.body;
        const event = body.highlight;
        const message = `${body.performed_by.name} ${body.highlight} ${body.primary_resources[0].kind} ${body.primary_resources[0].name}`;

        if (event === "moved" && body.changes[0].original_values.current_state === "unscheduled" && body.changes[0].new_values.current_state === "unstarted" && body.changes[0].story_type === "story") {
            const json = {
                "@type": "MessageCard",
                "@context": "https://schema.org/extensions",
                "summary": `A Story has been moved to the backlog by ${body.performed_by.name}`,
                "themeColor": "0078D7",
                "title": "Story Moved to the backlog",
                "sections": [
                    {
                        "activityTitle": `${body.primary_resources[0].name} has been moved to the backlog and is ready for development. ${body.message}.`,
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
                        "text": message
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
            axios.post(teamsUrl, json);
        }

        else if (event === "estimated") {
            const json = {
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
                        "text": message
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
            axios.post(teamsUrl, json);
        }
        else {
            // tslint:disable-next-line
            console.log(body);
        }
        res.send("Success");
    }
    else {
        res.send("Failed");
    }
})

export default router;
