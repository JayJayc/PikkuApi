const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore({
    keyFilename: "./Pikku-8aaa2606ea81.json",
});

export { firestore };
