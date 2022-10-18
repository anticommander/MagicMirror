/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
let config = {
	address: "0.0.0.0", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: [], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 12,
	units: "imperial",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		// {
		// 	module: "alert",
		// },
		// {
		// 	module: "updatenotification",
		// 	position: "top_bar"
		// },
		{
			module: "clock",
			position: "time-weather_left",
            timezone: "America/Denver",
            config: {
                dateFormat: "dddd, MMM Do"
            }
		},
		// {
		// 	module: "calendar",
		// 	header: "US Holidays",
		// 	position: "top_left",
		// 	config: {
		// 		calendars: [
		// 			{
		// 				symbol: "calendar-check",
		// 				url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"
		// 			}
		// 		],
        //         fade: false
		// 	}
		// },
		{
			module: "weather",
			position: "time-weather_left",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Windsor,Colorado",
				locationID: "5583509", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "aa16692c0960838478475ad849508a5c"
			},
			units: "imperial",
			roundTemp: true
		},
		{
			module: "weather",
			position: "time-weather_right",
			config: {
				weatherProvider: "openweathermap",
				type: "daily",
				location: "Windsor,Colorado",
				locationID: "5583509", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "aa16692c0960838478475ad849508a5c",
                colored: true,
                maxNumberOfDays: 5,
                fade: false
			},
			units: "imperial",
			roundTemp: true
		},
        {
            module: 'MMM-CalendarExt2',
            config: {
                updateInterval: 1000 * 60 * 60 * 5,
                firstDrawingDelay: 0,
                calendars : [
                    {
                        name: "us_holiday",
                        icon: "noto-beach-with-umbrella",
                        className: "holiday",
                        url: "https://calendar.google.com/calendar/ical/en.usa%23holiday%40group.v.calendar.google.com/public/basic.ics",
                        scanInterval: 1000 * 60 * 60 * 24
                        // url: "http://www.calendarlabs.com/templates/ical/US-Holidays.ics",
                    },
                    {
                        name: "main_calendar",
                        url: "https://calendar.google.com/calendar/ical/anti.commander%40gmail.com/private-5f310df6f7336f2466b838de2132b9f7/basic.ics",
                        scanInterval: 1000 * 60 * 5
                    },
                    {
                        name: "birthdays_calendar",
                        icon: "emojione-birthday-cake",
                        url: "https://calendar.google.com/calendar/ical/75d2adaecba4b1ebcf2c334b81e5d2eccff84744e4e78a208bdaa3f8af7cb9cc%40group.calendar.google.com/private-a76f384b9abb681e3cbf9f26ae4c22fd/basic.ics",
                        scanInterval: 1000 * 60 * 60 * 24
                    },
                    {
                        name: "lunch_menu",
                        url: "https://calendar.google.com/calendar/ical/16bcbb28598a93f4f52addf110649eb4a7e700070925403b07570e30f05f1d22%40group.calendar.google.com/private-aa712a889896ededc5e51a9e66df1362/basic.ics",
                        scanInterval: 1000 * 60 * 60 * 24
                    }
                ],
                views: [
                    {
                        name: "lunch_menu_view",
                        mode: "daily",
                        slotCount: 5,
                        timeFormat: 'LT',
                        slotTitleFormat: 'dddd',
                        slotSubTitleFormat: 'M/D',
                        position: 'week-calendar_main',
                        slotMaxHeight: '85px',
                        type: 'column',
                        hideFooter: true,
                        calendars: [
                            "lunch_menu"
                        ]
                    },
                    // {
                    //     name: "week_view",
                    //     mode: "daily",
                    //     slotCount: 3,
                    //     timeFormat: 'LT',
                    //     slotTitleFormat: 'dd',
                    //     slotSubTitleFormat: 'M/D',
                    //     position: 'week-calendar_main',
                    //     slotMaxHeight: '120px',
                    //     type: 'column',
                    //     calendars: [
                    //         "main_calendar",
                    //         "birthdays_calendar",
                    //         "us_holiday"
                    //     ]
                    // },
                    {
                        name: "month_view",
                        mode: "month",
                        position: 'month-calendar_main',
                        timeFormat: 'LT',
                        hideFooter: true,
                        calendars: [
                            "main_calendar",
                            "birthdays_calendar",
                            "us_holiday"
                        ]
                    },
                ],
                scenes: [
                    {
                        name: "main_scene",
                        views: [
                            "month_view",
                            "lunch_menu_view",
                            // "week_view"
                        ]
                    },
                ],
            },
        },
        {
            module: 'MMM-iFrame',
            position: 'blue-iris_main',	// This can be any of the regions.
            config: {
                // See 'Configuration options' for more information.
                url: ["http://192.168.0.75:81/ui3.htm?timeout=0&maximize=1&cam=FD&streamingprofile=4MP"],  // as many URLs you want or you can just ["ENTER IN URL"] if single URL.
                updateInterval: 99999999999999, // rotate URLs every 30 seconds
                width: "1920", // width of iframe
                height: "1140", // height of iframe
                frameWidth: "580" // width of embedded iframe, height is beeing calculated by aspect ratio of iframe
            }
        },
        {
            module: 'MMM-Remote-Control',
            // uncomment the following line to show the URL of the remote control on the mirror
            // position: 'bottom_left',
            // you can hide this module afterwards from the remote control itself
            config: {
                customCommand: {
                    monitorOnCommand: 'xset dpms force on',
                    monitorOffCommand: 'xset dpms force off',
                },  // Optional, See "Using Custom Commands" below
                showModuleApiMenu: true, // Optional, Enable the Module Controls menu
                secureEndpoints: true, // Optional, See API/README.md
                // uncomment any of the lines below if you're gonna use it
                // customMenu: "custom_menu.json", // Optional, See "Custom Menu Items" below
                // apiKey: "", // Optional, See API/README.md for details
                // classes: {} // Optional, See "Custom Classes" below
            }
        },
        {
            module: 'MMM-Buttons',
            config: {
                buttons: [
                    {
                        pin: 16,
                        name: "monitor_control",
                        activeLow: false,
                        longPress: {
                            notification: "REMOTE_ACTION",
                            payload: {action: "MONITOROFF"}
                        },
                        shortPress: {
                            notification: "REMOTE_ACTION",
                            payload: {action: "MONITORON"},
                        }
                    },
                    // {
                    //     pin: 24,
                    //     name: "power",
                    //     longPress: {
                    //         title: "Power off",
                    //         message: "Keep pressed for 3 seconds to shut down",
                    //         imageFA: "power-off",
                    //         notification: "REMOTE_ACTION",
                    //         payload: {action: "SHUTDOWN"}
                    //     },
                    //     shortPress: undefined
                    // }
                ]
            }
        },
        // {
        // module: 'MMM-Reddit-News-Ticker',
        // position: 'bottom_bar',
        //     config: {
        //         client_id: 'yScR7xeM5Krs6PZnr2m14w',
        //         secret: 'gen6z38bS4CViwCBOCO_xcPQoBPK7A'
        //     },
        // },
//		{
//			module: "compliments",
//			position: "lower_third"
//		},
        // {
        //     module: 'MMM-OnThisDay',
        //     position: "bottom_right", // All available positions
        //     config: {
        //         // See below for configurable options, this is optional
        //     }
        // }
        // {
        //     module: 'MMM-NetworkConnection',
        //     position: 'top_right',
        //     config: {
        //     }
        // }
		//{
		//	module: "weather",
		//	position: "top_right",
		//	header: "Weather Forecast",
		//	config: {
		//		weatherProvider: "openweathermap",
		//		type: "forecast",
		//		location: "New York",
		//		locationID: "5128581", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
		//		apiKey: "YOUR_OPENWEATHER_API_KEY"
		//	}
		//},
//		{
//			module: "newsfeed",
//			position: "bottom_bar",
//			config: {
//				feeds: [
//					{
//						title: "New York Times",
//						url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
//					}
//				],
//				showSourceTitle: true,
//				showPublishDate: true,
//				broadcastNewsFeeds: true,
//				broadcastNewsUpdates: true
//			}
//		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
