document.addEventListener("DOMContentLoaded", () => {
    // Vérifier que Firebase est bien chargé
    if (!firebase.apps.length) {
        console.error("Firebase n'a pas été initialisé !");
        return;
    }

    // Authentification Firebase
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("Utilisateur connecté:", user);
            document.getElementById("guest-content").style.display = "none";
            document.getElementById("user-content").style.display = "block";

            // Firestore
            let db = firebase.firestore();
            db.collection("users").doc(user.uid).get()
                .then(doc => {
                    if (doc.exists) {
                        let userData = doc.data();
                        console.log("Données récupérées :", userData);
                        document.getElementById("user-name").innerText = userData.name || "Utilisateur";
                    } else {
                        console.log("Aucune donnée trouvée.");
                    }
                })
                .catch(error => console.error("Erreur Firestore :", error));
        } else {
            console.log("Aucun utilisateur connecté.");
            document.getElementById("guest-content").style.display = "block";
            document.getElementById("user-content").style.display = "none";
        }
    });
});