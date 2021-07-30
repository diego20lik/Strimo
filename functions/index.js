const functions = require('firebase-functions');
const admin = require("firebase-admin");
const { auth } = require('firebase-admin');
const nodemailer = require("nodemailer")
const express = require('express');
const algoliasearch = require("algoliasearch")
const app = express();
const ejs = require("ejs")
const ALGOLIA_APP_ID = "ZCGTYSNYAK"
const ALGOLIA_ADMIN_KEY = "302042a2264ac8ed199486be2ff5bb3c"
const ALGOLIA_INDEX_NAME ="Videos"
app.use( express.static( "public" ) );
admin.initializeApp()
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'emailparatestsdiego@gmail.com',
        pass: '#1Qazxsw2'
    }
})
var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY)
var index = client.initIndex(ALGOLIA_INDEX_NAME)
exports.createVideo = functions.firestore.document("Videos/{videoId}").onCreate((snap, context)=>{
    const data = snap.data()
    const objectID = snap.id
    console.log("Creando Video");
    return index.saveObject({
        objectID, 
        ...data
    })
})
exports.addToAlgolia = functions.https.onRequest((req, res)=>{
    var arr = []
    admin.firestore().collection("Videos").get().then(snap=>{
        snap.forEach(doc=>{
            let video = doc.data()
            video.objectID= doc.id
            arr.push(video)
        })
        index.saveObjects(arr, (err, content)=>{
            res.status(200).send(content)
        })
    })
})

exports.newUserSignUp = functions.auth.user().onCreate(async user=>{
    var link =""
    await auth().generateEmailVerificationLink(user.email).then(data=>{
        link=data
    })
    /*await ejs.renderFile(__dirname+"/email-views/header.ejs", {data:link},async (err, data)=>{      
        if (err) return console.log(err.message);
        await transport.sendMail({
            from: `emailparatestdiego@gmail.com`,
            to: user.email,
            subject: 'Verificacion de correo',
            html:data,
        }).catch(err=>console.log(err.message)) 
    })*/
    console.log("New user created: ", user.email)
    return admin.firestore().collection("Usuarios").where("user", "==", user.email).get().then(snap=>{
        if(snap.empty){
            admin.firestore().collection("Usuarios").add({
                user: user.email,
                role:"usuario"
            }).then(()=>{
                return
            })
        }
        snap.docs.map(doc=>{
            doc.ref.update({
                role:"usuario"
            })
        })
    })
})
exports.nuevoPago = functions.firestore
    .document('Pagos/{pagoId}')
    .onCreate(async (snap, context) => {
        const ticketValue = snap.data();
        const conciertoValue = await admin.firestore().collection("Videos").doc(snap.data().video).get().then(doc=>{
            return doc.data()
        })
        const user = await admin.auth().getUser(snap.data().usuario[0]).then(doc=>{
            return doc.email
        })
        await admin.firestore().collection("Chat").where("video", "==", snap.data().video).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                doc.ref.update({
                    integrantes: admin.firestore.FieldValue.arrayUnion(
                     user
                    )
                })
            })
        })
        /*await ejs.renderFile(__dirname+"/email-views/ticket.ejs", {dataC:conciertoValue, dataP:ticketValue, id:context.eventId},async (err, data)=>{      
            if (err) return console.log(err.message);    
            await transport.sendMail({
                from: `emailparatestdiego@gmail.com`,
                to: user,
                subject: 'Compra de Ticket Procesada',
                html:data,
            })
        })*/

      // perform desired operations ...
    });
    exports.userDelete = functions.auth.user().onDelete(async user=>{
        admin.firestore().collection("Usuarios").where("user", "==", user.email).get().then(doc=>{
            doc.docs.map(snap=>{
                admin.firestore().collection("Usuarios").doc(snap.id).delete(data=>{
                    console.log("user deleted");
                })
            })
        })
    })

    exports.verificarNickname = functions.https.onCall(async (data, context) => {
        return await admin.firestore().collection("Usuarios").where("nickname", "==", data).get().then(snap=>{
            if(snap.empty){
                return "valid"
            }
            return "invalid"
        })
    });

    exports.borrarVideo = functions.firestore.document("Videos/{videoId}").onDelete(async (snap, context)=>{
        const objectID = snap.id
        await admin.firestore().collection("Chat").where("video", "==", snap.id).get().then(doc=>{
            doc.docs.map(chat=>{
                chat.ref.delete().catch(err=>{
                    console.log(err.message);
                })
            })
        }).then(()=>{
            console.log("Video Borrado")
            return index.deleteObject(objectID)
        }).catch(err=>{
            console.log(err.message);
        })

    })