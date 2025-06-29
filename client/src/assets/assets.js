import logo from "./logo.svg";
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg"
import close_icon from "./close_icon.svg"
import users_icon from "./users_icon.svg"
import car_icon from "./car_icon.svg"
import location_icon from "./location_icon.svg"
import fuel_icon from "./fuel_icon.svg"
import addIcon from "./addIcon.svg"
import carIcon from "./carIcon.svg"
import carIconColored from "./carIconColored.svg"
import dashboardIcon from "./dashboardIcon.svg"
import dashboardIconColored from "./dashboardIconColored.svg"
import addIconColored from "./addIconColored.svg"
import listIcon from "./listIcon.svg"
import listIconColored from "./listIconColored.svg"
import cautionIconColored from "./cautionIconColored.svg"
import arrow_icon from "./arrow_icon.svg"
import star_icon from "./star_icon.svg"
import check_icon from "./check_icon.svg"
import tick_icon from "./tick_icon.svg"
import delete_icon from "./delete_icon.svg"
import eye_icon from "./eye_icon.svg"
import eye_close_icon from "./eye_close_icon.svg"
import filter_icon from "./filter_icon.svg"
import edit_icon from "./edit_icon.svg"
import calendar_icon_colored from "./calendar_icon_colored.svg"
import location_icon_colored from "./location_icon_colored.svg"
import testimonial_image_1 from "./testimonial_image_1.png"
import testimonial_image_2 from "./testimonial_image_2.png"
import user_profile from "./user_profile.png"
import upload_icon from "./upload_icon.svg"
import main_bike from "./main_bike.webp"
import bike_image1 from "./bike_image1.webp"
import bike_image2 from "./bike_image2.webp"
import bike_image3 from "./bike_image3.webp"
import bike_image4 from "./bike_image4.webp"
import banner_bikeimage from "./banner_bikeimage.webp"



export const cityList = ['Butwal', 'Kathmandu', 'Pokhara', 'Tansen']

export const assets = {
    logo,
    gmail_logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    menu_icon,
    search_icon,
    close_icon,
    users_icon,
    edit_icon,
    car_icon,
    location_icon,
    fuel_icon,
    addIcon,
    carIcon,
    carIconColored,
    dashboardIcon,
    dashboardIconColored,
    addIconColored,
    listIcon,
    listIconColored,
    cautionIconColored,
    calendar_icon_colored,
    location_icon_colored,
    arrow_icon,
    star_icon,
    check_icon,
    tick_icon,
    delete_icon,
    eye_icon,
    eye_close_icon,
    filter_icon,
    testimonial_image_1,
    testimonial_image_2,
    banner_bikeimage,
    upload_icon,
    user_profile,
    main_bike,
    bike_image1,
    bike_image2,
    bike_image3,
    bike_image4
}

export const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Bikes", path: "/bikes" },
    { name: "My Bookings", path: "/my-bookings" },
]

export const ownerMenuLinks = [
    { name: "Dashboard", path: "/owner", icon: dashboardIcon, coloredIcon: dashboardIconColored },
    { name: "Add bike", path: "/owner/add-bike", icon: addIcon, coloredIcon: addIconColored },
    { name: "Manage Bikes", path: "/owner/manage-bikes", icon: carIcon, coloredIcon: carIconColored },
    { name: "Manage Bookings", path: "/owner/manage-bookings", icon: listIcon, coloredIcon: listIconColored },
]

export const dummyUserData = {
  "_id": "6847f7cab3d8daecdb517095",
  "name": "GreatStack",
  "email": "admin@example.com",
  "role": "owner",
  "image": user_profile,
}

export const dummyBikeData = [
    {
        "_id": "67ff5bc069c03d4e45f30b77",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Hero",
        "model": "Xpulse 200",
        "image": bike_image1,
        "year": 2021,
        "category": "Dual-Sport",
        "seating_capacity": 2,
        "fuel_type": "40-45km/l",
        "transmission": "200cc",
        "pricePerDay": 1200,
        "location": "Butwal",
        "description": "The Hero XPulse 200 is a dual-sport motorcycle produced by Hero MotoCorp. It was first introduced in 2019 as a successor to the Impulse and is designed for both on-road commuting and light off-road adventures.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T07:26:56.215Z",
    },
    {
        "_id": "67ff6b758f1b3684286a2a65",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Honda",
        "model": "Shine",
        "image": bike_image2,
        "year": 2019,
        "category": "Commuter",
        "seating_capacity": 2,
        "fuel_type": "55-65km/l",
        "transmission": "125cc",
        "pricePerDay": 1000,
        "location": "Kathmandu",
        "description": "The Honda Shine is a commuter motorcycle manufactured by Honda Motorcycle and Scooter India. Launched in 2006, it is known for its reliability, fuel efficiency, and smooth performance in the 125cc segment.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:33:57.993Z",
    },
    {
        "_id": "67ff6b9f8f1b3684286a2a68",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Yamaha ",
        "model": "FZ V2",
        "image": bike_image3,
        "year": 2023,
        "category": "Street",
        "seating_capacity": 2,
        "fuel_type": "45-50km/l",
        "transmission": "150cc",
        "pricePerDay": 1200,
        "location": "butwal",
        "description": "The Yamaha FZ Version 2.0 is a street motorcycle from Yamaha Motor India. It was launched in 2014 as an upgrade to the original FZ, featuring a new fuel-injection system and improved styling focused on performance and efficiency.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:34:39.592Z",
    },
    {
        "_id": "68009c93a3f5fc6338ea7e34",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Royal Enfield",
        "model": "Classic 350",
        "image": bike_image4,
        "year": 2022,
        "category": "Off-road",
        "seating_capacity": 2,
        "fuel_type": "35-40km/l",
        "transmission": "350cc",
        "pricePerDay": 1500,
        "location": "kathmandu",
        "description": "The Royal Enfield Classic 350 is a retro-styled cruiser motorcycle made by Royal Enfield. Originally launched in 2009, the Classic 350 combines vintage design elements with modern engineering, becoming one of the most iconic bikes in India.",
        "isAvaliable": true,
        "createdAt": "2025-04-17T06:15:47.318Z",
    }
];

export const dummyMyBookingsData = [
    {
        "_id": "68482bcc98eb9722b7751f70",
        "car": dummyBikeData[0],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517095",
        "pickupDate": "2025-06-13T00:00:00.000Z",
        "returnDate": "2025-06-14T00:00:00.000Z",
        "status": "confirmed",
        "price": 440,
        "createdAt": "2025-06-10T12:57:48.244Z",
    },
    {
        "_id": "68482bb598eb9722b7751f60",
        "car": dummyBikeData[1],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-12T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "pending",
        "price": 130,
        "createdAt": "2025-06-10T12:57:25.613Z",
    },
    {
        "_id": "684800fa0fb481c5cfd92e56",
        "car": dummyBikeData[2],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "pending",
        "price": 600,
        "createdAt": "2025-06-10T09:55:06.379Z",
    },
    {
        "_id": "6847fe790fb481c5cfd92d94",
        "car": dummyBikeData[3],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517095",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "confirmed",
        "price": 440,
        "createdAt": "2025-06-10T09:44:25.410Z",
    }
]

export const dummyDashboardData = {
    "totalCars": 4,
    "totalBookings": 2,
    "pendingBookings": 0,
    "completedBookings": 2,
    "recentBookings": [
        dummyMyBookingsData[0],
        dummyMyBookingsData[1]
    ],
    "monthlyRevenue": 840
}