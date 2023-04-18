import firebase from "firebase/app";
import 'firebase/database'

const env = process.env
const cohort = env.VUE_APP_COHORT

const firebaseConfig = {
    apiKey: env.VUE_APP_API_KEY,
    authDomain: env.VUE_APP_AUTH_DOMAIN,
    databaseURL: env.VUE_APP_DB_URL,
    projectId: env.VUE_APP_PROJECT_ID,
    storageBucket: env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: env.VUE_APP_MESSAGING_SENDER_ID,
    appId: env.VUE_APP_APP_ID,
    measurementId: env.VUE_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig)

export const getExpression = async( { sample, gene }) => {
    const path = `DagBagST/expression/${sample}/${gene}`
    const ref = firebase.database().ref(path)
    return await ref.once('value')
          .then((snapshot) => {
              return [gene, snapshot.val()]
          })
}


export const getSampleMeta = async(sample) => {
    const path = `DagBagST/meta/${sample}`
    const ref = firebase.database().ref(path)
    return await ref.once('value')
          .then((snapshot) => {
              return snapshot.val()
          })
}
