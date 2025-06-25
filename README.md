# Zeraora - URL Shortening Service

Zeraora is a fast, secure, and easy-to-use URL shortening service. With Zeraora, users can shorten long URLs to make them easier to share, track, and manage. Whether you're using it for social media, marketing campaigns, or just sharing links with friends, Zeraora simplifies the process.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [API Documentation](#api-documentation)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Shorten Links**: Convert long URLs into short, shareable links.
- **Analytics**: Track the number of clicks on each shortened link.
- **Custom Aliases**: Create personalized, custom short URLs.
- **Secure**: High-level encryption and HTTPS protection for all links.
- **No Registration Required**: Instantly shorten URLs without needing to sign up or log in.
- **Easy Sharing**: Share your shortened links with a simple click.
- **Link Expiry**: Set expiry dates for temporary links.

## Getting Started

To get started with Zeraora, simply follow these steps:

1. **Visit the Website**: Go to [Zeraora](https://zeraora-navy.vercel.app) to start shortening URLs.
2. **Shorten a URL**: Paste a long URL into the text field and click "Shorten".
3. **Track and Share**: After shortening, you'll get a unique short link that you can share or track.

## How It Works

Zeraora takes a long URL and generates a unique shortened version by encoding the original URL into a shorter string. This URL is then stored in our database and associated with a redirect service.

When someone visits the shortened URL, they will be redirected to the original link. Along the way, Zeraora tracks the number of visits, time, and geographical location of the visitors to give the user analytics on the link’s performance.

### Example:

1. Original URL: `https://www.example.com/some-long-url-that-is-very-difficult-to-share`
2. Shortened URL: `https://zeraora.com/abcd123`

## API Documentation

Zeraora provides a simple API to interact with the service programmatically. You can use this API to shorten URLs, retrieve analytics, and more.

### Base URL : https://api.zeraora.com

### Endpoints

1. **Shorten a URL**
   - `POST /shorten`
   - **Parameters**: 
     - `url`: The long URL you want to shorten.
     - `custom_alias`: (Optional) A custom alias for the shortened URL.
   
   - **Response**:
     ```json
     {
       "shortened_url": "https://zeraora.com/abcd123",
       "original_url": "https://www.example.com/some-long-url"
     }
     ```

2. **Get Link Analytics**
   - `GET /analytics/{shortened_url}`
   - **Response**:
     ```json
     {
       "clicks": 1200,
       "unique_visitors": 800,
       "countries": {
         "US": 500,
         "IN": 300,
         "BR": 150
       },
       "referrers": {
         "facebook.com": 500,
         "twitter.com": 300
       }
     }
     ```

## Technologies Used

Zeraora is built using modern technologies to ensure it’s fast, secure, and scalable:

- **Frontend**: Next Js, TailwindCSS, CSS3
- **Backend**: Node.js
- **Database**: MongoDB (for storing shortened URLs and analytics data)
- **Authentication**: JWT for token-based authentication
- **Link Redirection**: Fast and efficient URL redirect logic to minimize latency
- **Deployment**: Hosted on AWS for scalability and high availability

## Contributing

We welcome contributions to Zeraora! If you’d like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Write tests to ensure your code works.
5. Open a pull request with a detailed description of the changes.

We’re happy to review and merge your contributions!

## License

Zeraora is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions or suggestions, feel free to reach out:

- Email: support@zeraora.com
- Twitter: [@zeraora](https://twitter.com/zeraora)
- Website: [zeraora-navy.vercel.app](https://zeraora-navy.vercel.app)
