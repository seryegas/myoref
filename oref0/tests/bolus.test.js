'use strict';

var should = require('should');

describe('bolus', function () {
    var bolushistory = [
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T09:01:09 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T09:01:09+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "4901095213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T09:01:09 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T09:01:09+03:00",
            "_body": "00",
            "_head": "3318",
            "rate": 0.6,
            "_date": "4901095213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T08:58:07 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T08:58:07+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "473a085213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T08:58:07 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T08:58:07+03:00",
            "_body": "00",
            "_head": "330c",
            "rate": 0.3,
            "_date": "473a085213"
        },
        {
            "_type": "Bolus",
            "_description": "Bolus 2019-04-18T08:55:14 head[4], body[0] op[0x01]",
            "timestamp": "2019-04-18T08:55:14+03:00",
            "_body": "",
            "programmed": 0.2,
            "_head": "01020200",
            "amount": 0.2,
            "duration": 0,
            "type": "normal",
            "_date": "4e37485213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T08:54:42 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T08:54:42+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "6a36085213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T08:54:42 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T08:54:42+03:00",
            "_body": "00",
            "_head": "3330",
            "rate": 1.2,
            "_date": "6a36085213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T08:47:06 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T08:47:06+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "462f085213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T08:47:06 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T08:47:06+03:00",
            "_body": "00",
            "_head": "331a",
            "rate": 0.65,
            "_date": "462f085213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T08:42:22 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T08:42:22+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "562a085213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T08:42:22 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T08:42:22+03:00",
            "_body": "00",
            "_head": "3314",
            "rate": 0.5,
            "_date": "562a085213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T08:38:15 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T08:38:15+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "4f26085213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T08:38:15 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T08:38:15+03:00",
            "_body": "00",
            "_head": "3310",
            "rate": 0.4,
            "_date": "4f26085213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T08:33:19 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T08:33:19+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "5321085213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T08:33:19 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T08:33:19+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "5321085213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T08:28:54 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T08:28:54+03:00",
            "_body": "",
            "_head": "1602",
            "duration (min)": 60,
            "_date": "761c085213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T08:28:54 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T08:28:54+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "761c085213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T08:22:08 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T08:22:08+03:00",
            "_body": "",
            "_head": "1600",
            "duration (min)": 0,
            "_date": "4816085213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T08:22:08 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T08:22:08+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "4816085213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T08:11:49 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T08:11:49+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "710b085213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T08:11:49 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T08:11:49+03:00",
            "_body": "00",
            "_head": "331c",
            "rate": 0.7,
            "_date": "710b085213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T08:08:57 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T08:08:57+03:00",
            "_body": "",
            "_head": "1604",
            "duration (min)": 120,
            "_date": "7908085213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T08:08:57 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T08:08:57+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "7908085213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T07:56:55 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T07:56:55+03:00",
            "_body": "",
            "_head": "1603",
            "duration (min)": 90,
            "_date": "7738075213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T07:56:55 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T07:56:55+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "7738075213"
        },
        {
            "_type": "Bolus",
            "_description": "Bolus 2019-04-18T07:52:54 head[4], body[0] op[0x01]",
            "timestamp": "2019-04-18T07:52:54+03:00",
            "_body": "",
            "appended": [
                {
                    "_type": "UnabsorbedInsulinBolus",
                    "_description": "UnabsorbedInsulinBolus unknown head[32], body[0] op[0x5c]",
                    "_body": "",
                    "_head": "5c200c4544104f44048b4404a9440cb3440417540435540c3f5408495420d554",
                    "data": [
                        {
                            "amount": 0.3,
                            "age": 69
                        },
                        {
                            "amount": 0.4,
                            "age": 79
                        },
                        {
                            "amount": 0.1,
                            "age": 139
                        },
                        {
                            "amount": 0.1,
                            "age": 169
                        },
                        {
                            "amount": 0.3,
                            "age": 179
                        },
                        {
                            "amount": 0.1,
                            "age": 279
                        },
                        {
                            "amount": 0.1,
                            "age": 309
                        },
                        {
                            "amount": 0.3,
                            "age": 319
                        },
                        {
                            "amount": 0.2,
                            "age": 329
                        },
                        {
                            "amount": 0.8,
                            "age": 469
                        }
                    ],
                    "_date": ""
                }
            ],
            "programmed": 1.2,
            "duration": 0,
            "amount": 1.2,
            "_head": "010c0c00",
            "type": "normal",
            "_date": "7634471213"
        },
        {
            "unknown_byte[8]": 0,
            "_type": "BolusWizard",
            "bg": 0,
            "_byte[5]": 0,
            "unknown_byte[10]": 0,
            "_description": "BolusWizard 2019-04-18T07:52:54 head[2], body[13] op[0x5b]",
            "timestamp": "2019-04-18T07:52:54+03:00",
            "_body": "0c900a374b000c000000000c55",
            "bg_target_high": 85,
            "sensitivity": 55,
            "carb_ratio": 10,
            "food_estimate": 1.2,
            "unabsorbed_insulin_total": 0.0,
            "correction_estimate": 0.0,
            "carb_input": 12,
            "_head": "5b00",
            "unabsorbed_insulin_count": "??",
            "_byte[7]": 0,
            "bolus_estimate": 1.2,
            "_date": "7634071213",
            "bg_target_low": 75
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T07:35:30 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T07:35:30+03:00",
            "_body": "",
            "_head": "1603",
            "duration (min)": 90,
            "_date": "5e23075213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T07:35:30 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T07:35:30+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "5e23075213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T07:26:41 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T07:26:41+03:00",
            "_body": "",
            "_head": "1602",
            "duration (min)": 60,
            "_date": "691a075213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T07:26:41 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T07:26:41+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "691a075213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T07:15:39 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T07:15:39+03:00",
            "_body": "",
            "_head": "1602",
            "duration (min)": 60,
            "_date": "670f075213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T07:15:39 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T07:15:39+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "670f075213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T07:07:57 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T07:07:57+03:00",
            "_body": "",
            "_head": "1602",
            "duration (min)": 60,
            "_date": "7907075213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T07:07:57 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T07:07:57+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "7907075213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T07:03:13 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T07:03:13+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "4d03075213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T07:03:13 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T07:03:13+03:00",
            "_body": "00",
            "_head": "3316",
            "rate": 0.55,
            "_date": "4d03075213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T06:58:15 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T06:58:15+03:00",
            "_body": "",
            "_head": "1603",
            "duration (min)": 90,
            "_date": "4f3a065213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T06:58:15 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T06:58:15+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "4f3a065213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T06:54:41 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T06:54:41+03:00",
            "_body": "",
            "_head": "1602",
            "duration (min)": 60,
            "_date": "6936065213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T06:54:41 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T06:54:41+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "6936065213"
        },
        {
            "_type": "Bolus",
            "_description": "Bolus 2019-04-18T06:52:08 head[4], body[0] op[0x01]",
            "timestamp": "2019-04-18T06:52:08+03:00",
            "_body": "",
            "programmed": 0.3,
            "_head": "01030300",
            "amount": 0.3,
            "duration": 0,
            "type": "normal",
            "_date": "4834465213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T06:51:34 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T06:51:34+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "6233065213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T06:51:34 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T06:51:34+03:00",
            "_body": "00",
            "_head": "3305",
            "rate": 0.125,
            "_date": "6233065213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T06:45:55 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T06:45:55+03:00",
            "_body": "",
            "_head": "1604",
            "duration (min)": 120,
            "_date": "772d065213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T06:45:55 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T06:45:55+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "772d065213"
        },
        {
            "_type": "CalBGForPH",
            "_description": "CalBGForPH 2019-04-18T06:44:11 head[2], body[0] op[0x0a]",
            "timestamp": "2019-04-18T06:44:11+03:00",
            "_body": "",
            "_head": "0a4d",
            "amount": 77,
            "_date": "4b2c461213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T06:40:44 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T06:40:44+03:00",
            "_body": "",
            "_head": "1602",
            "duration (min)": 60,
            "_date": "6c28065213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T06:40:44 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T06:40:44+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "6c28065213"
        },
        {
            "_type": "Bolus",
            "_description": "Bolus 2019-04-18T06:35:43 head[4], body[0] op[0x01]",
            "timestamp": "2019-04-18T06:35:43+03:00",
            "_body": "",
            "programmed": 0.4,
            "_head": "01040400",
            "amount": 0.4,
            "duration": 0,
            "type": "normal",
            "_date": "6b23465213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T06:35:14 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T06:35:14+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "4e23065213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T06:35:14 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T06:35:14+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "4e23065213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T06:15:34 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T06:15:34+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "620f065213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T06:15:34 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T06:15:34+03:00",
            "_body": "00",
            "_head": "3320",
            "rate": 0.8,
            "_date": "620f065213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T06:03:16 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T06:03:16+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "5003065213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T06:03:16 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T06:03:16+03:00",
            "_body": "00",
            "_head": "331c",
            "rate": 0.7,
            "_date": "5003065213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T05:58:54 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T05:58:54+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "763a055213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T05:58:54 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T05:58:54+03:00",
            "_body": "00",
            "_head": "3314",
            "rate": 0.5,
            "_date": "763a055213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T05:53:05 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T05:53:05+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "4535055213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T05:53:05 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T05:53:05+03:00",
            "_body": "00",
            "_head": "331c",
            "rate": 0.7,
            "_date": "4535055213"
        },
        {
            "_type": "Bolus",
            "_description": "Bolus 2019-04-18T05:33:50 head[4], body[0] op[0x01]",
            "timestamp": "2019-04-18T05:33:50+03:00",
            "_body": "",
            "programmed": 0.1,
            "_head": "01010100",
            "amount": 0.1,
            "duration": 0,
            "type": "normal",
            "_date": "7221455213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T05:24:36 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T05:24:36+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "6418055213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T05:24:36 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T05:24:36+03:00",
            "_body": "00",
            "_head": "3322",
            "rate": 0.85,
            "_date": "6418055213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T05:19:39 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T05:19:39+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "6713055213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T05:19:39 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T05:19:39+03:00",
            "_body": "00",
            "_head": "331c",
            "rate": 0.7,
            "_date": "6713055213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T05:14:48 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T05:14:48+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "700e055213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T05:14:48 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T05:14:48+03:00",
            "_body": "00",
            "_head": "3316",
            "rate": 0.55,
            "_date": "700e055213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T05:07:48 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T05:07:48+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "7007055213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T05:07:48 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T05:07:48+03:00",
            "_body": "00",
            "_head": "3312",
            "rate": 0.45,
            "_date": "7007055213"
        },
        {
            "_type": "Bolus",
            "_description": "Bolus 2019-04-18T05:04:46 head[4], body[0] op[0x01]",
            "timestamp": "2019-04-18T05:04:46+03:00",
            "_body": "",
            "programmed": 0.1,
            "_head": "01010100",
            "amount": 0.1,
            "duration": 0,
            "type": "normal",
            "_date": "6e04455213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T05:04:20 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T05:04:20+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "5404055213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T05:04:20 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T05:04:20+03:00",
            "_body": "00",
            "_head": "3324",
            "rate": 0.9,
            "_date": "5404055213"
        },
        {
            "_type": "Bolus",
            "_description": "Bolus 2019-04-18T05:00:46 head[4], body[0] op[0x01]",
            "timestamp": "2019-04-18T05:00:46+03:00",
            "_body": "",
            "programmed": 0.1,
            "_head": "01010100",
            "amount": 0.1,
            "duration": 0,
            "type": "normal",
            "_date": "6e00455213"
        },
        {
            "_type": "Bolus",
            "_description": "Bolus 2019-04-18T04:57:08 head[4], body[0] op[0x01]",
            "timestamp": "2019-04-18T04:57:08+03:00",
            "_body": "",
            "programmed": 0.2,
            "_head": "01020200",
            "amount": 0.2,
            "duration": 0,
            "type": "normal",
            "_date": "4839445213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T04:56:42 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T04:56:42+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "6a38045213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T04:56:42 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T04:56:42+03:00",
            "_body": "00",
            "_head": "3344",
            "rate": 1.7,
            "_date": "6a38045213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T04:47:38 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T04:47:38+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "662f045213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T04:47:38 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T04:47:38+03:00",
            "_body": "00",
            "_head": "3320",
            "rate": 0.8,
            "_date": "662f045213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T04:36:30 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T04:36:30+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "5e24045213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T04:36:30 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T04:36:30+03:00",
            "_body": "00",
            "_head": "331e",
            "rate": 0.75,
            "_date": "5e24045213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T04:29:05 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T04:29:05+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "451d045213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T04:29:05 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T04:29:05+03:00",
            "_body": "00",
            "_head": "3318",
            "rate": 0.6,
            "_date": "451d045213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T04:25:44 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T04:25:44+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "6c19045213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T04:25:44 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T04:25:44+03:00",
            "_body": "00",
            "_head": "3305",
            "rate": 0.125,
            "_date": "6c19045213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T04:22:45 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T04:22:45+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "6d16045213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T04:22:45 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T04:22:45+03:00",
            "_body": "00",
            "_head": "3314",
            "rate": 0.5,
            "_date": "6d16045213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T04:19:46 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T04:19:46+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "6e13045213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T04:19:46 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T04:19:46+03:00",
            "_body": "00",
            "_head": "3303",
            "rate": 0.075,
            "_date": "6e13045213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T04:07:00 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T04:07:00+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "4007045213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T04:07:00 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T04:07:00+03:00",
            "_body": "00",
            "_head": "3304",
            "rate": 0.1,
            "_date": "4007045213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T04:04:03 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T04:04:03+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "4304045213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T04:04:03 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T04:04:03+03:00",
            "_body": "00",
            "_head": "3307",
            "rate": 0.175,
            "_date": "4304045213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T03:58:54 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T03:58:54+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "763a035213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T03:58:54 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T03:58:54+03:00",
            "_body": "00",
            "_head": "3302",
            "rate": 0.05,
            "_date": "763a035213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T03:53:55 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T03:53:55+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "7735035213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T03:53:55 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T03:53:55+03:00",
            "_body": "00",
            "_head": "330c",
            "rate": 0.3,
            "_date": "7735035213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T03:32:38 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T03:32:38+03:00",
            "_body": "",
            "_head": "1603",
            "duration (min)": 90,
            "_date": "6620035213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T03:32:38 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T03:32:38+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "6620035213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T03:28:08 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T03:28:08+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "481c035213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T03:28:08 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T03:28:08+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "481c035213"
        },
        {
            "_type": "Bolus",
            "_description": "Bolus 2019-04-18T03:19:21 head[4], body[0] op[0x01]",
            "timestamp": "2019-04-18T03:19:21+03:00",
            "_body": "",
            "programmed": 0.1,
            "_head": "01010100",
            "amount": 0.1,
            "duration": 0,
            "type": "normal",
            "_date": "5513435213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T03:18:52 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T03:18:52+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "7412035213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T03:18:52 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T03:18:52+03:00",
            "_body": "00",
            "_head": "3322",
            "rate": 0.85,
            "_date": "7412035213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T03:16:38 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T03:16:38+03:00",
            "_body": "",
            "_head": "1600",
            "duration (min)": 0,
            "_date": "6610035213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T03:16:38 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T03:16:38+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "6610035213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T03:14:05 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T03:14:05+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "450e035213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T03:14:05 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T03:14:05+03:00",
            "_body": "00",
            "_head": "331a",
            "rate": 0.65,
            "_date": "450e035213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T03:10:26 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T03:10:26+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "5a0a035213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T03:10:26 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T03:10:26+03:00",
            "_body": "00",
            "_head": "3312",
            "rate": 0.45,
            "_date": "5a0a035213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T03:05:13 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T03:05:13+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "4d05035213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T03:05:13 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T03:05:13+03:00",
            "_body": "00",
            "_head": "331a",
            "rate": 0.65,
            "_date": "4d05035213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T02:58:22 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T02:58:22+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "563a025213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T02:58:22 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T02:58:22+03:00",
            "_body": "00",
            "_head": "3314",
            "rate": 0.5,
            "_date": "563a025213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T02:53:25 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T02:53:25+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "5935025213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T02:53:25 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T02:53:25+03:00",
            "_body": "00",
            "_head": "331c",
            "rate": 0.7,
            "_date": "5935025213"
        },
        {
            "_type": "Bolus",
            "_description": "Bolus 2019-04-18T02:49:08 head[4], body[0] op[0x01]",
            "timestamp": "2019-04-18T02:49:08+03:00",
            "_body": "",
            "programmed": 0.1,
            "_head": "01010100",
            "amount": 0.1,
            "duration": 0,
            "type": "normal",
            "_date": "4831425213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T02:48:41 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T02:48:41+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "6930025213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T02:48:41 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T02:48:41+03:00",
            "_body": "00",
            "_head": "3307",
            "rate": 0.175,
            "_date": "6930025213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T02:45:41 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T02:45:41+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "692d025213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T02:45:41 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T02:45:41+03:00",
            "_body": "00",
            "_head": "3305",
            "rate": 0.125,
            "_date": "692d025213"
        },
        {
            "_type": "Bolus",
            "_description": "Bolus 2019-04-18T02:42:51 head[4], body[0] op[0x01]",
            "timestamp": "2019-04-18T02:42:51+03:00",
            "_body": "",
            "programmed": 0.1,
            "_head": "01010100",
            "amount": 0.1,
            "duration": 0,
            "type": "normal",
            "_date": "732a425213"
        },
        {
            "_type": "Bolus",
            "_description": "Bolus 2019-04-18T02:38:30 head[4], body[0] op[0x01]",
            "timestamp": "2019-04-18T02:38:30+03:00",
            "_body": "",
            "programmed": 0.2,
            "_head": "01020200",
            "amount": 0.2,
            "duration": 0,
            "type": "normal",
            "_date": "5e26425213"
        },
        {
            "_type": "Bolus",
            "_description": "Bolus 2019-04-18T02:32:24 head[4], body[0] op[0x01]",
            "timestamp": "2019-04-18T02:32:24+03:00",
            "_body": "",
            "programmed": 0.2,
            "_head": "01020200",
            "amount": 0.2,
            "duration": 0,
            "type": "normal",
            "_date": "5820425213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T02:31:54 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T02:31:54+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "761f025213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T02:31:54 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T02:31:54+03:00",
            "_body": "00",
            "_head": "334c",
            "rate": 1.9,
            "_date": "761f025213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T02:28:43 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T02:28:43+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "6b1c025213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T02:28:43 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T02:28:43+03:00",
            "_body": "00",
            "_head": "332c",
            "rate": 1.1,
            "_date": "6b1c025213"
        },
        {
            "_type": "CalBGForPH",
            "_description": "CalBGForPH 2019-04-18T02:18:45 head[2], body[0] op[0x0a]",
            "timestamp": "2019-04-18T02:18:45+03:00",
            "_body": "",
            "_head": "0a7c",
            "amount": 124,
            "_date": "6d12421213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T02:01:38 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T02:01:38+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "6601025213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T02:01:38 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T02:01:38+03:00",
            "_body": "00",
            "_head": "3330",
            "rate": 1.2,
            "_date": "6601025213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T01:35:22 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T01:35:22+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "5623015213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T01:35:22 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T01:35:22+03:00",
            "_body": "00",
            "_head": "332e",
            "rate": 1.15,
            "_date": "5623015213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T01:32:48 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T01:32:48+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "7020015213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T01:32:48 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T01:32:48+03:00",
            "_body": "00",
            "_head": "3320",
            "rate": 0.8,
            "_date": "7020015213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T01:25:40 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T01:25:40+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "6819015213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T01:25:40 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T01:25:40+03:00",
            "_body": "00",
            "_head": "3318",
            "rate": 0.6,
            "_date": "6819015213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T01:22:52 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T01:22:52+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "7416015213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T01:22:52 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T01:22:52+03:00",
            "_body": "00",
            "_head": "3312",
            "rate": 0.45,
            "_date": "7416015213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T01:06:32 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T01:06:32+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "6006015213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T01:06:32 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T01:06:32+03:00",
            "_body": "00",
            "_head": "330e",
            "rate": 0.35,
            "_date": "6006015213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T00:54:03 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T00:54:03+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "4336005213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T00:54:03 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T00:54:03+03:00",
            "_body": "00",
            "_head": "3310",
            "rate": 0.4,
            "_date": "4336005213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T00:49:53 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T00:49:53+03:00",
            "_body": "",
            "_head": "1603",
            "duration (min)": 90,
            "_date": "7531005213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T00:49:53 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T00:49:53+03:00",
            "_body": "00",
            "_head": "3300",
            "rate": 0.0,
            "_date": "7531005213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T00:32:57 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T00:32:57+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "7920005213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T00:32:57 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T00:32:57+03:00",
            "_body": "00",
            "_head": "3310",
            "rate": 0.4,
            "_date": "7920005213"
        },
        {
            "_type": "CalBGForPH",
            "_description": "CalBGForPH 2019-04-18T00:31:23 head[2], body[0] op[0x0a]",
            "timestamp": "2019-04-18T00:31:23+03:00",
            "_body": "",
            "_head": "0a6c",
            "amount": 108,
            "_date": "571f401213"
        },
        {
            "_type": "TempBasalDuration",
            "_description": "TempBasalDuration 2019-04-18T00:29:25 head[2], body[0] op[0x16]",
            "timestamp": "2019-04-18T00:29:25+03:00",
            "_body": "",
            "_head": "1601",
            "duration (min)": 30,
            "_date": "591d005213"
        },
        {
            "_type": "TempBasal",
            "temp": "absolute",
            "_description": "TempBasal 2019-04-18T00:29:25 head[2], body[1] op[0x33]",
            "timestamp": "2019-04-18T00:29:25+03:00",
            "_body": "00",
            "_head": "331a",
            "rate": 0.65,
            "_date": "591d005213"
        },
        {
            "_type": "AlarmSensor",
            "_description": "AlarmSensor 2019-04-18T00:25:00 head[3], body[0] op[0x0b]",
            "alarm_type": 104,
            "alarm_description": "Meter BG Now",
            "_body": "",
            "_head": "0b6800",
            "timestamp": "2019-04-18T00:25:00+03:00",
            "_date": "401940b213"
        },
        {
            "_type": "NewTimeSet",
            "_description": "NewTimeSet 2019-04-18T00:22:56 head[2], body[0] op[0x18]",
            "timestamp": "2019-04-18T00:22:56+03:00",
            "_body": "",
            "_head": "1800",
            "_date": "7816005213"
        },
        {
            "_type": "ChangeTime",
            "_description": "ChangeTime 2019-04-18T00:22:55 head[2], body[0] op[0x17]",
            "timestamp": "2019-04-18T00:22:55+03:00",
            "_body": "",
            "_head": "1700",
            "_date": "7716005213"
        }
    ]
    it('should not skip closely-timed boluses', function () {
        var reduce_boluses = require('../lib/bolus');
        var vals = reduce_boluses(bolushistory);
        console.log(bolushistory.length, vals.length);
        vals.length.should.equal(1);
        vals[0].insulin.should.equal('3.2');
    })
});