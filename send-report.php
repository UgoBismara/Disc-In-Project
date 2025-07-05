<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Anti-spam : champ caché (si tu veux)
    if (!empty($_POST['website'])) {
        echo "Spam detected.";
        exit;
    }

    // Récupération des champs
    $name = htmlspecialchars(trim($_POST['name']));
    $anonymous = isset($_POST['anonymous']) ? true : false;
    $contact = htmlspecialchars(trim($_POST['contact']));
    $description = htmlspecialchars(trim($_POST['description']));
    $followup = htmlspecialchars(trim($_POST['followup']));

    // Vérifications minimales
    if (empty($description) || empty($followup)) {
        echo "Missing required fields.";
        exit;
    }

    $senderName = $anonymous ? "Anonymous" : $name;
    $contactInfo = empty($contact) ? "Not provided" : $contact;

    // Préparer l'e-mail
    $to = "gavilleto@gmail.com"; // 🔁 Remplace par leurs vrais mails
    $subject = "🛡️ New Safe-Team Report from $senderName";
    $emailContent = "Name: $senderName\n";
    $emailContent .= "Contact: $contactInfo\n";
    $emailContent .= "Follow-up preference: $followup\n\n";
    $emailContent .= "Description:\n$description\n";

    $headers = "From: safe-form@discin-camp.com\r\n";
    $headers .= "Reply-To: $contactInfo\r\n";

    if (mail($to, $subject, $emailContent, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "Invalid request method.";
}
?>
