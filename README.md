
# GossipGazette

GossipGazette is the perfect place for those who are tired of boring, mundane conversations. Our web app offers a plethora of features that will keep you entertained for hours. You can customize your profile with hilarious emojis, filters, and gifs, and discover new and exciting chat rooms every day.

OPENAI 👈He said this.



## View Live Here

https://gossipgazette.netlify.app/

## Environment Variables

To run this project, you will need to add the following environment variables to your `app.js` file.

```
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
```
You can get all the secret keys from your Firebase App.
## Installation

Setting up the project is easy:

### 1. Clone the repo to your local PC

```bash
https://github.com/boredom1234/gossipgazette.git
```

### 2. Set rules for firebase:
#️⃣ `For RealTime DB`
```bash
{
  "rules": {
    "messages": {
      ".read": true,
      ".write": true
    }
  }
}
```
#️⃣ `For Storage`
```bash
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}
```

    
## Authors

- [@boredom1234](https://www.github.com/boredom1234)



## License

[MIT](https://choosealicense.com/licenses/mit/)

